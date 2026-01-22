#!/usr/bin/env node
// **Version:** 0.30.0
/**
 * compact-hook.js
 *
 * SessionStart hook with matcher "compact" that fires after compaction.
 * Reads saved todo state and outputs a [TODO-RESUME] instruction.
 *
 * Stories: #966 (Output Resume Instruction), #967 (Auto-Delete State File)
 * PRD: PRD/TodoList-Compaction-Persistence/PRD-TodoList-Compaction-Persistence.md
 *
 * Hook Output: JSON with hookSpecificOutput containing [TODO-RESUME] block
 */

const fs = require('fs');
const path = require('path');

const STATE_FILENAME = 'todo-resume.yml';

/**
 * Parse simple YAML (3 key-value pairs only)
 * We don't need a full YAML parser for this simple format
 * @param {string} content - YAML content
 * @returns {object|null} - Parsed state or null
 */
function parseSimpleYaml(content) {
    if (!content || typeof content !== 'string') {
        return null;
    }

    try {
        const result = {};
        const lines = content.split('\n');

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;

            // Match "key: value" or "key: "quoted value""
            const match = trimmed.match(/^([a-z_]+):\s*(.+)$/i);
            if (match) {
                const key = match[1];
                let value = match[2].trim();

                // Remove surrounding quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }

                result[key] = value;
            }
        }

        return Object.keys(result).length > 0 ? result : null;
    } catch (_e) {
        return null;
    }
}

/**
 * Read state file from .claude/todo-resume.yml
 * @param {string} cwd - Working directory (default: process.cwd())
 * @returns {object|null} - State object or null if not found/invalid
 */
function readStateFile(cwd) {
    const baseDir = cwd || process.cwd();
    const stateFile = path.join(baseDir, '.claude', STATE_FILENAME);

    try {
        if (!fs.existsSync(stateFile)) {
            return null;
        }

        const content = fs.readFileSync(stateFile, 'utf8');
        const state = parseSimpleYaml(content);

        // Validate required fields
        if (!state || !state.command || !state.last_completed) {
            return null;
        }

        return state;
    } catch (_e) {
        return null;
    }
}

/**
 * Delete state file after reading
 * @param {string} cwd - Working directory (default: process.cwd())
 * @returns {boolean} - True if deleted, false if not found
 */
function deleteStateFile(cwd) {
    const baseDir = cwd || process.cwd();
    const stateFile = path.join(baseDir, '.claude', STATE_FILENAME);

    try {
        if (!fs.existsSync(stateFile)) {
            return false;
        }

        fs.unlinkSync(stateFile);
        return true;
    } catch (_e) {
        return false;
    }
}

/**
 * Format the [TODO-RESUME] output block
 * @param {object} state - State object with command, last_completed, timestamp
 * @returns {string} - Formatted resume instruction
 */
function formatResumeOutput(state) {
    const { command, last_completed, timestamp } = state;

    return `[TODO-RESUME]
Command: ${command}
Last Completed: ${last_completed}
Timestamp: ${timestamp || 'unknown'}

INSTRUCTIONS:
1. Re-read the command spec for ${command} (e.g., .claude/commands/${command.replace('/', '')}.md)
2. Use TodoWrite to regenerate the todo list from the command's <!-- EXTENSIBLE --> directive
3. Mark all todos up to and including "${last_completed}" as completed
4. Set the next todo as in_progress
5. Continue execution from that point

This is an automatic recovery - no user confirmation required.
[/TODO-RESUME]`;
}

/**
 * Process the resume: read state, format output, delete file
 * @param {string} cwd - Working directory (optional, for testing)
 * @returns {string|null} - Resume output or null if no state
 */
function processResume(cwd) {
    // Read state file
    const state = readStateFile(cwd);

    if (!state) {
        return null;
    }

    // Format output
    const output = formatResumeOutput(state);

    // Delete state file (auto-cleanup)
    deleteStateFile(cwd);

    return output;
}

/**
 * Build the hook output JSON structure
 * @param {string|null} resumeOutput - Resume output or null
 * @returns {object} - Hook output JSON
 */
function buildHookOutput(resumeOutput) {
    if (resumeOutput) {
        return {
            systemMessage: 'Compact hook fired - todo resume state found',
            hookSpecificOutput: {
                hookEventName: 'SessionStart',
                additionalContext: resumeOutput
            }
        };
    }

    return {
        systemMessage: 'Compact hook fired!',
        hookSpecificOutput: {
            hookEventName: 'SessionStart',
            additionalContext: ''
        }
    };
}

/**
 * Main hook entry point
 */
function main() {
    try {
        const resumeOutput = processResume();
        const output = buildHookOutput(resumeOutput);
        console.log(JSON.stringify(output));
    } catch (_e) {
        // Silent failure - don't disrupt session
        console.log(JSON.stringify({
            systemMessage: 'Compact hook fired!',
            hookSpecificOutput: {
                hookEventName: 'SessionStart',
                additionalContext: ''
            }
        }));
    }
}

// Export functions for testing
module.exports = {
    readStateFile,
    deleteStateFile,
    formatResumeOutput,
    processResume,
    buildHookOutput,
    parseSimpleYaml,
    STATE_FILENAME
};

// Run main if executed directly (not imported)
if (require.main === module) {
    main();
}
