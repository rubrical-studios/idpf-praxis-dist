---
version: "v0.32.1"
description: Discover, view, and manage extension points in release commands
argument-hint: <subcommand> [options]
---
# /extensions
Unified management of extension points across release commands.
## Subcommands
| Subcommand | Description |
|------------|-------------|
| `list` | Show all extension points |
| `list --command X` | Show for specific command |
| `view X:Y` | Show content of extension point |
| `edit X:Y` | Edit extension point |
| `validate` | Check formatting |
| `matrix` | Cross-command comparison |
| `recipes` | Show common patterns |
| `recipes <category>` | Show recipes for category |
## Target Commands
| Command | Path |
|---------|------|
| `/create-branch` | `.claude/commands/create-branch.md` |
| `/prepare-release` | `.claude/commands/prepare-release.md` |
| `/merge-branch` | `.claude/commands/merge-branch.md` |
| `/destroy-branch` | `.claude/commands/destroy-branch.md` |
| `/prepare-beta` | `.claude/commands/prepare-beta.md` |
## Subcommand: list
Extract extension points using marker pattern:
```
<!-- USER-EXTENSION-START: {name} -->
...content...
<!-- USER-EXTENSION-END: {name} -->
```
## Subcommand: view
`/extensions view prepare-release:post-validation`
## Subcommand: edit
Locate block, present current content, ASK USER for new content, update file.
## Subcommand: validate
Check matching pairs, valid names, no nesting, documented.
## Subcommand: matrix
Build matrix showing which commands have which extension points.
## Subcommand: recipes
Load from `.claude/metadata/extension-recipes.json`.
Categories: ci, coverage, notifications, docs, security
## Extension Point Naming
| Pattern | Purpose |
|---------|---------|
| `pre-*` | Before a phase |
| `post-*` | After a phase |
| `pre-commit` | Generate artifacts before commit |
| `checklist-*` | Verification items |
---
**End of Extensions Command**
