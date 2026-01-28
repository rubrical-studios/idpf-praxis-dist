/**
 * Tests for Story 3.3: /run-fw-tests Command
 *
 * Verifies the command spec supports all required scopes, flags, and behaviors.
 * The command is a markdown file (AI instruction spec), tested by content inspection.
 *
 * Story 3.3: /run-fw-tests Command (#1074)
 *
 * @see PRD/Test-Automation-Foundation/Test-Plan-Test-Automation-Foundation.md
 */

const fs = require('fs');
const path = require('path');

const FRAMEWORK_ROOT = path.join(__dirname, '..', '..');
const COMMAND_FILE = path.join(FRAMEWORK_ROOT, 'Construction', 'Test-Automation', 'commands', 'run-fw-tests.md');

describe('Story 3.3: /run-fw-tests Command', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(COMMAND_FILE, 'utf8');
  });

  test('command file exists', () => {
    expect(fs.existsSync(COMMAND_FILE)).toBe(true);
  });

  // Scope support
  test('default scope is unit', () => {
    expect(content).toContain('default');
    expect(content).toMatch(/unit.*default|default.*unit/i);
  });

  test('unit scope documented', () => {
    expect(content).toContain('unit');
    expect(content).toContain('test:framework');
  });

  test('e2e scope documented', () => {
    expect(content).toContain('e2e');
    expect(content).toContain('test:framework:e2e');
  });

  test('all scope documented', () => {
    expect(content).toMatch(/\ball\b/);
  });

  // Flags
  test('--verbose flag documented', () => {
    expect(content).toContain('--verbose');
  });

  test('--fail-fast flag documented', () => {
    expect(content).toContain('--fail-fast');
  });

  test('--verbose maps to Jest verbose', () => {
    expect(content).toContain('--verbose');
  });

  test('--fail-fast maps to Jest bail', () => {
    expect(content).toContain('--bail');
  });

  // Exit behavior
  test('command always exits 0', () => {
    expect(content).toMatch(/exit.*0|exits.*0/i);
  });

  test('failures reported in output, not exit code', () => {
    expect(content).toContain('output');
    expect(content).toMatch(/failure|fail/i);
  });

  // Preserved temp directory
  test('output includes temp directory path on failure', () => {
    expect(content).toMatch(/preserved|temp.*director/i);
  });

  // Edge cases
  test('no tests found for scope produces clear message', () => {
    expect(content).toMatch(/no.*test.*found|no tests/i);
  });

  test('invalid scope produces error with valid options', () => {
    expect(content).toMatch(/invalid.*scope|unknown.*scope/i);
  });
});
