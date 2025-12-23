# Agile-Driven Development Framework - Commands
**Version:** v2.15.2
**Module:** Commands

---

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

### Create-Backlog Workflow
1. Select PRD from `PRD/`
2. Extract Feature Areas → Epics
3. Extract Capabilities → Stories
4. Create issues with labels (`epic`, `story`)
5. Link stories to epics via `gh pmu sub add`
6. Set initial status to backlog
7. Offer optional release assignment
8. Create "Update PRD status to Complete" story

## Story Workflow Commands
| Command | Description |
|---------|-------------|
| `Start-Story [#ID]` | Begin work (In Progress + assign) |
| `Story-Status` | Check progress |
| `Story-Complete [#ID]` | Mark done |

## Sprint Commands
| Command | Description |
|---------|-------------|
| `Plan-Sprint` | Select epics for sprint |
| `Sprint-Status` | Show progress |
| `Sprint-Retro` | Run retrospective |
| `End-Sprint` | Close with review |

## Development Commands
| Command | Description |
|---------|-------------|
| `Done-Next-Step` | TDD iteration successful |
| `Rollback-Previous-Step` | Undo last iteration |
| `Run-Tests` | Full test suite |
| `Refactor-Now` | Dedicated refactoring |

## Special Commands
| Command | Description |
|---------|-------------|
| `Story-Blocked [#ID] [reason]` | Add blocked label |
| `Story-Growing [#ID]` | Add scope-creep label |
| `Emergency-Bug [description]` | Create P0 issue |
| `Pivot [direction]` | Review each story (keep/archive/close) |

---

**End of Commands Module**
