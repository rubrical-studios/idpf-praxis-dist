# Agile-Driven Development Framework - Commands
**Version:** v0.23.2
**Module:** Commands (loaded on-demand)
**Source:** IDPF-Agile/Agile-Commands.md

## Backlog Management Commands
**Prerequisites:** `.gh-pmu.yml` configured, `gh pmu` extension installed

| Command | Description |
|---------|-------------|
| `Create-Backlog` | Create GitHub epics/stories from PRD |
| `Add-Story` | Create new story issue with epic auto-detection |
| `Refine-Story [#ID]` | Update story issue title/description |
| `Estimate-Story [#ID]` | Set Estimate field (numeric) in project |
| `Prioritize-Backlog` | Update Priority field (P0/P1/P2) |
| `Split-Story [#ID]` | Break story into smaller stories |
| `Archive-Story [#ID]` | Move story to "Parking Lot" status |

### Create-Backlog Workflow
1. **Identify PRD:** Prompt user to select PRD if multiple exist
2. **Parse PRD:** Extract Feature Areas (Epics) and Capabilities (Stories)
3. **Create Epic Issues:** `gh issue create --title "Epic: [Name]" --label "epic" --body "[Description]"`
4. **Create Story Issues:** `gh issue create --title "Story: [Name]" --label "story" --body "[User Story format]"`
5. **Link Stories to Epics:** `gh pmu sub add [epic#] [story#]`
6. **Set PRD Field:** Set TEXT field "PRD" to PRD filename on all issues
7. **Set Initial Status:** `gh pmu move [story#] --status backlog`
8. **Offer Release Assignment:** Check `gh pmu release list --open`, prompt if releases exist (assign later via `/assign-branch`)
9. **Update PRD Status:** Change PRD file status to "Backlog Created"
10. **Create Completion Story:** "Update PRD status to Complete"

### Add-Story Workflow
1. Get description, auto-detect epic, confirm, create issue with `story` label
2. Link to epic: `gh pmu sub add [epic#] [story#]`
3. Set status: `gh pmu move [story#] --status backlog`

### Split-Story Workflow
1. Get split details, create new stories
2. Link to parent epic, close original with comment

### Archive-Story Workflow
1. Get reason, update: `gh pmu move [#ID] --status parking_lot`
2. Add comment with archive reason

## Story Workflow Commands
| Command | Description |
|---------|-------------|
| `Start-Story [#ID]` | Begin work (In Progress + assign) |
| `Story-Status` | Check progress on current story |
| `Story-Complete [#ID]` | Mark story as done |

### Start-Story Workflow
1. `gh pmu move [#ID] --status in_progress`
2. Assign to first available assignee
3. Display story details, break down into testable behaviors

### Story-Complete Workflow
1. Verify all acceptance criteria met
2. Run tests (no regressions)
3. `gh pmu move [#ID] --status done`, unassign, commit with story reference
4. **Check PRD Completion:** If final story, verify all done, update PRD, move to `PRD/Implemented/`

## Sprint Commands
| Command | Description | Slash Command |
|---------|-------------|---------------|
| `Plan-Sprint` | Select epics for new sprint | `/plan-sprint` |
| `Sprint-Status` | Show sprint progress | `/sprint-status` |
| `Sprint-Retro` | Run retrospective | `/sprint-retro` |
| `End-Sprint` | Close sprint with review | `/end-sprint` |

**Prerequisites:** Active release context (`/switch-branch`), gh pmu microsprint support

**Workflow:**
1. `/plan-sprint --name "sprint-name"`
2. Add epics: `gh pmu microsprint add #<epic>`
3. Work issues via `work #N`
4. `/sprint-status` for progress
5. `/end-sprint` to close with review and retro

## Development Commands
| Command | Description |
|---------|-------------|
| `Run-Tests` | Execute full test suite |
| `Show-Coverage` | Display test coverage report |

**TDD Execution:** RED -> GREEN -> REFACTOR executes autonomously. Checkpoints: In Review, Done.

**TDD Skills:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`, `test-writing-patterns`

## Release Lifecycle Commands
| Command | Description | Slash Command |
|---------|-------------|---------------|
| `Create-Branch` | Create tracked branch with tracker issue | `/create-branch` |
| `Prepare-Release` | Validate, merge, tag, close, cleanup | `/prepare-release` |
| `Merge-Branch` | Gated merge (non-release branches) | `/merge-branch` |
| `Destroy-Branch` | Cancel/abandon branch with cleanup | `/destroy-branch` |

### Release Lifecycle Flow
```
/create-branch release/v0.16.0 -> Creates branch, tracker, directory
-> Work on release branch -> gh pmu move [#] --release current
-> /prepare-release (Phase 0-5: analysis, versions, validation, PR/merge/tag, verify, close)
```

### Create-Branch Workflow
1. Validate `[prefix]/[name]` format (e.g., `release/v0.16.0`, `patch/v0.15.4`)
2. Check no uncommitted changes
3. `gh pmu release start --branch "$BRANCH"`
4. `git checkout "$BRANCH"`
5. `git push -u origin "$BRANCH"`
6. `mkdir -p "Releases/$BRANCH"`

### Prepare-Release Workflow
Phase 0: Commit analysis | Phase 1: Version updates | Phase 2: Validation | Phase 3: PR/merge/tag | Phase 4: Verify deployment | Phase 5: Close (notes, GitHub Release, tracker, branch cleanup)

### Merge-Branch Workflow
For non-release branches (feature/, idpf/):
1. Run gates (clean directory, tests pass)
2. Create PR, wait for approval, merge
3. Close tracker, delete branch

### Destroy-Branch Workflow
1. Confirm by typing full branch name
2. Close tracker ("not planned"), delete branch, delete artifacts

## Special Scenario Commands
| Command | Description |
|---------|-------------|
| `Story-Blocked [#ID] [reason]` | Add `blocked` label and reason |
| `Story-Growing [#ID]` | Add `scope-creep` label |
| `Emergency-Bug [description]` | Create P0 issue with `emergency` label |
| `Pivot [new direction]` | Review each story (keep/archive/close) |

## Utility Commands
| Command | Description |
|---------|-------------|
| `List-Commands` | Show all available commands |
| `Help [command]` | Get detailed help |

**End of Commands Module**
