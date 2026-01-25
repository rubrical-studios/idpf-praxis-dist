---
version: "v0.33.0"
description: Create a branch with tracker issue (project)
argument-hint: <branch-name> (e.g., release/v0.16.0, my-feature, bugfix-123)
---
# /create-branch
Creates a new branch and associated tracker issue.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-create` | Before branch creation | Custom validation |
| `post-create` | After branch created | Notifications, setup |
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `$1` | Yes | Branch name |
## Workflow
### Step 1: Validate Arguments
Branch name must be valid git branch name.
### Step 2: Check Working Directory
```bash
git status --porcelain
```
If changes exist, prompt to commit or stash.
<!-- USER-EXTENSION-START: pre-create -->
<!-- USER-EXTENSION-END: pre-create -->
### Step 3: Create Branch with Tracker
```bash
gh pmu branch start --name "$BRANCH"
```
### Step 4: Switch to Branch
```bash
git checkout "$BRANCH"
```
### Step 5: Push Branch
```bash
git push -u origin "$BRANCH"
```
<!-- USER-EXTENSION-START: post-create -->
<!-- USER-EXTENSION-END: post-create -->
### Step 6: Report Completion
Report branch name, tracker issue, next steps.
---
**End of Create Branch**
