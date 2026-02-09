/**
 * @framework-script 0.40.0
 * constants.js - Configuration data for IDPF Framework Installer
 * @module install/lib/constants
 */

/**
 * Base Experts - 12 specialists available for install-time selection
 * Full-Stack-Developer is first (default selection)
 */
const BASE_EXPERTS = [
  'Full-Stack-Developer',
  'Backend-Specialist',
  'Frontend-Specialist',
  'Mobile-Specialist',
  'Desktop-Application-Developer',
  'Embedded-Systems-Engineer',
  'Game-Developer',
  'ML-Engineer',
  'Data-Engineer',
  'Cloud-Solutions-Architect',
  'SRE-Specialist',
  'Systems-Programmer-Specialist',
];

/**
 * All domain specialists (Base + Pack + PRD)
 * Kept for validation and cleanup purposes
 */
const DOMAIN_SPECIALISTS = [
  'Accessibility-Specialist',
  'API-Integration-Specialist',
  'Backend-Specialist',
  'Cloud-Solutions-Architect',
  'Database-Engineer',
  'Data-Engineer',
  'Desktop-Application-Developer',
  'DevOps-Engineer',
  'Embedded-Systems-Engineer',
  'Frontend-Specialist',
  'Full-Stack-Developer',
  'Game-Developer',
  'Graphics-Engineer-Specialist',
  'ML-Engineer',
  'Mobile-Specialist',
  'Performance-Engineer',
  'Platform-Engineer',
  'QA-Test-Engineer',
  'Security-Engineer',
  'SRE-Specialist',
  'Systems-Programmer-Specialist',
  'Technical-Writer-Specialist',
];

const FRAMEWORK_SKILLS = {
  'IDPF-Agile': ['tdd-red-phase', 'tdd-green-phase', 'tdd-refactor-phase', 'tdd-failure-recovery', 'test-writing-patterns'],
  'IDPF-Vibe': [],
};

const VIBE_VARIANT_SKILLS = {
  'vibe-newbie': ['flask-setup', 'sinatra-setup', 'common-errors', 'sqlite-integration', 'beginner-testing'],
  'vibe-web': [],
  'vibe-desktop': [],
  'vibe-mobile': [],
  'vibe-game': [],
  'vibe-embedded': [],
};

/**
 * Manifest of installed files for cleanup purposes
 * Each entry specifies:
 * - dir: relative directory path from project root
 * - files: array of expected filenames (functions receive config and return true/false for conditional files)
 */
const INSTALLED_FILES_MANIFEST = {
  root: {
    dir: '.',
    files: [
      'CLAUDE.md',
      'framework-config.json',
      (_config) => process.platform === 'win32' ? 'run_claude.cmd' : null,
      (_config) => process.platform === 'win32' ? 'runp_claude.cmd' : null,
      (_config) => process.platform !== 'win32' ? 'run_claude.sh' : null,
      (_config) => process.platform !== 'win32' ? 'runp_claude.sh' : null,
    ],
  },
  rules: {
    dir: '.claude/rules',
    files: [
      '01-anti-hallucination.md',
      (config) => config?.enableGitHubWorkflow ? '02-github-workflow.md' : null,
      '03-startup.md',
      '04-charter-enforcement.md',
      (_config) => process.platform === 'win32' ? '05-windows-shell.md' : null,
      '06-runtime-triggers.md',
    ],
  },
  commands: {
    dir: '.claude/commands',
    files: [
      // switch-role.md removed in v0.17.0 - single specialist model
      // add-role.md removed in v0.17.0 - single specialist model
      'change-domain-expert.md',  // Core command (always deployed)
      'install-skill.md',         // Core command (always deployed)
      'playwright-check.md',      // Core command (always deployed)
      (config) => config?.enableGitHubWorkflow ? 'assign-branch.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'switch-branch.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'transfer-issue.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'create-branch.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'prepare-release.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'prepare-beta.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'merge-branch.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'destroy-branch.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'charter.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'extensions.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'create-prd.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'create-backlog.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'complete-prd.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'add-story.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'split-story.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'pivot.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'work.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'done.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'bug.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'enhancement.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'proposal.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'resolve-review.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'review-issue.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'review-prd.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'review-proposal.md' : null,
      (config) => config?.enableGitHubWorkflow ? 'review-test-plan.md' : null,
    ],
  },
  scripts: {
    dir: '.claude/scripts/shared',
    files: [
      'install-skill.js',  // Core script (always deployed)
      (config) => config?.enableGitHubWorkflow ? 'analyze-commits.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'assign-branch.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'cleanup-release-assets.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'extensions-cli.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'generate-changelog.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'generate-test-plan.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'recommend-version.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'switch-branch.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'transfer-issue.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'update-release-notes.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'wait-for-ci.js' : null,
    ],
  },
  scriptsLib: {
    dir: '.claude/scripts/shared/lib',
    files: [
      (config) => config?.enableGitHubWorkflow ? 'gh.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'git.js' : null,
      (config) => config?.enableGitHubWorkflow ? 'output.js' : null,
    ],
  },
  hooks: {
    dir: '.claude/hooks',
    files: [
      (config) => config?.enableGitHubWorkflow ? 'workflow-trigger.js' : null,
    ],
  },
  metadata: {
    dir: '.claude/metadata',
    files: [
      'skill-registry.json',      // Pre-generated skill registry for /charter and /create-prd
      'extension-recipes.json',   // Common patterns for /extensions recipes
      'extension-points.json',    // Extension point registry for command introspection
      'skill-keywords.json',      // Keyword-to-skill mappings for /create-backlog and /add-story
      'recipe-tech-mapping.json', // Tech stack to recipe mappings for /charter suggestions
      'review-extensions.json',   // Review command domain extension registry
    ],
  },
};

const PROCESS_FRAMEWORKS = [
  { value: 'IDPF-Agile', title: 'IDPF-Agile', description: 'Sprint-based development with user stories' },
  { value: 'IDPF-Vibe', title: 'IDPF-Vibe', description: 'Exploratory development with evolution paths' },
];

const VIBE_VARIANTS = [
  { value: 'vibe-newbie', title: 'Vibe-Newbie', description: 'Beginner-friendly (Flask/Sinatra)' },
  { value: 'vibe-web', title: 'Vibe-Web', description: 'Web development (Frontend/Backend)' },
  { value: 'vibe-desktop', title: 'Vibe-Desktop', description: 'Desktop applications' },
  { value: 'vibe-mobile', title: 'Vibe-Mobile', description: 'Mobile applications' },
  { value: 'vibe-game', title: 'Vibe-Game', description: 'Game development' },
  { value: 'vibe-embedded', title: 'Vibe-Embedded', description: 'Embedded systems' },
];

/**
 * Valid framework transitions per Framework-Transitions.md
 */
const VALID_TRANSITIONS = {
  'IDPF-Vibe': ['IDPF-Agile'],
  'IDPF-Agile': [],  // Terminal state
};

const ALL_SKILLS = [
  'anti-pattern-analysis',
  'api-versioning',
  'bdd-writing',
  'beginner-testing',
  'ci-cd-pipeline-design',
  'codebase-analysis',
  'common-errors',
  'electron-development',
  'error-handling-patterns',
  'extract-prd',
  'flask-setup',
  'migration-patterns',
  'mutation-testing',
  'playwright-setup',
  'postgresql-integration',
  'property-based-testing',
  'sinatra-setup',
  'sqlite-integration',
  'tdd-failure-recovery',
  'tdd-green-phase',
  'tdd-red-phase',
  'tdd-refactor-phase',
  'test-writing-patterns',
];

module.exports = {
  BASE_EXPERTS,
  DOMAIN_SPECIALISTS,
  FRAMEWORK_SKILLS,
  VIBE_VARIANT_SKILLS,
  INSTALLED_FILES_MANIFEST,
  PROCESS_FRAMEWORKS,
  VIBE_VARIANTS,
  VALID_TRANSITIONS,
  ALL_SKILLS,
};
