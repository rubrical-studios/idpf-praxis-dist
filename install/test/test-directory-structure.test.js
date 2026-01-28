/**
 * Tests for test directory structure, manifest schema, and Jest config
 *
 * Story 2.1: Directory Layout (#1069)
 * Story 2.2: Manifest Schema (#1070)
 * Story 2.3: Jest Configuration (#1071)
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const fs = require('fs');
const path = require('path');

const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');
const TEST_AUTOMATION = path.join(FRAMEWORK_ROOT, 'Construction', 'Test-Automation');

// ============================================================
// Story 2.1: Directory Layout (#1069)
// ============================================================

describe('Story 2.1: Directory Layout', () => {
  test('Construction/Test-Automation/Comprehensive/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive'))).toBe(true);
  });

  test('Comprehensive/unit/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'unit'))).toBe(true);
  });

  test('Comprehensive/integration/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'integration'))).toBe(true);
  });

  test('Comprehensive/fixtures/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'fixtures'))).toBe(true);
  });

  test('Comprehensive/fixtures/templates/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'fixtures', 'templates'))).toBe(true);
  });

  test('Comprehensive/fixtures/expected/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'fixtures', 'expected'))).toBe(true);
  });

  test('integration/release/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'integration', 'release'))).toBe(true);
  });

  test('integration/capabilities/ exists', () => {
    expect(fs.existsSync(path.join(TEST_AUTOMATION, 'Comprehensive', 'integration', 'capabilities'))).toBe(true);
  });

  test('version-scoped directory exists', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    const versionDir = path.join(TEST_AUTOMATION, manifest.version);
    expect(fs.existsSync(versionDir)).toBe(true);
  });

  test('version-scoped directory has unit/ sub-directory', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    expect(fs.existsSync(path.join(TEST_AUTOMATION, manifest.version, 'unit'))).toBe(true);
  });

  test('version-scoped directory has integration/release/ sub-directory', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    expect(fs.existsSync(path.join(TEST_AUTOMATION, manifest.version, 'integration', 'release'))).toBe(true);
  });

  test('version-scoped directory has fixtures/ sub-directory', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    expect(fs.existsSync(path.join(TEST_AUTOMATION, manifest.version, 'fixtures'))).toBe(true);
  });
});

// ============================================================
// Story 2.2: Manifest Schema (#1070)
// ============================================================

describe('Story 2.2: Manifest Schema', () => {
  let schema;
  let comprehensiveManifest;
  let Ajv;
  let ajv;

  beforeAll(() => {
    Ajv = require('ajv');
    ajv = new Ajv();
    schema = require(path.join(TEST_AUTOMATION, 'manifest-schema.json'));
    comprehensiveManifest = require(path.join(TEST_AUTOMATION, 'Comprehensive', 'manifest.json'));
  });

  test('manifest.json validates against schema', () => {
    const validate = ajv.compile(schema);
    expect(validate(comprehensiveManifest)).toBe(true);
  });

  test('manifest includes required fields', () => {
    expect(comprehensiveManifest).toHaveProperty('version');
    expect(comprehensiveManifest).toHaveProperty('tests');
    expect(comprehensiveManifest).toHaveProperty('dependencies');
  });

  test('manifest has tier field', () => {
    expect(comprehensiveManifest).toHaveProperty('tier');
    expect(comprehensiveManifest.tier).toBe('comprehensive');
  });

  test('invalid manifest rejected by schema', () => {
    const validate = ajv.compile(schema);
    expect(validate({})).toBe(false);
  });

  test('missing required fields rejected', () => {
    const validate = ajv.compile(schema);
    expect(validate({ version: '1.0.0' })).toBe(false);
  });

  test('empty arrays for tests/dependencies are valid', () => {
    const validate = ajv.compile(schema);
    const validMinimal = {
      version: '0.33.3',
      tier: 'comprehensive',
      tests: [],
      dependencies: {},
    };
    expect(validate(validMinimal)).toBe(true);
  });

  test('version-scoped manifest exists and validates', () => {
    const manifest = require(path.join(FRAMEWORK_ROOT, 'framework-manifest.json'));
    const versionManifest = require(path.join(TEST_AUTOMATION, manifest.version, 'manifest.json'));
    const validate = ajv.compile(schema);
    expect(validate(versionManifest)).toBe(true);
    expect(versionManifest.tier).toBe('release');
  });
});

// ============================================================
// Story 2.3: Jest Configuration (#1071)
// ============================================================

describe('Story 2.3: Jest Configuration', () => {
  let jestConfig;

  beforeAll(() => {
    jestConfig = require(path.join(TEST_AUTOMATION, 'jest.config.js'));
  });

  test('Jest loads configuration without errors', () => {
    expect(jestConfig).toBeDefined();
  });

  test('configuration has testMatch patterns', () => {
    expect(jestConfig.testMatch).toBeDefined();
    expect(Array.isArray(jestConfig.testMatch)).toBe(true);
  });

  test('unit test pattern matches unit/ directory', () => {
    const hasUnitPattern = jestConfig.testMatch.some(p => p.includes('unit'));
    expect(hasUnitPattern).toBe(true);
  });

  test('integration test pattern matches integration/ directory', () => {
    const hasIntegrationPattern = jestConfig.testMatch.some(p => p.includes('integration'));
    expect(hasIntegrationPattern).toBe(true);
  });

  test('coverage configured without thresholds', () => {
    expect(jestConfig.coverageThreshold).toBeUndefined();
    expect(jestConfig.collectCoverage).toBe(true);
  });

  test('E2E timeout set to 60 seconds', () => {
    expect(jestConfig.testTimeout).toBe(60000);
  });

  test('test environment is node', () => {
    expect(jestConfig.testEnvironment).toBe('node');
  });

  test('Jest version pinned to 29.x in test project package.json', () => {
    const testDeployment = require('../lib/test-deployment');
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    const jestVersion = pkg.devDependencies.jest;
    expect(jestVersion).toMatch(/29/);
  });
});
