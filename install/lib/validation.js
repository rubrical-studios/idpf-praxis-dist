/**
 * @framework-script 0.35.2
 * validation.js - Validation utilities for IDPF Framework Installer
 * @module install/lib/validation
 */

const fs = require('fs');
const path = require('path');
const { VALID_TRANSITIONS, PROCESS_FRAMEWORKS, INSTALLED_FILES_MANIFEST } = require('./constants');

/**
 * Check if a framework transition is valid
 * @param {string} from - Source framework (e.g., 'IDPF-Vibe')
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
  if (from === 'IDPF-Agile') {
    return 'Agile is a terminal state. No transitions are allowed from Agile. For new development, start a new project with a different framework.';
  }
  if (to === 'IDPF-Vibe' && from === 'IDPF-Agile') {
    return 'Transition to Vibe from Agile is not allowed. Quality standards should never decrease.';
  }
  if (from === to) {
    return 'Already using this framework.';
  }
  return 'This transition is not supported.';
}

/**
 * Resolve expected files from manifest based on config
 * @param {object} manifestEntry - Entry from INSTALLED_FILES_MANIFEST
 * @param {object} config - Configuration object
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
 * Check if a file matches known installer-generated patterns
 * @param {string} filename - Name of the file
 * @param {string} manifestKey - Key from INSTALLED_FILES_MANIFEST
 * @returns {boolean} True if file matches known patterns
 */
function isKnownInstallerFile(filename, manifestKey) {
  const patterns = {
    root: [
      /^CLAUDE\.md$/,
      /^framework-config\.json$/,
      /^run_claude\.(cmd|sh)$/,
      /^runp_claude\.(cmd|sh)$/,
      /^STARTUP\.md$/,
    ],
    rules: [
      /^\d{2}-[\w-]+\.md$/,
      /^anti-hallucination\.md$/,
      /^github-workflow\.md$/,
      /^startup\.md$/,
    ],
    commands: [
      /^switch-role\.md$/,
      /^add-role\.md$/,
    ],
    hooks: [
      /^workflow-trigger\.js$/,
    ],
  };

  const categoryPatterns = patterns[manifestKey] || [];
  return categoryPatterns.some(pattern => pattern.test(filename));
}

/**
 * Clean up orphaned files that are no longer in the manifest
 * @param {string} projectDir - Project directory path
 * @param {object} config - Configuration object
 * @returns {object} Results: { removed: string[], skipped: string[] }
 */
function cleanupOrphanedFiles(projectDir, config) {
  const results = { removed: [], skipped: [] };

  for (const [key, entry] of Object.entries(INSTALLED_FILES_MANIFEST)) {
    const dirPath = path.join(projectDir, entry.dir);

    if (!fs.existsSync(dirPath)) {
      continue;
    }

    const expectedFiles = resolveManifestFiles(entry, config);

    let actualFiles;
    try {
      actualFiles = fs.readdirSync(dirPath).filter(f => {
        const fullPath = path.join(dirPath, f);
        return fs.statSync(fullPath).isFile();
      });
    } catch (_err) {
      continue;
    }

    for (const file of actualFiles) {
      if (!expectedFiles.includes(file)) {
        const filePath = path.join(dirPath, file);
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

module.exports = {
  isValidTransition,
  getValidTransitionTargets,
  getTransitionBlockReason,
  resolveManifestFiles,
  isKnownInstallerFile,
  cleanupOrphanedFiles,
};
