---
version: "v0.32.1"
description: Add story to epic with charter compliance (project)
argument-hint: "[epic-number]"
---
# /add-story
Add a new story to an epic with charter compliance validation.
## Arguments
| Argument | Description |
|----------|-------------|
| `[epic-number]` | Parent epic issue number (e.g., `42` or `#42`). Optional - prompts if not specified. |
## Execution Instructions
Use `TodoWrite` to create todos from the phases below and track progress.
## Phase 1: Validate Epic and Gather Story Details
**Step 1:** Parse epic number (accept `42` or `#42` format)
**Step 2:** If no epic specified, list open epics and prompt user
**Step 3:** Validate epic exists with `epic` label
**Step 4:** ASK USER for story details (user action, benefit, acceptance criteria)
**Step 5:** Transform to story format (As a... I want... So that...)
## Phase 2: Charter Compliance Check
**Step 1:** Load `CHARTER.md`, `Inception/Scope-Boundaries.md`, `Inception/Constraints.md`
**Step 2:** Validate story against charter scope
**Step 3:** Report compliance or flag concerns
## Phase 3: Create Story Issue
**Step 1:** ASK USER for priority (P0/P1/P2)
**Step 2:** Create story:
```bash
gh pmu create --repo {repository} --title "Story: {Title}" --label "story" --body "{body}" --status backlog --priority {priority} --assignee @me
```
**Step 3:** Link to parent: `gh pmu sub add {epic_num} {story_num}`
## Phase 4: Update Test Plan
Find PRD test plan from epic reference, generate test cases from acceptance criteria, commit updates.
## Phase 5: Update PRD Tracker
Add comment to PRD tracker issue if exists.
## Phase 6: Report Completion
Report story number, charter compliance status, test plan status, next steps.
## Error Handling
| Situation | Response |
|-----------|----------|
| Epic not found | "Issue #N not found" |
| Issue not an epic | "Issue #N does not have 'epic' label" |
| Charter concern, user declines | "Story creation cancelled" |
---
**End of /add-story Command**
