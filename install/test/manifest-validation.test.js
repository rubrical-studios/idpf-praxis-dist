/**
 * Tests for manifest validation
 *
 * Validates that framework-manifest.json stays in sync with actual directory structure.
 * This test would have caught the regression in v0.23.3 where the 'framework' category
 * was accidentally deleted from the manifest.
 *
 * @see https://github.com/rubrical-studios/idpf-praxis/issues/875
 * @see https://github.com/rubrical-studios/idpf-praxis/issues/876
 */

const fs = require('fs');
const path = require('path');

describe('Manifest Validation', () => {
  const templatesDir = path.join(__dirname, '..', '..', 'Templates');
  const manifestPath = path.join(templatesDir, 'framework-manifest.json');
  const scriptsDir = path.join(templatesDir, 'scripts');

  // Only run these tests if Templates directory exists (in development)
  const templatesDirExists = fs.existsSync(templatesDir);
  const manifestExists = fs.existsSync(manifestPath);

  let manifest;

  beforeAll(() => {
    if (manifestExists) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
  });

  describe('Manifest structure', () => {
    (manifestExists ? test : test.skip)('manifest file exists', () => {
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    (manifestExists ? test : test.skip)('manifest has scripts section', () => {
      expect(manifest.scripts).toBeDefined();
      expect(typeof manifest.scripts).toBe('object');
    });

    (manifestExists ? test : test.skip)('manifest has version field', () => {
      expect(manifest.version).toBeDefined();
    });
  });

  describe('Script categories match directories', () => {
    (templatesDirExists && manifestExists ? test : test.skip)(
      'every subdirectory in Templates/scripts/ has a manifest category',
      () => {
        const scriptSubdirs = fs.readdirSync(scriptsDir, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .map(d => d.name);

        const missingCategories = [];

        for (const dir of scriptSubdirs) {
          // Skip 'shared/lib' - it's handled as a separate category
          if (dir === 'lib') continue;

          if (!manifest.scripts[dir]) {
            missingCategories.push(dir);
          }
        }

        if (missingCategories.length > 0) {
          throw new Error(
            `Missing manifest categories for directories: ${missingCategories.join(', ')}\n` +
            `Add these to Templates/framework-manifest.json scripts section.`
          );
        }

        expect(missingCategories).toHaveLength(0);
      }
    );

    (templatesDirExists && manifestExists ? test : test.skip)(
      'framework category exists (regression test for #875)',
      () => {
        expect(manifest.scripts.framework).toBeDefined();
        expect(manifest.scripts.framework.source).toBe('scripts/framework/');
        expect(manifest.scripts.framework.target).toBe('.claude/scripts/framework/');
      }
    );
  });

  describe('Manifest files exist on disk', () => {
    (templatesDirExists && manifestExists ? test : test.skip)(
      'all files listed in manifest exist in Templates/',
      () => {
        const missingFiles = [];

        for (const [category, config] of Object.entries(manifest.scripts)) {
          if (!config.files || !config.source) continue;

          for (const file of config.files) {
            const filePath = path.join(templatesDir, config.source, file);
            if (!fs.existsSync(filePath)) {
              missingFiles.push(`${category}: ${config.source}${file}`);
            }
          }
        }

        if (missingFiles.length > 0) {
          throw new Error(
            `Files listed in manifest but missing from disk:\n  ${missingFiles.join('\n  ')}`
          );
        }

        expect(missingFiles).toHaveLength(0);
      }
    );
  });

  describe('No unlisted files in script directories', () => {
    (templatesDirExists && manifestExists ? test : test.skip)(
      'all .js files in script directories are listed in manifest',
      () => {
        const unlistedFiles = [];

        for (const [category, config] of Object.entries(manifest.scripts)) {
          if (!config.files || !config.source) continue;

          const dirPath = path.join(templatesDir, config.source);
          if (!fs.existsSync(dirPath)) continue;

          const actualFiles = fs.readdirSync(dirPath)
            .filter(f => f.endsWith('.js'));

          for (const file of actualFiles) {
            if (!config.files.includes(file)) {
              unlistedFiles.push(`${category}: ${config.source}${file}`);
            }
          }
        }

        if (unlistedFiles.length > 0) {
          console.warn(
            `Warning: Files exist but not listed in manifest:\n  ${unlistedFiles.join('\n  ')}\n` +
            `Consider adding these to framework-manifest.json or removing them.`
          );
        }

        // This is a warning, not a failure - some files may be intentionally unlisted
        // But we still want visibility into drift
        expect(unlistedFiles).toHaveLength(0);
      }
    );
  });

  describe('Script category configuration', () => {
    (manifestExists ? test : test.skip)(
      'each script category has required fields',
      () => {
        const requiredFields = ['source', 'target', 'files'];

        for (const [category, config] of Object.entries(manifest.scripts)) {
          for (const field of requiredFields) {
            expect(config[field]).toBeDefined();
          }
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'source paths end with trailing slash',
      () => {
        for (const [category, config] of Object.entries(manifest.scripts)) {
          expect(config.source).toMatch(/\/$/);
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'target paths end with trailing slash',
      () => {
        for (const [category, config] of Object.entries(manifest.scripts)) {
          expect(config.target).toMatch(/\/$/);
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'files arrays are non-empty',
      () => {
        for (const [category, config] of Object.entries(manifest.scripts)) {
          expect(config.files.length).toBeGreaterThan(0);
        }
      }
    );
  });

  describe('Framework scripts (prevent #875 regression)', () => {
    const expectedFrameworkScripts = [
      'analyze-commits.js',
      'recommend-version.js',
      'update-release-notes.js',
      'wait-for-ci.js'
    ];

    (manifestExists ? test : test.skip)(
      'framework category includes all expected scripts',
      () => {
        const frameworkFiles = manifest.scripts.framework?.files || [];

        for (const script of expectedFrameworkScripts) {
          expect(frameworkFiles).toContain(script);
        }
      }
    );

    (templatesDirExists ? test : test.skip).each(expectedFrameworkScripts)(
      'framework script %s exists on disk',
      (script) => {
        const scriptPath = path.join(scriptsDir, 'framework', script);
        expect(fs.existsSync(scriptPath)).toBe(true);
      }
    );
  });
});
