---
version: "v0.26.2"
description: Prepare framework release with version updates and validation (project)
argument-hint: [options...] (phase:N, skip:*, audit:*, dry-run)
---
<!-- EXTENSIBLE -->
# /prepare-release
Execute the full release preparation workflow.
## Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `post-analysis` | After Phase 1 | Custom commit analysis |
| `pre-validation` | Before Phase 2 | Setup test environment |
| `post-validation` | After Phase 2 | Custom validation |
| `post-prepare` | After Phase 3 | Additional updates |
| `post-pr-create` | After PR creation | CI wait, PR validation |
| `pre-tag` | Before Phase 4 | Final gate, sign-off |
| `post-tag` | After Phase 4 | Deployment, notifications |
| `pre-close` | Before Phase 5 | Pre-close validation |
| `post-close` | After Phase 5 | Post-release actions |
---
## Arguments
| Usage | Behavior |
|-------|----------|
| `/prepare-release` | Full process |
| `/prepare-release phase:2` | Start from Phase 2 |
| `/prepare-release skip:X` | Skip sub-phase |
| `/prepare-release dry-run` | Preview only |
---
## Pre-Checks
### Verify Current Branch
```bash
git branch --show-current
```
Record as `$BRANCH`.
### Auto-Create Release Branch (if on main)
**If `$BRANCH` is `main`:**
1. Analyze commits: `git log $(git describe --tags --abbrev=0)..HEAD --oneline`
2. Recommend version based on commits
3. **ASK USER:** Confirm version
4. **If `--dry-run`:** Report "Would create branch: release/vX.Y.Z" and stop
5. Create branch:
   ```bash
   gh pmu branch start --branch "release/$VERSION"
   git checkout "release/$VERSION"
   git push -u origin "release/$VERSION"
   ```
6. Update `$BRANCH` to `release/$VERSION`
**If NOT `main`:** Continue with existing working branch.
### Check for Open Work
```bash
gh pmu microsprint current 2>/dev/null
gh pmu release current --json issues | jq '.[] | select(.status != \"done\")'
```
---
## Phase 1: Analysis & Version
### Step 1.1: Identify Last Release
```bash
git describe --tags --abbrev=0
```
### Step 1.2: List Commits Since Last Release
```bash
git log vX.Y.Z..HEAD --oneline
git log vX.Y.Z..HEAD --oneline | wc -l
```
### Step 1.3: Categorize Changes
| Category | Indicators | Impact |
|----------|-----------|--------|
| New Framework | "Add IDPF-*" | MINOR/MAJOR |
| New Skill | "Implement * skill" | MINOR |
| Bug Fix | "Fix *" | PATCH |
### Step 1.4: Determine Version
**ASK USER:** Confirm version.
<!-- USER-EXTENSION-START: post-analysis -->
<!-- USER-EXTENSION-END: post-analysis -->
---
## Phase 2: Validation
<!-- USER-EXTENSION-START: pre-validation -->
<!-- USER-EXTENSION-END: pre-validation -->
### Step 2.1: Verify Working Directory
```bash
git status --porcelain
```
### Step 2.2: Run Basic Tests
```bash
npm test 2>/dev/null || echo "No test script"
```
<!-- USER-EXTENSION-START: post-validation -->
<!-- USER-EXTENSION-END: post-validation -->
**ASK USER:** Confirm validation passed.
---
## Phase 3: Prepare
### Step 3.1: Update Version Files
| File | Action |
|------|--------|
| `framework-manifest.json` | Update version |
| `CHANGELOG.md` | Add new section |
| `README.md` | Update version line |
### Step 3.2: Generate Release Artifacts
```bash
mkdir -p "Releases/$TRACK/$VERSION"
```
Create `release-notes.md` and `changelog.md`.
<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->
---
## Phase 4: Git Operations
### Step 4.1: Commit Release
```bash
git add -A
git commit -m "Release vX.Y.Z"
git push origin release/vX.Y.Z
```
### Step 4.2: Update Issue Criteria
Update acceptance criteria on release issues before PR.
### Step 4.3: Create PR to Main
```bash
gh pr create --base main --head release/vX.Y.Z --title "Release vX.Y.Z"
```
<!-- USER-EXTENSION-START: post-pr-create -->
<!-- BUILT-IN: ci-wait (disabled by default)
### Wait for CI
```bash
node .claude/scripts/framework/wait-for-ci.js
```
**If CI fails, STOP and report.**
-->
<!-- USER-EXTENSION-END: post-pr-create -->
### Step 4.4: Merge PR
**ASK USER:** Approve and merge.
```bash
gh pr merge --merge
```
### Step 4.5: Close Branch Tracker
```bash
gh pmu branch close
```
### Step 4.6: Switch to Main
```bash
git checkout main
git pull origin main
```
<!-- USER-EXTENSION-START: pre-tag -->
<!-- USER-EXTENSION-END: pre-tag -->
### Step 4.7: Tag Main
**ASK USER:** Confirm ready to tag.
```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```
### Step 4.8: Verify Deployment
```bash
gh run list --limit 1
gh run watch
```
<!-- USER-EXTENSION-START: post-tag -->
### Wait for CI Workflow
```bash
node .claude/scripts/framework/wait-for-ci.js
```
**If CI fails, STOP and report.**
### Update Release Notes
```bash
node .claude/scripts/framework/update-release-notes.js
```
Updates GitHub Release with formatted notes from CHANGELOG.
<!-- USER-EXTENSION-END: post-tag -->
---
<!-- USER-EXTENSION-START: pre-close -->
<!-- USER-EXTENSION-END: pre-close -->
## Phase 5: Close & Cleanup
**ASK USER:** Confirm deployment verified.
### Step 5.1: Close Tracker Issue
```bash
gh issue close [TRACKER_NUMBER] --comment "Release vX.Y.Z deployed successfully"
```
### Step 5.2: Delete Release Branch
```bash
git push origin --delete release/vX.Y.Z
git branch -d release/vX.Y.Z
```
### Step 5.3: Create GitHub Release
```bash
gh release create vX.Y.Z --title "Release vX.Y.Z" --notes-file "Releases/release/vX.Y.Z/release-notes.md"
```
<!-- USER-EXTENSION-START: post-close -->
<!-- USER-EXTENSION-END: post-close -->
---
## Completion
- ✅ Code merged to main
- ✅ Tag created and pushed
- ✅ Deployment verified
- ✅ Tracker closed
- ✅ Branch deleted
- ✅ GitHub Release created
---
**End of Prepare Release**
