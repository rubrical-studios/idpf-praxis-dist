---
version: "v0.33.0"
description: Create GitHub epics/stories from PRD (project)
argument-hint: "<issue-number> (e.g., 151)"
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
## Phase 8: Skill Suggestions (Optional)
**Skip if:** `framework-config.json` has `"skillSuggestions": false`
1. Load `.claude/metadata/skill-keywords.json`
2. Match keywords against all story titles + acceptance criteria (case-insensitive)
3. Filter out already-installed skills (from `projectSkills`)
4. Display matched skills table with stories that triggered each match
5. **ASK USER:** Install suggested skills? (y/n/select)
6. Install selected: `node .claude/scripts/shared/install-skill.js {skills...}`
## Output Summary
Report epics created, stories created, test cases embedded, skills suggested.
---
**End of /create-backlog Command**
