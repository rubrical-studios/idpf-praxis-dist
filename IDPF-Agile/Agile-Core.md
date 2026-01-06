# Agile-Driven Development Framework - Core
**Version:** v0.22.0
**Source:** IDPF-Agile/Agile-Core.md
**Module:** Core (loaded at session startup)

---

## Terminology
1. **User Story**: Feature from user's perspective with acceptance criteria
2. **Sprint**: Time-boxed iteration (1-2 weeks)
3. **Epic**: Large feature area with multiple stories
4. **Story Points**: Relative effort (Fibonacci: 1,2,3,5,8,13,21)
5. **Definition of Done (DoD)**: Checklist for story completion

---

## Agile Workflow
```
Product Backlog Creation → Sprint Planning → Story Development (TDD) → Sprint Review → Sprint Retrospective → Repeat
```

---

## Key Commands
**Backlog Operations (GitHub-Native):**
- **"Create-Backlog"** - Create GitHub epics/stories from PRD
- **"Add-Story"** - Create story with epic auto-detection
- **"Prioritize-Backlog"** - Update Priority field (P0/P1/P2)

**Story Workflow:**
- **"Start-Story [#ID]"** - Begin development (In Progress + assign)
- **"Story-Complete [#ID]"** - Mark story done

**Development:**
- **"Run-Tests"** - Execute test suite
- **"Show-Coverage"** - Display coverage report

**GitHub Integration:** All backlog via GitHub issues. Requires `.gh-pmu.yml` and `gh pmu`. Stories linked via `gh pmu sub add`.

---

## TDD Cycle (RED-GREEN-REFACTOR)
**RED:** Write failing test → verify FAILS → proceed
**GREEN:** Minimal implementation → verify PASSES → proceed
**REFACTOR:** Analyze and improve → keep tests passing → next behavior

**Execution:** Phases autonomous. Checkpoint at story completion (In Review → Done).

**Skills:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`, `tdd-failure-recovery`

---

## Story Development Flow
**Start-Story [#ID]:**
1. `gh pmu move [#ID] --status in_progress`
2. Assign to first available
3. Display story with acceptance criteria
4. Break into testable behaviors
5. Begin TDD cycles

**Story-Complete [#ID]:**
1. Verify acceptance criteria met
2. Run full test suite
3. `gh pmu move [#ID] --status done`
4. Unassign issue
5. Commit with story reference

---

## User Story Format
```markdown
### Story [ID]: [Title]
**As a** [user] **I want** [goal] **So that** [benefit]
**Acceptance Criteria:** - [ ] Criterion 1
**Story Points:** [1,2,3,5,8,13,21]
**Priority:** [High/Medium/Low]
**Status:** [Backlog/Selected/In Progress/Done]
```

---

## Definition of Done (Global)
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code follows conventions
- [ ] No known bugs
- [ ] Documentation updated (if applicable)

---

**End of Core Module**
