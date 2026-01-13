/**
 * Test setup utilities for installer tests
 *
 * Provides common mocking patterns for filesystem and process operations.
 * All tests mock fs to prevent real file changes.
 *
 * @module install/test/setup
 */

/**
 * Create a mock filesystem with in-memory storage
 * @returns {Object} Mock fs module with common methods
 */
function createMockFs() {
  const files = new Map();
  const dirs = new Set(['/']);

  return {
    files,
    dirs,

    existsSync: jest.fn((path) => {
      return files.has(path) || dirs.has(path);
    }),

    readFileSync: jest.fn((path, encoding) => {
      if (!files.has(path)) {
        const error = new Error(`ENOENT: no such file or directory, open '${path}'`);
        error.code = 'ENOENT';
        throw error;
      }
      return files.get(path);
    }),

    writeFileSync: jest.fn((path, content) => {
      files.set(path, content);
    }),

    mkdirSync: jest.fn((path, options) => {
      dirs.add(path);
      if (options?.recursive) {
        // Add parent directories
        const parts = path.split('/').filter(Boolean);
        let current = '';
        for (const part of parts) {
          current += '/' + part;
          dirs.add(current);
        }
      }
    }),

    rmSync: jest.fn((path, options) => {
      if (options?.recursive) {
        // Remove directory and all children
        for (const file of files.keys()) {
          if (file.startsWith(path)) {
            files.delete(file);
          }
        }
        for (const dir of dirs) {
          if (dir.startsWith(path)) {
            dirs.delete(dir);
          }
        }
      } else {
        files.delete(path);
        dirs.delete(path);
      }
    }),

    unlinkSync: jest.fn((path) => {
      files.delete(path);
    }),

    readdirSync: jest.fn((path) => {
      const entries = [];
      const prefix = path.endsWith('/') ? path : path + '/';
      for (const file of files.keys()) {
        if (file.startsWith(prefix)) {
          const relative = file.slice(prefix.length);
          const firstPart = relative.split('/')[0];
          if (!entries.includes(firstPart)) {
            entries.push(firstPart);
          }
        }
      }
      return entries;
    }),

    statSync: jest.fn((path) => {
      return {
        isDirectory: () => dirs.has(path),
        isFile: () => files.has(path)
      };
    }),

    // Utility to set up mock filesystem state
    _setup: function(fileMap) {
      files.clear();
      dirs.clear();
      dirs.add('/');
      for (const [path, content] of Object.entries(fileMap)) {
        files.set(path, content);
        // Add parent directories
        const parts = path.split('/').slice(0, -1);
        let current = '';
        for (const part of parts) {
          if (part) {
            current += '/' + part;
            dirs.add(current);
          }
        }
      }
    },

    // Reset mock filesystem
    _reset: function() {
      files.clear();
      dirs.clear();
      dirs.add('/');
      jest.clearAllMocks();
    }
  };
}

/**
 * Create mock UI functions (suppress console output in tests)
 * @returns {Object} Mock UI module
 */
function createMockUi() {
  return {
    log: jest.fn(),
    logSuccess: jest.fn(),
    logWarning: jest.fn(),
    logError: jest.fn(),
    divider: jest.fn()
  };
}

module.exports = {
  createMockFs,
  createMockUi
};
