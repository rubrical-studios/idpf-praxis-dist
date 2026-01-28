/**
 * Tests for --with-tests test project deployment
 *
 * Story 1.2: Test Installation Flag (#1067)
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');

const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');

// ============================================================
// Unit tests for test-deployment module
// ============================================================

describe('Story 1.2: Test Deployment Module', () => {
  let testDeployment;

  beforeAll(() => {
    testDeployment = require('../lib/test-deployment');
  });

  describe('createTestProject', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-test-'));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    test('creates dedicated test project directory', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      expect(fs.existsSync(targetDir)).toBe(true);
    });

    test('test project has own package.json', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      const pkgPath = path.join(targetDir, 'package.json');
      expect(fs.existsSync(pkgPath)).toBe(true);

      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      expect(pkg.name).toContain('test');
      expect(pkg.devDependencies).toHaveProperty('jest');
    });

    test('test project has framework test scripts', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
      expect(pkg.scripts).toHaveProperty('test:framework');
      expect(pkg.scripts).toHaveProperty('test:framework:e2e');
    });

    test('/run-fw-tests command deployed to .claude/commands/', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      const cmdPath = path.join(targetDir, '.claude', 'commands', 'run-fw-tests.md');
      expect(fs.existsSync(cmdPath)).toBe(true);
    });

    test('test project created in specified directory', () => {
      const targetDir = path.join(tmpDir, 'my-custom-test-dir');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      expect(fs.existsSync(targetDir)).toBe(true);
      expect(fs.existsSync(path.join(targetDir, 'package.json'))).toBe(true);
    });
  });

  describe('clearTestProject', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-test-'));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    test('existing content removed before deploy', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      // First create
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);

      // Add a stale file
      fs.writeFileSync(path.join(targetDir, 'stale-file.txt'), 'stale');
      expect(fs.existsSync(path.join(targetDir, 'stale-file.txt'))).toBe(true);

      // Re-create (should clear first)
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);

      // Stale file should be gone
      expect(fs.existsSync(path.join(targetDir, 'stale-file.txt'))).toBe(false);
    });

    test('no stale test artifacts remain after redeploy', () => {
      const targetDir = path.join(tmpDir, 'test-project');
      // First create
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);

      // Add stale artifacts in nested directories
      const staleDir = path.join(targetDir, 'old-tests');
      fs.mkdirSync(staleDir, { recursive: true });
      fs.writeFileSync(path.join(staleDir, 'old.test.js'), 'old');

      // Re-create
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);

      // Stale artifacts should be gone
      expect(fs.existsSync(staleDir)).toBe(false);
    });
  });

  describe('edge cases', () => {
    let tmpDir;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-test-'));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    test('target directory does not exist (should be created)', () => {
      const targetDir = path.join(tmpDir, 'deep', 'nested', 'test-project');
      expect(fs.existsSync(targetDir)).toBe(false);
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      expect(fs.existsSync(targetDir)).toBe(true);
    });

    test('target directory already exists with content (should be cleared)', () => {
      const targetDir = path.join(tmpDir, 'existing-project');
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'existing.txt'), 'content');

      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);

      expect(fs.existsSync(path.join(targetDir, 'existing.txt'))).toBe(false);
      expect(fs.existsSync(path.join(targetDir, 'package.json'))).toBe(true);
    });
  });
});

// ============================================================
// Integration: standard install has no test infrastructure
// ============================================================

describe('Story 1.2: Standard install isolation', () => {
  test('--help does not mention test project creation', () => {
    const output = execSync(`node "${path.join(FRAMEWORK_ROOT, 'install.js')}" --help`, {
      encoding: 'utf8',
      timeout: 10000,
    });
    // Help should document --with-tests flag but not create test project
    expect(output).toContain('--with-tests');
    // The help text itself doesn't create any test infrastructure
    expect(output).not.toContain('Test project created');
  });
});
