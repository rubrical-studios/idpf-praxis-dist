/**
 * Tests for metadata file deployment
 *
 * Verifies that metadata files (skill-registry.json, extension-recipes.json)
 * are properly deployed to user projects.
 */

const fs = require('fs');
const path = require('path');
const { INSTALLED_FILES_MANIFEST } = require('../lib/constants');

describe('Metadata Deployment', () => {
  describe('INSTALLED_FILES_MANIFEST configuration', () => {
    test('includes metadata section', () => {
      expect(INSTALLED_FILES_MANIFEST.metadata).toBeDefined();
    });

    test('metadata section has correct directory', () => {
      expect(INSTALLED_FILES_MANIFEST.metadata.dir).toBe('.claude/metadata');
    });

    test('metadata files includes skill-registry.json', () => {
      expect(INSTALLED_FILES_MANIFEST.metadata.files).toContain('skill-registry.json');
    });

    test('metadata files includes extension-recipes.json', () => {
      expect(INSTALLED_FILES_MANIFEST.metadata.files).toContain('extension-recipes.json');
    });
  });

  describe('Source metadata files verification', () => {
    const metadataDir = path.join(__dirname, '..', '..', '.claude', 'metadata');

    // Only run these tests if metadata directory exists (in development)
    const metadataDirExists = fs.existsSync(metadataDir);

    (metadataDirExists ? test : test.skip)('skill-registry.json exists', () => {
      const filePath = path.join(metadataDir, 'skill-registry.json');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    (metadataDirExists ? test : test.skip)('skill-registry.json is valid JSON', () => {
      const filePath = path.join(metadataDir, 'skill-registry.json');
      const content = fs.readFileSync(filePath, 'utf8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    (metadataDirExists ? test : test.skip)('extension-recipes.json exists', () => {
      const filePath = path.join(metadataDir, 'extension-recipes.json');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    (metadataDirExists ? test : test.skip)('extension-recipes.json is valid JSON', () => {
      const filePath = path.join(metadataDir, 'extension-recipes.json');
      const content = fs.readFileSync(filePath, 'utf8');
      expect(() => JSON.parse(content)).not.toThrow();
    });

    (metadataDirExists ? test : test.skip)('skill-registry.json has expected structure', () => {
      const filePath = path.join(metadataDir, 'skill-registry.json');
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Should have a skills object or array
      expect(content).toBeDefined();
      expect(typeof content === 'object').toBe(true);
    });

    (metadataDirExists ? test : test.skip)('extension-recipes.json has expected structure', () => {
      const filePath = path.join(metadataDir, 'extension-recipes.json');
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Should have categories (object, not array)
      expect(content.categories).toBeDefined();
      expect(typeof content.categories === 'object').toBe(true);
      expect(content.version).toBeDefined();
    });
  });

  describe('deployMetadataFiles function', () => {
    const { deployMetadataFiles } = require('../lib/deployment');

    test('function is exported', () => {
      expect(typeof deployMetadataFiles).toBe('function');
    });

    test('returns object with deployed and skipped arrays', () => {
      // Test with non-existent paths to verify return structure
      const result = deployMetadataFiles('/nonexistent/project', '/nonexistent/framework');
      expect(result).toHaveProperty('deployed');
      expect(result).toHaveProperty('skipped');
      expect(Array.isArray(result.deployed)).toBe(true);
      expect(Array.isArray(result.skipped)).toBe(true);
    });
  });
});
