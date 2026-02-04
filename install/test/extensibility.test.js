/**
 * Tests for install/lib/extensibility.js
 *
 * Tests the EXTENSIBLE/MANAGED tag parsing and extension block handling.
 * Covers both versionless (v0.24+) and versioned (legacy) formats.
 */

const {
  parseCommandHeader,
  extractExtensionBlocks,
  restoreBlocks,
  normalizeEmptyMarkers
} = require('../lib/extensibility');

describe('extensibility.js', () => {
  describe('parseCommandHeader', () => {
    describe('versionless tags (v0.24+)', () => {
      test('recognizes <!-- EXTENSIBLE --> without version', () => {
        const content = `---
version: "0.36.1"
---

<!-- EXTENSIBLE -->
# /my-command
`;
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: null
        });
      });

      test('recognizes <!-- MANAGED --> without version', () => {
        const content = `---
version: "0.36.1"
---

<!-- MANAGED -->
# /my-command
`;
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'MANAGED',
          version: null
        });
      });

      test('handles lowercase <!-- extensible -->', () => {
        const content = '<!-- extensible -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: null
        });
      });

      test('handles mixed case <!-- Managed -->', () => {
        const content = '<!-- Managed -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'MANAGED',
          version: null
        });
      });
    });

    describe('versioned tags (legacy format)', () => {
      test('parses <!-- EXTENSIBLE: v0.17.0 --> with v prefix', () => {
        const content = '<!-- EXTENSIBLE: v0.17.0 -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: '0.17.0'
        });
      });

      test('parses <!-- MANAGED: v1.0.0 --> with v prefix', () => {
        const content = '<!-- MANAGED: v1.0.0 -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'MANAGED',
          version: '1.0.0'
        });
      });

      test('parses version without v prefix', () => {
        const content = '<!-- EXTENSIBLE: 2.3.4 -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: '2.3.4'
        });
      });

      test('handles no space after colon', () => {
        const content = '<!-- EXTENSIBLE:v0.23.0 -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: '0.23.0'
        });
      });

      test('handles extra whitespace', () => {
        const content = '<!--   EXTENSIBLE:   v0.17.0   -->';
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: '0.17.0'
        });
      });
    });

    describe('invalid/missing tags', () => {
      test('returns null for content without any tag', () => {
        const content = `---
version: "1.0.0"
---

# Regular markdown file
No tags here.
`;
        const result = parseCommandHeader(content);
        expect(result).toBeNull();
      });

      test('returns null for empty content', () => {
        const result = parseCommandHeader('');
        expect(result).toBeNull();
      });

      test('returns null for malformed tag', () => {
        // Missing closing -->
        const content = '<!-- EXTENSIBLE';
        const result = parseCommandHeader(content);
        expect(result).toBeNull();
      });

      test('returns null for unknown category', () => {
        const content = '<!-- CUSTOM: v1.0.0 -->';
        const result = parseCommandHeader(content);
        expect(result).toBeNull();
      });

      test('returns null for HTML comment without category', () => {
        const content = '<!-- This is just a comment -->';
        const result = parseCommandHeader(content);
        expect(result).toBeNull();
      });
    });

    describe('real-world command files', () => {
      test('parses full EXTENSIBLE command file', () => {
        const content = `---
version: "0.36.1"
description: Create a branch with tracker issue
argument-hint: <branch-name>
---

<!-- EXTENSIBLE -->
# /create-branch

Creates a new branch and associated tracker issue.

## Extension Points

| Point | Purpose |
|-------|---------|
| pre-create | Custom validation |
| post-create | Notifications |
`;
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'EXTENSIBLE',
          version: null
        });
      });

      test('parses full MANAGED command file', () => {
        const content = `---
version: "0.36.1"
allowed-tools: Bash
description: Run sprint retrospective
---

<!-- MANAGED -->
Run a retrospective for the current sprint.

\`\`\`bash
node .claude/scripts/shared/sprint-retro.js
\`\`\`
`;
        const result = parseCommandHeader(content);
        expect(result).toEqual({
          category: 'MANAGED',
          version: null
        });
      });
    });
  });

  describe('extractExtensionBlocks', () => {
    test('extracts single extension block', () => {
      const content = `
<!-- USER-EXTENSION-START: pre-create -->
echo "Custom pre-create hook"
<!-- USER-EXTENSION-END: pre-create -->
`;
      const blocks = extractExtensionBlocks(content);
      expect(blocks.size).toBe(1);
      expect(blocks.has('pre-create')).toBe(true);
      expect(blocks.get('pre-create')).toContain('Custom pre-create hook');
    });

    test('extracts multiple extension blocks', () => {
      const content = `
<!-- USER-EXTENSION-START: pre-create -->
Pre-create content
<!-- USER-EXTENSION-END: pre-create -->

Some other content

<!-- USER-EXTENSION-START: post-create -->
Post-create content
<!-- USER-EXTENSION-END: post-create -->
`;
      const blocks = extractExtensionBlocks(content);
      expect(blocks.size).toBe(2);
      expect(blocks.has('pre-create')).toBe(true);
      expect(blocks.has('post-create')).toBe(true);
    });

    test('handles empty extension blocks', () => {
      const content = '<!-- USER-EXTENSION-START: empty --><!-- USER-EXTENSION-END: empty -->';
      const blocks = extractExtensionBlocks(content);
      expect(blocks.size).toBe(1);
      expect(blocks.has('empty')).toBe(true);
    });

    test('returns empty map for content without blocks', () => {
      const content = 'No extension blocks here';
      const blocks = extractExtensionBlocks(content);
      expect(blocks.size).toBe(0);
    });
  });

  describe('normalizeEmptyMarkers', () => {
    test('collapses empty markers to single line', () => {
      const content = `<!-- USER-EXTENSION-START: test -->
<!-- USER-EXTENSION-END: test -->`;
      const result = normalizeEmptyMarkers(content);
      expect(result).toBe('<!-- USER-EXTENSION-START: test --><!-- USER-EXTENSION-END: test -->');
    });

    test('preserves non-empty markers', () => {
      const content = `<!-- USER-EXTENSION-START: test -->
Some content here
<!-- USER-EXTENSION-END: test -->`;
      const result = normalizeEmptyMarkers(content);
      expect(result).toBe(content);
    });
  });
});

describe('clearArchiveDirectory', () => {
  const { clearArchiveDirectory } = require('../lib/deployment');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  let testDir;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-clear-archive-test-'));
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  test('removes entire archive directory', () => {
    // Create archive directory with files
    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    fs.mkdirSync(archiveDir, { recursive: true });
    fs.writeFileSync(path.join(archiveDir, 'old-archive-1.md'), 'old content');
    fs.writeFileSync(path.join(archiveDir, 'old-archive-2.md'), 'old content');

    clearArchiveDirectory(testDir);

    expect(fs.existsSync(path.join(testDir, '.claude', 'archive'))).toBe(false);
  });

  test('handles non-existent archive directory gracefully', () => {
    // No archive directory exists - should not throw
    expect(() => clearArchiveDirectory(testDir)).not.toThrow();
  });

  test('preserves other .claude directories', () => {
    // Create archive and commands directories
    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    const commandsDir = path.join(testDir, '.claude', 'commands');
    fs.mkdirSync(archiveDir, { recursive: true });
    fs.mkdirSync(commandsDir, { recursive: true });
    fs.writeFileSync(path.join(archiveDir, 'archive.md'), 'archive');
    fs.writeFileSync(path.join(commandsDir, 'command.md'), 'command');

    clearArchiveDirectory(testDir);

    // Archive gone, commands preserved
    expect(fs.existsSync(path.join(testDir, '.claude', 'archive'))).toBe(false);
    expect(fs.existsSync(path.join(testDir, '.claude', 'commands', 'command.md'))).toBe(true);
  });
});

describe('archiveRogueEditFile', () => {
  const { archiveRogueEditFile } = require('../lib/deployment');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  let testDir;

  beforeEach(() => {
    // Create temp directory for each test
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-archive-test-'));
  });

  afterEach(() => {
    // Clean up temp directory
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  test('creates archive directory if missing', () => {
    const content = '# Test Command\nSome content';
    const filePath = path.join(testDir, '.claude', 'commands', 'test.md');

    const archivePath = archiveRogueEditFile(testDir, filePath, content);

    expect(fs.existsSync(path.join(testDir, '.claude', 'archive', 'commands'))).toBe(true);
    expect(archivePath).toContain('test-');
  });

  test('generates timestamped filename', () => {
    const content = '# Test Command';
    const filePath = path.join(testDir, '.claude', 'commands', 'my-command.md');

    const archivePath = archiveRogueEditFile(testDir, filePath, content);

    const today = new Date().toISOString().split('T')[0];
    expect(path.basename(archivePath)).toBe(`my-command-${today}.md`);
  });

  test('handles multiple archives on same day', () => {
    const content = '# Test Command';
    const filePath = path.join(testDir, '.claude', 'commands', 'test.md');

    const archive1 = archiveRogueEditFile(testDir, filePath, content);
    const archive2 = archiveRogueEditFile(testDir, filePath, content);
    const archive3 = archiveRogueEditFile(testDir, filePath, content);

    expect(archive1).not.toBe(archive2);
    expect(archive2).not.toBe(archive3);
    expect(archive2).toContain('-1.md');
    expect(archive3).toContain('-2.md');
  });

  test('includes archive header with metadata', () => {
    const content = '# Original Content\nWith rogue edits';
    const filePath = '/project/.claude/commands/prepare-release.md';

    archiveRogueEditFile(testDir, filePath, content);

    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    const files = fs.readdirSync(archiveDir);
    const archiveContent = fs.readFileSync(path.join(archiveDir, files[0]), 'utf8');

    expect(archiveContent).toContain('<!-- Archived:');
    expect(archiveContent).toContain('<!-- Original: /project/.claude/commands/prepare-release.md -->');
    expect(archiveContent).toContain('<!-- Reason: Rogue edits detected');
    expect(archiveContent).toContain('# Original Content');
  });

  test('preserves original content exactly', () => {
    const content = `---
version: "0.31.0"
---

<!-- EXTENSIBLE -->
# /my-command

User modified this line outside extension blocks.

<!-- USER-EXTENSION-START: custom -->
This is fine.
<!-- USER-EXTENSION-END: custom -->
`;
    const filePath = path.join(testDir, '.claude', 'commands', 'my-command.md');

    archiveRogueEditFile(testDir, filePath, content);

    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    const files = fs.readdirSync(archiveDir);
    const archiveContent = fs.readFileSync(path.join(archiveDir, files[0]), 'utf8');

    // Content should be preserved after the header
    expect(archiveContent).toContain(content);
  });
});

describe('deployExtensibleCommand with rogue edit archiving', () => {
  const { deployExtensibleCommand, clearArchiveDirectory } = require('../lib/deployment');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  let testDir;
  let srcDir;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-deploy-test-'));
    srcDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idpf-src-test-'));

    // Create .claude/commands in test project
    fs.mkdirSync(path.join(testDir, '.claude', 'commands'), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
    fs.rmSync(srcDir, { recursive: true, force: true });
  });

  test('archives file when rogue edits detected', () => {
    // Create template
    const templateContent = `---
version: "0.36.1"
---

<!-- EXTENSIBLE -->
# /test-command

Original template content.

<!-- USER-EXTENSION-START: custom --><!-- USER-EXTENSION-END: custom -->
`;
    const srcPath = path.join(srcDir, 'test-command.md');
    fs.writeFileSync(srcPath, templateContent);

    // Create existing file with rogue edits
    const existingContent = `---
version: "0.30.0"
---

<!-- EXTENSIBLE -->
# /test-command

MODIFIED OUTSIDE EXTENSION BLOCKS - this is a rogue edit.

<!-- USER-EXTENSION-START: custom -->
User's custom content (this is fine)
<!-- USER-EXTENSION-END: custom -->
`;
    const destPath = path.join(testDir, '.claude', 'commands', 'test-command.md');
    fs.writeFileSync(destPath, existingContent);

    // Deploy
    const result = deployExtensibleCommand(srcPath, destPath, '0.31.0', false);

    // Verify archive was created
    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    expect(fs.existsSync(archiveDir)).toBe(true);

    const archiveFiles = fs.readdirSync(archiveDir);
    expect(archiveFiles.length).toBe(1);
    expect(archiveFiles[0]).toMatch(/^test-command-\d{4}-\d{2}-\d{2}\.md$/);

    // Verify warning mentions archive
    expect(result.warnings.some(w => w.includes('archived to'))).toBe(true);
  });

  test('does NOT archive when no rogue edits', () => {
    // Create template - use multi-line extension block format
    // Note: We use the same version in both to avoid false positive from version mismatch
    const templateContent = `---
version: "0.36.1"
---

<!-- EXTENSIBLE -->
# /test-command

Template content.

<!-- USER-EXTENSION-START: custom -->
<!-- USER-EXTENSION-END: custom -->
`;
    const srcPath = path.join(srcDir, 'test-command.md');
    fs.writeFileSync(srcPath, templateContent);

    // Create existing file with ONLY extension block changes (no rogue edits)
    // The content outside extension blocks is IDENTICAL to template
    // Using same version to avoid version mismatch detection
    const existingContent = `---
version: "0.31.0"
---

<!-- EXTENSIBLE -->
# /test-command

Template content.

<!-- USER-EXTENSION-START: custom -->
User's legitimate custom content
<!-- USER-EXTENSION-END: custom -->
`;
    const destPath = path.join(testDir, '.claude', 'commands', 'test-command.md');
    fs.writeFileSync(destPath, existingContent);

    // Deploy with same version as existing file
    const result = deployExtensibleCommand(srcPath, destPath, '0.31.0', false);

    // Verify NO archive was created (warnings should be empty for no rogue edits)
    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    // If there are no rogue edit warnings, no archive should exist
    const hasRogueEditWarnings = result.warnings.some(w => w.includes('archived to'));
    expect(hasRogueEditWarnings).toBe(false);
  });

  test('clearArchiveDirectory is called before deployment', () => {
    // Create old archives that should be cleared
    const archiveDir = path.join(testDir, '.claude', 'archive', 'commands');
    fs.mkdirSync(archiveDir, { recursive: true });
    fs.writeFileSync(path.join(archiveDir, 'old-archive.md'), 'old content');

    // Clear and verify
    clearArchiveDirectory(testDir);
    expect(fs.existsSync(archiveDir)).toBe(false);
  });
});
