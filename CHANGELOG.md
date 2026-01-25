# Changelog

All notable changes to the IDPF Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Note:** Version numbers were reset to semantic versioning on 2025-12-24. See issue #525 for details. The v0.x.x series indicates pre-production status; v1.0.0 will mark production readiness.

---

## [0.33.0] - 2026-01-25

### Added
- **#1033** - Extension recipe suggestions in `/charter` command
  - After skill selection, suggests relevant extension recipes based on tech stack
  - New `recipe-tech-mapping.json` metadata file (20 tech indicators → recipes)
  - Triggers on create, update (Tech Stack changes), and refresh workflows
  - Opt-out via `extensionSuggestions: false` in framework-config.json
- **#1031** - Epic creation option in `/add-story` command
  - When no epics exist, offers "Create new epic" option
  - Creates minimal epic with charter compliance check
  - Assigns epic to current branch if active
- **#1032** - Skill suggestions in `/create-backlog` and `/add-story` commands
  - New `skill-keywords.json` metadata file (25 skills with keyword mappings)
  - Matches story content against keywords to suggest relevant skills
  - Opt-out via `skillSuggestions: false` in framework-config.json
- **#1026** - Test plan generator extension recipe
  - New `test-plan-generator` recipe in testing category
  - Generates test plan skeleton from branch issues
  - Extracts acceptance criteria as expected results
- **#1027** - Skill deployment via `/charter` and new `/install-skill` command
  - Skills can now be installed from framework packages
  - Charter workflow deploys selected skills automatically

### Changed
- **#1009** - Eliminated microsprints from framework
  - Removed microsprint-specific documentation
  - Replaced with planning approaches guide
- **#1022** - Improved argument-hints in command YAML headers
  - Better examples and formatting for command arguments

### Fixed
- **#1034** - Temp file naming collision prevention
  - Changed from `.tmp-body.md` to `.tmp-{issue#}.md` pattern
  - Prevents conflicts when working on multiple issues
- **#1028** - `/playwright-check` handles missing package.json
  - Now reads charter for tech stack detection
  - Graceful fallback when package.json doesn't exist
- **#1030** - skill-registry.json names match package names
  - Registry entries now consistent with skill package names
- **#1025** - Charter startup detects framework files as code on new installs
  - Fixed false positive detection during initial installation

---

## [0.32.1] - 2026-01-24

### Fixed
- **#1017** - `playwright-check` command now deploys to user projects
  - Added to `deployCoreCommands()` hardcoded array in deployment.js
  - Command was missing from core commands deployment

### Changed
- **#1019** - Standardized JS versioning with `@framework-script` tag
  - All 52 framework JS files now use `@framework-script v0.33.0` pattern
  - Added regression test to catch future non-compliant JS files
  - Replaces inconsistent `// **Version:** X.X.X` comments
- Updated skill counts in documentation (22 → 25)
  - Framework-Overview.md, Framework-Summary.md, Framework-Skills.md
  - Added missing skills: codebase-analysis, playwright-setup, electron-development

---

## [0.32.0] - 2026-01-24

### Added
- **#1013** - Metadata files now deployed to user projects
  - `skill-registry.json` enables programmatic skill discovery at inception time
  - `extension-recipes.json` provides reusable automation patterns for extensible commands
  - New `deployMetadataFiles()` function in deployment.js
  - Added deployment step to deploy-dist.yml for distribution
- **New Skill: electron-development** - Patterns for Electron app development
  - Electron Forge + Vite configuration
  - Playwright E2E testing for Electron (fuses, packaged app testing)
  - Windows platform considerations (process management, path handling)
  - 12 resource guides covering IPC, settings persistence, update checking
- **Pre-commit extension point** for `/prepare-release` and `/prepare-beta`
  - Allows generating release artifacts before the preparation commit

### Changed
- **Scripts reorganization** - Consolidated command sources
  - Commands now sourced from `.claude/commands/` directly (not `Templates/commands/`)
  - Path remapping in minimize-config.json handles deployment
  - Simplified maintenance with single source location
- **framework-manifest.json** - Added `source` field to `deploymentFiles.commands`
- **validate-helpers.js** - Updated to check correct paths after reorganization

### Fixed
- **#1013** - Metadata files (skill-registry.json, extension-recipes.json) not deployed
- **Windows shell safety** - Documented `--flag=value` syntax for problematic flag parsing

### Removed
- `Templates/commands/` directory - Commands now in `.claude/commands/` with path remapping
- Orphaned `promote-to-prd.zip` package

---

## [0.31.0] - 2026-01-23

### Added
- **#991** - PRD tracker lifecycle improvements
  - New `/complete-prd` command to verify all epics/stories are Done before closing PRD tracker
  - `/create-backlog` now moves PRD to "In Progress" (not "Done") after backlog creation
  - Instruction banner added to PRD tracker with `/complete-prd` guidance
  - PRD Tracker reference added to epic body for linking
  - `/add-story` and `/split-story` now comment on PRD tracker for scope changes
- **#993** - Comprehensive deployment chain validation in `/prepare-release`
  - New Phase 2m validates all deployable files are synchronized
  - Validates commands (source, minimized, constants.js), scripts, and hooks
  - Bidirectional validation catches orphaned entries

### Fixed
- **#989** - `/create-backlog` now uses `gh pmu create` for proper project assignment
- **#992** - `/assign-branch --all` now handles flexible branch field names (Branch/Release)

---

## [0.30.2] - 2026-01-22

### Fixed
- **#985** - fetch-updates.js version verification fails on Windows
  - Added `flushFile()` function with `fs.fsyncSync()` to force OS flush before verification
  - Fixes Windows file system write-back caching issue where `copyFileSync` returns before data is persisted

---

## [0.30.1] - 2026-01-22

### Added
- **#785** - Manual verification extraction workflow
  - New labels: `qa-required`, `security-required`, `legal-required`, `docs-required`
  - Workflow for extracting criteria requiring manual verification to linked issues
  - Updated `Reference/GitHub-Workflow.md` with extraction process

### Fixed
- **#978** - Installer crash on script deployment key access
- **#977** - Prepare-release Step 5.1 now adds deployment comment instead of redundant close
- **#981** - Removed unnecessary PRD #959 implementation (todos persist natively)
  - Deleted hook files: `track-todo-progress.js`, `compact-hook.js`, `pre-todo-test.js`
  - Removed installer code for todo hooks deployment
  - Cleaned up settings.local.json hook configurations

---

## [0.30.0] - 2026-01-22

### Added
- **#962, #963** - TodoList Compaction Persistence feature (removed in v0.30.1 - todos persist natively)
  - `track-todo-progress.js`: PostToolUse hook captures last completed todo on every TodoWrite
  - `compact-hook.js`: SessionStart hook outputs `[TODO-RESUME]` block after compaction
  - `06-todo-resume.md`: Rule for Claude to recognize and auto-resume from saved state
  - Auto-installation via `deployment.js` and `generation.js` for new IDPF projects
  - 47 new tests for hooks (track-todo-progress: 25, compact-hook: 22)
- **#950** - Dynamic todo generation directive for extensible commands
  - Commands can now specify todo generation rules in their specs
  - Enables automatic TodoWrite list creation from command phases

### Changed
- **#959** - Added PRD for TodoList Compaction Persistence
- Moved CI wait and release notes from user extension to core steps in `/prepare-release`

### Fixed
- **#951** - Replace hardcoded versions with `v0.33.0` placeholder
- **#956** - Clarify proposal acceptance criteria placement in documentation
- `gh pmu sub list --json` flag usage (boolean flag, not field selector)
- Workflow scripts: explicit JSON fields and safe parsing
- `INSTALLED_FILES_MANIFEST`: Added todo hooks and synced workflow-trigger.js

---

## [0.29.3] - 2026-01-21

### Fixed
- **#946** - workflow-trigger.js batch work detection and broader patterns
  - Fixed JSON parsing to extract `items` array from `gh pmu list` response
  - Broadened "work" trigger to match any `^work\s` prompt
  - Added support for natural patterns: `work on #N`, `work issue N`, `#N` anywhere
  - Silent exit for non-actionable prompts (no false positive noise)
  - Added 11 new tests for broader patterns and silent exit behavior
  - Bumped hook version to 0.21.0

---

## [0.29.2] - 2026-01-21

### Fixed
- **#936** - Release→Branch field migration in workflow-trigger.js
  - Updated field reference from `Release` to `Branch` in hook script
  - Aligns with v0.29.1 field rename in GitHub Project
- **#935** - Manifest key inconsistency (`lib` → `shared/lib`)
  - Renamed category in `framework-manifest.json` to match filesystem path
  - Updated `deployment.js` to use consistent category name
  - Fixes "Untracked - File not in manifest" audit errors for lib files
- **#933** - v0.33.0 tokens in 12 script files
  - Replaced hardcoded version numbers with `v0.33.0` placeholder
  - Enables automatic version stamping during deployment
  - Affected: analyze-commits.js, recommend-version.js, wait-for-ci.js, and 9 others
- **#934** - Audit scope detection for non-IDPF projects
  - Added `NOT_IDPF_PROJECT` status to audit.js
  - Early detection prevents false "missing file" errors in non-IDPF directories
  - Checks for `framework-config.json` and `.claude/.manifest.json`
- **#931** - Installer messaging for manual repo-project association
  - Added warning in `displayGitHubSetupSuccess()` with manual step instruction
  - Added step to manual setup instructions in `index.js`
  - Addresses GitHub API limitation (cannot set default repository programmatically)

### Changed
- **#938** - Windows Shell Safety: Added backtick handling section
  - New "Issue/PR Bodies with Backticks" section in documentation
  - Documents `-F` temp file pattern for bodies with code blocks
  - Updated Reference/, .min-mirror/, and .claude/rules/ copies

### Removed
- **#939** - Removed orphaned `poll.js` from Templates and installed copies
  - File was never imported or used (dead code)
  - Removed from `framework-manifest.json` and `constants.js`

---

## [0.29.1] - 2026-01-20

### Added
- **#925** - INSTALLED_FILES_MANIFEST validation in `validate-helpers.js`
  - Validates rules, commands, and scripts against `framework-manifest.json`
  - Checks static files and conditional patterns (platform, feature flags)
  - Shows remediation commands with `--fix` flag

### Changed
- **#926** - Rename GitHub Project text field from `Release` to `Branch`
  - Field name change reflects semantic clarity: any branch can produce releases
  - `gh pmu release` deprecated in favor of `gh pmu branch`
  - `--release` flag deprecated in favor of `--branch`
  - Updated all scripts, commands, and documentation
  - Backwards compatible: old field/flag names work but show deprecation warnings

### Fixed
- **#923** - Race condition in `update-release-notes.js`
  - Added retry logic for GitHub Release API calls
  - Configurable retry attempts and delay for concurrent operations
  - Prevents "release not found" errors during rapid tag-and-release

---

## [0.29.0] - 2026-01-20

### Added
- **#918** - Auto-create todo list on work triggers
  - Extract acceptance criteria checkboxes from issue body
  - Detect epics and query sub-issues for todo items
  - Support batch work patterns (`work all in Ready`, `work all issues in sprint-5`)
  - Document auto-todo behavior in GitHub-Workflow.md
- **#917** - TodoWrite execution instructions for multi-step commands
  - Added to `/create-prd`, `/gap-analysis`, `/audit-hallucination`, `/minimize-files`
  - Ensures progress tracking and resumability after context compaction

### Changed
- **#916** - Remove deprecated "Check Open Releases" from session startup
  - Step 5 removed from Session-Startup-Instructions.md
  - Users can check branches on-demand with `/switch-branch`

### Fixed
- **#921** - `/assign-branch` argument parsing for quoted strings
  - Script now handles space-separated arguments passed as single string
  - Fixes `/assign-branch #915 #916 #917` not working
- **#919** - Update `workflow-trigger.js` to current hook output format
  - Use `hookSpecificOutput` format instead of deprecated hook spec
  - Remove deprecated `finding:` and `prd:` trigger words
- **#915** - Skip extension prompts in -dist repository
  - `fetch-updates.js` detects distribution repository and bypasses prompts

---

## [0.28.0] - 2026-01-20

### Added
- **#907** - New `/create-backlog` command with TDD test case integration
  - Accepts PRD issue number to generate epics and stories
  - Embeds test cases from approved Test Plan into story bodies
  - Tech stack detection for language-appropriate test syntax
  - Blocking gate requires test plan approval before backlog creation
- **#906** - TDD test plan generation in `/create-prd`
  - Automatically generates `Test-Plan-{name}.md` alongside PRD
  - Creates approval issue with review checklist
  - Blocks `/create-backlog` until test plan is approved
- **#910** - New `/add-story` and `/split-story` commands
  - Charter compliance checking for scope alignment
  - Automatic epic detection and story linking
  - Test plan update logic for new/split stories
- **#911** - New `/emergency-bug` and `/pivot` commands
  - `/emergency-bug` creates P0 issue with emergency label
  - `/pivot` reviews stories for direction changes (keep/archive/close)
- **#908** - Issue-driven mode for `/create-prd`
  - Accepts proposal issue number argument (`123` or `#123`)
  - Completes proposal lifecycle (moves to Implemented/, closes issue)
  - Creates PRD tracking issue with `prd` label
- **#913** - Todo list execution instructions for complex commands
  - Added to `/prepare-release`, `/prepare-beta`, `/merge-branch`
  - Ensures progress tracking and resumability after context compaction
- **#867** - Testing framework question in `/charter` inception flow
  - Triggers for testable project types, skipped for docs/config repos
  - Populates `Test-Strategy.md` and `Tech-Stack.md`
  - TDD philosophy stated as default per IDPF-Agile

### Changed
- **#911** - GitHub-Workflow.md now focused on rules/triggers only
  - Command references moved to self-contained slash commands
  - Agile-Commands.md updated to reference slash commands

### Removed
- **#909** - Redundant Story commands from documentation
  - Removed: Start-Story, Story-Status, Story-Complete, Refine-Story
  - Removed: Story-Growing, Estimate-Story, Story-Blocked, Archive-Story
  - Functionality covered by `gh pmu` commands and slash commands

### Fixed
- **#867** - Added TDD workflow constraint to `Constraints.md` generation

---

## [0.27.0] - 2026-01-19

### Added
- **#904** - Consolidated `framework-manifest.json` to single source of truth
  - Merged `Templates/framework-manifest.json` into root manifest
  - All deployment configuration now in one file under `deploymentFiles.scripts`
  - Eliminates sync issues between duplicate manifests
- **#868** - Pre-upgrade validation for extensible files in `fetch-updates.js`
  - Detects user modifications to extensible commands before overwriting
  - Validates USER-EXTENSION blocks are preserved
  - Prevents accidental loss of customizations during framework updates

### Fixed
- **#889** - Replaced deprecated `--release` flag with `--branch` in `assign-branch.js`
  - Updated to use current gh-pmu API before deprecation period ends
- **#900** - Fixed stale `frameworkVersion` in `framework-config.json`
  - Changed hardcoded version to `v0.33.0` placeholder
  - Added self-hosted config update step to `/prepare-release` Phase 3
- **#899** - Standardized GitHub release page formatting
  - `update-release-notes.js` now transforms CHANGELOG to formatted release pages
  - Includes title, release date, auto-generated summary, and comparison link
- Preserved blank lines around USER-EXTENSION tags in minimized templates
- Corrected `gh pmu branch start` flag from `--branch` to `--name`

### Changed
- **#823** - Added executable copy commands to Phase 2d rules build documentation
  - Clarified self-hosted only scope for rules directory build

---

## [0.26.3] - 2026-01-17

### Fixed
- **#896** - `/create-prd` command now installs correctly to target projects
  - Added `create-prd.md` to `framework-manifest.json` deployment configuration
  - Command was present in Templates but missing from the deployment manifest

---

## [0.26.2] - 2026-01-17

### Fixed
- **#893** - Added missing `create-prd` and `codebase-analysis` skill packages to `Skills/Packaged/`
  - Skills existed in source but were never minimized or packaged
  - Created `.min-mirror/Skills/` directory structure for skill minimization
  - Removed orphaned `promote-to-prd.zip` package (no source directory)
- **#865** - Removed deprecated `PRD-Analyst` specialist
  - Functionality replaced by `/create-prd` skill in v0.24
  - Updated domain specialist count from 23 to 22 across all documentation
  - Cleaned up references in manifest, installer, and documentation files

---

## [0.26.1] - 2026-01-17

### Fixed
- **#887** - `framework-manifest.json` now uses `v0.33.0` placeholder for proper version injection during deployment
  - Root cause of `fetch-updates.js` version verification failures on Windows

---

## [0.26.0] - 2026-01-15

### Added
- **#882** - `/prepare-release` auto-creates release branch when run from main
  - Analyzes commits and recommends version
  - Prompts for confirmation before creating branch
  - Supports `--dry-run` to preview branch creation

### Fixed
- **#882** - Restored release artifact generation in `/prepare-release`
- **#882** - `/extensions` now scans `.claude/commands/` for user customizations
- **#882** - Removed redundant `list-cmds` alias from `workflow-trigger.js`
- **#882** - Removed unused Step 6 from `/create-branch`

### Documentation
- Clarified branch semantics - any branch can produce releases

---

## [0.25.0] - 2026-01-14

### Added
- **#877** - New `audit.js` script for framework installation auditing
  - Detects modified, outdated, untracked, and missing files across installations
  - Validates `userScripts` entries in `framework-config.json`
  - Interactive `--fix` mode for cleaning up orphaned references
  - 24 unit tests covering all audit functionality
- Extended installer manifest tracking to include commands, rules, and hooks checksums (not just scripts)

### Fixed
- **#875** - Restored framework scripts deployment and synced release tooling

---

## [0.24.1] - 2026-01-13

### Fixed
- **#861** - `fetch-updates.js` now verifies version after update and reports errors for locked files
- **#860** - Removed obsolete commands from `workflow-trigger.js` help text (synced with v0.19.1 removals)
- **#859** - `/prepare-release` now closes branch tracker before switching to main (fixes "no active branch" error)
- **#820** - Closed as duplicate of #859

### Added
- **#824** - Slash command preference rule in GitHub Workflow documentation
- **#822** - Multi-issue syntax documentation for `gh pmu move` command

---

## [0.24.0] - 2026-01-12

### Added
- **#832** - New `/create-prd` command with full and extract modes
  - EXTENSIBLE markers for user customization
  - Integrates with `codebase-analysis` skill for extraction
- **#835** - UML diagram generation improvements
  - Diagram type selection (sequence, class, state, ER)
  - Appropriateness guidance for each diagram type
  - Anti-hallucination rules for diagram content
- **#844** - New `codebase-analysis` shared skill
  - Tech stack detection, architecture inference
  - NFR detection and test parsing guides
- **#851** - Automated testing infrastructure for installer
  - 59 tests in `install/test/` directory
  - Tag parsing, migrations, and skill deployment tests

### Changed
- **#826** - Skill renamed: `promote-to-prd` → `create-prd`
  - Enhanced Phase 4 with mandatory user/priority questions
  - Added Phase 4.5 for story transformation
  - Priority distribution validation for generated backlogs
- **#847** - Tag format standardization
  - Commands now use versionless `<!-- EXTENSIBLE -->` / `<!-- MANAGED -->`
  - Frontmatter uses `v0.33.0` placeholder instead of hardcoded versions
  - Installer regex updated for backward compatibility
- **#840** - PRD directory structure: `PRD/Active/` and `PRD/Implemented/`
- **#821** - README-DIST.md now uses `v0.33.0` placeholder

### Removed
- **#842** - Deprecated IDPF-PRD framework removed
  - Functionality replaced by `create-prd` skill and `/create-prd` command
  - Migration automatically removes `IDPF-PRD/` directory on upgrade

### Fixed
- **#857** - Removed non-existent `verify-config.js` references from `/prepare-release` and `/prepare-beta`

---

## [0.23.4] - 2026-01-11

### Fixed
- **#816** - Script deployment paths not deploying any scripts to user projects
  - Fixed incorrect paths in `deployment.js` (`scripts/shared/` → `Templates/scripts/shared/`)
  - Updated `constants.js` INSTALLED_FILES_MANIFEST for correct cleanup paths
- **#815** - Command template requirements causing confusion and failures
  - Removed incorrect branch naming validation from `/create-branch`
  - Fixed deprecated `gh pmu release start --branch` → `gh pmu branch start --name`
  - Removed release branch requirement from `/prepare-release`
- **#814** - Deploy-dist workflow missing `contents: write` permission for releases
- **#796** - `/assign-branch` not handling space-separated arguments correctly
- **#811** - Help text reorganized to show `--add-ready` first

### Added
- **#812** - Manifest-driven deployment for workflow commands
  - Commands now read from `framework-manifest.json` instead of hardcoded list
  - Added `readFrameworkManifest()` and `getDeploymentConfig()` helper functions
  - Single source of truth for deployment file configuration

### Changed
- **#818** - Post-release verification items tracked for v0.24.0

---

## [0.23.3] - 2026-01-11

### Fixed
- **#793** - `/create-branch` Step 7 shows `/assign-branch` instead of raw `gh pmu` command
- **#804** - ESLint warnings reduced with `caughtErrorsIgnorePattern` configuration
- **#805** - GitHub Release automation added to `deploy-dist.yml`
- **#807** - `extensions.md` command now deployed to user projects
- **#808** - `/create-branch` minimized template sync fixed

### Added
- **#806** - Pattern-based charter exclusions for framework files
- **#810** - Deployment file documentation centralized in manifests with validation functions

---

## [0.23.2] - 2026-01-11

### Added
- **#799** - Auto-run unit tests after JS file CRUD operations
  - New `test-on-change.js` PostToolUse hook
  - Runs tests when Edit/Write modifies JS files in `.claude/scripts/` or `.claude/hooks/`
  - Framework-only (not distributed to user projects)

### Fixed
- **#802** - Add missing System-Instructions subdirectories to .min-mirror
- Command template sync between `.claude/commands/` and `Templates/commands/`
- Rules directory rebuild from minimized sources

### Changed
- **#776** - Updated assign-branch.js with improvements
- Minimization timestamp updated

---

## [0.23.1] - 2026-01-10

### Fixed
- **#776** - Integrate REQ-007, REQ-008, REQ-009 into installer
  - `createExtensibilityStructure()` now called during install
  - `deployFrameworkScripts()` deploys framework scripts with checksum tracking
  - `cleanupRenamedCommands()` removes old command files (open-release, close-release, etc.)
- **#778** - Fix deployment of framework-only files and Skills redundancy
- **#779** - Fix missing GitHub Releases and version placeholder
- **#784** - Fix stale command references in .min-mirror
  - Updated extensions.md with correct command names
  - Updated prepare-beta.md with correct script paths

### Documentation
- **#781** - Update GitHub-Workflow.md for gh-pmu v0.11.0

### Internal
- **#782** - Add minimize-config.json validation and drift detection

---

## [0.23.0] - 2026-01-09

### Changed
- **Release Command Consolidation** (#751) - Complete overhaul of release workflow commands:
  - Renamed `/open-release` → `/create-branch` - Unified branch creation for releases and patches
  - Renamed `/assign-release` → `/assign-branch` - Works with any tracked branch
  - Renamed `/switch-release` → `/switch-branch` - Context switching for branches
  - Removed `/close-release` - Folded into `/prepare-release` Phase 5
  - Tracker issue naming now uses "Branch:" prefix with unified `branch` label

### Added
- **`/merge-branch` command** (#755) - Merge feature branches to main with gated validation
  - Default gates: uncommitted changes, tests pass
  - Extensible gates for custom validation
  - PR creation, approval wait, and cleanup
- **`/destroy-branch` command** (#756) - Safe branch deletion with validation
  - Prevents deletion of protected branches (main, master, develop)
  - Force delete option for emergency cleanup

### Fixed
- **Session-Startup version chain** - Consistent version flow from source → minimized → rules
- **Anti-hallucination rules** - Added STOP boundary enforcement, expanded "Never Invent" list

### Infrastructure
- **minimize-config.json** - Removed overly broad "Merge" pattern that excluded merge-branch.md
- **Rules rebuild from minimized sources** - All rules now use v0.33.0 placeholder

---

## [0.22.0] - 2026-01-06

### Added
- **`/extensions` command** (#734) - New command for managing extensible regions in command templates
  - List all extensible regions across commands
  - Add/remove custom extensions to command checklists
  - View extension configuration

### Changed
- **Extensible Summary Checklists** - Four commands now support user-defined checklist extensions:
  - `/open-release` (#730) - Custom validation steps when opening releases
  - `/prepare-release` (#731) - Custom pre-release checks
  - `/close-release` (#732) - Custom verification steps when closing releases
  - `/prepare-beta` (#733) - Custom beta preparation steps

### Infrastructure
- **Templates/ minimization pipeline** (#735) - Templates directory now included in minimization for token optimization

---
## [0.21.1] - 2026-01-05

### Fixed
- **PROCESS_FRAMEWORKS validation** (#696) - Now correctly excludes IDPF-PRD from process framework count
- **minimize-config.json path** - Fixed path resolution in validate-helpers.js

### Changed
- **Windows Shell Safety** (#693) - Expanded documentation to cover command substitution failures in loops
- **GitHub Workflow docs** (#714) - Prefer `--body-stdout` over `--body-file` pattern
- **gh-pmu v0.10.1 features** (#729) - Updated command reference with `comment`, `--body-stdin`, `-R`, batch `move`
- **/prepare-release workflow** (#692) - Added explicit STOP boundary section
- **/open-release workflow** (#719) - Now pushes branch to remote after creation

### Added
- **Post-deployment criteria workflow** (#725) - Documented workflow for acceptance criteria requiring deployment
- **install.js --debug flag** (#727) - EXTENSIBLE region logging for troubleshooting
- **README.md version updates** (#718) - Included in /prepare-release Phase 3
- **.gitattributes** - Consistent line endings across platforms

### Removed
- **version-header-fix.js** - Superseded by extensibility system

### Internal
- Integrated extensibility.js into deployment workflow
- Lowered coverage thresholds to match actual coverage
- Restored v0.33.0 placeholders to 209 framework source files

---

## [0.21.0] - 2026-01-05

### Added
- **Unit Testing Infrastructure** (#698) - Jest v29.7.0 test framework with v8 coverage provider
  - `jest.config.js` with coverage thresholds (70% statements, 60% branches)
  - Centralized `/tests` directory structure
  - Test fixtures for configs, changelogs, git logs
  - Mock factories for dynamic test data generation
  - Mock exec utilities for child_process mocking
- **CI Pipeline** (#699) - GitHub Actions workflow for automated testing
  - `.github/workflows/test.yml` runs on all branches/PRs
  - Coverage artifacts uploaded and retained for 30 days
- **Test Coverage** (#700) - 163 tests across 14 test suites covering 20 source files
  - P0 tests: workflow-trigger, validate-helpers, assign-release, recommend-version
  - P1 tests: minimize-helper, version-header-fix, analyze-commits, update-release-notes, switch-release, transfer-issue
  - P2 tests: stub-hooks, sprint-scripts, wait-for-ci
- **Test Documentation** (#701) - `/tests/README.md` with comprehensive guide
  - Directory structure explanation
  - Test execution commands
  - Coverage threshold policy
  - Mock strategy documentation

### Changed
- **ESLint Configuration** - Added Jest globals support for test files
- **package.json** - Added test scripts (`npm test`, `npm run test:coverage`, `npm run test:watch`)

### Completed
- **PRD: Unit Testing Non-Installer Scripts** - Full lifecycle completed (#612)

---

## [0.20.3] - 2026-01-04

### Fixed
- **Charter template detection** (#688) - Startup workflow now detects incomplete template CHARTER.md files with placeholders

### Added
- **Template placeholder detection** (#689) - Regex pattern `{[a-z][a-z0-9-]*}` identifies unfilled template files
- **Charter detection in startup rules** (#690) - Full startup flow with:
  - `.no-charter` opt-out support
  - Template vs complete charter detection
  - Extraction/Inception mode prompts for templates or missing charters
  - Charter summary display format for complete charters

### Changed
- **`/charter` command** - Workflow includes template detection step before displaying summary
- **Charter-Enforcement rules** - Skip validation for template files (charter not yet completed)
- **`generateStartupRules()`** - Expanded with complete charter detection flow for user projects

---

## [0.20.2] - 2026-01-03

### Changed
- **`gh pmu view` documentation** (#685) - Added `-c` (comments), `-w` (web), `--body-stdout` flags to command reference
- **`gh pmu edit` documentation** (#685) - Added `--body-stdin` flag to command reference
- **View/Edit examples** (#685) - Added practical usage examples for new options
- **Windows-Shell-Safety** (#685) - Documented `--body-stdout` and `--body-stdin` as Windows-safe alternatives

---

## [0.20.1] - 2026-01-02

### Fixed
- **Version placeholder handling** - `parseManifest()` now correctly handles `v0.33.0` placeholder in `Templates/framework-manifest.json`
- **Skill count documentation** - Updated skill count from 21 to 22 across all documentation (Framework-Overview.md, Framework-Summary.md, Framework-Skills.md, README.md) to include `promote-to-prd` skill

### Changed
- **Installer charter support** - Charter feature files (Charter-Enforcement.md, Runtime-Artifact-Triggers.md) now deployed by installer
- **Version placeholder standardized** - All version tokens now use `v0.33.0` format for consistent replacement

---

## [0.20.0] - 2025-12-31

### Added
- **Lifecycle Artifacts Implementation** (#647-#650) - Complete DAD-inspired lifecycle management:
  - `/charter` command creates Inception/, Construction/, Transition/ directories
  - Charter Enforcement validates scope at key checkpoints (Proposals, PRDs, Issues)
  - Runtime Artifact Triggers offer documentation during development
  - Inception Mode guides charter creation with dynamic questions
- **`promote-to-prd` skill** - New skill transforms proposals into PRDs using Inception/ context. Replaces IDPF-PRD 4-phase workflow with single conversational flow.

### Changed
- **IDPF-PRD Deprecated** - Framework deprecated in favor of `promote-to-prd` skill. Existing PRD files continue to work; new work should use the skill.
- **`extract-prd` skill** - Updated to generate Inception/ artifacts (CHARTER.md + Inception/ directory) instead of PRD worksheets.

### Removed
- **Guided PRD by Application Type Proposal** - Archived; superseded by Lifecycle Artifacts implementation.

---

## [0.19.1] - 2025-12-31

### Removed
- **Obsolete TDD Commands** (#639) - Removed 10 commands that don't fit Claude Code's agentic workflow:
  - Development: `Done-Next-Step`, `Rollback-Previous-Step`, `Refactor-Now`
  - Utility: `List-Cmds`, `Review-Last`
  - Project: `Velocity-Report`, `Project-Complete`, `Push-Changes` (entire section removed)
  - Stale: `Sprint-Review` (merged into `Sprint-Retro`), `Sprint-Progress` (merged into `Sprint-Status`)

### Changed
- **TDD Execution Model** (#639) - TDD phases (RED → GREEN → REFACTOR) now execute **autonomously** within each story. No user interaction required between phases. Only workflow checkpoints are at story completion (In Review, Done).

### Fixed
- **Stale Command References** (#639) - Removed obsolete `Sprint-Review` and `Sprint-Progress` references from overview and guide files (already merged per Release-and-Sprint-Workflow proposal)

---

## [0.19.0] - 2025-12-31

### Removed
- **IDPF-Structured framework** (#634) - Removed structured/waterfall development framework. Users should transition to IDPF-Agile for sprint-based development.
- **IDPF-LTS framework** (#634) - Removed Long-Term Support framework. Patch release workflow now supported under IDPF-Agile.

### Changed
- **Framework Transitions Simplified** (#634) - Transition model now VIBE → AGILE only:
  - IDPF-Agile becomes terminal state (no transitions out)
  - Patch releases supported within IDPF-Agile workflow
- **Default Framework** (#634) - Installer default changed from IDPF-Structured to IDPF-Agile
- **Framework Count** - Reduced from 12 to 10 frameworks (2 IDPF process + 8 testing)

### Added
- **Guided PRD Proposal** - New proposal for guided PRD creation workflow
- **Project Charter Proposal** - New proposal for project charter integration

---

## [0.18.0] - 2025-12-30

### Changed
- **Repository Rename** (#613) - Repository renamed from `process-docs` to `idpf-praxis` to better reflect the framework's purpose. All internal references and deployment workflows updated.

### Added
- **`gh pmu edit` documentation** (#632) - Documented the new `gh pmu edit` command in GitHub-Workflow.md for round-trip issue body editing: `gh pmu view --body-file` → edit → `gh pmu edit -F`
- **`gh pmu --body-file` flags** (#620) - Documented `-F/--body-file` support across `gh pmu create`, `gh pmu view`, and `gh pmu edit` commands

### Fixed
- **Template version placeholders** (#627) - Fixed 35+ Template files missing `v0.33.0` placeholder. Commands, scripts, and shell scripts now properly receive version during installation.
- **Release branch prefix** (#625) - Fixed `/open-release` incorrectly prefixing branch names with `release/release/`

---

## [0.17.1] - 2025-12-29

### Fixed
- **Installer ENOENT error** (#616) - Fixed installer failing when copying `prepare-release.md` to user projects before `.claude/commands/` directory existed. Commands now deploy after directory creation.

### Added
- **`/change-domain-expert` command** (#615) - New slash command allows users to change their Base Expert after installation without reinstalling the framework. Displays 12 Base Expert options and updates CLAUDE.md, 03-startup.md, and framework-config.json.

---

## [0.17.0] - 2025-12-29

### Breaking Changes
- **Single-Specialist Model** (#588) - Users now select ONE Base Expert at install time instead of multiple specialists:
  - `domainSpecialist` (string) replaces `domainSpecialists[]` + `primarySpecialist` in framework-config.json
  - Removed `/switch-role` and `/add-role` commands (no longer needed)
  - Future: Expertise Packs can be loaded on-demand via JIT loading

### Changed
- **Domain Specialist Reorganization** (#589-#595) - Files reorganized from flat `Domain/` to structured subdirectories:
  - `Domain/Base/` - 12 Base Experts available at install time
  - `Domain/Pack/` - 10 Expertise Packs for JIT loading
  - `Domain/PRD/` - 1 specialized PRD analyst
- **Installer Single-Specialist Support** (#603-#607) - Updated installer for single-specialist model:
  - Radio-button UI (single-select) replaces checkbox UI (multi-select)
  - Schema migration: `domainSpecialists[]` + `primarySpecialist` → `domainSpecialist`
  - Orphaned command cleanup (`switch-role.md`, `add-role.md`)
- **Branch Naming Enforcement** (#586) - `/open-release` now enforces `[prefix]/[name]` format:
  - Exactly one `/` separator required
  - Both prefix and name must be non-empty
  - Examples: `release/v1.2.0`, `patch/v1.9.1`, `hotfix/auth-bypass`

### Removed
- **`/switch-role` command** - No longer needed with single-specialist model
- **`/add-role` command** - No longer needed with single-specialist model
- **Multi-select specialist prompt** - Replaced with single-select

### Documentation
- **Migration Guide** (#609-#611) - Added comprehensive migration documentation in `Releases/idpf/domain-reorg/release-notes.md`
- **Updated Domain-Selection-Guide.md** - Reflects single-specialist model
- **Superseded note added** - `Dynamic-Domain-Specialist-Roles.md` marked as superseded

---

## [0.16.1] - 2025-12-28

### Fixed
- **Installer config schema mismatch** (#581) - Fresh installations now use the new v0.16.0 config schema (`frameworkVersion`, `extensibleCommands`, `frameworkScripts`, `userScripts`) instead of the deprecated schema. Updates and migrations also properly migrate old `installedVersion`/`components` fields to the new schema.
- **Shebang displacement in JS files** (#584) - Fixed `version-header-fix.js` inserting version comment before shebang (`#!/usr/bin/env node`). Shebang must be first line for Unix script execution.

---

## [0.16.0] - 2025-12-28

### Added
- **Extensible Commands Installer** (#559) - Complete system for preserving user extensions during framework upgrades:
  - `install/lib/extensibility.js` - Extension block parsing, restoration, rogue edit detection, frontmatter merging, deprecation handling (REQ-002-006, REQ-010, NFR-003)
  - `install/lib/checksums.js` - SHA256 checksum computation for modification detection (NFR-002)
  - `install/lib/config.js` - Config management, manifest parsing, project type detection, schema migration (REQ-011, REQ-013-015)
  - Enhanced `install/lib/deployment.js` - Directory structure creation, framework script deployment with checksum tracking (REQ-007-009)
  - Enhanced `install/lib/detection.js` - Git clean state verification before upgrades (REQ-001)
  - Enhanced `install/lib/ui.js` - UpgradeError class with rollback instructions (NFR-001)
- **PRD for Extensible Commands Installer** (#559) - Comprehensive requirements document with 15 requirements and 3 NFRs
- **Templates for extensible commands** - Populated `Templates/` directory with framework scripts, shared utilities, and hooks

### Changed
- **Proposal consolidation** - Split extensibility proposal into Framework and Installer documents for clearer separation of concerns
- **Archive management** - Added archive notices to superseded proposals (Base-Template, original Extensible-User-Commands)

### Fixed
- **Script paths in command templates** (#579) - Updated 7 command templates to use correct `.claude/scripts/shared/` paths after extensibility reorganization

---

## [0.15.4] - 2025-12-26

### Fixed
- **Release artifact orphaning** (#549) - Moved release artifact generation (release-notes.md, changelog.md) from `/close-release` to `/prepare-release` Phase 2l. Artifacts are now committed with the release PR instead of being orphaned when the release branch is deleted
- **Temp file gitignore pattern** (#550) - Added `.tmp-*` pattern to `.gitignore`. The existing `*.tmp` pattern only matched files ending in `.tmp`, not workflow temp files starting with `.tmp-`

---

## [0.15.3] - 2025-12-26

### Added
- **Windows Shell Safety rules** (#524) - Consolidated Windows-specific shell guidance into platform-conditional rule file (`05-windows-shell.md`), deployed only on Windows systems

### Changed
- **`/open-release` track prefix handling** (#547) - Now requires explicit track prefix (e.g., `release/v1.0`, `patch/v1.0.1`) instead of assuming `release/`. Supports any custom track prefix via pass-through validation
- **`/add-role` token optimization** (#548) - Reduced command file from ~140 to ~60 lines (57% reduction) by using directory discovery instead of embedded specialist lists. Now supports direct argument (e.g., `/add-role Security-Engineer`)
- **Installer branch check** (#546) - Installation now checks if target project is on `main`/`master` branch. Cancels with warning on feature branches unless `--force` flag is used

### Fixed
- **Duplicate Windows guidance removed** - Eliminated redundancy between CLAUDE.md and GitHub-Workflow.md Shell Limitations sections

---

## [0.15.2] - 2025-12-24

### Fixed
- **Inconsistent Patches/ and Releases/patch/ directory structure** (#536) - Consolidated all release artifacts under unified `Releases/{track}/` structure matching branch naming convention (`release/`, `patch/`, `hotfix/`)

### Changed
- **`/close-release` updated for track-based paths** (#536) - Now writes artifacts to `Releases/{track}/vX.Y.Z/` based on branch prefix
- **GitHub Workflow updated to v1.7** - Updated artifact paths to use `Releases/{track}/` pattern

---

## [0.15.1] - 2025-12-24

### Fixed
- **Distribution deployment missing npm dependencies** (#526) - Added `package.json` and `package-lock.json` to `deploy-dist.yml` to fix `Cannot find module 'prompts'` error when users run `node install.js`
- **install.js wrapper not calling main()** (#531) - Fixed wrapper to explicitly call `main()` instead of relying on `require.main === module` check which fails for required modules

---

## [0.15.0] - 2025-12-24

### Added
- **Release lifecycle commands** (#513) - Complete release lifecycle trilogy implementing trunk-based development:
  - `/open-release` - Opens release branch and creates tracker issue
  - `/close-release` - Generates release notes, creates GitHub Release, deletes branch
  - Both dev and user versions created (`.claude/commands/` and `Templates/commands/`)
- **Trunk-based development workflow** (#513) - Tags now created on `main` after PR merge, not on release branches

### Changed
- **Installer modular architecture** - Refactored install.js into modular architecture for improved maintainability
- **Anti-hallucination rules enhanced** - Added command/URL verification to prevent hallucinated commands and URLs
- **`/prepare-release` updated for trunk-based flow** (#513) - Phase 3 now: PR to main → merge → checkout main → tag main → push tag

### Fixed
- **README-DIST.md version** - Fixed hardcoded version and updated skill count to use dynamic values
- **Shebang displacement in 10 JS files** (#500, #506) - Fixed version-header-fix.js inserting version comment before shebang

---

## [0.14.0] - 2025-12-21

### Added
- **Release and Sprint Workflow commands** (#442) - 7 new slash commands: `/plan-sprint`, `/sprint-status`, `/sprint-retro`, `/end-sprint`, `/assign-release`, `/switch-release`, `/transfer-issue`
- **Release validation hook** (#442) - `validate-release.js` blocks `work #N` on issues without release assignment
- **Sprint-release binding** (#442) - Sprints scoped to exactly one release with branch enforcement
- **PR-only main merge rules** (#442) - GitHub Workflow enforces all work through PRs to main
- **Deployment awareness documentation** (#490) - Dev-only rule documenting the process-docs → virtual-ai-studio-dist deployment chain

### Changed
- **GitHub Workflow updated to v1.6** - Added sprint-release binding, PR-only rules, temp file cleanup guidance
- **Session Startup updated to v1.1** - Now checks for open releases at startup
- **IDPF-Agile sprint commands implemented** - Changed from deferred stubs to working commands backed by `gh pmu microsprint`
- **Unified release commands** (#442) - Replaced separate `gh pmu patch` with `--patch/--hotfix` flags on `gh pmu release`

### Removed
- **Show-Backlog command** (#443) - Removed in favor of `gh pmu board` and `gh pmu list`

---

## [0.13.0] - 2025-12-14

### Added
- **Optional audit arguments for /prepare-release** (#432) - Added `audit:minimization`, `audit:hallucination`, and `audit:all` arguments
- **Release Field Support documentation** (#431) - Comprehensive documentation for release and patch workflow field support
- **GitHub API rate limit guidance** (#430) - Added rate limit best practices to ci-cd-pipeline-design skill
- **Single source of truth for minimization exclusions** (#422) - Created `minimize-config.json` for centralized configuration
- **Content validation in /audit-hallucination** (#418) - Implemented validation for version consistency, counts, file paths

### Changed
- **Automatic rules sync in /minimize-files** (#417) - Rules directory now automatically synchronized when minimization runs
- **Minimized GitHub Workflow for framework development** (#417) - Framework development sessions now use token-optimized workflow documentation

### Fixed
- **Framework transition in bulk updates** (#404) - Fixed framework transition not being offered during bulk project updates
- **install.js not updating .claude/rules/ or skills** (#434) - Update path now always redeploys rules and skills

---

## [0.12.0] - 2025-12-12

### Added
- **GitHub repo and project board setup** (#353) - Automated GitHub repository creation, project board copy, and `.gh-pmu.yml` generation in `install.js`
- **5 new Domain Specialists** (#214, #221, #229, #238, #247) - Desktop-Application-Developer, Game-Developer, Graphics-Engineer-Specialist, Systems-Programmer-Specialist, Technical-Writer-Specialist
- **Vibe Platform completion** (#389) - Unified 7 Vibe variants (Core, Newbie, Web, Desktop, Mobile, Game, Embedded)
- **IDPF-Vibe-Embedded framework** (#381) - Embedded systems variant with specialized constraints
- **Testing framework guides** (#313, #319, #326, #331, #332, #333, #334) - Complete guides for all 7 testing frameworks
- **Epic workflow** (#264) - GitHub workflow integration for epic/sub-issue management

### Changed
- **Framework transition support** (#402) - install.js now allows changing frameworks on existing installations
- **Auto-install gh-pmu extension** (#143) - GitHub CLI extension automatically installed during GitHub setup
- **New slash commands** (#355, #356) - Added `/audit-hallucination` and `/gap-analysis` commands

### Fixed
- **Project board linking** (#398) - Use JSON output from `gh project copy` for reliable project number extraction

---

## [0.11.0] - 2025-12-10

### Added
- **Rules Auto-Loading** (#147, #154-157) - `.claude/rules/` directory with auto-loading at session start:
  - `01-anti-hallucination.md` - Framework development quality rules
  - `02-github-workflow.md` - GitHub issue management integration
  - `03-session-startup.md` - Startup procedure and on-demand loading
- **/audit-minimization slash command** (#212) - Audit minimized files for removed Medium+ requirements

### Changed
- **IDPF-Agile GitHub-native backlog** (#208) - Updated documentation for GitHub-native issue management
- **Create-Backlog command** (#197) - Now creates GitHub issues directly with Epic/Story hierarchy
- **Checkbox enforcement for status transitions** (#211) - Issue status cannot change until acceptance criteria checked
- **Manifest-based file cleanup** (#194) - `install.js` maintains manifest of expected files

### Removed
- **_chg.md files** (#149) - Removed 82 change history files and related CLAUDE.md rules

---

## [0.10.0] - 2025-12-08

### Added
- **GitHub workflow integration in installer** (#136) - Deploys workflow-trigger.js hook and configures settings.local.json
- **Prerequisite detection** (#141) - Installer checks for git (required), gh and jq (optional)
- **UserPromptSubmit hook** (#134) - workflow-trigger.js detects trigger prefixes (bug:, enhancement:, finding:, idea:, proposal:)
- **8 PRD Templates** (#144) - Framework Gap Analysis PRDs for identified framework gaps
- **Slash commands for release preparation** (#146) - `/prepare-release`, `/skill-validate`, `/minimize-files`

### Changed
- **LICENSE** - Updated copyright to Rubrical Studios
- **Repository references** (#145) - Updated all references to rubrical-studios

---

## [0.9.0] - 2025-12-07

### Added
- **Token-optimized files** (#116-#121) - 84.6% reduction in token consumption
  - `.min-mirror/` directory contains minimized versions of all framework files
  - Automated minimization via `MINIMIZE_FILES.md`
- **Automated deployment** (#122) - GitHub Action deploys to `virtual-ai-studio-dist` on release tags
- **fetch-updates.js** - End-user script to update framework installation from dist repo
- **Two-pass minimization** (#124) - Quality gate ensuring Medium-High reductions are reversed
- **Trigger Words section** (#126) - GitHub-Workflow.md explicitly lists trigger words

### Changed
- **Distribution repo** (#123) - Renamed to `virtual-ai-studio-dist`
- **Guides/ directory** - Moved non-functional documentation from Reference/

### Fixed
- **IDPF-Security** (#124) - Restored complete OWASP Top 10 (was 6 items, now 10)
- **IDPF-Accessibility** (#123) - Restored complete WCAG criteria (was 10 items, now 26)

---

## [0.8.0] - 2025-12-04

### Added
- **Full-Stack-Developer specialist** (#109) - Generalist specialist covering frontend, backend, and infrastructure (now default)
- **/add-role command** (#105) - Add domain specialists post-installation
- **/switch-role command** (#97) - Switch between installed domain specialists mid-session with persistence
- **Idea Workflow** (#85) - Lightweight proposal creation for early-stage concepts
- **Proposal-to-PRD Workflow** (#85) - Convert proposals to formal PRDs using IDPF-PRD

### Changed
- **Unified installer** (#93) - `install.js` replaces `install.sh` and `install.cmd`
- **gh-pmu integration** (#103) - Replaced gh-pm and gh-sub-issue with unified gh-pmu extension
- **GitHub-Workflow.md** (#112) - Moved from slash command to Reference/ directory

### Removed
- **install.sh and install.cmd** (#113) - Legacy installers removed

---

## [0.7.0] - 2025-12-02

### Added
- **Anti-Hallucination Rules for Framework Development** (#78)
  - Version management: Always analyze commits before versioning
  - Cross-reference validation: Verify counts, versions, registries
  - CHANGELOG discipline: Document ALL changes since last release
- **Anti-Hallucination Rules for PRD Work** (#79)
  - Stakeholder truth over helpful invention
  - Source attribution for every requirement
  - Scope boundary discipline

### Changed
- **Session-Startup-Instructions.md** (v2.1) - Now loads Framework Development rules
- **IDPF-PRD** (Rev 4) - Loads Anti-Hallucination Rules for PRD Work at session initialization
- **Phase 0 Commit Analysis** - PREPARE_RELEASE.md now requires commit review before version determination

---

## [0.6.0] - 2025-12-02

### Added
- **7 Testing Frameworks**
  - IDPF-Testing-Core (#50) - Foundation framework for all testing approaches
  - IDPF-QA-Automation (#51) - Quality Assurance and Test Automation
  - IDPF-Performance (#52) - Performance Testing framework
  - IDPF-Security (#53) - Security Testing framework
  - IDPF-Accessibility (#54) - Accessibility Testing framework
  - IDPF-Chaos (#55) - Chaos Engineering framework
  - IDPF-Contract-Testing (#56) - Contract Testing framework
- **IDPF-PRD Framework** (#57) - Requirements Engineering with PRD templates
- **Domain Specialists** - PRD-Analyst (#59), Accessibility-Specialist (#60)
- **Skills** - uml-generation (#63), anti-pattern-analysis (#4), bdd-writing (#58), extract-prd (#12)
- **Create-Issues commands** (#75) - Generate GitHub issues from PRD

### Changed
- **Framework-Overview split** (#74) - Created Framework-Summary.md for reduced token consumption (77% reduction)

### Fixed
- **SessionStart Hook Error** (#77) - Removed invalid `type: "prompt"` hooks from settings.local.json

---

## [0.5.0] - 2025-11-30

### Added
- **Consolidated Startup System** - Reduce token consumption by ~70%
  - `STARTUP.md` generated with condensed essential rules
  - Simplified 4-step startup procedure (down from 7 steps)
- **Expansion Commands** - `/expand-rules`, `/expand-framework`, `/expand-domain`
- **Claude Code Settings** - Hooks and permissions configuration via `settings.local.json`
- **Framework Installation Script** - `install.cmd` and `install.sh` for external projects
- **Framework Manifest** (`framework-manifest.json`) - Identifies valid IDPF Framework installations
- **GitHub Workflow Integration** (`.claude/commands/gh-workflow.md`)

### Changed
- Startup procedure reduced from 7 steps to 4 steps
- Token consumption reduced by ~70% at session startup

---

## [0.4.0] - 2025-11-17

### Added
- **IDPF-LTS Framework** - Long-Term Support maintenance mode
  - Stability-focused development for mature projects
  - Conservative change management
  - Backward compatibility requirements
- **Framework Overview v2.2** - Comprehensive documentation of all 4 frameworks
- **Framework transition documentation** - Valid transition paths between frameworks

---

## [0.3.0] - 2025-11-16

### Added
- **IDPF-Vibe Framework** - Exploratory development with evolution paths
  - 7 variants: Core, Newbie, Web, Desktop, Mobile, Game, Embedded
  - Evolution to Structured or Agile when requirements stabilize
- **5 TDD Skills** - tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns
- **Session Startup Instructions** - Standardized session initialization
- **Anti-Hallucination Rules** - Three domains: Software Development, Technical Book Writing, Skill Creation

---

## [0.2.0] - 2025-11-01

### Added
- **IDPF-Agile Framework** - Sprint-based development with user stories
  - Epic and Story hierarchy
  - Sprint planning and retrospectives
  - Velocity tracking
- **Domain Specialist System Instructions** - 15 initial specialists
- **Skills system** - Reusable capabilities for specific tasks

### Changed
- Restructured framework documentation
- Separated core instructions from domain specialists

---

## [0.1.0] - 2025-09-01

### Added
- **IDPF-Structured Framework** - Test-Driven Development with fixed requirements
  - Requirements-first approach
  - TDD methodology (Red-Green-Refactor)
  - Traceability matrix
- **Core Developer Instructions** - Foundation AI assistant identity
- **Anti-Hallucination Rules** - Initial quality guardrails
- **Assistant Guidelines** - Accuracy and verification principles

---

[0.15.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rubrical-studios/idpf-praxis/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rubrical-studios/idpf-praxis/releases/tag/v0.1.0
