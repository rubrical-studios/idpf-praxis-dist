/**
 * Tests for CLI flag handling (--help, --version, --with-tests)
 *
 * Story 1.1: CLI Help Display (#1066)
 * Story 1.2: Test Installation Flag (#1067)
 * Story 1.3: Version Flag (#1068)
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const path = require('path');
const { execSync } = require('child_process');

const INSTALL_SCRIPT = path.join(__dirname, '..', '..', 'install.js');
const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');

/**
 * Helper to run install.js with given args and capture output.
 * Expects the command to exit 0 (non-interactive flag).
 */
function runInstaller(args) {
  return execSync(`node "${INSTALL_SCRIPT}" ${args}`, {
    cwd: FRAMEWORK_ROOT,
    encoding: 'utf8',
    timeout: 10000,
  });
}

// ============================================================
// Story 1.1: CLI Help Display (#1066)
// ============================================================

describe('Story 1.1: CLI Help Display', () => {
  test('--help displays usage documentation', () => {
    const output = runInstaller('--help');
    expect(output).toContain('Usage:');
    expect(output).toContain('Options:');
  });

  test('--help documents --with-tests flag', () => {
    const output = runInstaller('--help');
    expect(output).toContain('--with-tests');
  });

  test('-h short form works identically to --help', () => {
    const helpOutput = runInstaller('--help');
    const hOutput = runInstaller('-h');
    expect(hOutput).toBe(helpOutput);
  });

  test('--help exits with code 0', () => {
    // execSync throws on non-zero exit, so if we get here it's 0
    expect(() => runInstaller('--help')).not.toThrow();
  });

  test('--help includes all existing flags', () => {
    const output = runInstaller('--help');
    expect(output).toContain('--force');
    expect(output).toContain('--migrate');
    expect(output).toContain('--skip-github');
    expect(output).toContain('--debug');
    expect(output).toContain('--with-tests');
    expect(output).toContain('--version');
    expect(output).toContain('--help');
  });
});

// ============================================================
// Story 1.3: Version Flag (#1068)
// ============================================================

describe('Story 1.3: Version Flag', () => {
  test('--version outputs version string', () => {
    const output = runInstaller('--version').trim();
    expect(output).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('-v outputs version string', () => {
    const output = runInstaller('-v').trim();
    expect(output).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('version matches framework-manifest.json', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    const output = runInstaller('--version').trim();
    expect(output).toBe(manifest.version);
  });

  test('--version exits with code 0', () => {
    expect(() => runInstaller('--version')).not.toThrow();
  });
});

// ============================================================
// Story 1.1 + 1.3: Unit tests for cli module
// ============================================================

describe('CLI module unit tests', () => {
  let cli;

  beforeAll(() => {
    cli = require('../lib/cli');
  });

  test('getHelpText returns string with Usage section', () => {
    const help = cli.getHelpText();
    expect(typeof help).toBe('string');
    expect(help).toContain('Usage:');
    expect(help).toContain('Options:');
  });

  test('getHelpText documents all flags', () => {
    const help = cli.getHelpText();
    expect(help).toContain('--help');
    expect(help).toContain('--version');
    expect(help).toContain('--with-tests');
    expect(help).toContain('--force');
    expect(help).toContain('--migrate');
    expect(help).toContain('--skip-github');
    expect(help).toContain('--debug');
  });

  test('getVersion returns semver string', () => {
    const version = cli.getVersion();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('getVersion matches framework-manifest.json', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    expect(cli.getVersion()).toBe(manifest.version);
  });
});
