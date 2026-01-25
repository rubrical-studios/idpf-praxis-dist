---
version: "v0.33.0"
description: Review stories for direction change (project)
argument-hint: "[epic-number|prd-name]"
---
# /pivot
Review and triage stories when project direction changes.
## Arguments
| Argument | Description |
|----------|-------------|
| `[epic-number]` | Epic to pivot |
| `[prd-name]` | PRD to pivot |
## Workflow
### Phase 1: Identify Scope
If argument is number, treat as epic. If text, treat as PRD.
### Phase 2: Document Pivot Reason
ASK USER for new direction/reason.
### Phase 3: List Stories
```bash
gh pmu sub list $epic_num --json number,title,state
```
### Phase 4: Review Each Story
For each story, present options:
1. Keep - Aligns with new direction
2. Archive - May be relevant later
3. Close - No longer needed
4. Skip - Decide later
### Phase 5: Apply Actions
| Decision | Action |
|----------|--------|
| Keep | No change |
| Archive | `gh pmu move #{num} --status parking_lot` |
| Close | `gh issue close #{num} --reason "not planned"` |
| Skip | Pending review |
Document pivot on parent issue.
### Phase 6: Report Summary
Report stories reviewed, decisions made, documentation added.
---
**End of /pivot Command**
