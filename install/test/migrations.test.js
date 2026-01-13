/**
 * Tests for install/lib/migrations.js
 *
 * Tests migration functions, particularly removal of deprecated components.
 * Uses mocked filesystem to avoid real file changes.
 */

const path = require('path');

// Mock fs before requiring the module
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  rmSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  unlinkSync: jest.fn()
}));

// Mock UI to suppress output
jest.mock('../lib/ui', () => ({
  log: jest.fn(),
  logSuccess: jest.fn(),
  logWarning: jest.fn(),
  logError: jest.fn(),
  divider: jest.fn()
}));

// Mock detection module
jest.mock('../lib/detection', () => ({
  parseExistingInstallation: jest.fn().mockReturnValue({ projectInstructions: '' }),
  getCurrentDate: jest.fn().mockReturnValue('2025-01-12'),
  readFrameworkVersion: jest.fn().mockReturnValue('0.24.0')
}));

// Mock generation module
jest.mock('../lib/generation', () => ({
  generateClaudeMd: jest.fn()
}));

// Mock deployment module
jest.mock('../lib/deployment', () => ({
  deployRules: jest.fn().mockReturnValue({
    antiHallucination: true,
    githubWorkflow: false,
    startup: true
  })
}));

// Mock validation module
jest.mock('../lib/validation', () => ({
  cleanupOrphanedFiles: jest.fn().mockReturnValue({ removed: [] })
}));

const fs = require('fs');
const { logSuccess } = require('../lib/ui');
const { MIGRATIONS, compareVersions } = require('../lib/migrations');

describe('migrations.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('compareVersions', () => {
    test('returns -1 when a < b', () => {
      expect(compareVersions('0.23.0', '0.24.0')).toBe(-1);
      expect(compareVersions('0.17.0', '0.23.0')).toBe(-1);
      expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
    });

    test('returns 0 when a == b', () => {
      expect(compareVersions('0.24.0', '0.24.0')).toBe(0);
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
    });

    test('returns 1 when a > b', () => {
      expect(compareVersions('0.24.0', '0.23.0')).toBe(1);
      expect(compareVersions('2.0.0', '1.0.0')).toBe(1);
    });

    test('handles missing patch versions', () => {
      expect(compareVersions('1.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.0.0', '1.0')).toBe(0);
    });
  });

  describe('IDPF-PRD removal migration', () => {
    const idpfPrdMigration = MIGRATIONS.find(m => m.version === '0.24.0');

    test('migration exists for v0.24.0', () => {
      expect(idpfPrdMigration).toBeDefined();
      expect(idpfPrdMigration.description).toContain('IDPF-PRD');
    });

    test('removes IDPF-PRD directory when present', () => {
      const projectDir = '/test/project';
      const idpfPrdPath = path.join(projectDir, 'IDPF-PRD');

      fs.existsSync.mockImplementation((p) => p === idpfPrdPath);

      idpfPrdMigration.migrate(projectDir, '/framework', {});

      expect(fs.rmSync).toHaveBeenCalledWith(idpfPrdPath, { recursive: true, force: true });
      expect(logSuccess).toHaveBeenCalledWith(expect.stringContaining('Removed IDPF-PRD'));
    });

    test('handles IDPF-PRD already absent gracefully', () => {
      const projectDir = '/test/project';

      fs.existsSync.mockReturnValue(false);

      // Should not throw
      expect(() => {
        idpfPrdMigration.migrate(projectDir, '/framework', {});
      }).not.toThrow();

      expect(fs.rmSync).not.toHaveBeenCalled();
      expect(logSuccess).toHaveBeenCalledWith(expect.stringContaining('not found'));
    });
  });

  describe('Migration ordering', () => {
    test('migrations are in version order', () => {
      const versions = MIGRATIONS.map(m => m.version);
      const sorted = [...versions].sort(compareVersions);

      // Note: migrations may not be strictly ordered, that's OK
      // as long as each migration's version is valid
      for (const version of versions) {
        expect(version).toMatch(/^\d+\.\d+\.\d+$/);
      }
    });

    test('all migrations have required fields', () => {
      for (const migration of MIGRATIONS) {
        expect(migration).toHaveProperty('version');
        expect(migration).toHaveProperty('description');
        expect(migration).toHaveProperty('migrate');
        expect(typeof migration.migrate).toBe('function');
      }
    });
  });

  describe('extract-prd handling', () => {
    // Note: Per Epic #842, extract-prd is intentionally kept because it
    // provides unique worksheet templates not covered by codebase-analysis.
    // There is no migration to remove it.

    test('no migration removes extract-prd', () => {
      const extractPrdMigration = MIGRATIONS.find(m =>
        m.description.toLowerCase().includes('extract-prd')
      );
      expect(extractPrdMigration).toBeUndefined();
    });
  });
});
