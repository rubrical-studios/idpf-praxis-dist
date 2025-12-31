# Agile-Driven Development Framework - Core
**Version:** v0.19.0
**Module:** Core (loaded at session startup)

---

## Terminology
1. **User Story**: Feature from user's perspective with acceptance criteria
2. **Sprint**: Time-boxed iteration (1-2 weeks)
3. **Epic**: Large feature area with related stories
4. **Story Points**: Relative effort estimate (Fibonacci: 1,2,3,5,8,13,21)
5. **Definition of Done**: Checklist for story completion

---

## Agile Workflow
```
Product Backlog Creation → Sprint Planning → Story Development (TDD) → Sprint Review → Sprint Retrospective → Repeat
```

---

## Key Commands

### Backlog Operations (GitHub-Native)
| Command | Description |
|---------|-------------|
| Create-Backlog | Create GitHub epics/stories from PRD |
| Add-Story | Create new story with epic auto-detection |
| Prioritize-Backlog | Update Priority field (P0/P1/P2) |

### Story Workflow
| Command | Description |
|---------|-------------|
| Start-Story [#ID] | Begin development (In Progress + assign) |
| Story-Complete [#ID] | Mark story as done |

### Development Commands
| Command | Description |
|---------|-------------|
| Done-Next-Step | TDD iteration successful, proceed |
| Rollback-Previous-Step | Undo last iteration |
| Run-Tests | Execute full test suite |

### GitHub Integration
- All backlog commands work against GitHub issues
- No local backlog files created
- Requires `.gh-pmu.yml` and `gh pmu` extension
- Stories linked to epics via `gh pmu sub add`

---

## TDD Cycle (RED-GREEN-REFACTOR)

### RED Phase
1. Write failing test
2. Verify FAIL
3. "Done-Next-Step"

### GREEN Phase
1. Write minimal implementation
2. Verify PASS
3. "Done-Next-Step"

### REFACTOR Phase
1. Analyze for refactoring
2. Refactor keeping tests passing
3. "Done-Next-Step"

**Skills:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery

---

## Story Development Flow

**Start-Story [#ID]:**
1. `gh pmu move [#ID] --status in_progress`
2. Assign to first available
3. Display story with acceptance criteria
4. Break into testable behaviors
5. Begin TDD cycles

**Story-Complete [#ID]:**
1. Verify all acceptance criteria met
2. Run full test suite
3. `gh pmu move [#ID] --status done`
4. Unassign issue
5. Commit with story reference

---

## User Story Format
```markdown
### Story [ID]: [Title]
**As a** [user type]
**I want** [goal]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

**Story Points:** [1,2,3,5,8,13,21]
**Priority:** [High/Medium/Low]
**Status:** [Backlog/Selected/In Progress/Done]
```

---

## Definition of Done (Global)
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code follows project conventions
- [ ] No known bugs
- [ ] Documentation updated (if applicable)

---

## Additional Documentation
Loaded on-demand: Templates, Commands, Best Practices, Transitions

---

**End of Core Module**
