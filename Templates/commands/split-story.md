---
version: "v0.32.1"
description: Split story into smaller stories (project)
argument-hint: "<story-number>"
---
# /split-story
Split a story into smaller stories with charter compliance and test plan integrity.
## Arguments
| Argument | Description |
|----------|-------------|
| `<story-number>` | Story to split |
## Execution Instructions
Use `TodoWrite` to create todos from phases.
## Phase 1: Fetch Original Story
Parse story number, validate `story` label, extract details (title, description, criteria, priority, epic).
## Phase 2: Determine Split Criteria
ASK USER how to split.
| Pattern | Description |
|---------|-------------|
| By acceptance criteria | Each criterion becomes a story |
| By user workflow | Split by distinct actions |
| By technical component | Frontend/backend/API |
| By priority | Must-have vs nice-to-have |
| Custom | User defines |
Minimum: 2 new stories required.
## Phase 3: Charter Compliance
Validate split stories against `CHARTER.md`, `Inception/Scope-Boundaries.md`.
## Phase 4: Create New Stories
For each new story:
```bash
gh pmu create --title "Story: {Title}" --label "story" --body "{body}" --status backlog --priority {priority}
gh pmu sub add {epic_num} {new_story_num}
```
## Phase 5: Update Original Story
Add split notice, close original story.
## Phase 6: Update Test Plan
Find test plan from epic PRD reference, redistribute test cases to split stories.
## Phase 7: Update PRD Tracker
Add comment to PRD tracker if exists.
## Phase 8: Report Completion
Report original story closed, new stories created, charter compliance, test plan status.
---
**End of /split-story Command**
