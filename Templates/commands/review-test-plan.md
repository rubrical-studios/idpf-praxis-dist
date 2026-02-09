---
version: "v0.40.0"
description: Review a test plan against its PRD (project)
argument-hint: "#issue"
---

<!-- MANAGED -->
# /review-test-plan
Reviews a TDD test plan document linked from a GitHub issue, cross-referencing it against the source PRD for coverage completeness. Tracks review history with metadata fields and a Review Log table.
Unlike `/review-issue`, this command reads two linked documents (the test plan and its source PRD) and performs systematic cross-referencing of acceptance criteria against test cases.
---
## Prerequisites
- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
- Issue body must contain `**Test Plan:**` linking to the test plan file
- Issue body must contain `**PRD:**` linking to the source PRD file
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | Yes | Issue number linked to the test plan (e.g., `#42` or `42`) |
---
## Execution Instructions
**REQUIRED:** Before executing:
1. **Create Todo List:** Use `TodoWrite` to create todos from the steps below
2. **Track Progress:** Mark todos `in_progress` → `completed` as you work
3. **Post-Compaction:** If resuming after context compaction, re-read this spec and regenerate todos
---
## Workflow
### Step 1: Resolve Issue and Documents
Look up the issue:
```bash
gh issue view $ISSUE --json number,title,body,state,labels
```
**If not found:** `"Issue #$ISSUE not found."` → **STOP**
**If closed:** `"Issue #$ISSUE is closed. Review anyway? (y/n)"` — proceed only if user confirms.
Extract document paths from the issue body:
```
Pattern: **Test Plan:** PRD/[Name]/Test-Plan-[Name].md
Pattern: **PRD:** PRD/[Name]/PRD-[Name].md
```
**If `**Test Plan:**` field missing:**
```
Issue #$ISSUE does not link to a test plan file.
Expected `**Test Plan:** PRD/[Name]/Test-Plan-[Name].md` in issue body.
```
→ **STOP**
**If `**PRD:**` field missing:**
```
Issue #$ISSUE does not link to a PRD file.
Expected `**PRD:** PRD/[Name]/PRD-[Name].md` in issue body.
```
→ **STOP**
Read both documents.
**If test plan file not found:**
```
Test plan file not found: `{path}`. Check the path in issue #$ISSUE?
```
→ **STOP**
**If PRD file not found:**
```
PRD file not found: `{path}`. Check the path in issue #$ISSUE?
```
→ **STOP**
### Step 2: Perform Review
Evaluate the test plan across these dimensions:
#### Coverage Completeness (P0)
Systematically cross-reference the PRD against the test plan:
1. **Extract all acceptance criteria** from every user story in the PRD (all `- [ ]` items)
2. **For each acceptance criterion**, verify a corresponding test case exists in the test plan
3. **Report coverage status** for each story:
   - Full coverage: all ACs have test cases
   - Partial coverage: some ACs missing test cases
   - No coverage: story has no test cases at all
#### Edge Cases and Error Conditions
- Are error scenarios identified for each story?
- Are boundary conditions tested?
- Are failure modes covered?
#### Integration Test Points
- Are integration points between epics/stories mapped?
- Do integration tests verify component interactions?
- Are data flow boundaries tested?
#### E2E Scenarios
- Do E2E scenarios cover critical user journeys from the PRD?
- Are happy paths and error paths both represented?
- Do scenarios map back to PRD requirements?
#### Test Strategy Alignment
- Is the test framework specified?
- Is the framework consistent with `Inception/Test-Strategy.md` (if it exists)?
- Are coverage targets realistic for the project type?
- Are test levels (unit, integration, E2E) appropriate for the content?
Collect findings into structured categories: **Strengths**, **Concerns**, **Recommendations**.
**Coverage gaps are reported as bullet-point concerns** (not tables) for `/resolve-review` parser compatibility.
Example concern format:
```
- Story 2.3 AC "Source paths resolve" has no corresponding test case
- Story 1.2 missing error condition tests for failed grep matches
```
Determine a recommendation:
- **Ready for approval** — All ACs have test cases, no blocking concerns
- **Ready with minor gaps** — Small coverage gaps that don't block
- **Needs revision** — Significant coverage gaps that should be addressed
- **Needs major rework** — Fundamental coverage issues or missing test sections
### Step 3: Update Test Plan Metadata
Read the current test plan file content.
**Update `**Reviews:** N` field:**
- If `**Reviews:**` field exists: increment the number (e.g., `**Reviews:** 1` → `**Reviews:** 2`)
- If `**Reviews:**` field does not exist: add `**Reviews:** 1` after the existing metadata fields (after `Source`, `PRD`, `Created`, `Approval Issue` lines, before the first `---` separator)
### Step 4: Update Review Log
**If `## Review Log` section exists:** Append a new row to the existing table.
**If `## Review Log` section does not exist:** Append the Review Log section at the very end of the file.
**Review Log format:**
```markdown
---

## Review Log

| # | Date | Reviewer | Findings Summary |
|---|------|----------|------------------|
| 1 | YYYY-MM-DD | Claude | [Brief one-line summary of findings] |
```
Each review appends a new row. **Never edit or delete existing rows** — the log is append-only.
Write the updated test plan file.
**If file write fails:** `"Failed to update test plan file: {error}"` → **STOP**
### Step 5: Post Issue Comment
Post a structured review comment to the GitHub issue:
```markdown
## Test Plan Review #N — YYYY-MM-DD

**Test Plan:** PRD/[Name]/Test-Plan-[Name].md
**PRD:** PRD/[Name]/PRD-[Name].md
**Total Reviews:** N

### Coverage Summary

- Stories with full coverage: X/Y
- Stories with partial coverage: X/Y
- Stories with no coverage: X/Y

### Findings

**Strengths:**
- [Strength 1]

**Concerns:**
- [Concern 1]

**Recommendations:**
- [Recommendation 1]

### Recommendation

[Ready for approval | Ready with minor gaps | Needs revision | Needs major rework]
```
```bash
gh issue comment $ISSUE -F .tmp-review-comment.md
rm .tmp-review-comment.md
```
**If comment post fails:** Warn and continue (non-blocking — the test plan file is already updated).
### Step 6: Report Summary
```
Review #N complete for Test Plan: [Title]
  Test Plan: PRD/[Name]/Test-Plan-[Name].md
  PRD: PRD/[Name]/PRD-[Name].md
  Coverage: X/Y stories fully covered
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
| Issue missing `**Test Plan:**` field | "Issue #N does not link to a test plan file." → STOP |
| Issue missing `**PRD:**` field | "Issue #N does not link to a PRD file." → STOP |
| Test plan file not found | "Test plan file not found: `{path}`." → STOP |
| PRD file not found | "PRD file not found: `{path}`." → STOP |
| Issue closed | "Issue #N is closed. Review anyway? (y/n)" → ask user |
| File write fails | "Failed to update test plan file: {error}" → STOP |
| Comment post fails | Warn, continue (file already updated) |
| No metadata section in file | Create metadata field before first `---` separator |
| PRD has no acceptance criteria | Flag as critical concern — cannot verify coverage |
---
**End of /review-test-plan Command**
