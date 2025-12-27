---
version: v0.15.4
description: Open a new release with branch and tracker
argument-hint: <track/version> (e.g., release/v1.2.0)
---

# Open Release

Opens a new release branch and creates a tracker issue for the release lifecycle.

## Prerequisites

- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
- Git working directory clean (no uncommitted changes)

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `$ARGUMENTS` | Yes | Branch name with track prefix (e.g., `release/v1.2.0`, `patch/v1.2.1`) |

**Examples:**
- `/open-release release/v1.2.0` - Open a feature release
- `/open-release patch/v1.2.1` - Open a patch release
- `/open-release hotfix/v1.2.2` - Open a hotfix release

## Workflow

### Step 1: Validate Arguments

Branch name must include track prefix (contain `/`):

```
If $ARGUMENTS is empty:
  Error: "Branch required. Usage: /open-release release/v1.0.0"

If $ARGUMENTS does not contain "/":
  Error: "Missing track prefix in branch name.

  Usage: /open-release <track>/<version>

  Examples:
    /open-release release/v1.0.0
    /open-release patch/v1.0.1
    /open-release hotfix/v1.0.2"
```

### Step 2: Check Working Directory

```bash
git status --porcelain
```

If changes exist, prompt user to commit or stash before proceeding.

### Step 3: Create Release

```bash
gh pmu release start --branch "$ARGUMENTS"
```

This automatically:
1. Creates git branch with the specified name
2. Creates tracker issue in GitHub project
3. Sets the release as "current" for subsequent operations

### Step 4: Switch to Release Branch

```bash
git checkout "$ARGUMENTS"
```

### Step 5: Report Completion

Output:
```
Release opened.

Branch: $ARGUMENTS
Tracker: #[tracker-issue-number]

Next steps:
1. Assign issues: gh pmu move [#] --release current
2. Work issues: work #N
3. When ready: /prepare-release
4. After deploy: /close-release
```

---

## Release Lifecycle

```
/open-release release/v1.2.0    <-- YOU ARE HERE
    |-- Creates branch + tracker
         |
         v
    [Work on release branch]
         |
         v
/prepare-release
    |-- PR -> merge -> tag -> deploy
         |
         v
/close-release
    |-- GitHub Release -> cleanup
```

---

## Error Handling

| Error | Resolution |
|-------|------------|
| "Branch required" | Provide branch: `/open-release release/v1.2.0` |
| "Missing track prefix" | Include track: `release/v1.0.0`, `patch/v1.0.1`, etc. |
| "Uncommitted changes" | Commit or stash changes first |
| "Branch already exists" | Use existing branch or choose different version |

---

**End of Open Release**
