# Agile-Driven Development Framework - Transitions
**Version:** v0.2.0
**Module:** Transitions

---

## When to Use Agile
- Evolving requirements, iterative delivery
- Need prioritization based on value
- Medium to large projects
- Track velocity and predictability

## When NOT to Use Agile
- Fixed, well-defined requirements → Structured
- Small project, clear scope → Structured
- Unclear requirements, exploration → Vibe

## Agile → Structured
**When:** Scope narrows, solo developer, sprint overhead outweighs benefits
**How:**
1. Complete current sprint
2. Convert remaining stories → PRD
3. Begin Structured with "First-Step"

**Carries forward:** Code, tests, TDD, Git history, architecture
**Changes:** Stories → PRD, Sprints → Linear, Remove backlog overhead

## Agile → LTS
**When:** Production maintenance only, backlog frozen
**How:**
1. Close final sprint
2. Archive backlog/history
3. Full test suite passing
4. Tag final version
5. Begin with "LTS-Triage"

**Carries forward:** Code, tests, TDD, Git history
**Changes:** Stories → Bug reports, Sprint → LTS triage, Features → Fixes only

## Invalid
**Never:** Agile → Vibe (defeats structured development)

---

**End of Transitions Module**
