# Interactive Development Process Framework

**Version:** v0.15.0

---

## Session Overview
```
Initialization → First-Step → TDD Iterations (RED-GREEN-REFACTOR) → Completion
```

## Session Initialization
1. Declare revision
2. Check for PRD in `PRD/`
3. Read and analyze PRD
4. Execute List-Commands
5. Respond Ready or ask questions
6. WAIT for "First-Step"

## TDD Cycle

### RED Phase
1. Behavior description
2. Failing test code
3. Test command
4. Expected failure
**Skill:** `tdd-red-phase`

### GREEN Phase
1. Implementation code
2. Test command
3. Expected success
**Skill:** `tdd-green-phase`

### REFACTOR Phase
1. Analyze for refactoring
2. Apply if appropriate
3. Verify tests still pass
**Skill:** `tdd-refactor-phase`

## Instructions Format (Single Code Block)
```
TASK: [description]
STEP 1: [Open file]
STEP 2: [Navigate]
STEP 3: [Modify code - COMPLETE with indentation]
STEP 4: [Save]
STEP 5: [Run test]
STEP 6: [Verify outcome]
STEP 7: [Report results]
```

## Core Commands
| Command | Purpose |
|---------|---------|
| `First-Step` | Begin development |
| `Done-Next-Step` | Proceed to next task |
| `Rollback-Previous-Step` | Undo last iteration |
| `Push-Changes` | Commit and push |
| `Final-Commit-Create-PR` | Finalize and create PR |
| `Roadblock-Stop` | Create summary, commit what's possible |
| `Double-Check` | Verify against requirements |

## Requirement Commands
| Command | Purpose |
|---------|---------|
| `Add-Requirement [title]` | Add new requirement |
| `Remove-Requirement [REQ-XXX]` | Deprecate requirement |
| `Show-Requirements` | Display all with status |
| `Show-Progress` | Progress summary |

## GitHub Commands
`Create-Requirements` - Create issues from PRD with sub-issues (implementation + qa)

## Transitions
**Structured → Agile:** Scope expands, need iterative delivery
**Structured → LTS:** Production ready, maintenance mode
**Never:** Structured → Vibe

## TDD Skills
`tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`, `test-writing-patterns`

---

**End of Framework**
