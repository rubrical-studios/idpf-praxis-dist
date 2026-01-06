---
version: "v0.22.0"
allowed-tools: Bash
description: End current sprint (project)
---
**Source:** Templates/commands/end-sprint.md

End the current sprint, running review and retrospective.

```bash
node .claude/scripts/shared/end-sprint.js "$ARGUMENTS"
```

Report the sprint closure to the user.
