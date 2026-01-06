---
version: "v0.22.0"
description: Discover, view, and manage extension points in release commands
argument-hint: <subcommand> [options]
---

# /extensions
**Source:** Templates/commands/extensions.md

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

## Target Commands
| Command | File |
|---------|------|
| `/open-release` | `Templates/commands/open-release.md` |
| `/prepare-release` | `Templates/commands/prepare-release.md` |
| `/close-release` | `Templates/commands/close-release.md` |
| `/prepare-beta` | `Templates/commands/prepare-beta.md` |

## Subcommand: list
**Usage:** `/extensions list [--command <name>]`

Parse extension points using marker pattern:
```
<!-- USER-EXTENSION-START: {name} -->
...content...
<!-- USER-EXTENSION-END: {name} -->
```

Extension point **has content** if there is non-whitespace, non-comment text between markers.

## Subcommand: view
**Usage:** `/extensions view <command>:<point>`
**Example:** `/extensions view prepare-release:post-validation`

Locate and display content between START and END markers.

## Subcommand: edit
**Usage:** `/extensions edit <command>:<point>`

1. Present current content
2. **ASK USER** for new content
3. Update file
4. Confirm change

## Subcommand: validate
**Usage:** `/extensions validate`

Validate each block for:
| Check | Description |
|-------|-------------|
| Matching pairs | Every START has a matching END |
| Valid names | Names match `[a-z][a-z0-9-]*` pattern |
| No nesting | Extension blocks are not nested |
| Documented | Each point appears in "Available Extension Points" table |

## Subcommand: matrix
**Usage:** `/extensions matrix`

Build union of all extension point names across all target commands.
Legend: ● = has content, ○ = empty, - = not applicable

## Extension Point Naming Convention
| Pattern | Used By | Purpose |
|---------|---------|---------|
| `pre-*` | All | Before a workflow phase |
| `post-*` | All | After a workflow phase |
| `checklist` | open-release | Single verification checklist |
| `checklist-before-*` | prepare-*, close-* | Pre-action verification items |
| `checklist-after-*` | prepare-*, close-* | Post-action verification items |

---

**End of Extensions Command**
