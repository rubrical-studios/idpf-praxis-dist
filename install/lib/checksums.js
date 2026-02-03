/**
 * @framework-script 0.35.4
 * checksums.js - SHA256 checksum utilities for IDPF Framework Installer
 *
 * Implements NFR-002 from PRD #559:
 * - SHA256 hex digest for modification detection
 *
 * @module install/lib/checksums
 */

const fs = require('fs');
const crypto = require('crypto');

/**
 * NFR-002: Compute SHA256 hash of file content
 *
 * @param {string} filePath - Path to file
 * @returns {string} Lowercase hex digest
 */
function computeFileHash(filePath) {
  // AC-1: Use Node.js crypto module
  const content = fs.readFileSync(filePath);  // AC-3: Hash entire file content
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');  // AC-2: Lowercase hex string
}

/**
 * Compute SHA256 hash of string content
 *
 * @param {string} content - Content to hash
 * @returns {string} Lowercase hex digest
 */
function computeContentHash(content) {
  const hash = crypto.createHash('sha256');
  hash.update(content, 'utf8');
  return hash.digest('hex');
}

/**
 * Read manifest file from .claude/.manifest.json
 *
 * @param {string} projectDir - Project directory
 * @returns {object|null} Manifest data or null if not found
 */
function readManifest(projectDir) {
  const manifestPath = require('path').join(projectDir, '.claude', '.manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Write manifest file to .claude/.manifest.json
 *
 * @param {string} projectDir - Project directory
 * @param {object} manifest - Manifest data
 */
function writeManifest(projectDir, manifest) {
  const path = require('path');
  const manifestPath = path.join(projectDir, '.claude', '.manifest.json');
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

/**
 * Check if a file has been modified since deployment
 *
 * @param {string} filePath - Path to file
 * @param {string} expectedHash - Expected hash from manifest
 * @returns {boolean} True if file has been modified
 */
function isFileModified(filePath, expectedHash) {
  if (!fs.existsSync(filePath)) {
    return false;  // File doesn't exist, not modified
  }
  const currentHash = computeFileHash(filePath);
  return currentHash !== expectedHash;
}

/**
 * Update manifest with new entries for a category
 * Creates manifest if it doesn't exist, merges entries if it does
 *
 * @param {string} projectDir - Project directory
 * @param {string} category - Category name (e.g., 'commands', 'rules', 'hooks')
 * @param {object} entries - Object with file keys and checksum data
 * @param {string} version - Framework version
 */
function updateManifestEntries(projectDir, category, entries, version) {
  const manifest = readManifest(projectDir) || {
    version: version,
    deployedAt: new Date().toISOString().split('T')[0],
    scripts: {},
  };

  // Initialize category if not present
  if (!manifest[category]) {
    manifest[category] = {};
  }

  // Merge entries
  Object.assign(manifest[category], entries);

  // Update version if provided
  if (version) {
    manifest.version = version;
  }

  writeManifest(projectDir, manifest);
}

module.exports = {
  computeFileHash,
  computeContentHash,
  readManifest,
  writeManifest,
  isFileModified,
  updateManifestEntries,
};
