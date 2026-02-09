---
version: "v0.40.0"
description: Complete issues with criteria verification and status transitions (project)
argument-hint: "[#issue...] (optional)"
---

<!-- EXTENSIBLE -->
# /done
Complete one or more issues. Moves from `in_review` → `done` with a STOP boundary. Only handles the final transition — `/work` owns `in_progress` → `in_review`.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-done` | Before moving to done | Tests, lint, build verification |
| `post-done` | After moving to done | Deploy trigger, time tracking stop |
---
## Prerequisites
- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
- Issue in `in_review` status (use `/work` to move issues through `in_progress` → `in_review` first)
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | No | Single issue number (e.g., `#42` or `42`) |
| `#issue #issue...` | | Multiple issue numbers (e.g., `#42 #43 #44`) |
| *(none)* | | Queries `in_review` issues for selection |
---
## Execution Instructions
**REQUIRED:** Before executing:
1. **ALWAYS Generate Todo List:** Parse workflow steps, use `TodoWrite` to create todos
2. **Include Extensions:** Add todo item for each non-empty `USER-EXTENSION` block
3. **Track Progress:** Mark todos `in_progress` → `completed` as you work
4. **Post-Compaction:** Re-read spec and regenerate todos after context compaction
**Todo Rules:** One todo per numbered step; one todo per active extension; skip commented-out extensions.
---
## Workflow
### Step 1: Parse Arguments
Accept these formats:
- `#42` or `42` — single issue
- `#42 #43 #44` — multiple issues
- *(no arguments)* — query for in_review issues
**For no arguments:**
```bash
gh pmu list --status in_review
```
| Result | Action |
|--------|--------|
| No issues found | "No issues in review. Specify issue number or complete work first." → **STOP** |
| Single issue | Confirm: `Issue #N: $TITLE is in review. Complete it? (yes/no)` |
| Multiple issues | Present numbered list for user selection |
**For multiple issues:** Process each sequentially using Steps 2–5.
### Step 2: Validate Issue
```bash
gh issue view $ISSUE --json number,title,labels,body,state
```
**If not found:** "Error: Issue #$ISSUE not found." → **STOP** (skip this issue, continue to next if batch)
**If already closed:** "Issue #$ISSUE is already closed. Skipping." → Skip to next issue or **STOP**
### Step 3: Detect Current Status
```bash
gh pmu view $ISSUE --json=status
```
| Status | Path |
|--------|------|
| `in_review` | Proceed to Step 4 (confirm → done) |
| `in_progress` | Report: `Issue #$ISSUE is still in progress. Complete work first via /work.` → **STOP** |
| `done` | Already done — report and skip |
| Other | "Issue #$ISSUE is in $STATUS. Move to in_progress first via /work." → **STOP** |
**Note:** `/done` only handles the `in_review → done` transition. The `in_progress → in_review` transition is owned by `/work` (which verifies acceptance criteria and moves to in_review as part of its workflow).

<!-- USER-EXTENSION-START: pre-done -->
<!-- USER-EXTENSION-END: pre-done -->

### Step 4: Move to Done
```bash
gh pmu move $ISSUE --status done
```
Report: `Issue #$ISSUE: $TITLE → Done ✓`

<!-- USER-EXTENSION-START: post-done -->
<!-- USER-EXTENSION-END: post-done -->

### Step 5: Design Decisions Offer
**If the ASSISTANT** is aware of decisions required to complete work on this issue, offer to document:
```
Would you like me to document the design decisions/issues encountered in Construction/Design-Decisions/?
```
**If accepted:**
1. Check if `Construction/Design-Decisions/` exists; create if missing with warning
2. Derive `{topic}` from issue title (kebab-case, truncate to 50 chars). If file exists, append `-2`, `-3`, etc.
3. Create `Construction/Design-Decisions/YYYY-MM-DD-{topic}.md` using template:
```markdown
# Design Decision: [Title]
**Date:** [YYYY-MM-DD]
**Status:** Accepted
**Context:** Issue #[N] — [Issue Title]
## Decision
[What was decided]
## Rationale
[Why this choice was made]
## Alternatives Considered
- [Alternative 1]: [Why rejected]
## Consequences
- [Positive consequence]
- [Negative consequence or trade-off]
## Issues Encountered
[Any blockers, surprises, or lessons learned]
```
4. Reference the issue number in the document
**If declined:** Proceed without documenting (optional).
---
## Error Handling
| Situation | Response |
|-----------|----------|
| Issue not found | "Issue #N not found." → STOP |
| Issue already closed | "Issue #N is already closed. Skipping." → skip |
| Issue still in_progress | "Issue #N is still in progress. Complete work first via /work." → STOP |
| Issue in other status | "Issue #N is in $STATUS. Move to in_progress first via /work." → STOP |
| No issues in review (no-arg) | "No issues in review. Specify issue number." → STOP |
| `gh pmu` command fails | "Failed to update issue: {error}" → STOP |
| Construction/ missing | Warn and create |
---
**End of /done Command**
