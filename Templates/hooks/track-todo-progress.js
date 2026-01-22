#!/usr/bin/env node
// **Version:** 0.30.0
/**
 * track-todo-progress.js
 *
 * PostToolUse hook that tracks TodoWrite calls.
 * Saves minimal state (command, last_completed, timestamp) to .claude/todo-resume.yml.
 *
 * Stories: #964 (Track Todo Progress), #965 (Store Minimal State)
 * PRD: PRD/TodoList-Compaction-Persistence/PRD-TodoList-Compaction-Persistence.md
 *
 * Hook Input (stdin): { tool_name, tool_input, tool_result }
 * State Output: .claude/todo-resume.yml (~100 bytes YAML)
 */

const fs = require('fs');
const path = require('path');

const STATE_FILENAME = 'todo-resume.yml';
const MAX_CONTENT_LENGTH = 80;

/**
 * Find the last completed todo in the array
 * @param {Array} todos - Array of todo objects with content and status
 * @returns {string|null} - The content of the last completed todo, or null
 */
function findLastCompleted(todos) {
    if (!todos || !Array.isArray(todos) || todos.length === 0) {
        return null;
    }

    const completed = todos.filter(t => t && t.status === 'completed');
    if (completed.length === 0) {
        return null;
    }

    return completed[completed.length - 1].content;
}

/**
 * Attempt to detect the originating command from todo content
 * @param {Array} todos - Array of todo objects
 * @returns {string} - Detected command name or "unknown"
 */
function detectCommand(todos) {
    if (!todos || !Array.isArray(todos) || todos.length === 0) {
        return 'unknown';
    }

    // Check all todos for command patterns
    for (const todo of todos) {
        if (!todo || !todo.content) continue;
        const content = todo.content;

        // Look for explicit /command references
        const slashMatch = content.match(/\/([a-z][-a-z]+)/i);
        if (slashMatch) {
            return '/' + slashMatch[1].toLowerCase();
        }

        // Detect from "Phase N" pattern (suggests prepare-release, prepare-beta)
        if (/Phase\s+\d/i.test(content)) {
            // More specific detection
            if (/pre-?flight|version|changelog|commit|tag|release.?notes/i.test(content)) {
                return '/prepare-release';
            }
            if (/beta/i.test(content)) {
                return '/prepare-beta';
            }
            return '/prepare-release';
        }

        // Detect from "Step N" pattern (suggests skill or process command)
        if (/Step\s+\d/i.test(content)) {
            if (/minimiz/i.test(content)) return '/minimize-files';
            if (/skill/i.test(content)) return '/skill-validate';
        }

        // Detect from specific keywords
        if (/sprint.*planning|plan.*sprint/i.test(content)) return '/plan-sprint';
        if (/sprint.*retro/i.test(content)) return '/sprint-retro';
        if (/end.*sprint/i.test(content)) return '/end-sprint';
        if (/create.*branch/i.test(content)) return '/create-branch';
        if (/merge.*branch/i.test(content)) return '/merge-branch';
    }

    return 'unknown';
}

/**
 * Escape YAML string value
 * @param {string} value - String to escape
 * @returns {string} - Escaped string safe for YAML
 */
function escapeYamlString(value) {
    if (!value) return '""';

    // If string contains special characters, wrap in double quotes and escape
    if (/[:#\[\]{}",\n\r]/.test(value) || value.includes("'")) {
        // Escape backslashes and double quotes
        const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        return `"${escaped}"`;
    }

    return value;
}

/**
 * Write state file to .claude/todo-resume.yml
 * @param {string} cwd - Working directory (default: process.cwd())
 * @param {string} command - The detected command name
 * @param {string} lastCompleted - Content of last completed todo
 * @param {Date} timestamp - Timestamp for the state
 */
function writeStateFile(cwd, command, lastCompleted, timestamp) {
    const baseDir = cwd || process.cwd();
    const claudeDir = path.join(baseDir, '.claude');
    const stateFile = path.join(claudeDir, STATE_FILENAME);

    // Ensure .claude directory exists
    if (!fs.existsSync(claudeDir)) {
        fs.mkdirSync(claudeDir, { recursive: true });
    }

    // Truncate long content to keep file under 200 bytes
    let content = lastCompleted || '';
    if (content.length > MAX_CONTENT_LENGTH) {
        content = content.substring(0, MAX_CONTENT_LENGTH - 3) + '...';
    }

    // Format timestamp as ISO 8601
    const ts = timestamp instanceof Date ? timestamp : new Date();
    const isoTimestamp = ts.toISOString();

    // Write minimal YAML (no library needed for this simple format)
    const yaml = [
        `command: ${escapeYamlString(command)}`,
        `last_completed: ${escapeYamlString(content)}`,
        `timestamp: ${isoTimestamp}`
    ].join('\n') + '\n';

    fs.writeFileSync(stateFile, yaml, 'utf8');
}

/**
 * Process a TodoWrite tool call
 * @param {object} toolInput - The tool_input from TodoWrite
 * @param {string} cwd - Working directory (optional, for testing)
 * @returns {object} - Result with wrote: boolean
 */
function processTodoWrite(toolInput, cwd) {
    // Handle null/undefined/malformed input gracefully
    if (!toolInput || !toolInput.todos || !Array.isArray(toolInput.todos)) {
        return { wrote: false };
    }

    const todos = toolInput.todos;

    // Find last completed todo
    const lastCompleted = findLastCompleted(todos);
    if (!lastCompleted) {
        // No completed todos - don't write state
        return { wrote: false };
    }

    // Detect command from todo content
    const command = detectCommand(todos);

    // Write state file
    try {
        writeStateFile(cwd, command, lastCompleted, new Date());
        return { wrote: true, command, lastCompleted };
    } catch (err) {
        return { wrote: false, error: err.message };
    }
}

/**
 * Main hook entry point - reads from stdin
 */
function main() {
    let input = '';

    process.stdin.on('data', chunk => {
        input += chunk;
    });

    process.stdin.on('end', () => {
        try {
            const data = JSON.parse(input);

            // Only process TodoWrite tool calls
            if (data.tool_name !== 'TodoWrite') {
                process.exit(0);
            }

            const result = processTodoWrite(data.tool_input);

            // Output success message
            const output = {
                systemMessage: result.wrote
                    ? `Todo progress tracked: ${result.lastCompleted}`
                    : 'Todo progress: no completed items to track',
                hookSpecificOutput: {
                    hookEventName: 'PostToolUse',
                    additionalContext: result.wrote
                        ? `[TODO-TRACKED] Command: ${result.command}, Last: ${result.lastCompleted}`
                        : ''
                }
            };

            console.log(JSON.stringify(output));
            process.exit(0);

        } catch (_e) {
            // Silent failure - don't disrupt Claude's workflow
            process.exit(0);
        }
    });
}

// Export functions for testing
module.exports = {
    findLastCompleted,
    detectCommand,
    writeStateFile,
    processTodoWrite,
    escapeYamlString,
    STATE_FILENAME,
    MAX_CONTENT_LENGTH
};

// Run main if executed directly (not imported)
if (require.main === module) {
    main();
}
