---
version: "v0.41.0"
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
| `pre-commit` | Before Phase 4 commit | Generate beta artifacts |
| `post-prepare` | After Phase 3 | Additional updates |
| `pre-tag` | Before Phase 4 tagging | Final gate |
| `post-tag` | After Phase 4 | Beta monitoring |
| `checklist-before-tag` | Summary Checklist | Pre-tag verification items |
| `checklist-after-tag` | Summary Checklist | Post-tag verification items |

---

## Arguments

| Argument | Description |
|----------|-------------|
| `--skip-coverage` | Skip coverage gate |
| `--dry-run` | Preview without changes |
| `--help` | Show extension points |

---

## Execution Instructions

**REQUIRED:** Before executing this command:

1. **Generate Todo List:** Parse the phases and extension points in this spec, then use `TodoWrite` to create todos
2. **Include Extensions:** For each non-empty `USER-EXTENSION` block, add a todo item
3. **Track Progress:** Mark todos `in_progress` → `completed` as you work
4. **Post-Compaction:** If resuming after context compaction, re-read this spec and regenerate todos

**Todo Generation Rules:**
- One todo per numbered phase/step
- One todo per active extension point (non-empty `USER-EXTENSION` blocks)
- Skip commented-out extensions
- Use the phase/step name as the todo content

---

## Pre-Checks

### Verify NOT on Main

```bash
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ]; then
  echo "Error: Cannot create beta from main."
  exit 1
fi
```

---

## Phase 1: Analysis

### Step 1.1: Analyze Changes

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

### Analyze Commits

```bash
node .claude/scripts/shared/analyze-commits.js
```

The script outputs JSON with commit analysis:
- `lastTag`: Previous version
- `commits`: Array of parsed commits
- `summary`: Counts by type (features, fixes, etc.)

### Recommend Version

```bash
node .claude/scripts/shared/recommend-version.js
```

Uses the commit analysis to recommend a beta version (e.g., `v1.0.0-beta.1`).

<!-- USER-EXTENSION-START: post-analysis -->

<!-- USER-EXTENSION-END: post-analysis -->

**ASK USER:** Confirm beta version before proceeding.

---

## Phase 2: Validation

<!-- USER-EXTENSION-START: pre-validation -->


<!-- USER-EXTENSION-END: pre-validation -->


<!-- USER-EXTENSION-START: post-validation -->


<!-- USER-EXTENSION-END: post-validation -->

**ASK USER:** Confirm validation passed before proceeding.

---

## Phase 3: Prepare

Update CHANGELOG.md with beta section.

<!-- USER-EXTENSION-START: post-prepare -->
<!-- USER-EXTENSION-END: post-prepare -->

<!-- USER-EXTENSION-START: pre-commit -->


<!-- USER-EXTENSION-END: pre-commit -->

---

## Phase 4: Tag (No Merge)

### Step 4.1: Commit Changes

```bash
git add -A
git commit -m "chore: prepare beta $VERSION"
git push origin $(git branch --show-current)
```

<!-- USER-EXTENSION-START: pre-tag -->
<!-- Final gate: sign-off checks before beta tag -->
<!-- USER-EXTENSION-END: pre-tag -->

### Step 4.2: Create Beta Tag

**ASK USER:** Confirm ready to tag beta.

```bash
git tag -a $VERSION -m "Beta $VERSION"
git push origin $VERSION
```

**Note:** Beta tags feature branch. No merge to main.

### Step 4.3: Wait for CI Workflow

```bash
node .claude/scripts/shared/wait-for-ci.js
```

**If CI fails, STOP and report.**

### Step 4.4: Update Release Notes

```bash
node .claude/scripts/shared/update-release-notes.js
```

Updates GitHub Release with formatted notes from CHANGELOG.

<!-- USER-EXTENSION-START: post-tag -->
<!-- Post-tag user customization: beta monitoring, notifications -->
<!-- USER-EXTENSION-END: post-tag -->

---

## Next Step

Beta is tagged. When ready for full release:
1. Merge feature branch to main
2. Run `/prepare-release` for official release

---

## Summary Checklist

**Core (Before tagging):**
- [ ] Not on main branch
- [ ] Commits analyzed
- [ ] Beta version confirmed
- [ ] Tests passing
- [ ] CHANGELOG updated with beta section

<!-- USER-EXTENSION-START: checklist-before-tag -->


<!-- USER-EXTENSION-END: checklist-before-tag -->

**Core (After tagging):**
- [ ] Beta tag pushed
- [ ] CI workflow completed
- [ ] Release notes updated

<!-- USER-EXTENSION-START: checklist-after-tag -->


<!-- USER-EXTENSION-END: checklist-after-tag -->

---

**End of Prepare Beta**
