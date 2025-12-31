/**
 * update.js - Project update logic for IDPF Framework Installer
 * @module install/lib/update
 */

const fs = require('fs');
const path = require('path');
const { FRAMEWORK_SKILLS } = require('./constants');
const { colors, log, logCyan } = require('./ui');
const { getValidTransitionTargets } = require('./validation');
const { readInstalledProjects, untrackProject, trackProject, readFrameworkVersion, extractZip, parseExistingInstallation } = require('./detection');
const { generateClaudeMd } = require('./generation');
const { deployRules, deployWorkflowHook, deployWorkflowCommands } = require('./deployment');
const { compareVersions, MIGRATIONS } = require('./migrations');
const { cleanupOrphanedFiles } = require('./validation');

/**
 * Update/migrate all tracked projects
 * Returns: { updated: number, current: number, removed: number, failed: number }
 * @param {string} frameworkPath - Path to the framework directory
 * @param {Function} prompts - The prompts module for user interaction
 */
async function updateTrackedProjects(frameworkPath, prompts) {
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

    // Support both old (installedVersion) and new (frameworkVersion) schema
    const installedVersion = projectConfig.frameworkVersion || projectConfig.installedVersion || '0.0.0';

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

              // Regenerate CLAUDE.md with new framework (v0.19.1+: singular domainSpecialist)
              const domainSpecialist = projectConfig.projectType.domainSpecialist ||
                                        projectConfig.projectType.primarySpecialist ||
                                        (projectConfig.projectType.domainSpecialists || [])[0] ||
                                        'Full-Stack-Developer';
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
              generateClaudeMd(projectPath, frameworkPath, newFramework, domainSpecialist, null, existingProjectInstructions);
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

              // Save config (migrate to new schema if needed)
              projectConfig.installedDate = new Date().toISOString().split('T')[0];
              // Ensure using new schema field
              if (projectConfig.installedVersion && !projectConfig.frameworkVersion) {
                projectConfig.frameworkVersion = projectConfig.installedVersion;
                delete projectConfig.installedVersion;
              }
              delete projectConfig.components;
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
          // Agile is terminal state
          if (currentFramework === 'IDPF-Agile') {
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

              // Regenerate CLAUDE.md with new framework (v0.19.1+: singular domainSpecialist)
              const domainSpecialist = projectConfig.projectType.domainSpecialist ||
                                        projectConfig.projectType.primarySpecialist ||
                                        (projectConfig.projectType.domainSpecialists || [])[0] ||
                                        'Full-Stack-Developer';
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
              generateClaudeMd(projectPath, frameworkPath, newFramework, domainSpecialist, null, existingProjectInstructions);
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

      // Redeploy rules (always update to latest) - v0.19.1+: singular domainSpecialist
      const hasGitHubWorkflow = fs.existsSync(path.join(projectPath, '.claude', 'hooks', 'workflow-trigger.js'));
      const domainSpecialist = projectConfig.projectType?.domainSpecialist ||
                               projectConfig.projectType?.primarySpecialist ||
                               (projectConfig.projectType?.domainSpecialists || [])[0] ||
                               'Full-Stack-Developer';
      const currentFrameworkForRules = projectConfig.projectType?.processFramework;
      const rulesResult = deployRules(projectPath, frameworkPath, currentFrameworkForRules, domainSpecialist, null, hasGitHubWorkflow, currentVersion);
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

      // Clean up orphaned files after migrations (v0.19.1+: singular domainSpecialist)
      const cleanupConfig = {
        domainSpecialist: projectConfig.projectType?.domainSpecialist ||
                          projectConfig.projectType?.primarySpecialist ||
                          (projectConfig.projectType?.domainSpecialists || [])[0] ||
                          'Full-Stack-Developer',
        enableGitHubWorkflow: hasGitHubWorkflow,
      };
      const cleanupResult = cleanupOrphanedFiles(projectPath, cleanupConfig);
      if (cleanupResult.removed.length > 0) {
        for (const file of cleanupResult.removed) {
          log(`    ${colors.dim(`  Removed: ${file}`)}`);
        }
      }

      // Update version in config (migrate to new schema field name)
      projectConfig.frameworkVersion = currentVersion;
      projectConfig.installedDate = new Date().toISOString().split('T')[0];
      // Remove old field if present (schema migration)
      delete projectConfig.installedVersion;
      // Remove old components field if present (deprecated in v0.16.0+)
      delete projectConfig.components;
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

module.exports = {
  updateTrackedProjects,
};
