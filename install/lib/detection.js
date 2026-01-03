/**
 * detection.js - Project detection and tracking for IDPF Framework Installer
 * @module install/lib/detection
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { DOMAIN_SPECIALISTS } = require('./constants');

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
 * REQ-001 (Extensibility PRD #559): Check git working directory state
 * Verifies clean state before upgrade to enable rollback via `git checkout .`
 * Returns: { isClean: boolean, commitHash: string|null, error: string|null }
 */
function checkGitCleanState(projectDir) {
  const gitDir = path.join(projectDir, '.git');

  // Not a git repo - skip check (fresh install case)
  if (!fs.existsSync(gitDir)) {
    return { isClean: true, commitHash: null, error: null };
  }

  try {
    // AC-1 & AC-2: Check for uncommitted changes
    const status = execSync('git status --porcelain', { cwd: projectDir, stdio: 'pipe' }).toString();
    const isClean = status.trim().length === 0;

    // AC-3: Get current commit hash for rollback reference
    let commitHash = null;
    try {
      commitHash = execSync('git rev-parse HEAD', { cwd: projectDir, stdio: 'pipe' }).toString().trim();
    } catch {
      // No commits yet - that's fine
    }

    if (!isClean) {
      return {
        isClean: false,
        commitHash,
        error: 'Commit or stash changes before upgrade'
      };
    }

    return { isClean: true, commitHash, error: null };
  } catch (err) {
    // Git command failed - treat as clean to allow install to proceed
    return { isClean: true, commitHash: null, error: null };
  }
}

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
  const { logSuccess } = require('./ui');
  const colors = require('./ui').colors;

  try {
    const extensions = execSync('gh extension list', { stdio: 'pipe' }).toString();
    if (!extensions.includes('gh-pmu')) {
      console.log(colors.cyan('  Installing gh-pmu extension...'));
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
    console.log(colors.cyan('  Installing gh-pmu extension...'));
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
 * Parse existing CLAUDE.md for locked framework, domain specialist, and project instructions
 * v0.17.0+: Returns singular domainSpecialist (string) instead of existingDomains (array)
 */
function parseExistingInstallation(projectDir) {
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');

  if (!fs.existsSync(claudeMdPath)) {
    return { lockedFramework: null, domainSpecialist: null, projectInstructions: null };
  }

  const content = fs.readFileSync(claudeMdPath, 'utf8');

  // Extract framework
  let lockedFramework = null;
  const frameworkMatch = content.match(/\*\*Process Framework:\*\*\s*\*?\*?(IDPF-\w+)/);
  if (frameworkMatch) {
    lockedFramework = frameworkMatch[1];
  }

  // Extract existing domain specialist (v0.17.0+: singular)
  // Try new format first, fall back to old format
  let domainSpecialist = null;
  const specialistMatch = content.match(/\*\*Domain Specialist:\*\*\s*(.+)/);
  if (specialistMatch && specialistMatch[1].trim() !== 'None') {
    domainSpecialist = specialistMatch[1].trim();
    // Validate against known specialists
    if (!DOMAIN_SPECIALISTS.includes(domainSpecialist)) {
      domainSpecialist = null;
    }
  } else {
    // Fall back to old format (Domain Specialists: plural, comma-separated)
    const domainsMatch = content.match(/\*\*Domain Specialists:\*\*\s*(.+)/);
    if (domainsMatch && domainsMatch[1].trim() !== 'None') {
      const domains = domainsMatch[1].split(',').map(d => d.trim()).filter(d => d && DOMAIN_SPECIALISTS.includes(d));
      // Take first valid specialist from old format
      domainSpecialist = domains[0] || null;
    }
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

  return { lockedFramework, domainSpecialist, projectInstructions };
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

module.exports = {
  readInstalledProjects,
  writeInstalledProjects,
  trackProject,
  untrackProject,
  checkCommand,
  checkPrerequisites,
  extractZip,
  checkGitCleanState,
  checkGitRemote,
  checkGhCliPrerequisites,
  createGitHubRepo,
  copyProjectBoard,
  linkProjectBoard,
  getGitHubUsername,
  readFrameworkVersion,
  parseExistingInstallation,
  copyFile,
  getCurrentDate,
};
