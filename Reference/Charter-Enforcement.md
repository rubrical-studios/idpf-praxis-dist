# Charter Enforcement
**Version:** v0.22.0
**Source:** Reference/Charter-Enforcement.md

---

**Purpose:** Define checkpoints for charter validation and scope conflict handling.
Validation is **conversational, not blocking**—users can expand scope, proceed anyway, or revise work.

## Checkpoint Detection
Validate charter scope at these checkpoints:

| Checkpoint | Trigger | What to Load |
|------------|---------|--------------|
| **Proposal Creation** | User creates file in `Proposal/` | CHARTER.md, Inception/Scope-Boundaries.md |
| **Proposal Update** | User edits existing proposal | CHARTER.md, Inception/Scope-Boundaries.md |
| **PRD Creation** | User runs `promote-to-prd` or creates PRD manually | CHARTER.md, Inception/Scope-Boundaries.md |
| **PRD Update** | User edits existing PRD | CHARTER.md, Inception/Scope-Boundaries.md |
| **Enhancement Issue** | User creates issue with `enhancement:` trigger | CHARTER.md (summary only) |
| **Add-Story Command** | User runs `Add-Story` or creates story issue | CHARTER.md (summary only) |
| **Create-Backlog Command** | User runs `Create-Backlog` from PRD | CHARTER.md, Inception/Scope-Boundaries.md |

### Detection Logic
```
On user action:
  1. Check if CHARTER.md exists
     - If NO: Skip validation (no charter to enforce)
     - If YES: Continue to step 2

  2. Check if CHARTER.md is a template (has placeholders)
     - Regex: /{[a-z][a-z0-9-]*}/
     - If TEMPLATE: Skip validation (charter not yet completed)
     - If COMPLETE: Continue to step 3

  3. Identify checkpoint type from action:
     - File creation in Proposal/ → Proposal checkpoint
     - File creation in PRD/ → PRD checkpoint
     - Issue creation with enhancement label → Enhancement checkpoint
     - Command invocation → Command checkpoint

  4. Load appropriate charter artifacts

  5. Proceed to validation (see Scope Validation)
```

### Checkpoint Priority
| Priority | Checkpoint | Validation Depth |
|----------|------------|------------------|
| High | Create-Backlog, PRD creation | Full scope check |
| Medium | Proposal creation, Enhancement | Summary scope check |
| Low | Add-Story | Quick alignment check |

## Scope Validation
### Validation Process
```
1. Extract key concepts from work item:
   - Title keywords
   - Problem statement
   - Proposed solution
   - Features mentioned

2. Compare against charter scope:
   - In Scope items (from CHARTER.md or Scope-Boundaries.md)
   - Out of Scope items (explicit exclusions)
   - Current Focus (from CHARTER.md)

3. Determine alignment:
   - ALIGNED: Concepts match in-scope items
   - POSSIBLY MISALIGNED: Concepts not found in scope
   - CONFLICTS: Concepts match out-of-scope items
```

### Alignment Categories
| Category | Description | Action |
|----------|-------------|--------|
| **Aligned** | Work clearly fits in-scope items | Proceed without interruption |
| **Possibly Misaligned** | Work not explicitly in scope but not excluded | Ask for confirmation |
| **Conflicts** | Work matches out-of-scope items | Flag conflict, offer resolution |

## Conversational Resolution
When misalignment detected, engage user conversationally:

### Resolution Options
```
"This [proposal/feature/story] involves [X], which isn't currently in scope.

Options:
1. Expand charter scope to include this
2. Defer to future release
3. Proceed anyway (creates scope drift)
4. Revise the work item to fit current scope

Which would you like to do?"
```

### Resolution Actions
| User Choice | Action |
|-------------|--------|
| **Expand scope** | Update Inception/Scope-Boundaries.md, sync CHARTER.md if needed |
| **Defer** | Note in work item: "Deferred - out of current scope" |
| **Proceed anyway** | Log warning, continue with work |
| **Revise** | Help user modify work item to fit scope |

### Expansion Flow
```
1. "What scope item should we add?"
   → User provides description

2. Add to Inception/Scope-Boundaries.md:
   - Add to "In Scope" section
   - Add brief rationale: "Added [date] for [work item]"

3. Update CHARTER.md "In Scope" section if item is major

4. Commit changes: "Expand charter scope: add [item]"

5. Continue with original work
```

## /prepare-release Validation Gate
### Pre-Release Check
```
1. List all issues assigned to release
2. For each issue:
   - Load issue title and body
   - Check against charter scope
   - Flag any misalignments

3. Report:
   - "X of Y issues aligned with charter scope"
   - "Z issues may be out of scope: [list]"

4. Ask: "Proceed with release? Or review flagged issues?"
```

### Validation Severity
| Finding | Severity | Release Blocked? |
|---------|----------|------------------|
| All aligned | Info | No |
| Some possibly misaligned | Warning | No (user decides) |
| Conflicts with out-of-scope | Error | No (user decides, but warned) |

**Note:** Validation is advisory only. User always has final decision.

## Token Budget
| Checkpoint Type | Artifacts Loaded | Estimated Tokens |
|-----------------|------------------|------------------|
| High priority | CHARTER.md + Scope-Boundaries.md | ~600-1,000 |
| Medium priority | CHARTER.md only | ~150-200 |
| Low priority | CHARTER.md (vision + scope sections) | ~100-150 |

## Configuration
### Opt-Out
- **Per-session:** "Skip charter validation for this session"
- **Permanent:** Create `.no-charter-enforcement` file

### Quiet Mode
`"Validate silently - only warn on conflicts"` — skips confirmation for "possibly misaligned" items.

---

**End of Charter Enforcement**
