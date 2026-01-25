---
version: "v0.33.0"
allowed-tools: Bash
description: Transfer issue between releases/sprints (project)
argument-hint: "<issue-number> [--to branch]"
---
Transfer an issue between releases or sprints.
```bash
node .claude/scripts/shared/transfer-issue.js "$ARGUMENTS"
```
Report the result to the user.
