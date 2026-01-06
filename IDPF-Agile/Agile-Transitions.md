# Agile-Driven Development Framework - Transitions
**Version:** v0.22.0
**Source:** IDPF-Agile/Agile-Transitions.md
**Module:** Transitions (loaded on-demand)

---

## When to Use Agile Framework
**Use Agile:** Evolving requirements | Iterative delivery | Value-based prioritization | Medium-large projects | Velocity tracking | User-centric features
**Use Structured:** Fixed requirements | Small scope | Single feature | No sprint structure needed
**Use Vibe:** Unclear requirements | Exploration needed | Prototyping first

---

## Agile → Structured

### When to Transition
- Scope narrows to single feature
- Solo developer
- Sprint overhead exceeds benefits
- Requirements become fixed
- Don't need velocity tracking

### How to Transition
1. Complete current sprint (`/sprint-retro`, `/end-sprint`)
2. Commit all "Done" stories
3. Move incomplete stories to Product Backlog
4. Convert stories into PRD document
5. Begin Structured with "First-Step"

### What Carries Forward
All code/tests | TDD methodology | Git history | Architecture | Testing framework | Acceptance criteria

### What Changes
Stories → PRD | Sprint Backlogs → Linear tasks | Ceremonies → Direct development | Velocity → Progress tracking | Points → Feature completion

---

## Agile → LTS

### When to Transition
- Reaches production maintenance mode
- Active development complete
- Only critical bugs/security patches
- Backlog frozen
- Stability paramount

### How to Transition
1. Complete/close current sprint
2. Run final `/sprint-retro`
3. Archive backlog and sprint history
4. Run full test suite (100% passing)
5. Create comprehensive documentation
6. Tag final active version
7. Begin LTS with "LTS-Triage"
8. Establish EOL date

### What Changes
Stories → Bug reports | Sprint Planning → LTS triage | Active dev → Maintenance | New features → Bug fixes only | Add conservative fix-only discipline

---

## Invalid Transitions
**Never:** Agile → Vibe (defeats purpose)

---

## Integration with Other Frameworks

### Agile + Vibe Coding
1. **Vibe Phase:** Explore and prototype
2. **Create Backlog:** Generate stories from prototype
3. **Agile Phase:** Formalize with sprints and TDD

### Agile for Existing Projects
1. **Audit:** Assess what exists
2. **Create Backlog:** Stories for features + tech debt
3. **Sprint Planning:** Prioritize improvements
4. **Incremental Enhancement:** Improve through sprints

---

**End of Transitions Module**
