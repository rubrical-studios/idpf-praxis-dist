#!/usr/bin/env node
/**
 * @framework-script 0.40.0
 * IDPF New Project Installer
 * Creates a new project directory with full IDPF integration.
 *
 * Usage: node install-project-new.js --target <path> [--hub <path>]
 *
 * This script creates a new project with symlinks to the central hub,
 * interactive configuration, and optional git setup.
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
    // Remove existing symlink if present
    if (fs.existsSync(linkPath)) {
      fs.rmSync(linkPath, { recursive: true, force: true });
    }

    fs.symlinkSync(target, linkPath, linkType);
    return true;
  } catch (_err) {
    return false;
  }
}

// ======================================
//  Extensible Commands Handling
// ======================================

/**
 * Check if a command file is extensible (vs managed)
 * Extensible commands have <!-- EXTENSIBLE --> marker
 * Managed commands have <!-- MANAGED --> marker
 */
function isExtensibleCommand(content) {
  return content.includes('<!-- EXTENSIBLE -->');
}

/**
 * Strip FRAMEWORK-ONLY content from command file
 * Removes content between <!-- FRAMEWORK-ONLY-START --> and <!-- FRAMEWORK-ONLY-END -->
 */
function stripFrameworkOnlyContent(content) {
  const regex = /<!-- FRAMEWORK-ONLY-START -->[\s\S]*?<!-- FRAMEWORK-ONLY-END -->/g;
  return content.replace(regex, '');
}

// ======================================
//  Extension Directory Management
// ======================================

/**
 * Commands that support user extension points
 * These get dedicated directories under .claude/scripts/{command}/
 */
const EXTENSIBLE_COMMANDS = [
  // Existing extensible commands
  'create-branch',
  'prepare-release',
  'prepare-beta',
  'merge-branch',
  'destroy-branch',
  'create-prd',
  // New extensible commands (per #1080)
  'work',
  'done',
  'bug',
  'enhancement',
  'proposal',
  'review-proposal',
  'review-prd',
  'review-issue'
];

/**
 * Create project-owned extension directories
 * These directories are NOT symlinked and survive hub reinstalls
 *
 * Structure:
 *   .claude/extensions/           - General extension point
 *   .claude/scripts/{command}/    - Per-command extension scripts
 *
 * Returns: { extensions: boolean, commands: string[] }
 */
function createExtensionDirectories(projectPath) {
  const results = { extensions: false, commands: [] };
  const claudeDir = path.join(projectPath, '.claude');

  // Create .claude/extensions/ with .gitkeep
  const extensionsDir = path.join(claudeDir, 'extensions');
  if (!fs.existsSync(extensionsDir)) {
    fs.mkdirSync(extensionsDir, { recursive: true });
    fs.writeFileSync(path.join(extensionsDir, '.gitkeep'), '');
    results.extensions = true;
  }

  // Create .claude/scripts/{command}/ directories with .gitkeep
  const scriptsDir = path.join(claudeDir, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });

  for (const command of EXTENSIBLE_COMMANDS) {
    const commandDir = path.join(scriptsDir, command);
    if (!fs.existsSync(commandDir)) {
      fs.mkdirSync(commandDir, { recursive: true });
      fs.writeFileSync(path.join(commandDir, '.gitkeep'), '');
      results.commands.push(command);
    }
  }

  return results;
}

/**
 * Copy extensible commands to project
 * For new projects, there are no existing extensions to preserve
 *
 * Returns: { copied: string[], skipped: string[], preserved: string[] }
 */
function copyExtensibleCommands(hubPath, projectPath) {
  const results = { copied: [], skipped: [], preserved: [] };

  const hubCommandsDir = path.join(hubPath, '.claude', 'commands');
  const projectCommandsDir = path.join(projectPath, '.claude', 'commands');

  fs.mkdirSync(projectCommandsDir, { recursive: true });

  if (!fs.existsSync(hubCommandsDir)) {
    return results;
  }

  const commandFiles = fs.readdirSync(hubCommandsDir).filter(f => f.endsWith('.md'));

  for (const file of commandFiles) {
    const hubFilePath = path.join(hubCommandsDir, file);
    const projectFilePath = path.join(projectCommandsDir, file);
    const hubContent = fs.readFileSync(hubFilePath, 'utf8');

    if (isExtensibleCommand(hubContent)) {
      // Extensible command: copy with FRAMEWORK-ONLY stripped
      const newContent = stripFrameworkOnlyContent(hubContent);
      fs.writeFileSync(projectFilePath, newContent);
      results.copied.push(file);
    } else {
      // Managed command: copy as-is
      fs.copyFileSync(hubFilePath, projectFilePath);
      results.skipped.push(file);
    }
  }

  return results;
}

/**
 * Setup .claude directory with symlinks to hub and copied commands
 * Symlinks: rules, hooks, scripts/shared, metadata, skills
 * Copies: commands (extensible commands with FRAMEWORK-ONLY stripped)
 */
function setupProjectSymlinks(projectPath, hubPath) {
  const claudeDir = path.join(projectPath, '.claude');
  fs.mkdirSync(claudeDir, { recursive: true });

  const results = {
    commands: { copied: [], skipped: [], preserved: [] },
    rules: false,
    hooks: false,
    scripts: false,
    metadata: false,
    skills: false,
    extensionDirs: { extensions: false, commands: [] }
  };

  // Commands: COPY (not symlink) - extensible commands with FRAMEWORK-ONLY stripped
  results.commands = copyExtensibleCommands(hubPath, projectPath);

  // Rules symlink
  const rulesTarget = path.join(hubPath, '.claude', 'rules');
  const rulesLink = path.join(claudeDir, 'rules');
  if (fs.existsSync(rulesTarget)) {
    results.rules = createSymlink(rulesTarget, rulesLink);
  }

  // Hooks symlink
  const hooksTarget = path.join(hubPath, '.claude', 'hooks');
  const hooksLink = path.join(claudeDir, 'hooks');
  if (fs.existsSync(hooksTarget)) {
    results.hooks = createSymlink(hooksTarget, hooksLink);
  }

  // Scripts/shared symlink
  const scriptsDir = path.join(claudeDir, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });
  const scriptsTarget = path.join(hubPath, '.claude', 'scripts', 'shared');
  const scriptsLink = path.join(scriptsDir, 'shared');
  if (fs.existsSync(scriptsTarget)) {
    results.scripts = createSymlink(scriptsTarget, scriptsLink);
  }

  // Metadata symlink (skill-registry.json, extension-recipes.json)
  const metadataTarget = path.join(hubPath, '.claude', 'metadata');
  const metadataLink = path.join(claudeDir, 'metadata');
  if (fs.existsSync(metadataTarget)) {
    results.metadata = createSymlink(metadataTarget, metadataLink);
  }

  // Skills symlink (extracted skill packages)
  const skillsTarget = path.join(hubPath, '.claude', 'skills');
  const skillsLink = path.join(claudeDir, 'skills');
  if (fs.existsSync(skillsTarget)) {
    results.skills = createSymlink(skillsTarget, skillsLink);
  }

  // Extension directories (project-owned, not symlinked)
  // These provide locations for per-command pre/post hooks
  results.extensionDirs = createExtensionDirectories(projectPath);

  // Check for critical failures (rules must be symlinked, commands must have files)
  const commandsCopied = results.commands.copied.length + results.commands.skipped.length;
  if (commandsCopied === 0 || !results.rules) {
    logError('Failed to setup .claude/ directory');
    logError('');
    if (commandsCopied === 0) {
      logError('  No commands were copied from hub');
    }
    if (!results.rules) {
      logError('  Failed to create rules symlink');
      logError('');
      logError('On Windows, either:');
      logError('  1. Enable Developer Mode (Settings > Privacy & Security > For developers)');
      logError('  2. Run as Administrator');
    }
    process.exit(1);
  }

  return results;
}

/**
 * Update .gitignore to exclude symlinked directories
 * These point to hub-specific paths and should not be committed
 * NOTE: .claude/commands is NOT excluded - it's project-owned (copied, not symlinked)
 */
function updateGitignore(projectPath) {
  const gitignorePath = path.join(projectPath, '.gitignore');
  const entriesToAdd = [
    '# IDPF hub symlinks (machine-specific, do not commit)',
    '# NOTE: .claude/commands is committed (project-owned, not symlinked)',
    '.claude/hooks',
    '.claude/metadata',
    '.claude/rules',
    '.claude/scripts/shared',
    '.claude/skills',
    'run_claude.cmd',
    'run_claude.sh',
    'runp_claude.cmd',
    'runp_claude.sh',
  ];

  let content = '';
  let existingEntries = new Set();

  // Read existing .gitignore if it exists
  if (fs.existsSync(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf8');
    // Track existing entries (trimmed, non-empty, non-comment lines)
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        existingEntries.add(trimmed);
      }
    }
  }

  // Determine which entries need to be added
  const newEntries = entriesToAdd.filter(entry => {
    if (entry.startsWith('#')) return true; // Always include comments for context
    return !existingEntries.has(entry);
  });

  // Skip if all entries already exist (except comment)
  const nonCommentNew = newEntries.filter(e => !e.startsWith('#'));
  if (nonCommentNew.length === 0) {
    return { updated: false, entriesAdded: 0 };
  }

  // Append new entries
  const suffix = content.endsWith('\n') || content === '' ? '' : '\n';
  const addition = newEntries.join('\n') + '\n';
  fs.writeFileSync(gitignorePath, content + suffix + addition);

  return { updated: true, entriesAdded: nonCommentNew.length };
}

/**
 * Copy launcher scripts to project root
 * Platform-specific: .cmd for Windows, .sh for Unix
 */
function copyLauncherScripts(projectPath, hubPath) {
  const results = { run: false, runp: false };
  const templatesDir = path.join(hubPath, 'Templates');

  if (process.platform === 'win32') {
    // Windows: copy .cmd files
    const runSrc = path.join(templatesDir, 'run_claude.cmd');
    const runDest = path.join(projectPath, 'run_claude.cmd');
    if (fs.existsSync(runSrc)) {
      fs.copyFileSync(runSrc, runDest);
      results.run = true;
    }

    const runpSrc = path.join(templatesDir, 'runp_claude.cmd');
    const runpDest = path.join(projectPath, 'runp_claude.cmd');
    if (fs.existsSync(runpSrc)) {
      fs.copyFileSync(runpSrc, runpDest);
      results.runp = true;
    }
  } else {
    // Unix: copy .sh files and make executable
    const runSrc = path.join(templatesDir, 'run_claude.sh');
    const runDest = path.join(projectPath, 'run_claude.sh');
    if (fs.existsSync(runSrc)) {
      fs.copyFileSync(runSrc, runDest);
      fs.chmodSync(runDest, '755');
      results.run = true;
    }

    const runpSrc = path.join(templatesDir, 'runp_claude.sh');
    const runpDest = path.join(projectPath, 'runp_claude.sh');
    if (fs.existsSync(runpSrc)) {
      fs.copyFileSync(runpSrc, runpDest);
      fs.chmodSync(runpDest, '755');
      results.runp = true;
    }
  }

  return results;
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

// TDD skills to include by default in all projects
const TDD_SKILLS = [
  'tdd-red-phase',
  'tdd-green-phase',
  'tdd-refactor-phase',
  'tdd-failure-recovery'
];

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

// ======================================
//  Git & GitHub Setup (matches install.js)
// ======================================

/**
 * Check if a command is available
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
 * Check git remote status
 */
function checkGitRemote(projectPath) {
  const gitDir = path.join(projectPath, '.git');
  if (!fs.existsSync(gitDir)) {
    return { hasGit: false, hasRemote: false };
  }
  try {
    const result = execSync('git remote -v', { cwd: projectPath, stdio: 'pipe' }).toString();
    return { hasGit: true, hasRemote: result.trim().length > 0 };
  } catch {
    return { hasGit: true, hasRemote: false };
  }
}

/**
 * Check GitHub CLI prerequisites
 */
function checkGhCliPrerequisites() {
  const issues = [];

  if (!checkCommand('gh')) {
    issues.push({
      message: 'GitHub CLI (gh) is not installed',
      remediation: 'Install from: https://cli.github.com/',
    });
    return { ready: false, issues };
  }

  try {
    execSync('gh auth status', { stdio: 'pipe' });
  } catch {
    issues.push({
      message: 'GitHub CLI is not authenticated',
      remediation: 'Run: gh auth login',
    });
    return { ready: false, issues };
  }

  // Auto-install gh-pmu extension if missing
  try {
    const extensions = execSync('gh extension list', { stdio: 'pipe' }).toString();
    if (!extensions.includes('gh-pmu')) {
      log(colors.dim('  Installing gh-pmu extension...'));
      try {
        execSync('gh extension install rubrical-studios/gh-pmu', { stdio: 'pipe' });
        logSuccess('  ✓ Installed gh-pmu extension');
      } catch {
        issues.push({
          message: 'Failed to install gh-pmu extension',
          remediation: 'Run: gh extension install rubrical-studios/gh-pmu',
        });
      }
    }
  } catch {
    // Try to install anyway
    try {
      execSync('gh extension install rubrical-studios/gh-pmu', { stdio: 'pipe' });
    } catch {
      issues.push({
        message: 'Failed to install gh-pmu extension',
        remediation: 'Run: gh extension install rubrical-studios/gh-pmu',
      });
    }
  }

  return { ready: issues.length === 0, issues };
}

/**
 * Get current GitHub username
 */
function getGitHubUsername() {
  try {
    return execSync('gh api user --jq ".login"', { stdio: 'pipe' }).toString().trim();
  } catch {
    return null;
  }
}

/**
 * Create GitHub repository
 */
function createGitHubRepo(projectPath, repoName, visibility) {
  try {
    const visFlag = visibility === 'public' ? '--public' : '--private';
    const result = execSync(
      `gh repo create "${repoName}" ${visFlag} --source="${projectPath}" --push`,
      { cwd: projectPath, stdio: 'pipe' }
    ).toString();
    const urlMatch = result.match(/https:\/\/github\.com\/[^\s]+/);
    return { success: true, repoUrl: urlMatch ? urlMatch[0] : `https://github.com/${repoName}` };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Copy project board template
 */
function copyProjectBoard(templateNumber, projectTitle, targetOwner) {
  try {
    const result = execSync(
      `gh project copy ${templateNumber} --source-owner rubrical-studios --target-owner ${targetOwner} --title "${projectTitle}" --format json`,
      { stdio: 'pipe' }
    ).toString();
    const projectData = JSON.parse(result);
    return { success: true, projectNumber: projectData.number, projectUrl: projectData.url };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Link project board to repository
 */
function linkProjectBoard(projectNumber, owner, repoName) {
  try {
    execSync(`gh project link ${projectNumber} --owner ${owner} --repo ${repoName}`, { stdio: 'pipe' });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Generate .gh-pmu.yml configuration
 */
function generateGhPmuConfig(projectPath, projectTitle, projectNumber, owner, repoName) {
  const config = `# gh-pmu configuration
# Generated by IDPF installer

project:
  owner: ${owner}
  number: ${projectNumber}

repositories:
  - ${owner}/${repoName}

fields:
  status:
    values:
      - backlog
      - in_progress
      - in_review
      - done
  priority:
    values:
      - p0
      - p1
      - p2
`;
  fs.writeFileSync(path.join(projectPath, '.gh-pmu.yml'), config);
}

/**
 * Integrated GitHub setup flow (matches install.js)
 */
async function setupGitHubIntegration(rl, projectPath, projectName) {
  const result = { repoUrl: null, projectUrl: null, skipped: false, gitStatus: 'none' };

  // Check git status
  const gitStatus = checkGitRemote(projectPath);

  // Skip if remote already exists
  if (gitStatus.hasRemote) {
    log(colors.dim('  Git remote already configured - skipping GitHub setup'));
    result.skipped = true;
    result.gitStatus = 'existing';
    return result;
  }

  // Check prerequisites
  const ghPrereqs = checkGhCliPrerequisites();
  if (!ghPrereqs.ready) {
    logWarning('  GitHub setup skipped - prerequisites not met:');
    for (const issue of ghPrereqs.issues) {
      log(`    ${colors.yellow('⚠')} ${issue.message}`);
      log(`      ${colors.cyan(issue.remediation)}`);
    }
    result.skipped = true;
    return result;
  }

  // Single prompt for GitHub integration
  log();
  divider();
  logCyan('  GitHub Repository Setup');
  divider();
  log();
  log('  Would you like to set up GitHub integration?');
  log(colors.dim('  This will create a GitHub repository and project board.'));
  log();

  const setupGitHub = await ask(rl, '  Set up GitHub integration? [Y/n]: ');
  if (setupGitHub.toLowerCase() === 'n') {
    logWarning('  GitHub setup skipped.');
    result.skipped = true;

    // Offer local git only
    if (!gitStatus.hasGit && checkCommand('git')) {
      const initLocal = await ask(rl, '  Initialize local git repository? [Y/n]: ');
      if (initLocal.toLowerCase() !== 'n') {
        try {
          execSync('git init', { cwd: projectPath, stdio: 'pipe' });
          execSync('git add .', { cwd: projectPath, stdio: 'pipe' });
          execSync('git commit -m "Initial commit via IDPF installer"', { cwd: projectPath, stdio: 'pipe' });
          logSuccess('  ✓ Initialized local git repository');
          result.gitStatus = 'local';
        } catch {
          logWarning('  ⊘ Failed to initialize git');
        }
      }
    }
    return result;
  }

  // Get configuration
  const ghUsername = getGitHubUsername();
  if (!ghUsername) {
    logWarning('  ⊘ Could not determine GitHub username');
    result.skipped = true;
    return result;
  }

  const repoNameAnswer = await ask(rl, `  Repository name [${projectName}]: `);
  const repoName = repoNameAnswer || projectName;

  const visibilityAnswer = await ask(rl, '  Repository visibility (1=Private, 2=Public) [1]: ');
  const visibility = visibilityAnswer === '2' ? 'public' : 'private';

  const templateAnswer = await ask(rl, '  Project template number [30]: ');
  const templateNumber = parseInt(templateAnswer, 10) || 30;

  const projectTitleAnswer = await ask(rl, `  Project board title [${repoName}]: `);
  const projectTitle = projectTitleAnswer || repoName;

  log();
  log(colors.dim('  Creating GitHub resources...'));
  log();

  // Initialize git if needed
  if (!gitStatus.hasGit) {
    try {
      execSync('git init', { cwd: projectPath, stdio: 'pipe' });
      logSuccess('  ✓ Initialized git repository');
    } catch (err) {
      logError(`  ✗ Failed to initialize git: ${err.message}`);
    }
  }

  // Create initial commit
  try {
    execSync('git rev-parse HEAD', { cwd: projectPath, stdio: 'pipe' });
  } catch {
    try {
      execSync('git add -A', { cwd: projectPath, stdio: 'pipe' });
      execSync('git commit -m "Initial commit via IDPF installer"', { cwd: projectPath, stdio: 'pipe' });
      logSuccess('  ✓ Created initial commit');
    } catch (err) {
      logWarning(`  ⚠ Could not create initial commit: ${err.message}`);
    }
  }

  // Create GitHub repository
  const repoResult = createGitHubRepo(projectPath, repoName, visibility);
  if (repoResult.success) {
    logSuccess(`  ✓ Created repository: ${repoResult.repoUrl}`);
    result.repoUrl = repoResult.repoUrl;
    result.gitStatus = 'pushed';
  } else {
    logError(`  ✗ Failed to create repository: ${repoResult.error}`);
    result.gitStatus = 'local';
  }

  // Copy project board
  const projectResult = copyProjectBoard(templateNumber, projectTitle, ghUsername);
  if (projectResult.success) {
    logSuccess(`  ✓ Copied project board: ${projectResult.projectUrl || `#${projectResult.projectNumber}`}`);
    result.projectUrl = projectResult.projectUrl;

    // Link project to repository
    if (repoResult.success && projectResult.projectNumber) {
      const linkResult = linkProjectBoard(projectResult.projectNumber, ghUsername, repoName);
      if (linkResult.success) {
        logSuccess('  ✓ Linked project board to repository');
      } else {
        logWarning(`  ⚠ Could not link project: ${linkResult.error}`);
      }
    }

    // Generate .gh-pmu.yml
    if (projectResult.projectNumber) {
      generateGhPmuConfig(projectPath, projectTitle, projectResult.projectNumber, ghUsername, repoName);
      logSuccess('  ✓ Generated .gh-pmu.yml');

      // Commit and push config
      try {
        execSync('git add .gh-pmu.yml', { cwd: projectPath, stdio: 'pipe' });
        execSync('git commit -m "Add gh-pmu configuration"', { cwd: projectPath, stdio: 'pipe' });
        execSync('git push', { cwd: projectPath, stdio: 'pipe' });
        logSuccess('  ✓ Committed and pushed .gh-pmu.yml');
      } catch (err) {
        logWarning(`  ⚠ Could not push config: ${err.message}`);
      }
    }
  } else {
    logWarning(`  ⚠ Could not copy project board: ${projectResult.error}`);
    log(colors.dim('    You can create a project board manually and run: gh pmu init'));
  }

  return result;
}

// ======================================
//  Main Installation
// ======================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const targetIdx = args.indexOf('--target');
  const hubIdx = args.indexOf('--hub');

  if (targetIdx === -1 || targetIdx === args.length - 1) {
    logError('Usage: node install-project-new.js --target <path> [--hub <path>]');
    logError('');
    logError('Arguments:');
    logError('  --target <path>  Directory for the new project (required)');
    logError('  --hub <path>     Hub location (optional, auto-detected from script location)');
    process.exit(1);
  }

  const targetPath = path.resolve(args[targetIdx + 1]);
  const hubPath = hubIdx !== -1 && hubIdx < args.length - 1
    ? path.resolve(args[hubIdx + 1])
    : detectHubPath();

  // Validate hub
  if (!fs.existsSync(path.join(hubPath, 'framework-manifest.json'))) {
    logError('ERROR: Invalid hub path - framework-manifest.json not found');
    logError(`  Hub: ${hubPath}`);
    process.exit(1);
  }

  const version = readFrameworkVersion(hubPath);

  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║     IDPF New Project Installer       ║');
  logCyan('╚══════════════════════════════════════╝');
  log();

  divider();
  log(`  Hub:     ${colors.cyan(hubPath)}`);
  log(`  Target:  ${colors.cyan(targetPath)}`);
  log(`  Version: ${colors.green(version)}`);
  divider();
  log();

  // Create target directory
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    logSuccess('  ✓ Created project directory');
  }

  // Setup .claude/ structure: copy commands, symlink everything else
  const setupResults = setupProjectSymlinks(targetPath, hubPath);

  // Report command copy results
  const cmdResults = setupResults.commands;
  const totalCmds = cmdResults.copied.length + cmdResults.skipped.length;
  logSuccess(`  ✓ Copied ${totalCmds} commands (${cmdResults.copied.length} extensible)`);

  // Report symlink results
  if (setupResults.rules) logSuccess('  ✓ Created .claude/rules symlink');
  if (setupResults.hooks) logSuccess('  ✓ Created .claude/hooks symlink');
  if (setupResults.scripts) logSuccess('  ✓ Created .claude/scripts/shared symlink');
  if (setupResults.metadata) logSuccess('  ✓ Created .claude/metadata symlink');
  if (setupResults.skills) logSuccess('  ✓ Created .claude/skills symlink');

  // Report extension directory results
  const extDirs = setupResults.extensionDirs;
  if (extDirs.extensions || extDirs.commands.length > 0) {
    const extCount = extDirs.commands.length;
    logSuccess(`  ✓ Created extension directories (.claude/extensions + ${extCount} command dirs)`);
  }

  // Update .gitignore to exclude symlinked directories
  const gitignoreResult = updateGitignore(targetPath);
  if (gitignoreResult.updated) {
    logSuccess(`  ✓ Updated .gitignore (${gitignoreResult.entriesAdded} entries added)`);
  }

  // Copy launcher scripts
  const launcherResults = copyLauncherScripts(targetPath, hubPath);
  if (launcherResults.run) logSuccess(`  ✓ Copied run_claude.${process.platform === 'win32' ? 'cmd' : 'sh'}`);
  if (launcherResults.runp) logSuccess(`  ✓ Copied runp_claude.${process.platform === 'win32' ? 'cmd' : 'sh'}`);

  // Interactive configuration
  const rl = createInterface();
  const defaultName = path.basename(targetPath);
  const userConfig = await promptConfiguration(rl, defaultName, hubPath);

  const config = {
    name: userConfig.name,
    hub: path.relative(targetPath, hubPath),
    framework: userConfig.framework,
    domainSpecialist: userConfig.domainSpecialist,
  };

  const configPath = path.join(targetPath, '.idpf-project.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  logSuccess('  ✓ Created .idpf-project.json');

  // Create framework-config.json with TDD skills
  const frameworkConfigPath = path.join(targetPath, 'framework-config.json');
  const frameworkConfig = {
    frameworkVersion: readFrameworkVersion(hubPath),
    installedDate: new Date().toISOString().split('T')[0],
    processFramework: config.framework,
    frameworkPath: config.hub,
    projectSkills: [...TDD_SKILLS]
  };
  fs.writeFileSync(frameworkConfigPath, JSON.stringify(frameworkConfig, null, 2) + '\n');
  logSuccess('  ✓ Created framework-config.json');

  // Create CHARTER.md placeholder
  const charterPath = path.join(targetPath, 'CHARTER.md');
  if (!fs.existsSync(charterPath)) {
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

  // GitHub integration (single integrated flow matching install.js)
  const githubResult = await setupGitHubIntegration(rl, targetPath, config.name);

  // Close readline interface
  rl.close();

  // Register project in hub
  registerProject(hubPath, targetPath, config);
  logSuccess('  ✓ Registered project in hub');

  // Success message
  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║     Project Created Successfully!    ║');
  logCyan('╚══════════════════════════════════════╝');
  log();
  log(`  ${colors.dim('Project:')}     ${targetPath}`);
  log(`  ${colors.dim('Framework:')}   ${colors.green(config.framework)}`);
  log(`  ${colors.dim('Specialist:')}  ${colors.green(config.domainSpecialist)}`);
  log(`  ${colors.dim('Git Status:')}  ${colors.green(githubResult.gitStatus)}`);
  log();

  logCyan('  Next steps:');
  log(`    1. ${colors.cyan(`cd ${targetPath}`)}`);
  log('    2. Run Claude Code to configure project charter');
  log('    3. Start development!');
  log();
}

main().catch(err => {
  logError(`Error: ${err.message}`);
  process.exit(1);
});
