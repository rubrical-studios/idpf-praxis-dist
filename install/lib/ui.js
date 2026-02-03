/**
 * @framework-script 0.35.2
 * ui.js - Console UI helpers for IDPF Framework Installer
 * @module install/lib/ui
 */

// Console Colors (no dependencies)
const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
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

/**
 * Log debug message to stderr
 * @param {string} msg - Debug message
 */
function logDebug(msg) {
  console.error(colors.dim(`[DEBUG] ${msg}`));
}

function divider() {
  log(colors.cyan('───────────────────────────────────────'));
}

/**
 * NFR-001: Custom error class for upgrade failures
 *
 * Provides structured error information for atomic upgrade failures.
 * Includes the failed file path and rollback instructions.
 */
class UpgradeError extends Error {
  constructor(operation, filePath, originalError) {
    // AC-2: Error message indicates which file failed
    const message = `${operation} failed for file: ${filePath}`;
    super(message);
    this.name = 'UpgradeError';
    this.operation = operation;
    this.filePath = filePath;
    this.originalError = originalError;
  }

  /**
   * AC-3: Get rollback instruction
   */
  getRollbackInstruction() {
    return 'To rollback changes, run: git checkout .';
  }

  /**
   * Display full error with rollback instructions
   */
  display() {
    logError(`\nERROR: ${this.message}`);
    if (this.originalError?.message) {
      logError(`  Cause: ${this.originalError.message}`);
    }
    log();
    logWarning(this.getRollbackInstruction());
    log();
  }
}

/**
 * NFR-001 AC-1: Safe file write that throws UpgradeError on failure
 *
 * @param {string} filePath - Path to write
 * @param {string} content - Content to write
 * @throws {UpgradeError} If write fails
 */
function safeWriteFile(filePath, content) {
  const fs = require('fs');
  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    throw new UpgradeError('Write', filePath, err);
  }
}

/**
 * NFR-001 AC-1: Safe file copy that throws UpgradeError on failure
 *
 * @param {string} srcPath - Source file path
 * @param {string} destPath - Destination file path
 * @throws {UpgradeError} If copy fails
 */
function safeCopyFile(srcPath, destPath) {
  const fs = require('fs');
  try {
    fs.copyFileSync(srcPath, destPath);
  } catch (err) {
    throw new UpgradeError('Copy', destPath, err);
  }
}

/**
 * NFR-001 AC-1: Safe directory creation that throws UpgradeError on failure
 *
 * @param {string} dirPath - Directory path to create
 * @throws {UpgradeError} If mkdir fails
 */
function safeMkdir(dirPath) {
  const fs = require('fs');
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    throw new UpgradeError('Create directory', dirPath, err);
  }
}

module.exports = {
  colors,
  log,
  logSuccess,
  logWarning,
  logError,
  logCyan,
  logDebug,
  divider,
  UpgradeError,
  safeWriteFile,
  safeCopyFile,
  safeMkdir,
};
