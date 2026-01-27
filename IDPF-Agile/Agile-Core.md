# Agile-Driven Development Framework - Core
**Version:** v0.33.3
**Module:** Core (loaded at session startup)
## Terminology
1. **User Story**: Feature from user's perspective with acceptance criteria
2. **Sprint**: Time-boxed iteration (1-2 weeks)
3. **Epic**: Large feature area with multiple stories
4. **Story Points**: Relative effort (Fibonacci: 1, 2, 3, 5, 8, 13, 21)
5. **Definition of Done (DoD)**: Checklist for story completion
## Agile Workflow
```
Product Backlog → Sprint Planning → Story Development (TDD) → Sprint Review → Sprint Retrospective → Repeat
```
## Key Commands
### Backlog Operations
* **"Create-Backlog"** - Create epics/stories from PRD
* **"Add-Story"** - Create story with epic auto-detection
* **"Prioritize-Backlog"** - Update Priority (P0/P1/P2)
### Story Workflow
* **`work #N`** - Begin development (per GitHub-Workflow.md)
* **`done`** - Mark complete (per GitHub-Workflow.md)
### Development
* **"Run-Tests"** - Execute test suite
* **"Show-Coverage"** - Display coverage report
## TDD Cycle (RED-GREEN-REFACTOR)
### RED Phase
1. Write failing test
2. Run test, verify FAILS
3. Proceed to GREEN
### GREEN Phase
1. Write minimal implementation to pass
2. Run test, verify PASSES
3. Proceed to REFACTOR
### REFACTOR Phase
1. Analyze for refactoring
2. Refactor keeping tests passing
3. Proceed to next behavior
**Skills:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`
## Story Development Flow
**`work #N`**: Update status to in_progress, display story, begin TDD cycles
**`done`**: Verify criteria, run tests, update status to done, commit
## User Story Format
```markdown
### Story [ID]: [Title]
**As a** [user] **I want** [goal] **So that** [benefit]
**Acceptance Criteria:**
- [ ] Criterion 1
**Story Points:** [1-21] **Priority:** [High/Medium/Low] **Status:** [Backlog/In Progress/Done]
```
## Definition of Done
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code follows conventions
- [ ] No known bugs
- [ ] Documentation updated (if applicable)
## Additional Documentation
Loaded on-demand: Templates, Commands, Best Practices, Transitions
---
**End of Core Module**
