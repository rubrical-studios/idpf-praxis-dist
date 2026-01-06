# Agile-Driven Development Framework - Templates
**Version:** v0.22.0
**Source:** IDPF-Agile/Agile-Templates.md
**Module:** Templates (loaded on-demand)

---

## GitHub-Native Backlog
IDPF-Agile uses GitHub issues for backlog. Use `Create-Backlog` for epics/stories. Templates below are reference formats for issue content.

---

## Product Backlog Format
```markdown
# Product Backlog: [Project Name]
**Project Vision:** [One-sentence]

## Definition of Done (Global)
- [ ] All acceptance criteria met
- [ ] Unit tests passing
- [ ] Code follows conventions
- [ ] No known bugs
- [ ] Documentation updated

## Epic: [Name]
**Epic Goal:** [What achieved]

### Story [ID]: [Title]
**As a** [user] **I want** [goal] **So that** [benefit]
**Acceptance Criteria:** - [ ] Criterion
**Story Points:** [1,2,3,5,8,13,21]
**Priority:** [High/Medium/Low]
**Status:** [Backlog/Selected/In Progress/Done]
```

---

## Sprint Backlog Format
```markdown
# Sprint [N] Backlog: [Project Name]
**Sprint Goal:** [Aim]
**Duration:** [Start] to [End]
**Total Story Points:** [Sum]

## Selected Stories
### Story [ID]: [Title]
**As a** [user] **I want** [goal] **So that** [benefit]
**Acceptance Criteria:** - [ ] Criterion
**Story Points:** [points]
**Status:** [Selected/In Progress/Done]

## Sprint Progress
**Completed:** [X] points | **Remaining:** [Y] points
```

---

## Sprint Summary Format
```markdown
# Sprint [N] Summary: [Project Name]
**Sprint Goal:** [Original goal]
**Duration:** [Start] to [End]

## Completed Stories
- [Story ID]: [Title] - [Points]
**Total Completed:** [X] points

## Incomplete Stories
- [Story ID]: [Title] - [Points] - [Reason]
**Carried Over:** [Y] points

## Velocity
**Planned:** [Total] | **Completed:** [Points]

## Key Achievements
- [Achievement 1]

## Challenges
- [Challenge 1]
```

---

## Retrospective Format
```markdown
# Sprint [N] Retrospective: [Project Name]
**Date:** [Date]

## What Went Well
- [Positive 1]

## What Could Be Improved
- [Improvement 1]

## Action Items for Next Sprint
- [ ] [Action 1]

## Velocity Trends
**Sprint 1:** [X] points
**Average:** [Avg] points/sprint
```

---

**End of Templates Module**
