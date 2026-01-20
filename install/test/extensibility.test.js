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
version: "0.28.0"
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
version: "0.28.0"
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
version: "0.28.0"
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
version: "0.28.0"
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
