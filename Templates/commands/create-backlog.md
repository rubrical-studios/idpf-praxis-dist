---
version: "v0.32.1"
description: Create GitHub epics/stories from PRD (project)
argument-hint: "<prd-issue-number>"
---
# /create-backlog
Create GitHub epics and stories from an approved PRD with embedded TDD test cases.
## Arguments
| Argument | Description |
|----------|-------------|
| `<prd-issue-number>` | PRD tracking issue number |
## Execution Instructions
Use `TodoWrite` to create todos from the phases below.
## Prerequisites
- PRD issue with `prd` label
- Test plan exists and approval issue is **closed**
## Phase 1: Fetch and Validate PRD Issue
Parse issue number, verify `prd` label, extract PRD document path.
## Phase 2: Test Plan Approval Gate
**BLOCKING:** Check test plan approval issue is closed before proceeding.
## Phase 3: Parse PRD
Extract epics, stories, acceptance criteria from PRD document.
## Phase 4: Load Test Cases
Match test cases from test plan to stories, detect tech stack for test syntax.
## Phase 5: Create Epic Issues
```bash
gh pmu create --title "Epic: {Name}" --label "epic" --status backlog -F .tmp-epic-body.md
```
## Phase 6: Create Story Issues
```bash
gh pmu create --title "Story: {Title}" --label "story" --status backlog -F .tmp-story-body.md
gh pmu sub add {epic_number} {story_number}
```
## Phase 7: Update PRD Status
Update PRD document status, add summary to tracking issue, move to in_progress.
## Output Summary
Report epics created, stories created, test cases embedded.
---
**End of /create-backlog Command**
