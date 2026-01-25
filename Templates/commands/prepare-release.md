---
version: "v0.33.0"
description: Prepare release with PR, merge to main, and tag
argument-hint: [version] [--skip-coverage] [--dry-run] [--help]
---
# /prepare-release
Validate, create PR to main, merge, and tag for deployment.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis, version recommendation |
| `pre-validation` | Before Phase 2 | Setup, fixtures |
| `post-validation` | After Phase 2 | Coverage gates, build verification |
| `pre-commit` | Before Phase 3 commit | Generate artifacts |
| `post-prepare` | After Phase 3 | Documentation updates |
| `post-pr-create` | After PR creation | CI wait |
| `pre-tag` | Before tagging | Final gate |
| `post-tag` | After Phase 4 | Release monitoring |
| `checklist-before-tag` | Checklist | Pre-tag items |
| `checklist-after-tag` | Checklist | Post-tag items |
| `pre-close` | Before Phase 5 | Pre-close validation |
| `post-close` | After Phase 5 | Post-release actions |
| `checklist-close` | Checklist | Close items |
## Arguments
| Argument | Description |
|----------|-------------|
| `[version]` | Version to release |
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |
## Execution Instructions
Use `TodoWrite` to create todos from phases.
## Pre-Checks
### Verify Current Branch
If on main, auto-create release branch with recommended version.
### Check Incomplete Issues
```bash
gh pmu list --branch current --status backlog,in_progress,in_review
```
## Phase 1: Analysis
```bash
node .claude/scripts/shared/analyze-commits.js
node .claude/scripts/shared/recommend-version.js
```
<!-- USER-EXTENSION-START: post-analysis -->
<!-- USER-EXTENSION-END: post-analysis -->
ASK USER to confirm version.
## Phase 2: Validation
<!-- USER-EXTENSION-START: pre-validation -->
<!-- USER-EXTENSION-END: pre-validation -->
<!-- USER-EXTENSION-START: post-validation -->
<!-- USER-EXTENSION-END: post-validation -->
ASK USER to confirm validation passed.
## Phase 3: Prepare
### Step 3.1: Update Version Files
| File | Action |
|------|--------|
| `CHANGELOG.md` | Add new section |
| `README.md` | Update version |
| `README-DIST.md` | Verify counts |
<!-- USER-EXTENSION-START: pre-commit -->
<!-- USER-EXTENSION-END: pre-commit -->
### Step 3.2: Commit
```bash
git add CHANGELOG.md README.md README-DIST.md
git commit -m "chore: prepare release $VERSION"
git push
```
<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->
## Phase 4: Git Operations
### Step 4.1: Create PR
```bash
gh pr create --base main --head $(git branch --show-current) --title "Release $VERSION"
```
<!-- USER-EXTENSION-START: post-pr-create -->
<!-- USER-EXTENSION-END: post-pr-create -->
### Step 4.2: Merge PR
ASK USER to approve. `gh pr merge --merge`
### Step 4.3: Close Branch Tracker
```bash
gh pmu branch close
```
### Step 4.4: Switch to Main
```bash
git checkout main && git pull
```
<!-- USER-EXTENSION-START: pre-tag -->
<!-- USER-EXTENSION-END: pre-tag -->
### Step 4.5: Tag and Push
```bash
git tag -a $VERSION -m "Release $VERSION"
git push origin $VERSION
```
### Step 4.6: Wait for CI
```bash
node .claude/scripts/shared/wait-for-ci.js
```
### Step 4.7: Update Release Notes
```bash
node .claude/scripts/shared/update-release-notes.js
```
<!-- USER-EXTENSION-START: post-tag -->
<!-- USER-EXTENSION-END: post-tag -->
## Summary Checklist
**Before tagging:**
- [ ] Commits analyzed
- [ ] Version confirmed
- [ ] CHANGELOG updated
- [ ] PR merged
<!-- USER-EXTENSION-START: checklist-before-tag -->
<!-- USER-EXTENSION-END: checklist-before-tag -->
**After tagging:**
- [ ] Tag pushed
- [ ] CI completed
- [ ] Release notes updated
<!-- USER-EXTENSION-START: checklist-after-tag -->
<!-- USER-EXTENSION-END: checklist-after-tag -->
<!-- USER-EXTENSION-START: pre-close -->
<!-- USER-EXTENSION-END: pre-close -->
## Phase 5: Close & Cleanup
ASK USER to confirm deployment verified.
### Step 5.1: Add Deployment Comment
### Step 5.2: Delete Working Branch
```bash
git push origin --delete $BRANCH
git branch -d $BRANCH
```
### Step 5.3: Create GitHub Release
```bash
gh release create $VERSION --title "Release $VERSION" --notes-file CHANGELOG.md
```
<!-- USER-EXTENSION-START: post-close -->
<!-- USER-EXTENSION-END: post-close -->
## Summary Checklist (Close)
<!-- USER-EXTENSION-START: checklist-close -->
<!-- USER-EXTENSION-END: checklist-close -->
---
**End of Prepare Release**
