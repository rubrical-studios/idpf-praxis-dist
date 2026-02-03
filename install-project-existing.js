#!/usr/bin/env node
/**
 * @framework-script 0.35.2
 * IDPF Existing Project Installer
 * Adds IDPF integration to an existing codebase.
 *
 * Usage: node install-project-existing.js [--target <path>] [--hub <path>]
 *
 * This script adds symlinks to the central hub, interactive configuration,
 * and optional git setup to existing projects without modifying existing files.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// ======================================
//  Console UI (reused pattern)
// ======================================

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

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

// ======================================
//  Hub Detection
// ======================================

/**
 * Auto-detect hub path from script location
 */
function detectHubPath() {
  return __dirname;
}

/**
 * Read framework version from manifest
 */
function readFrameworkVersion(hubPath) {
  const manifestPath = path.join(hubPath, 'framework-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.version || 'unknown';
  }
  return 'unknown';
}

/**
 * Read domain specialists from manifest
 * Falls back to a minimal list if manifest is missing or malformed
 */
function readDomainSpecialists(hubPath) {
  const manifestPath = path.join(hubPath, 'framework-manifest.json');
  const fallback = ['Full-Stack-Developer', 'Backend-Specialist', 'Frontend-Specialist'];

  try {
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (Array.isArray(manifest.domainSpecialists) && manifest.domainSpecialists.length > 0) {
        return manifest.domainSpecialists;
      }
    }
  } catch (err) {
    logWarning(`Warning: Could not read domain specialists from manifest: ${err.message}`);
  }

  logWarning('Using fallback domain specialists list');
  return fallback;
}

// ======================================
//  Symlink Setup
// ======================================

/**
 * Create symlink/junction to hub directory
 * Uses junctions on Windows (works without admin)
 */
function createSymlink(target, linkPath) {
  const linkType = process.platform === 'win32' ? 'junction' : 'dir';

  try {
    // Remove existing symlink/directory if present
    if (fs.existsSync(linkPath)) {
      fs.rmSync(linkPath, { recursive: true, force: true });
    }

    fs.symlinkSync(target, linkPath, linkType);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Handle existing .claude directory
 * Replaces real files or old symlinks with new symlinks
 */
function handleExistingClaude(projectPath) {
  const claudeDir = path.join(projectPath, '.claude');

  if (fs.existsSync(claudeDir)) {
    // Check if commands/ and rules/ exist
    const commandsPath = path.join(claudeDir, 'commands');
    const rulesPath = path.join(claudeDir, 'rules');

    // Remove existing directories/symlinks (will be replaced)
    if (fs.existsSync(commandsPath)) {
      fs.rmSync(commandsPath, { recursive: true, force: true });
    }
    if (fs.existsSync(rulesPath)) {
      fs.rmSync(rulesPath, { recursive: true, force: true });
    }

    return true; // Had existing .claude/
  }

  return false; // No existing .claude/
}

/**
 * Setup .claude directory with symlinks to hub
 */
function setupProjectSymlinks(projectPath, hubPath) {
  const claudeDir = path.join(projectPath, '.claude');
  fs.mkdirSync(claudeDir, { recursive: true });

  const commandsTarget = path.join(hubPath, '.claude', 'commands');
  const commandsLink = path.join(claudeDir, 'commands');

  const rulesTarget = path.join(hubPath, '.claude', 'rules');
  const rulesLink = path.join(claudeDir, 'rules');

  if (!createSymlink(commandsTarget, commandsLink)) {
    logError('Failed to create symlink for .claude/commands');
    logError('');
    logError('On Windows, either:');
    logError('  1. Enable Developer Mode (Settings > Privacy & Security > For developers)');
    logError('  2. Run as Administrator');
    process.exit(1);
  }

  if (!createSymlink(rulesTarget, rulesLink)) {
    logError('Failed to create symlink for .claude/rules');
    logError('');
    logError('On Windows, either:');
    logError('  1. Enable Developer Mode (Settings > Privacy & Security > For developers)');
    logError('  2. Run as Administrator');
    process.exit(1);
  }

  return true;
}

// ======================================
//  Project Registry
// ======================================

/**
 * Register project in hub's projects.json
 */
function registerProject(hubPath, projectPath, config) {
  const registryPath = path.join(hubPath, '.projects', 'projects.json');

  let registry = { version: '1.0', projects: [] };
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  }

  // Remove existing entry for this path (if any)
  registry.projects = registry.projects.filter(p => p.path !== projectPath);

  // Add new entry
  registry.projects.push({
    name: config.name,
    path: projectPath,
    framework: config.framework,
    domainSpecialist: config.domainSpecialist,
    registeredAt: new Date().toISOString(),
    linkType: process.platform === 'win32' ? 'junction' : 'symlink',
  });

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
}

// ======================================
//  Interactive Prompts
// ======================================

const FRAMEWORKS = ['IDPF-Agile', 'IDPF-Vibe'];

/**
 * Create readline interface
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Ask a question and return the answer
 */
function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Display a numbered menu and get selection
 */
async function selectFromList(rl, prompt, options) {
  log();
  log(colors.cyan(prompt));
  options.forEach((opt, i) => {
    log(`  ${colors.green(i + 1)}. ${opt}`);
  });
  log();

  while (true) {
    const answer = await ask(rl, `  Enter number (1-${options.length}): `);
    const num = parseInt(answer, 10);
    if (num >= 1 && num <= options.length) {
      return options[num - 1];
    }
    logWarning(`  Please enter a number between 1 and ${options.length}`);
  }
}

/**
 * Prompt for project configuration
 */
async function promptConfiguration(rl, defaultName, hubPath) {
  divider();
  log(colors.cyan('  Project Configuration'));
  divider();
  log();

  // Project name
  const nameAnswer = await ask(rl, `  Project name [${defaultName}]: `);
  const name = nameAnswer || defaultName;

  // Framework selection
  const framework = await selectFromList(
    rl,
    '  Select process framework:',
    FRAMEWORKS
  );

  // Domain specialist selection (read from manifest)
  const domainSpecialists = readDomainSpecialists(hubPath);
  const domainSpecialist = await selectFromList(
    rl,
    '  Select domain specialist:',
    domainSpecialists
  );

  return { name, framework, domainSpecialist };
}

/**
 * Check if gh pmu is available
 */
function isGhPmuAvailable() {
  try {
    execSync('gh pmu --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Run gh pmu init interactively
 */
function runGhPmuInit(projectPath) {
  try {
    execSync('gh pmu init', {
      cwd: projectPath,
      stdio: 'inherit',
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if git is available
 */
function isGitAvailable() {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if directory is a git repository
 */
function isGitRepo(projectPath) {
  try {
    execSync('git rev-parse --git-dir', { cwd: projectPath, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if gh CLI is available and authenticated
 */
function isGhAvailable() {
  try {
    execSync('gh auth status', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Initialize git repository
 */
function initGitRepo(projectPath) {
  try {
    execSync('git init', { cwd: projectPath, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Create initial commit
 */
function createInitialCommit(projectPath) {
  try {
    execSync('git add .', { cwd: projectPath, stdio: 'pipe' });
    execSync('git commit -m "Add IDPF integration"', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Create GitHub remote repository and push
 */
function createGitHubRepo(projectPath, projectName) {
  try {
    execSync(`gh repo create "${projectName}" --source=. --push`, {
      cwd: projectPath,
      stdio: 'inherit',
    });
    return true;
  } catch {
    return false;
  }
}

// ======================================
//  Main Installation
// ======================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const targetIdx = args.indexOf('--target');
  const hubIdx = args.indexOf('--hub');

  // Default target to current directory
  const targetPath = targetIdx !== -1 && targetIdx < args.length - 1
    ? path.resolve(args[targetIdx + 1])
    : process.cwd();

  const hubPath = hubIdx !== -1 && hubIdx < args.length - 1
    ? path.resolve(args[hubIdx + 1])
    : detectHubPath();

  // Validate target exists
  if (!fs.existsSync(targetPath)) {
    logError('ERROR: Target directory does not exist');
    logError(`  Target: ${targetPath}`);
    logError('');
    logError('For existing projects, the target directory must already exist.');
    logError('To create a new project, use: node install-project-new.js --target <path>');
    process.exit(1);
  }

  // Validate hub
  if (!fs.existsSync(path.join(hubPath, 'framework-manifest.json'))) {
    logError('ERROR: Invalid hub path - framework-manifest.json not found');
    logError(`  Hub: ${hubPath}`);
    process.exit(1);
  }

  const version = readFrameworkVersion(hubPath);

  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║  IDPF Existing Project Installer     ║');
  logCyan('╚══════════════════════════════════════╝');
  log();

  divider();
  log(`  Hub:     ${colors.cyan(hubPath)}`);
  log(`  Target:  ${colors.cyan(targetPath)}`);
  log(`  Version: ${colors.green(version)}`);
  divider();
  log();

  // Handle existing .claude/ directory
  const hadExisting = handleExistingClaude(targetPath);
  if (hadExisting) {
    logSuccess('  ✓ Replaced existing .claude/ with symlinks');
  }

  // Setup symlinks
  setupProjectSymlinks(targetPath, hubPath);
  logSuccess('  ✓ Created .claude/commands symlink');
  logSuccess('  ✓ Created .claude/rules symlink');

  // Create readline interface for interactive prompts
  const rl = createInterface();

  // Create project config (skip if exists, otherwise prompt)
  const configPath = path.join(targetPath, '.idpf-project.json');
  let config;

  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    logSuccess('  ✓ .idpf-project.json (preserved)');
  } else {
    // Interactive configuration
    const defaultName = path.basename(targetPath);
    const userConfig = await promptConfiguration(rl, defaultName, hubPath);

    config = {
      name: userConfig.name,
      hub: path.relative(targetPath, hubPath),
      framework: userConfig.framework,
      domainSpecialist: userConfig.domainSpecialist,
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    logSuccess('  ✓ Created .idpf-project.json');
  }

  // Create CHARTER.md (skip if exists)
  const charterPath = path.join(targetPath, 'CHARTER.md');
  if (fs.existsSync(charterPath)) {
    logSuccess('  ✓ CHARTER.md (preserved)');
  } else {
    const charterContent = `# Project Charter

> This file triggers the \`/charter\` command on first session.
> Replace this content with your project charter.

## Project: ${config.name}

### Vision
{Describe the project vision}

### Goals
- {Goal 1}
- {Goal 2}

### Tech Stack
- {Technology 1}
- {Technology 2}
`;
    fs.writeFileSync(charterPath, charterContent);
    logSuccess('  ✓ Created CHARTER.md template');
  }

  // GitHub project setup via gh pmu init (skip if .gh-pmu.yml exists)
  log();
  const ghPmuPath = path.join(targetPath, '.gh-pmu.yml');
  if (fs.existsSync(ghPmuPath)) {
    logSuccess('  ✓ .gh-pmu.yml (preserved)');
  } else if (isGhPmuAvailable()) {
    const runInit = await ask(rl, '  Run gh pmu init for GitHub project setup? [Y/n]: ');
    if (runInit.toLowerCase() !== 'n') {
      log();
      if (runGhPmuInit(targetPath)) {
        logSuccess('  ✓ Created .gh-pmu.yml via gh pmu init');
      } else {
        logWarning('  ⊘ gh pmu init failed - run manually later');
      }
    } else {
      logWarning('  ⊘ Skipped gh pmu init - run: gh pmu init');
    }
  } else {
    logWarning('  ⊘ gh pmu not found - install: gh extension install rubrical-studios/gh-pmu');
  }

  // Optional git repository setup (only if not already a git repo)
  log();
  let gitStatus = 'existing';
  if (isGitRepo(targetPath)) {
    logSuccess('  ✓ Git repository (existing)');
  } else if (isGitAvailable()) {
    const initGit = await ask(rl, '  Initialize git repository? [y/N]: ');
    if (initGit.toLowerCase() === 'y') {
      if (initGitRepo(targetPath)) {
        logSuccess('  ✓ Initialized git repository');
        gitStatus = 'initialized';

        // Create initial commit
        if (createInitialCommit(targetPath)) {
          logSuccess('  ✓ Created initial commit');
        }

        // Ask about GitHub remote
        if (isGhAvailable()) {
          const createRemote = await ask(rl, '  Create GitHub remote repository? [y/N]: ');
          if (createRemote.toLowerCase() === 'y') {
            log();
            if (createGitHubRepo(targetPath, config.name)) {
              logSuccess('  ✓ Created GitHub repository and pushed');
              gitStatus = 'pushed';
            } else {
              logWarning('  ⊘ GitHub repo creation failed - create manually');
            }
          } else {
            logSuccess('  ✓ Local repository only (no remote)');
          }
        } else {
          logWarning('  ⊘ GitHub CLI not authenticated - skipping remote setup');
        }
      } else {
        logWarning('  ⊘ git init failed');
        gitStatus = 'skipped';
      }
    } else {
      logSuccess('  ✓ Skipped git initialization');
      gitStatus = 'skipped';
    }
  } else {
    logWarning('  ⊘ git not found - skipping repository setup');
    gitStatus = 'skipped';
  }

  // Close readline interface
  rl.close();

  // Register project in hub
  registerProject(hubPath, targetPath, config);
  logSuccess('  ✓ Registered project in hub');

  // Success message
  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║     IDPF Integration Complete!       ║');
  logCyan('╚══════════════════════════════════════╝');
  log();
  log(`  ${colors.dim('Project:')}     ${targetPath}`);
  log(`  ${colors.dim('Framework:')}   ${colors.green(config.framework)}`);
  log(`  ${colors.dim('Specialist:')}  ${colors.green(config.domainSpecialist)}`);
  log(`  ${colors.dim('Git Status:')}  ${colors.green(gitStatus)}`);
  log();

  logCyan('  Next steps:');
  log('    1. Review CHARTER.md and customize for your project');
  log('    2. Start Claude Code in this directory');
  log();
}

main().catch(err => {
  logError(`Error: ${err.message}`);
  process.exit(1);
});
