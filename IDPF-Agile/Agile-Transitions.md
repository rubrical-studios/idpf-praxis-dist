# Agile-Driven Development Framework - Transitions
**Version:** v0.19.0
**Module:** Transitions (loaded on-demand)

---

## When to Use Agile
- Evolving requirements, iterative delivery
- Prioritize by value, medium-large projects
- Track velocity, user-centric descriptions

**Use Structured:** Fixed requirements, small/clear scope, single feature
**Use Vibe:** Unclear requirements, exploration needed

---

## Agile → Structured

**When:** Scope narrows, solo developer, sprint overhead > benefits, requirements fixed
**How:**
1. Complete current sprint (Review + Retro)
2. Commit all "Done" stories
3. Move incomplete to Product Backlog
4. Convert to PRD document
5. Begin Structured with "First-Step"

**Carries:** Code, tests, TDD, git history, architecture, acceptance criteria
**Changes:** Stories→PRD, Sprint→Linear, Remove velocity tracking

---

## Agile → LTS

**When:** Production reached, maintenance mode, critical fixes only, backlog frozen
**How:**
1. Complete/close current sprint
2. Final Sprint-Review
3. Archive backlog and history
4. 100% test suite passing
5. Full documentation
6. Tag final version
7. Begin LTS with "LTS-Triage"
8. Establish EOL date

**Carries:** All artifacts, TDD for fixes
**Changes:** Stories→Bug reports, Sprint→Triage, Features→Fixes only

---

## Invalid Transitions
**Never:** Agile → Vibe

---

## Integration

### Agile + Vibe Coding
1. Vibe Phase: Explore and prototype
2. Create Backlog from prototype
3. Agile Phase: Formalize with sprints/TDD

### Agile for Existing Projects
1. Audit current state
2. Create Backlog (features + tech debt)
3. Sprint Planning
4. Incremental enhancement

---

**End of Transitions Module**
