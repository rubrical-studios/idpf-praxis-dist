---
version: "v0.37.2"
description: Discover, view, and manage extension points in release commands
argument-hint: "list|view|edit|validate|matrix|recipes [args]"
---
<!-- MANAGED -->
# /extensions
Unified management of extension points across release commands.
## Subcommands
| Subcommand | Description |
|------------|-------------|
| `list` | Show all extension points |
| `list --command X` | Show extension points for specific command |
| `view X:Y` | Show content of extension point Y in command X |
| `edit X:Y` | Edit extension point Y in command X |
| `validate` | Check all extension blocks are properly formatted |
| `matrix` | Show cross-command extension point comparison |
| `recipes` | Show common patterns for extension points |
| `recipes <category>` | Show recipes for specific category |
---
## Target Commands
| Command | Path |
|---------|------|
| `/create-branch` | `.claude/commands/create-branch.md` |
| `/prepare-release` | `.claude/commands/prepare-release.md` |
| `/merge-branch` | `.claude/commands/merge-branch.md` |
| `/destroy-branch` | `.claude/commands/destroy-branch.md` |
| `/prepare-beta` | `.claude/commands/prepare-beta.md` |
**Note:** Scan `.claude/commands/` for project commands.
---
## list
**Usage:** `/extensions list [--command <name>]`
1. Parse extension points using marker pattern:
   ```
   <!-- USER-EXTENSION-START: {name} -->
   <!-- USER-EXTENSION-END: {name} -->
   ```
2. Detect content (non-whitespace between markers)
3. Output format:
   ```
   /command-name
     ├── point-name : Description [HAS CONTENT]
     └── other-point : Description
   Total: N extension points (X with content, Y empty)
   ```
4. Filter by `--command` if specified
---
## view
**Usage:** `/extensions view <command>:<point>`
1. Parse `command:point` from argument
2. Find `USER-EXTENSION-START: {point}` marker
3. Return content between START and END markers
4. Show location (file:lines) and content
---
## edit
**Usage:** `/extensions edit <command>:<point>`
1. Locate extension block (same as view)
2. Present current content
3. **ASK USER** for new content
4. Replace content between markers
5. Confirm change
---
## validate
**Usage:** `/extensions validate`
Checks:
| Check | Description |
|-------|-------------|
| Matching pairs | Every START has matching END |
| Valid names | Pattern `[a-z][a-z0-9-]*` |
| No nesting | Extension blocks not nested |
| Documented | Point appears in extension table |
Output: `✓ point: valid` or `✗ point: error message`
---
## matrix
**Usage:** `/extensions matrix`
Build cross-command comparison:
```
Point           | create | prepare | beta |
----------------|--------|---------|------|
pre-create      |   ●    |    -    |  -   |
post-validation |   -    |    ●    |  ●   |
Legend: ● = has content, ○ = empty, - = N/A
```
---
## recipes
**Usage:** `/extensions recipes [category]`
1. Load from `.claude/metadata/extension-recipes.json`
2. No category: show category list (ci, coverage, notifications, docs, security)
3. With category: show recipes with template, prerequisites, apply-to commands
---
## Naming Convention
| Pattern | Purpose |
|---------|---------|
| `pre-*` | Before workflow phase |
| `post-*` | After workflow phase |
| `checklist` | Single verification checklist |
| `checklist-before-*` | Pre-action verification |
| `checklist-after-*` | Post-action verification |
---
**End of Extensions Command**
