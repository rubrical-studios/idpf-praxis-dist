---
version: "v0.40.0"
description: Review a PRD with tracked history (project)
argument-hint: "#issue"
---

<!-- EXTENSIBLE -->
# /review-prd
Reviews a PRD document linked from a GitHub issue, tracking review history with metadata fields and a Review Log table. Evaluates requirements completeness, user stories, acceptance criteria, NFRs, and test plan alignment.
**Extension Points:** See `.claude/metadata/extension-points.json` or run `/extensions list --command review-prd`
---
## Prerequisites
- `gh pmu` extension installed
- `.gh-pmu.yml` configured in repository root
- Issue body must reference the PRD file path
---
## Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| `#issue` | Yes | Issue number linked to the PRD (e.g., `#42` or `42`) |
| `--with` | No | Comma-separated domain extensions (e.g., `--with security,performance`) or `--with all` |
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
### Step 1: Resolve Issue and PRD File
Look up the issue:
```bash
gh issue view $ISSUE --json number,title,body,state,labels
```
**If not found:** `"Issue #$ISSUE not found."` → **STOP**
**If closed:** `"Issue #$ISSUE is closed. Review anyway? (y/n)"` — proceed only if user confirms.
Extract the PRD file path from the issue body. Look for patterns:
- `**File:** PRD/[Name]/PRD-[Name].md`
- `**PRD:** PRD/[Name]/PRD-[Name].md`
- Direct path reference to a `PRD/` file
**If no PRD file reference found:**
```
Issue #$ISSUE does not link to a PRD file.
Expected a PRD file path (e.g., `PRD/[Name]/PRD-[Name].md`) in the issue body.
```
→ **STOP**
Read the PRD file at the extracted path.
**If file not found:**
```
PRD file not found: `{path}`. Check the path in issue #$ISSUE?
```
→ **STOP**
### Step 2: Locate Test Plan
Check for a test plan file alongside the PRD:
```
PRD/{Name}/Test-Plan-{Name}.md
```
Look for files matching `Test-Plan-*.md` in the same directory as the PRD file.
**If test plan exists:** Read it for inclusion in the review.
**If no test plan found:**
```
Warning: No test plan found alongside PRD. Review will proceed without test plan alignment check.
```
Continue with PRD-only review (non-blocking).
**If test plan exists but is empty:** Note incomplete test plan in review findings.

<!-- USER-EXTENSION-START: pre-review -->
<!-- USER-EXTENSION-END: pre-review -->

### Step 2b: Extension Loading
**If `--with` is specified:**
1. Read `.claude/metadata/review-extensions.json`
2. Parse the `--with` value:
   - `--with all` → load all registered extensions
   - `--with security,performance` → load specified extensions (trim spaces from comma-separated list)
3. For each requested extension ID:
   - Look up the `source` path in the registry
   - Read the criteria file content
   - Extract the **PRD Review Questions** section
4. If an extension ID is not found in the registry, warn: `"Unknown extension: {id}. Available: security, accessibility, performance, chaos, contract, qa"`
5. Store loaded criteria for use in Step 3
**Error Handling (Extension Loading):**
- **Registry not found:** `"Review extensions registry not found. Run hub update or check installation."` → fall back to standard review only
- **Registry malformed:** `"Review extensions registry is malformed. Run hub update or check installation."` → fall back to standard review only
- **Criteria file not found:** `"Warning: Review criteria file not found for '{domain}'. Skipping domain. Update hub to resolve."` → continue with remaining domains
- **All criteria files missing:** `"No review criteria files found. Running standard review only."` → fall back to standard review only
**If `--with` is not specified:** Skip extension loading (standard review only).
### Step 3: Perform Review
Evaluate the PRD across these dimensions. Ask subjective questions **one at a time** (not batched).

<!-- USER-EXTENSION-START: criteria-customize -->
<!-- USER-EXTENSION-END: criteria-customize -->

#### Requirements Completeness
- Is the problem statement clear and well-defined?
- Are all functional requirements documented?
- Are success criteria measurable and verifiable?
- Are scope boundaries (in-scope / out-of-scope) defined?
#### User Stories
- Do user stories follow the standard format (As a / I want / So that)?
- Does each story have acceptance criteria?
- Are story priorities assigned?
- Are stories sized appropriately (not too large)?
#### Acceptance Criteria
- Are acceptance criteria specific, measurable, and testable?
- Do they cover happy paths and error cases?
- Are edge cases identified?
#### Non-Functional Requirements (NFRs)
- Are performance requirements specified?
- Are security considerations documented?
- Are scalability or availability requirements present (if applicable)?
#### Test Plan Alignment (if test plan present)
- Does the test plan cover all user stories?
- Are acceptance criteria mapped to test cases?
- Are integration and E2E test scenarios defined?
- Is test coverage approach documented?
Collect findings into structured categories: **Strengths**, **Concerns**, **Recommendations**.
Determine a recommendation:
- **Ready for backlog creation** — No blocking concerns
- **Ready with minor revisions** — Small issues that don't block
- **Needs revision** — Significant concerns that should be addressed first
- **Needs major rework** — Fundamental issues with requirements or scope
**If extensions were loaded (Step 2b):**
For each loaded extension, evaluate the PRD against the extension's PRD Review Questions. Present findings as a separate section:
```markdown
### Security Review (IDPF-Security)
- [Finding 1]
- [Finding 2]
```
Extension findings can **escalate** the overall recommendation but cannot downgrade it.
**Applicability Filtering:** Omit extension domain sections that produce no applicable findings. Only domains with actual findings appear in the output and in the `**Extensions Applied:**` header. If no domains produce findings, fall back to standard-only review with a warning: `"No domain extensions produced findings. Showing standard review only."` At least one domain section must appear when `--with` is used; otherwise the fallback applies.
### Step 4: Update PRD Metadata
Read the current PRD file content.
**Update `**Reviews:** N` field:**
- If `**Reviews:**` field exists: increment the number (e.g., `**Reviews:** 1` → `**Reviews:** 2`)
- If `**Reviews:**` field does not exist: add `**Reviews:** 1` after the existing metadata fields, before the first `---` separator
### Step 5: Update Review Log
**If `## Review Log` section exists:** Append a new row to the existing table.
**If `## Review Log` section does not exist:**
- If `**End of PRD**` marker exists: insert the Review Log section before it
- If no `**End of PRD**` marker (DD14 fallback): append the Review Log section at the very end of the file
**Review Log format:**
```markdown
---

## Review Log

| # | Date | Reviewer | Findings Summary |
|---|------|----------|------------------|
| 1 | YYYY-MM-DD | Claude | [Brief one-line summary of findings] |
```
Each review appends a new row. **Never edit or delete existing rows** — the log is append-only.
Write the updated PRD file.
**If file write fails:** `"Failed to update PRD file: {error}"` → **STOP**
### Step 6: Post Issue Comment
Post a structured review comment to the GitHub issue:
```markdown
## PRD Review #N — YYYY-MM-DD

**File:** PRD/[Name]/PRD-[Name].md
**Total Reviews:** N
**Extensions Applied:** {list of applied extensions, or "None"}
**Test Plan:** [Reviewed | Not found]

### Findings

**Strengths:**
- [Strength 1]

**Concerns:**
- [Concern 1]

**Recommendations:**
- [Recommendation 1]

### Recommendation

[Ready for backlog creation | Ready with minor revisions | Needs revision | Needs major rework]
```
```bash
gh issue comment $ISSUE -F .tmp-review-comment.md
rm .tmp-review-comment.md
```
**If comment post fails:** Warn and continue (non-blocking — the PRD file is already updated).

<!-- USER-EXTENSION-START: post-review -->
<!-- USER-EXTENSION-END: post-review -->

### Step 7: Report Summary
```
Review #N complete for PRD: [Title]
  File: PRD/[Name]/PRD-[Name].md
  Test Plan: [Reviewed | Not found]
  Recommendation: [recommendation]
  Reviews: N (updated)
  Review Log: [appended | created]
  Issue comment: [posted | failed]
```
**If `--with` is not specified**, append a discoverability tip after the summary:
```
Tip: Use --with security,performance to add domain-specific review criteria.
Available: security, accessibility, performance, chaos, contract, qa (or --with all)
```
---
## Error Handling
| Situation | Response |
|-----------|----------|
| Issue not found | "Issue #N not found." → STOP |
| Issue missing PRD file reference | "Issue #N does not link to a PRD file." → STOP |
| PRD file not found | "PRD file not found: `{path}`." → STOP |
| Issue closed | "Issue #N is closed. Review anyway? (y/n)" → ask user |
| Test plan not found | Warning, continue with PRD-only review |
| Test plan empty | Note in findings, continue |
| File write fails | "Failed to update PRD file: {error}" → STOP |
| Comment post fails | Warn, continue (file already updated) |
| No metadata section in file | Create metadata field before first `---` separator |
---
**End of /review-prd Command**
