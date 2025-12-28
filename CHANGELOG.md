# Changelog

All notable changes to the IDPF Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Note:** Version numbers were reset to semantic versioning on 2025-12-24. See issue #525 for details. The v0.x.x series indicates pre-production status; v1.0.0 will mark production readiness.

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

[0.15.0]: https://github.com/rubrical-studios/process-docs/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/rubrical-studios/process-docs/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/rubrical-studios/process-docs/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/rubrical-studios/process-docs/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/rubrical-studios/process-docs/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/rubrical-studios/process-docs/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/rubrical-studios/process-docs/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/rubrical-studios/process-docs/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/rubrical-studios/process-docs/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/rubrical-studios/process-docs/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/rubrical-studios/process-docs/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/rubrical-studios/process-docs/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/rubrical-studios/process-docs/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rubrical-studios/process-docs/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rubrical-studios/process-docs/releases/tag/v0.1.0
