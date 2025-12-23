// **Version:** 2.15.2
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

// Module-level prompts variable (assigned in main() after dependency check)
let prompts;

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
  'Accessibility-Specialist',
  'API-Integration-Specialist',
  'Backend-Specialist',
  'Cloud-Solutions-Architect',
  'Database-Engineer',
  'Data-Engineer',
  'Desktop-Application-Developer',
  'DevOps-Engineer',
  'Embedded-Systems-Engineer',
  'Frontend-Specialist',
  'Full-Stack-Developer',
  'Game-Developer',
  'Graphics-Engineer-Specialist',
  'ML-Engineer',
  'Mobile-Specialist',
  'Performance-Engineer',
  'Platform-Engineer',
  'PRD-Analyst',
  'QA-Test-Engineer',
  'Security-Engineer',
  'SRE-Specialist',
  'Systems-Programmer-Specialist',
  'Technical-Writer-Specialist',
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
      // Workflow commands (when GitHub workflow enabled)
      (config) => config?.enableGitHubWorkflow ? 'assign-release.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'switch-release.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'transfer-issue.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'plan-sprint.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'sprint-status.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'sprint-retro.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'end-sprint.md' : null,
    ],
  },
  // .claude/scripts/ directory
  scripts: {
    dir: '.claude/scripts',
    files: [
      // Workflow scripts (when GitHub workflow enabled)
      (config) => config?.enableGitHubWorkflow ? 'assign-release.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'switch-release.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'transfer-issue.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'plan-sprint.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'sprint-status.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'sprint-retro.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'end-sprint.js' : null,
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

const TESTING_FRAMEWORKS = [
  { value: 'IDPF-Testing-Core', title: 'IDPF-Testing-Core', description: 'Foundation testing framework' },
  { value: 'IDPF-QA-Automation', title: 'IDPF-QA-Automation', description: 'QA automation framework' },
  { value: 'IDPF-Performance', title: 'IDPF-Performance', description: 'Performance testing framework' },
  { value: 'IDPF-Security', title: 'IDPF-Security', description: 'Security testing framework' },
  { value: 'IDPF-Accessibility', title: 'IDPF-Accessibility', description: 'Accessibility testing framework' },
  { value: 'IDPF-Chaos', title: 'IDPF-Chaos', description: 'Chaos engineering framework' },
  { value: 'IDPF-Contract-Testing', title: 'IDPF-Contract-Testing', description: 'Contract testing framework' },
];

/**
 * Valid framework transitions per Framework-Transitions.md
 * Key: source framework, Value: array of valid target frameworks
 *
 * Rules:
 * - Vibe can transition to Structured or Agile (exploration complete)
 * - Structured and Agile can transition between each other
 * - Structured and Agile can transition to LTS (production ready)
 * - Cannot transition TO Vibe from Structured/Agile (quality standards never decrease)
 * - LTS is terminal (no transitions allowed)
 */
const VALID_TRANSITIONS = {
  'IDPF-Vibe': ['IDPF-Structured', 'IDPF-Agile'],
  'IDPF-Structured': ['IDPF-Agile', 'IDPF-LTS'],
  'IDPF-Agile': ['IDPF-Structured', 'IDPF-LTS'],
  'IDPF-LTS': [], // Terminal state - no transitions allowed
};

const ALL_SKILLS = [
  'anti-pattern-analysis',
  'api-versioning',
  'bdd-writing',
  'beginner-testing',
  'ci-cd-pipeline-design',
  'common-errors',
  'error-handling-patterns',
  'extract-prd',
  'flask-setup',
  'migration-patterns',
  'mutation-testing',
  'postgresql-integration',
  'property-based-testing',
  'sinatra-setup',
  'sqlite-integration',
  'tdd-failure-recovery',
  'tdd-green-phase',
  'tdd-red-phase',
  'tdd-refactor-phase',
  'test-writing-patterns',
  'uml-generation',
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
 * Check if a framework transition is valid
 * @param {string} from - Source framework (e.g., 'IDPF-Structured')
 * @param {string} to - Target framework (e.g., 'IDPF-Agile')
 * @returns {boolean} True if transition is valid
 */
function isValidTransition(from, to) {
  if (!VALID_TRANSITIONS[from]) {
    return false;
  }
  return VALID_TRANSITIONS[from].includes(to);
}

/**
 * Get valid transition targets for a framework
 * @param {string} from - Source framework
 * @returns {Array<{value: string, title: string, description: string}>} Valid target frameworks
 */
function getValidTransitionTargets(from) {
  const validTargets = VALID_TRANSITIONS[from] || [];
  return PROCESS_FRAMEWORKS.filter(f => validTargets.includes(f.value));
}

/**
 * Get reason why a transition is invalid
 * @param {string} from - Source framework
 * @param {string} to - Target framework
 * @returns {string} Explanation of why transition is invalid
 */
function getTransitionBlockReason(from, to) {
  if (from === 'IDPF-LTS') {
    return 'LTS is a terminal state. No transitions are allowed from LTS. For new development, start a new project with a different framework.';
  }
  if (to === 'IDPF-Vibe' && (from === 'IDPF-Structured' || from === 'IDPF-Agile')) {
    return 'Transition to Vibe from Structured/Agile is not allowed. Quality standards should never decrease.';
  }
  if (from === to) {
    return 'Already using this framework.';
  }
  return 'This transition is not supported.';
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
      // Only match installer-generated command files, not user-created ones
      /^switch-role\.md$/,
      /^add-role\.md$/,
    ],
    hooks: [
      // Only match installer-generated hook files
      /^workflow-trigger\.js$/,
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
async function updateTrackedProjects(frameworkPath) {
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

      // Still offer framework transition even when version is current
      const currentFramework = projectConfig.projectType?.processFramework;
      if (currentFramework) {
        const validTargets = getValidTransitionTargets(currentFramework);

        if (validTargets.length > 0) {
          const { wantChange } = await prompts({
            type: 'confirm',
            name: 'wantChange',
            message: `    Change framework? (Currently: ${currentFramework})`,
            initial: false,
          }, { onCancel: () => process.exit(0) });

          if (wantChange) {
            const { newFramework } = await prompts({
              type: 'select',
              name: 'newFramework',
              message: `    Select new framework`,
              choices: validTargets,
            }, { onCancel: () => process.exit(0) });

            if (newFramework && newFramework !== currentFramework) {
              projectConfig.projectType.processFramework = newFramework;
              log(`    ${colors.green(`Framework: ${currentFramework} → ${newFramework}`)}`);

              // Regenerate CLAUDE.md with new framework
              const domainListStr = (projectConfig.projectType.domainSpecialists || []).join(', ');
              const primarySpecialist = projectConfig.projectType.primarySpecialist;
              const claudeMdPath = path.join(projectPath, 'CLAUDE.md');
              let existingProjectInstructions = null;
              if (fs.existsSync(claudeMdPath)) {
                const claudeMd = fs.readFileSync(claudeMdPath, 'utf8');
                const match = claudeMd.match(/## Project-Specific Instructions\s*\n([\s\S]*?)(?=\n---|\n\*\*End of Claude Code Instructions\*\*|$)/);
                if (match && match[1]) {
                  // Clean up any embedded section markers from previous buggy runs
                  let content = match[1]
                    .replace(/## Project-Specific Instructions\s*\n?/g, '')
                    .replace(/\*\*End of Claude Code Instructions\*\*\s*\n?/g, '')
                    .replace(/\n---\s*\n?/g, '\n')
                    .trim();
                  // Don't preserve if it's ONLY the default placeholder
                  const withoutPlaceholders = content.replace(/<!--.*?-->/gs, '').trim();
                  if (withoutPlaceholders) {
                    existingProjectInstructions = content;
                  }
                }
              }
              generateClaudeMd(projectPath, frameworkPath, newFramework, domainListStr, primarySpecialist, existingProjectInstructions);
              log(`    ${colors.dim('  Regenerated CLAUDE.md')}`);

              // Update skills for new framework
              const skillsDir = path.join(projectPath, '.claude', 'skills');
              if (fs.existsSync(skillsDir)) {
                fs.rmSync(skillsDir, { recursive: true, force: true });
              }
              fs.mkdirSync(skillsDir, { recursive: true });
              const skillsToDeploy = FRAMEWORK_SKILLS[newFramework] || [];
              for (const skill of skillsToDeploy) {
                const skillZip = path.join(frameworkPath, 'Skills', 'Packaged', `${skill}.zip`);
                const skillDir = path.join(skillsDir, skill);
                if (fs.existsSync(skillZip) && extractZip(skillZip, skillDir)) {
                  log(`    ${colors.dim(`  Deployed: ${skill}`)}`);
                }
              }

              // Save config
              projectConfig.installedDate = new Date().toISOString().split('T')[0];
              fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2));
            }
          }
        }
      }

      results.current++;
      continue;
    }

    // Needs update - run migrations
    log(`  ${colors.cyan('→')} ${projectPath}`);
    log(`    ${colors.dim(`Updating ${installedVersion} → ${currentVersion}`)}`);

    try {
      // Check for framework transition option
      const currentFramework = projectConfig.projectType?.processFramework;
      if (currentFramework) {
        const validTargets = getValidTransitionTargets(currentFramework);

        if (validTargets.length === 0) {
          // LTS or terminal state
          if (currentFramework === 'IDPF-LTS') {
            log(`    ${colors.dim(`Framework: ${currentFramework} (terminal - no transitions)`)}`);
          }
        } else {
          // Ask if user wants to change framework
          const { wantChange } = await prompts({
            type: 'confirm',
            name: 'wantChange',
            message: `    Change framework? (Currently: ${currentFramework})`,
            initial: false,
          }, { onCancel: () => process.exit(0) });

          if (wantChange) {
            // Show valid targets and let user choose
            const { newFramework } = await prompts({
              type: 'select',
              name: 'newFramework',
              message: `    Select new framework`,
              choices: validTargets,
            }, { onCancel: () => process.exit(0) });

            if (newFramework && newFramework !== currentFramework) {
              // Update framework in config
              projectConfig.projectType.processFramework = newFramework;
              log(`    ${colors.green(`Framework: ${currentFramework} → ${newFramework}`)}`);

              // Regenerate CLAUDE.md with new framework
              const domainListStr = (projectConfig.projectType.domainSpecialists || []).join(', ');
              const primarySpecialist = projectConfig.projectType.primarySpecialist;
              const claudeMdPath = path.join(projectPath, 'CLAUDE.md');
              let existingProjectInstructions = null;
              if (fs.existsSync(claudeMdPath)) {
                const claudeMd = fs.readFileSync(claudeMdPath, 'utf8');
                const match = claudeMd.match(/## Project-Specific Instructions\s*\n([\s\S]*?)(?=\n---|\n\*\*End of Claude Code Instructions\*\*|$)/);
                if (match && match[1]) {
                  // Clean up any embedded section markers from previous buggy runs
                  let content = match[1]
                    .replace(/## Project-Specific Instructions\s*\n?/g, '')
                    .replace(/\*\*End of Claude Code Instructions\*\*\s*\n?/g, '')
                    .replace(/\n---\s*\n?/g, '\n')
                    .trim();
                  // Don't preserve if it's ONLY the default placeholder
                  const withoutPlaceholders = content.replace(/<!--.*?-->/gs, '').trim();
                  if (withoutPlaceholders) {
                    existingProjectInstructions = content;
                  }
                }
              }
              generateClaudeMd(projectPath, frameworkPath, newFramework, domainListStr, primarySpecialist, existingProjectInstructions);
              log(`    ${colors.dim('  Regenerated CLAUDE.md')}`);

              // Update skills for new framework
              const skillsDir = path.join(projectPath, '.claude', 'skills');
              if (fs.existsSync(skillsDir)) {
                fs.rmSync(skillsDir, { recursive: true, force: true });
              }
              fs.mkdirSync(skillsDir, { recursive: true });
              const skillsToDeploy = FRAMEWORK_SKILLS[newFramework] || [];
              for (const skill of skillsToDeploy) {
                const skillZip = path.join(frameworkPath, 'Skills', 'Packaged', `${skill}.zip`);
                const skillDir = path.join(skillsDir, skill);
                if (fs.existsSync(skillZip) && extractZip(skillZip, skillDir)) {
                  log(`    ${colors.dim(`  Deployed: ${skill}`)}`);
                }
              }
            }
          }
        }
      }

      // Run migrations
      const applicableMigrations = MIGRATIONS.filter(m =>
        compareVersions(installedVersion, m.version) < 0
      );

      for (const migration of applicableMigrations) {
        log(`    ${colors.dim(`  Running: ${migration.description}`)}`);
        migration.migrate(projectPath, frameworkPath, projectConfig);
      }

      // Redeploy rules (always update to latest)
      const hasGitHubWorkflow = fs.existsSync(path.join(projectPath, '.claude', 'hooks', 'workflow-trigger.js'));
      const domainListStr = (projectConfig.projectType?.domainSpecialists || []).join(', ');
      const primarySpecialist = projectConfig.projectType?.primarySpecialist;
      const currentFrameworkForRules = projectConfig.projectType?.processFramework;
      const rulesResult = deployRules(projectPath, frameworkPath, currentFrameworkForRules, domainListStr, primarySpecialist, hasGitHubWorkflow);
      if (rulesResult.antiHallucination) {
        log(`    ${colors.dim('  Updated: .claude/rules/01-anti-hallucination.md')}`);
      }
      if (rulesResult.githubWorkflow) {
        log(`    ${colors.dim('  Updated: .claude/rules/02-github-workflow.md')}`);
      }
      if (rulesResult.startup) {
        log(`    ${colors.dim('  Updated: .claude/rules/03-startup.md')}`);
      }

      // Redeploy hooks and commands (always update to latest)
      if (hasGitHubWorkflow) {
        if (deployWorkflowHook(projectPath, frameworkPath)) {
          log(`    ${colors.dim('  Updated: .claude/hooks/workflow-trigger.js')}`);
        }
        const workflowDeployed = deployWorkflowCommands(projectPath, frameworkPath);
        for (const cmd of workflowDeployed.commands) {
          log(`    ${colors.dim(`  Updated: .claude/commands/${cmd}.md`)}`);
        }
        for (const script of workflowDeployed.scripts) {
          log(`    ${colors.dim(`  Updated: .claude/scripts/${script}.js`)}`);
        }
      }

      // Redeploy skills (always update to latest)
      const skillsDir = path.join(projectPath, '.claude', 'skills');
      const frameworkForSkills = projectConfig.projectType?.processFramework;
      if (frameworkForSkills) {
        // Clear and redeploy skills
        if (fs.existsSync(skillsDir)) {
          fs.rmSync(skillsDir, { recursive: true, force: true });
        }
        fs.mkdirSync(skillsDir, { recursive: true });
        const skillsToDeploy = FRAMEWORK_SKILLS[frameworkForSkills] || [];
        for (const skill of skillsToDeploy) {
          const skillZip = path.join(frameworkPath, 'Skills', 'Packaged', `${skill}.zip`);
          const skillDir = path.join(skillsDir, skill);
          if (fs.existsSync(skillZip) && extractZip(skillZip, skillDir)) {
            log(`    ${colors.dim(`  Updated: ${skill}`)}`);
          }
        }
      }

      // Clean up orphaned files after migrations
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

// ======================================
//  GitHub Setup Functions (REQ-001 to REQ-010)
// ======================================

/**
 * REQ-001: Check git remote status
 * Returns: { hasGit: boolean, hasRemote: boolean }
 */
function checkGitRemote(projectDir) {
  const gitDir = path.join(projectDir, '.git');

  // AC-1: Check for .git directory
  if (!fs.existsSync(gitDir)) {
    return { hasGit: false, hasRemote: false };
  }

  // AC-2: Check for remote
  try {
    const result = execSync('git remote -v', { cwd: projectDir, stdio: 'pipe' }).toString();
    // AC-3: Remote exists if output is non-empty
    return { hasGit: true, hasRemote: result.trim().length > 0 };
  } catch {
    return { hasGit: true, hasRemote: false };
  }
}

/**
 * REQ-002: Check GitHub CLI prerequisites
 * Returns: { ready: boolean, issues: Array<{type, message, remediation}> }
 */
function checkGhCliPrerequisites() {
  const issues = [];

  // AC-1: Check if gh CLI is installed
  if (!checkCommand('gh')) {
    issues.push({
      type: 'not_installed',
      message: 'GitHub CLI (gh) is not installed',
      remediation: 'Install from: https://cli.github.com/',
    });
    return { ready: false, issues };
  }

  // AC-2: Check if gh is authenticated
  try {
    execSync('gh auth status', { stdio: 'pipe' });
  } catch (err) {
    issues.push({
      type: 'not_authenticated',
      message: 'GitHub CLI is not authenticated',
      remediation: 'Run: gh auth login',
    });
    return { ready: false, issues };
  }

  // AC-3 & AC-4: Check scopes
  try {
    const scopeOutput = execSync('gh auth status', { stdio: 'pipe' }).toString();

    // Check for repo scope
    if (!scopeOutput.includes('repo') && !scopeOutput.includes('Logged in')) {
      // Try to get scopes via API
      try {
        execSync('gh api user', { stdio: 'pipe' });
      } catch {
        issues.push({
          type: 'missing_repo_scope',
          message: 'Missing repo scope',
          remediation: 'Run: gh auth refresh -s repo,project',
        });
      }
    }

    // Check for project scope by testing project access
    try {
      execSync('gh api user', { stdio: 'pipe' });
    } catch {
      issues.push({
        type: 'missing_project_scope',
        message: 'Missing project scope',
        remediation: 'Run: gh auth refresh -s repo,project',
      });
    }
  } catch {
    // If we can't check scopes, assume they're missing
    issues.push({
      type: 'scope_check_failed',
      message: 'Could not verify authentication scopes',
      remediation: 'Run: gh auth refresh -s repo,project',
    });
  }

  // AC-5: Check and auto-install gh-pmu extension
  try {
    const extensions = execSync('gh extension list', { stdio: 'pipe' }).toString();
    if (!extensions.includes('gh-pmu')) {
      log(colors.cyan('  Installing gh-pmu extension...'));
      try {
        execSync('gh extension install rubrical-studios/gh-pmu', { stdio: 'pipe' });
        logSuccess('  ✓ Installed gh-pmu extension');
      } catch (installErr) {
        issues.push({
          type: 'gh_pmu_install_failed',
          message: 'Failed to install gh-pmu extension',
          remediation: 'Run manually: gh extension install rubrical-studios/gh-pmu',
        });
      }
    }
  } catch {
    // If we can't check extensions, try to install anyway
    log(colors.cyan('  Installing gh-pmu extension...'));
    try {
      execSync('gh extension install rubrical-studios/gh-pmu', { stdio: 'pipe' });
      logSuccess('  ✓ Installed gh-pmu extension');
    } catch {
      issues.push({
        type: 'gh_pmu_install_failed',
        message: 'Failed to install gh-pmu extension',
        remediation: 'Run manually: gh extension install rubrical-studios/gh-pmu',
      });
    }
  }

  return { ready: issues.length === 0, issues };
}

/**
 * REQ-005: Create GitHub repository
 * Returns: { success: boolean, repoUrl?: string, error?: string }
 */
function createGitHubRepo(projectDir, repoName, visibility) {
  try {
    // Create the repository
    const visFlag = visibility === 'public' ? '--public' : '--private';
    const result = execSync(
      `gh repo create "${repoName}" ${visFlag} --source="${projectDir}" --push`,
      { cwd: projectDir, stdio: 'pipe' }
    ).toString();

    // Extract repo URL from output
    const urlMatch = result.match(/https:\/\/github\.com\/[^\s]+/);
    const repoUrl = urlMatch ? urlMatch[0] : `https://github.com/${repoName}`;

    return { success: true, repoUrl };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * REQ-006: Copy project board template
 * Returns: { success: boolean, projectNumber?: number, projectUrl?: string, error?: string }
 */
function copyProjectBoard(templateNumber, projectTitle, targetOwner) {
  try {
    // Copy project from rubrical-studios with JSON output for reliable parsing
    const result = execSync(
      `gh project copy ${templateNumber} --source-owner rubrical-studios --target-owner ${targetOwner} --title "${projectTitle}" --format json`,
      { stdio: 'pipe' }
    ).toString();

    // Parse JSON output to extract project number and URL
    const projectData = JSON.parse(result);
    const projectNumber = projectData.number || null;
    const projectUrl = projectData.url || null;

    return { success: true, projectNumber, projectUrl };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * REQ-007: Link project board to repository
 * Returns: { success: boolean, error?: string }
 */
function linkProjectBoard(projectNumber, owner, repoName) {
  try {
    execSync(
      `gh project link ${projectNumber} --owner ${owner} --repo ${repoName}`,
      { stdio: 'pipe' }
    );
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * REQ-008: Generate .gh-pmu.yml configuration file
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
 * Get current GitHub username
 */
function getGitHubUsername() {
  try {
    const result = execSync('gh api user --jq ".login"', { stdio: 'pipe' }).toString().trim();
    return result;
  } catch {
    return null;
  }
}

/**
 * REQ-010: Display GitHub setup success information
 */
function displayGitHubSetupSuccess(repoUrl, projectUrl) {
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

/**
 * Read framework version from framework-manifest.json (authoritative source)
 */
function readFrameworkVersion(frameworkPath) {
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (manifest.version) {
        return manifest.version;
      }
    } catch {
      // Fall through to unknown
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
    // Clean up any embedded section markers from previous buggy runs
    projectInstructions = instructionsMatch[1]
      .replace(/## Project-Specific Instructions\s*\n?/g, '')
      .replace(/\*\*End of Claude Code Instructions\*\*\s*\n?/g, '')
      .replace(/\n---\s*\n?/g, '\n')
      .trim();
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
    'end-sprint'
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
  // Check for command-line flags
  const args = process.argv.slice(2);
  const migrateMode = args.includes('--migrate');
  const skipGitHub = args.includes('--skip-github'); // REQ-009: Skip GitHub setup

  // Load prompts module, auto-install if missing
  // Assign to module-level prompts variable
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

        const results = await updateTrackedProjects(cwd);
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
          const results = await updateTrackedProjects(frameworkPath);
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

// Run
main();
