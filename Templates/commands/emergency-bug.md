---
version: "v0.33.0"
description: Create P0 emergency issue (project)
argument-hint: "<description> (e.g., \"API 500 errors\")"
---
# /emergency-bug
Create a P0 emergency issue for critical bugs.
## Arguments
| Argument | Description |
|----------|-------------|
| `<description>` | Brief description of the emergency |
## Workflow
### Step 1: Validate Description
If no description, ASK USER.
### Step 2: Create Issue
```bash
gh pmu create --repo {repository} --title "Emergency: {description}" --label "bug" --label "emergency" --body "{body}" --status ready --priority p0 --assignee @me
```
### Step 3: Report
Report issue number, next steps.
## When to Use
- Production outages
- Security vulnerabilities
- Data loss incidents
- Service-critical failures
---
**End of /emergency-bug Command**
