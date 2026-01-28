/**
 * @framework-script 0.34.0
 * CLI flag handling for early-exit operations (--help, --version)
 *
 * These flags are processed before the interactive installer starts.
 * They print output and exit immediately with code 0.
 *
 * @module install/lib/cli
 */

const path = require('path');
const fs = require('fs');

/**
 * Read version from framework-manifest.json
 * @returns {string} Semantic version string (e.g., "0.33.3")
 */
function getVersion() {
  const manifestPath = path.join(__dirname, '..', '..', 'framework-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  return manifest.version;
}

/**
 * Generate help text documenting all CLI flags
 * @returns {string} Formatted help text
 */
function getHelpText() {
  const version = getVersion();

  return `IDPF Framework Installer v${version}

Usage:
  node install.js [options]

Options:
  --help, -h          Show this help message
  --version, -v       Show installer version
  --with-tests        Create a dedicated test project for framework validation
  --force             Allow installation on non-main branches
  --migrate           Run migration tool for tracked projects
  --skip-github       Skip GitHub repository and project board setup
  --debug, -d         Enable debug logging for extensible file deployment

Examples:
  node install.js                 Interactive installation
  node install.js --with-tests    Install framework validation tests
  node install.js --help          Show this help message
`;
}

/**
 * Handle early-exit CLI flags (--help, --version).
 * If a matching flag is found, prints output and calls process.exit(0).
 * Otherwise returns false so the caller continues normal flow.
 *
 * @param {string[]} args - CLI arguments (process.argv.slice(2))
 * @returns {boolean} false if no early-exit flag matched
 */
function handleEarlyExitFlags(args) {
  if (args.includes('--help') || args.includes('-h')) {
    process.stdout.write(getHelpText());
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    process.stdout.write(getVersion() + '\n');
    process.exit(0);
  }

  return false;
}

module.exports = {
  getVersion,
  getHelpText,
  handleEarlyExitFlags,
};
