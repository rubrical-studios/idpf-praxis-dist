#!/usr/bin/env node
/**
 * @framework-script 0.35.3
 * IDPF Hub Installer
 * Creates a central IDPF installation that can serve multiple projects.
 *
 * Usage: node install-hub.js --target <path>
 *
 * This script installs the IDPF framework to a central hub location.
 * Projects can then link to this hub via install-project-new.js or
 * install-project-existing.js.
 */

const fs = require('fs');
const path = require('path');

// ======================================
//  Console UI (reused from install/lib/ui.js)
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
//  File Operations
// ======================================

/**
 * Copy a directory recursively
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copy a file if it exists
 */
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

/**
 * Remove a directory recursively if it exists
 */
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Read framework version from manifest
 */
function readFrameworkVersion(frameworkPath) {
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.version || 'unknown';
  }
  return 'unknown';
}

// ======================================
//  Hub Installation
// ======================================

/**
 * Directories to install from framework to hub
 */
const FRAMEWORK_DIRECTORIES = [
  '.claude',           // Commands and rules
  'Skills',            // Skill packages
  'IDPF-Agile',        // Process frameworks
  'IDPF-Vibe',
  'IDPF-Accessibility',
  'IDPF-Chaos',
  'IDPF-Contract-Testing',
  'IDPF-Performance',
  'IDPF-QA-Automation',
  'IDPF-Security',
  'IDPF-Testing-Core',
  'Overview',          // Documentation
  'System-Instructions', // Domain specialists
  'Assistant',         // Anti-hallucination rules
  'Templates',         // Command templates, hooks, scripts
  'Reference',         // Reference documents
];

/**
 * Root files to install
 */
const FRAMEWORK_FILES = [
  'framework-manifest.json',
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
];

/**
 * Preserve projects.json during reinstall
 */
function backupProjectsRegistry(hubPath) {
  const registryPath = path.join(hubPath, '.projects', 'projects.json');
  const backupPath = path.join(hubPath, '.projects.backup.json');

  if (fs.existsSync(registryPath)) {
    fs.copyFileSync(registryPath, backupPath);
    return backupPath;
  }
  return null;
}

/**
 * Restore projects.json after reinstall
 */
function restoreProjectsRegistry(hubPath, backupPath) {
  if (backupPath && fs.existsSync(backupPath)) {
    const registryDir = path.join(hubPath, '.projects');
    fs.mkdirSync(registryDir, { recursive: true });
    const registryPath = path.join(registryDir, 'projects.json');
    fs.copyFileSync(backupPath, registryPath);
    fs.unlinkSync(backupPath);
    return true;
  }
  return false;
}

/**
 * Create empty projects registry
 */
function createProjectsRegistry(hubPath) {
  const registryDir = path.join(hubPath, '.projects');
  const registryPath = path.join(registryDir, 'projects.json');

  fs.mkdirSync(registryDir, { recursive: true });

  if (!fs.existsSync(registryPath)) {
    const registry = {
      version: '1.0',
      projects: []
    };
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    return true;
  }
  return false;
}

/**
 * Main hub installation function
 */
function installHub(sourcePath, targetPath) {
  const version = readFrameworkVersion(sourcePath);

  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║       IDPF Hub Installer             ║');
  logCyan('╚══════════════════════════════════════╝');
  log();

  divider();
  log(`  Source:  ${colors.cyan(sourcePath)}`);
  log(`  Target:  ${colors.cyan(targetPath)}`);
  log(`  Version: ${colors.green(version)}`);
  divider();
  log();

  // Step 1: Backup existing projects.json
  const backupPath = backupProjectsRegistry(targetPath);
  if (backupPath) {
    logSuccess('  ✓ Backed up existing projects.json');
  }

  // Step 2: Create target directory
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    logSuccess(`  ✓ Created target directory`);
  }

  // Step 3: Remove old framework directories (clean install)
  log();
  log(colors.dim('  Cleaning old framework files...'));
  for (const dir of FRAMEWORK_DIRECTORIES) {
    const targetDir = path.join(targetPath, dir);
    if (fs.existsSync(targetDir)) {
      removeDir(targetDir);
    }
  }

  // Step 4: Copy framework directories
  log();
  log(colors.dim('  Installing framework files...'));
  let installedDirs = 0;
  for (const dir of FRAMEWORK_DIRECTORIES) {
    const srcDir = path.join(sourcePath, dir);
    const destDir = path.join(targetPath, dir);

    if (fs.existsSync(srcDir)) {
      copyDir(srcDir, destDir);
      logSuccess(`    ✓ ${dir}/`);
      installedDirs++;
    } else {
      logWarning(`    ⊘ ${dir}/ (not found in source)`);
    }
  }

  // Step 5: Copy root files
  log();
  log(colors.dim('  Installing root files...'));
  for (const file of FRAMEWORK_FILES) {
    const srcFile = path.join(sourcePath, file);
    const destFile = path.join(targetPath, file);

    if (copyFile(srcFile, destFile)) {
      logSuccess(`    ✓ ${file}`);
    }
  }

  // Step 6: Deploy project installers
  log();
  log(colors.dim('  Deploying project installers...'));

  // install-project-new.js
  const newInstallerSrc = path.join(sourcePath, 'install-project-new.js');
  const newInstallerDest = path.join(targetPath, 'install-project-new.js');
  if (copyFile(newInstallerSrc, newInstallerDest)) {
    logSuccess('    ✓ install-project-new.js');
  } else {
    logWarning('    ⊘ install-project-new.js (not found)');
  }

  // install-project-existing.js
  const existingInstallerSrc = path.join(sourcePath, 'install-project-existing.js');
  const existingInstallerDest = path.join(targetPath, 'install-project-existing.js');
  if (copyFile(existingInstallerSrc, existingInstallerDest)) {
    logSuccess('    ✓ install-project-existing.js');
  } else {
    logWarning('    ⊘ install-project-existing.js (not found)');
  }

  // Step 7: Create/restore projects registry
  log();
  if (restoreProjectsRegistry(targetPath, backupPath)) {
    logSuccess('  ✓ Restored projects.json');
  } else if (createProjectsRegistry(targetPath)) {
    logSuccess('  ✓ Created .projects/projects.json');
  } else {
    logSuccess('  ✓ .projects/projects.json (preserved)');
  }

  // Step 8: Success message
  log();
  logCyan('╔══════════════════════════════════════╗');
  logCyan('║       Hub Installation Complete!     ║');
  logCyan('╚══════════════════════════════════════╝');
  log();
  log(`  ${colors.dim('Hub Location:')}  ${targetPath}`);
  log(`  ${colors.dim('Version:')}       ${colors.green(version)}`);
  log(`  ${colors.dim('Directories:')}   ${colors.green(installedDirs)} installed`);
  log();

  logCyan('  Next steps:');
  log();
  log('    Create a new project:');
  log(`      ${colors.cyan(`node ${path.join(targetPath, 'install-project-new.js')} --target <project-path>`)}`);
  log();
  log('    Add IDPF to existing project:');
  log(`      ${colors.cyan(`node ${path.join(targetPath, 'install-project-existing.js')} --target <project-path>`)}`);
  log();
}

// ======================================
//  Main Entry Point
// ======================================

function main() {
  const args = process.argv.slice(2);

  // Parse --target argument
  const targetIdx = args.indexOf('--target');
  if (targetIdx === -1 || targetIdx === args.length - 1) {
    logError('Usage: node install-hub.js --target <path>');
    logError('');
    logError('Arguments:');
    logError('  --target <path>  Directory to install the IDPF hub');
    logError('');
    logError('Example:');
    logError('  node install-hub.js --target ~/idpf-hub');
    process.exit(1);
  }

  const targetPath = path.resolve(args[targetIdx + 1]);
  const sourcePath = __dirname; // Hub installer runs from the source directory

  // Validate source has framework-manifest.json
  if (!fs.existsSync(path.join(sourcePath, 'framework-manifest.json'))) {
    logError('ERROR: Not a valid IDPF source directory.');
    logError(`  Expected framework-manifest.json in: ${sourcePath}`);
    process.exit(1);
  }

  // Validate target path format
  if (!targetPath || targetPath.trim() === '') {
    logError('ERROR: Target path cannot be empty.');
    process.exit(1);
  }

  // Run installation
  try {
    installHub(sourcePath, targetPath);
  } catch (err) {
    logError(`\nERROR: ${err.message}`);
    process.exit(1);
  }
}

main();
