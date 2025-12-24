#!/usr/bin/env node
// **Version:** 0.2.0
/**
 * IDPF Framework Installer - Main Entry Point
 * Unified cross-platform installer for Windows, macOS, and Linux
 *
 * Usage: node install.js
 * @module install
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import modules
const {
  DOMAIN_SPECIALISTS,
  FRAMEWORK_SKILLS,
  VIBE_VARIANT_SKILLS,
  PROCESS_FRAMEWORKS,
  VIBE_VARIANTS,
} = require('./lib/constants');

const {
  colors,
  log,
  logSuccess,
  logWarning,
  logError,
  logCyan,
  divider,
} = require('./lib/ui');

const {
  isValidTransition,
  getValidTransitionTargets,
  getTransitionBlockReason,
  cleanupOrphanedFiles,
} = require('./lib/validation');

const {
  readInstalledProjects,
  trackProject,
  checkPrerequisites,
  extractZip,
  checkGitRemote,
  checkGhCliPrerequisites,
  createGitHubRepo,
  copyProjectBoard,
  linkProjectBoard,
  getGitHubUsername,
  readFrameworkVersion,
  parseExistingInstallation,
  copyFile,
} = require('./lib/detection');

const {
  generateFrameworkConfig,
  generateClaudeMd,
  generateSwitchRole,
  generateAddRole,
  generateGhPmuConfig,
  generateSettingsLocal,
  generatePrdReadme,
} = require('./lib/generation');

const {
  deployRules,
  deployWorkflowHook,
  deployGitPrePushHook,
  deployWorkflowCommands,
  displayGitHubSetupSuccess,
} = require('./lib/deployment');

const {
  runMigrations,
} = require('./lib/migrations');

const {
  updateTrackedProjects,
} = require('./lib/update');

// Module-level prompts variable (assigned in main() after dependency check)
let prompts;

// ======================================
//  Main Installation Flow
// ======================================

async function main() {
  // Check for command-line flags
  const args = process.argv.slice(2);
  const migrateMode = args.includes('--migrate');
  const skipGitHub = args.includes('--skip-github'); // REQ-009: Skip GitHub setup

  // Load prompts module, auto-install if missing
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

        const results = await updateTrackedProjects(cwd, prompts);
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
          const results = await updateTrackedProjects(frameworkPath, prompts);
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
      logCyan(`  Current framework: ${lockedFramework}`);
      if (existingDomains.length > 0) {
        logCyan(`  Existing specialists: ${existingDomains.join(', ')}`);
      }
      if (projectInstructions) {
        logSuccess('  Will preserve existing Project-Specific Instructions');
      }
      log();

      // Check if transitions are available from this framework
      const validTargets = getValidTransitionTargets(lockedFramework);

      if (validTargets.length === 0) {
        // LTS or other terminal state
        logWarning(getTransitionBlockReason(lockedFramework, null));
        log();
        processFramework = lockedFramework;
      } else {
        // Ask if user wants to change framework (Question 1)
        const { wantChange } = await prompts({
          type: 'confirm',
          name: 'wantChange',
          message: `Would you like to change the framework? (Currently: ${lockedFramework})`,
          initial: false,
        }, { onCancel });

        if (!wantChange) {
          processFramework = lockedFramework;
          log();
          logSuccess(`Keeping current framework: ${processFramework}`);
          log();
        } else {
          // Show only valid transition targets (Question 2)
          log();
          log(colors.dim('Valid transitions from ' + lockedFramework + ':'));
          for (const target of validTargets) {
            log(colors.dim(`  • ${target.title} - ${target.description}`));
          }
          log();

          const { newFramework } = await prompts({
            type: 'select',
            name: 'newFramework',
            message: 'Select new framework',
            choices: validTargets,
          }, { onCancel });

          // Confirm the transition (Question 3)
          log();
          const { confirmTransition } = await prompts({
            type: 'confirm',
            name: 'confirmTransition',
            message: `Transition from ${lockedFramework} to ${newFramework}?`,
            initial: true,
          }, { onCancel });

          if (!confirmTransition) {
            processFramework = lockedFramework;
            log();
            logWarning('Transition cancelled. Keeping current framework.');
            log();
          } else {
            processFramework = newFramework;
            log();
            logSuccess(`Framework transition: ${lockedFramework} → ${newFramework}`);
            log();
          }
        }
      }
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
    if (rulesResult.antiHallucination) {
      logSuccess('  ✓ .claude/rules/01-anti-hallucination.md');
    }
    if (rulesResult.githubWorkflow) {
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

    // prepare-release command (copy from template)
    const commandsDir = path.join(projectDir, '.claude', 'commands');
    const prepareReleaseSrc = path.join(frameworkPath, 'Templates', 'commands', 'prepare-release.md');
    const prepareReleaseDest = path.join(commandsDir, 'prepare-release.md');
    if (copyFile(prepareReleaseSrc, prepareReleaseDest)) {
      logSuccess('  ✓ .claude/commands/prepare-release.md');
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

      // Deploy workflow commands and scripts
      const workflowDeployed = deployWorkflowCommands(projectDir, frameworkPath);
      if (workflowDeployed.commands.length > 0) {
        for (const cmd of workflowDeployed.commands) {
          logSuccess(`  ✓ .claude/commands/${cmd}.md`);
        }
      }
      if (workflowDeployed.scripts.length > 0) {
        for (const script of workflowDeployed.scripts) {
          logSuccess(`  ✓ .claude/scripts/${script}.js`);
        }
      }

      // Deploy Git pre-push hook (prevents unauthorized tag pushes)
      const prePushResult = deployGitPrePushHook(projectDir, frameworkPath);
      if (prePushResult.success) {
        if (prePushResult.action === 'updated') {
          logSuccess('  ✓ .git/hooks/pre-push (updated)');
        } else {
          logSuccess('  ✓ .git/hooks/pre-push (release protection)');
        }
      } else if (prePushResult.reason === 'not-git-repo') {
        logWarning('  ⊘ .git/hooks/pre-push (not a git repository)');
      } else if (prePushResult.reason === 'hook-exists') {
        logWarning('  ⊘ .git/hooks/pre-push (existing hook preserved)');
      } else {
        logWarning('  ⚠ .git/hooks/pre-push (source not found)');
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
    //  GitHub Repository & Project Board Setup (REQ-001 to REQ-010)
    // ======================================

    let githubSetupResult = { repoUrl: null, projectUrl: null, skipped: false };

    // REQ-009: Skip if --skip-github flag is present
    if (skipGitHub) {
      log();
      logWarning('GitHub setup skipped (--skip-github flag)');
      githubSetupResult.skipped = true;
    } else {
      // REQ-001: Check git remote status
      const gitStatus = checkGitRemote(projectDir);

      // AC-3: Skip silently if remote already exists
      if (gitStatus.hasRemote) {
        log();
        log(colors.dim('Git remote already configured - skipping GitHub setup'));
        githubSetupResult.skipped = true;
      } else {
        // REQ-002: Check GitHub CLI prerequisites
        const ghPrereqs = checkGhCliPrerequisites();

        if (!ghPrereqs.ready) {
          // AC-5 & AC-6: Display remediation and skip (not error)
          log();
          logWarning('GitHub setup skipped - prerequisites not met:');
          for (const issue of ghPrereqs.issues) {
            log(`  ${colors.yellow('⚠')} ${issue.message}`);
            log(`    ${colors.cyan(issue.remediation)}`);
          }
          githubSetupResult.skipped = true;
        } else {
          // REQ-003: User Confirmation Prompt
          log();
          divider();
          logCyan('  GitHub Repository Setup');
          divider();
          log();
          log('No git remote detected. Would you like to set up GitHub integration?');
          log(colors.dim('This will create a GitHub repository and project board for your project.'));
          log();

          const { setupGitHub } = await prompts({
            type: 'confirm',
            name: 'setupGitHub',
            message: 'Set up GitHub integration?',
            initial: true,
          }, { onCancel });

          if (!setupGitHub) {
            log();
            logWarning('GitHub setup skipped.');
            githubSetupResult.skipped = true;
          } else {
            // REQ-004: Configuration Prompts
            const dirName = path.basename(projectDir);
            const ghUsername = getGitHubUsername();

            const { repoName } = await prompts({
              type: 'text',
              name: 'repoName',
              message: 'Repository name',
              initial: dirName,
              validate: (v) => v.trim() ? true : 'Repository name required',
            }, { onCancel });

            const { visibility } = await prompts({
              type: 'select',
              name: 'visibility',
              message: 'Repository visibility',
              choices: [
                { title: 'Private', value: 'private' },
                { title: 'Public', value: 'public' },
              ],
              initial: 0,
            }, { onCancel });

            const { templateNumber } = await prompts({
              type: 'number',
              name: 'templateNumber',
              message: 'Project template number (from rubrical-studios)',
              initial: 30,
            }, { onCancel });

            const { projectTitle } = await prompts({
              type: 'text',
              name: 'projectTitle',
              message: 'Project board title',
              initial: repoName,
            }, { onCancel });

            log();
            log(colors.dim('Creating GitHub resources...'));
            log();

            // Initialize git if needed
            if (!gitStatus.hasGit) {
              try {
                execSync('git init', { cwd: projectDir, stdio: 'pipe' });
                logSuccess('  ✓ Initialized git repository');
              } catch (err) {
                logError(`  ✗ Failed to initialize git: ${err.message}`);
              }
            }

            // Create initial commit if no commits exist
            try {
              execSync('git rev-parse HEAD', { cwd: projectDir, stdio: 'pipe' });
            } catch {
              // No commits, create initial commit
              try {
                execSync('git add -A', { cwd: projectDir, stdio: 'pipe' });
                execSync('git commit -m "Initial commit - IDPF Framework setup"', { cwd: projectDir, stdio: 'pipe' });
                logSuccess('  ✓ Created initial commit');
              } catch (err) {
                logWarning(`  ⚠ Could not create initial commit: ${err.message}`);
              }
            }

            // REQ-005: Create GitHub repository
            const repoResult = createGitHubRepo(projectDir, repoName, visibility);
            if (repoResult.success) {
              logSuccess(`  ✓ Created repository: ${repoResult.repoUrl}`);
              githubSetupResult.repoUrl = repoResult.repoUrl;
            } else {
              logError(`  ✗ Failed to create repository: ${repoResult.error}`);
            }

            // REQ-006: Copy project board (continue even if repo failed)
            if (ghUsername) {
              const projectResult = copyProjectBoard(templateNumber, projectTitle, ghUsername);
              if (projectResult.success) {
                logSuccess(`  ✓ Copied project board: ${projectResult.projectUrl || `#${projectResult.projectNumber}`}`);
                githubSetupResult.projectUrl = projectResult.projectUrl;

                // REQ-007: Link project to repository
                if (repoResult.success && projectResult.projectNumber) {
                  const linkResult = linkProjectBoard(projectResult.projectNumber, ghUsername, repoName);
                  if (linkResult.success) {
                    logSuccess('  ✓ Linked project board to repository');
                  } else {
                    logWarning(`  ⚠ Could not link project: ${linkResult.error}`);
                  }
                }

                // REQ-008: Generate .gh-pmu.yml
                if (projectResult.projectNumber) {
                  generateGhPmuConfig(projectDir, projectTitle, projectResult.projectNumber, ghUsername, repoName);
                  logSuccess('  ✓ Generated .gh-pmu.yml');

                  // Commit and push the config
                  try {
                    execSync('git add .gh-pmu.yml', { cwd: projectDir, stdio: 'pipe' });
                    execSync('git commit -m "Add gh-pmu configuration"', { cwd: projectDir, stdio: 'pipe' });
                    execSync('git push', { cwd: projectDir, stdio: 'pipe' });
                    logSuccess('  ✓ Committed and pushed .gh-pmu.yml');
                  } catch (err) {
                    logWarning(`  ⚠ Could not push config: ${err.message}`);
                  }
                }
              } else {
                logWarning(`  ⚠ Could not copy project board: ${projectResult.error}`);
                log(colors.dim('    You can create a project board manually and run: gh pmu init'));
              }
            } else {
              logWarning('  ⚠ Could not determine GitHub username - skipping project board');
            }

            // REQ-010: Display success
            if (githubSetupResult.repoUrl || githubSetupResult.projectUrl) {
              displayGitHubSetupSuccess(githubSetupResult.repoUrl, githubSetupResult.projectUrl);
            }
          }
        }
      }
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
    log(`  ${colors.dim('GitHub Workflow:')}    ${colors.green('Enabled')}`);

    // Show GitHub setup results if completed
    if (githubSetupResult.repoUrl) {
      log(`  ${colors.dim('Repository:')}         ${colors.green(githubSetupResult.repoUrl)}`);
    }
    if (githubSetupResult.projectUrl) {
      log(`  ${colors.dim('Project Board:')}      ${colors.green(githubSetupResult.projectUrl)}`);
    }
    log();

    // Show manual setup instructions only if GitHub setup was skipped
    if (githubSetupResult.skipped && enableGitHubWorkflow) {
      logCyan('  GitHub Workflow Setup (manual):');
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
    }

    log('    Workflow triggers (prefix your messages):');
    log(`      ${colors.cyan('bug:')} - Create bug issue`);
    log(`      ${colors.cyan('enhancement:')} - Create enhancement issue`);
    log(`      ${colors.cyan('finding:')} - Create finding (bug synonym)`);
    log(`      ${colors.cyan('idea:')} - Create proposal (alias for proposal:)`);
    log(`      ${colors.cyan('proposal:')} - Create proposal document`);
    log();

    logCyan('  Next steps:');
    log(`    1. Navigate to: ${colors.cyan(projectDir)}`);
    log('    2. Review the generated CLAUDE.md');
    log('    3. Add project-specific instructions if needed');
    if (githubSetupResult.skipped) {
      log('    4. Complete GitHub workflow setup (see above)');
      log('    5. Start Claude Code CLI in that directory');
    } else {
      log('    4. Start Claude Code CLI in that directory');
    }
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

// Export for use as module
module.exports = { main };

// Run if executed directly
if (require.main === module) {
  main();
}
