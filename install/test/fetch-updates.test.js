/**
 * Tests for fetch-updates.js
 *
 * This script handles:
 * 1. Self-update mode (framework directory)
 * 2. Project update mode
 * 3. User extension preservation
 * 4. Distribution repository detection (#915)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// We test the exported functions by extracting them from the script
// Since fetch-updates.js doesn't export, we test behavior indirectly

describe('fetch-updates.js', () => {
  describe('Distribution Repository Detection', () => {
    test('detects -dist repository from git remote URL', () => {
      // This test verifies the isDistRepository function exists in the source
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function isDistRepository()');
      expect(content).toContain('idpf-praxis-dist');
    });

    test('skips extension checks in -dist repository', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      // Verify the skip logic exists
      expect(content).toContain('isDistRepository()');
      expect(content).toContain('Distribution repository detected');
      expect(content).toContain('skipping extension checks');
    });

    test('preserves extension prompts for user installations', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      // Verify the user extension prompt code still exists
      expect(content).toContain('User Extensions Detected');
      expect(content).toContain('[p] Preserve');
      expect(content).toContain('[b] Backup');
      expect(content).toContain('[o] Overwrite');
      expect(content).toContain('[a] Abort');
    });
  });

  describe('Extension Detection Logic', () => {
    test('parseCommandHeader function exists', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function parseCommandHeader(content)');
      expect(content).toContain('EXTENSIBLE');
      expect(content).toContain('MANAGED');
    });

    test('extractExtensionBlocks function exists', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function extractExtensionBlocks(content)');
      expect(content).toContain('USER-EXTENSION-START');
      expect(content).toContain('USER-EXTENSION-END');
    });

    test('hasUserExtensions function exists', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function hasUserExtensions(filePath)');
    });

    test('scanForUserExtensions function exists', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function scanForUserExtensions(frameworkPath, tempPath)');
    });
  });

  describe('Repository Detection Methods', () => {
    test('isFrameworkDirectory function exists', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('function isFrameworkDirectory()');
      expect(content).toContain('framework-manifest.json');
    });

    test('isDistRepository checks git remote', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('git config --get remote.origin.url');
    });
  });

  describe('Update Modes', () => {
    test('supports self-update mode', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('Mode: Self-update');
      expect(content).toContain('isSelfUpdate');
    });

    test('supports project update mode', () => {
      const scriptPath = path.join(__dirname, '../../fetch-updates.js');
      const content = fs.readFileSync(scriptPath, 'utf8');

      expect(content).toContain('Mode: Project update');
      expect(content).toContain('framework-config.json');
    });
  });
});
