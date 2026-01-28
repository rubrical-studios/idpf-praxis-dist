/**
 * @framework-script 0.34.0
 * Test project deployment for --with-tests flag
 *
 * Creates a dedicated, ephemeral test project for framework validation.
 * The test project is standalone (own package.json, node_modules) and
 * can be deleted and recreated at any time without loss.
 *
 * @module install/lib/test-deployment
 */

const fs = require('fs');
const path = require('path');

/**
 * Clear all content from a test project directory.
 * Removes everything except the directory itself.
 *
 * @param {string} targetDir - Path to the test project directory
 */
function clearTestProject(targetDir) {
  if (!fs.existsSync(targetDir)) {
    return;
  }

  // Remove all contents
  const entries = fs.readdirSync(targetDir);
  for (const entry of entries) {
    const fullPath = path.join(targetDir, entry);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

/**
 * Generate package.json for the test project.
 *
 * @param {string} frameworkPath - Path to the framework directory
 * @returns {object} Package.json content
 */
function generateTestPackageJson(frameworkPath) {
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  return {
    name: 'idpf-framework-tests',
    version: '1.0.0',
    description: 'IDPF Framework Validation Tests',
    private: true,
    scripts: {
      'test:framework': 'jest --testPathPattern="unit/"',
      'test:framework:e2e': 'jest --testPathPattern="integration/" --testTimeout=60000',
    },
    devDependencies: {
      jest: '^29.7.0',
      '@anthropic-ai/claude-agent-sdk': '^0.2.22',
    },
    frameworkVersion: manifest.version,
  };
}

/**
 * Deploy the /run-fw-tests command to the test project.
 *
 * @param {string} targetDir - Path to the test project directory
 * @param {string} frameworkPath - Path to the framework directory
 * @returns {boolean} true if command was deployed
 */
function deployRunFwTestsCommand(targetDir, frameworkPath) {
  const commandSrc = path.join(frameworkPath, 'Construction', 'Test-Automation', 'commands', 'run-fw-tests.md');
  const commandDir = path.join(targetDir, '.claude', 'commands');
  const commandDest = path.join(commandDir, 'run-fw-tests.md');

  fs.mkdirSync(commandDir, { recursive: true });

  if (fs.existsSync(commandSrc)) {
    fs.copyFileSync(commandSrc, commandDest);
  } else {
    // Minimal placeholder if source doesn't exist yet
    fs.writeFileSync(commandDest, [
      '---',
      'description: Run framework validation tests',
      '---',
      '',
      '# /run-fw-tests',
      '',
      'Run framework validation tests.',
      '',
      '```bash',
      'npm run test:framework',
      '```',
      '',
    ].join('\n'));
  }

  return true;
}

/**
 * Deploy test files from the framework to the test project.
 * Copies from Construction/Test-Automation/ into the test project.
 *
 * @param {string} targetDir - Path to the test project directory
 * @param {string} frameworkPath - Path to the framework directory
 * @returns {{ deployed: string[] }} List of deployed test files
 */
function deployTestFiles(targetDir, frameworkPath) {
  const deployed = [];
  const testAutomationDir = path.join(frameworkPath, 'Construction', 'Test-Automation');

  // Deploy Comprehensive tests (if they exist)
  const comprehensiveDir = path.join(testAutomationDir, 'Comprehensive');
  if (fs.existsSync(comprehensiveDir)) {
    copyDirRecursive(comprehensiveDir, path.join(targetDir, 'tests', 'Comprehensive'));
    deployed.push('Comprehensive/');
  }

  // Deploy version-specific tests (if they exist)
  const manifestPath = path.join(frameworkPath, 'framework-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const versionDir = path.join(testAutomationDir, manifest.version);
    if (fs.existsSync(versionDir)) {
      copyDirRecursive(versionDir, path.join(targetDir, 'tests', manifest.version));
      deployed.push(`${manifest.version}/`);
    }
  }

  return { deployed };
}

/**
 * Recursively copy a directory.
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Create a complete test project for framework validation.
 *
 * This is the main entry point called by --with-tests.
 * It clears any existing content, creates the project structure,
 * and deploys test files and commands.
 *
 * @param {string} targetDir - Path to create the test project
 * @param {string} frameworkPath - Path to the framework directory
 * @returns {{ success: boolean, files: string[] }}
 */
function createTestProject(targetDir, frameworkPath) {
  // Clear any existing content
  clearTestProject(targetDir);

  // Create directory (and parents if needed)
  fs.mkdirSync(targetDir, { recursive: true });

  // Generate package.json
  const pkg = generateTestPackageJson(frameworkPath);
  fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  );

  // Deploy jest.config.js
  const jestConfigSrc = path.join(frameworkPath, 'Construction', 'Test-Automation', 'jest.config.js');
  if (fs.existsSync(jestConfigSrc)) {
    fs.copyFileSync(jestConfigSrc, path.join(targetDir, 'jest.config.js'));
  }

  // Deploy CHARTER.md fixture for E2E tests
  const charterSrc = path.join(
    frameworkPath, 'Construction', 'Test-Automation',
    'Comprehensive', 'fixtures', 'templates', 'CHARTER.md'
  );
  if (fs.existsSync(charterSrc)) {
    fs.copyFileSync(charterSrc, path.join(targetDir, 'CHARTER.md'));
  }

  // Deploy /run-fw-tests command
  deployRunFwTestsCommand(targetDir, frameworkPath);

  // Deploy test files (if they exist yet)
  const { deployed } = deployTestFiles(targetDir, frameworkPath);

  return {
    success: true,
    files: ['package.json', 'jest.config.js', 'CHARTER.md', '.claude/commands/run-fw-tests.md', ...deployed],
  };
}

module.exports = {
  createTestProject,
  clearTestProject,
  deployRunFwTestsCommand,
  deployTestFiles,
  generateTestPackageJson,
};
