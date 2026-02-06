/**
 * @framework-script 0.37.2
 * generation.js - File generation for IDPF Framework Installer
 * @module install/lib/generation
 */

const fs = require('fs');
const path = require('path');
// getCurrentDate was used by deprecated generateFrameworkConfig, now removed

/**
 * Get the core framework filename for a process framework
 */
function getCoreFrameworkFileName(processFramework) {
  const mapping = {
    'IDPF-Agile': 'Agile-Core.md',
    'IDPF-Vibe': 'Vibe-Core.md',
  };
  return mapping[processFramework] || 'README.md';
}

// generateFrameworkConfig was deprecated in v0.16.1
// Use createOrUpdateConfig from config.js instead
// This function has been removed - see config.js for the new implementation

/**
 * Generate CLAUDE.md file
 * @param {string} projectDir - Target project directory
 * @param {string} frameworkPath - Path to framework installation
 * @param {string} processFramework - Selected process framework (IDPF-Agile, IDPF-Vibe)
 * @param {string} domainSpecialist - Selected domain specialist (v0.17.0+: singular)
 * @param {string} _unused - Deprecated parameter (kept for API compatibility)
 * @param {string} projectInstructions - Existing project instructions to preserve
 */
function generateClaudeMd(projectDir, frameworkPath, processFramework, domainSpecialist, _unused, projectInstructions) {
  const instructionsContent = projectInstructions ||
    '<!-- Add your project-specific instructions below this line -->\n<!-- These will be preserved during framework updates -->';

  const content = `# Claude Code - Project Instructions

**Process Framework:** ${processFramework}
**Domain Specialist:** ${domainSpecialist || 'None'}

---

## Rules Auto-Loading

Rules are automatically loaded from \`.claude/rules/\`:
- \`01-anti-hallucination.md\` - Software development quality rules
- \`02-github-workflow.md\` - GitHub issue management integration (if enabled)
- \`03-startup.md\` - Session initialization and specialist loading

**No manual file reading required at startup.**

---

## Framework Configuration

This project uses the IDPF Framework ecosystem.
**Configuration:** See \`framework-config.json\` for framework location and project type.
**Framework Path:** \`${frameworkPath}\`

---

## On-Demand Documentation

Load detailed documentation when needed:

| When Working On | Load File |
|-----------------|-----------|
| Framework workflow | \`${frameworkPath}/${processFramework}/${getCoreFrameworkFileName(processFramework)}\` |
| Domain specialist | \`${frameworkPath}/System-Instructions/Domain/Base/{specialist}.md\` |
| Testing patterns | \`.claude/skills/test-writing-patterns/SKILL.md\` |

---

## Project-Specific Instructions

${instructionsContent}

---

**End of Claude Code Instructions**
`;

  fs.writeFileSync(path.join(projectDir, 'CLAUDE.md'), content);
}

/**
 * Generate .gh-pmu.yml configuration file
 */
function generateGhPmuConfig(projectDir, projectName, projectNumber, owner, repoName) {
  const config = `project:
    name: ${projectName}
    number: ${projectNumber}
    owner: ${owner}
repositories:
    - ${owner}/${repoName}
defaults:
    priority: p2
    status: backlog
    labels:
        - pm-tracked
fields:
    priority:
        field: Priority
        values:
            p0: P0
            p1: P1
            p2: P2
    status:
        field: Status
        values:
            backlog: Backlog
            done: Done
            in_progress: In progress
            in_review: In review
            ready: Ready
`;

  fs.writeFileSync(path.join(projectDir, '.gh-pmu.yml'), config);
  return true;
}

/**
 * Generate settings.local.json
 */
function generateSettingsLocal(projectDir, enableGitHubWorkflow) {
  const settingsPath = path.join(projectDir, '.claude', 'settings.local.json');

  const hooksConfig = {
    UserPromptSubmit: [
      {
        hooks: [
          {
            type: "command",
            command: "node .claude/hooks/workflow-trigger.js",
            timeout: 5,
          },
        ],
      },
    ],
  };

  // If file exists, merge hooks config if needed
  if (fs.existsSync(settingsPath)) {
    if (!enableGitHubWorkflow) {
      return false; // No changes needed
    }

    try {
      const existing = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      let modified = false;

      // Initialize hooks if needed
      existing.hooks = existing.hooks || {};

      // Merge UserPromptSubmit hooks
      if (!existing.hooks.UserPromptSubmit?.some(h =>
        h.hooks?.some(hh => hh.command?.includes('workflow-trigger.js'))
      )) {
        existing.hooks.UserPromptSubmit = [
          ...(existing.hooks.UserPromptSubmit || []),
          ...hooksConfig.UserPromptSubmit
        ];
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(settingsPath, JSON.stringify(existing, null, 2));
        return 'merged';
      }
      return false; // Already configured
    } catch (_e) {
      // If we can't parse, leave it alone
      return false;
    }
  }

  // Create new settings file
  const settings = {
    permissions: {
      allow: [],
      deny: [
        "Bash(rm -rf /:*)",
        "Bash(rm -rf /*:*)",
        "Bash(sudo:*)",
        "Bash(git push --force:*)",
        "Bash(git push -f:*)",
        "Bash(git reset --hard:*)",
        "Bash(git clean -fd:*)",
        "Bash(git filter-branch:*)",
        "Bash(git rebase -i:*)",
        "Bash(git add -i:*)",
      ],
      ask: [],
    },
  };

  // Add hooks configuration if GitHub workflow is enabled
  if (enableGitHubWorkflow) {
    settings.hooks = hooksConfig;
  }

  fs.mkdirSync(path.join(projectDir, '.claude'), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return true;
}

/**
 * Generate PRD directory with README
 */
function generatePrdReadme(projectDir, processFramework) {
  const prdDir = path.join(projectDir, 'PRD');
  fs.mkdirSync(prdDir, { recursive: true });

  const content = `# PRD Directory

This directory contains Product Requirements Documents for your project.

## Getting Started

1. Choose a PRD template based on your framework:

   **${processFramework}:**
${processFramework === 'IDPF-Agile' ? '   - `PRD-Agile-Lightweight.md` - Epic/Story input' : ''}
${processFramework === 'IDPF-Vibe' ? '   - Start with exploration, formalize later' : ''}

2. Rename to \`PRD-[YourProjectName].md\`

3. Fill in the requirements

## Testing Approach

See \`Templates/Testing-Approach-Selection-Guide.md\` for guidance on:
- TDD (required for development)
- ATDD (optional, for acceptance criteria)
- BDD (optional, for behavior specifications)
`;

  fs.writeFileSync(path.join(prdDir, 'README.md'), content);
}

/**
 * Generate startup rules content for user projects
 * @param {string} frameworkPath - Path to framework installation
 * @param {string} processFramework - Selected process framework
 * @param {string} domainSpecialist - Selected domain specialist (v0.17.0+: singular)
 * @param {string} _unused - Deprecated parameter (kept for API compatibility)
 * @param {string} version - Framework version
 */
function generateStartupRules(frameworkPath, processFramework, domainSpecialist, _unused, version) {
  const hasSpecialist = domainSpecialist && domainSpecialist !== 'None';
  const specialistDisplay = hasSpecialist ? domainSpecialist : 'Not configured';

  return `# Session Startup

**Version:** ${version || '0.17.0'}
**Framework:** ${processFramework}
**Domain Specialist:** ${domainSpecialist || 'None'}

---

## Startup Sequence

When starting a new session:

1. **Gather Information**: Collect session data (see table below)
2. **Charter Detection**: Check project charter status
3. **Display Session Initialized**: Show consolidated status block
4. **Ask**: What would you like to work on?

### Session Information Sources

| Field | Source |
|-------|--------|
| Date | Environment/system date |
| Repository | \`basename $(git rev-parse --show-toplevel)\` |
| Branch | \`git branch --show-current\` + clean/dirty status |
| Process Framework | \`framework-config.json\` → \`processFramework\` |
| Framework Version | \`framework-manifest.json\` → \`version\` |
| Active Role | \`framework-config.json\` → \`domainSpecialist\` |
| Charter Status | \`Active\` or \`Pending\` |
| GitHub Workflow | \`gh pmu --version\` |

---

## Charter Detection (Mandatory)

**Charter is mandatory.** Check for project charter at startup:

1. Check CHARTER.md exists: \`test -f CHARTER.md\`
2. Check for template placeholders: \`/{[a-z][a-z0-9-]*}/\`

### Charter Status

- **Active** (exists, no placeholders): Proceed to display
- **Pending** (missing or template): Auto-run \`/charter\` command

**BLOCKING:** Session startup does not complete until charter is configured.

---

## Display Session Initialized Block

**Date appears ONLY here.** Format:

\`\`\`
Session Initialized
- Date: {date}
- Repository: {repo-name}
- Branch: {branch} ({clean|dirty})
- Process Framework: ${processFramework}
- Framework Version: {version}
- Active Role: ${specialistDisplay}
- Charter Status: {Active|Pending}
- GitHub Workflow: Active via gh pmu {version}
\`\`\`

If Charter Status is Pending, display blocking message and run \`/charter\`.

---

## On-Demand Loading

| When Needed | Load From |
|-------------|-----------|
| Framework workflow | \`${frameworkPath}/${processFramework}/\` |
| Domain specialist | \`${frameworkPath}/System-Instructions/Domain/Base/{specialist}.md\` |
| Skill usage | \`.claude/skills/{skill-name}/SKILL.md\` |
| Charter management | Run \`/charter\` command |

---

**End of Session Startup**
`;
}

module.exports = {
  getCoreFrameworkFileName,
  // generateFrameworkConfig removed in v0.16.1 - use createOrUpdateConfig from config.js
  generateClaudeMd,
  // generateSwitchRole removed in v0.17.0 - single specialist model
  // generateAddRole removed in v0.17.0 - single specialist model
  generateGhPmuConfig,
  generateSettingsLocal,
  generatePrdReadme,
  generateStartupRules,
};
