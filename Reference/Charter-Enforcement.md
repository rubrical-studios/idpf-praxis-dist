# Charter Enforcement
**Version:** 0.20.0
**Source:** Reference/Charter-Enforcement.md

---

Validates work items align with project scope. Validation is **conversational, not blocking**.

## Checkpoint Detection

| Checkpoint | Trigger | Load |
|------------|---------|------|
| Proposal Creation/Update | File in `Proposal/` | CHARTER.md, Inception/Scope-Boundaries.md |
| PRD Creation/Update | `promote-to-prd` or PRD file | CHARTER.md, Inception/Scope-Boundaries.md |
| Enhancement Issue | `enhancement:` trigger | CHARTER.md only |
| Add-Story | Story creation | CHARTER.md only |
| Create-Backlog | PRD to backlog | CHARTER.md, Inception/Scope-Boundaries.md |

### Detection Logic
```
1. Check CHARTER.md exists → NO: Skip validation
2. Check for template placeholders (/{[a-z][a-z0-9-]*}/) → TEMPLATE: Skip
3. Identify checkpoint type from action
4. Load charter artifacts
5. Validate scope
```

| Priority | Checkpoint | Depth |
|----------|------------|-------|
| High | Create-Backlog, PRD | Full |
| Medium | Proposal, Enhancement | Summary |
| Low | Add-Story | Quick |

## Scope Validation
```
1. Extract concepts: title, problem, solution, features
2. Compare against: In Scope, Out of Scope, Current Focus
3. Result: ALIGNED | POSSIBLY MISALIGNED | CONFLICTS
```

| Category | Action |
|----------|--------|
| Aligned | Proceed |
| Possibly Misaligned | Ask confirmation |
| Conflicts | Flag, offer resolution |

## Resolution Options
1. **Expand scope** → Update Scope-Boundaries.md, sync CHARTER.md
2. **Defer** → Note "Deferred - out of scope"
3. **Proceed anyway** → Log warning, continue
4. **Revise** → Modify work to fit scope

## /prepare-release Gate
Validates all release issues against charter. Advisory only—user decides.

## Token Budget
| Priority | Load | Tokens |
|----------|------|--------|
| High | CHARTER + Scope | ~600-1,000 |
| Medium | CHARTER only | ~150-200 |
| Low | CHARTER sections | ~100-150 |

## Opt-Out
- Per-session: "Skip charter validation"
- Permanent: Create `.no-charter-enforcement` file

**End of Charter Enforcement**
