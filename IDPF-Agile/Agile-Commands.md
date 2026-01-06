# Agile-Driven Development Framework - Commands
**Version:** v0.22.0
**Source:** IDPF-Agile/Agile-Commands.md
**Module:** Commands (loaded on-demand)

---

## Backlog Management Commands
**Prerequisites:** `.gh-pmu.yml` configured, `gh pmu` extension installed

| Command | Description |
|---------|-------------|
| `Create-Backlog` | Create GitHub epics/stories from PRD |
| `Add-Story` | Create story with epic auto-detection |
| `Refine-Story [#ID]` | Update story title/description |
| `Estimate-Story [#ID]` | Set Estimate field |
| `Prioritize-Backlog` | Update Priority field (P0/P1/P2) |
| `Split-Story [#ID]` | Break into smaller stories |
| `Archive-Story [#ID]` | Move to Parking Lot status |

### Create-Backlog Workflow
1. **Identify PRD:** Prompt if multiple in `PRD/`
2. **Parse PRD:** Extract Feature Areas (Epics) and Capabilities (Stories)
3. **Create Epic Issues:** `gh issue create --title "Epic: [Name]" --label "epic"`
4. **Create Story Issues:** `gh issue create --title "Story: [Name]" --label "story"`
5. **Link Stories:** `gh pmu sub add [epic#] [story#]`
6. **Set PRD Field:** TEXT field "PRD" = filename
7. **Set Status:** `gh pmu move [story#] --status backlog`
8. **Offer Release Assignment:** Check `gh pmu release list --open`, prompt if exists
9. **Update PRD Status:** "Backlog Created"
10. **Create Completion Story:** "Update PRD status to Complete"

### Add-Story Workflow
1. Get description from user
2. Auto-detect most relevant epic
3. Confirm epic selection
4. Create issue with `story` label
5. Link to epic: `gh pmu sub add [epic#] [story#]`
6. Set status: `gh pmu move [story#] --status backlog`

---

## Story Workflow Commands
| Command | Description |
|---------|-------------|
| `Start-Story [#ID]` | Begin work (In Progress + assign) |
| `Story-Status` | Check current story progress |
| `Story-Complete [#ID]` | Mark done |

**Start-Story:** Update status → Assign → Display details → Break into behaviors → Begin TDD
**Story-Complete:** Verify criteria → Run tests → Update status → Unassign → Commit → Check PRD completion

---

## Sprint Commands
| Command | Slash Command |
|---------|---------------|
| `Plan-Sprint` | `/plan-sprint` |
| `Sprint-Status` | `/sprint-status` |
| `Sprint-Retro` | `/sprint-retro` |
| `End-Sprint` | `/end-sprint` |

**Prerequisites:** Active release, gh pmu microsprint support
**Workflow:** `/plan-sprint --name "name"` → Add epics → Work issues → `/sprint-status` → `/end-sprint`

---

## Development Commands
| Command | Description |
|---------|-------------|
| `Run-Tests` | Execute full test suite |
| `Show-Coverage` | Display coverage report |

**TDD Execution:** RED→GREEN→REFACTOR autonomous. Checkpoints at In Review and Done only.
**Skills:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`, `test-writing-patterns`

---

## Release Lifecycle Commands
| Command | Slash Command |
|---------|---------------|
| `Open-Release` | `/open-release` |
| `Prepare-Release` | `/prepare-release` |
| `Close-Release` | `/close-release` |

### Open-Release Workflow
1. Validate version starts with `v`
2. Check working directory clean
3. `gh pmu release start --branch "release/$VERSION"`
4. `git checkout "release/$VERSION"`
5. `mkdir -p "Releases/$VERSION"`

### Close-Release Workflow
1. Verify active release and tag deployed
2. Generate `Releases/$VERSION/release-notes.md`
3. Create GitHub Release on source repo
4. `gh pmu release close`
5. Delete branch (local + remote)
6. Commit artifacts to main

---

## Special Scenario Commands
| Command | Description |
|---------|-------------|
| `Story-Blocked [#ID] [reason]` | Add `blocked` label + comment |
| `Story-Growing [#ID]` | Add `scope-creep` label |
| `Emergency-Bug [desc]` | Create P0 issue with `emergency` label |
| `Pivot [direction]` | Review each story: Keep/Archive/Close |

---

## Utility Commands
| Command | Description |
|---------|-------------|
| `List-Commands` | Show all commands |
| `Help [command]` | Get detailed help |

---

**End of Commands Module**
