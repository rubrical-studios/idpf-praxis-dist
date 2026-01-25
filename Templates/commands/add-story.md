---
version: "v0.33.0"
description: Add story to epic with charter compliance (project)
argument-hint: "[epic-number] (e.g., 42 or #42)"
---
# /add-story
Add a new story to an epic with charter compliance validation.
## Arguments
| Argument | Description |
|----------|-------------|
| `[epic-number]` | Parent epic issue number (e.g., `42` or `#42`). Optional - prompts if not specified. |
## Execution Instructions
Use `TodoWrite` to create todos from the phases below and track progress.
## Phase 1: Select or Create Epic, Gather Story Details
**Step 1:** Parse epic number (accept `42` or `#42` format)
**Step 2:** If no epic specified, list open epics with "[Create new epic]" option
**Step 2a:** If "Create new epic" selected:
  - ASK USER for epic theme/feature area
  - Charter compliance check on theme (if charter exists)
  - Create epic: `gh pmu create --title "Epic: {Theme}" --label "epic" --status backlog -F .tmp-epic-body.md`
  - Assign to current branch if active
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
## Phase 6: Skill Suggestions (Optional)
**Skip if:** `framework-config.json` has `"skillSuggestions": false`
1. Load `.claude/metadata/skill-keywords.json`
2. Match keywords against story title + acceptance criteria
3. Filter out already-installed skills
4. Display matched skills with descriptions
5. **ASK USER:** Install suggested skills? (y/n)
6. Install selected: `node .claude/scripts/shared/install-skill.js {skills...}`
## Phase 7: Report Completion
Report story number, charter compliance status, test plan status, skills suggested, next steps.
## Error Handling
| Situation | Response |
|-----------|----------|
| Epic not found | "Issue #N not found" |
| Issue not an epic | "Issue #N does not have 'epic' label" |
| No epics, user cancels | "Story creation cancelled" |
| Epic creation fails | Report error, no orphan story |
| Charter concern, user declines | "Story creation cancelled" |
---
**End of /add-story Command**
