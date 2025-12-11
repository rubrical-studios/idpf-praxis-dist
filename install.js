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

/**
 * Manifest of installed files for cleanup purposes
 * Each entry specifies:
 * - dir: relative directory path from project root
 * - files: array of expected filenames (functions receive config and return true/false for conditional files)
 */
const INSTALLED_FILES_MANIFEST = {
  // Root directory files
  root: {
    dir: '.',
    files: [
      'CLAUDE.md',
      'framework-config.json',
      // Platform-specific run scripts
      (config) => process.platform === 'win32' ? 'run_claude.cmd' : null,
      (config) => process.platform === 'win32' ? 'runp_claude.cmd' : null,
      (config) => process.platform !== 'win32' ? 'run_claude.sh' : null,
      (config) => process.platform !== 'win32' ? 'runp_claude.sh' : null,
    ],
  },
  // .claude/rules/ directory
  rules: {
    dir: '.claude/rules',
    files: [
      '01-anti-hallucination.md',
      (config) => config?.enableGitHubWorkflow ? '02-github-workflow.md' : null,
      '03-startup.md',
    ],
  },
  // .claude/commands/ directory
  commands: {
    dir: '.claude/commands',
    files: [
      (config) => config?.domainSpecialists?.length > 0 ? 'switch-role.md' : null,
      'add-role.md',
    ],
  },
  // .claude/hooks/ directory
  hooks: {
    dir: '.claude/hooks',
    files: [
      (config) => config?.enableGitHubWorkflow ? 'workflow-trigger.js' : null,
    ],
  },
  // Note: .claude/skills/ and .claude/settings.local.json are NOT cleaned up
  // - skills: managed separately per framework
  // - settings.local.json: may contain user customizations
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
 * Resolve expected files from manifest based on config
 * @param {object} manifestEntry - Entry from INSTALLED_FILES_MANIFEST
 * @param {object} config - Configuration object with domainSpecialists, enableGitHubWorkflow, etc.
 * @returns {string[]} Array of expected filenames
 */
function resolveManifestFiles(manifestEntry, config) {
  const expectedFiles = [];
  for (const item of manifestEntry.files) {
    if (typeof item === 'function') {
      const result = item(config);
      if (result) {
        expectedFiles.push(result);
      }
    } else if (typeof item === 'string') {
      expectedFiles.push(item);
    }
  }
  return expectedFiles;
}

/**
 * Clean up orphaned files that are no longer in the manifest
 * @param {string} projectDir - Project directory path
 * @param {object} config - Configuration object with domainSpecialists, enableGitHubWorkflow, etc.
 * @returns {object} Results: { removed: string[], skipped: string[] }
 */
function cleanupOrphanedFiles(projectDir, config) {
  const results = { removed: [], skipped: [] };

  for (const [key, entry] of Object.entries(INSTALLED_FILES_MANIFEST)) {
    const dirPath = path.join(projectDir, entry.dir);

    // Skip if directory doesn't exist
    if (!fs.existsSync(dirPath)) {
      continue;
    }

    // Get expected files for this directory
    const expectedFiles = resolveManifestFiles(entry, config);

    // Get actual files in directory
    let actualFiles;
    try {
      actualFiles = fs.readdirSync(dirPath).filter(f => {
        const fullPath = path.join(dirPath, f);
        return fs.statSync(fullPath).isFile();
      });
    } catch (err) {
      // Can't read directory, skip
      continue;
    }

    // Find orphaned files (files that exist but are not in expected list)
    for (const file of actualFiles) {
      if (!expectedFiles.includes(file)) {
        const filePath = path.join(dirPath, file);

        // Safety check: only remove known installer-generated file patterns
        const isInstallerFile = isKnownInstallerFile(file, key);

        if (isInstallerFile) {
          try {
            fs.unlinkSync(filePath);
            results.removed.push(path.relative(projectDir, filePath));
          } catch (err) {
            results.skipped.push({
              file: path.relative(projectDir, filePath),
              reason: err.message,
            });
          }
        }
      }
    }
  }

  return results;
}

/**
 * Check if a file matches known installer-generated patterns
 * This prevents accidentally deleting user-created files
 * @param {string} filename - Name of the file
 * @param {string} manifestKey - Key from INSTALLED_FILES_MANIFEST (root, rules, commands, hooks)
 * @returns {boolean} True if file matches known patterns
 */
function isKnownInstallerFile(filename, manifestKey) {
  // Define patterns for each manifest category
  const patterns = {
    root: [
      // Only match specific installer files, not arbitrary root files
      /^CLAUDE\.md$/,
      /^framework-config\.json$/,
      /^run_claude\.(cmd|sh)$/,
      /^runp_claude\.(cmd|sh)$/,
      /^STARTUP\.md$/,  // Legacy file from pre-2.9.0
    ],
    rules: [
      // Rules files follow numbered prefix pattern or known legacy names
      /^\d{2}-[\w-]+\.md$/,
      /^anti-hallucination\.md$/,  // Legacy name
      /^github-workflow\.md$/,     // Legacy name
      /^startup\.md$/,             // Legacy name
    ],
    commands: [
      // Command files are markdown
      /^[\w-]+\.md$/,
    ],
    hooks: [
      // Hook files are JavaScript
      /^[\w-]+\.js$/,
    ],
  };

  const categoryPatterns = patterns[manifestKey] || [];
  return categoryPatterns.some(pattern => pattern.test(filename));
}

// ======================================
//  Project Tracking
// ======================================

/**
 * Read installed-projects.json from framework directory
 */
function readInstalledProjects(frameworkPath) {
  const trackingPath = path.join(frameworkPath, 'installed-projects.json');
  if (!fs.existsSync(trackingPath)) {
    return { projects: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(trackingPath, 'utf8'));
  } catch {
    return { projects: [] };
  }
}

/**
 * Write installed-projects.json to framework directory
 */
function writeInstalledProjects(frameworkPath, data) {
  const trackingPath = path.join(frameworkPath, 'installed-projects.json');
  fs.writeFileSync(trackingPath, JSON.stringify(data, null, 2));
}

/**
 * Add or update a project in the tracking file
 */
function trackProject(frameworkPath, projectDir, version) {
  const data = readInstalledProjects(frameworkPath);
  const existingIdx = data.projects.findIndex(p => p.path === projectDir);

  const projectEntry = {
    path: projectDir,
    installedVersion: version,
    installedDate: new Date().toISOString().split('T')[0],
  };

  if (existingIdx >= 0) {
    data.projects[existingIdx] = projectEntry;
  } else {
    data.projects.push(projectEntry);
  }

  writeInstalledProjects(frameworkPath, data);
}

/**
 * Remove a project from tracking (e.g., if directory no longer exists)
 */
function untrackProject(frameworkPath, projectDir) {
  const data = readInstalledProjects(frameworkPath);
  data.projects = data.projects.filter(p => p.path !== projectDir);
  writeInstalledProjects(frameworkPath, data);
}

/**
 * Update/migrate all tracked projects
 * Returns: { updated: number, current: number, removed: number, failed: number }
 */
function updateTrackedProjects(frameworkPath) {
  const data = readInstalledProjects(frameworkPath);
  const currentVersion = readFrameworkVersion(frameworkPath);
  const results = { updated: 0, current: 0, removed: 0, failed: 0 };

  if (data.projects.length === 0) {
    return results;
  }

  log();
  logCyan('Checking installed projects...');
  log();

  for (const project of data.projects) {
    const projectPath = project.path;

    // Check if project still exists
    if (!fs.existsSync(projectPath)) {
      log(`  ${colors.red('✗')} ${projectPath}`);
      log(`    ${colors.dim('Directory not found - removing from tracking')}`);
      untrackProject(frameworkPath, projectPath);
      results.removed++;
      continue;
    }

    // Check if framework-config.json exists
    const configPath = path.join(projectPath, 'framework-config.json');
    if (!fs.existsSync(configPath)) {
      log(`  ${colors.yellow('⚠')} ${projectPath}`);
      log(`    ${colors.dim('No framework-config.json - skipping')}`);
      results.failed++;
      continue;
    }

    // Read current installed version
    let projectConfig;
    try {
      projectConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
      log(`  ${colors.yellow('⚠')} ${projectPath}`);
      log(`    ${colors.dim('Could not read framework-config.json - skipping')}`);
      results.failed++;
      continue;
    }

    const installedVersion = projectConfig.installedVersion || '0.0.0';

    // Compare versions
    if (compareVersions(installedVersion, currentVersion) >= 0) {
      log(`  ${colors.green('✓')} ${projectPath}`);
      log(`    ${colors.dim(`Already at ${installedVersion}`)}`);
      results.current++;
      continue;
    }

    // Needs update - run migrations
    log(`  ${colors.cyan('→')} ${projectPath}`);
    log(`    ${colors.dim(`Updating ${installedVersion} → ${currentVersion}`)}`);

    try {
      // Run migrations
      const applicableMigrations = MIGRATIONS.filter(m =>
        compareVersions(installedVersion, m.version) < 0
      );

      for (const migration of applicableMigrations) {
        log(`    ${colors.dim(`  Running: ${migration.description}`)}`);
        migration.migrate(projectPath, frameworkPath, projectConfig);
      }

      // Clean up orphaned files after migrations
      const hasGitHubWorkflow = fs.existsSync(path.join(projectPath, '.claude', 'hooks', 'workflow-trigger.js'));
      const cleanupConfig = {
        domainSpecialists: projectConfig.projectType?.domainSpecialists || [],
        enableGitHubWorkflow: hasGitHubWorkflow,
      };
      const cleanupResult = cleanupOrphanedFiles(projectPath, cleanupConfig);
      if (cleanupResult.removed.length > 0) {
        for (const file of cleanupResult.removed) {
          log(`    ${colors.dim(`  Removed: ${file}`)}`);
        }
      }

      // Update version in config
      projectConfig.installedVersion = currentVersion;
      projectConfig.installedDate = new Date().toISOString().split('T')[0];
      fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2));

      // Update tracking
      trackProject(frameworkPath, projectPath, currentVersion);

      log(`    ${colors.green('✓ Updated successfully')}`);
      results.updated++;
    } catch (err) {
      log(`    ${colors.red(`✗ Failed: ${err.message}`)}`);
      results.failed++;
    }
  }

  return results;
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

  // Look in Templates/hooks/ (bundled location for distribution)
  const srcHook = path.join(frameworkPath, 'Templates', 'hooks', 'workflow-trigger.js');
  const destHook = path.join(hooksDir, 'workflow-trigger.js');

  if (fs.existsSync(srcHook)) {
    fs.copyFileSync(srcHook, destHook);
    return true;
  }
  return false;
}

// ======================================
//  Rules Deployment Functions
// ======================================

/**
 * Generate startup rules content for user projects
 */
function generateStartupRules(frameworkPath, processFramework, domainListStr, primarySpecialist) {
  const hasPrimary = primarySpecialist && primarySpecialist !== 'None';
  const specialistStep = hasPrimary
    ? `2. **Load Primary Specialist**: Read \`${frameworkPath}/System-Instructions/Domain/${primarySpecialist}.md\`
3. **Report Ready**: Confirm initialization complete with "Active Role: ${primarySpecialist}"
4. **Ask**: What would you like to work on?`
    : `2. **Report Ready**: Confirm initialization complete
3. **Ask**: What would you like to work on?`;

  return `# Session Startup

**Version:** 1.0
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

/**
 * Deploy rules to .claude/rules/ directory
 */
function deployRules(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, enableGitHubWorkflow) {
  const rulesDir = path.join(projectDir, '.claude', 'rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const results = { ah: false, gh: false, startup: false };

  // Copy anti-hallucination rules (always)
  const ahSrc = path.join(frameworkPath, 'Assistant', 'Anti-Hallucination-Rules-for-Software-Development.md');
  const ahDest = path.join(rulesDir, '01-anti-hallucination.md');
  if (fs.existsSync(ahSrc)) {
    // Read source and add version header
    const ahContent = fs.readFileSync(ahSrc, 'utf8');
    const ahWithHeader = `# Anti-Hallucination Rules for Software Development

**Version:** 1.0
**Source:** Assistant/Anti-Hallucination-Rules-for-Software-Development.md

---

${ahContent.replace(/^# Anti-Hallucination Rules for Software Development\s*\n*/, '')}`;
    fs.writeFileSync(ahDest, ahWithHeader);
    results.ah = true;
  }

  // Copy GitHub workflow (if enabled)
  if (enableGitHubWorkflow) {
    const ghSrc = path.join(frameworkPath, 'Reference', 'GitHub-Workflow.md');
    const ghDest = path.join(rulesDir, '02-github-workflow.md');
    if (fs.existsSync(ghSrc)) {
      // Read source and add version header
      const ghContent = fs.readFileSync(ghSrc, 'utf8');
      const ghWithHeader = `# GitHub Workflow Integration

**Version:** 1.0
**Source:** Reference/GitHub-Workflow.md

---

${ghContent.replace(/^# GitHub Workflow Integration\s*\n*/, '')}`;
      fs.writeFileSync(ghDest, ghWithHeader);
      results.gh = true;
    }
  }

  // Generate startup rules
  const startupContent = generateStartupRules(frameworkPath, processFramework, domainListStr, primarySpecialist);
  fs.writeFileSync(path.join(rulesDir, '03-startup.md'), startupContent);
  results.startup = true;

  return results;
}

// ======================================
//  Migration Functions
// ======================================

/**
 * Compare semantic versions
 * Returns: -1 if a < b, 0 if a == b, 1 if a > b
 */
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const pA = partsA[i] || 0;
    const pB = partsB[i] || 0;
    if (pA < pB) return -1;
    if (pA > pB) return 1;
  }
  return 0;
}

/**
 * Migration definitions
 * Each migration has a version threshold and a migrate function
 */
const MIGRATIONS = [
  {
    version: '2.9.0',
    description: 'Migrate to .claude/rules/ auto-loading',
    migrate: (projectDir, frameworkPath, config) => {
      // Remove old STARTUP.md
      const startupPath = path.join(projectDir, 'STARTUP.md');
      if (fs.existsSync(startupPath)) {
        fs.unlinkSync(startupPath);
        logSuccess('  ✓ Removed STARTUP.md (no longer needed)');
      }

      // Determine if GitHub workflow was enabled (check for hook file)
      const hasGitHubWorkflow = fs.existsSync(path.join(projectDir, '.claude', 'hooks', 'workflow-trigger.js'));

      // Create .claude/rules/ with new structure
      const rulesResult = deployRules(
        projectDir,
        frameworkPath,
        config.projectType.processFramework,
        config.projectType.domainSpecialists.join(', '),
        config.projectType.primarySpecialist,
        hasGitHubWorkflow
      );

      if (rulesResult.ah) {
        logSuccess('  ✓ Created .claude/rules/01-anti-hallucination.md');
      }
      if (rulesResult.gh) {
        logSuccess('  ✓ Created .claude/rules/02-github-workflow.md');
      }
      if (rulesResult.startup) {
        logSuccess('  ✓ Created .claude/rules/03-startup.md');
      }

      // Regenerate simplified CLAUDE.md (preserves project instructions)
      const { projectInstructions } = parseExistingInstallation(projectDir);
      generateClaudeMd(
        projectDir,
        frameworkPath,
        config.projectType.processFramework,
        config.projectType.domainSpecialists.join(', '),
        config.projectType.primarySpecialist,
        projectInstructions
      );
      logSuccess('  ✓ Updated CLAUDE.md (simplified)');
    }
  },
  {
    version: '2.9.2',
    description: 'Fix settings.local.json hooks configuration',
    migrate: (projectDir, frameworkPath, config) => {
      // Check if workflow hook exists but settings not configured
      const hasHook = fs.existsSync(path.join(projectDir, '.claude', 'hooks', 'workflow-trigger.js'));
      if (!hasHook) {
        logSuccess('  ⊘ No workflow hook installed, skipping settings fix');
        return;
      }

      const settingsPath = path.join(projectDir, '.claude', 'settings.local.json');
      if (!fs.existsSync(settingsPath)) {
        // Create new settings with hooks
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
          hooks: {
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
          },
        };
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        logSuccess('  ✓ Created .claude/settings.local.json (with hooks)');
        return;
      }

      // Merge hooks into existing settings
      try {
        const existing = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        // Check if hooks already configured
        if (existing.hooks?.UserPromptSubmit) {
          const hasWorkflowHook = existing.hooks.UserPromptSubmit.some(h =>
            h.hooks?.some(hh => hh.command?.includes('workflow-trigger.js'))
          );
          if (hasWorkflowHook) {
            logSuccess('  ⊘ Hooks already configured in settings.local.json');
            return;
          }
        }

        // Add hooks configuration
        existing.hooks = existing.hooks || {};
        existing.hooks.UserPromptSubmit = [
          {
            hooks: [
              {
                type: "command",
                command: "node .claude/hooks/workflow-trigger.js",
                timeout: 5,
              },
            ],
          },
        ];
        fs.writeFileSync(settingsPath, JSON.stringify(existing, null, 2));
        logSuccess('  ✓ Added hooks to .claude/settings.local.json');
      } catch (e) {
        logWarning('  ⚠ Could not update settings.local.json: ' + e.message);
      }
    }
  },
  // Future migrations added here
];

/**
 * Run migrations for existing installations
 */
function runMigrations(projectDir, frameworkPath) {
  const configPath = path.join(projectDir, 'framework-config.json');
  if (!fs.existsSync(configPath)) {
    logError('No framework-config.json found. Run install.js without --migrate first.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const installedVersion = config.installedVersion || '0.0.0';
  const currentVersion = readFrameworkVersion(frameworkPath);

  log(`Installed version: ${installedVersion}`);
  log(`Framework version: ${currentVersion}`);
  log();

  const applicableMigrations = MIGRATIONS.filter(m =>
    compareVersions(installedVersion, m.version) < 0
  );

  if (applicableMigrations.length === 0) {
    logSuccess('No migrations needed. Project is up to date.');
    return;
  }

  log(`Applying ${applicableMigrations.length} migration(s)...`);
  log();

  for (const migration of applicableMigrations) {
    divider();
    log(`Migration: ${migration.version} - ${migration.description}`);
    divider();
    migration.migrate(projectDir, frameworkPath, config);
    log();
  }

  // Clean up orphaned files after all migrations
  const hasGitHubWorkflow = fs.existsSync(path.join(projectDir, '.claude', 'hooks', 'workflow-trigger.js'));
  const cleanupConfig = {
    domainSpecialists: config.projectType?.domainSpecialists || [],
    enableGitHubWorkflow: hasGitHubWorkflow,
  };
  const cleanupResult = cleanupOrphanedFiles(projectDir, cleanupConfig);
  if (cleanupResult.removed.length > 0) {
    divider();
    log('Cleanup: Remove orphaned files');
    divider();
    for (const file of cleanupResult.removed) {
      logSuccess(`  ✓ Removed: ${file}`);
    }
    log();
  }

  // Update installed version
  config.installedVersion = currentVersion;
  config.migratedDate = getCurrentDate();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  logSuccess(`Migration complete. Updated to version ${currentVersion}`);
}

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
  // Check for --migrate flag
  const args = process.argv.slice(2);
  const migrateMode = args.includes('--migrate');

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

    // Migration mode (deprecated - now handled automatically)
    if (migrateMode) {
      logCyan('╔══════════════════════════════════════╗');
      logCyan('║    IDPF Framework Migration Tool     ║');
      logCyan('╚══════════════════════════════════════╝');
      log();

      const cwd = process.cwd();
      const manifestPath = path.join(cwd, 'framework-manifest.json');
      const configPath = path.join(cwd, 'framework-config.json');

      // If running from framework directory, do bulk update
      if (fs.existsSync(manifestPath)) {
        log(colors.dim('Note: --migrate flag is no longer needed.'));
        log(colors.dim('Just run: node install.js'));
        log();

        const results = updateTrackedProjects(cwd);
        log();
        divider();
        log(`  Updated: ${colors.green(results.updated)}  Current: ${colors.cyan(results.current)}  Removed: ${colors.yellow(results.removed)}  Failed: ${colors.red(results.failed)}`);
        divider();
        return;
      }

      // If running from project directory
      if (!fs.existsSync(configPath)) {
        logError('No framework-config.json found in current directory.');
        logError('');
        logError('To update all projects, run from the framework directory:');
        logError('  cd [framework-path]');
        logError('  node install.js');
        process.exit(1);
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const frameworkPath = config.frameworkPath;

      if (!fs.existsSync(path.join(frameworkPath, 'framework-manifest.json'))) {
        logError(`Framework not found at: ${frameworkPath}`);
        logError('Please update frameworkPath in framework-config.json');
        process.exit(1);
      }

      log(`Project: ${cwd}`);
      log(`Framework: ${frameworkPath}`);
      log();

      runMigrations(cwd, frameworkPath);

      // Update tracking
      trackProject(frameworkPath, cwd, readFrameworkVersion(frameworkPath));
      return;
    }

    // Banner (normal install mode)
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
      const version = readFrameworkVersion(frameworkPath);
      log(`  Framework: ${colors.cyan(frameworkPath)}`);
      log(`  Version:   ${colors.green(version)}`);
      log();

      // Step 1: Check for tracked projects and prompt before updating
      const trackedData = readInstalledProjects(frameworkPath);
      if (trackedData.projects.length > 0) {
        log(`Found ${colors.cyan(trackedData.projects.length)} tracked project(s):`);
        for (const project of trackedData.projects) {
          log(`  • ${colors.dim(project.path)}`);
        }
        log();

        const { updateProjects } = await prompts({
          type: 'confirm',
          name: 'updateProjects',
          message: 'Update/migrate these projects now?',
          initial: true,
        }, { onCancel });

        if (updateProjects) {
          const results = updateTrackedProjects(frameworkPath);
          log();
          divider();
          log(`  Updated: ${colors.green(results.updated)}  Current: ${colors.cyan(results.current)}  Removed: ${colors.yellow(results.removed)}  Failed: ${colors.red(results.failed)}`);
          divider();
          log();
        } else {
          log();
          logWarning('Skipped updating tracked projects.');
          log();
        }
      }

      // Step 2: Ask if user wants to install to another project
      const { installNew } = await prompts({
        type: 'confirm',
        name: 'installNew',
        message: trackedData.projects.length > 0
          ? 'Install to another project?'
          : 'Install to a project?',
        initial: true,
      }, { onCancel });

      if (!installNew) {
        if (trackedData.projects.length > 0) {
          logSuccess('All projects updated!');
        } else {
          log('No projects installed.');
        }
        process.exit(0);
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
    //  GitHub Workflow Integration (always enabled)
    // ======================================

    const enableGitHubWorkflow = true;
    logSuccess('GitHub workflow integration enabled');
    log(colors.dim('  Workflow triggers: bug:, enhancement:, finding:, idea:, proposal:, prd:'));
    log(colors.dim('  Requires: gh CLI + gh-pmu extension (setup instructions at end)'));
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

    // Deploy rules to .claude/rules/
    const rulesResult = deployRules(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, enableGitHubWorkflow);
    if (rulesResult.ah) {
      logSuccess('  ✓ .claude/rules/01-anti-hallucination.md');
    }
    if (rulesResult.gh) {
      logSuccess('  ✓ .claude/rules/02-github-workflow.md');
    }
    if (rulesResult.startup) {
      logSuccess('  ✓ .claude/rules/03-startup.md');
    }

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
    const settingsResult = generateSettingsLocal(projectDir, enableGitHubWorkflow);
    if (settingsResult === 'merged') {
      logSuccess('  ✓ .claude/settings.local.json (added hooks to existing)');
    } else if (settingsResult) {
      logSuccess('  ✓ .claude/settings.local.json' + (enableGitHubWorkflow ? ' (with hooks)' : ''));
    } else {
      logWarning('  ⊘ .claude/settings.local.json (preserved existing)');
    }

    // Clean up orphaned files from previous installations
    const cleanupConfig = {
      domainSpecialists: selectedDomains,
      enableGitHubWorkflow: enableGitHubWorkflow,
    };
    const cleanupResult = cleanupOrphanedFiles(projectDir, cleanupConfig);
    if (cleanupResult.removed.length > 0) {
      log();
      log(colors.dim('  Cleaning up orphaned files...'));
      for (const file of cleanupResult.removed) {
        logSuccess(`    ✓ Removed: ${file}`);
      }
    }

    // Track the installation
    trackProject(frameworkPath, projectDir, version);

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
    log(`  ${colors.dim('GitHub Workflow:')}    ${colors.green('Enabled')}`);
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
    log('    4. Complete GitHub workflow setup (see above)');
    log('    5. Start Claude Code CLI in that directory');
    log();

    // If running from framework directory, ask about additional deployments
    if (inFrameworkDir) {
      const { installAnother } = await prompts({
        type: 'confirm',
        name: 'installAnother',
        message: 'Install to another project?',
        initial: false,
      }, { onCancel });

      if (installAnother) {
        // Recursive call - will restart the whole flow
        return main();
      }
    }

  } catch (err) {
    logError(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Run
main();
