---
version: "v0.22.0"
allowed-tools: Bash
description: Switch release/sprint context (project)
---
**Source:** Templates/commands/switch-release.md

Switch between release and sprint contexts.

```bash
node .claude/scripts/shared/switch-release.js "$ARGUMENTS"
```

After switching, report the new context to the user.
