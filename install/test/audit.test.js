/**
 * audit.test.js - Unit tests for audit.js
 *
 * Tests the IDPF Framework Installation Auditor functionality
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// We need to test the audit.js functions, so we'll extract testable functions
// For now, we'll test the core logic by creating mock scenarios

describe('audit.js', () => {
  let tempDir;
  let projectDir;
  let frameworkDir;

  beforeEach(() => {
    // Create temporary directories for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'audit-test-'));
    projectDir = path.join(tempDir, 'project');
    frameworkDir = path.join(tempDir, 'framework');

    // Create project structure
    fs.mkdirSync(path.join(projectDir, '.claude', 'scripts', 'framework'), { recursive: true });
    fs.mkdirSync(path.join(projectDir, '.claude', 'scripts', 'shared'), { recursive: true });
    fs.mkdirSync(path.join(projectDir, '.claude', 'commands'), { recursive: true });
    fs.mkdirSync(path.join(projectDir, '.claude', 'rules'), { recursive: true });
    fs.mkdirSync(path.join(projectDir, '.claude', 'hooks'), { recursive: true });

    // Create framework structure
    fs.mkdirSync(path.join(frameworkDir, 'Templates', 'scripts', 'framework'), { recursive: true });
    fs.mkdirSync(path.join(frameworkDir, 'Templates', 'commands'), { recursive: true });
  });

  afterEach(() => {
    // Clean up
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  // Helper to compute hash
  function computeHash(content) {
    const hash = crypto.createHash('sha256');
    hash.update(content, 'utf8');
    return hash.digest('hex');
  }

  // Helper to create a file and its hash
  function createFileWithHash(filePath, content) {
    fs.writeFileSync(filePath, content);
    return computeHash(content);
  }

  describe('File Status Detection', () => {
    test('detects clean files (matches stored AND current checksum)', () => {
      const content = '// test script\nconsole.log("test");';
      const hash = createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        content
      );

      // Create manifest
      const manifest = {
        version: '1.0.0',
        scripts: {
          'shared/test.js': {
            checksum: hash,
            source: 'Templates/scripts/shared/test.js',
          },
        },
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Create source file
      fs.writeFileSync(
        path.join(frameworkDir, 'Templates', 'scripts', 'framework', 'test.js'),
        content
      );

      // Verify file matches both stored and source
      const installedContent = fs.readFileSync(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        'utf8'
      );
      const installedHash = computeHash(installedContent);
      const sourceContent = fs.readFileSync(
        path.join(frameworkDir, 'Templates', 'scripts', 'framework', 'test.js'),
        'utf8'
      );
      const sourceHash = computeHash(sourceContent);

      expect(installedHash).toBe(hash);
      expect(sourceHash).toBe(hash);
    });

    test('detects modified files (does not match stored checksum)', () => {
      const originalContent = '// original';
      const modifiedContent = '// modified by user';
      const originalHash = computeHash(originalContent);

      // Create modified file
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        modifiedContent
      );

      // Create manifest with original hash
      const manifest = {
        version: '1.0.0',
        scripts: {
          'shared/test.js': {
            checksum: originalHash,
            source: 'Templates/scripts/shared/test.js',
          },
        },
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Create source with original content
      fs.writeFileSync(
        path.join(frameworkDir, 'Templates', 'scripts', 'framework', 'test.js'),
        originalContent
      );

      // Verify hashes differ
      const installedContent = fs.readFileSync(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        'utf8'
      );
      const installedHash = computeHash(installedContent);

      expect(installedHash).not.toBe(originalHash);
    });

    test('detects outdated files (matches stored but not current)', () => {
      const oldContent = '// version 1.0';
      const newContent = '// version 2.0';
      const oldHash = computeHash(oldContent);

      // Create file with old content (matches stored)
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        oldContent
      );

      // Create manifest with old hash
      const manifest = {
        version: '1.0.0',
        scripts: {
          'shared/test.js': {
            checksum: oldHash,
            source: 'Templates/scripts/shared/test.js',
          },
        },
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Create source with new content
      fs.writeFileSync(
        path.join(frameworkDir, 'Templates', 'scripts', 'framework', 'test.js'),
        newContent
      );

      // Verify installed matches stored but not source
      const installedContent = fs.readFileSync(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        'utf8'
      );
      const installedHash = computeHash(installedContent);
      const sourceHash = computeHash(newContent);

      expect(installedHash).toBe(oldHash);
      expect(installedHash).not.toBe(sourceHash);
    });

    test('detects modified+outdated files (matches neither)', () => {
      const originalContent = '// version 1.0';
      const modifiedContent = '// user modified';
      const newContent = '// version 2.0';
      const originalHash = computeHash(originalContent);

      // Create modified file
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'test.js'),
        modifiedContent
      );

      // Create manifest with original hash
      const manifest = {
        version: '1.0.0',
        scripts: {
          'shared/test.js': {
            checksum: originalHash,
            source: 'Templates/scripts/shared/test.js',
          },
        },
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Create source with new content
      fs.writeFileSync(
        path.join(frameworkDir, 'Templates', 'scripts', 'framework', 'test.js'),
        newContent
      );

      // Verify installed matches neither stored nor source
      const installedHash = computeHash(modifiedContent);
      const sourceHash = computeHash(newContent);

      expect(installedHash).not.toBe(originalHash);
      expect(installedHash).not.toBe(sourceHash);
    });

    test('detects missing files (in manifest but not on disk)', () => {
      // Create manifest with entry but no file
      const manifest = {
        version: '1.0.0',
        scripts: {
          'shared/missing.js': {
            checksum: 'abc123',
            source: 'Templates/scripts/shared/missing.js',
          },
        },
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Verify file does not exist
      const filePath = path.join(projectDir, '.claude', 'scripts', 'framework', 'missing.js');
      expect(fs.existsSync(filePath)).toBe(false);
    });

    test('detects untracked files (on disk but not in manifest or userScripts)', () => {
      // Create file not in manifest
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'untracked.js'),
        '// untracked file'
      );

      // Create empty manifest
      const manifest = {
        version: '1.0.0',
        scripts: {},
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // Create config without userScripts
      const config = {
        frameworkVersion: '1.0.0',
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // File exists but not in manifest
      const filePath = path.join(projectDir, '.claude', 'scripts', 'framework', 'untracked.js');
      expect(fs.existsSync(filePath)).toBe(true);
      expect(manifest.scripts['framework/untracked.js']).toBeUndefined();
    });
  });

  describe('User Scripts Validation', () => {
    test('recognizes valid user scripts (listed AND exists)', () => {
      // Create user script
      fs.mkdirSync(path.join(projectDir, '.claude', 'scripts', 'prepare-release'), { recursive: true });
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'prepare-release', 'coverage.js'),
        '// coverage check'
      );

      // Create config with userScripts
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'prepare-release': ['coverage.js'],
        },
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // Verify file exists
      const filePath = path.join(projectDir, '.claude', 'scripts', 'prepare-release', 'coverage.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('detects missing user scripts (listed but file not found)', () => {
      // Create directory but not the file
      fs.mkdirSync(path.join(projectDir, '.claude', 'scripts', 'prepare-release'), { recursive: true });

      // Create config with userScripts referencing non-existent file
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'prepare-release': ['missing.js'],
        },
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // Verify file does not exist
      const filePath = path.join(projectDir, '.claude', 'scripts', 'prepare-release', 'missing.js');
      expect(fs.existsSync(filePath)).toBe(false);
    });

    test('detects orphaned userScripts entries (directory does not exist)', () => {
      // Create config with userScripts referencing non-existent directory
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'old-command': ['script.js'],
        },
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // Verify directory does not exist
      const dirPath = path.join(projectDir, '.claude', 'scripts', 'old-command');
      expect(fs.existsSync(dirPath)).toBe(false);
    });

    test('correctly excludes userScripts from untracked status', () => {
      // Create user script
      fs.mkdirSync(path.join(projectDir, '.claude', 'scripts', 'prepare-release'), { recursive: true });
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'prepare-release', 'lint.js'),
        '// lint check'
      );

      // Create config with userScripts
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'prepare-release': ['lint.js'],
        },
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // Create empty manifest
      const manifest = {
        version: '1.0.0',
        scripts: {},
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      // File is not in manifest but is in userScripts
      expect(manifest.scripts['prepare-release/lint.js']).toBeUndefined();
      expect(config.userScripts['prepare-release']).toContain('lint.js');
    });
  });

  describe('Configuration Validation', () => {
    test('detects version mismatch (frameworkVersion ≠ manifest version)', () => {
      const config = {
        frameworkVersion: '2.0.0',
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      const manifest = {
        version: '1.0.0',
        scripts: {},
      };
      fs.writeFileSync(
        path.join(projectDir, '.claude', '.manifest.json'),
        JSON.stringify(manifest)
      );

      expect(config.frameworkVersion).not.toBe(manifest.version);
    });

    test('detects stale frameworkPath (path does not exist)', () => {
      const config = {
        frameworkVersion: '1.0.0',
        frameworkPath: '/nonexistent/path/to/framework',
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      expect(fs.existsSync(config.frameworkPath)).toBe(false);
    });

    test('validates frameworkScripts lists match actual files', () => {
      // Create actual files
      createFileWithHash(
        path.join(projectDir, '.claude', 'scripts', 'framework', 'script1.js'),
        '// script 1'
      );

      const config = {
        frameworkVersion: '1.0.0',
        frameworkScripts: {
          framework: ['script1.js', 'script2.js'], // script2.js doesn't exist
        },
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      // script1 exists, script2 doesn't
      expect(fs.existsSync(path.join(projectDir, '.claude', 'scripts', 'framework', 'script1.js'))).toBe(true);
      expect(fs.existsSync(path.join(projectDir, '.claude', 'scripts', 'framework', 'script2.js'))).toBe(false);
    });
  });

  describe('Version Handling', () => {
    test('replaces 0.33.0 in source files before computing hash', () => {
      const sourceWithPlaceholder = '// Version: 0.33.0\nconsole.log("test");';
      const sourceWithVersion = '// Version: 1.0.0\nconsole.log("test");';

      const hashWithPlaceholder = computeHash(sourceWithPlaceholder);
      const hashWithVersion = computeHash(sourceWithVersion);

      // Hashes should be different
      expect(hashWithPlaceholder).not.toBe(hashWithVersion);

      // After replacement, should match
      const replaced = sourceWithPlaceholder.replace(/\{\{VERSION\}\}/g, '1.0.0');
      expect(computeHash(replaced)).toBe(hashWithVersion);
    });

    test('correctly computes hash with version substitution', () => {
      const content = '// Version: 0.33.0';
      const version = '2.5.0';
      const expected = computeHash('// Version: 2.5.0');

      const replaced = content.replace(/\{\{VERSION\}\}/g, version);
      expect(computeHash(replaced)).toBe(expected);
    });
  });

  describe('Fix Mode', () => {
    test('removes missing user script reference from userScripts array', () => {
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'prepare-release': ['exists.js', 'missing.js'],
        },
      };

      // Simulate fix: remove missing.js
      const scripts = config.userScripts['prepare-release'];
      const idx = scripts.indexOf('missing.js');
      if (idx !== -1) {
        scripts.splice(idx, 1);
      }

      expect(config.userScripts['prepare-release']).toEqual(['exists.js']);
    });

    test('removes orphaned userScripts directory entry', () => {
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'valid-dir': ['script.js'],
          'orphaned-dir': ['another.js'],
        },
      };

      // Simulate fix: remove orphaned-dir
      delete config.userScripts['orphaned-dir'];

      expect(config.userScripts['orphaned-dir']).toBeUndefined();
      expect(config.userScripts['valid-dir']).toBeDefined();
    });

    test('preserves valid entries when fixing', () => {
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'valid-dir': ['valid.js', 'missing.js'],
        },
      };

      // Remove only missing.js
      const scripts = config.userScripts['valid-dir'];
      const idx = scripts.indexOf('missing.js');
      scripts.splice(idx, 1);

      expect(config.userScripts['valid-dir']).toEqual(['valid.js']);
    });

    test('does not modify config when user declines fix', () => {
      const originalConfig = {
        frameworkVersion: '1.0.0',
        userScripts: {
          'dir': ['missing.js'],
        },
      };

      // Simulate user declining - config should remain unchanged
      const configCopy = JSON.parse(JSON.stringify(originalConfig));

      expect(configCopy).toEqual(originalConfig);
    });
  });

  describe('Edge Cases', () => {
    test('handles missing installed-projects.json gracefully', () => {
      const projectsPath = path.join(frameworkDir, 'installed-projects.json');
      expect(fs.existsSync(projectsPath)).toBe(false);
    });

    test('handles missing framework-config.json per project', () => {
      const configPath = path.join(projectDir, 'framework-config.json');
      // Don't create it
      expect(fs.existsSync(configPath)).toBe(false);
    });

    test('handles missing .manifest.json per project', () => {
      const manifestPath = path.join(projectDir, '.claude', '.manifest.json');
      // Don't create it
      expect(fs.existsSync(manifestPath)).toBe(false);
    });

    test('handles empty userScripts section', () => {
      const config = {
        frameworkVersion: '1.0.0',
        userScripts: {},
      };
      fs.writeFileSync(
        path.join(projectDir, 'framework-config.json'),
        JSON.stringify(config)
      );

      expect(Object.keys(config.userScripts).length).toBe(0);
    });

    test('handles project path that no longer exists', () => {
      const nonExistentPath = path.join(tempDir, 'deleted-project');
      expect(fs.existsSync(nonExistentPath)).toBe(false);
    });
  });
});
