---
version: "v0.38.0"
description: Review issues with type-specific criteria (project)
argument-hint: "#issue [#issue...]"
---

<!-- EXTENSIBLE -->
# /review-issue
Reviews one or more GitHub issues with type-specific criteria based on labels (bug, enhancement, story, epic). Tracks review count in issue body and posts structured findings as comment. No linked file — operates directly on the issue.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-review` | Before review begins | Custom criteria setup, compliance checks |
| `post-review` | After review findings prepared | Notifications, logging, escalation |
| `criteria-customize` | During criteria evaluation | Project-specific review criteria injection |
---
## Prerequisites
- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | Yes | One or more issue numbers (e.g., `#42` or `42 43 44`) |
Accepts multiple issue numbers: `/review-issue #42 #43 #44` — reviews each sequentially.
---
## Execution Instructions
**REQUIRED:** Before executing:
1. **Generate Todo List:** Parse workflow steps, use `TodoWrite` to create todos
2. **Include Extensions:** Add todo item for each non-empty `USER-EXTENSION` block
3. **Track Progress:** Mark todos `in_progress` → `completed` as you work
4. **Post-Compaction:** Re-read spec and regenerate todos after context compaction
**Todo Rules:** One todo per numbered step; one todo per active extension; skip commented-out extensions.
---
## Workflow
**For multiple issues:** Process each issue sequentially through Steps 1–6.
### Step 1: Fetch Issue
```bash
gh issue view $ISSUE --json number,title,body,state,labels
```
**If not found:** `"Issue #$ISSUE not found."` → **STOP** (skip to next if batch)
**If closed:** `"Issue #$ISSUE is closed. Review anyway? (y/n)"` — proceed only if user confirms.
### Step 2: Determine Issue Type
Check issue labels to determine type-specific review criteria:
```bash
gh issue view $ISSUE --json labels --jq '.labels[].name'
```
| Label Found | Review Type |
|-------------|-------------|
| `bug` | Bug review criteria |
| `enhancement` | Enhancement review criteria |
| `story` | Story review criteria |
| `epic` | Epic review criteria |
| None recognized | Generic review criteria |
**If multiple recognized labels:** Use first recognized label as primary type.
**If no recognized labels:**
```
Issue #$ISSUE has no recognized label (bug, enhancement, story, epic). Using generic review criteria.
```
Continue with generic criteria (non-blocking).

<!-- USER-EXTENSION-START: pre-review -->
<!-- USER-EXTENSION-END: pre-review -->

### Step 3: Perform Review
Evaluate the issue based on its type. Ask subjective questions **one at a time** (not batched) per DD8.

<!-- USER-EXTENSION-START: criteria-customize -->
<!-- USER-EXTENSION-END: criteria-customize -->

#### All Types (Common Criteria)
- Is the title clear and descriptive?
- Is the description sufficient to understand the issue?
- Are labels correct and complete?
- Is priority appropriate for the content?
- Are acceptance criteria present and testable?
#### Bug-Specific Criteria
- Are reproduction steps documented?
- Is expected vs actual behavior clearly stated?
- Is environment or browser information included?
- Is severity proportionate to the impact?
#### Enhancement-Specific Criteria
- Is the user value proposition clear?
- Are scope boundaries defined (in-scope / out-of-scope)?
- Are success criteria measurable?
#### Story-Specific Criteria
- Does it follow user story format ("As a [user] I want [goal] so that [benefit]")?
- Are acceptance criteria complete and testable?
- Is the story sized appropriately (not too large for a single iteration)?
#### Epic-Specific Criteria
- Is the overall scope well-defined?
- Is the sub-issue breakdown complete?
- Are dependencies between sub-issues identified?
- Are success criteria for the epic defined?
#### Generic Criteria (Unrecognized Labels)
- Is the title clear?
- Is the description complete?
- Are acceptance criteria present?
- Is the issue actionable?
Collect findings using check marks for quick scanning:
- `✅` — Criterion met
- `⚠️` — Needs attention
- `❌` — Missing or incorrect
Determine a recommendation:
- **Ready for work** — No blocking concerns
- **Needs minor revision** — Small issues, can start with awareness
- **Needs revision** — Should be addressed before starting work
- **Needs major rework** — Fundamental issues with issue definition
### Step 4: Update Issue Body Metadata
Export the current issue body:
```bash
gh pmu view $ISSUE --body-stdout > .tmp-$ISSUE.md
```
**Update `**Reviews:** N` field:**
- If `**Reviews:**` field exists: increment the number
- If `**Reviews:**` field does not exist: add `**Reviews:** 1` at the end of the issue body (after acceptance criteria if present)
Write the updated body:
```bash
gh pmu edit $ISSUE -F .tmp-$ISSUE.md && rm .tmp-$ISSUE.md
```
**If edit fails:** `"Failed to update issue body: {error}"` → **STOP**
### Step 5: Post Issue Comment
Post a structured review comment:
```markdown
## Issue Review #N — YYYY-MM-DD

**Issue:** #$ISSUE — $TITLE
**Type:** [Bug | Enhancement | Story | Epic | Generic]
**Total Reviews:** N

### Findings
- ✅ [Criterion met]
- ⚠️ [Needs attention]
- ❌ [Missing or incorrect]

### Recommendation
**[Ready for work | Needs minor revision | Needs revision | Needs major rework]** — [Brief explanation]
```
```bash
gh issue comment $ISSUE -F .tmp-review-comment.md
rm .tmp-review-comment.md
```
**If comment post fails:** Warn and continue (non-blocking — body metadata already updated).

<!-- USER-EXTENSION-START: post-review -->
<!-- USER-EXTENSION-END: post-review -->

### Step 6: Report Summary
```
Review #N complete for Issue #$ISSUE: $TITLE
  Type: [Bug | Enhancement | Story | Epic | Generic]
  Recommendation: [recommendation]
  Reviews: N (updated)
  Issue comment: [posted | failed]
```
**For multiple issues:** Report summary for each, then batch summary at end.
---
## Error Handling
| Situation | Response |
|-----------|----------|
| Issue not found | "Issue #N not found." → STOP (skip to next if batch) |
| Issue closed | "Issue #N is closed. Review anyway? (y/n)" → ask user |
| Unknown issue type | "Using generic review criteria." → warn, continue |
| Issue body is empty | Flag as critical finding in review |
| `gh pmu edit` fails | "Failed to update issue body: {error}" → STOP |
| Comment post fails | Warn, continue (body already updated) |
| Multiple recognized labels | Use first recognized label as primary type |
---
**End of /review-issue Command**
