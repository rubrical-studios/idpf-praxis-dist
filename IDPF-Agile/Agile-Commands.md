# Agile-Driven Development Framework - Commands
**Module:** Commands (loaded on-demand)

## Backlog Management
All commands work against GitHub issues. No local backlog files created.
**Prerequisites:** `.gh-pmu.yml` configured, `gh pmu` extension installed

| Command | Description |
|---------|-------------|
| `Create-Backlog` | Create GitHub epics/stories from PRD |
| `Show-Backlog` | Display backlog from GitHub project board |
| `Add-Story` | Create new story with epic auto-detection |
| `Refine-Story [#ID]` | Update story title/description |
| `Estimate-Story [#ID]` | Set Estimate field (numeric) |
| `Prioritize-Backlog` | Update Priority field (P0/P1/P2) |
| `Split-Story [#ID]` | Break into smaller stories |
| `Archive-Story [#ID]` | Move to Parking Lot with reason |

### Create-Backlog Workflow
1. Identify PRD (prompt if multiple in `PRD/`)
2. Parse: Feature Areas → Epics, Capabilities → Stories
3. Create Epic issues: `--label "epic"`
4. Create Story issues: `--label "story"` with User Story + AC
5. Link: `gh pmu sub add [epic#] [story#]`
6. Set PRD field, set status backlog
7. Update PRD status to "Backlog Created"
8. Create completion story for PRD status update

### Show-Backlog: Query `gh pmu board` filtered by PRD field
### Add-Story: Auto-detect epic, confirm, create, link, set backlog
### Split-Story: Create smaller stories, link to same epic, close original
### Archive-Story: Set parking_lot status, comment with reason

## Story Workflow
| Command | Description |
|---------|-------------|
| `Start-Story [#ID]` | In Progress + assign, display AC, begin TDD |
| `Story-Status` | Check current story progress |
| `Story-Complete [#ID]` | Verify criteria, run tests, done, unassign, check PRD completion |

### Story-Complete PRD Check
If completing "Update PRD status to Complete" story:
1. Verify all other PRD stories are Done
2. Update PRD status to "Complete"
3. `git mv PRD/PRD-[Name].md PRD/Implemented/PRD-[Name].md`
4. Report: "PRD complete and archived to PRD/Implemented/"

## Sprint Commands (Deferred)
Sprint tracking deferred - use GitHub project board.

| `Plan-Sprint`, `Show-Sprint`, `Sprint-Progress`, `Sprint-Review`, `Sprint-Retro`, `End-Sprint` | "Sprint tracking deferred" |

## Development
| Command | Description |
|---------|-------------|
| `Done-Next-Step` | TDD iteration successful, proceed |
| `Rollback-Previous-Step` | Undo last iteration |
| `Run-Tests` | Execute full test suite |
| `Show-Coverage` | Display coverage report |
| `Refactor-Now` | Dedicated refactoring session |

**TDD Skills:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

## Project
| Command | Description |
|---------|-------------|
| `Project-Status` | Deferred - use GitHub board |
| `Velocity-Report` | Deferred - use GitHub board |
| `Push-Changes` | Commit and push |
| `Create-Release` | Tag release |
| `Project-Complete` | Finalize, create PR |

## Special Scenarios
| Command | Description |
|---------|-------------|
| `Story-Blocked [#ID] [reason]` | Add `blocked` label + comment |
| `Story-Growing [#ID]` | Add `scope-creep` label |
| `Emergency-Bug [desc]` | Create P0 issue + `emergency` label |
| `Pivot [direction]` | Review each story: keep/archive/close |

## Utility
| Command | Description |
|---------|-------------|
| `List-Commands` | Show with descriptions |
| `List-Cmds` | Show without descriptions |
| `Help [command]` | Detailed help |
| `Review-Last` | Review last reply accuracy |

---
**End of Commands Module**
