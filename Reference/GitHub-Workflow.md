# GitHub Workflow Integration
**Version:** 1.3
**MUST READ:** At session startup and after compaction.

## Project Configuration
**Read from `.gh-pmu.yml`:**
```yaml
project:
    owner: {owner}
    number: {number}
repositories:
    - {owner}/{repo}
fields:
    status:
        values: {backlog, in_progress, in_review, done}
    priority:
        values: {p0, p1, p2}
```
Use alias (left side) in commands: `gh pmu move 90 --status in_progress`
**If missing:** Run `gh pmu init`

## Prerequisites
```bash
gh extension install rubrical-studios/gh-pmu
```

## Critical Rules
⚠️ **NEVER close issues automatically** - Wait for "Done"
⚠️ **NEVER skip STOP checkpoint** - Report and wait
⚠️ **Issues stay open** until explicit approval
⚠️ **NEVER mark Done with unchecked boxes** - All acceptance criteria must be checked
⚠️ **In Review requires checkbox evaluation** - Check all criteria when moving to In Review

---

## Workflow Routing (CRITICAL - READ FIRST)

**When user says "work [issue] #N" or "work #N" or "work epic #N":**

**IMMEDIATELY check the issue type:**
```bash
gh issue view [N] --repo {repository} --json labels --jq '.labels[].name'
```

**Routing Decision Tree:**
```
"work #N"
    │
    ▼
Has "epic" label? ─── YES ──► EPIC WORKFLOW (Section 5)
    │                         Work sub-issues sequentially
    NO
    │
    ▼
Has "bug" label? ──── YES ──► BUG WORKFLOW (Section 1)
    │
    NO
    │
    ▼
ENHANCEMENT WORKFLOW (Section 2)
```

**Epic Detection Command:**
```bash
gh issue view [N] --repo {repository} --json labels --jq '.labels[].name' | grep -q "epic"
```

**If EPIC:** Go to Section 5 - work sub-issues sequentially
**If NOT EPIC:** Continue to Bug/Enhancement workflow

---

## Trigger Words (Create Issue First)

| Trigger | Action | Section |
|---------|--------|---------|
| `bug:` | Create bug issue | 1 |
| `enhancement:` | Create enhancement issue | 2 |
| `finding:` | Create bug issue (synonym) | 1 |
| `idea:` | Create idea proposal | 7 |
| `proposal:` | Create proposal document | 3 |
| `prd:` | Convert proposal to PRD | 8 |

Create issue → Report number → **Wait for "work" instruction**

---

## Workflows

### 1. Bug Workflow
**Triggers:** "I found...", "bug", "broken", "finding:", unexpected behavior
**Step 1 (AUTO):** Create issue with `--label "bug"`
**Step 2 (WAIT):** Wait for "work issue", "fix that"
**Step 3:** `gh pmu move --status in_progress` → Work → Check criteria → `--status in_review`
**STOP:** Report and wait for "Done"
**Step 4:** `gh pmu move --status done` → `gh issue close`

### 2. Enhancement Workflow
**Triggers:** "I would like...", "Can you add...", "New feature..."
Same flow as Bug, use `--label "enhancement"`

### 3. Proposal Workflow
**Triggers:** "Create a proposal for...", "Design document..."
**Step 1 (AUTO):** Create `Proposal/[Name].md` + issue
**Step 2 (WAIT):** Wait for "implement the proposal"
**Step 3:** Implement → `git mv Proposal/[Name].md Proposal/Implemented/` → Commit
**STOP:** Wait for "Done"

### 4. Sub-Issue Workflow
**Triggers:** "Create sub-issues for...", "Break into phases..."
**Step 1:** Create sub-issues with parent reference
**Step 2:** Link: `gh pmu sub add [parent] [sub] --repo {repo}`
**Step 3:** Ask: "Should I label parent as 'epic'?"
**Step 4 (if yes):** Add `--add-label "epic"`, `--remove-label "story"` from parent, add "story" to subs

### 5. Epic Workflow (CRITICAL - Takes Precedence)
**⚠️ This workflow takes precedence over Bug/Enhancement when issue has "epic" label.**

**Triggers:** "work issue #[N]" or "work #N" where issue has "epic" label, "work epic #N"

**Detection (MANDATORY FIRST STEP):**
```bash
gh issue view [N] --repo {repository} --json labels --jq '.labels[].name' | grep -q "epic"
```
**If "epic" label present, MUST use this workflow. Do NOT fall through to Enhancement.**

**Step 0:** `gh pmu move [epic-number] --status in_progress`

**Step 1:** Get sub-issues: `gh pmu sub list [epic-number] --json`
Sort by issue number (ascending) for work order.

**Step 2:** For each sub-issue in numeric order:
- **2a.** `gh pmu move [sub-issue] --status in_progress`
- **2b.** Perform the work
- **2c.** Check acceptance criteria, update checkboxes
- **2d.** `gh pmu move [sub-issue] --status in_review`
- **2e.** Proceed to next sub-issue

**Step 3:** After all sub-issues complete:
- **3a.** Check epic acceptance criteria, update checkboxes
- **3b.** `gh pmu move [epic-number] --status in_review`
- **3c.** Add summary comment listing all completed sub-issues

**STOP:** Report "Epic #[N] ready for review. Say 'Done' to close it and all sub-issues."

**Step 4:** On "Done", close sub-issues first, then epic:
```bash
# For each sub-issue
gh pmu move [sub] --status done
gh issue close [sub] --comment "Completed as part of epic #[epic]"

# Then epic
gh pmu move [epic] --status done
gh issue close [epic] --comment "Resolved and closed. All sub-issues completed."
```

### 6. Create-Issues Workflow (PRD)
**Triggers:** "Create-Issues", "Create-Backlog" (Agile preferred), "Create-Issues-Structured"
**Framework Detection:**
- `PRD-Agile-*.md` → Redirect to `Create-Backlog`
- `PRD-Structured-*.md` → Structured
- Ambiguous → Ask user

**Agile (via Create-Backlog):** Feature Area → Epic → Capabilities → Stories (linked via `gh pmu sub add`), sets PRD field, updates PRD status
**Structured:** REQ-XXX → Requirement → Implementation + QA sub-issues (linked)

### 7. Reopen Workflow
**Triggers:** "reopen issue #[N]"
`gh issue reopen [N]` → `gh pmu move --status ready`

### 8. Idea Workflow
**Triggers:** "I have an idea...", "What if...", "New idea:"
**Step 1 (AUTO):** Create lightweight `Proposal/[Idea].md` + issue with `--label "idea"`
**Step 2:** Iterate conversationally
**Step 3:** Wait for "convert to PRD"

### 9. Proposal-to-PRD Workflow
**Triggers:** "convert to PRD", "ready for PRD", "make PRD", `prd: [name]`, `prd: for #N`
**Step 1:** Read proposal, load IDPF-PRD, load anti-hallucination rules
**Step 2:** Run phases (Discovery → Elicitation → Specification → Generation)
**Step 3:** Generate `PRD/PRD-[Name].md`, update proposal status, `--remove-label "idea" --add-label "prd"`

### 10. PRD Completion Workflow
**Triggers:** "PRD complete", "mark PRD as complete", "all stories done for PRD", final "Update PRD status to Complete" story
**Step 1:** Verify all linked issues are Done
**Step 2:** Update PRD status to "Complete"
**Step 3:** `mkdir -p PRD/Implemented && git mv PRD/PRD-[Name].md PRD/Implemented/`
**Step 4:** Commit → Comment on parent issue (if exists)
**Report:** "PRD marked complete and moved to PRD/Implemented/"

---

## Session Behavior Summary
- **Route "work" commands through Workflow Routing first** (check epic label before other workflows)
- Auto-detect bugs/enhancements/proposals/ideas
- Create issues immediately
- Wait for instruction before working
- Update board status via `gh pmu move`
- Reference issues in commits
- Wait for "Done" before closing
- Move implemented proposals to `Proposal/Implemented/`
- Link sub-issues with `gh pmu sub add`
- **Work epics** by working sub-issues in numeric order
- Move completed PRDs to `PRD/Implemented/`

## Confirmation Message
```
GitHub Workflow Activated
━━━━━━━━━━━━━━━━━━━━━━━━━━
Project: {repo}
Board: https://github.com/users/{owner}/projects/{number}/views/1
• Epic → Check label FIRST → Work sub-issues in order
Issues created auto. Work on instruction. Close on "Done".
```

## Manual Overrides
- "don't create an issue" - Skip creation
- "label as [X]" - Custom label
- "keep issue open" - Don't close
