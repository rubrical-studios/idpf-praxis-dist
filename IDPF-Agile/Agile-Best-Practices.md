# Agile-Driven Development Framework - Best Practices
**Version:** v0.35.4
**Module:** Best Practices (loaded on-demand)
## Story Writing
**DO:** As a/I want/So that format, focus on user value, keep small (1-3 days), clear acceptance criteria, relative estimates
**DON'T:** Technical tasks as stories, large stories, skip criteria, estimate in hours
## Sprint Planning
**DO:** Cohesive goal, consider dependencies, sustainable velocity, mix features and tech debt, leave buffer
**DON'T:** Overcommit, unrelated stories, ignore tech debt, skip estimation
## Development
**DO:** TDD rigorously, commit frequently, update status, ask for help, refactor continuously
**DON'T:** Skip tests, work multiple stories, let debt accumulate, ignore failing tests
## Review & Retrospective
**DO:** Celebrate completed, be honest, identify improvements, adjust process, track velocity
**DON'T:** Skip retros, blame individuals, repeat mistakes, ignore data
## Special Scenarios
### Story Blocked
1. Add blocked label: `gh issue edit #ID --add-label blocked`
2. Add comment with reason
3. Move to Parking Lot or work different story
### Story Scope Creep
1. Add scope-creep label
2. Split story, adjust estimate, or archive
### Emergency Bug
1. "Emergency-Bug [description]"
2. Creates issue with `emergency` label, P0 priority
3. Fix with TDD
### Scope Change
1. "Pivot [new direction]"
2. For each story: Keep / Archive / Close
---
**End of Best Practices Module**
