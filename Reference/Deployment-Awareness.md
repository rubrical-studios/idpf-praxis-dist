# Deployment Awareness
**Version:** v0.32.1
**Purpose:** Document deployment chain from development to distribution
## Overview
`idpf-praxis` is the **development environment**. Changes deploy to **distribution repository** (`idpf-praxis-dist`) which users install from.
## Deployment Architecture
### Source of Truth Chain
```
idpf-praxis (Development)              idpf-praxis-dist (Distribution)
──────────────────────────              ─────────────────────────────────────
Source Files (IDPF-*, Reference/, etc.)
    │
    ↓ /minimize-files
.min-mirror/                     ────→  Deployed via deploy-dist.yml
    │                                   (on git tag push v*)
    ↓ /prepare-release
.claude/rules/                          Users get rules via install.js
```
### Command Template Chain
```
.claude/commands/*.md (SOURCE)    ────→  .min-mirror/Templates/commands/*.md
    │                                     (via path remapping)
    │ FRAMEWORK-ONLY content              │ FRAMEWORK-ONLY stripped
    ↓                                     ↓
Framework uses full commands              Users get clean templates
```
**Trigger:** Deployment triggered by pushing git tag matching `v*`.
## File Classification
### Deployed FROM `.min-mirror/`
| Directory | Content |
|-----------|---------|
| `IDPF-*` | All framework directories |
| `Overview/` | Framework summaries |
| `Reference/` | GitHub Workflow, Session Startup |
| `System-Instructions/` | Core + Domain Selection Guide |
| `Assistant/` | Anti-hallucination rules (user-facing) |
| `Templates/` | Command templates |
### Deployed DIRECTLY
| Directory | Notes |
|-----------|-------|
| `Skills/Packaged/` | Skill zip files |
### Deployed AS-IS
`README-DIST.md`, `CHANGELOG.md`, `LICENSE`, `install.js`, `fetch-updates.js`, `framework-manifest.json`
### Dev-Only (Never Deployed)
| Category | Examples |
|----------|----------|
| Excluded Directories | `Archive/`, `Proposal/`, `PRD/`, `Guides/` |
| Excluded Files | `Anti-Hallucination-Rules-for-Framework-Development.md` |
| Excluded Commands | `/prepare-release`, `/minimize-files`, `/skill-validate`, `/audit-*` |
| Skill Sources | `Skills/[name]/` directories |
| Build Artifacts | `.claude/rules/` |
## Issue Workflow Integration
### Pre-Commit Checklist for User-Facing Changes
- [ ] Source files updated
- [ ] Run `/minimize-files` to update `.min-mirror/`
- [ ] Verify minimized output preserves functionality
- [ ] Check if `install.js` needs updates
- [ ] Check if `deploy-dist.yml` needs updates
## Quick Reference
### Key Commands
| Command | Purpose |
|---------|---------|
| `/minimize-files` | Update `.min-mirror/` |
| `/minimize-files orphans` | Find orphaned files |
| `/minimize-files reset` | Force full rebuild |
| `/prepare-release` | Full release preparation |
---
**End of Deployment Awareness**
