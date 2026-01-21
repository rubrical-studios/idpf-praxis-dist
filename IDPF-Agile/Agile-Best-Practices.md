# Agile-Driven Development Framework - Best Practices
**Version:** v0.29.1
**Module:** Best Practices (loaded on-demand)

## Story Writing
### DO
- Use "As a... I want... So that..." format
- Focus on user value, not technical implementation
- Keep stories small (completable in 1-3 days)
- Include clear acceptance criteria
- Estimate relatively (compare to other stories)
### DON'T
- Write technical tasks as user stories
- Make stories too large (split them)
- Skip acceptance criteria
- Estimate in hours (use story points)

## Sprint Planning
### DO
- Select stories supporting cohesive sprint goal
- Consider dependencies between stories
- Aim for sustainable velocity
- Include mix of features and technical debt
- Leave buffer for unexpected issues
### DON'T
- Pack sprint with too many story points
- Select unrelated stories without theme
- Ignore technical debt
- Skip estimation

## Development
### DO
- Follow TDD rigorously (RED-GREEN-REFACTOR)
- Commit frequently with story references
- Update story status as you progress
- Ask for help when blocked
- Refactor continuously
### DON'T
- Skip writing tests
- Work on multiple stories simultaneously
- Let technical debt accumulate
- Ignore failing tests

## Review & Retrospective
### DO
- Celebrate completed stories
- Be honest about what didn't work
- Identify actionable improvements
- Adjust process based on learnings
- Track velocity trends
### DON'T
- Skip retrospectives
- Blame individuals for issues
- Make same mistakes repeatedly
- Ignore velocity data

## Special Scenarios
### Story Blocked
1. **"Story-Blocked [#ID] [reason]"**
2. ASSISTANT adds `blocked` label
3. ASSISTANT adds comment with blocking reason
4. Options: Resolve blocker, move to Parking Lot, work different story

### Story Scope Creep
1. **"Story-Growing [#ID]"**
2. ASSISTANT adds `scope-creep` label
3. Options: Split story, re-estimate, archive and create new

### Emergency Bug
1. **"Emergency-Bug [description]"**
2. Create GitHub issue with `emergency` label
3. Set Priority to P0
4. Fix with TDD (write failing test, fix, verify)

### Scope Change
1. **"Pivot [new direction]"**
2. Document pivot in parent epic/PRD issue
3. For each open story, prompt: Keep / Archive / Close
4. Resume with updated backlog

**End of Best Practices Module**
