---
version: "v0.22.0"
description: Prepare release with PR, merge to main, and tag
argument-hint: [version] [--skip-coverage] [--dry-run] [--help]
---

<!-- EXTENSIBLE: v0.17.0 -->
# /prepare-release
**Source:** Templates/commands/prepare-release.md

Validate, create PR to main, merge, and tag for deployment.

## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis, version recommendation |
| `pre-validation` | Before Phase 2 | Setup, fixtures, containers |
| `post-validation` | After Phase 2 | Coverage gates, build verification |
| `post-prepare` | After Phase 3 | Documentation updates |
| `pre-tag` | Before Phase 4 tagging | Final gate, sign-off |
| `post-tag` | After Phase 4 | Release monitoring, asset verification |
| `checklist-before-tag` | Summary Checklist | Pre-tag verification items |
| `checklist-after-tag` | Summary Checklist | Post-tag verification items |

## Arguments
| Argument | Description |
|----------|-------------|
| `[version]` | Version to release (e.g., v1.2.0) |
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |

## Pre-Checks

### Verify Config
```bash
node .claude/scripts/open-release/verify-config.js
```
**If the script returns `success: false`, STOP and report the error.**

### Verify on Release Branch
```bash
git branch --show-current
```

### Check for Open Sprints
```bash
gh pmu microsprint current
```
Close open sprints before proceeding.

### Check for Incomplete Issues
```bash
gh pmu release current --json issues | jq '.[] | select(.status != "done")'
```

## Phase 1: Analysis

### Step 1.1: Analyze Changes
```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

<!-- USER-EXTENSION-START: post-analysis -->
### Analyze Commits
```bash
node .claude/scripts/framework/analyze-commits.js
```

### Recommend Version
```bash
node .claude/scripts/framework/recommend-version.js
```
<!-- USER-EXTENSION-END: post-analysis -->

**ASK USER:** Confirm version before proceeding.

## Phase 2: Validation

<!-- USER-EXTENSION-START: pre-validation -->
<!-- Setup: start containers, pull fixtures, prepare environment -->
<!-- USER-EXTENSION-END: pre-validation -->

### Step 2.1: Run Tests
```bash
go test ./...
```

<!-- USER-EXTENSION-START: post-validation -->
### Coverage Gate
**If `--skip-coverage` was passed, skip this section.**
```bash
node .claude/scripts/prepare-release/coverage.js
```
**If `success` is false, STOP and report the error.**
<!-- USER-EXTENSION-END: post-validation -->

**ASK USER:** Confirm validation passed.

## Phase 3: Prepare

### Step 3.1: Update Version Files
| File | Action |
|------|--------|
| `CHANGELOG.md` | Add new section following Keep a Changelog format |
| `README.md` | Update version badge or header |

### Step 3.2: Commit Preparation
```bash
git add CHANGELOG.md README.md docs/
git commit -m "chore: prepare release $VERSION"
git push
```

<!-- USER-EXTENSION-START: post-prepare -->
### Wait for CI
```bash
node .claude/scripts/framework/wait-for-ci.js
```
**If CI fails, STOP and report the error.**
<!-- USER-EXTENSION-END: post-prepare -->

**CRITICAL:** Do not proceed until CI passes.

## Phase 4: Git Operations

### Step 4.1: Create PR to Main
```bash
gh pr create --base main --head $(git branch --show-current) \
  --title "Release $VERSION"
```

### Step 4.2: Merge PR
**ASK USER:** Approve and merge.
```bash
gh pr merge --merge
git checkout main
git pull origin main
```

<!-- USER-EXTENSION-START: pre-tag -->
<!-- Final gate before tagging - add sign-off checks here -->
<!-- USER-EXTENSION-END: pre-tag -->

### Step 4.3: Tag and Push
**ASK USER:** Confirm ready to tag.
```bash
git tag -a $VERSION -m "Release $VERSION"
git push origin $VERSION
```

<!-- USER-EXTENSION-START: post-tag -->
### Monitor Release Workflow
```bash
node .claude/scripts/close-release/monitor-release.js
```

### Update Release Notes
```bash
node .claude/scripts/framework/update-release-notes.js
```
<!-- USER-EXTENSION-END: post-tag -->

## Summary Checklist

**Core (Before tagging):**
- [ ] Config file clean
- [ ] Commits analyzed
- [ ] Version confirmed
- [ ] CHANGELOG updated
- [ ] PR merged

<!-- USER-EXTENSION-START: checklist-before-tag -->
- [ ] Coverage gate passed (or `--skip-coverage`)
- [ ] CI passing
<!-- USER-EXTENSION-END: checklist-before-tag -->

**Core (After tagging):**
- [ ] Tag pushed

<!-- USER-EXTENSION-START: checklist-after-tag -->
- [ ] All CI jobs completed
- [ ] Release assets uploaded
- [ ] Release notes updated
<!-- USER-EXTENSION-END: checklist-after-tag -->

## STOP - Workflow Boundary
**This command ends here.** Do not proceed to `/close-release` actions.

**What `/prepare-release` does NOT do:**
- Close the release in project tracker
- Run `gh pmu release close`
- Mark tracker issue as complete

## Next Step
After deployment verified, run `/close-release` separately to finalize.

---

**End of Prepare Release**
