---
version: "v0.33.0"
allowed-tools: Bash
description: Switch branch/sprint context (project)
argument-hint: "[branch-name]"
---
Switch between branch and sprint contexts.
```bash
node .claude/scripts/shared/switch-branch.js "$ARGUMENTS"
```
After switching, report the new context to the user.
