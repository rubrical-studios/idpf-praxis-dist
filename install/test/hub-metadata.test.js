/**
 * Tests for install-hub.js metadata deployment (#1234)
 *
 * Verifies that setupClaudeStructure correctly deploys .claude/metadata/
 * from the source repo to the hub target, avoiding the self-referential
 * copy bug where metadata was copied from hubPath to hubPath.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Will be imported after install-hub.js exports setupClaudeStructure
let setupClaudeStructure;
try {
  ({ setupClaudeStructure } = require('../../install-hub'));
} catch (_e) {
  // install-hub.js may not export yet — tests will fail (RED phase)
}

describe('install-hub.js Metadata Deployment (#1234)', () => {
  let tmpDir;
  let sourceDir;
  let targetDir;

  beforeEach(() => {
    // Create temp directories simulating source and target
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hub-test-'));
    sourceDir = path.join(tmpDir, 'source');
    targetDir = path.join(tmpDir, 'target');

    // Setup source with metadata files (simulating dist repo)
    const sourceMetadata = path.join(sourceDir, '.claude', 'metadata');
    fs.mkdirSync(sourceMetadata, { recursive: true });
    fs.writeFileSync(
      path.join(sourceMetadata, 'skill-registry.json'),
      JSON.stringify({ version: '1.0', skills: [] })
    );
    fs.writeFileSync(
      path.join(sourceMetadata, 'extension-recipes.json'),
      JSON.stringify({ version: '1.0', categories: {} })
    );
    fs.writeFileSync(
      path.join(sourceMetadata, 'extension-points.json'),
      JSON.stringify({ commandCount: 0, extensionPointCount: 0, commands: {} })
    );

    // Setup source with required reference files for rule generation
    const sourceAssistant = path.join(sourceDir, 'Assistant');
    const sourceReference = path.join(sourceDir, 'Reference');
    fs.mkdirSync(sourceAssistant, { recursive: true });
    fs.mkdirSync(sourceReference, { recursive: true });

    // Create empty target
    fs.mkdirSync(path.join(targetDir, '.claude'), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('setupClaudeStructure is exported', () => {
    expect(typeof setupClaudeStructure).toBe('function');
  });

  test('deploys metadata from source to target on fresh install', () => {
    const results = setupClaudeStructure(targetDir, '0.38.0', sourceDir);

    expect(results.metadata).toBe(true);

    // Verify files exist at target
    const targetMetadata = path.join(targetDir, '.claude', 'metadata');
    expect(fs.existsSync(path.join(targetMetadata, 'skill-registry.json'))).toBe(true);
    expect(fs.existsSync(path.join(targetMetadata, 'extension-recipes.json'))).toBe(true);
    expect(fs.existsSync(path.join(targetMetadata, 'extension-points.json'))).toBe(true);
  });

  test('metadata content matches source files', () => {
    setupClaudeStructure(targetDir, '0.38.0', sourceDir);

    const targetMetadata = path.join(targetDir, '.claude', 'metadata');
    const sourceMetadata = path.join(sourceDir, '.claude', 'metadata');

    const sourceContent = fs.readFileSync(path.join(sourceMetadata, 'skill-registry.json'), 'utf8');
    const targetContent = fs.readFileSync(path.join(targetMetadata, 'skill-registry.json'), 'utf8');
    expect(targetContent).toBe(sourceContent);
  });

  test('upgrade replaces old metadata with new', () => {
    // Pre-populate target with stale metadata
    const targetMetadata = path.join(targetDir, '.claude', 'metadata');
    fs.mkdirSync(targetMetadata, { recursive: true });
    fs.writeFileSync(
      path.join(targetMetadata, 'skill-registry.json'),
      JSON.stringify({ version: '0.9', skills: ['old'] })
    );

    const results = setupClaudeStructure(targetDir, '0.38.0', sourceDir);
    expect(results.metadata).toBe(true);

    // Verify new content replaced old
    const content = JSON.parse(fs.readFileSync(path.join(targetMetadata, 'skill-registry.json'), 'utf8'));
    expect(content.version).toBe('1.0');
    expect(content.skills).toEqual([]);
  });

  test('metadata deployment does not self-reference (bug #1234)', () => {
    // This is the critical test: when source !== target, metadata should
    // come from source, not from target (which would be self-referential)
    const results = setupClaudeStructure(targetDir, '0.38.0', sourceDir);
    expect(results.metadata).toBe(true);

    // Verify the 3 metadata files were deployed
    const targetMetadata = path.join(targetDir, '.claude', 'metadata');
    const files = fs.readdirSync(targetMetadata).filter(f => f.endsWith('.json'));
    expect(files.length).toBe(3);
  });

  test('returns metadata: false when source has no metadata', () => {
    // Remove source metadata
    fs.rmSync(path.join(sourceDir, '.claude', 'metadata'), { recursive: true, force: true });

    const results = setupClaudeStructure(targetDir, '0.38.0', sourceDir);
    expect(results.metadata).toBe(false);
  });
});
