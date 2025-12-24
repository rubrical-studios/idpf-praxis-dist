# Agile-Driven Development Framework - Core

**Version:** v0.15.0
**Module:** Core

---

## Terminology
- **User Story:** Feature from user perspective with acceptance criteria
- **Sprint:** Time-boxed iteration (1-2 weeks)
- **Epic:** Large feature area with multiple stories
- **Story Points:** Effort estimate (Fibonacci: 1, 2, 3, 5, 8, 13, 21)
- **Definition of Done:** Checklist for story completion

## Workflow
```
Product Backlog → Sprint Planning → Story Development (TDD) → Sprint Review → Sprint Retrospective
```

## Key Commands
**Backlog:** `Create-Backlog`, `Add-Story`, `Prioritize-Backlog`
**Sprint:** `Plan-Sprint`, `Start-Story [#ID]`, `Story-Complete [#ID]`
**Development:** `Done-Next-Step`, `Rollback-Previous-Step`, `Run-Tests`

## TDD Cycle
**RED:** Write failing test → Verify FAIL → Done-Next-Step
**GREEN:** Write implementation → Verify PASS → Done-Next-Step
**REFACTOR:** Analyze, improve, keep tests green → Done-Next-Step

## Story Format
```
As a [user] I want [goal] So that [benefit]
Acceptance Criteria: [checkboxes]
Story Points: [estimate]
```

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Unit tests passing
- [ ] Code follows conventions
- [ ] No known bugs
- [ ] Documentation updated

## GitHub Integration
- All backlog commands work against GitHub issues
- Requires `.gh-pmu.yml` and `gh pmu` extension
- Stories linked to epics via `gh pmu sub add`

---

**End of Core Module**
