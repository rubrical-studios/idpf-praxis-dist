/**
 * @framework-script 0.36.0
 * config.js - Configuration management for IDPF Framework Installer
 *
 * Implements:
 * - REQ-011: Config management (framework-config.json)
 * - REQ-013: Framework manifest parsing
 * - REQ-014: Project type detection
 * - REQ-015: Config schema migration
 *
 * @module install/lib/config
 */

const fs = require('fs');
const path = require('path');

// ======================================
// REQ-013: Framework Manifest Parsing
// ======================================

/**
 * REQ-013: Parse and validate framework-manifest.json
 * Note: Consolidated to root manifest as of v0.26.4
 *
 * @param {string} frameworkPath - Path to framework root directory
 * @returns {{success: boolean, manifest?: object, error?: string}} Parse result
 */
function parseManifest(frameworkPath) {
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');

  // AC-5: Error if manifest missing
  if (!fs.existsSync(manifestPath)) {
    return { success: false, error: `Framework manifest not found at ${manifestPath}` };
  }

  try {
    const content = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(content);

    // AC-5: Validate required fields
    if (!manifest.version) {
      return { success: false, error: 'Framework manifest missing required "version" field' };
    }

    // AC-3: Validate scripts categories exist (under deploymentFiles)
    if (!manifest.deploymentFiles?.scripts) {
      return { success: false, error: 'Framework manifest missing required "deploymentFiles.scripts" field' };
    }

    // AC-4: Validate command arrays exist (can be empty)
    if (!Array.isArray(manifest.extensibleCommands)) {
      manifest.extensibleCommands = [];
    }
    if (!Array.isArray(manifest.managedCommands)) {
      manifest.managedCommands = [];
    }

    return { success: true, manifest };
  } catch (err) {
    // AC-5: Error on malformed JSON
    return { success: false, error: `Failed to parse framework manifest: ${err.message}` };
  }
}

/**
 * REQ-013 AC-3: Map manifest script categories to deployment paths
 *
 * @param {object} manifest - Parsed framework manifest
 * @returns {object} Category → {source, target, files} mapping
 */
function getScriptDeploymentPaths(manifest) {
  const paths = {};

  for (const [category, config] of Object.entries(manifest.scripts || {})) {
    paths[category] = {
      source: config.source,
      target: config.target,
      files: config.files || []
    };
  }

  return paths;
}

// ======================================
// REQ-014: Project Type Detection
// ======================================

/**
 * REQ-014 AC-1: Detect project language from package files
 *
 * @param {string} projectDir - Project directory
 * @returns {string|null} Detected language or null
 */
function detectLanguage(projectDir) {
  const languageMarkers = [
    { file: 'go.mod', language: 'go' },
    { file: 'Cargo.toml', language: 'rust' },
    { file: 'package.json', language: 'javascript' },
    { file: 'pyproject.toml', language: 'python' },
    { file: 'requirements.txt', language: 'python' },
    { file: 'pom.xml', language: 'java' },
    { file: 'build.gradle', language: 'java' },
    { file: 'composer.json', language: 'php' },
    { file: 'Gemfile', language: 'ruby' },
    { file: '*.csproj', language: 'csharp' },
  ];

  for (const { file, language } of languageMarkers) {
    if (file.includes('*')) {
      // Glob pattern - check for any matching file
      const pattern = file.replace('*', '');
      const files = fs.readdirSync(projectDir).filter(f => f.endsWith(pattern));
      if (files.length > 0) {
        return language;
      }
    } else if (fs.existsSync(path.join(projectDir, file))) {
      return language;
    }
  }

  return null;
}

/**
 * REQ-014 AC-5: Get default project type for non-TTY environments
 *
 * @param {string} projectDir - Project directory
 * @returns {object} Default projectType object
 */
function getDefaultProjectType(projectDir) {
  return {
    processFramework: 'IDPF-Agile',
    language: detectLanguage(projectDir) || 'unknown',
    description: ''
  };
}

// ======================================
// REQ-011: Config Management
// ======================================

/**
 * REQ-011 AC-6: Discover user scripts by scanning command directories
 *
 * @param {string} projectDir - Project directory
 * @returns {object} Command → [scripts] mapping
 */
function discoverUserScripts(projectDir) {
  const userScripts = {};
  const scriptsBaseDir = path.join(projectDir, '.claude', 'scripts');

  if (!fs.existsSync(scriptsBaseDir)) {
    return userScripts;
  }

  // Get directories that aren't framework/shared
  const entries = fs.readdirSync(scriptsBaseDir, { withFileTypes: true });
  const commandDirs = entries.filter(e =>
    e.isDirectory() &&
    !['framework', 'shared'].includes(e.name)
  );

  for (const dir of commandDirs) {
    const cmdDir = path.join(scriptsBaseDir, dir.name);
    const scripts = fs.readdirSync(cmdDir)
      .filter(f => f.endsWith('.js') || f.endsWith('.sh'));

    if (scripts.length > 0) {
      userScripts[dir.name] = scripts;
    }
  }

  return userScripts;
}

/**
 * REQ-011: Read existing framework-config.json
 *
 * @param {string} projectDir - Project directory
 * @returns {object|null} Config object or null if not found
 */
function readConfig(projectDir) {
  const configPath = path.join(projectDir, 'framework-config.json');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * REQ-011: Write framework-config.json
 *
 * @param {string} projectDir - Project directory
 * @param {object} config - Config object
 */
function writeConfig(projectDir, config) {
  const configPath = path.join(projectDir, 'framework-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * REQ-011: Create or update framework-config.json
 *
 * @param {string} projectDir - Project directory
 * @param {object} manifest - Parsed framework manifest
 * @param {object} options - Optional overrides
 * @param {string} options.processFramework - Process framework (IDPF-*)
 * @param {string} options.language - Project language
 * @param {string} options.description - Project description
 * @param {string} options.domainSpecialist - Domain specialist (v0.17.0+: singular string)
 * @param {string} options.frameworkPath - Path to framework source
 * @returns {object} Updated config
 */
function createOrUpdateConfig(projectDir, manifest, options = {}) {
  const existingConfig = readConfig(projectDir);
  const installedDate = new Date().toISOString().split('T')[0];

  // AC-2: frameworkVersion from manifest
  const frameworkVersion = manifest.version;

  // AC-4: extensibleCommands from manifest
  const extensibleCommands = manifest.extensibleCommands || [];

  // AC-5: frameworkScripts from manifest scripts config
  const frameworkScripts = {};
  for (const [category, config] of Object.entries(manifest.scripts || {})) {
    frameworkScripts[category] = config.files || [];
  }

  // AC-6: Auto-discover user scripts
  const userScripts = discoverUserScripts(projectDir);

  // AC-7: projectType (preserve existing or use options/defaults)
  // v0.17.0+: domainSpecialist is singular string, primarySpecialist removed
  let projectType;
  if (existingConfig?.projectType) {
    // Preserve existing projectType, but allow overrides
    // Handle migration from array to singular
    let existingSpecialist = existingConfig.projectType.domainSpecialist;
    if (!existingSpecialist && existingConfig.projectType.domainSpecialists) {
      // Migrate from array: use first element or primarySpecialist
      existingSpecialist = existingConfig.projectType.primarySpecialist ||
                           existingConfig.projectType.domainSpecialists[0] ||
                           'Full-Stack-Developer';
    }
    projectType = {
      processFramework: options.processFramework || existingConfig.projectType.processFramework,
      language: options.language || existingConfig.projectType.language || detectLanguage(projectDir),
      description: options.description !== undefined ? options.description : existingConfig.projectType.description,
      domainSpecialist: options.domainSpecialist || existingSpecialist || 'Full-Stack-Developer'
    };
  } else {
    // Fresh install
    projectType = {
      processFramework: options.processFramework || 'IDPF-Agile',
      language: options.language || detectLanguage(projectDir) || 'unknown',
      description: options.description || '',
      domainSpecialist: options.domainSpecialist || 'Full-Stack-Developer'
    };
  }

  // Build config object (AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7)
  const config = {
    frameworkVersion,           // AC-2
    installedDate,              // AC-3
    extensibleCommands,         // AC-4
    frameworkScripts,           // AC-5
    userScripts,                // AC-6
    projectType,                // AC-7
    // Preserve frameworkPath for backward compatibility
    frameworkPath: existingConfig?.frameworkPath || options.frameworkPath,
    // Preserve projectSkills (set by /charter or /create-prd)
    ...(existingConfig?.projectSkills && { projectSkills: existingConfig.projectSkills })
  };

  // AC-1: Write config to project root
  writeConfig(projectDir, config);

  return config;
}

// ======================================
// REQ-015: Config Schema Migration
// ======================================

/**
 * REQ-015 AC-1: Detect old schema by presence of installedVersion
 *
 * @param {object} config - Existing config object
 * @returns {boolean} True if old schema
 */
function isOldSchema(config) {
  return config && config.hasOwnProperty('installedVersion') && !config.hasOwnProperty('frameworkVersion');
}

/**
 * REQ-015: Migrate old config schema to new schema
 *
 * @param {string} projectDir - Project directory
 * @param {object} oldConfig - Old config object
 * @param {object} manifest - Parsed framework manifest
 * @returns {{config: object, removed: string[]}} Migrated config and removed files
 */
function migrateConfigSchema(projectDir, oldConfig, manifest) {
  const removed = [];

  // AC-7: Backup old config
  const configPath = path.join(projectDir, 'framework-config.json');
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, configPath + '.bak');
  }

  // AC-2: Migrate installedVersion → frameworkVersion
  const frameworkVersion = manifest.version;  // Use new version, not old

  // AC-3: Migrate domainSpecialists (array) to domainSpecialist (singular)
  // v0.17.0+: Use primarySpecialist, or first element, or default
  let domainSpecialist = 'Full-Stack-Developer';
  if (oldConfig.projectType?.domainSpecialist) {
    // Already migrated to singular
    domainSpecialist = oldConfig.projectType.domainSpecialist;
  } else if (oldConfig.projectType?.domainSpecialists) {
    // Migrate from array: prioritize primarySpecialist, then first element
    domainSpecialist = oldConfig.projectType.primarySpecialist ||
                       oldConfig.projectType.domainSpecialists[0] ||
                       'Full-Stack-Developer';
  }

  // AC-4: Add new fields with defaults
  const extensibleCommands = manifest.extensibleCommands || [];
  const frameworkScripts = {};
  for (const [category, config] of Object.entries(manifest.scripts || {})) {
    frameworkScripts[category] = config.files || [];
  }
  const userScripts = discoverUserScripts(projectDir);

  // AC-6: Add language via detection
  const language = detectLanguage(projectDir) || 'unknown';

  // AC-5: Preserve frameworkPath
  const frameworkPath = oldConfig.frameworkPath;

  // AC-8: Remove orphaned flat-structure scripts from .claude/scripts/*.js
  const scriptsDir = path.join(projectDir, '.claude', 'scripts');
  if (fs.existsSync(scriptsDir)) {
    const entries = fs.readdirSync(scriptsDir);
    for (const entry of entries) {
      const entryPath = path.join(scriptsDir, entry);
      const stat = fs.statSync(entryPath);

      // Only remove .js files directly in scripts/ (not in subdirectories)
      if (stat.isFile() && entry.endsWith('.js')) {
        // This is an orphaned flat-structure script
        fs.unlinkSync(entryPath);
        removed.push(`.claude/scripts/${entry}`);
        // AC-9: Log removed file
        console.log(`  Migrated: .claude/scripts/${entry} → (removed - replaced by nested structure)`);
      }
    }
  }

  // Build new config
  const config = {
    frameworkVersion,
    installedDate: new Date().toISOString().split('T')[0],
    extensibleCommands,
    frameworkScripts,
    userScripts,
    projectType: {
      processFramework: oldConfig.projectType?.processFramework || 'IDPF-Agile',
      language,
      description: oldConfig.projectType?.description || '',
      domainSpecialist
    },
    frameworkPath
  };

  writeConfig(projectDir, config);

  return { config, removed };
}

module.exports = {
  // REQ-013: Manifest parsing
  parseManifest,
  getScriptDeploymentPaths,

  // REQ-014: Project type detection
  detectLanguage,
  getDefaultProjectType,

  // REQ-011: Config management
  readConfig,
  writeConfig,
  createOrUpdateConfig,
  discoverUserScripts,

  // REQ-015: Schema migration
  isOldSchema,
  migrateConfigSchema,
};
