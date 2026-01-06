---
version: "v0.22.0"
allowed-tools: Bash, AskUserQuestion
description: Assign issues to a release (project)
---
**Source:** Templates/commands/assign-release.md

Assign issues to a release.

```bash
node .claude/scripts/shared/assign-release.js "$ARGUMENTS"
```

## Handling "NO_RELEASE_FOUND"
If script outputs `NO_RELEASE_FOUND`:
1. Parse SUGGESTIONS lines (format: `number|branch|description`)
2. Use `AskUserQuestion` to let user select branch (recommended first)
3. Create release: `gh pmu release start --branch "<selected-branch>"`
4. Re-run assign-release with new release

## Normal Output
Report result to user directly.
