/**
 * Tests for install/test/setup.js
 *
 * Verifies the mock utilities work correctly before using them in other tests.
 */

const { createMockFs, createMockUi } = require('./setup');

describe('Test Setup Utilities', () => {
  describe('createMockFs', () => {
    let mockFs;

    beforeEach(() => {
      mockFs = createMockFs();
    });

    afterEach(() => {
      mockFs._reset();
    });

    test('existsSync returns false for non-existent files', () => {
      expect(mockFs.existsSync('/does/not/exist')).toBe(false);
    });

    test('existsSync returns true after writeFileSync', () => {
      mockFs.writeFileSync('/test/file.txt', 'content');
      expect(mockFs.existsSync('/test/file.txt')).toBe(true);
    });

    test('readFileSync returns content after writeFileSync', () => {
      mockFs.writeFileSync('/test/file.txt', 'hello world');
      expect(mockFs.readFileSync('/test/file.txt')).toBe('hello world');
    });

    test('readFileSync throws ENOENT for non-existent files', () => {
      expect(() => mockFs.readFileSync('/missing.txt')).toThrow(/ENOENT/);
    });

    test('_setup initializes filesystem state', () => {
      mockFs._setup({
        '/project/file1.txt': 'content1',
        '/project/file2.txt': 'content2'
      });

      expect(mockFs.existsSync('/project/file1.txt')).toBe(true);
      expect(mockFs.existsSync('/project/file2.txt')).toBe(true);
      expect(mockFs.readFileSync('/project/file1.txt')).toBe('content1');
    });

    test('rmSync with recursive removes directory and contents', () => {
      mockFs._setup({
        '/project/dir/file1.txt': 'content1',
        '/project/dir/subdir/file2.txt': 'content2'
      });

      mockFs.rmSync('/project/dir', { recursive: true });

      expect(mockFs.existsSync('/project/dir/file1.txt')).toBe(false);
      expect(mockFs.existsSync('/project/dir/subdir/file2.txt')).toBe(false);
      expect(mockFs.existsSync('/project/dir')).toBe(false);
    });

    test('mkdirSync with recursive creates parent directories', () => {
      mockFs.mkdirSync('/a/b/c/d', { recursive: true });
      expect(mockFs.existsSync('/a/b/c/d')).toBe(true);
      expect(mockFs.existsSync('/a/b/c')).toBe(true);
      expect(mockFs.existsSync('/a/b')).toBe(true);
    });
  });

  describe('createMockUi', () => {
    test('creates mock logging functions', () => {
      const mockUi = createMockUi();

      mockUi.log('test message');
      mockUi.logSuccess('success');
      mockUi.logWarning('warning');
      mockUi.logError('error');
      mockUi.divider();

      expect(mockUi.log).toHaveBeenCalledWith('test message');
      expect(mockUi.logSuccess).toHaveBeenCalledWith('success');
      expect(mockUi.logWarning).toHaveBeenCalledWith('warning');
      expect(mockUi.logError).toHaveBeenCalledWith('error');
      expect(mockUi.divider).toHaveBeenCalled();
    });
  });
});
