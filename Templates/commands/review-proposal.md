---
version: "v0.38.0"
description: Review a proposal with tracked history (project)
argument-hint: "#issue"
---

<!-- EXTENSIBLE -->
# /review-proposal
Reviews a proposal document linked from a GitHub issue, tracking review history with metadata fields and a Review Log table.
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
- Issue body must contain `**File:** Proposal/[Name].md` linking to the proposal
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | Yes | Issue number linked to the proposal (e.g., `#42` or `42`) |
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
### Step 1: Resolve Issue and Proposal File
Look up the issue:
```bash
gh issue view $ISSUE --json number,title,body,state,labels
```
**If not found:** `"Issue #$ISSUE not found."` → **STOP**
**If closed:** `"Issue #$ISSUE is closed. Review anyway? (y/n)"` — proceed only if user confirms.
Extract the proposal file path from the issue body:
```
Pattern: **File:** Proposal/[Name].md
```
**If `**File:**` field missing:**
```
Issue #$ISSUE does not link to a proposal file.
Expected `**File:** Proposal/[Name].md` in issue body.
```
→ **STOP**
Read the proposal file at the extracted path.
**If file not found:**
```
Proposal file not found: `{path}`. Check the path in issue #$ISSUE?
```
→ **STOP**

<!-- USER-EXTENSION-START: pre-review -->
<!-- USER-EXTENSION-END: pre-review -->

### Step 2: Perform Review
Evaluate the proposal across four dimensions. Ask subjective questions **one at a time** (not batched) to maintain conversational flow. Each answer can inform the next question. Partial reviews are valid — the user may stop at any point.

<!-- USER-EXTENSION-START: criteria-customize -->
<!-- USER-EXTENSION-END: criteria-customize -->

#### Completeness
- Does the proposal clearly state the problem being solved?
- Is the proposed solution described with enough detail to implement?
- Are implementation criteria or acceptance criteria defined?
- Are alternatives considered and documented?
- Is impact assessment present (scope, risk, effort)?
#### Consistency
- Does the proposal align with existing framework architecture?
- Are there contradictions between sections?
- Do implementation criteria match the proposed solution?
#### Feasibility
- Is the proposed solution technically achievable?
- Are dependencies or prerequisites identified?
- Is the effort estimate reasonable for the scope?
#### Quality
- Is the writing clear and unambiguous?
- Are edge cases and error handling addressed?
- Is the proposal self-contained (a reader can understand it without external context)?
Collect findings into structured categories: **Strengths**, **Concerns**, **Recommendations**.
Determine a recommendation:
- **Ready for implementation** — No blocking concerns
- **Ready with minor revisions** — Small issues that don't block
- **Needs revision** — Significant concerns that should be addressed first
- **Needs major rework** — Fundamental issues with problem statement or approach
### Step 3: Update Proposal Metadata
Read the current proposal file content.
**Update `**Reviews:** N` field:**
- If `**Reviews:**` field exists: increment the number (e.g., `**Reviews:** 1` → `**Reviews:** 2`)
- If `**Reviews:**` field does not exist: add `**Reviews:** 1` after the existing metadata fields (after `Status`, `Created`, `Author`, `Issue`/`Tracking Issue` lines, before the `---` separator)
### Step 4: Update Review Log
**If `## Review Log` section exists:** Append a new row to the existing table.
**If `## Review Log` section does not exist:**
- If `**End of Proposal**` marker exists: insert the Review Log section before it
- If no `**End of Proposal**` marker: append the Review Log section at the very end of the file
**Review Log format:**
```markdown
---

## Review Log

| # | Date | Reviewer | Findings Summary |
|---|------|----------|------------------|
| 1 | YYYY-MM-DD | Claude | [Brief one-line summary of findings] |
```
Each review appends a new row. **Never edit or delete existing rows** — the log is append-only.
Write the updated proposal file.
**If file write fails:** `"Failed to update proposal file: {error}"` → **STOP**
### Step 5: Post Issue Comment
Post a structured review comment to the GitHub issue:
```markdown
## Proposal Review #N — YYYY-MM-DD

**File:** Proposal/[Name].md
**Total Reviews:** N

### Findings

**Strengths:**
- [Strength 1]

**Concerns:**
- [Concern 1]

**Recommendations:**
- [Recommendation 1]

### Recommendation

[Ready for implementation | Ready with minor revisions | Needs revision | Needs major rework]
```
```bash
gh issue comment $ISSUE -F .tmp-review-comment.md
rm .tmp-review-comment.md
```
**If comment post fails:** Warn and continue (non-blocking — the proposal file is already updated).

<!-- USER-EXTENSION-START: post-review -->
<!-- USER-EXTENSION-END: post-review -->

### Step 6: Report Summary
```
Review #N complete for Proposal: [Title]
  File: Proposal/[Name].md
  Recommendation: [recommendation]
  Reviews: N (updated)
  Review Log: [appended | created]
  Issue comment: [posted | failed]
```
---
## Error Handling
| Situation | Response |
|-----------|----------|
| Issue not found | "Issue #N not found." → STOP |
| Issue missing `**File:**` field | "Issue #N does not link to a proposal file." → STOP |
| Proposal file not found | "Proposal file not found: `{path}`." → STOP |
| Issue closed | "Issue #N is closed. Review anyway? (y/n)" → ask user |
| File write fails | "Failed to update proposal file: {error}" → STOP |
| Comment post fails | Warn, continue (file already updated) |
| No metadata section in file | Create metadata field before first `---` separator |
---
**End of /review-proposal Command**
