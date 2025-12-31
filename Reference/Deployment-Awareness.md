# Deployment Awareness
**Version:** v0.19.1
**Purpose:** Document deployment chain from dev to distribution

---

## Architecture
```
idpf-praxis (Dev)               idpf-praxis-dist (Dist)
─────────────────               ────────────────────────────
Source Files
    ↓ /minimize-files
.min-mirror/          ────→     Deployed via deploy-dist.yml
    ↓ /prepare-release          (on git tag v*)
.claude/rules/                  Users get via install.js
Templates/            ────→     Copied directly
```

**Trigger:** Git tag `v*` pushes to `-dist` via GitHub Actions.

---

## File Classification

**Deployed FROM `.min-mirror/`:**
| Directory | Content |
|-----------|---------|
| `IDPF-*` | All 12 frameworks |
| `Overview/` | Summaries |
| `Reference/` | Workflows |
| `Skills/` | Skill definitions |
| `System-Instructions/` | Specialists |
| `Assistant/` | Anti-hallucination (subset) |

**Deployed AS-IS:**
README-DIST.md, CHANGELOG.md, LICENSE, install.js, fetch-updates.js, framework-manifest.json, Templates/

**Dev-Only (Never Deployed):**
Archive/, Proposal/, PRD/, Skills/MAINTENANCE.md, .claude/rules/, maintainer commands

---

## Issue Workflow Integration

**Before implementing:**
1. User-facing change? → Run `/minimize-files`
2. Dev-only? → No minimization needed
3. New directories? → Update `deploy-dist.yml`

**Pre-Commit Checklist (user-facing):**
- [ ] Source files updated
- [ ] `/minimize-files` run
- [ ] `.min-mirror/` reviewed
- [ ] `deploy-dist.yml` updated (if new dirs)

---

## Key Commands

| Command | Purpose |
|---------|---------|
| `/minimize-files` | Update `.min-mirror/` |
| `/minimize-files orphans` | Find orphaned files |
| `/minimize-files reset` | Force rebuild |
| `/prepare-release` | Full release prep |

---

**End of Deployment Awareness**
