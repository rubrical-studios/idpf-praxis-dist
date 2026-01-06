# Agile-Driven Development Framework - Best Practices
**Version:** v0.22.0
**Source:** IDPF-Agile/Agile-Best-Practices.md
**Module:** Best Practices (loaded on-demand)

---

## Story Writing
**DO:** Use "As a... I want... So that..." | Focus on user value | Keep small (1-3 days) | Clear acceptance criteria | Estimate relatively
**DON'T:** Write technical tasks as stories | Make stories too large | Skip acceptance criteria | Estimate in hours

---

## Sprint Planning
**DO:** Select stories supporting cohesive goal | Consider dependencies | Sustainable velocity | Mix features + tech debt | Leave buffer
**DON'T:** Overcommit | Select unrelated stories | Ignore tech debt | Skip estimation

---

## Development
**DO:** Follow TDD rigorously | Commit frequently with story refs | Update status as you progress | Ask for help when blocked | Refactor continuously
**DON'T:** Skip tests | Work multiple stories simultaneously | Let tech debt accumulate | Ignore failing tests

---

## Review & Retrospective
**DO:** Celebrate completions | Be honest about issues | Identify actionable improvements | Adjust based on learnings | Track velocity
**DON'T:** Skip retrospectives | Blame individuals | Repeat mistakes | Ignore velocity data

---

## Special Scenarios

### Story Blocked
1. **"Story-Blocked [#ID] [reason]"**
2. Add `blocked` label + comment
3. Options: Resolve blocker | Archive (`Archive-Story`) | Work on different story

### Story Scope Creep
1. **"Story-Growing [#ID]"**
2. Add `scope-creep` label
3. Options: Split (`Split-Story`) | Re-estimate | Archive and create new

### Emergency Bug
1. **"Emergency-Bug [description]"**
2. Create issue with `emergency` label, Priority P0
3. Fix with TDD (failing test → fix → verify)

### Scope Change
1. **"Pivot [new direction]"**
2. Document in parent epic/PRD issue
3. For each open story: Keep / Archive / Close
4. Resume with updated backlog

---

**End of Best Practices Module**
