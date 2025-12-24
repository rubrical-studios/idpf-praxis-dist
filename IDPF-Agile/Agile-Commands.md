# Agile Commands
**Version:** v0.2.0
**Source:** IDPF-Agile/Agile-Commands.md

## Backlog Commands
| Command | Description |
|---------|-------------|
| `Create-Backlog` | Create epics/stories from PRD |
| `Add-Story` | New story with epic auto-detection |
| `Refine-Story [#ID]` | Update title/description |
| `Estimate-Story [#ID]` | Set Estimate field |
| `Prioritize-Backlog` | Update Priority (P0/P1/P2) |
| `Split-Story [#ID]` | Break into smaller stories |
| `Archive-Story [#ID]` | Move to Parking Lot |

**Create-Backlog:** Select PRD → Extract epics/stories → Create issues → Link via `gh pmu sub add` → Set backlog status → Offer release assignment

## Story Workflow
| Command | Description |
|---------|-------------|
| `Start-Story [#ID]` | Begin work (In Progress + assign) |
| `Story-Status` | Check progress |
| `Story-Complete [#ID]` | Mark done |

## Sprint Commands
| Command | Slash | Description |
|---------|-------|-------------|
| `Plan-Sprint` | `/plan-sprint` | Select epics for sprint |
| `Sprint-Status` | `/sprint-status` | Show progress |
| `Sprint-Retro` | `/sprint-retro` | Run retrospective |
| `End-Sprint` | `/end-sprint` | Close with review |

## Development Commands
| Command | Description |
|---------|-------------|
| `Done-Next-Step` | TDD iteration successful |
| `Rollback-Previous-Step` | Undo last iteration |
| `Run-Tests` | Full test suite |
| `Show-Coverage` | Display coverage |
| `Refactor-Now` | Dedicated refactoring |

**TDD Skills:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`, `test-writing-patterns`

## Project Commands
| Command | Description |
|---------|-------------|
| `Velocity-Report` | Use GitHub project board |
| `Push-Changes` | Commit and push |
| `Project-Complete` | Finalize with PR |

## Release Lifecycle Commands
Trunk-based: tags on main after PR merge.

| Command | Slash | Description |
|---------|-------|-------------|
| `Open-Release` | `/open-release` | Open branch + tracker |
| `Prepare-Release` | `/prepare-release` | Validate → merge → tag → deploy |
| `Close-Release` | `/close-release` | Notes → GitHub Release → cleanup |

**Flow:** `Open-Release` → [Work] → `Prepare-Release` → `Close-Release`
- Open: `gh pmu release start` → checkout branch → create Releases/ dir
- Prepare: Phase 0-4 (analysis, versions, validation, git ops, verify)
- Close: Generate notes → GitHub Release → close tracker → delete branch

## Special Commands
| Command | Description |
|---------|-------------|
| `Story-Blocked [#ID] [reason]` | Add blocked label |
| `Story-Growing [#ID]` | Add scope-creep label |
| `Emergency-Bug [desc]` | Create P0 issue |
| `Pivot [direction]` | Review stories: keep/archive/close |

## Utility Commands
| Command | Description |
|---------|-------------|
| `List-Commands` | Show all with descriptions |
| `List-Cmds` | Show without descriptions |
| `Help [cmd]` | Detailed help |
| `Review-Last` | Review last reply |

**End of Commands**
