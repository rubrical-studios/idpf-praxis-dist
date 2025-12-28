/**
 * deployment.js - Rules, hooks, and commands deployment for IDPF Framework Installer
 * @module install/lib/deployment
 */

const fs = require('fs');
const path = require('path');
const { generateStartupRules } = require('./generation');
const { computeFileHash, writeManifest, readManifest, isFileModified } = require('./checksums');

/**
 * REQ-007 (PRD #559): Create extensibility directory structure
 *
 * Creates the complete directory structure for extensible commands:
 * - .claude/extensions/ (for .md files referenced by commands)
 * - .claude/scripts/framework/ (framework-provided scripts)
 * - .claude/scripts/shared/ (shared utility scripts)
 * - .claude/scripts/shared/lib/ (library modules)
 * - .claude/scripts/{command}/ (user scripts per extensible command)
 * - .claude/hooks/ (framework hooks)
 *
 * @param {string} projectDir - Target project directory
 * @param {string[]} extensibleCommands - List of extensible command names
 * @returns {{created: string[], existed: string[]}} Directories created/existed
 */
function createExtensibilityStructure(projectDir, extensibleCommands = []) {
  const created = [];
  const existed = [];

  // AC-1: .claude/extensions/ with .gitkeep
  const extensionsDir = path.join(projectDir, '.claude', 'extensions');
  createDirWithGitkeep(extensionsDir, created, existed);

  // AC-2: .claude/scripts/framework/
  const frameworkScriptsDir = path.join(projectDir, '.claude', 'scripts', 'framework');
  createDir(frameworkScriptsDir, created, existed);

  // AC-3: .claude/scripts/shared/
  const sharedScriptsDir = path.join(projectDir, '.claude', 'scripts', 'shared');
  createDirWithGitkeep(sharedScriptsDir, created, existed);

  // AC-4: .claude/scripts/shared/lib/
  const libDir = path.join(projectDir, '.claude', 'scripts', 'shared', 'lib');
  createDir(libDir, created, existed);

  // AC-5: .claude/scripts/{command}/ for each extensible command
  const defaultCommands = ['open-release', 'prepare-release', 'prepare-beta', 'close-release'];
  const commandsToCreate = extensibleCommands.length > 0 ? extensibleCommands : defaultCommands;

  for (const cmd of commandsToCreate) {
    const cmdDir = path.join(projectDir, '.claude', 'scripts', cmd);
    createDirWithGitkeep(cmdDir, created, existed);
  }

  // AC-6: .claude/hooks/
  const hooksDir = path.join(projectDir, '.claude', 'hooks');
  createDir(hooksDir, created, existed);

  return { created, existed };
}

/**
 * Create directory recursively (AC-7)
 */
function createDir(dirPath, created, existed) {
  if (fs.existsSync(dirPath)) {
    existed.push(dirPath);
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    created.push(dirPath);
  }
}

/**
 * Create directory with .gitkeep file
 */
function createDirWithGitkeep(dirPath, created, existed) {
  createDir(dirPath, created, existed);
  const gitkeepPath = path.join(dirPath, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
}

/**
 * REQ-008 (PRD #559): Deploy framework-provided scripts with checksum tracking
 *
 * Reads framework-manifest.json and deploys scripts to target directories.
 * Creates .claude/.manifest.json with SHA256 checksums for modification detection.
 *
 * @param {string} projectDir - Target project directory
 * @param {string} frameworkPath - Framework source directory
 * @returns {{deployed: object, modified: string[], manifest: object}} Deployment results
 */
function deployFrameworkScripts(projectDir, frameworkPath) {
  const deployed = { framework: [], shared: [], lib: [], hooks: [] };
  const modified = [];
  const manifestEntries = {};
  const deployedAt = new Date().toISOString().split('T')[0];

  // Read framework manifest
  const manifestPath = path.join(frameworkPath, 'Templates', 'framework-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return { deployed, modified, manifest: {} };
  }

  const frameworkManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const existingManifest = readManifest(projectDir) || { scripts: {} };

  // AC-1: Deploy scripts per category
  const categories = ['framework', 'shared', 'lib', 'hooks'];

  for (const category of categories) {
    const categoryConfig = frameworkManifest.scripts?.[category];
    if (!categoryConfig) continue;

    const sourceDir = path.join(frameworkPath, 'Templates', categoryConfig.source);
    const targetDir = path.join(projectDir, categoryConfig.target);

    // Ensure target directory exists
    fs.mkdirSync(targetDir, { recursive: true });

    for (const file of categoryConfig.files || []) {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, file);

      if (!fs.existsSync(srcPath)) {
        continue;  // Skip missing source files
      }

      // REQ-009: Check if file was modified by user
      const existingEntry = existingManifest.scripts?.[`${category}/${file}`];
      if (existingEntry && fs.existsSync(destPath)) {
        if (isFileModified(destPath, existingEntry.checksum)) {
          modified.push(`${category}/${file}`);
        }
      }

      // AC-3 & AC-4: Copy file from Templates
      fs.copyFileSync(srcPath, destPath);
      deployed[category].push(file);

      // AC-2: Record checksum
      const checksum = computeFileHash(destPath);
      manifestEntries[`${category}/${file}`] = {
        checksum,
        deployedAt,  // AC-3: deployedAt date
        source: `Templates/${categoryConfig.source}${file}`
      };
    }
  }

  // AC-2: Write .claude/.manifest.json
  const manifest = {
    version: frameworkManifest.version,
    deployedAt,
    scripts: manifestEntries
  };
  writeManifest(projectDir, manifest);

  return { deployed, modified, manifest };
}

/**
 * Deploy rules to .claude/rules/ directory
 */
function deployRules(projectDir, frameworkPath, processFramework, domainListStr, primarySpecialist, enableGitHubWorkflow, version) {
  const rulesDir = path.join(projectDir, '.claude', 'rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const results = { antiHallucination: false, githubWorkflow: false, startup: false, windowsShell: false };

  // Copy anti-hallucination rules (always)
  const ahSrc = path.join(frameworkPath, 'Assistant', 'Anti-Hallucination-Rules-for-Software-Development.md');
  const ahDest = path.join(rulesDir, '01-anti-hallucination.md');
  if (fs.existsSync(ahSrc)) {
    // Read source and add Source reference after Version line
    const ahContent = fs.readFileSync(ahSrc, 'utf8');
    const ahWithSource = ahContent.replace(
      /(\*\*Version:\*\* .+)/,
      '$1\n**Source:** Assistant/Anti-Hallucination-Rules-for-Software-Development.md'
    );
    fs.writeFileSync(ahDest, ahWithSource);
    results.antiHallucination = true;
  }

  // Copy GitHub workflow (if enabled)
  if (enableGitHubWorkflow) {
    const ghSrc = path.join(frameworkPath, 'Reference', 'GitHub-Workflow.md');
    const ghDest = path.join(rulesDir, '02-github-workflow.md');
    if (fs.existsSync(ghSrc)) {
      // Read source and add Source reference after Version line
      const ghContent = fs.readFileSync(ghSrc, 'utf8');
      const ghWithSource = ghContent.replace(
        /(\*\*Version:\*\* .+)/,
        '$1\n**Source:** Reference/GitHub-Workflow.md'
      );
      fs.writeFileSync(ghDest, ghWithSource);
      results.githubWorkflow = true;
    }
  }

  // Generate startup rules
  const startupContent = generateStartupRules(frameworkPath, processFramework, domainListStr, primarySpecialist, version);
  fs.writeFileSync(path.join(rulesDir, '03-startup.md'), startupContent);
  results.startup = true;

  // Copy Windows shell safety rules (Windows only)
  if (process.platform === 'win32') {
    const wsSrc = path.join(frameworkPath, 'Reference', 'Windows-Shell-Safety.md');
    const wsDest = path.join(rulesDir, '05-windows-shell.md');
    if (fs.existsSync(wsSrc)) {
      // Read source and add Source reference after Version line
      const wsContent = fs.readFileSync(wsSrc, 'utf8');
      const wsWithSource = wsContent.replace(
        /(\*\*Version:\*\* .+)/,
        '$1\n**Source:** Reference/Windows-Shell-Safety.md'
      );
      fs.writeFileSync(wsDest, wsWithSource);
      results.windowsShell = true;
    }
  }

  return results;
}

/**
 * Deploy workflow hook to .claude/hooks/
 */
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

/**
 * Deploy Git pre-push hook to prevent unauthorized tag pushes
 * Copies from Templates/hooks/pre-push to .git/hooks/pre-push
 */
function deployGitPrePushHook(projectDir, frameworkPath) {
  const gitHooksDir = path.join(projectDir, '.git', 'hooks');

  // Check if .git directory exists (project must be a git repo)
  if (!fs.existsSync(path.join(projectDir, '.git'))) {
    return { success: false, reason: 'not-git-repo' };
  }

  // Create hooks directory if it doesn't exist
  fs.mkdirSync(gitHooksDir, { recursive: true });

  const srcHook = path.join(frameworkPath, 'Templates', 'hooks', 'pre-push');
  const destHook = path.join(gitHooksDir, 'pre-push');

  if (!fs.existsSync(srcHook)) {
    return { success: false, reason: 'source-not-found' };
  }

  // Check if hook already exists
  if (fs.existsSync(destHook)) {
    // Read existing hook to check if it's ours
    const existing = fs.readFileSync(destHook, 'utf8');
    if (existing.includes('Pre-push hook: Prevents unauthorized version tag pushes')) {
      // Our hook already installed - update it
      fs.copyFileSync(srcHook, destHook);
      try { fs.chmodSync(destHook, 0o755); } catch (e) { /* Windows may not support chmod */ }
      return { success: true, action: 'updated' };
    } else {
      // Different hook exists - don't overwrite
      return { success: false, reason: 'hook-exists' };
    }
  }

  // Install hook
  fs.copyFileSync(srcHook, destHook);
  try { fs.chmodSync(destHook, 0o755); } catch (e) { /* Windows may not support chmod */ }
  return { success: true, action: 'installed' };
}

/**
 * Deploy workflow commands and scripts for GitHub workflow integration
 * Copies from Templates/commands/ and Templates/scripts/ to project .claude/
 */
function deployWorkflowCommands(projectDir, frameworkPath) {
  const commandsDir = path.join(projectDir, '.claude', 'commands');
  const scriptsDir = path.join(projectDir, '.claude', 'scripts');
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.mkdirSync(scriptsDir, { recursive: true });

  const workflowCommands = [
    'assign-release',
    'switch-release',
    'transfer-issue',
    'plan-sprint',
    'sprint-status',
    'sprint-retro',
    'end-sprint',
    'open-release',
    'close-release'
  ];

  const deployed = { commands: [], scripts: [] };

  for (const cmd of workflowCommands) {
    // Deploy command (.md file)
    const srcCmd = path.join(frameworkPath, 'Templates', 'commands', `${cmd}.md`);
    const destCmd = path.join(commandsDir, `${cmd}.md`);
    if (fs.existsSync(srcCmd)) {
      fs.copyFileSync(srcCmd, destCmd);
      deployed.commands.push(cmd);
    }

    // Deploy script (.js file)
    const srcScript = path.join(frameworkPath, 'Templates', 'scripts', `${cmd}.js`);
    const destScript = path.join(scriptsDir, `${cmd}.js`);
    if (fs.existsSync(srcScript)) {
      fs.copyFileSync(srcScript, destScript);
      deployed.scripts.push(cmd);
    }
  }

  return deployed;
}

/**
 * REQ-010: Display GitHub setup success information
 */
function displayGitHubSetupSuccess(repoUrl, projectUrl) {
  const { log, logCyan, logSuccess, colors } = require('./ui');

  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║     GitHub Setup Complete!           ║');
  logCyan('╚══════════════════════════════════════╝');
  log();
  if (repoUrl) {
    log(`  ${colors.dim('Repository:')}     ${colors.green(repoUrl)}`);
  }
  if (projectUrl) {
    log(`  ${colors.dim('Project Board:')}  ${colors.green(projectUrl)}`);
  }
  log();
  logSuccess('GitHub integration setup complete!');
  log();
}

module.exports = {
  createExtensibilityStructure,
  deployFrameworkScripts,
  deployRules,
  deployWorkflowHook,
  deployGitPrePushHook,
  deployWorkflowCommands,
  displayGitHubSetupSuccess,
};
