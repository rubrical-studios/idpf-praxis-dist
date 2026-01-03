/**
 * migrations.js - Version migrations for IDPF Framework Installer
 * @module install/lib/migrations
 */

const fs = require('fs');
const path = require('path');
const { logSuccess, logWarning, divider, log } = require('./ui');
const { parseExistingInstallation, getCurrentDate, readFrameworkVersion, trackProject } = require('./detection');
const { generateClaudeMd } = require('./generation');
const { deployRules } = require('./deployment');
const { cleanupOrphanedFiles } = require('./validation');

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
      const version = readFrameworkVersion(frameworkPath);

      // Create .claude/rules/ with new structure (v0.17.0+: singular domainSpecialist)
      const domainSpecialist = config.projectType.domainSpecialist ||
                               config.projectType.primarySpecialist ||
                               (config.projectType.domainSpecialists || [])[0] ||
                               'Full-Stack-Developer';
      const rulesResult = deployRules(
        projectDir,
        frameworkPath,
        config.projectType.processFramework,
        domainSpecialist,
        null,
        hasGitHubWorkflow,
        version
      );

      if (rulesResult.antiHallucination) {
        logSuccess('  ✓ Created .claude/rules/01-anti-hallucination.md');
      }
      if (rulesResult.githubWorkflow) {
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
        domainSpecialist,
        null,
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
  const { logError } = require('./ui');

  const configPath = path.join(projectDir, 'framework-config.json');
  if (!fs.existsSync(configPath)) {
    logError('No framework-config.json found. Run install.js without --migrate first.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  // Support both old (installedVersion) and new (frameworkVersion) schema
  const installedVersion = config.frameworkVersion || config.installedVersion || '0.0.0';
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

  // Clean up orphaned files after all migrations (v0.17.0+: singular domainSpecialist)
  const hasGitHubWorkflow = fs.existsSync(path.join(projectDir, '.claude', 'hooks', 'workflow-trigger.js'));
  const cleanupConfig = {
    domainSpecialist: config.projectType?.domainSpecialist ||
                      config.projectType?.primarySpecialist ||
                      (config.projectType?.domainSpecialists || [])[0] ||
                      'Full-Stack-Developer',
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

  // Update installed version (migrate to new schema field name)
  config.frameworkVersion = currentVersion;
  config.migratedDate = getCurrentDate();
  // Remove old field if present (schema migration)
  delete config.installedVersion;
  // Remove old components field if present (deprecated in v0.16.0+)
  delete config.components;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  logSuccess(`Migration complete. Updated to version ${currentVersion}`);
}

module.exports = {
  compareVersions,
  MIGRATIONS,
  runMigrations,
};
