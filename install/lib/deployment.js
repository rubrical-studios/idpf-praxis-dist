/**
 * @framework-script 0.34.0
 * deployment.js - Rules, hooks, and commands deployment for IDPF Framework Installer
 * @module install/lib/deployment
 */

const fs = require('fs');
const path = require('path');
const { generateStartupRules } = require('./generation');
const { computeFileHash, writeManifest, readManifest, isFileModified, updateManifestEntries } = require('./checksums');
const { readFrameworkVersion, getDeploymentConfig } = require('./detection');
const {
  parseCommandHeader,
  extractExtensionBlocks,
  restoreBlocks,
  detectRogueEdits,
  mergeFrontmatter,
  extractFrontmatter,
  rebuildWithFrontmatter
} = require('./extensibility');

/**
 * Copy file with 0.34.0 placeholder replacement
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @param {string} version - Version string to replace 0.34.0 with
 */
function copyFileWithVersion(src, dest, version) {
  let content = fs.readFileSync(src, 'utf8');
  content = content.replace(/\{\{VERSION\}\}/g, version);
  fs.writeFileSync(dest, content);
}

/**
 * Clear archive directory before upgrade
 * Called at start of upgrade to remove stale archives from previous versions
 * @param {string} projectDir - Project root directory
 */
function clearArchiveDirectory(projectDir) {
  const archiveDir = path.join(projectDir, '.claude', 'archive');
  if (fs.existsSync(archiveDir)) {
    fs.rmSync(archiveDir, { recursive: true, force: true });
  }
}

/**
 * Archive a file before overwriting due to rogue edits
 * @param {string} projectDir - Project root directory
 * @param {string} filePath - Original file path being overwritten
 * @param {string} content - Content to archive
 * @returns {string} Archive path
 */
function archiveRogueEditFile(projectDir, filePath, content) {
  const archiveDir = path.join(projectDir, '.claude', 'archive', 'commands');

  // Create archive directory if needed
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  // Generate timestamped filename: {command}-{YYYY-MM-DD}.md
  const basename = path.basename(filePath, '.md');
  const date = new Date().toISOString().split('T')[0];
  const archiveFilename = `${basename}-${date}.md`;
  let finalPath = path.join(archiveDir, archiveFilename);

  // Handle multiple archives on same day: {command}-{YYYY-MM-DD}-{n}.md
  let counter = 1;
  while (fs.existsSync(finalPath)) {
    finalPath = path.join(archiveDir, `${basename}-${date}-${counter}.md`);
    counter++;
  }

  // Write archive with header comment
  const archiveContent = `<!-- Archived: ${new Date().toISOString()} -->
<!-- Original: ${filePath} -->
<!-- Reason: Rogue edits detected outside USER-EXTENSION blocks -->

${content}`;

  fs.writeFileSync(finalPath, archiveContent);
  return finalPath;
}

/**
 * Deploy an extensible command file, preserving user extensions
 *
 * @param {string} src - Source template file path
 * @param {string} dest - Destination file path
 * @param {string} version - Version string to replace 0.34.0 with
 * @param {boolean} debug - Enable debug logging
 * @returns {{preserved: boolean, warnings: string[]}} Deployment result
 */
function deployExtensibleCommand(src, dest, version, debug = false) {
  const { logDebug } = require('./ui');
  const warnings = [];
  const filename = path.basename(dest);

  if (debug) {
    logDebug(`Processing: ${dest}`);
  }

  // Read the new template
  let templateContent = fs.readFileSync(src, 'utf8');
  templateContent = templateContent.replace(/\{\{VERSION\}\}/g, version);

  // Check if destination exists
  if (!fs.existsSync(dest)) {
    // Fresh install - just copy
    if (debug) {
      logDebug(`  Fresh install (no existing file)`);
    }
    fs.writeFileSync(dest, templateContent);
    if (debug) {
      logDebug(`Complete: ${filename}`);
    }
    return { preserved: false, warnings: [] };
  }

  // Read existing file
  const existingContent = fs.readFileSync(dest, 'utf8');

  // Parse header to determine category
  const header = parseCommandHeader(existingContent);

  if (debug) {
    if (header) {
      logDebug(`  Category: ${header.category} (${header.version})`);
    } else {
      logDebug(`  Category: MANAGED (no header)`);
    }
  }

  // If not EXTENSIBLE, treat as MANAGED (overwrite)
  if (!header || header.category !== 'EXTENSIBLE') {
    if (debug) {
      logDebug(`  Overwriting (not EXTENSIBLE)`);
      logDebug(`Complete: ${filename}`);
    }
    fs.writeFileSync(dest, templateContent);
    return { preserved: false, warnings: [] };
  }

  // EXTENSIBLE file - preserve user extensions

  // Extract extension blocks from existing file
  const preservedBlocks = extractExtensionBlocks(existingContent);

  if (debug) {
    logDebug(`  Extension blocks found: ${preservedBlocks.size}`);
    for (const [name, content] of preservedBlocks) {
      const lineCount = content.split('\n').length;
      logDebug(`    - ${name}: ${lineCount} lines`);
    }
  }

  if (preservedBlocks.size === 0) {
    // No extensions to preserve - just overwrite
    if (debug) {
      logDebug(`  No extensions to preserve`);
      logDebug(`Complete: ${filename}`);
    }
    fs.writeFileSync(dest, templateContent);
    return { preserved: false, warnings: [] };
  }

  if (debug) {
    logDebug(`  Deploying new template...`);
  }

  // Detect rogue edits (changes outside extension markers)
  const rogueCheck = detectRogueEdits(existingContent, templateContent);
  if (rogueCheck.hasRogueEdits) {
    // Archive the file before overwriting
    // Derive projectDir from dest: .claude/commands/file.md -> project root
    const projectDir = path.dirname(path.dirname(path.dirname(dest)));
    const archivePath = archiveRogueEditFile(projectDir, dest, existingContent);
    const relativeArchivePath = path.relative(projectDir, archivePath);

    if (debug) {
      logDebug(`  ⚠️  Rogue edits detected outside extension markers`);
      logDebug(`  Archived to: ${relativeArchivePath}`);
    }
    warnings.push(`${filename}: Changes outside extension markers archived to ${relativeArchivePath}`);
    for (const detail of rogueCheck.details) {
      warnings.push(`  - ${detail}`);
    }
  } else if (debug) {
    logDebug(`  Rogue edits detected: none`);
  }

  // Restore preserved blocks into new template
  if (debug) {
    logDebug(`  Restoring extension blocks...`);
  }
  const { content: restoredContent, warnings: restoreWarnings } = restoreBlocks(templateContent, preservedBlocks);
  warnings.push(...restoreWarnings);

  if (debug) {
    for (const [name] of preservedBlocks) {
      logDebug(`    - ${name}: ✓ restored`);
    }
  }

  // Handle frontmatter merging if present
  const existingFm = extractFrontmatter(existingContent);
  const templateFm = extractFrontmatter(restoredContent);

  let finalContent = restoredContent;
  if (existingFm && templateFm) {
    const { merged, warnings: fmWarnings } = mergeFrontmatter(existingFm.frontmatter, templateFm.frontmatter);
    warnings.push(...fmWarnings);
    finalContent = rebuildWithFrontmatter(merged, templateFm.body);
    if (debug) {
      logDebug(`  Frontmatter merged`);
    }
  }

  // Write the final content
  fs.writeFileSync(dest, finalContent);

  if (debug) {
    logDebug(`Complete: ${filename}`);
  }

  return { preserved: true, extensionCount: preservedBlocks.size, warnings };
}

/**
 * REQ-007 (PRD #559): Create extensibility directory structure
 *
 * Creates the complete directory structure for extensible commands:
 * - .claude/extensions/ (for .md files referenced by commands)
 * - .claude/scripts/shared/ (shared utility scripts)
 * - .claude/scripts/shared/lib/ (library modules)
 * - .claude/scripts/{command}/ (user scripts per extensible command)
 * - .claude/hooks/ (framework hooks)
 *
 * Note: .claude/scripts/framework/ is no longer created for user projects (#1008)
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

  // AC-2: .claude/scripts/shared/
  const sharedScriptsDir = path.join(projectDir, '.claude', 'scripts', 'shared');
  createDirWithGitkeep(sharedScriptsDir, created, existed);

  // AC-3: .claude/scripts/shared/lib/
  const libDir = path.join(projectDir, '.claude', 'scripts', 'shared', 'lib');
  createDir(libDir, created, existed);

  // AC-4: .claude/scripts/{command}/ for each extensible command
  const defaultCommands = ['create-branch', 'prepare-release', 'prepare-beta', 'merge-branch', 'destroy-branch', 'switch-branch', 'assign-branch'];
  const commandsToCreate = extensibleCommands.length > 0 ? extensibleCommands : defaultCommands;

  for (const cmd of commandsToCreate) {
    const cmdDir = path.join(projectDir, '.claude', 'scripts', cmd);
    createDirWithGitkeep(cmdDir, created, existed);
  }

  // AC-5: .claude/hooks/
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
  const deployed = { framework: [], shared: [], 'shared/lib': [], hooks: [] };
  const modified = [];
  const manifestEntries = {};
  const deployedAt = new Date().toISOString().split('T')[0];

  // Read framework manifest (consolidated at root level)
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return { deployed, modified, manifest: {} };
  }

  const frameworkManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const existingManifest = readManifest(projectDir) || { scripts: {} };
  const version = readFrameworkVersion(frameworkPath);

  // AC-1: Deploy scripts per category
  const categories = ['framework', 'shared', 'shared/lib', 'hooks'];

  for (const category of categories) {
    const categoryConfig = frameworkManifest.deploymentFiles?.scripts?.[category];
    if (!categoryConfig) continue;

    // Source paths in manifest are relative to framework root (e.g., "Templates/scripts/shared/")
    const sourceDir = path.join(frameworkPath, categoryConfig.source);
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

      // AC-3 & AC-4: Copy file from Templates with version replacement
      copyFileWithVersion(srcPath, destPath, version);
      deployed[category].push(file);

      // AC-2: Record checksum
      const checksum = computeFileHash(destPath);
      manifestEntries[`${category}/${file}`] = {
        checksum,
        deployedAt,  // AC-3: deployedAt date
        source: `${categoryConfig.source}${file}`
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
 * v0.17.0+: domainSpecialist is singular string (primarySpecialist removed)
 * v0.25.0+: Track checksums in manifest for audit support
 */
function deployRules(projectDir, frameworkPath, processFramework, domainSpecialist, _unused, enableGitHubWorkflow, version) {
  const rulesDir = path.join(projectDir, '.claude', 'rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const results = { antiHallucination: false, githubWorkflow: false, charterEnforcement: false, startup: false, runtimeTriggers: false, windowsShell: false };
  const deployedAt = new Date().toISOString().split('T')[0];
  const rulesChecksums = {};

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
    rulesChecksums['01-anti-hallucination.md'] = {
      checksum: computeFileHash(ahDest),
      deployedAt,
      source: 'Assistant/Anti-Hallucination-Rules-for-Software-Development.md',
    };
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
      rulesChecksums['02-github-workflow.md'] = {
        checksum: computeFileHash(ghDest),
        deployedAt,
        source: 'Reference/GitHub-Workflow.md',
      };
    }
  }

  // Copy Charter Enforcement rules (v0.20.0+)
  const ceSrc = path.join(frameworkPath, 'Reference', 'Charter-Enforcement.md');
  const ceDest = path.join(rulesDir, '04-charter-enforcement.md');
  if (fs.existsSync(ceSrc)) {
    // Read source and add Source reference after Version line
    const ceContent = fs.readFileSync(ceSrc, 'utf8');
    const ceWithSource = ceContent.replace(
      /(\*\*Version:\*\* .+)/,
      '$1\n**Source:** Reference/Charter-Enforcement.md'
    );
    fs.writeFileSync(ceDest, ceWithSource);
    results.charterEnforcement = true;
    rulesChecksums['04-charter-enforcement.md'] = {
      checksum: computeFileHash(ceDest),
      deployedAt,
      source: 'Reference/Charter-Enforcement.md',
    };
  }

  // Copy Runtime Artifact Triggers (v0.20.0+)
  const rtSrc = path.join(frameworkPath, 'Reference', 'Runtime-Artifact-Triggers.md');
  const rtDest = path.join(rulesDir, '06-runtime-triggers.md');
  if (fs.existsSync(rtSrc)) {
    // Read source and add Source reference after Version line
    const rtContent = fs.readFileSync(rtSrc, 'utf8');
    const rtWithSource = rtContent.replace(
      /(\*\*Version:\*\* .+)/,
      '$1\n**Source:** Reference/Runtime-Artifact-Triggers.md'
    );
    fs.writeFileSync(rtDest, rtWithSource);
    results.runtimeTriggers = true;
    rulesChecksums['06-runtime-triggers.md'] = {
      checksum: computeFileHash(rtDest),
      deployedAt,
      source: 'Reference/Runtime-Artifact-Triggers.md',
    };
  }

  // Generate startup rules
  const startupContent = generateStartupRules(frameworkPath, processFramework, domainSpecialist, _unused, version);
  const startupDest = path.join(rulesDir, '03-startup.md');
  fs.writeFileSync(startupDest, startupContent);
  results.startup = true;
  rulesChecksums['03-startup.md'] = {
    checksum: computeFileHash(startupDest),
    deployedAt,
    source: 'generated',
  };

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
      rulesChecksums['05-windows-shell.md'] = {
        checksum: computeFileHash(wsDest),
        deployedAt,
        source: 'Reference/Windows-Shell-Safety.md',
      };
    }
  }

  // Update manifest with rules checksums
  if (Object.keys(rulesChecksums).length > 0) {
    updateManifestEntries(projectDir, 'rules', rulesChecksums, version);
  }

  return results;
}

/**
 * Deploy workflow hook to .claude/hooks/
 * v0.25.0+: Track checksum in manifest for audit support
 */
function deployWorkflowHook(projectDir, frameworkPath) {
  const hooksDir = path.join(projectDir, '.claude', 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  const version = readFrameworkVersion(frameworkPath);

  // Look in Templates/hooks/ (bundled location for distribution)
  const srcHook = path.join(frameworkPath, 'Templates', 'hooks', 'workflow-trigger.js');
  const destHook = path.join(hooksDir, 'workflow-trigger.js');

  if (fs.existsSync(srcHook)) {
    copyFileWithVersion(srcHook, destHook, version);

    // Track checksum in manifest
    const deployedAt = new Date().toISOString().split('T')[0];
    updateManifestEntries(projectDir, 'hooks', {
      'workflow-trigger.js': {
        checksum: computeFileHash(destHook),
        deployedAt,
        source: 'Templates/hooks/workflow-trigger.js',
      },
    }, version);

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
  const version = readFrameworkVersion(frameworkPath);

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
      // Our hook already installed - update it with version replacement
      copyFileWithVersion(srcHook, destHook, version);
      try { fs.chmodSync(destHook, 0o755); } catch (_e) { /* Windows may not support chmod */ }
      return { success: true, action: 'updated' };
    } else {
      // Different hook exists - don't overwrite
      return { success: false, reason: 'hook-exists' };
    }
  }

  // Install hook with version replacement
  copyFileWithVersion(srcHook, destHook, version);
  try { fs.chmodSync(destHook, 0o755); } catch (_e) { /* Windows may not support chmod */ }
  return { success: true, action: 'installed' };
}

/**
 * Deploy core commands that are always available (not tied to GitHub workflow)
 * Copies from Templates/commands/ to project .claude/commands/
 * v0.25.0+: Track command checksums in manifest for audit support
 */
function deployCoreCommands(projectDir, frameworkPath) {
  const commandsDir = path.join(projectDir, '.claude', 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  const version = readFrameworkVersion(frameworkPath);
  const deployedAt = new Date().toISOString().split('T')[0];
  const commandChecksums = {};

  const coreCommands = [
    'change-domain-expert',
    'playwright-check'
  ];

  const deployed = [];

  for (const cmd of coreCommands) {
    const srcCmd = path.join(frameworkPath, 'Templates', 'commands', `${cmd}.md`);
    const destCmd = path.join(commandsDir, `${cmd}.md`);
    if (fs.existsSync(srcCmd)) {
      copyFileWithVersion(srcCmd, destCmd, version);
      deployed.push(cmd);

      // Track command checksum
      commandChecksums[`${cmd}.md`] = {
        checksum: computeFileHash(destCmd),
        deployedAt,
        source: `Templates/commands/${cmd}.md`,
      };
    }
  }

  // Update manifest with command checksums
  if (Object.keys(commandChecksums).length > 0) {
    updateManifestEntries(projectDir, 'commands', commandChecksums, version);
  }

  return deployed;
}

/**
 * Deploy workflow commands and scripts for GitHub workflow integration
 * Copies from Templates/commands/ to .claude/commands/
 * Copies from Templates/scripts/shared/ to .claude/scripts/shared/
 * Preserves USER-EXTENSION blocks in EXTENSIBLE command files
 * v0.25.0+: Track command checksums in manifest for audit support
 *
 * @param {string} projectDir - Target project directory
 * @param {string} frameworkPath - Framework source directory
 * @param {boolean} debug - Enable debug logging for EXTENSIBLE files
 */
function deployWorkflowCommands(projectDir, frameworkPath, debug = false) {
  const { logWarning, logDebug } = require('./ui');

  // Clear old archives before creating new ones (each upgrade starts fresh)
  clearArchiveDirectory(projectDir);

  if (debug) {
    logDebug('Deploying workflow commands with extensibility support...');
  }
  const commandsDir = path.join(projectDir, '.claude', 'commands');
  const scriptsSharedDir = path.join(projectDir, '.claude', 'scripts', 'shared');
  const scriptsLibDir = path.join(projectDir, '.claude', 'scripts', 'shared', 'lib');
  fs.mkdirSync(commandsDir, { recursive: true });
  fs.mkdirSync(scriptsSharedDir, { recursive: true });
  fs.mkdirSync(scriptsLibDir, { recursive: true });
  const version = readFrameworkVersion(frameworkPath);
  const deployedAt = new Date().toISOString().split('T')[0];
  const commandChecksums = {};

  // Read workflow commands from manifest (single source of truth)
  const deploymentConfig = getDeploymentConfig(frameworkPath);
  const workflowCommands = deploymentConfig?.commands?.workflow
    ? deploymentConfig.commands.workflow.map(f => f.replace('.md', ''))
    : [
        // Fallback to hardcoded list if manifest is missing (for backwards compatibility)
        'assign-branch', 'switch-branch', 'transfer-issue', 'plan-sprint',
        'sprint-status', 'sprint-retro', 'end-sprint', 'create-branch',
        'prepare-release', 'prepare-beta', 'merge-branch', 'destroy-branch',
        'charter', 'extensions'
      ];

  const deployed = { commands: [], scripts: [], preserved: [], warnings: [] };

  for (const cmd of workflowCommands) {
    // Deploy command (.md file) with extensibility support
    const srcCmd = path.join(frameworkPath, 'Templates', 'commands', `${cmd}.md`);
    const destCmd = path.join(commandsDir, `${cmd}.md`);
    if (fs.existsSync(srcCmd)) {
      const result = deployExtensibleCommand(srcCmd, destCmd, version, debug);
      deployed.commands.push(cmd);
      if (result.preserved) {
        deployed.preserved.push({ command: cmd, extensionCount: result.extensionCount });
      }
      if (result.warnings.length > 0) {
        deployed.warnings.push(...result.warnings);
      }

      // Track command checksum
      commandChecksums[`${cmd}.md`] = {
        checksum: computeFileHash(destCmd),
        deployedAt,
        source: `Templates/commands/${cmd}.md`,
        extensible: result.preserved ? true : false,
      };
    }

    // Deploy script (.js file) with version replacement (scripts are always overwritten)
    const srcScript = path.join(frameworkPath, 'Templates', 'scripts', 'shared', `${cmd}.js`);
    const destScript = path.join(scriptsSharedDir, `${cmd}.js`);
    if (fs.existsSync(srcScript)) {
      copyFileWithVersion(srcScript, destScript, version);
      deployed.scripts.push(cmd);
    }
  }

  // Deploy lib scripts (gh.js, git.js, output.js, poll.js)
  const srcLibDir = path.join(frameworkPath, 'Templates', 'scripts', 'shared', 'lib');
  if (fs.existsSync(srcLibDir)) {
    const libFiles = fs.readdirSync(srcLibDir).filter(f => f.endsWith('.js'));
    for (const libFile of libFiles) {
      const srcLib = path.join(srcLibDir, libFile);
      const destLib = path.join(scriptsLibDir, libFile);
      copyFileWithVersion(srcLib, destLib, version);
      deployed.scripts.push(`lib/${libFile.replace('.js', '')}`);
    }
  }

  // Update manifest with command checksums
  if (Object.keys(commandChecksums).length > 0) {
    updateManifestEntries(projectDir, 'commands', commandChecksums, version);
  }

  // Display warnings about rogue edits
  if (deployed.warnings.length > 0) {
    logWarning('\nExtensibility warnings:');
    for (const warning of deployed.warnings) {
      logWarning(`  ${warning}`);
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
  if (projectUrl) {
    log(colors.yellow('  ⚠ IMPORTANT: Set the default repository for your project:'));
    log('    1. Open your project settings (link above + /settings)');
    log('    2. Click "Settings" in the project sidebar');
    log('    3. Under "Default repository", select your repository');
    log('    4. This ensures new issues are created in the correct repo');
    log();
    log(colors.dim('    Without this setting, issues created via gh pmu may go to the wrong repository.'));
    log();
  }
}

/**
 * Clean up renamed/removed command files from previous versions
 * Removes commands that have been renamed or removed in v0.23.0
 *
 * @param {string} projectDir - Target project directory
 * @returns {{removed: string[], notFound: string[]}} Cleanup results
 */
function cleanupRenamedCommands(projectDir) {
  const commandsDir = path.join(projectDir, '.claude', 'commands');
  const scriptsSharedDir = path.join(projectDir, '.claude', 'scripts', 'shared');

  // Commands renamed or removed in v0.23.0
  const orphanedCommands = [
    'open-release',      // renamed to create-branch
    'switch-release',    // renamed to switch-branch
    'assign-release',    // renamed to assign-branch
    'close-release'      // removed (folded into prepare-release)
  ];

  const removed = [];
  const notFound = [];

  for (const cmd of orphanedCommands) {
    // Remove command file (.md)
    const cmdPath = path.join(commandsDir, `${cmd}.md`);
    if (fs.existsSync(cmdPath)) {
      fs.unlinkSync(cmdPath);
      removed.push(`commands/${cmd}.md`);
    } else {
      notFound.push(`commands/${cmd}.md`);
    }

    // Remove script file (.js) from shared directory
    const scriptPath = path.join(scriptsSharedDir, `${cmd}.js`);
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
      removed.push(`scripts/shared/${cmd}.js`);
    }
  }

  return { removed, notFound };
}

/**
 * Deploy metadata files to user project
 * Copies .claude/metadata/*.json from framework to user project
 *
 * @param {string} projectDir - Target project directory
 * @param {string} frameworkPath - Framework source directory
 * @returns {{deployed: string[], skipped: string[]}} Deployment results
 */
function deployMetadataFiles(projectDir, frameworkPath) {
  const metadataDir = path.join(projectDir, '.claude', 'metadata');
  const sourceDir = path.join(frameworkPath, '.claude', 'metadata');

  const deployed = [];
  const skipped = [];

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    return { deployed, skipped: ['Source metadata directory not found'] };
  }

  // Create target directory
  fs.mkdirSync(metadataDir, { recursive: true });

  // Metadata files to deploy
  const metadataFiles = ['skill-registry.json', 'extension-recipes.json'];

  for (const file of metadataFiles) {
    const src = path.join(sourceDir, file);
    const dest = path.join(metadataDir, file);

    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      deployed.push(file);
    } else {
      skipped.push(file);
    }
  }

  return { deployed, skipped };
}

module.exports = {
  clearArchiveDirectory,
  archiveRogueEditFile,
  deployExtensibleCommand,
  createExtensibilityStructure,
  deployFrameworkScripts,
  deployRules,
  deployCoreCommands,
  deployWorkflowHook,
  deployGitPrePushHook,
  deployWorkflowCommands,
  displayGitHubSetupSuccess,
  cleanupRenamedCommands,
  deployMetadataFiles,
};
