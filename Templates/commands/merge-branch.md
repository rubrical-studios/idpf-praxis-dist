---
version: "v0.32.1"
description: Merge branch to main with gated checks (project)
argument-hint: [--skip-gates] [--dry-run]
---
# /merge-branch
Merge current branch to main with gated validation. Use for non-versioned work. For releases with tagging, use `/prepare-release`.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-gate` | Before gates | Setup |
| `gates` | Gate checks | Custom validation |
| `post-gate` | After gates pass | Pre-merge actions |
| `post-pr-create` | After PR creation | CI wait |
| `post-merge` | After merged | Post-merge actions |
| `post-close` | After cleanup | Notifications |
## Arguments
| Argument | Description |
|----------|-------------|
| `--skip-gates` | Emergency bypass |
| `--dry-run` | Preview without changes |
## Execution Instructions
Use `TodoWrite` to create todos from phases.
## Pre-Checks
Verify NOT on main. Check for tracker issue.
<!-- USER-EXTENSION-START: pre-gate -->
<!-- USER-EXTENSION-END: pre-gate -->
## Phase 1: Gate Checks
**If `--skip-gates`, skip to Phase 2.**
### Gate 1.1: No Uncommitted Changes
```bash
git status --porcelain
```
### Gate 1.2: Tests Pass
```bash
npm test
```
<!-- USER-EXTENSION-START: gates -->
<!-- USER-EXTENSION-END: gates -->
Report gate results.
<!-- USER-EXTENSION-START: post-gate -->
<!-- USER-EXTENSION-END: post-gate -->
## Phase 2: Create and Merge PR
### Step 2.1: Push Branch
### Step 2.2: Create PR
```bash
gh pr create --base main --head $(git branch --show-current)
```
<!-- USER-EXTENSION-START: post-pr-create -->
<!-- USER-EXTENSION-END: post-pr-create -->
### Step 2.3-2.5: Get approval, merge PR
```bash
gh pr merge --merge
git checkout main && git pull
```
<!-- USER-EXTENSION-START: post-merge -->
<!-- USER-EXTENSION-END: post-merge -->
## Phase 3: Cleanup
Close tracker, close branch in project, delete branch.
<!-- USER-EXTENSION-START: post-close -->
<!-- USER-EXTENSION-END: post-close -->
## Comparison: /merge-branch vs /prepare-release
| Feature | /merge-branch | /prepare-release |
|---------|---------------|------------------|
| Version bump | No | Yes |
| Git tag | No | Yes |
| Use for | Feature branches | Versioned releases |
---
**End of Merge Branch**
