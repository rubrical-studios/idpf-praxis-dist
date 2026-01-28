/**
 * Tests for Epic 4: E2E Test Infrastructure
 *
 * Stories 4.1-4.4 verify the E2E testing pipeline:
 *   4.1: Agent SDK Integration (#1075)
 *   4.2: Test Helpers (#1076)
 *   4.3: Process Separation (#1077)
 *   4.4: Real E2E Test (#1078)
 *
 * These are framework-level deployment tests that verify E2E infrastructure
 * files exist, have correct structure, and export the right functions.
 * The actual E2E tests (Agent SDK → Claude) run in the deployed test project.
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');
const TEST_AUTOMATION = path.join(FRAMEWORK_ROOT, 'Construction', 'Test-Automation');
const COMPREHENSIVE = path.join(TEST_AUTOMATION, 'Comprehensive');

// ============================================================
// Story 4.1: Agent SDK Integration (#1075)
// ============================================================

describe('Story 4.1: Agent SDK Integration', () => {
  const testDeployment = require('../lib/test-deployment');
  const helpersFile = path.join(COMPREHENSIVE, 'helpers.js');

  test('test project package.json includes @anthropic-ai/claude-agent-sdk', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    expect(pkg.devDependencies['@anthropic-ai/claude-agent-sdk']).toBeDefined();
  });

  test('SDK version is pinned (not wildcard)', () => {
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    const sdkVersion = pkg.devDependencies['@anthropic-ai/claude-agent-sdk'];
    expect(sdkVersion).toMatch(/^\^?\d+\.\d+\.\d+$/);
  });

  test('helpers.js exists in Comprehensive/', () => {
    expect(fs.existsSync(helpersFile)).toBe(true);
  });

  test('helpers.js imports @anthropic-ai/claude-agent-sdk', () => {
    const content = fs.readFileSync(helpersFile, 'utf8');
    expect(content).toContain('@anthropic-ai/claude-agent-sdk');
  });

  test('helpers.js uses query() from SDK', () => {
    const content = fs.readFileSync(helpersFile, 'utf8');
    expect(content).toContain('query(');
  });

  test('SDK uses existing claude login session (no API key requirement)', () => {
    const content = fs.readFileSync(helpersFile, 'utf8');
    expect(content).not.toMatch(/ANTHROPIC_API_KEY/);
  });

  test('clear error message if not logged in mentions "claude login"', () => {
    const content = fs.readFileSync(helpersFile, 'utf8');
    expect(content).toContain('claude login');
  });
});

// ============================================================
// Story 4.2: Test Helpers (#1076)
// ============================================================

describe('Story 4.2: Test Helpers', () => {
  const helpersFile = path.join(COMPREHENSIVE, 'helpers.js');

  describe('content inspection', () => {
    test('helpers.js exports runClaudeCode', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toMatch(/exports\.\s*runClaudeCode|module\.exports\s*=\s*\{[^}]*runClaudeCode/s);
    });

    test('helpers.js exports generateFixture', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toMatch(/exports\.\s*generateFixture|module\.exports\s*=\s*\{[^}]*generateFixture/s);
    });

    test('helpers.js exports cleanup', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toMatch(/exports\.\s*cleanup|module\.exports\s*=\s*\{[^}]*cleanup/s);
    });

    test('runClaudeCode accepts prompt and options parameters', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toMatch(/runClaudeCode\s*\(\s*prompt/);
    });

    test('generateFixture uses mkdtemp for unique directory names', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toContain('mkdtemp');
    });

    test('generateFixture supports minimal template', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toContain('minimal');
    });

    test('generateFixture supports with-charter template', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toContain('with-charter');
    });

    test('cleanup uses rmSync for directory removal', () => {
      const content = fs.readFileSync(helpersFile, 'utf8');
      expect(content).toContain('rmSync');
    });
  });

  describe('functional tests (filesystem helpers)', () => {
    let helpers;

    beforeAll(() => {
      helpers = require(path.join(COMPREHENSIVE, 'helpers'));
    });

    test('generateFixture creates minimal fixture with package.json', () => {
      const dir = helpers.generateFixture('minimal');
      try {
        expect(fs.existsSync(dir)).toBe(true);
        expect(fs.existsSync(path.join(dir, 'package.json'))).toBe(true);
        expect(fs.existsSync(path.join(dir, 'framework-config.json'))).toBe(true);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    test('generateFixture with-charter includes CHARTER.md', () => {
      const dir = helpers.generateFixture('with-charter');
      try {
        expect(fs.existsSync(path.join(dir, 'CHARTER.md'))).toBe(true);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    test('generateFixture returns temp directory path', () => {
      const dir = helpers.generateFixture('minimal');
      try {
        expect(typeof dir).toBe('string');
        expect(fs.existsSync(dir)).toBe(true);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    test('cleanup removes directory on success', () => {
      const dir = helpers.generateFixture('minimal');
      helpers.cleanup(dir, true);
      expect(fs.existsSync(dir)).toBe(false);
    });

    test('cleanup preserves directory on failure', () => {
      const dir = helpers.generateFixture('minimal');
      try {
        helpers.cleanup(dir, false);
        expect(fs.existsSync(dir)).toBe(true);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    test('concurrent fixture generation produces unique directories', () => {
      const dir1 = helpers.generateFixture('minimal');
      const dir2 = helpers.generateFixture('minimal');
      try {
        expect(dir1).not.toBe(dir2);
        expect(fs.existsSync(dir1)).toBe(true);
        expect(fs.existsSync(dir2)).toBe(true);
      } finally {
        fs.rmSync(dir1, { recursive: true, force: true });
        fs.rmSync(dir2, { recursive: true, force: true });
      }
    });
  });
});

// ============================================================
// Story 4.3: Process Separation (#1077)
// ============================================================

describe('Story 4.3: Process Separation', () => {
  test('/run-fw-tests command documents Bash tool usage', () => {
    const cmdFile = path.join(TEST_AUTOMATION, 'commands', 'run-fw-tests.md');
    const content = fs.readFileSync(cmdFile, 'utf8');
    expect(content).toMatch(/[Bb]ash/);
  });

  test('npm scripts spawn Jest as separate process', () => {
    const testDeployment = require('../lib/test-deployment');
    const pkg = testDeployment.generateTestPackageJson(FRAMEWORK_ROOT);
    // npm run invokes Jest in a child process
    expect(pkg.scripts['test:framework']).toContain('jest');
    expect(pkg.scripts['test:framework:e2e']).toContain('jest');
  });

  test('jest.config.js supports integration test patterns for E2E', () => {
    const jestConfig = path.join(TEST_AUTOMATION, 'jest.config.js');
    const content = fs.readFileSync(jestConfig, 'utf8');
    expect(content).toContain('integration');
  });

  test('E2E test timeout set to 60s for Agent SDK invocations', () => {
    const jestConfig = path.join(TEST_AUTOMATION, 'jest.config.js');
    const content = fs.readFileSync(jestConfig, 'utf8');
    expect(content).toContain('60000');
  });

  test('Agent SDK invoked from Jest process (not parent Claude session)', () => {
    const helpersFile = path.join(COMPREHENSIVE, 'helpers.js');
    const content = fs.readFileSync(helpersFile, 'utf8');
    // SDK import + query call = runs in the Jest process (separate from parent)
    expect(content).toContain('@anthropic-ai/claude-agent-sdk');
    expect(content).toContain('query(');
  });
});

// ============================================================
// Story 4.4: Real E2E Test (#1078)
// ============================================================

describe('Story 4.4: Real E2E Test', () => {
  const fixturesDir = path.join(COMPREHENSIVE, 'fixtures', 'templates');
  const charterFixture = path.join(fixturesDir, 'CHARTER.md');
  const e2eTestDir = path.join(COMPREHENSIVE, 'integration', 'release');

  test('CHARTER.md fixture exists', () => {
    expect(fs.existsSync(charterFixture)).toBe(true);
  });

  test('CHARTER.md is a complete charter (no template placeholders)', () => {
    const content = fs.readFileSync(charterFixture, 'utf8');
    expect(content).not.toMatch(/\{[a-z][a-z0-9-]*\}/);
  });

  test('CHARTER.md contains expected charter structure', () => {
    const content = fs.readFileSync(charterFixture, 'utf8');
    expect(content).toContain('# Project Charter');
    expect(content).toMatch(/[Mm]ission/);
  });

  test('E2E test file exists in integration/release/', () => {
    const files = fs.readdirSync(e2eTestDir).filter(f =>
      f.endsWith('.test.js') || f.endsWith('.e2e.test.js')
    );
    expect(files.length).toBeGreaterThan(0);
  });

  test('E2E test uses runClaudeCode helper', () => {
    const files = fs.readdirSync(e2eTestDir).filter(f => f.endsWith('.test.js'));
    const content = files.map(f =>
      fs.readFileSync(path.join(e2eTestDir, f), 'utf8')
    ).join('\n');
    expect(content).toContain('runClaudeCode');
  });

  test('E2E test invokes /charter validate', () => {
    const files = fs.readdirSync(e2eTestDir).filter(f => f.endsWith('.test.js'));
    const content = files.map(f =>
      fs.readFileSync(path.join(e2eTestDir, f), 'utf8')
    ).join('\n');
    expect(content).toMatch(/charter.*validate|\/charter validate/i);
  });

  test('E2E test verifies response content', () => {
    const files = fs.readdirSync(e2eTestDir).filter(f => f.endsWith('.test.js'));
    const content = files.map(f =>
      fs.readFileSync(path.join(e2eTestDir, f), 'utf8')
    ).join('\n');
    expect(content).toContain('expect(');
  });

  test('E2E test handles errors as Jest assertion failures', () => {
    const files = fs.readdirSync(e2eTestDir).filter(f => f.endsWith('.test.js'));
    const content = files.map(f =>
      fs.readFileSync(path.join(e2eTestDir, f), 'utf8')
    ).join('\n');
    expect(content).toMatch(/error|fail/i);
  });

  test('manifest.json includes E2E test entry', () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(COMPREHENSIVE, 'manifest.json'), 'utf8')
    );
    const hasE2eTest = manifest.tests.some(t =>
      t.type === 'integration-release' || t.type === 'integration-capabilities'
    );
    expect(hasE2eTest).toBe(true);
  });

  test('CHARTER.md fixture deployed to test project', () => {
    const testDeployment = require('../lib/test-deployment');
    let tmpDir;
    try {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-e2e-'));
      const targetDir = path.join(tmpDir, 'test-project');
      testDeployment.createTestProject(targetDir, FRAMEWORK_ROOT);
      // CHARTER.md should be deployed to test project root
      expect(fs.existsSync(path.join(targetDir, 'CHARTER.md'))).toBe(true);
    } finally {
      if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
