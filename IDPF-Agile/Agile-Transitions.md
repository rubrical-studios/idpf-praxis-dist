# Agile-Driven Development Framework - Transitions
**Version:** v0.30.0
**Module:** Transitions (loaded on-demand)

## When to Use Agile Framework
**Use Agile when:**
- Building product with evolving requirements
- Want iterative delivery with regular feedback
- Need to prioritize features based on value
- Working on medium to large projects
- Want velocity tracking and predictability
- Prefer user-centric feature descriptions

**Use Structured when:**
- Requirements are fixed and well-defined
- Small project with clear scope
- Single feature or component development
- Don't need sprint structure

**Use Vibe when:**
- Starting with unclear requirements
- Need exploration phase first
- Prototyping before formalizing

## Agile -> Structured
### When to Transition
- Project scope narrows to single well-defined feature
- Team shrinks to solo developer
- Sprint overhead outweighs benefits
- Requirements become fixed and stable
- Don't need velocity tracking
- Prefer linear feature-by-feature development

### How to Transition
1. Complete current sprint (run `/sprint-retro` and `/end-sprint`)
2. Ensure all "Done" stories are committed
3. Move incomplete stories back to Product Backlog
4. Convert selected stories into PRD document
5. Begin Structured session with "First-Step" command

### What Carries Forward
- All existing code and tests
- TDD methodology (RED-GREEN-REFACTOR cycles)
- Git repository and history
- Technical decisions and architecture
- Testing framework and practices
- Acceptance criteria from stories

### What Changes
- User Stories -> PRD document
- Sprint Backlogs -> Linear task list
- Sprint ceremonies -> Direct development
- Velocity tracking -> Progress tracking only
- Story points -> Feature completion

## Agile -> LTS
### When to Transition
- Project reaches production, enters maintenance mode
- Active development lifecycle complete
- Only critical bugs and security patches needed
- Backlog is frozen
- Stability and backwards compatibility paramount

### How to Transition
1. Complete final sprint or close early
2. Run final `/sprint-retro` to validate all "Done" stories
3. Archive Product Backlog and Sprint history
4. Run full test suite - must be 100% passing
5. Create comprehensive documentation
6. Tag final active development version
7. Begin using LTS Framework with "LTS-Triage" command
8. Establish EOL date for LTS version

### What Carries Forward
- All code, tests, documentation
- Git repository and history
- TDD practices for bug fixes
- Testing framework

### What Changes
- User Stories -> Bug reports
- Sprint Planning -> LTS triage workflow
- Active development -> Maintenance mode
- New features -> Bug fixes only
- Velocity tracking -> Regression prevention

## Invalid Transitions
**Never:** Agile -> Vibe (defeats purpose of structured development)

## Integration with Other Frameworks
### Agile + Vibe Coding
1. **Vibe Phase**: Explore and prototype
2. **Create Backlog**: Generate stories from prototype
3. **Agile Phase**: Formalize with sprints and TDD

### Agile for Existing Projects
1. **Audit Current State**: Assess what exists
2. **Create Backlog**: Stories for new features + technical debt
3. **Sprint Planning**: Prioritize improvements
4. **Incremental Enhancement**: Improve through sprints

**End of Transitions Module**
