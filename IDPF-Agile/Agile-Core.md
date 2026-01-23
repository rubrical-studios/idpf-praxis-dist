# Agile-Driven Development Framework - Core
**Version:** v0.31.0
**Module:** Core (loaded at session startup)

## Terminology
1. **User Story**: Feature from user's perspective with acceptance criteria
2. **Sprint**: Time-boxed iteration (typically 1-2 weeks)
3. **Epic**: Large feature area containing multiple related stories
4. **Story Points**: Relative effort estimate (Fibonacci: 1, 2, 3, 5, 8, 13, 21)
5. **Definition of Done (DoD)**: Checklist for story completion

## Agile Workflow
```
Product Backlog Creation → Sprint Planning (select stories) → Story Development (TDD cycles) → Sprint Review → Sprint Retrospective → Repeat or Complete
```

## Key Commands
### Backlog Operations (GitHub-Native)
* **"Create-Backlog"** - Create GitHub epics/stories from PRD
* **"Add-Story"** - Create new story issue with epic auto-detection
* **"Prioritize-Backlog"** - Update Priority field (P0/P1/P2)

### Story Workflow
* **"Start-Story [#ID]"** - Begin development (In Progress + assign)
* **"Story-Complete [#ID]"** - Mark story as done

### Development Commands
* **"Run-Tests"** - Execute full test suite
* **"Show-Coverage"** - Display test coverage report

### GitHub Integration
* All backlog commands work against GitHub issues
* Requires `.gh-pmu.yml` configuration and `gh pmu` extension
* Stories linked to epics via `gh pmu sub add`

## TDD Cycle (RED-GREEN-REFACTOR)
Each task follows **RED-GREEN-REFACTOR** autonomously:
### RED Phase
1. Write failing test for specific behavior
2. Run test, verify it FAILS
3. Proceed to GREEN phase
### GREEN Phase
1. Write minimal implementation to pass test
2. Run test, verify it PASSES
3. Proceed to REFACTOR phase
### REFACTOR Phase
1. Analyze code for refactoring opportunities
2. Refactor while keeping tests passing
3. Proceed to next behavior or complete story

**TDD Execution:** Phases execute autonomously. Only workflow checkpoint is story completion (In Review -> Done).

**Skills Available:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`

## Story Development Flow
**"Start-Story [#ID]":**
1. Update status: `gh pmu move [#ID] --status in_progress`
2. Assign to first available assignee
3. Display story details with acceptance criteria
4. Break down into testable behaviors
5. Begin TDD cycles

**"Story-Complete [#ID]":**
1. Verify all acceptance criteria met
2. Run full test suite (no regressions)
3. Update status: `gh pmu move [#ID] --status done`
4. Unassign the issue
5. Commit with story reference

## User Story Format
```markdown
### Story [ID]: [Title]
**As a** [type of user]
**I want** [goal/desire]
**So that** [benefit/value]
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
**Story Points:** [1, 2, 3, 5, 8, 13, 21]
**Priority:** [High/Medium/Low]
**Status:** [Backlog/Selected/In Progress/Done]
```

## Definition of Done (Global)
All stories must meet:
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code follows project conventions
- [ ] No known bugs
- [ ] Documentation updated (if applicable)

## Additional Documentation
Load on-demand: **Templates**, **Commands**, **Best Practices**, **Transitions**

**End of Core Module**
