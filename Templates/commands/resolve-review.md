---
version: "v0.40.0"
description: Resolve review findings for an issue (project)
argument-hint: "#issue"
---

<!-- MANAGED -->
# /resolve-review
Parse the latest review findings on an issue and systematically resolve each one. Works with findings from `/review-issue`, `/review-proposal`, `/review-prd`, and `/review-test-plan`.
---
## Prerequisites
- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
- Issue has at least one review comment (from `/review-issue`, `/review-proposal`, `/review-prd`, or `/review-test-plan`)
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | Yes | Issue number (e.g., `#42` or `42`) |
---
## Execution Instructions
**REQUIRED:** Before executing:
1. **Create Todo List:** Use `TodoWrite` to create todos from the steps below
2. **Track Progress:** Mark todos `in_progress` → `completed` as you work
3. **Resume Point:** If interrupted, todos show where to continue
---
## Workflow
### Step 1: Fetch Review Comment
Retrieve the latest review comment from the issue:
```bash
gh api repos/{owner}/{repo}/issues/$ISSUE/comments --jq 'reverse | .[0:10]'
```
Scan comments in reverse chronological order for a review comment. Match by header pattern:
| Pattern | Review Type |
|---------|-------------|
| `## Issue Review #N` | Issue review (`/review-issue`) |
| `## Proposal Review #N` | Proposal review (`/review-proposal`) |
| `## PRD Review #N` | PRD review (`/review-prd`) |
| `## Test Plan Review #N` | Test plan review (`/review-test-plan`) |
**If no review comment found:**
```
No review found on issue #$ISSUE. Run one of these first:
  /review-issue #$ISSUE
  /review-proposal #$ISSUE
  /review-prd #$ISSUE
  /review-test-plan #$ISSUE
```
→ **STOP**
### Step 2: Detect Review Type and Recommendation
From the matched comment, extract:
- **Review type** (Issue, Proposal, PRD, or Test Plan)
- **Review number** (from `#N` in header)
- **Recommendation** (from `### Recommendation` section)
| Recommendation | Action |
|----------------|--------|
| Ready for work / Ready for implementation / Ready for backlog creation | Report "Already ready — no action needed." → **STOP** |
| Needs minor revision | Proceed to Step 3 |
| Needs revision | Proceed to Step 3 |
| Needs major rework | Proceed to Step 3 |
### Step 3: Parse Findings
Parse findings based on review type.
#### Issue Reviews (emoji-based)
Extract lines from `### Findings` section matching these patterns:
| Marker | Status | Action |
|--------|--------|--------|
| `✅` | Passed | Skip — no action needed |
| `⚠️` | Needs attention | Queue for resolution |
| `❌` | Missing/incorrect | Queue for resolution |
**Extract the criterion name** from each finding line (text after the emoji and optional bold marker).
Example parsing:
```
- ⚠️ **Title** — Doesn't reflect both changes
  → Finding: "Title needs rewording"
  → Detail: "Doesn't reflect both changes"

- ❌ **Priority** — Not set
  → Finding: "Priority not set"
  → Detail: "Not set"
```
#### Proposal Reviews (section-based)
Extract items from **Concerns** and **Recommendations** sections:
- Each bullet under `**Concerns:**` → queue for resolution
- Each bullet under `**Recommendations:**` → queue for resolution
- Items under `**Strengths:**` → skip (positive findings)
#### PRD Reviews (section-based)
Same parsing as Proposal Reviews, plus:
- Check `**Test Plan:**` field — if "Not found", queue as finding
#### Test Plan Reviews (section-based)
Same parsing as Proposal Reviews — extract Concerns and Recommendations bullets.
- Coverage gaps appear as bullet-point concerns (e.g., "Story 2.3 AC ... has no corresponding test case")
- Check `### Coverage Summary` for overall coverage status
### Step 4: Classify Findings
For each queued finding, classify as **auto-fixable** or **needs-user-input**.
#### Auto-Fixable Findings
| Finding Pattern | Auto-Fix Strategy |
|-----------------|-------------------|
| Priority not set / Priority missing | `gh pmu move $ISSUE --priority p2` (suggest default, ask confirm) |
| Missing labels | `gh issue edit $ISSUE --add-label {label}` |
| Body format doesn't match template | Reformat body to canonical template |
| Missing acceptance criteria section | Add AC section skeleton to body |
| Missing reproduction steps (bug) | Add template section to body |
| Test Plan not found (PRD) | Flag for user — cannot auto-generate |
#### Needs-User-Input Findings
| Finding Pattern | User Action |
|-----------------|-------------|
| Title needs rewording | Propose new title, ask user to accept/edit |
| Description insufficient | Ask user to provide additional detail |
| Scope not well-defined | Ask user to clarify scope boundaries |
| Success criteria not measurable | Ask user to refine criteria |
| Value proposition unclear | Ask user to articulate value |
| Any subjective quality judgment | Present the finding, ask user to resolve |
### Step 5: Resolve Findings
Process findings sequentially. **Ask subjective items one at a time** (not batched).
**For auto-fixable findings:**
1. Describe what will be changed
2. Ask user to confirm: `"Set priority to P2? [y/n/other]"`
3. If confirmed, apply the fix
4. Report: `"✓ Priority set to P2"`
**For needs-user-input findings:**
1. Present the finding and the reviewer's note
2. Ask user how to resolve (provide options where possible)
3. Apply the user's decision
4. Report: `"✓ Title updated"`
**For title rewording specifically:**
1. Read the current title
2. Read the review finding for context on what's wrong
3. Propose a new title based on the issue body content
4. Ask user: `"Suggested title: '{new title}'. Accept? [y/n/edit]"`
5. Apply accepted or edited title: `gh issue edit $ISSUE --title "{new title}"`
**Progress reporting:**
```
Resolving 3 findings from Issue Review #1...

  1/3 ❌ Priority not set
      → Set priority to P2? [y/n/other]
      → ✓ Priority set to P2

  2/3 ⚠️ Title needs rewording
      → Current: "/gap-analysis should be more widely applied"
      → Suggested: "/gap-analysis: output proposal documents and expand to 12 areas"
      → Accept? [y/n/edit]
      → ✓ Title updated

  3/3 ⚠️ Description could be more detailed
      → What additional detail should be added?
      → [user provides input]
      → ✓ Description updated

All findings resolved.
```
### Step 6: Re-Run Review
After all findings are resolved, re-run the appropriate review command:
| Review Type | Re-Run Command |
|-------------|----------------|
| Issue | `/review-issue #$ISSUE` |
| Proposal | `/review-proposal #$ISSUE` |
| PRD | `/review-prd #$ISSUE` |
| Test Plan | `/review-test-plan #$ISSUE` |
**Invoke the command** using the Skill tool. The re-review will verify all findings are resolved and post an updated review comment.
Report final status:
```
/resolve-review #$ISSUE complete.
  Findings resolved: N
  Re-review: [recommendation from new review]
```
---
## Error Handling
| Situation | Response |
|-----------|----------|
| Issue not found | "Issue #N not found." → STOP |
| No review comment found | "No review found. Run /review-issue, /review-proposal, /review-prd, or /review-test-plan first." → STOP |
| Already ready for work | "Already ready — no action needed." → STOP |
| `gh pmu` command fails | "Failed to update issue: {error}" → STOP |
| `gh issue edit` fails | "Failed to update issue: {error}" → STOP |
| User declines all fixes | "No changes made. Review findings remain unresolved." → STOP |
| Re-review finds new issues | Report — user can run `/resolve-review` again |
---
**End of /resolve-review Command**
