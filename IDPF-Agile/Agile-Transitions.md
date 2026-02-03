# Agile-Driven Development Framework - Transitions
**Version:** v0.35.1
**Module:** Transitions (loaded on-demand)
## When to Use Agile
- Evolving requirements
- Iterative delivery with feedback
- Need to prioritize features
- Medium to large projects
- Track velocity and predictability
## When to Use Structured
- Fixed requirements
- Small project, clear scope
- Single feature development
## When to Use Vibe
- Unclear requirements
- Exploration phase
- Prototyping
## Agile to Structured
**When:** Scope narrows, solo developer, overhead outweighs benefits, requirements fixed
**How:**
1. Complete in-progress work and close open issues
2. Ensure "Done" stories committed
3. Move incomplete to Backlog
4. Convert stories to PRD
5. Begin Structured with "First-Step"
**Carries Forward:** Code, tests, TDD, git history, architecture, testing framework
**Changes:** Stories → PRD, Sprints → Linear tasks, Velocity → Progress tracking
## Agile to LTS
**When:** Production maintenance mode, development complete, only bug fixes needed
**How:**
1. Complete in-progress work
2. Validate all stories are Done
3. Run full test suite (100% pass)
4. Create documentation
5. Tag final version
6. Begin LTS with "LTS-Triage"
**Carries Forward:** Code, tests, documentation, TDD practices
**Changes:** Stories → Bug reports, Sprints → LTS triage, Features → Bug fixes only
## Invalid Transitions
**Never:** Agile → Vibe
## Integration with Other Frameworks
**Agile + Vibe:** Vibe explore → Create Backlog → Agile sprints
**Agile for Existing:** Audit → Create Backlog → Sprint Planning → Incremental Enhancement
---
**End of Transitions Module**
