---
version: "v0.29.0"
description: Tag beta from feature branch (no merge to main)
argument-hint: [--skip-coverage] [--dry-run] [--help]
---
<!-- EXTENSIBLE -->
# /prepare-beta
Tag a beta release from feature branch without merging to main.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Commit analysis |
| `pre-validation` | Before Phase 2 | Setup test environment |
| `post-validation` | After Phase 2 | Beta validation |
| `post-prepare` | After Phase 3 | Additional updates |
| `pre-tag` | Before Phase 4 | Final gate |
| `post-tag` | After Phase 4 | Beta monitoring |
| `checklist-before-tag` | Summary Checklist | Pre-tag items |
| `checklist-after-tag` | Summary Checklist | Post-tag items |
## Arguments
| Argument | Description |
|----------|-------------|
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |
## Execution Instructions
**REQUIRED:** Before executing:
1. **Create Todo List:** Use `TodoWrite` for phases
2. **Track Progress:** Mark `in_progress` → `completed`
3. **Resume Point:** Todos show where to continue
## Pre-Checks
### Verify NOT on Main
```bash
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ]; then echo "Error: Cannot create beta from main."; exit 1; fi
```
## Phase 1: Analysis
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
Recommend beta version (e.g., `v1.0.0-beta.1`).
<!-- USER-EXTENSION-END: post-analysis -->

**ASK USER:** Confirm beta version.
## Phase 2: Validation

<!-- USER-EXTENSION-START: pre-validation -->
<!-- USER-EXTENSION-END: pre-validation -->

```bash
go test ./...
```

<!-- USER-EXTENSION-START: post-validation -->
### Coverage Gate (Optional for Beta)
**If `--skip-coverage`, skip.**
```bash
node .claude/scripts/prepare-release/coverage.js
```
**If `success` is false, STOP.**
<!-- USER-EXTENSION-END: post-validation -->

**ASK USER:** Confirm validation passed.
## Phase 3: Prepare
Update CHANGELOG.md with beta section.

<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->

## Phase 4: Tag (No Merge)
### Step 4.1: Commit Changes
```bash
git add -A
git commit -m "chore: prepare beta $VERSION"
git push origin $(git branch --show-current)
```

<!-- USER-EXTENSION-START: pre-tag -->
<!-- USER-EXTENSION-END: pre-tag -->

### Step 4.2: Create Beta Tag
**ASK USER:** Confirm ready to tag.
```bash
git tag -a $VERSION -m "Beta $VERSION"
git push origin $VERSION
```
**Note:** Beta tags feature branch. No merge to main.

<!-- USER-EXTENSION-START: post-tag -->
### Wait for CI
```bash
node .claude/scripts/framework/wait-for-ci.js
```
**If CI fails, STOP.**
<!-- USER-EXTENSION-END: post-tag -->

## Next Step
When ready for full release:
1. Merge feature branch to main
2. Run `/prepare-release`
## Summary Checklist
**Before tagging:**
- [ ] Not on main
- [ ] Commits analyzed
- [ ] Beta version confirmed
- [ ] Tests passing
- [ ] CHANGELOG updated

<!-- USER-EXTENSION-START: checklist-before-tag -->
- [ ] Coverage gate passed (or `--skip-coverage`)
<!-- USER-EXTENSION-END: checklist-before-tag -->

**After tagging:**
- [ ] Beta tag pushed

<!-- USER-EXTENSION-START: checklist-after-tag -->
- [ ] Beta build monitored
<!-- USER-EXTENSION-END: checklist-after-tag -->

**End of Prepare Beta**
