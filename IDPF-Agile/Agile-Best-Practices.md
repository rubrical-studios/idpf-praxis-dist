# Agile-Driven Development Framework - Best Practices
**Version:** 0.17.0
**Module:** Best Practices (loaded on-demand)

---

## Story Writing
**DO:** Use "As a... I want... So that...", focus on user value, keep small (1-3 days), include acceptance criteria, estimate relatively
**DON'T:** Write technical tasks as stories, make too large, skip criteria, estimate in hours

---

## Sprint Planning
**DO:** Select cohesive stories, consider dependencies, sustainable velocity, mix features/tech debt, leave buffer
**DON'T:** Overcommit, select unrelated stories, ignore tech debt, skip estimation

---

## Development
**DO:** TDD rigorously, commit frequently with references, update status, ask for help, refactor continuously
**DON'T:** Skip tests, work multiple stories, let debt accumulate, ignore failing tests

---

## Review & Retrospective
**DO:** Celebrate, be honest, identify actions, adjust process, track velocity
**DON'T:** Skip retros, blame individuals, repeat mistakes, ignore data

---

## Special Scenarios

### Story Blocked
`Story-Blocked [#ID] [reason]` → adds `blocked` label, comments reason
Options: Resolve, Archive-Story, work different story

### Story Scope Creep
`Story-Growing [#ID]` → adds `scope-creep` label
Options: Split-Story, Estimate-Story, archive and create new

### Emergency Bug
`Emergency-Bug [description]` → creates issue with `emergency` label, P0 priority
Fix with TDD

### Scope Change
`Pivot [new direction]` → documents in epic/PRD issue
For each open story: Keep / Archive / Close

---

**End of Best Practices Module**
