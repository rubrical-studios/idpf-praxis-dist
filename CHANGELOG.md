# Changelog

All notable changes to the IDPF Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.9.5] - 2025-12-10

### Fixed
- **fetch-updates.js ENOENT error** (#181) - Use system temp directory instead of relative path

---

## [2.9.4] - 2025-12-10

### Changed
- **fetch-updates.js self-update mode** (#180) - Can now run from framework directory for self-update

---

## [2.9.3] - 2025-12-10

### Fixed
- **fetch-updates.js not deployed to dist** (#179) - Added to deploy workflow

---

## [2.9.2] - 2025-12-10

### Fixed
- **Workflow hooks not configured in existing projects** (#178) - `settings.local.json` now merges hooks config instead of skipping when file exists
- Added migration to fix `settings.local.json` hooks for projects upgrading from pre-2.9.2

---

## [2.9.1] - 2025-12-10

### Fixed
- Version references corrected from v2.19 to v2.9 in documentation

---

## [2.9.0] - 2025-12-10

### Added

#### Rules Auto-Loading (#147, #154-157)
- **`.claude/rules/` directory** - Rules auto-load at session start without explicit file reads
  - `01-anti-hallucination.md` - Framework development quality rules
  - `02-github-workflow.md` - GitHub issue management integration
  - `03-session-startup.md` - Startup procedure and on-demand loading
- **Migration support** - `install.js --migrate` flag for existing projects
- **Release Phase 2d** - Rules directory build in /prepare-release
- **Release Phase 2e** - Migration validation in /prepare-release

#### Workflow Triggers (#150, #152, #153)
- **PRD workflow trigger** (#153) - `prd:` prefix converts proposals to PRDs using IDPF-PRD framework
- **Commands trigger** (#150, #152) - `commands` keyword lists available workflow triggers
- **Lightning bolt indicator** (#150) - Visual ⚡ indicator when workflow triggers are detected

### Changed
- **CLAUDE.md** - Simplified to reference auto-loading rules instead of procedural startup
- **Session-Startup-Instructions.md** - Updated to v2.7 documenting rules auto-loading
- **Framework-Overview.md** - Added Rules Auto-Loading section
- **README-DIST.md** - Added rules auto-loading and migration documentation
- **install.js** - Added `deployRules()`, `generateStartupRules()`, `runMigrations()` functions
- **/prepare-release** - Added Phase 2d (Rules Build) and Phase 2e (Migration Validation)
- **/minimize-files** - Documented `.claude/rules/` exclusion

### Removed
- **_chg.md files** (#149) - Removed change history files and related CLAUDE.md rules (82 files)
- **Simplified date presentation** (#148) - Removed verbose date confirmation in session startup

### Migration
For existing projects using framework v2.8.x or earlier:
```bash
node [frameworkPath]/install.js --migrate
```

This will:
1. Remove old `STARTUP.md` file
2. Create `.claude/rules/` directory with auto-loading rules
3. Regenerate simplified `CLAUDE.md`

---

## [2.8.0] - 2025-12-09

### Added

#### PRD Templates (8 New)
- **Framework Gap Analysis PRDs** (#144) - 8 comprehensive PRDs for identified framework gaps:
  - PRD-Framework-Gap-Analysis-Logging-Observability.md
  - PRD-Framework-Gap-Analysis-Documentation-Maintenance.md
  - PRD-Framework-Gap-Analysis-Error-Recovery.md
  - PRD-Framework-Gap-Analysis-File-Organization.md
  - PRD-Framework-Gap-Analysis-Multi-Agent.md
  - PRD-Framework-Gap-Analysis-Performance-Optimization.md
  - PRD-Framework-Gap-Analysis-State-Persistence.md
  - PRD-Framework-Gap-Analysis-Team-Collaboration.md

#### Release Process
- **Slash commands for release preparation** (#146) - Converted release documentation to executable slash commands:
  - `/prepare-release` - Full release preparation workflow
  - `/skill-validate` - Skill validation process
  - `/minimize-files` - Token optimization process

### Changed
- **LICENSE** - Updated copyright to Rubrical Studios
- **Repository references** (#145) - Updated all references from previous owner to rubrical-studios

---

## [2.7.0] - 2025-12-08

### Added

#### Installer Enhancements
- **GitHub workflow integration** (#136) - Installer now deploys workflow-trigger.js hook and configures settings.local.json with UserPromptSubmit hook for automatic issue creation
- **Prerequisite detection** (#141) - Installer checks for git (required), gh and jq (optional) before installation with helpful installation links
- **Git repository initialization** (#141) - Prompts to initialize git repo if .git directory not found in target
- **Auto-install prompts module** (#142) - Installer automatically runs `npm install prompts` if module is missing

#### Workflow Hooks
- **UserPromptSubmit hook** (#134) - New workflow-trigger.js detects trigger prefixes (bug:, enhancement:, finding:, idea:, proposal:) and injects context reminder
- **Visual indication** (#138) - Hook displays "⚡ Workflow trigger detected" message when firing

#### Change History Tracking
- **_chg.md validation script** (#132) - validate-chg-sync.js ensures all rule-set files have synchronized change history files
- **82 _chg.md files created** (#129) - Complete coverage for all rule-set files
- **_chg.md handling rules** (#133) - Added to CLAUDE.md for consistent change tracking

### Fixed
- **Installer .claude/commands directory** (#140) - generateSwitchRole() and generateAddRole() now create directory before writing files
- **UserPromptSubmit hook error** (#135) - Fixed JSON output format for proper context injection
- **Shell construct limitations** - Documented heredoc and command substitution workarounds in GitHub-Workflow.md

### Changed
- **CLAUDE.md** - Added _chg.md handling section and improved with standard header

---

## [2.6.3] - 2025-12-07

### Added
- **Trigger Words section** (#126) - GitHub-Workflow.md now explicitly lists trigger words (bug:, enhancement:, finding:, idea:, proposal:) requiring issue creation before work

### Fixed
- **Dist repo README** (#127) - Created README-DIST.md for end-users; deploy workflow now uses this instead of development README.md
- **PREPARE_RELEASE.md Phase 4** (#125) - Updated to reflect automated distribution via GitHub Action

---

## [2.6.2] - 2025-12-07

### Added
- **Two-pass minimization** (#124) - Quality gate ensuring Medium-High and High impact reductions are reversed
  - Pass 1: Aggressive minimization applying all removal rules
  - Pass 2: Impact assessment with automatic reversal for truncated checklists

### Fixed
- **IDPF-Security** (#124) - Restored complete OWASP Top 10 (was 6 items, now 10) and Compliance Frameworks table
- **IDPF-Chaos** (#124) - Restored Application faults (5 items) and State faults (3 items) categories
- **IDPF-Accessibility** (#123) - Restored complete WCAG criteria (was 10 items, now 26)

### Changed
- **MINIMIZE_FILES.md** - Expanded "Must Preserve" rules with specific checklist categories
- **Distribution repo** (#123) - Renamed from `virtual-studio-dist` to `virtual-ai-studio-dist`

---

## [2.6.0] - 2025-12-04

### Added

#### Minimization System
- **Token-optimized files** (#116-#121) - 84.6% reduction in token consumption
  - `.min-mirror/` directory contains minimized versions of all framework files
  - Automated minimization via `MINIMIZE_FILES.md`
  - Distribution uses minimized files automatically

#### Distribution Automation
- **Automated deployment** (#122) - GitHub Action deploys to `virtual-ai-studio-dist` on release tags
- **fetch-updates.js** - End-user script to update framework installation from dist repo

### Changed

#### Installation
- **STARTUP.md** - Now requires reading Anti-Hallucination Rules (previously optional via /expand-rules)
- **Removed /expand-rules** - Rules now loaded automatically at startup
- **Removed /expand-domain** - Use /switch-role to change specialists

#### Documentation
- **Guides/** directory - Moved non-functional documentation from Reference/

### Fixed
- Framework-Summary.md path in startup instructions (#115)
- Run script /gh-workflow instruction removed (#114)

---

## [2.5.0] - 2025-12-04

### Added

#### Domain Specialists (1 New)
- **Full-Stack-Developer** (#109) - Generalist specialist covering frontend, backend, and infrastructure
  - Now the default specialist when no domain is selected during installation

#### Commands (2 New)
- **/add-role** (#105) - Add domain specialists post-installation without re-running installer
- **/switch-role** (#97) - Switch between installed domain specialists mid-session with persistence

#### Workflows (2 New)
- **Idea Workflow** (#85) - Lightweight proposal creation for early-stage concepts
- **Proposal-to-PRD Workflow** (#85) - Convert proposals to formal PRDs using IDPF-PRD

### Changed

#### Installation
- **Unified installer** (#93) - `install.js` replaces `install.sh` and `install.cmd`
- **Framework lock** (#92) - Re-installation preserves framework selection and project instructions
- **Primary specialist** (#96) - Installation now prompts for primary (auto-loaded) specialist
- **Default domain** (#110) - Full-Stack-Developer auto-selected when no specialist chosen
- **Role persistence** (#104) - /switch-role updates framework-config.json for session persistence

#### GitHub Integration
- **gh-pmu integration** (#103) - Replaced gh-pm and gh-sub-issue with unified gh-pmu extension
- **GitHub-Workflow.md** (#112) - Moved from slash command to Reference/ directory (MUST READ at startup)
- **STOP checkpoints** (#100) - Added explicit checkpoints before issue closure

### Fixed
- Date confirmation now waits for user response before proceeding (#86)
- Install.cmd markdown parsing strips ** prefix correctly (#94)
- Updated .gh-pm.yml references to .gh-pmu.yml (#107, #108)

### Removed
- **install.sh** (#113) - Legacy bash installer removed
- **install.cmd** (#113) - Legacy Windows batch installer removed
- **/gh-workflow slash command** (#112) - Replaced by Reference/GitHub-Workflow.md

---

## [2.4.0] - 2025-12-02

### Added

#### Anti-Hallucination Rulesets (2 New)
- **Anti-Hallucination Rules for Framework Development** (#78)
  - Version management: Always analyze commits before versioning
  - Cross-reference validation: Verify counts, versions, registries
  - CHANGELOG discipline: Document ALL changes since last release
  - Registry synchronization: Skills, specialists, install scripts
  - Now the ONLY active ruleset for the dev repo (process-docs)

- **Anti-Hallucination Rules for PRD Work** (#79)
  - Stakeholder truth over helpful invention
  - Source attribution for every requirement
  - Scope boundary discipline (in-scope/out-of-scope)
  - Priority assignment only with stakeholder input
  - NFR rules for elicitation and extraction
  - Integrated with IDPF-PRD, PRD-Analyst, and extract-prd

#### Release Process Improvements
- **Phase 0 Commit Analysis** - PREPARE_RELEASE.md now requires commit review before version determination
  - Commands to identify last release and list all commits
  - Categorization table for change types
  - Decision criteria for PATCH/MINOR/MAJOR
  - Documentation checklist with justification

### Changed
- **Session-Startup-Instructions.md** (v2.1) - Now loads Framework Development rules instead of Software Development rules
- **IDPF-PRD** (Rev 4) - Loads Anti-Hallucination Rules for PRD Work at session initialization
- **PRD-Analyst** (Rev 1.2) - Added PRD Work rules to "Load with" header
- **extract-prd** (v1.2.0) - Added PRD Work rules reference and critical guidance

### Configuration
- **Dev repo (process-docs)**: Uses Anti-Hallucination Rules for Framework Development
- **User project deployments**: Continue using Anti-Hallucination Rules for Software Development

---

## [2.3.1] - 2025-12-02

### Added

#### Testing Frameworks (7 New)
- **IDPF-Testing-Core** (#50) - Foundation framework for all testing approaches
- **IDPF-QA-Automation** (#51) - Quality Assurance and Test Automation
- **IDPF-Performance** (#52) - Performance Testing framework
- **IDPF-Accessibility** (#54) - Accessibility Testing framework
- **IDPF-Chaos** (#55) - Chaos Engineering framework
- **IDPF-Contract-Testing** (#56) - Contract Testing framework
- **IDPF-Security** (#53) - Security Testing framework

#### Development Frameworks
- **IDPF-PRD Framework** (#57) - Requirements Engineering with PRD templates
  - PRD directory structure with Templates and Specs subdirectories
  - Support for ATDD/BDD/TDD integration
  - Three PRD template variants (Comprehensive, Moderate, Lightweight)

#### Domain Specialists (2 New)
- **PRD-Analyst** (#59) - Requirements engineering and PRD authoring
- **Accessibility-Specialist** (#60) - WCAG compliance and accessibility expertise

#### Skills (4 New)
- **uml-generation** (#63) - Generate PlantUML diagrams from code
  - Class, sequence, and component diagram support
  - Language-specific patterns for Python and JavaScript
- **anti-pattern-analysis** (#4) - Detect code smells and anti-patterns
  - General, architecture, testing, and database anti-patterns
  - Language-specific patterns for JavaScript and Python
- **bdd-writing** (#58) - BDD specification and Gherkin syntax
  - Feature file templates and step definition patterns
  - Tool comparison guide (Cucumber, Behave, RSpec)
- **extract-prd** (#12) - Extract PRD from existing code
  - Test parsing guide for requirement extraction
  - NFR detection guide

#### GitHub Workflow Enhancements
- **Create-Issues commands** (#75) - Generate GitHub issues from PRD
  - `Create-Issues-Agile` - Epic/Story hierarchy
  - `Create-Issues-Structured` - Requirement/Implementation hierarchy
  - Framework-aware detection from PRD file naming
- **'finding' as bug synonym** (#73) - Trigger bug workflow with "finding:" prefix
- **Reopen workflow** - Reopen closed issues and set to in_progress

#### Reference Documentation
- **Git Worktree Patterns** (#40) - Multi-worktree development strategies
  - Windows-specific guidance for path handling
- **Platform Capabilities Reference** (#39) - OS-specific tool availability
- **Framework Transition Diagrams** (#13) - Visual workflow for framework transitions

#### Installer Improvements
- **Date confirmation** (#71) - Startup confirms date with user
- **run_claude scripts** (#68) - `run_claude.sh`/`run_claude.cmd` for easy startup
- **runp_claude scripts** (#68) - Plan mode startup scripts
- **Expansion command guidance** (#76) - Installer templates include expansion docs

### Changed
- **Framework-Overview split** (#74) - Created Framework-Summary.md (~150 lines) for reduced token consumption
  - On-demand loading of detailed documentation
  - 77% reduction in startup token usage
- **gh-workflow.md** (#62) - Reads configuration from `.gh-pmu.yml` instead of hardcoded values
- **Skills consolidated** - Merged PREPARE_SKILLS.md into Skills/MAINTENANCE.md
- **Skill packaging** (#1) - All skills packaged to Skills/Packaged/ directory
  - Automatic deployment during installation based on framework selection

### Fixed
- **SessionStart Hook Error** (#77) - Removed invalid `type: "prompt"` hooks from settings.local.json
  - `SessionStart` event only supports `type: "command"` hooks, not `type: "prompt"`
  - The `/gh-workflow` reminder is already handled via CLAUDE.md startup instructions
  - Fixed in both `install.sh` and `install.cmd` installer templates
- **Expansion commands** (#61) - Use absolute paths instead of relative
- **Batch file URL parsing** (#67) - Escape dots to prevent parsing errors
- **extract-prd PRD location** (#69) - Added file location convention
- **PRD-Analyst PRD location** (#69) - Added file location convention
- **Skill packaging paths** (#1) - Fixed incorrect file paths in skill packages

### Documentation
- **File operation anti-hallucination rules** (#21) - Added bulk operation checklist
- **Skill registry** - Updated Framework-Summary.md with 14 skills
- **17 Domain Specialists** - Updated counts in documentation

---

## [2.3.0] - 2025-11-30

### Added
- **Consolidated Startup System** - Reduce token consumption by ~70%
  - `STARTUP.md` generated with condensed essential rules
  - Simplified 4-step startup procedure (down from 7 steps)
  - On-demand expansion commands for full documentation

- **Expansion Commands** - Load full documentation when needed
  - `/expand-rules` - Load complete Anti-Hallucination Rules
  - `/expand-framework` - Load full process framework documentation
  - `/expand-domain` - Load full Domain Specialist instructions

- **Claude Code Settings** - Hooks and permissions configuration
  - `settings.local.json` generated during installation
  - SessionStart hooks for startup/compact reminders
  - Deny rules for destructive git commands

- **Framework Installation Script** - Enable external projects to use the IDPF Framework
  - `install.cmd` for Windows
  - `install.sh` for Unix/macOS/Linux
  - Interactive process framework selection (Structured, Agile, Vibe, LTS)
  - Multi-select domain specialist configuration (15 options)
  - Generates `framework-config.json`, `CLAUDE.md`, `STARTUP.md`, and expansion commands

- **Framework Manifest** (`framework-manifest.json`)
  - Identifies valid IDPF Framework installations
  - Contains framework metadata (name, version, available options)
  - Enables smart directory detection in installation scripts

- **Smart Directory Detection**
  - Scripts detect if running from framework or project directory
  - Auto-detects framework path when running from framework directory
  - Prompts for target project directory with validation
  - Creates target directory if it doesn't exist

- **GitHub Workflow Integration** (`.claude/commands/gh-workflow.md`)
  - Parameterized GitHub configuration placeholders
  - Automatic issue creation for findings and enhancements
  - Project board status management via `gh pmu`
  - Sub-issue linking via `gh pmu sub`

### Changed
- Startup procedure reduced from 7 steps to 4 steps
- Token consumption reduced by ~70% at session startup
- Updated Session-Startup-Instructions.md to v1.2
- Updated CLAUDE.md with Post-Compact Procedure section

### Removed
- `Anti-Hallucination-Rules-for-Technical-Book-Writing.md` - Removed from framework
- `Anti-Hallucination-Rules-for-Skill-Creation.md` - No longer loaded at startup (available on-demand)

---

## [2.2.0] - 2025-11-16

### Added
- **IDPF-LTS Framework** - Long-Term Support maintenance mode
  - Stability-focused development for mature projects
  - Conservative change management
  - Backward compatibility requirements

- **Framework Overview v2.2**
  - Comprehensive documentation of all 4 frameworks
  - 15 Domain Specialist profiles
  - 10 Skills catalog

### Changed
- Framework transition documentation
- Updated all framework cross-references

---

## [2.1.0] - 2025-11-01

### Added
- **IDPF-Vibe Framework** - Exploratory development with evolution paths
- Additional Domain Specialist profiles

---

## [2.0.0] - 2025-10-15

### Added
- **IDPF-Agile Framework** - Sprint-based development with user stories
- Domain Specialist System Instructions
- Skills system for reusable capabilities

### Changed
- Restructured framework documentation
- Separated core instructions from domain specialists

---

## [1.0.0] - 2025-09-01

### Added
- **IDPF-Structured Framework** - Test-Driven Development with fixed requirements
- Core Developer Instructions
- Anti-Hallucination Rules
- Initial Assistant Guidelines

---

[2.8.0]: https://github.com/rubrical-studios/process-docs/compare/v2.7.0...v2.8.0
[2.7.0]: https://github.com/rubrical-studios/process-docs/compare/v2.6.3...v2.7.0
[2.6.3]: https://github.com/rubrical-studios/process-docs/compare/v2.6.2...v2.6.3
[2.6.2]: https://github.com/rubrical-studios/process-docs/compare/v2.6.0...v2.6.2
[2.6.0]: https://github.com/rubrical-studios/process-docs/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/rubrical-studios/process-docs/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/rubrical-studios/process-docs/compare/v2.3.1...v2.4.0
[2.3.1]: https://github.com/rubrical-studios/process-docs/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/rubrical-studios/process-docs/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/rubrical-studios/process-docs/releases/tag/v2.2.0
[2.1.0]: https://github.com/rubrical-studios/process-docs/releases/tag/v2.1.0
[2.0.0]: https://github.com/rubrical-studios/process-docs/releases/tag/v2.0.0
[1.0.0]: https://github.com/rubrical-studios/process-docs/releases/tag/v1.0.0
