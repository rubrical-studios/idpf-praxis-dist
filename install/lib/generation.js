/**
 * generation.js - File generation for IDPF Framework Installer
 * @module install/lib/generation
 */

const fs = require('fs');
const path = require('path');
const { getCurrentDate } = require('./detection');

/**
 * Get the core framework filename for a process framework
 */
function getCoreFrameworkFileName(processFramework) {
  const mapping = {
    'IDPF-Structured': 'Interactive Development Process Framework.md',
    'IDPF-Agile': 'Agile-Core.md',
    'IDPF-Vibe': 'Vibe-to-Structured Framework.md',
    'IDPF-LTS': 'Long-Term Support Framework.md',
  };
  return mapping[processFramework] || 'README.md';
}

/**
 * Generate framework-config.json
 */
function generateFrameworkConfig(projectDir, frameworkPath, version, processFramework, domainList, primarySpecialist) {
  const config = {
    frameworkPath: frameworkPath,
    installedVersion: version,
    installedDate: getCurrentDate(),
    projectType: {
      processFramework: processFramework,
      domainSpecialists: domainList,
      primarySpecialist: primarySpecialist || null,
    },
    components: {
      frameworks: true,
      systemInstructions: true,
      skills: true,
      assistantGuidelines: true,
    },
  };

  fs.writeFileSync(
    path.join(projectDir, 'framework-config.json'),
    JSON.stringify(config, null, 2)
  );
}

/**
 * Generate CLAUDE.md file
 */
function generateClaudeMd(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, projectInstructions) {
  const instructionsContent = projectInstructions ||
    '<!-- Add your project-specific instructions below this line -->\n<!-- These will be preserved during framework updates -->';

  const hasDomainSpecialists = domainListStr && domainListStr !== 'None';
  const switchRoleRow = hasDomainSpecialists ? `| \`/switch-role\` | Switch active domain specialist mid-session |\n` : '';
  const addRoleRow = `| \`/add-role\` | Add a new domain specialist to your project |\n`;

  const content = `# Claude Code - Project Instructions

**Process Framework:** ${processFramework}
**Domain Specialists:** ${domainListStr || 'None'}
**Primary Specialist:** ${primarySpecialist || 'None'}

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
| Domain specialist | \`${frameworkPath}/System-Instructions/Domain/{specialist}.md\` |
| Testing patterns | \`.claude/skills/test-writing-patterns/SKILL.md\` |

---

## Available Commands

| Command | Purpose |
|---------|---------|
${switchRoleRow}${addRoleRow}

---

## Project-Specific Instructions

${instructionsContent}

---

**End of Claude Code Instructions**
`;

  fs.writeFileSync(path.join(projectDir, 'CLAUDE.md'), content);
}

/**
 * Generate switch-role command file
 */
function generateSwitchRole(projectDir, frameworkPath, domainList, primarySpecialist) {
  if (domainList.length === 0) {
    return false; // No specialists to switch between
  }

  // Build numbered list
  const numberedList = domainList.map((d, i) => `${i + 1}. ${d}`).join('\n');

  // Build file paths
  const filePaths = domainList.map(d =>
    `- ${d}: \`${frameworkPath}/System-Instructions/Domain/${d}.md\``
  ).join('\n');

  const content = `# Switch Domain Specialist Role

Switch to a different domain specialist role and make it the default for future sessions.

## Available Roles

${numberedList}

## Instructions

When invoked:

### Step 1: Read Current Configuration

Read \`framework-config.json\` to get the current \`primarySpecialist\` value.

### Step 2: Display Options and Get Selection

Show available roles (mark current primary if set) and ask user to select one:

\`\`\`
Available roles:
${numberedList}

Current default: [primarySpecialist or "None"]

Select a role (1-${domainList.length}):
\`\`\`

### Step 3: Update Configuration (Persist Selection)

Edit \`framework-config.json\` to set the new \`primarySpecialist\` value.

**Example edit:**
- Change \`"primarySpecialist": "Backend-Specialist"\` to \`"primarySpecialist": "Frontend-Specialist"\`

### Step 4: Load New Specialist Instructions

Read the new specialist's instruction file:

${filePaths}

### Step 5: Confirm Switch

**Response format:**
\`\`\`
⊘ Deactivating: [Previous-Role]

✓ Updated framework-config.json (new default: [New-Role])

Loading [New-Role]...

✓ Now operating exclusively as: [New-Role]
  Focus areas: [from specialist file]

  This role will load automatically in future sessions.
  Previous role instructions are now inactive.

What would you like to work on?
\`\`\`

## Context Management

Previous role instructions remain in conversation history but are explicitly deprioritized. The new role takes exclusive precedence for all subsequent work.

## File Paths

${filePaths}

## Usage

User says: \`/switch-role\` or "switch to frontend" or "I need backend help now"

## Natural Language Triggers

- "switch to [role]"
- "I need [role] help"
- "change to [role] mode"
- "activate [role]"
`;

  const commandsDir = path.join(projectDir, '.claude', 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.writeFileSync(path.join(commandsDir, 'switch-role.md'), content);
  return true;
}

/**
 * Generate add-role command file
 * Uses directory discovery instead of embedded lists to reduce token consumption
 */
function generateAddRole(projectDir, frameworkPath, domainList) {
  const content = `---
argument-hint: [specialist-name] (optional)
---

# Add Domain Specialist Role

Add a new domain specialist to your project.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| \`$ARGUMENTS\` | No | Specialist name for direct add (e.g., \`Security-Engineer\`) |

## Workflow

### Step 1: Read Configuration

Read \`framework-config.json\` to get \`frameworkPath\` and \`domainSpecialists\` array.

### Step 2: Discover Available Specialists

List all specialists from the framework:
\`\`\`bash
ls "\${frameworkPath}/System-Instructions/Domain/"
\`\`\`

Filter out those already in \`domainSpecialists\`.

### Step 3: Handle Selection

**If \`$ARGUMENTS\` provided:**
- Validate it exists in Domain/ directory
- If valid, skip to Step 4
- If invalid, show error with available options

**If no argument:**
- Display numbered list of available specialists (not yet installed)
- Ask user to select

### Step 4: Update Configuration

Edit \`framework-config.json\`:
1. Add specialist to \`domainSpecialists\` array
2. Ask if user wants to set as \`primarySpecialist\`

### Step 5: Load and Confirm

Read \`\${frameworkPath}/System-Instructions/Domain/\${specialist}.md\`

Report:
\`\`\`
✓ Added [Specialist] to project
✓ Now operating as: [Specialist]

Use /switch-role to change between installed specialists.
\`\`\`

## Usage

- \`/add-role\` - Browse and select from available specialists
- \`/add-role Security-Engineer\` - Directly add Security-Engineer
- "add DevOps" - Natural language trigger
`;

  const commandsDir = path.join(projectDir, '.claude', 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.writeFileSync(path.join(commandsDir, 'add-role.md'), content);
  return true;
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

      // Check if hooks already configured
      if (existing.hooks?.UserPromptSubmit) {
        const hasWorkflowHook = existing.hooks.UserPromptSubmit.some(h =>
          h.hooks?.some(hh => hh.command?.includes('workflow-trigger.js'))
        );
        if (hasWorkflowHook) {
          return false; // Already configured
        }
      }

      // Merge hooks into existing settings
      existing.hooks = existing.hooks || {};
      existing.hooks.UserPromptSubmit = hooksConfig.UserPromptSubmit;
      fs.writeFileSync(settingsPath, JSON.stringify(existing, null, 2));
      return 'merged';
    } catch (e) {
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
${processFramework === 'IDPF-Structured' ? '   - `PRD-Structured.md` - Requirements-driven input' : ''}
${processFramework === 'IDPF-Agile' ? '   - `PRD-Agile-Lightweight.md` - Epic/Story input' : ''}
${processFramework === 'IDPF-Vibe' ? '   - Start with exploration, formalize later' : ''}
${processFramework === 'IDPF-LTS' ? '   - Bug reports and maintenance requests' : ''}

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
 */
function generateStartupRules(frameworkPath, processFramework, domainListStr, primarySpecialist, version) {
  const hasPrimary = primarySpecialist && primarySpecialist !== 'None';
  const specialistStep = hasPrimary
    ? `2. **Load Primary Specialist**: Read \`${frameworkPath}/System-Instructions/Domain/${primarySpecialist}.md\`
3. **Report Ready**: Confirm initialization complete with "Active Role: ${primarySpecialist}"
4. **Ask**: What would you like to work on?`
    : `2. **Report Ready**: Confirm initialization complete
3. **Ask**: What would you like to work on?`;

  return `# Session Startup

**Version:** ${version || '0.15.4'}
**Framework:** ${processFramework}
**Specialists:** ${domainListStr || 'None'}
**Primary Specialist:** ${primarySpecialist || 'None'}

---

## Startup Sequence

When starting a new session:

1. **Confirm Date**: State the date from environment info
${specialistStep}

---

## On-Demand Loading

| When Needed | Load From |
|-------------|-----------|
| Framework workflow | \`${frameworkPath}/${processFramework}/\` |
| Domain specialist | \`${frameworkPath}/System-Instructions/Domain/{specialist}.md\` |
| Skill usage | \`.claude/skills/{skill-name}/SKILL.md\` |

---

**End of Session Startup**
`;
}

module.exports = {
  getCoreFrameworkFileName,
  generateFrameworkConfig,
  generateClaudeMd,
  generateSwitchRole,
  generateAddRole,
  generateGhPmuConfig,
  generateSettingsLocal,
  generatePrdReadme,
  generateStartupRules,
};
