/**
 * @framework-script 0.35.4
 * extensibility.js - Extensible command handling for IDPF Framework Installer
 *
 * Implements extensibility features from PRD #559:
 * - REQ-002: Command header parsing
 * - REQ-003: Extension block extraction
 * - REQ-004: Block restoration
 * - REQ-005: Rogue edit detection
 * - REQ-006: Frontmatter preservation
 *
 * @module install/lib/extensibility
 */

// fs and path are available via Node.js but not currently needed in this module

/**
 * REQ-002: Parse command file header to extract category and version
 *
 * Looks for comments like:
 *   <!-- EXTENSIBLE -->           (versionless - v0.24+)
 *   <!-- MANAGED -->              (versionless - v0.24+)
 *   <!-- EXTENSIBLE: v1.0.0 -->   (legacy with version)
 *   <!-- MANAGED: v1.0.0 -->      (legacy with version)
 *
 * @param {string} content - File content to parse
 * @returns {{category: string, version: string|null}|null} Header info or null if not found
 */
function parseCommandHeader(content) {
  // AC-1 & AC-2: Match EXTENSIBLE or MANAGED header with optional version
  // AC-4: Version can have optional 'v' prefix
  // Supports both versionless (v0.24+) and versioned (legacy) formats
  const headerRegex = /<!--\s*(EXTENSIBLE|MANAGED)(?::\s*v?([\d.]+))?\s*-->/i;
  const match = content.match(headerRegex);

  if (!match) {
    // AC-3: No header found - treated as MANAGED by caller
    return null;
  }

  return {
    category: match[1].toUpperCase(),  // Normalize to uppercase
    version: match[2] || null          // Version or null if versionless
  };
}

/**
 * REQ-003: Extract all USER-EXTENSION blocks from content
 *
 * Finds patterns like:
 *   <!-- USER-EXTENSION-START: identifier -->
 *   ... user content ...
 *   <!-- USER-EXTENSION-END: identifier -->
 *
 * @param {string} content - File content to parse
 * @returns {Map<string, string>} Map of extension ID → full block content (including markers)
 */
function extractExtensionBlocks(content) {
  const blocks = new Map();

  // AC-1: Match START/END pairs with identifiers
  // AC-3 & AC-4: Handle empty markers and multiple extension points
  const blockRegex = /<!--\s*USER-EXTENSION-START:\s*(\S+)\s*-->([\s\S]*?)<!--\s*USER-EXTENSION-END:\s*\1\s*-->/g;

  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    const id = match[1];
    const fullBlock = match[0];  // AC-2: Include markers in content
    blocks.set(id, fullBlock);
  }

  return blocks;
}

/**
 * REQ-004: Restore preserved extension blocks into new template
 *
 * @param {string} templateContent - New template content with empty markers
 * @param {Map<string, string>} preservedBlocks - Blocks extracted from existing file
 * @returns {{content: string, warnings: string[]}} Restored content and any warnings
 */
function restoreBlocks(templateContent, preservedBlocks) {
  const warnings = [];
  let resultContent = templateContent;

  for (const [id, preservedContent] of preservedBlocks) {
    // Look for empty marker in template
    const emptyMarkerRegex = new RegExp(
      `<!--\\s*USER-EXTENSION-START:\\s*${escapeRegex(id)}\\s*-->\\s*<!--\\s*USER-EXTENSION-END:\\s*${escapeRegex(id)}\\s*-->`,
      'g'
    );

    // Also look for marker with any content (in case template has placeholder)
    const anyMarkerRegex = new RegExp(
      `<!--\\s*USER-EXTENSION-START:\\s*${escapeRegex(id)}\\s*-->[\\s\\S]*?<!--\\s*USER-EXTENSION-END:\\s*${escapeRegex(id)}\\s*-->`,
      'g'
    );

    if (emptyMarkerRegex.test(resultContent)) {
      // AC-1: Replace empty marker with preserved content
      resultContent = resultContent.replace(emptyMarkerRegex, preservedContent);
    } else if (anyMarkerRegex.test(resultContent)) {
      // AC-3: Extension point exists but has content - replace anyway
      resultContent = resultContent.replace(anyMarkerRegex, preservedContent);
    } else {
      // AC-2 & AC-4: Extension point removed in new version
      warnings.push(`Extension point '${id}' removed in new template - content preserved but not placed`);
    }
  }

  return { content: resultContent, warnings };
}

/**
 * REQ-005: Detect modifications outside extension markers (rogue edits)
 *
 * @param {string} existingContent - Current file content
 * @param {string} templateContent - Original template content
 * @returns {{hasRogueEdits: boolean, details: string[]}} Detection result
 */
function detectRogueEdits(existingContent, templateContent) {
  const details = [];

  // Extract extension blocks from both
  const existingBlocks = extractExtensionBlocks(existingContent);
  const templateBlocks = extractExtensionBlocks(templateContent);

  // Remove extension blocks to compare non-extension content
  let existingWithoutBlocks = existingContent;
  let templateWithoutBlocks = templateContent;

  for (const [id, block] of existingBlocks) {
    existingWithoutBlocks = existingWithoutBlocks.replace(block, `[[EXTENSION:${id}]]`);
  }
  for (const [id, block] of templateBlocks) {
    templateWithoutBlocks = templateWithoutBlocks.replace(block, `[[EXTENSION:${id}]]`);
  }

  // Normalize whitespace for comparison
  const normalizedExisting = normalizeForComparison(existingWithoutBlocks);
  const normalizedTemplate = normalizeForComparison(templateWithoutBlocks);

  // AC-1 & AC-4: Compare non-extension content
  if (normalizedExisting !== normalizedTemplate) {
    details.push('Changes outside extension markers will be lost');
    return { hasRogueEdits: true, details };
  }

  return { hasRogueEdits: false, details };
}

/**
 * REQ-006: Merge YAML frontmatter during upgrade
 *
 * @param {string} existingFrontmatter - Current file's frontmatter (without ---)
 * @param {string} templateFrontmatter - Template's frontmatter (without ---)
 * @returns {{merged: string, warnings: string[]}} Merged frontmatter and warnings
 */
function mergeFrontmatter(existingFrontmatter, templateFrontmatter) {
  const warnings = [];

  try {
    // Parse as simple key: value pairs (YAML-lite)
    const existingFields = parseFrontmatterFields(existingFrontmatter);
    const templateFields = parseFrontmatterFields(templateFrontmatter);

    // AC-2: version field ALWAYS from template
    const protectedFields = ['version'];

    // AC-3: User can override description, argument-hint
    const preservableFields = ['description', 'argument-hint'];

    // Start with template as base
    const mergedFields = { ...templateFields };

    // Preserve user fields
    for (const [key, value] of Object.entries(existingFields)) {
      if (protectedFields.includes(key)) {
        // Skip - use template value
        continue;
      }
      if (preservableFields.includes(key) || !templateFields.hasOwnProperty(key)) {
        // AC-1 & AC-3: Preserve user-added or user-overridden fields
        mergedFields[key] = value;
      }
    }

    // Rebuild frontmatter string
    const merged = Object.entries(mergedFields)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    return { merged, warnings };
  } catch (err) {
    // AC-4: Parse error - fall back to template only
    warnings.push(`Frontmatter parse error: ${err.message} - using template frontmatter`);
    return { merged: templateFrontmatter, warnings };
  }
}

/**
 * NFR-003: Normalize empty extension markers to single line
 *
 * @param {string} content - File content
 * @returns {string} Content with normalized empty markers
 */
function normalizeEmptyMarkers(content) {
  // AC-1 & AC-2: Collapse empty markers (only whitespace between) to single line
  return content.replace(
    /<!--\s*USER-EXTENSION-START:\s*(\S+)\s*-->\s*<!--\s*USER-EXTENSION-END:\s*\1\s*-->/g,
    '<!-- USER-EXTENSION-START: $1 --><!-- USER-EXTENSION-END: $1 -->'
  );
}

// ======================================
// Helper Functions
// ======================================

/**
 * Escape special regex characters in a string
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize content for comparison (collapse whitespace, trim)
 */
function normalizeForComparison(content) {
  return content
    .replace(/\r\n/g, '\n')      // Normalize line endings
    .replace(/[ \t]+/g, ' ')      // Collapse horizontal whitespace
    .replace(/\n\s*\n/g, '\n')    // Collapse multiple newlines
    .trim();
}

/**
 * Parse simple YAML-like frontmatter into key-value pairs
 */
function parseFrontmatterFields(frontmatter) {
  const fields = {};
  const lines = frontmatter.split('\n');

  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      fields[match[1].trim()] = match[2].trim();
    }
  }

  return fields;
}

/**
 * Extract frontmatter from markdown content
 * Returns { frontmatter, body } or null if no frontmatter
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return null;
  }
  return {
    frontmatter: match[1],
    body: match[2]
  };
}

/**
 * Rebuild content with frontmatter
 */
function rebuildWithFrontmatter(frontmatter, body) {
  return `---\n${frontmatter}\n---\n${body}`;
}

/**
 * REQ-010: Extract deprecation markers from template content
 *
 * Finds patterns like:
 *   <!-- DEPRECATED: old-id → new-id -->
 *   <!-- DEPRECATED: old-id → (removed) -->
 *
 * @param {string} content - Template content to scan
 * @returns {Map<string, string|null>} Map of old ID → new ID (null if removed)
 */
function extractDeprecationMarkers(content) {
  const deprecations = new Map();

  // AC-1: Match DEPRECATED comments with arrow notation
  const deprecationRegex = /<!--\s*DEPRECATED:\s*(\S+)\s*→\s*(\S+|\(removed\))\s*-->/g;

  let match;
  while ((match = deprecationRegex.exec(content)) !== null) {
    const oldId = match[1];
    const newId = match[2] === '(removed)' ? null : match[2];
    deprecations.set(oldId, newId);
  }

  return deprecations;
}

/**
 * REQ-010: Handle deprecated extension points during upgrade
 *
 * @param {string} templateContent - New template with deprecation markers
 * @param {Map<string, string>} preservedBlocks - Blocks from existing file
 * @param {function} promptUser - Async function to prompt user (y/n questions)
 * @returns {Promise<{content: string, actions: Array<{oldId, newId, action}>, aborted: boolean}>}
 */
async function handleDeprecations(templateContent, preservedBlocks, promptUser) {
  const deprecations = extractDeprecationMarkers(templateContent);
  const actions = [];
  let resultContent = templateContent;

  for (const [oldId, newId] of deprecations) {
    // Check if user has content in the deprecated extension point
    const userContent = preservedBlocks.get(oldId);

    if (!userContent) {
      // No user content in deprecated point - nothing to do
      continue;
    }

    // Check if content is non-empty (has more than just markers)
    const contentBetweenMarkers = userContent
      .replace(/<!--\s*USER-EXTENSION-START:\s*\S+\s*-->/, '')
      .replace(/<!--\s*USER-EXTENSION-END:\s*\S+\s*-->/, '')
      .trim();

    if (!contentBetweenMarkers) {
      // Empty extension point - nothing to migrate
      continue;
    }

    // AC-2: Display deprecation warning
    console.log(`\n⚠️  Extension point '${oldId}' is deprecated.`);

    if (newId) {
      // AC-3: Successor exists - relocate content
      console.log(`   Content will be relocated to '${newId}'.`);

      // Build new content block with new ID
      const newBlock = userContent
        .replace(new RegExp(`USER-EXTENSION-START:\\s*${escapeRegex(oldId)}`), `USER-EXTENSION-START: ${newId}`)
        .replace(new RegExp(`USER-EXTENSION-END:\\s*${escapeRegex(oldId)}`), `USER-EXTENSION-END: ${newId}`);

      // Replace the new extension point with migrated content
      const newPointRegex = new RegExp(
        `<!--\\s*USER-EXTENSION-START:\\s*${escapeRegex(newId)}\\s*-->[\\s\\S]*?<!--\\s*USER-EXTENSION-END:\\s*${escapeRegex(newId)}\\s*-->`,
        'g'
      );

      if (newPointRegex.test(resultContent)) {
        resultContent = resultContent.replace(newPointRegex, newBlock);
        actions.push({ oldId, newId, action: 'relocated' });
        console.log(`   ✓ Relocated content from '${oldId}' to '${newId}'.`);
      } else {
        // New point doesn't exist in template - warn but keep content in old location
        actions.push({ oldId, newId, action: 'warning-target-missing' });
        console.log(`   ⚠️  Target extension point '${newId}' not found in template.`);
      }
    } else {
      // AC-4: No successor - prompt user for deletion
      console.log(`   This extension point has been removed with no successor.`);
      console.log(`   Content:\n${contentBetweenMarkers.substring(0, 200)}${contentBetweenMarkers.length > 200 ? '...' : ''}`);

      const response = await promptUser(`Delete content from '${oldId}'? (y/n): `);

      if (response.toLowerCase() === 'y') {
        // AC-5: User confirms deletion
        actions.push({ oldId, newId: null, action: 'deleted' });
        console.log(`   ✓ Content deleted.`);
      } else {
        // AC-5: User declines - abort upgrade
        actions.push({ oldId, newId: null, action: 'abort' });
        console.log(`   Upgrade aborted by user.`);
        return { content: resultContent, actions, aborted: true };
      }
    }
  }

  // AC-6: Log summary of actions
  if (actions.length > 0) {
    console.log('\nDeprecation actions:');
    for (const { oldId, newId, action } of actions) {
      if (action === 'relocated') {
        console.log(`  • ${oldId} → ${newId} (relocated)`);
      } else if (action === 'deleted') {
        console.log(`  • ${oldId} (deleted)`);
      }
    }
  }

  return { content: resultContent, actions, aborted: false };
}

module.exports = {
  parseCommandHeader,
  extractExtensionBlocks,
  restoreBlocks,
  detectRogueEdits,
  mergeFrontmatter,
  normalizeEmptyMarkers,
  extractFrontmatter,
  rebuildWithFrontmatter,
  extractDeprecationMarkers,
  handleDeprecations,
};
