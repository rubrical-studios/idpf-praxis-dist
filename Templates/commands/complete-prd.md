---
version: "v0.33.0"
description: Verify and close PRD tracker (project)
argument-hint: "<issue-number> (e.g., 151)"
---
# /complete-prd
Verify all epics and stories from a PRD are complete, then close the PRD tracker.
## Arguments
| Argument | Description |
|----------|-------------|
| `<prd-issue-number>` | PRD tracker issue number |
## Workflow
### Step 1: Validate PRD Issue
Parse issue number, verify `prd` label exists.
### Step 2: Find Linked Epics
```bash
gh issue list --label "epic" --state all --json number,title,body,state
```
Filter to epics with `**PRD Tracker:** #{issue_num}` in body.
### Step 3: Check Epic Completion
For each epic: `gh issue view #{epic} --json state -q '.state'`
### Step 4: Check Story Completion
For each epic: `gh pmu sub list #{epic} --json`
### Step 5: Report Status
**If all complete:** Close PRD with summary comment
**If incomplete:** List open epics/stories, do NOT close
## Verification Logic
PRD Complete = (ALL epics CLOSED) AND (ALL stories CLOSED)
---
**End of /complete-prd Command**
