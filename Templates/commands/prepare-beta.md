---
version: "v0.33.0"
description: Tag beta from feature branch (no merge to main)
argument-hint: [--skip-coverage] [--dry-run] [--help]
---
# /prepare-beta
Tag a beta release from feature branch without merging to main.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis |
| `pre-validation` | Before Phase 2 | Setup test environment |
| `post-validation` | After Phase 2 | Beta validation |
| `pre-commit` | Before Phase 4 commit | Generate artifacts |
| `post-prepare` | After Phase 3 | Additional updates |
| `pre-tag` | Before tagging | Final gate |
| `post-tag` | After Phase 4 | Beta monitoring |
| `checklist-before-tag` | Checklist | Pre-tag items |
| `checklist-after-tag` | Checklist | Post-tag items |
## Arguments
| Argument | Description |
|----------|-------------|
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |
## Execution Instructions
Use `TodoWrite` to create todos from phases.
## Pre-Checks
Verify NOT on main.
## Phase 1: Analysis
```bash
node .claude/scripts/shared/analyze-commits.js
node .claude/scripts/shared/recommend-version.js
```
<!-- USER-EXTENSION-START: post-analysis -->
<!-- USER-EXTENSION-END: post-analysis -->
ASK USER to confirm beta version.
## Phase 2: Validation
<!-- USER-EXTENSION-START: pre-validation -->
<!-- USER-EXTENSION-END: pre-validation -->
<!-- USER-EXTENSION-START: post-validation -->
<!-- USER-EXTENSION-END: post-validation -->
ASK USER to confirm validation passed.
## Phase 3: Prepare
Update CHANGELOG with beta section.
<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->
<!-- USER-EXTENSION-START: pre-commit -->
<!-- USER-EXTENSION-END: pre-commit -->
## Phase 4: Tag (No Merge)
### Step 4.1: Commit and Push
```bash
git add -A && git commit -m "chore: prepare beta $VERSION"
git push origin $(git branch --show-current)
```
<!-- USER-EXTENSION-START: pre-tag -->
<!-- USER-EXTENSION-END: pre-tag -->
### Step 4.2: Create Beta Tag
```bash
git tag -a $VERSION -m "Beta $VERSION"
git push origin $VERSION
```
### Step 4.3: Wait for CI
```bash
node .claude/scripts/shared/wait-for-ci.js
```
### Step 4.4: Update Release Notes
```bash
node .claude/scripts/shared/update-release-notes.js
```
<!-- USER-EXTENSION-START: post-tag -->
<!-- USER-EXTENSION-END: post-tag -->
## Summary Checklist
**Before tagging:**
- [ ] Not on main
- [ ] Beta version confirmed
- [ ] CHANGELOG updated
<!-- USER-EXTENSION-START: checklist-before-tag -->
<!-- USER-EXTENSION-END: checklist-before-tag -->
**After tagging:**
- [ ] Beta tag pushed
- [ ] CI completed
- [ ] Release notes updated
<!-- USER-EXTENSION-START: checklist-after-tag -->
<!-- USER-EXTENSION-END: checklist-after-tag -->
---
**End of Prepare Beta**
