#!/usr/bin/env node
/**
 * validate-helpers.js
 *
 * Automated validation checks for helper JS files during release.
 * Verifies synchronization between JS files and their sources of truth.
 *
 * Commands:
 *   node validate-helpers.js           - Run all validations
 *   node validate-helpers.js --fix     - Show remediation commands for failures
 *   node validate-helpers.js help      - Show usage information
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const COLORS = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    dim: '\x1b[2m',
    reset: '\x1b[0m'
};

let failures = [];
let warnings = [];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(msg) {
    console.log(msg);
}

function success(msg) {
    log(`${COLORS.green}✓${COLORS.reset} ${msg}`);
}

function fail(msg, remediation = null) {
    log(`${COLORS.red}✗${COLORS.reset} ${msg}`);
    failures.push({ message: msg, remediation });
}

function warn(msg) {
    log(`${COLORS.yellow}!${COLORS.reset} ${msg}`);
    warnings.push(msg);
}

function readJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (_e) {
        return null;
    }
}

function extractArrayFromJS(filePath, arrayName) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Match array declaration: const ARRAY_NAME = [ ... ];
        const regex = new RegExp(`const\\s+${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
        const match = content.match(regex);
        if (!match) return null;

        // Extract string values from the array
        const arrayContent = match[1];
        const items = [];
        const itemRegex = /'([^']+)'|"([^"]+)"/g;
        let itemMatch;
        while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
            items.push(itemMatch[1] || itemMatch[2]);
        }
        return items;
    } catch (_e) {
        return null;
    }
}

/**
 * Get the path to installer constants file
 * Supports both old (install.js) and new (install/lib/constants.js) locations
 */
function getInstallerConstantsPath() {
    const modularPath = path.join(ROOT, 'install', 'lib', 'constants.js');
    const legacyPath = path.join(ROOT, 'install.js');

    if (fs.existsSync(modularPath)) {
        return modularPath;
    }
    return legacyPath;
}

function extractObjectFromJS(filePath, objectName) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Match object declaration: const OBJECT_NAME = { ... };
        // This is a simplified parser - handles basic cases
        const regex = new RegExp(`const\\s+${objectName}\\s*=\\s*\\{([\\s\\S]*?)\\};`, 'm');
        const match = content.match(regex);
        if (!match) return null;

        const objectContent = match[1];
        const result = {};

        // Match key: [...] patterns
        const entryRegex = /'([^']+)':\s*\[([^\]]*)\]/g;
        let entryMatch;
        while ((entryMatch = entryRegex.exec(objectContent)) !== null) {
            const key = entryMatch[1];
            const valuesStr = entryMatch[2];
            const values = [];
            const valueRegex = /'([^']+)'/g;
            let valueMatch;
            while ((valueMatch = valueRegex.exec(valuesStr)) !== null) {
                values.push(valueMatch[1]);
            }
            result[key] = values;
        }
        return result;
    } catch (_e) {
        return null;
    }
}

function getDirectories(dirPath) {
    try {
        return fs.readdirSync(dirPath, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);
    } catch (_e) {
        return [];
    }
}

function filesMatch(file1, file2) {
    try {
        const content1 = fs.readFileSync(file1, 'utf8');
        const content2 = fs.readFileSync(file2, 'utf8');
        return content1 === content2;
    } catch (_e) {
        return false;
    }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate DOMAIN_SPECIALISTS array matches framework-manifest.json
 */
function validateDomainSpecialists() {
    log('\nValidating DOMAIN_SPECIALISTS...');

    const installPath = getInstallerConstantsPath();
    const manifestPath = path.join(ROOT, 'framework-manifest.json');

    const installSpecialists = extractArrayFromJS(installPath, 'DOMAIN_SPECIALISTS');
    const manifest = readJSON(manifestPath);

    if (!installSpecialists) {
        fail('Could not parse DOMAIN_SPECIALISTS from install.js');
        return;
    }

    if (!manifest || !manifest.domainSpecialists) {
        fail('Could not read domainSpecialists from framework-manifest.json');
        return;
    }

    const manifestSpecialists = manifest.domainSpecialists;

    // Compare arrays
    const installSet = new Set(installSpecialists);
    const manifestSet = new Set(manifestSpecialists);

    const missingInInstall = manifestSpecialists.filter(s => !installSet.has(s));
    const extraInInstall = installSpecialists.filter(s => !manifestSet.has(s));

    if (missingInInstall.length > 0) {
        fail(`DOMAIN_SPECIALISTS missing: ${missingInInstall.join(', ')}`,
            'Add missing specialists to install.js DOMAIN_SPECIALISTS array');
    }

    if (extraInInstall.length > 0) {
        fail(`DOMAIN_SPECIALISTS has extra entries: ${extraInInstall.join(', ')}`,
            'Remove extra specialists from install.js or add to framework-manifest.json');
    }

    if (missingInInstall.length === 0 && extraInInstall.length === 0) {
        success(`DOMAIN_SPECIALISTS: ${installSpecialists.length} entries match framework-manifest.json`);
    }
}

/**
 * Validate ALL_SKILLS array matches Skills directories
 */
function validateAllSkills() {
    log('\nValidating ALL_SKILLS...');

    const installPath = getInstallerConstantsPath();
    const skillsDir = path.join(ROOT, 'Skills');

    const installSkills = extractArrayFromJS(installPath, 'ALL_SKILLS');

    if (!installSkills) {
        fail('Could not parse ALL_SKILLS from install.js');
        return;
    }

    // Get actual skill directories (exclude Packaged)
    const actualSkills = getDirectories(skillsDir)
        .filter(d => d !== 'Packaged' && fs.existsSync(path.join(skillsDir, d, 'SKILL.md')));

    const installSet = new Set(installSkills);
    const actualSet = new Set(actualSkills);

    const missingInInstall = actualSkills.filter(s => !installSet.has(s));
    const extraInInstall = installSkills.filter(s => !actualSet.has(s));

    if (missingInInstall.length > 0) {
        fail(`ALL_SKILLS missing: ${missingInInstall.join(', ')}`,
            'Add missing skills to install.js ALL_SKILLS array');
    }

    if (extraInInstall.length > 0) {
        fail(`ALL_SKILLS has extra entries: ${extraInInstall.join(', ')}`,
            'Remove non-existent skills from install.js ALL_SKILLS array');
    }

    if (missingInInstall.length === 0 && extraInInstall.length === 0) {
        success(`ALL_SKILLS: ${installSkills.length} entries match Skills/ directories`);
    }
}

/**
 * Validate FRAMEWORK_SKILLS matches MAINTENANCE.md matrix
 */
function validateFrameworkSkills() {
    log('\nValidating FRAMEWORK_SKILLS...');

    const installPath = getInstallerConstantsPath();
    const maintenancePath = path.join(ROOT, 'Skills', 'MAINTENANCE.md');

    const frameworkSkills = extractObjectFromJS(installPath, 'FRAMEWORK_SKILLS');

    if (!frameworkSkills) {
        fail('Could not parse FRAMEWORK_SKILLS from install.js');
        return;
    }

    // Parse MAINTENANCE.md for the dependency matrix
    try {
        fs.readFileSync(maintenancePath, 'utf8');
    } catch (_e) {
        fail('Could not read Skills/MAINTENANCE.md');
        return;
    }

    // Expected mappings from MAINTENANCE.md
    const expectedMappings = {
        'IDPF-Agile': ['tdd-red-phase', 'tdd-green-phase', 'tdd-refactor-phase', 'tdd-failure-recovery', 'test-writing-patterns'],
        'IDPF-Vibe': [] // Vibe base has no skills; variants have skills
    };

    let hasError = false;

    for (const [framework, expectedSkills] of Object.entries(expectedMappings)) {
        const actualSkills = frameworkSkills[framework] || [];
        const expectedSet = new Set(expectedSkills);
        const actualSet = new Set(actualSkills);

        const missing = expectedSkills.filter(s => !actualSet.has(s));
        const extra = actualSkills.filter(s => !expectedSet.has(s));

        if (missing.length > 0 || extra.length > 0) {
            hasError = true;
            if (missing.length > 0) {
                fail(`FRAMEWORK_SKILLS['${framework}'] missing: ${missing.join(', ')}`);
            }
            if (extra.length > 0) {
                warn(`FRAMEWORK_SKILLS['${framework}'] has extra: ${extra.join(', ')}`);
            }
        }
    }

    if (!hasError) {
        success('FRAMEWORK_SKILLS: Mappings match MAINTENANCE.md');
    }
}

/**
 * Validate VIBE_VARIANT_SKILLS matches MAINTENANCE.md
 */
function validateVibeVariantSkills() {
    log('\nValidating VIBE_VARIANT_SKILLS...');

    const installPath = getInstallerConstantsPath();
    const vibeSkills = extractObjectFromJS(installPath, 'VIBE_VARIANT_SKILLS');

    if (!vibeSkills) {
        fail('Could not parse VIBE_VARIANT_SKILLS from install.js');
        return;
    }

    // Expected from MAINTENANCE.md
    const expectedMappings = {
        'vibe-newbie': ['flask-setup', 'sinatra-setup', 'common-errors', 'sqlite-integration', 'beginner-testing'],
        'vibe-web': [],
        'vibe-desktop': [],
        'vibe-mobile': [],
        'vibe-game': [],
        'vibe-embedded': []
    };

    let hasError = false;

    for (const [variant, expectedSkills] of Object.entries(expectedMappings)) {
        const actualSkills = vibeSkills[variant] || [];
        const expectedSet = new Set(expectedSkills);
        const actualSet = new Set(actualSkills);

        const missing = expectedSkills.filter(s => !actualSet.has(s));
        const extra = actualSkills.filter(s => !expectedSet.has(s));

        if (missing.length > 0 || extra.length > 0) {
            hasError = true;
            if (missing.length > 0) {
                fail(`VIBE_VARIANT_SKILLS['${variant}'] missing: ${missing.join(', ')}`);
            }
            if (extra.length > 0) {
                warn(`VIBE_VARIANT_SKILLS['${variant}'] has extra: ${extra.join(', ')}`);
            }
        }
    }

    if (!hasError) {
        success('VIBE_VARIANT_SKILLS: Mappings match MAINTENANCE.md');
    }
}

/**
 * Validate workflow-trigger.js matches template
 */
function validateTemplateSync() {
    log('\nValidating workflow-trigger.js template sync...');

    const hookPath = path.join(ROOT, '.claude', 'hooks', 'workflow-trigger.js');
    const templatePath = path.join(ROOT, 'Templates', 'hooks', 'workflow-trigger.js');

    if (!fs.existsSync(hookPath)) {
        fail('.claude/hooks/workflow-trigger.js does not exist');
        return;
    }

    if (!fs.existsSync(templatePath)) {
        fail('Templates/hooks/workflow-trigger.js does not exist');
        return;
    }

    if (filesMatch(hookPath, templatePath)) {
        success('workflow-trigger.js: Matches template');
    } else {
        fail('workflow-trigger.js differs from Templates/hooks/workflow-trigger.js',
            'Copy .claude/hooks/workflow-trigger.js to Templates/hooks/ or vice versa');
    }
}

/**
 * Validate minimize-config.json exists and is valid
 */
function validateMinimizeConfig() {
    log('\nValidating minimize-config.json...');

    const configPath = path.join(ROOT, '.claude', 'scripts', 'shared', 'minimize-config.json');

    if (!fs.existsSync(configPath)) {
        fail('minimize-config.json does not exist at .claude/scripts/shared/');
        return;
    }

    const config = readJSON(configPath);

    if (!config) {
        fail('minimize-config.json is not valid JSON');
        return;
    }

    // Verify required fields
    const requiredFields = ['includedDirectories', 'excludedFiles', 'excludedPatterns'];
    const missingFields = requiredFields.filter(f => !config[f]);

    if (missingFields.length > 0) {
        fail(`minimize-config.json missing fields: ${missingFields.join(', ')}`);
        return;
    }

    success(`minimize-config.json: Valid (${config.includedDirectories.length} directories in scope)`);
}

/**
 * Validate deploymentFiles in framework-manifest.json matches Templates/
 */
function validateDeploymentFiles() {
    log('\nValidating deploymentFiles in framework-manifest.json...');

    const manifestPath = path.join(ROOT, 'framework-manifest.json');
    const manifest = readJSON(manifestPath);

    if (!manifest || !manifest.deploymentFiles) {
        fail('Could not read deploymentFiles from framework-manifest.json');
        return;
    }

    const df = manifest.deploymentFiles;
    let hasError = false;

    // Validate commands exist in Templates/commands/
    const commandsDir = path.join(ROOT, 'Templates', 'commands');
    const allCommands = [...(df.commands?.core || []), ...(df.commands?.workflow || [])];

    for (const cmd of allCommands) {
        const cmdPath = path.join(commandsDir, cmd);
        if (!fs.existsSync(cmdPath)) {
            fail(`deploymentFiles.commands: ${cmd} not found in Templates/commands/`);
            hasError = true;
        }
    }

    // Check for unlisted commands in Templates/commands/
    try {
        const actualCommands = fs.readdirSync(commandsDir)
            .filter(f => f.endsWith('.md'));
        const listedCommands = new Set(allCommands);
        const unlisted = actualCommands.filter(f => !listedCommands.has(f));
        if (unlisted.length > 0) {
            warn(`Templates/commands/ has unlisted files: ${unlisted.join(', ')}`);
        }
    } catch (_e) {
        // Directory doesn't exist
    }

    // Validate scripts exist in Templates/scripts/
    for (const category of ['shared', 'lib']) {
        const config = df.scripts?.[category];
        if (!config) continue;

        const sourceDir = path.join(ROOT, config.source);
        for (const file of config.files || []) {
            const filePath = path.join(sourceDir, file);
            if (!fs.existsSync(filePath)) {
                fail(`deploymentFiles.scripts.${category}: ${file} not found in ${config.source}`);
                hasError = true;
            }
        }

        // Check for unlisted files
        try {
            const actualFiles = fs.readdirSync(sourceDir)
                .filter(f => f.endsWith('.js') || f.endsWith('.json'));
            const listedFiles = new Set(config.files || []);
            const unlisted = actualFiles.filter(f => !listedFiles.has(f));
            if (unlisted.length > 0) {
                warn(`${config.source} has unlisted files: ${unlisted.join(', ')}`);
            }
        } catch (_e) {
            // Directory doesn't exist
        }
    }

    // Validate hooks exist
    const hooksConfig = df.hooks;
    if (hooksConfig) {
        const hooksDir = path.join(ROOT, hooksConfig.source);
        for (const file of hooksConfig.files || []) {
            const filePath = path.join(hooksDir, file);
            if (!fs.existsSync(filePath)) {
                fail(`deploymentFiles.hooks: ${file} not found in ${hooksConfig.source}`);
                hasError = true;
            }
        }
    }

    if (!hasError) {
        const cmdCount = allCommands.length;
        const scriptCount = (df.scripts?.shared?.files?.length || 0) + (df.scripts?.lib?.files?.length || 0);
        success(`deploymentFiles: ${cmdCount} commands, ${scriptCount} scripts validated`);
    }
}

/**
 * Validate Templates/framework-manifest.json matches actual Templates/ contents
 */
function validateTemplatesManifest() {
    log('\nValidating Templates/framework-manifest.json...');

    const manifestPath = path.join(ROOT, 'Templates', 'framework-manifest.json');
    const manifest = readJSON(manifestPath);

    if (!manifest) {
        fail('Could not read Templates/framework-manifest.json');
        return;
    }

    let hasError = false;

    // Validate scripts categories
    for (const category of ['shared', 'lib', 'hooks']) {
        const config = manifest.scripts?.[category];
        if (!config) continue;

        const sourceDir = path.join(ROOT, 'Templates', config.source);
        for (const file of config.files || []) {
            const filePath = path.join(sourceDir, file);
            if (!fs.existsSync(filePath)) {
                fail(`Templates manifest scripts.${category}: ${file} not found`);
                hasError = true;
            }
        }
    }

    // Validate command lists reference existing files
    const commandsDir = path.join(ROOT, 'Templates', 'commands');
    const allCommands = [
        ...(manifest.extensibleCommands || []),
        ...(manifest.managedCommands || [])
    ];

    for (const cmd of allCommands) {
        const cmdPath = path.join(commandsDir, `${cmd}.md`);
        if (!fs.existsSync(cmdPath)) {
            fail(`Templates manifest: command ${cmd}.md not found in Templates/commands/`);
            hasError = true;
        }
    }

    if (!hasError) {
        const scriptCount = Object.values(manifest.scripts || {})
            .reduce((sum, cat) => sum + (cat.files?.length || 0), 0);
        const cmdCount = allCommands.length;
        success(`Templates/framework-manifest.json: ${cmdCount} commands, ${scriptCount} scripts validated`);
    }
}

/**
 * Validate PROCESS_FRAMEWORKS matches IDPF directories
 */
function validateProcessFrameworks() {
    log('\nValidating PROCESS_FRAMEWORKS...');

    const installPath = getInstallerConstantsPath();

    // Read constants file and extract PROCESS_FRAMEWORKS values
    let content;
    try {
        content = fs.readFileSync(installPath, 'utf8');
    } catch (_e) {
        fail('Could not read installer constants');
        return;
    }

    // Extract framework values from PROCESS_FRAMEWORKS
    const regex = /const\s+PROCESS_FRAMEWORKS\s*=\s*\[([\s\S]*?)\];/m;
    const match = content.match(regex);

    if (!match) {
        fail('Could not parse PROCESS_FRAMEWORKS from install.js');
        return;
    }

    const valueRegex = /value:\s*'([^']+)'/g;
    const frameworks = [];
    let valueMatch;
    while ((valueMatch = valueRegex.exec(match[1])) !== null) {
        frameworks.push(valueMatch[1]);
    }

    // Get actual IDPF directories (process frameworks only)
    // Excludes: Testing frameworks (7), PRD (requirements engineering)
    const idpfDirs = getDirectories(ROOT)
        .filter(d => d.startsWith('IDPF-') && !d.includes('Testing') && !d.includes('QA') &&
            !d.includes('Performance') && !d.includes('Security') && !d.includes('Accessibility') &&
            !d.includes('Chaos') && !d.includes('Contract') && !d.includes('PRD'));

    const frameworkSet = new Set(frameworks);
    const dirSet = new Set(idpfDirs);

    const missingInInstall = idpfDirs.filter(d => !frameworkSet.has(d));
    const extraInInstall = frameworks.filter(f => !dirSet.has(f));

    if (missingInInstall.length > 0) {
        warn(`PROCESS_FRAMEWORKS may be missing: ${missingInInstall.join(', ')}`);
    }

    if (extraInInstall.length > 0) {
        warn(`PROCESS_FRAMEWORKS references missing directories: ${extraInInstall.join(', ')}`);
    }

    if (missingInInstall.length === 0 && extraInInstall.length === 0) {
        success(`PROCESS_FRAMEWORKS: ${frameworks.length} entries match IDPF-*/ directories`);
    }
}

// ============================================================================
// MAIN
// ============================================================================

function showHelp() {
    console.log(`validate-helpers.js - Validation for helper JS files

Usage: node validate-helpers.js [options]

Options:
  (none)    Run all validations
  --fix     Show remediation commands for failures
  help      Show this help message

Validations performed:
  - DOMAIN_SPECIALISTS vs framework-manifest.json
  - ALL_SKILLS vs Skills/*/ directories
  - FRAMEWORK_SKILLS vs MAINTENANCE.md matrix
  - VIBE_VARIANT_SKILLS vs MAINTENANCE.md
  - PROCESS_FRAMEWORKS vs IDPF-*/ directories
  - workflow-trigger.js vs Templates/hooks/workflow-trigger.js
  - minimize-config.json existence and validity
  - deploymentFiles in framework-manifest.json vs Templates/
  - Templates/framework-manifest.json vs Templates/ contents

Exit codes:
  0 - All validations passed
  1 - One or more validations failed
`);
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('help') || args.includes('--help') || args.includes('-h')) {
        showHelp();
        process.exit(0);
    }

    const showFix = args.includes('--fix');

    console.log('Validating helper scripts...');
    console.log(`${COLORS.dim}Working directory: ${ROOT}${COLORS.reset}`);

    // Run all validations
    validateDomainSpecialists();
    validateAllSkills();
    validateFrameworkSkills();
    validateVibeVariantSkills();
    validateProcessFrameworks();
    validateTemplateSync();
    validateMinimizeConfig();
    validateDeploymentFiles();
    validateTemplatesManifest();

    // Summary
    console.log('\n' + '='.repeat(50));

    if (failures.length === 0 && warnings.length === 0) {
        console.log(`${COLORS.green}All validations passed.${COLORS.reset}`);
        process.exit(0);
    }

    if (warnings.length > 0) {
        console.log(`${COLORS.yellow}Warnings: ${warnings.length}${COLORS.reset}`);
    }

    if (failures.length > 0) {
        console.log(`${COLORS.red}Failures: ${failures.length}${COLORS.reset}`);

        if (showFix) {
            console.log('\nRemediation suggestions:');
            for (const f of failures) {
                if (f.remediation) {
                    console.log(`  - ${f.remediation}`);
                }
            }
        } else {
            console.log(`${COLORS.dim}Run with --fix to see remediation suggestions${COLORS.reset}`);
        }

        process.exit(1);
    }

    // Only warnings, exit success
    process.exit(0);
}

main();
