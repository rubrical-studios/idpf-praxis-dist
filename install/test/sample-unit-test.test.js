/**
 * Tests for Story 3.1: Sample Unit Test
 * Tests for Story 3.2: npm Script Injection
 *
 * Story 3.1: Sample Unit Test (#1072)
 * Story 3.2: npm Script Injection (#1073)
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');
const TEST_AUTOMATION = path.join(FRAMEWORK_ROOT, 'Construction', 'Test-Automation');

// ============================================================
// Story 3.1: Sample Unit Test (#1072)
// ============================================================

describe('Story 3.1: Sample Unit Test', () => {
  test('sample test file exists in Comprehensive/unit/', () => {
    const unitDir = path.join(TEST_AUTOMATION, 'Comprehensive', 'unit');
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.test.js'));
    expect(files.length).toBeGreaterThan(0);
  });

  test('sample test is metadata-validation.test.js', () => {
    const testFile = path.join(TEST_AUTOMATION, 'Comprehensive', 'unit', 'metadata-validation.test.js');
    expect(fs.existsSync(testFile)).toBe(true);
  });

  test('sample test validates framework-config.json parsing', () => {
    const testContent = fs.readFileSync(
      path.join(TEST_AUTOMATION, 'Comprehensive', 'unit', 'metadata-validation.test.js'),
      'utf8'
    );
    expect(testContent).toContain('framework-config');
  });

  test('sample test validates package.json parsing', () => {
    const testContent = fs.readFileSync(
      path.join(TEST_AUTOMATION, 'Comprehensive', 'unit', 'metadata-validation.test.js'),
      'utf8'
    );
    expect(testContent).toContain('package.json');
  });

  test('sample test follows Jest best practices (describe/test blocks)', () => {
    const testContent = fs.readFileSync(
      path.join(TEST_AUTOMATION, 'Comprehensive', 'unit', 'metadata-validation.test.js'),
      'utf8'
    );
    expect(testContent).toContain('describe(');
    expect(testContent).toContain('test(');
    expect(testContent).toContain('expect(');
  });

  test('sample test handles missing framework-config.json gracefully', () => {
    const testContent = fs.readFileSync(
      path.join(TEST_AUTOMATION, 'Comprehensive', 'unit', 'metadata-validation.test.js'),
      'utf8'
    );
    // Test should handle missing file case
    expect(testContent).toContain('missing');
  });

  test('manifest.json updated with sample test entry', () => {
    const manifest = require(path.join(TEST_AUTOMATION, 'Comprehensive', 'manifest.json'));
    expect(manifest.tests.length).toBeGreaterThan(0);
    const hasMetadataTest = manifest.tests.some(t => t.file.includes('metadata-validation'));
    expect(hasMetadataTest).toBe(true);
  });
});

// ============================================================
// Story 3.2: npm Script Injection (#1073)
// ============================================================

describe('Story 3.2: npm Script Injection', () => {
  const testDeployment = require('../lib/test-deployment');

  test('test project package.json contains test:framework script', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.scripts['test:framework']).toBeDefined();
  });

  test('test:framework script runs Jest with unit pattern', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.scripts['test:framework']).toContain('jest');
    expect(pkg.scripts['test:framework']).toContain('unit');
  });

  test('test:framework:e2e script exists', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.scripts['test:framework:e2e']).toBeDefined();
  });

  test('test:framework:e2e script runs Jest with integration pattern', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.scripts['test:framework:e2e']).toContain('jest');
    expect(pkg.scripts['test:framework:e2e']).toContain('integration');
  });

  test('test:framework:e2e sets 60s timeout', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.scripts['test:framework:e2e']).toContain('60000');
  });

  test('re-install regenerates scripts (dedicated test project)', () => {
    let tmpDir;
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-npm-'));
      const targetDir = path.join(tmpDir, 'test-project');

      // First install
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      const pkg1 = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
      expect(pkg1.scripts['test:framework']).toBeDefined();

      // Tamper with scripts
      pkg1.scripts['test:framework'] = 'echo tampered';
      fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkg1));

      // Re-install (should regenerate)
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      const pkg2 = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
      expect(pkg2.scripts['test:framework']).toContain('jest');
      expect(pkg2.scripts['test:framework']).not.toContain('tampered');
    } finally {
      if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
