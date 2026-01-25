---
version: "v0.32.1"
description: Safely delete branch with confirmation (project)
argument-hint: [branch-name] [--force]
---
# /destroy-branch
Safely abandon and delete a branch. Destructive operation requiring confirmation.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-destroy` | Before confirmation | Pre-destruction validation |
| `post-confirm` | After confirmation | Actions before deletion |
| `post-destroy` | After deletion | Cleanup, notifications |
## Arguments
| Argument | Description |
|----------|-------------|
| `[branch-name]` | Branch to destroy (default: current) |
| `--force` | Skip confirmation |
## Pre-Checks
```bash
BRANCH=${1:-$(git branch --show-current)}
```
Cannot destroy main/master. Branch must exist.
<!-- USER-EXTENSION-START: pre-destroy -->
<!-- USER-EXTENSION-END: pre-destroy -->
## Phase 1: Confirmation
Show what will be destroyed (unmerged commits, artifacts).
**ASK USER:** Type full branch name to confirm.
<!-- USER-EXTENSION-START: post-confirm -->
<!-- USER-EXTENSION-END: post-confirm -->
## Phase 2: Close Tracker
```bash
gh issue close [TRACKER] --reason "not planned" --comment "Branch destroyed"
gh pmu branch close
```
## Phase 3: Delete Artifacts
Delete `Releases/{prefix}/{identifier}/` if exists.
## Phase 4: Delete Branch
```bash
git checkout main
git push origin --delete "$BRANCH"
git branch -D "$BRANCH"
```
<!-- USER-EXTENSION-START: post-destroy -->
<!-- USER-EXTENSION-END: post-destroy -->
## Completion
Report destroyed components.
---
**End of Destroy Branch**
