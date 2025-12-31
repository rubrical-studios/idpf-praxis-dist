# Agile-Driven Development Framework - Templates
**Version:** v0.19.1
**Module:** Templates (loaded on-demand)

---

## GitHub-Native Backlog
IDPF-Agile uses GitHub issues. Use `Create-Backlog` to create epics/stories. Templates below are reference formats for issue content.

---

## Product Backlog Format
```markdown
# Product Backlog: [Project Name]
**Project Vision:** [One-sentence description]

## Definition of Done (Global)
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] Code follows project conventions
- [ ] No known bugs
- [ ] Documentation updated (if applicable)

## Epic: [Epic Name]
**Epic Goal:** [What this epic achieves]

### Story [ID]: [Title]
**As a** [user type]
**I want** [goal]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

**Story Points:** [1,2,3,5,8,13,21]
**Priority:** [High/Medium/Low]
**Status:** [Backlog/Selected/In Progress/Done]
```

---

## Sprint Backlog Format
```markdown
# Sprint [N] Backlog: [Project Name]
**Sprint Goal:** [What we aim to achieve]
**Duration:** [Start] to [End]
**Total Story Points:** [Sum]

## Selected Stories
### Story [ID]: [Title]
**As a** [user] **I want** [goal] **So that** [benefit]
**Acceptance Criteria:** [list]
**Story Points:** [points]
**Status:** [Selected/In Progress/Done]

## Sprint Progress
**Completed:** [X] points | **Remaining:** [Y] points
```

---

## Sprint Summary Format
```markdown
# Sprint [N] Summary
**Goal:** [Original] | **Duration:** [Start-End]

## Completed: [X] points
- [Story ID]: [Title] - [Points]

## Incomplete: [Y] points (carried over)
- [Story ID]: [Title] - [Points] - [Reason]

## Velocity
Planned: [X] | Completed: [Y]

## Key Achievements / Challenges / New Stories Discovered
```

---

## Retrospective Format
```markdown
# Sprint [N] Retrospective
**Date:** [Date]

## What Went Well
## What Could Be Improved
## Action Items for Next Sprint
- [ ] Action 1

## Velocity Trends
Sprint 1: [X] | Sprint N: [Y] | Average: [Avg]
```

---

**End of Templates Module**
