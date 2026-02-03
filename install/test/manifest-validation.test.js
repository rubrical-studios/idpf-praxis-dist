/**
 * Tests for manifest validation
 *
 * Validates that framework-manifest.json stays in sync with actual directory structure.
 * This test would have caught the regression in v0.23.3 where the 'framework' category
 * was accidentally deleted from the manifest.
 *
 * Note: As of v0.26.4, the manifest is consolidated at the root level.
 * Scripts are under deploymentFiles.scripts with full paths (e.g., "Templates/scripts/shared/")
 *
 * @see https://github.com/rubrical-studios/idpf-praxis/issues/875
 * @see https://github.com/rubrical-studios/idpf-praxis/issues/876
 * @see https://github.com/rubrical-studios/idpf-praxis/issues/904
 */

const fs = require('fs');
const path = require('path');

describe('Manifest Validation', () => {
  const rootDir = path.join(__dirname, '..', '..');
  const manifestPath = path.join(rootDir, 'framework-manifest.json');
  const templatesDir = path.join(rootDir, 'Templates');
  const scriptsDir = path.join(templatesDir, 'scripts');

  // Only run these tests if Templates directory exists (in development)
  const templatesDirExists = fs.existsSync(templatesDir);
  const manifestExists = fs.existsSync(manifestPath);

  let manifest;
  let scripts;

  beforeAll(() => {
    if (manifestExists) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      scripts = manifest.deploymentFiles?.scripts || {};
    }
  });

  describe('Manifest structure', () => {
    (manifestExists ? test : test.skip)('manifest file exists', () => {
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    (manifestExists ? test : test.skip)('manifest has deploymentFiles.scripts section', () => {
      expect(manifest.deploymentFiles).toBeDefined();
      expect(manifest.deploymentFiles.scripts).toBeDefined();
      expect(typeof manifest.deploymentFiles.scripts).toBe('object');
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

          if (!scripts[dir]) {
            missingCategories.push(dir);
          }
        }

        if (missingCategories.length > 0) {
          throw new Error(
            `Missing manifest categories for directories: ${missingCategories.join(', ')}\n` +
            `Add these to framework-manifest.json deploymentFiles.scripts section.`
          );
        }

        expect(missingCategories).toHaveLength(0);
      }
    );

    (templatesDirExists && manifestExists ? test : test.skip)(
      'shared category exists and has consolidated scripts (regression test for #875, updated for #1008)',
      () => {
        expect(scripts.shared).toBeDefined();
        expect(scripts.shared.source).toBe('Templates/scripts/shared/');
        expect(scripts.shared.target).toBe('.claude/scripts/shared/');
      }
    );
  });

  describe('Manifest files exist on disk', () => {
    (templatesDirExists && manifestExists ? test : test.skip)(
      'all files listed in manifest exist on disk',
      () => {
        const missingFiles = [];

        for (const [category, config] of Object.entries(scripts)) {
          if (!config.files || !config.source) continue;

          for (const file of config.files) {
            // Source paths are relative to root (e.g., "Templates/scripts/framework/")
            const filePath = path.join(rootDir, config.source, file);
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

        for (const [category, config] of Object.entries(scripts)) {
          if (!config.files || !config.source) continue;

          // Source paths are relative to root
          const dirPath = path.join(rootDir, config.source);
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

        for (const [category, config] of Object.entries(scripts)) {
          for (const field of requiredFields) {
            expect(config[field]).toBeDefined();
          }
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'source paths end with trailing slash',
      () => {
        for (const [category, config] of Object.entries(scripts)) {
          expect(config.source).toMatch(/\/$/);
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'target paths end with trailing slash',
      () => {
        for (const [category, config] of Object.entries(scripts)) {
          expect(config.target).toMatch(/\/$/);
        }
      }
    );

    (manifestExists ? test : test.skip)(
      'files arrays are non-empty',
      () => {
        for (const [category, config] of Object.entries(scripts)) {
          expect(config.files.length).toBeGreaterThan(0);
        }
      }
    );
  });

  describe('Core commands (prevent #1017 regression)', () => {
    const commandsDir = path.join(rootDir, '.claude', 'commands');
    const commandsDirExists = fs.existsSync(commandsDir);

    const expectedCoreCommands = [
      'change-domain-expert.md',
      'playwright-check.md'
    ];

    (manifestExists ? test : test.skip)(
      'manifest lists core commands',
      () => {
        const coreCommands = manifest.deploymentFiles?.commands?.core || [];
        expect(coreCommands.length).toBeGreaterThan(0);
        for (const cmd of expectedCoreCommands) {
          expect(coreCommands).toContain(cmd);
        }
      }
    );

    (commandsDirExists ? test : test.skip).each(expectedCoreCommands)(
      'core command %s exists in source',
      (cmd) => {
        const cmdPath = path.join(commandsDir, cmd);
        expect(fs.existsSync(cmdPath)).toBe(true);
      }
    );
  });

  describe('@framework-script tag (prevent #1019 regression)', () => {
    // All framework JS files must have @framework-script 0.35.3 tag
    const jsDirectories = [
      { path: 'Templates/scripts/shared', description: 'Templates shared scripts' },
      { path: 'Templates/scripts/shared/lib', description: 'Templates shared lib' },
      { path: 'Templates/hooks', description: 'Templates hooks' },
      { path: '.claude/scripts/shared', description: 'Self-hosted shared scripts' },
      { path: '.claude/scripts/shared/lib', description: 'Self-hosted shared lib' },
      { path: '.claude/hooks', description: 'Self-hosted hooks' },
      { path: 'install/lib', description: 'Installer lib' },
    ];

    const rootJsFiles = [
      'install.js',
      'install/index.js',
      'fetch-updates.js',
      'audit.js',
      'Templates/fetch-updates.js',
    ];

    test.each(jsDirectories)(
      'all .js files in $description have @framework-script tag',
      ({ path: dirPath }) => {
        const fullPath = path.join(rootDir, dirPath);
        if (!fs.existsSync(fullPath)) return; // Skip if directory doesn't exist

        const jsFiles = fs.readdirSync(fullPath).filter(f => f.endsWith('.js'));
        const missingTag = [];

        for (const file of jsFiles) {
          const content = fs.readFileSync(path.join(fullPath, file), 'utf8');
          if (!content.includes('@framework-script')) {
            missingTag.push(`${dirPath}/${file}`);
          }
        }

        if (missingTag.length > 0) {
          throw new Error(
            `Files missing @framework-script 0.35.3 tag:\n  ${missingTag.join('\n  ')}\n` +
            `Add: @framework-script 0.35.3 as first line in JSDoc block.`
          );
        }
      }
    );

    test.each(rootJsFiles)(
      'root file %s has @framework-script tag',
      (file) => {
        const filePath = path.join(rootDir, file);
        if (!fs.existsSync(filePath)) return; // Skip if file doesn't exist

        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).toContain('@framework-script');
      }
    );
  });

  describe('Shared scripts (prevent #875 regression, updated for #1008)', () => {
    // These scripts were previously in framework/ but moved to shared/ in #1008
    const expectedSharedScripts = [
      'analyze-commits.js',
      'recommend-version.js',
      'update-release-notes.js',
      'wait-for-ci.js'
    ];

    (manifestExists ? test : test.skip)(
      'shared category includes all expected scripts',
      () => {
        const sharedFiles = scripts.shared?.files || [];

        for (const script of expectedSharedScripts) {
          expect(sharedFiles).toContain(script);
        }
      }
    );

    (templatesDirExists ? test : test.skip).each(expectedSharedScripts)(
      'shared script %s exists on disk',
      (script) => {
        const scriptPath = path.join(scriptsDir, 'shared', script);
        expect(fs.existsSync(scriptPath)).toBe(true);
      }
    );
  });
});
