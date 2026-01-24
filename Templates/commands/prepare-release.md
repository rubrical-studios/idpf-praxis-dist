---
version: "v0.32.0"
description: Prepare release with PR, merge to main, and tag
argument-hint: [version] [--skip-coverage] [--dry-run] [--help]
---
<!-- EXTENSIBLE -->
# /prepare-release
Validate, create PR to main, merge, and tag for deployment.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis, version recommendation |
| `pre-validation` | Before Phase 2 | Setup, fixtures, containers |
| `post-validation` | After Phase 2 | Coverage gates, build verification |
| `pre-commit` | Before Phase 3 commit | Generate release artifacts |
| `post-prepare` | After Phase 3 | Documentation updates |
| `post-pr-create` | After PR creation | CI wait, PR validation |
| `pre-tag` | Before Phase 4 tagging | Final gate, sign-off |
| `post-tag` | After Phase 4 | Release monitoring |
| `checklist-before-tag` | Summary Checklist | Pre-tag items |
| `checklist-after-tag` | Summary Checklist | Post-tag items |
| `pre-close` | Before Phase 5 | Pre-close validation |
| `post-close` | After Phase 5 | Post-release announcements |
| `checklist-close` | Summary Checklist | Close items |
## Arguments
| Argument | Description |
|----------|-------------|
| `[version]` | Version to release (e.g., v1.2.0) |
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |
## Execution Instructions
**REQUIRED:** Before executing:
1. **Create Todo List:** Use `TodoWrite` for phases
2. **Track Progress:** Mark `in_progress` → `completed`
3. **Resume Point:** Todos show where to continue
## Pre-Checks
### Verify Current Branch
```bash
git branch --show-current
```
Record as `$BRANCH`.
### Auto-Create Release Branch (if on main)
If on `main`: Analyze commits → recommend version → **ASK USER** → create `release/$VERSION` branch → update `$BRANCH`
### Check for Incomplete Issues
```bash
gh pmu list --branch current --status backlog,in_progress,in_review
```
## Phase 1: Analysis
### Step 1.1: Analyze Changes
```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```
### Analyze Commits
```bash
node .claude/scripts/shared/analyze-commits.js
```
### Recommend Version
```bash
node .claude/scripts/shared/recommend-version.js
```

<!-- USER-EXTENSION-START: post-analysis -->
<!-- USER-EXTENSION-END: post-analysis -->

**ASK USER:** Confirm version.
## Phase 2: Validation

<!-- USER-EXTENSION-START: pre-validation -->
<!-- USER-EXTENSION-END: pre-validation -->

<!-- USER-EXTENSION-START: post-validation -->
<!-- USER-EXTENSION-END: post-validation -->

**ASK USER:** Confirm validation passed.
## Phase 3: Prepare
### Step 3.1: Update Version Files
| File | Action |
|------|--------|
| `CHANGELOG.md` | Add new section |
| `README.md` | Update version |
| `README-DIST.md` | Verify counts, license |
| `framework-config.json` | (Self-hosted) Update version and date |

<!-- USER-EXTENSION-START: pre-commit -->
<!-- USER-EXTENSION-END: pre-commit -->

### Step 3.2: Commit Preparation
```bash
git add CHANGELOG.md README.md README-DIST.md docs/
git commit -m "chore: prepare release $VERSION"
git push
```

<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->

**CRITICAL:** Do not proceed until CI passes.
## Phase 4: Git Operations
### Step 4.1: Create PR to Main
```bash
gh pr create --base main --head $(git branch --show-current) --title "Release $VERSION"
```

<!-- USER-EXTENSION-START: post-pr-create -->
<!-- USER-EXTENSION-END: post-pr-create -->

### Step 4.2: Merge PR
**ASK USER:** Approve and merge.
```bash
gh pr merge --merge
```
### Step 4.3: Close Branch Tracker
```bash
gh pmu branch close
```
### Step 4.4: Switch to Main
```bash
git checkout main
git pull origin main
```

<!-- USER-EXTENSION-START: pre-tag -->
<!-- USER-EXTENSION-END: pre-tag -->

### Step 4.5: Tag and Push
**ASK USER:** Confirm ready to tag.
```bash
git tag -a $VERSION -m "Release $VERSION"
git push origin $VERSION
```
### Step 4.6: Wait for CI Workflow
```bash
node .claude/scripts/shared/wait-for-ci.js
```
**If CI fails, STOP.**
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
- [ ] CI workflow completed
- [ ] Release notes updated

<!-- USER-EXTENSION-START: checklist-after-tag -->
<!-- USER-EXTENSION-END: checklist-after-tag -->

<!-- USER-EXTENSION-START: pre-close -->
<!-- USER-EXTENSION-END: pre-close -->

## Phase 5: Close & Cleanup
**ASK USER:** Confirm deployment verified.
### Step 5.1: Add Deployment Comment
```bash
gh issue comment [TRACKER_NUMBER] --body "Release $VERSION deployed successfully"
```
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

## Completion
- ✅ Code merged to main
- ✅ Tag created and pushed
- ✅ Deployment verified
- ✅ Tracker issue closed
- ✅ Working branch deleted
- ✅ GitHub Release created
**End of Prepare Release**
