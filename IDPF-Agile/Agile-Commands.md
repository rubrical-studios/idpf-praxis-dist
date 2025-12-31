# Agile-Driven Development Framework - Commands
**Version:** v0.19.0
**Module:** Commands (loaded on-demand)

---

## Prerequisites
- `.gh-pmu.yml` configured
- `gh pmu` extension installed

---

## Backlog Management

| Command | Description |
|---------|-------------|
| Create-Backlog | Create GitHub epics/stories from PRD |
| Add-Story | Create story with epic auto-detection |
| Refine-Story [#ID] | Update story title/description |
| Estimate-Story [#ID] | Set Estimate field |
| Prioritize-Backlog | Update Priority (P0/P1/P2) |
| Split-Story [#ID] | Break into smaller stories |
| Archive-Story [#ID] | Move to Parking Lot status |

### Create-Backlog Workflow
1. Identify/select PRD
2. Parse Feature Areas → Epics, Capabilities → Stories
3. Create epic issues with `epic` label
4. Create story issues with `story` label
5. Link stories to epics: `gh pmu sub add [epic#] [story#]`
6. Set PRD field on all issues
7. Set initial status: `gh pmu move [story#] --status backlog`
8. Offer optional release assignment
9. Update PRD status to "Backlog Created"
10. Create completion story

---

## Story Workflow

| Command | Description |
|---------|-------------|
| Start-Story [#ID] | Begin work (In Progress + assign) |
| Story-Status | Check current progress |
| Story-Complete [#ID] | Mark done |

### Start-Story
1. `gh pmu move [#ID] --status in_progress`
2. Assign
3. Display story with criteria
4. Begin TDD

### Story-Complete
1. Verify criteria met
2. Run tests
3. `gh pmu move [#ID] --status done`
4. Unassign
5. Commit with reference
6. Check PRD completion → archive if final story

---

## Sprint Commands

| Command | Description | Slash Command |
|---------|-------------|---------------|
| Plan-Sprint | Select epics for new sprint | /plan-sprint |
| Sprint-Status | Show progress | /sprint-status |
| Sprint-Retro | Run retrospective | /sprint-retro |
| End-Sprint | Close with review | /end-sprint |

---

## Development Commands

| Command | Description |
|---------|-------------|
| Done-Next-Step | TDD iteration successful |
| Rollback-Previous-Step | Undo last iteration |
| Run-Tests | Execute full test suite |
| Show-Coverage | Display coverage report |
| Refactor-Now | Dedicated refactoring |

**TDD Skills:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

---

## Release Lifecycle

| Command | Description | Slash Command |
|---------|-------------|---------------|
| Open-Release | Open branch + tracker | /open-release |
| Prepare-Release | Validate, merge, tag, deploy | /prepare-release |
| Close-Release | Notes, GitHub Release, cleanup | /close-release |

### Flow
```
Open-Release → [Work on release branch] → Prepare-Release → Close-Release
```

---

## Special Scenarios

| Command | Description |
|---------|-------------|
| Story-Blocked [#ID] [reason] | Add `blocked` label + comment |
| Story-Growing [#ID] | Add `scope-creep` label |
| Emergency-Bug [desc] | Create P0 `emergency` issue |
| Pivot [direction] | Review each story: Keep/Archive/Close |

---

## Utility Commands

| Command | Description |
|---------|-------------|
| List-Commands | Show all with descriptions |
| List-Cmds | Show all without descriptions |
| Help [command] | Detailed command help |
| Review-Last | Review accuracy |

---

**End of Commands Module**
