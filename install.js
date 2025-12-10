#!/usr/bin/env node
/**
 * IDPF Framework Installer
 * Unified cross-platform installer for Windows, macOS, and Linux
 *
 * Usage: node install.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ======================================
//  Console Colors (no dependencies)
// ======================================

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// ======================================
//  Configuration Data
// ======================================

const DOMAIN_SPECIALISTS = [
  'Full-Stack-Developer',
  'Backend-Specialist',
  'Frontend-Specialist',
  'DevOps-Engineer',
  'Database-Engineer',
  'API-Integration-Specialist',
  'Security-Engineer',
  'Platform-Engineer',
  'Mobile-Specialist',
  'Data-Engineer',
  'QA-Test-Engineer',
  'Cloud-Solutions-Architect',
  'SRE-Specialist',
  'Embedded-Systems-Engineer',
  'ML-Engineer',
  'Performance-Engineer',
  'PRD-Analyst',
  'Accessibility-Specialist',
];

const FRAMEWORK_SKILLS = {
  'IDPF-Structured': ['tdd-red-phase', 'tdd-green-phase', 'tdd-refactor-phase', 'tdd-failure-recovery', 'test-writing-patterns'],
  'IDPF-Agile': ['tdd-red-phase', 'tdd-green-phase', 'tdd-refactor-phase', 'tdd-failure-recovery', 'test-writing-patterns'],
  'IDPF-Vibe': [],
  'IDPF-LTS': ['tdd-red-phase', 'tdd-green-phase', 'tdd-refactor-phase', 'tdd-failure-recovery', 'test-writing-patterns'],
};

const VIBE_VARIANT_SKILLS = {
  'vibe-newbie': ['flask-setup', 'sinatra-setup', 'common-errors', 'sqlite-integration', 'beginner-testing'],
  'vibe-web': [],
  'vibe-desktop': [],
  'vibe-mobile': [],
  'vibe-game': [],
  'vibe-embedded': [],
};

const PROCESS_FRAMEWORKS = [
  { value: 'IDPF-Structured', title: 'IDPF-Structured', description: 'Test-Driven Development with fixed requirements' },
  { value: 'IDPF-Agile', title: 'IDPF-Agile', description: 'Sprint-based development with user stories' },
  { value: 'IDPF-Vibe', title: 'IDPF-Vibe', description: 'Exploratory development with evolution paths' },
  { value: 'IDPF-LTS', title: 'IDPF-LTS', description: 'Long-Term Support maintenance mode' },
];

const VIBE_VARIANTS = [
  { value: 'vibe-newbie', title: 'Vibe-Newbie', description: 'Beginner-friendly (Flask/Sinatra)' },
  { value: 'vibe-web', title: 'Vibe-Web', description: 'Web development (Frontend/Backend)' },
  { value: 'vibe-desktop', title: 'Vibe-Desktop', description: 'Desktop applications' },
  { value: 'vibe-mobile', title: 'Vibe-Mobile', description: 'Mobile applications' },
  { value: 'vibe-game', title: 'Vibe-Game', description: 'Game development' },
  { value: 'vibe-embedded', title: 'Vibe-Embedded', description: 'Embedded systems' },
];

// ======================================
//  Utility Functions
// ======================================

function log(msg = '') {
  console.log(msg);
}

function logSuccess(msg) {
  console.log(colors.green(msg));
}

function logWarning(msg) {
  console.log(colors.yellow(msg));
}

function logError(msg) {
  console.log(colors.red(msg));
}

function logCyan(msg) {
  console.log(colors.cyan(msg));
}

function divider() {
  log(colors.cyan('───────────────────────────────────────'));
}

/**
 * Check if a command is available in PATH
 */
function checkCommand(cmd) {
  try {
    const checkCmd = process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`;
    execSync(checkCmd, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check prerequisites and return missing tools
 */
function checkPrerequisites() {
  const prerequisites = [
    { cmd: 'git', name: 'Git', url: 'https://git-scm.com/downloads', required: true },
    { cmd: 'gh', name: 'GitHub CLI', url: 'https://cli.github.com/', required: false },
    { cmd: 'jq', name: 'jq', url: 'https://jqlang.github.io/jq/download/', required: false },
  ];

  const missing = [];
  const optional = [];

  for (const prereq of prerequisites) {
    if (!checkCommand(prereq.cmd)) {
      if (prereq.required) {
        missing.push(prereq);
      } else {
        optional.push(prereq);
      }
    }
  }

  return { missing, optional };
}

/**
 * Extract zip file cross-platform
 */
function extractZip(zipPath, destDir) {
  try {
    fs.mkdirSync(destDir, { recursive: true });

    if (process.platform === 'win32') {
      // PowerShell Expand-Archive
      execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${destDir}' -Force"`, { stdio: 'pipe' });
    } else {
      // Unix unzip
      execSync(`unzip -q -o "${zipPath}" -d "${destDir}"`, { stdio: 'pipe' });
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Read framework version from Overview file
 */
function readFrameworkVersion(frameworkPath) {
  const overviewPath = path.join(frameworkPath, 'Overview', 'Framework-Overview.md');
  if (fs.existsSync(overviewPath)) {
    const content = fs.readFileSync(overviewPath, 'utf8');
    const match = content.match(/\*\*Version:\*\*\s*\*?\*?(\d+\.\d+\.\d+)/);
    if (match) {
      return match[1];
    }
  }
  return 'unknown';
}

/**
 * Parse existing CLAUDE.md for locked framework, domain specialists, and project instructions
 */
function parseExistingInstallation(projectDir) {
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');

  if (!fs.existsSync(claudeMdPath)) {
    return { lockedFramework: null, existingDomains: [], projectInstructions: null };
  }

  const content = fs.readFileSync(claudeMdPath, 'utf8');

  // Extract framework
  let lockedFramework = null;
  const frameworkMatch = content.match(/\*\*Process Framework:\*\*\s*\*?\*?(IDPF-\w+)/);
  if (frameworkMatch) {
    lockedFramework = frameworkMatch[1];
  }

  // Extract existing domain specialists
  let existingDomains = [];
  const domainsMatch = content.match(/\*\*Domain Specialists:\*\*\s*(.+)/);
  if (domainsMatch && domainsMatch[1].trim() !== 'None') {
    existingDomains = domainsMatch[1].split(',').map(d => d.trim()).filter(d => d && DOMAIN_SPECIALISTS.includes(d));
  }

  // Extract project-specific instructions
  let projectInstructions = null;
  const instructionsMatch = content.match(/## Project-Specific Instructions\s*\n([\s\S]*?)(?=\n---|\n\*\*End of Claude Code Instructions\*\*|$)/);
  if (instructionsMatch) {
    projectInstructions = instructionsMatch[1].trim();
    // Don't preserve if it's ONLY the default placeholder (no custom content)
    // Remove placeholder comments and check if anything else remains
    const withoutPlaceholders = projectInstructions
      .replace(/<!--.*?-->/gs, '')  // Remove HTML comments
      .trim();
    if (!withoutPlaceholders) {
      projectInstructions = null;
    }
  }

  return { lockedFramework, existingDomains, projectInstructions };
}

/**
 * Copy file
 */
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

/**
 * Get current date in YYYY-MM-DD format
 */
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// ======================================
//  File Generation Functions
// ======================================

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

function generateClaudeMd(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, projectInstructions) {
  const instructionsContent = projectInstructions ||
    '<!-- Add your project-specific instructions below this line -->\n<!-- These will be preserved during framework updates -->';

  // Generate primary specialist step if domain specialists are available
  const hasDomainSpecialists = domainListStr && domainListStr !== 'None';
  const primarySpecialistStep = hasDomainSpecialists ? `

### Step 4: Load Primary Domain Specialist

Read \`framework-config.json\` to get the \`primarySpecialist\` value.

If a primary specialist is configured (not null):
1. Read the specialist file: \`${frameworkPath}/System-Instructions/Domain/[primarySpecialist].md\`
2. Note the active role for your ready message

If no primary specialist is configured, skip this step.
` : '';

  const githubStepNumber = hasDomainSpecialists ? '5' : '4';
  const confirmStepNumber = hasDomainSpecialists ? '6' : '5';
  const switchRoleRow = hasDomainSpecialists ? `| \`/switch-role\` | Switch active domain specialist mid-session |\n` : '';
  const addRoleRow = `| \`/add-role\` | Add a new domain specialist to your project |\n`;
  const ghWorkflowPath = `${frameworkPath}/Reference/GitHub-Workflow.md`;

  const content = `# Claude Code - Project Instructions

**Purpose:** Automatic initialization with IDPF Framework integration
**Process Framework:** ${processFramework}
**Domain Specialists:** ${domainListStr || 'None'}
**Primary Specialist:** ${primarySpecialist || 'None'}

---

## Framework Configuration

This project uses the IDPF Framework ecosystem.
**Configuration:** See \`framework-config.json\` for framework location and project type.

---

## Startup Procedure

When starting a new session in this repository, **IMMEDIATELY** perform these steps:

### Step 1: Confirm Date

State the date from your environment information and ask the user to confirm it is correct. **Wait for the user to respond before proceeding to Step 2.**

\`\`\`
"According to my environment information, today's date is YYYY-MM-DD. Is this correct?"
\`\`\`

If the user responds "no", prompt for the correct date in YYYY-MM-DD format.

This ensures accurate timestamps in commits and documentation.

### Step 2: Load Configuration

Read \`framework-config.json\` to get the \`frameworkPath\`.

### Step 3: Load Startup Instructions and Framework Core

Read these files in order:
1. \`STARTUP.md\` - Condensed essential rules and guidelines
2. \`${frameworkPath}/${processFramework}/${getCoreFrameworkFileName(processFramework)}\` - Core framework workflow
${primarySpecialistStep}
### Step ${githubStepNumber}: Read GitHub Workflow Integration (MUST READ)

Read the GitHub Workflow file to activate issue management:

\`\`\`
${ghWorkflowPath}
\`\`\`

If \`.gh-pmu.yml\` does not exist, ask user if they have a GitHub repo and project.
If yes, run \`gh pmu init\`. If no, skip GitHub integration.

### Step ${confirmStepNumber}: Confirm Ready

Confirm initialization is complete and ask the user what they would like to work on.
${hasDomainSpecialists ? `If a primary specialist was loaded, include it in your ready message: "Active Role: [specialist-name]"` : ''}

**Do NOT proceed with any other work until the startup sequence is complete.**

---

## Available Commands

After completing the startup procedure, display available commands:

| Command | Purpose |
|---------|---------|
${switchRoleRow}${addRoleRow}

---

## Post-Compact Procedure

**MUST REREAD AFTER COMPACTION:** After any compact operation (manual or automatic), immediately re-read:

\`\`\`
${ghWorkflowPath}
\`\`\`

This ensures GitHub workflow rules persist across context resets.

---

## Project-Specific Instructions

${instructionsContent}

---

**End of Claude Code Instructions**
`;

  fs.writeFileSync(path.join(projectDir, 'CLAUDE.md'), content);
}

function generateStartupMd(projectDir, frameworkPath, processFramework, domainListStr) {
  const content = `# Startup Instructions

**Framework:** ${processFramework}
**Specialists:** ${domainListStr || 'None'}

---

## Required Reading

**MUST READ** the Anti-Hallucination Rules for Software Development:

\`\`\`
${frameworkPath}/Assistant/Anti-Hallucination-Rules-for-Software-Development.md
\`\`\`

These rules are critical for maintaining code quality and accuracy.

---

## Quick Reference

**Framework Documentation:** \`${frameworkPath}/${processFramework}/\`
**Domain Specialists:** \`${frameworkPath}/System-Instructions/Domain/\`
`;

  fs.writeFileSync(path.join(projectDir, 'STARTUP.md'), content);
}

function getCoreFrameworkFileName(processFramework) {
  const mapping = {
    'IDPF-Structured': 'Interactive Development Process Framework.md',
    'IDPF-Agile': 'Agile-Core.md',
    'IDPF-Vibe': 'Vibe-to-Structured Framework.md',
    'IDPF-LTS': 'Long-Term Support Framework.md',
  };
  return mapping[processFramework] || 'README.md';
}

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

function generateAddRole(projectDir, frameworkPath, domainList) {
  // Build list of ALL available specialists
  const allSpecialists = DOMAIN_SPECIALISTS;
  const numberedList = allSpecialists.map((d, i) => `${i + 1}. ${d}`).join('\n');

  // Build file paths for all specialists
  const filePaths = allSpecialists.map(d =>
    `- ${d}: \`${frameworkPath}/System-Instructions/Domain/${d}.md\``
  ).join('\n');

  const content = `# Add Domain Specialist Role

Add a new domain specialist to your project that wasn't selected during installation.

## All Available Specialists

${numberedList}

## Currently Installed

Read \`framework-config.json\` to see which specialists are already in your \`domainSpecialists\` array.

## Instructions

When invoked:

### Step 1: Read Current Configuration

Read \`framework-config.json\` to get:
- \`frameworkPath\` - path to framework files
- \`domainSpecialists\` - currently installed specialists
- \`primarySpecialist\` - current default role

### Step 2: Display Available Roles

Show specialists NOT already in \`domainSpecialists\`:

\`\`\`
Currently installed: [list from domainSpecialists]

Available to add:
[numbered list of specialists NOT in domainSpecialists]

Select a role to add (number):
\`\`\`

If all specialists are already installed, inform the user and suggest \`/switch-role\` instead.

### Step 3: Update Configuration

Edit \`framework-config.json\`:
1. Add the new specialist to the \`domainSpecialists\` array
2. Ask if user wants to set it as \`primarySpecialist\`

**Example edit:**
\`\`\`json
// Before
"domainSpecialists": ["Backend-Specialist", "Frontend-Specialist"],

// After
"domainSpecialists": ["Backend-Specialist", "Frontend-Specialist", "Security-Engineer"],
\`\`\`

### Step 4: Load New Specialist Instructions

Read the new specialist's instruction file:

${filePaths}

### Step 5: Confirm Addition

**Response format:**
\`\`\`
✓ Added Security-Engineer to project

Updated framework-config.json:
  • domainSpecialists: [..., Security-Engineer]
  • primarySpecialist: [unchanged or new value]

Loading Security-Engineer...

✓ Now operating as: Security-Engineer
  Focus areas: [from specialist file]

Use /switch-role to change between installed specialists.
\`\`\`

## File Paths

${filePaths}

## Usage

User says: \`/add-role\` or "add security specialist" or "I need to add DevOps"

## Natural Language Triggers

- "add [role]"
- "install [role]"
- "I need [role] capabilities"
- "add a new specialist"
`;

  const commandsDir = path.join(projectDir, '.claude', 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.writeFileSync(path.join(commandsDir, 'add-role.md'), content);
  return true;
}

function deployWorkflowHook(projectDir, frameworkPath) {
  const hooksDir = path.join(projectDir, '.claude', 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });

  const srcHook = path.join(frameworkPath, '.claude', 'hooks', 'workflow-trigger.js');
  const destHook = path.join(hooksDir, 'workflow-trigger.js');

  if (fs.existsSync(srcHook)) {
    fs.copyFileSync(srcHook, destHook);
    return true;
  }
  return false;
}

function generateSettingsLocal(projectDir, enableGitHubWorkflow) {
  const settingsPath = path.join(projectDir, '.claude', 'settings.local.json');

  // Skip if exists - preserve user permissions
  if (fs.existsSync(settingsPath)) {
    return false;
  }

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
    settings.hooks = {
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
  }

  fs.mkdirSync(path.join(projectDir, '.claude'), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return true;
}

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

// ======================================
//  Main Installation Flow
// ======================================

async function main() {
  // Load prompts module, auto-install if missing
  let prompts;
  try {
    prompts = require('prompts');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log(colors.yellow('Installing required dependency: prompts...'));
      try {
        execSync('npm install prompts', { stdio: 'inherit' });
        prompts = require('prompts');
        console.log(colors.green('✓ Dependency installed successfully'));
        console.log();
      } catch (installErr) {
        console.log(colors.red('Failed to install prompts module.'));
        console.log(colors.red('Please run: npm install prompts'));
        process.exit(1);
      }
    } else {
      throw err;
    }
  }

  // Handle Ctrl+C gracefully
  const onCancel = () => {
    log();
    logWarning('Installation cancelled.');
    process.exit(1);
  };

  try {
    // Clear screen
    console.clear();

    // Banner
    logCyan('╔══════════════════════════════════════╗');
    logCyan('║      IDPF Framework Installer        ║');
    logCyan('╚══════════════════════════════════════╝');
    log();

    // Check prerequisites
    const { missing, optional } = checkPrerequisites();

    if (missing.length > 0) {
      logError('Missing required prerequisites:');
      log();
      for (const prereq of missing) {
        log(`  ${colors.red('✗')} ${prereq.name}`);
        log(`    Install: ${colors.cyan(prereq.url)}`);
      }
      log();
      logError('Please install the required tools and run the installer again.');
      process.exit(1);
    }

    if (optional.length > 0) {
      logWarning('Optional tools not found (GitHub workflow features may be limited):');
      for (const prereq of optional) {
        log(`  ${colors.yellow('⚠')} ${prereq.name}: ${colors.cyan(prereq.url)}`);
      }
      log();
    }

    // Determine framework path and project directory
    let frameworkPath = process.cwd();
    let projectDir = '';

    const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
    const inFrameworkDir = fs.existsSync(manifestPath);

    if (inFrameworkDir) {
      logWarning('Detected: Running from framework directory');
      log();
      log(`Framework path: ${colors.cyan(frameworkPath)}`);

      const { confirmFw } = await prompts({
        type: 'confirm',
        name: 'confirmFw',
        message: 'Is this the correct framework path?',
        initial: true,
      }, { onCancel });

      if (!confirmFw) {
        const { newPath } = await prompts({
          type: 'text',
          name: 'newPath',
          message: 'Enter the correct framework path:',
        }, { onCancel });
        frameworkPath = path.resolve(newPath);
      }
      log();

      // Ask for target project directory
      while (true) {
        const { targetDir } = await prompts({
          type: 'text',
          name: 'targetDir',
          message: 'Enter the FULL path to your target project directory:',
          validate: (value) => value.trim() ? true : 'Path cannot be empty',
        }, { onCancel });

        projectDir = path.resolve(targetDir);

        // Validate it's not inside framework directory
        if (projectDir.startsWith(frameworkPath)) {
          logError('ERROR: Target directory cannot be inside the framework directory');
          log(`  Framework: ${frameworkPath}`);
          log(`  Target:    ${projectDir}`);
          continue;
        }

        // Create if doesn't exist
        if (!fs.existsSync(projectDir)) {
          log();
          logWarning(`Target directory does not exist: ${projectDir}`);
          const { createDir } = await prompts({
            type: 'confirm',
            name: 'createDir',
            message: 'Create it?',
            initial: true,
          }, { onCancel });

          if (createDir) {
            fs.mkdirSync(projectDir, { recursive: true });
            logSuccess(`Created: ${projectDir}`);
          } else {
            logWarning('Installation cancelled.');
            process.exit(1);
          }
        }
        break;
      }

      log();
      logSuccess(`Target project directory: ${projectDir}`);
      log();
    } else {
      // Not in framework directory
      const { fwPath } = await prompts({
        type: 'text',
        name: 'fwPath',
        message: 'Enter the path to the IDPF Framework directory:',
        validate: (value) => value.trim() ? true : 'Path cannot be empty',
      }, { onCancel });

      frameworkPath = path.resolve(fwPath);
      projectDir = process.cwd();
    }

    // Validate framework
    if (!fs.existsSync(path.join(frameworkPath, 'framework-manifest.json'))) {
      logError('ERROR: Not a valid framework directory - framework-manifest.json not found');
      log(`Path: ${frameworkPath}`);
      process.exit(1);
    }

    // Read version
    const version = readFrameworkVersion(frameworkPath);

    divider();
    log(`  Framework: ${colors.cyan(frameworkPath)}`);
    log(`  Version:   ${colors.green(version)}`);
    log(`  Target:    ${colors.cyan(projectDir)}`);
    divider();
    log();

    // Check for git repository in target directory
    const gitDir = path.join(projectDir, '.git');
    if (!fs.existsSync(gitDir)) {
      const { initGit } = await prompts({
        type: 'confirm',
        name: 'initGit',
        message: 'No git repository found in target directory. Initialize one?',
        initial: true,
      }, { onCancel });

      if (initGit) {
        try {
          execSync('git init', { cwd: projectDir, stdio: 'pipe' });
          logSuccess('Initialized git repository');
        } catch (err) {
          logWarning('Failed to initialize git repository - continuing anyway');
        }
      }
      log();
    }

    // Check for existing installation
    const { lockedFramework, existingDomains, projectInstructions } = parseExistingInstallation(projectDir);

    let processFramework = '';
    let vibeVariant = '';

    if (lockedFramework) {
      logWarning('Detected existing installation');
      logCyan(`  Locked framework: ${lockedFramework}`);
      if (existingDomains.length > 0) {
        logCyan(`  Existing specialists: ${existingDomains.join(', ')}`);
      }
      if (projectInstructions) {
        logSuccess('  Will preserve existing Project-Specific Instructions');
      }
      log();

      processFramework = lockedFramework;

      log(colors.dim('(To change framework, delete CLAUDE.md and re-run installer)'));
      log();
    } else {
      // Framework selection
      const { framework } = await prompts({
        type: 'select',
        name: 'framework',
        message: 'Select Development Process Framework',
        choices: PROCESS_FRAMEWORKS,
        initial: 0,
      }, { onCancel });

      processFramework = framework;
      log();
      logSuccess(`Selected: ${processFramework}`);
      log();
    }

    // Vibe variant selection (if applicable)
    if (processFramework === 'IDPF-Vibe') {
      const { variant } = await prompts({
        type: 'select',
        name: 'variant',
        message: 'Select Vibe Variant',
        choices: VIBE_VARIANTS,
        initial: 0,
      }, { onCancel });

      vibeVariant = variant;
      log();
      logSuccess(`Selected variant: ${vibeVariant}`);
      log();
    }

    // Domain specialist selection with multi-select
    const domainChoices = DOMAIN_SPECIALISTS.map(d => ({
      title: d,
      value: d,
      selected: existingDomains.includes(d),
    }));

    const { selectedDomains } = await prompts({
      type: 'multiselect',
      name: 'selectedDomains',
      message: 'Select Domain Specialists (Space to toggle, Enter to confirm)',
      choices: domainChoices,
      hint: '- Space to select. Enter to submit',
      instructions: false,
    }, { onCancel });

    // Default to Full-Stack-Developer if no selection made
    if (selectedDomains.length === 0) {
      selectedDomains.push('Full-Stack-Developer');
      log();
      logWarning('No domain specialists selected - defaulting to Full-Stack-Developer');
    } else {
      log();
      logSuccess(`Selected: ${selectedDomains.join(', ')}`);
    }
    log();

    // Primary specialist selection
    let primarySpecialist = null;

    if (selectedDomains.length === 1 && selectedDomains[0] === 'Full-Stack-Developer') {
      // Auto-set primary when defaulted to Full-Stack-Developer
      primarySpecialist = 'Full-Stack-Developer';
      logSuccess(`Primary role: ${primarySpecialist} (default)`);
      log(colors.dim('  This role will be loaded automatically at session startup.'));
      log(colors.dim('  Use /switch-role to change during a session.'));
      log();
    } else if (selectedDomains.length > 0) {
      const primaryChoices = selectedDomains.map(d => ({
        title: d,
        value: d,
      }));

      const { primary } = await prompts({
        type: 'select',
        name: 'primary',
        message: 'Select PRIMARY specialist (auto-loaded at session startup)',
        choices: [...primaryChoices, { title: '(skip - no primary)', value: null }],
        initial: 0,
      }, { onCancel });

      primarySpecialist = primary;

      if (primarySpecialist) {
        log();
        logSuccess(`Primary role: ${primarySpecialist}`);
        log(colors.dim('  This role will be loaded automatically at session startup.'));
        log(colors.dim('  Use /switch-role to change during a session.'));
      } else {
        log();
        logWarning('No primary specialist selected');
      }
      log();
    }

    // ======================================
    //  GitHub Workflow Integration
    // ======================================

    let enableGitHubWorkflow = false;

    const { wantGitHub } = await prompts({
      type: 'confirm',
      name: 'wantGitHub',
      message: 'Enable GitHub workflow integration? (automatic issue creation, project board tracking)',
      initial: true,
    }, { onCancel });

    if (wantGitHub) {
      enableGitHubWorkflow = true;
      log();
      logSuccess('GitHub workflow integration enabled');
      log(colors.dim('  Workflow triggers: bug:, enhancement:, finding:, idea:, proposal:'));
      log(colors.dim('  Requires: gh CLI + gh-pmu extension (setup instructions at end)'));
    } else {
      log();
      logWarning('GitHub workflow integration skipped');
      log(colors.dim('  You can enable it later by running the installer again.'));
    }
    log();

    // ======================================
    //  Generate Files
    // ======================================

    divider();
    logCyan('  Generating Files');
    divider();
    log();

    // framework-config.json
    generateFrameworkConfig(projectDir, frameworkPath, version, processFramework, selectedDomains, primarySpecialist);
    logSuccess('  ✓ framework-config.json');

    // Deploy skills
    const skillsDir = path.join(projectDir, '.claude', 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });

    let skillsToDeploy = [...(FRAMEWORK_SKILLS[processFramework] || [])];
    if (vibeVariant && VIBE_VARIANT_SKILLS[vibeVariant]) {
      skillsToDeploy = [...skillsToDeploy, ...VIBE_VARIANT_SKILLS[vibeVariant]];
    }

    const deployedSkills = [];
    const missingSkills = [];

    if (skillsToDeploy.length > 0) {
      log();
      log(colors.dim('  Deploying skills...'));
      for (const skill of skillsToDeploy) {
        const skillZip = path.join(frameworkPath, 'Skills', 'Packaged', `${skill}.zip`);
        const skillDir = path.join(skillsDir, skill);

        if (fs.existsSync(skillZip)) {
          if (extractZip(skillZip, skillDir)) {
            const skillMd = path.join(skillDir, 'SKILL.md');
            if (fs.existsSync(skillMd)) {
              logSuccess(`    ✓ ${skill}`);
              deployedSkills.push(skill);
            } else {
              logError(`    ✗ ${skill} (SKILL.md not found)`);
              missingSkills.push(skill);
            }
          } else {
            logError(`    ✗ ${skill} (extraction failed)`);
            missingSkills.push(skill);
          }
        } else {
          logWarning(`    ⚠ ${skill} (not available)`);
          missingSkills.push(skill);
        }
      }
      log();
    }

    // PRD directory
    if (['IDPF-Structured', 'IDPF-Agile'].includes(processFramework)) {
      generatePrdReadme(projectDir, processFramework);
      logSuccess('  ✓ PRD/README.md');

      // Copy templates if available
      const templatesDir = path.join(frameworkPath, 'Templates');
      const prdDir = path.join(projectDir, 'PRD');

      if (processFramework === 'IDPF-Structured') {
        const src = path.join(templatesDir, 'PRD-Structured.md');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(prdDir, 'PRD-Structured.md'));
        }
      } else if (processFramework === 'IDPF-Agile') {
        const src = path.join(templatesDir, 'PRD-Agile-Lightweight.md');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(prdDir, 'PRD-Agile-Lightweight.md'));
        }
      }
    }

    // CLAUDE.md
    const domainListStr = selectedDomains.join(', ');
    generateClaudeMd(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, projectInstructions);
    logSuccess('  ✓ CLAUDE.md');

    // STARTUP.md
    generateStartupMd(projectDir, frameworkPath, processFramework, domainListStr);
    logSuccess('  ✓ STARTUP.md');

    // switch-role command (only if domain specialists selected)
    if (generateSwitchRole(projectDir, frameworkPath, selectedDomains, primarySpecialist)) {
      logSuccess('  ✓ .claude/commands/switch-role.md');
    }

    // add-role command (always generate - allows adding specialists later)
    if (generateAddRole(projectDir, frameworkPath, selectedDomains)) {
      logSuccess('  ✓ .claude/commands/add-role.md');
    }

    // Copy run scripts
    const templatesDir = path.join(frameworkPath, 'Templates');
    if (process.platform === 'win32') {
      if (copyFile(path.join(templatesDir, 'run_claude.cmd'), path.join(projectDir, 'run_claude.cmd'))) {
        logSuccess('  ✓ run_claude.cmd');
      }
      if (copyFile(path.join(templatesDir, 'runp_claude.cmd'), path.join(projectDir, 'runp_claude.cmd'))) {
        logSuccess('  ✓ runp_claude.cmd');
      }
    } else {
      if (copyFile(path.join(templatesDir, 'run_claude.sh'), path.join(projectDir, 'run_claude.sh'))) {
        fs.chmodSync(path.join(projectDir, 'run_claude.sh'), '755');
        logSuccess('  ✓ run_claude.sh');
      }
      if (copyFile(path.join(templatesDir, 'runp_claude.sh'), path.join(projectDir, 'runp_claude.sh'))) {
        fs.chmodSync(path.join(projectDir, 'runp_claude.sh'), '755');
        logSuccess('  ✓ runp_claude.sh');
      }
    }

    // GitHub workflow hook (deploy before settings.local.json)
    if (enableGitHubWorkflow) {
      if (deployWorkflowHook(projectDir, frameworkPath)) {
        logSuccess('  ✓ .claude/hooks/workflow-trigger.js');
      } else {
        logWarning('  ⚠ .claude/hooks/workflow-trigger.js (source not found)');
      }
    }

    // settings.local.json
    if (generateSettingsLocal(projectDir, enableGitHubWorkflow)) {
      logSuccess('  ✓ .claude/settings.local.json' + (enableGitHubWorkflow ? ' (with hooks)' : ''));
    } else {
      logWarning('  ⊘ .claude/settings.local.json (preserved existing)');
    }

    // ======================================
    //  Installation Complete
    // ======================================

    log();
    logCyan('╔══════════════════════════════════════╗');
    logCyan('║       Installation Complete!         ║');
    logCyan('╚══════════════════════════════════════╝');
    log();
    log(`  ${colors.dim('Framework Path:')}     ${frameworkPath}`);
    log(`  ${colors.dim('Target Directory:')}   ${projectDir}`);
    log(`  ${colors.dim('Process Framework:')}  ${colors.green(processFramework)}`);
    if (vibeVariant) {
      log(`  ${colors.dim('Vibe Variant:')}       ${colors.green(vibeVariant)}`);
    }
    log(`  ${colors.dim('Domain Specialists:')} ${selectedDomains.length > 0 ? colors.green(domainListStr) : colors.dim('None')}`);
    if (primarySpecialist) {
      log(`  ${colors.dim('Primary Specialist:')} ${colors.green(primarySpecialist)}`);
    }
    if (deployedSkills.length > 0) {
      log(`  ${colors.dim('Skills Deployed:')}    ${colors.green(deployedSkills.join(', '))}`);
    }
    log(`  ${colors.dim('GitHub Workflow:')}    ${enableGitHubWorkflow ? colors.green('Enabled') : colors.dim('Disabled')}`);
    log();

    if (enableGitHubWorkflow) {
      logCyan('  GitHub Workflow Setup:');
      log();
      log('    Prerequisites (one-time setup):');
      log(`      1. Install GitHub CLI: ${colors.cyan('https://cli.github.com/')}`);
      log(`      2. Authenticate: ${colors.cyan('gh auth login')}`);
      log(`      3. Install gh-pmu extension: ${colors.cyan('gh extension install rubrical-studios/gh-pmu')}`);
      log();
      log('    Project setup (in your target directory):');
      log(`      4. Create GitHub repo if needed: ${colors.cyan('gh repo create')}`);
      log(`      5. Create GitHub project board: ${colors.cyan('https://github.com/users/YOUR_USERNAME/projects')}`);
      log(`      6. Initialize gh-pmu: ${colors.cyan('gh pmu init')}`);
      log();
      log('    Workflow triggers (prefix your messages):');
      log(`      ${colors.cyan('bug:')} - Create bug issue`);
      log(`      ${colors.cyan('enhancement:')} - Create enhancement issue`);
      log(`      ${colors.cyan('finding:')} - Create finding (bug synonym)`);
      log(`      ${colors.cyan('idea:')} - Create lightweight proposal`);
      log(`      ${colors.cyan('proposal:')} - Create full proposal`);
      log();
    }

    logCyan('  Next steps:');
    log(`    1. Navigate to: ${colors.cyan(projectDir)}`);
    log('    2. Review the generated CLAUDE.md');
    log('    3. Add project-specific instructions if needed');
    if (enableGitHubWorkflow) {
      log('    4. Complete GitHub workflow setup (see above)');
      log('    5. Start Claude Code CLI in that directory');
    } else {
      log('    4. Start Claude Code CLI in that directory');
    }
    log();

  } catch (err) {
    logError(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Run
main();
