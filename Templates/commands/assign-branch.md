---
version: "v0.33.0"
allowed-tools: Bash, AskUserQuestion
description: "Assign issues to a branch: [#issue...] [branch/...] [--all] (project)"
argument-hint: "[#issue...] [branch/name] [--all]"
---
Assign issues to a branch.
Run the assign-branch script:
```bash
node .claude/scripts/shared/assign-branch.js "$ARGUMENTS"
```
## Handling "NO_RELEASE_FOUND" Output
If script outputs `NO_RELEASE_FOUND`:
1. Parse SUGGESTIONS lines for branch options
2. Use `AskUserQuestion` to let user select
3. Create branch: `gh pmu branch start --name "<selected-branch>"`
4. Re-run assign-branch command
## Normal Output
If branches exist, report result directly.
