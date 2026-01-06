---
version: "v0.22.0"
description: View, create, or manage project charter
argument-hint: "[update|refresh|validate]"
---

# /charter
**Source:** Templates/commands/charter.md

Context-aware charter command. Shows summary if exists, starts creation if missing.

## Usage
| Command | Description |
|---------|-------------|
| `/charter` | Show charter summary (if exists) or start creation (if missing) |
| `/charter update` | Update specific charter sections |
| `/charter refresh` | Re-extract from code, merge with existing |
| `/charter validate` | Check current work against charter scope |

## Template Detection
Regex: `/{[a-z][a-z0-9-]*}/`
| Pattern | Context |
|---------|---------|
| `{project-name}` | Title line |
| `{date}` | Last Updated field |
| `{language}` | Tech Stack table |
| `{framework}` | Tech Stack table |
| `{database}` | Tech Stack table |

| Scenario | Handling |
|----------|----------|
| ANY placeholder present | Treat as template |
| Literal braces in content | Regex avoids false positives |
| Empty sections, no placeholders | Treat as complete |

## Workflow

### /charter (No Arguments)

**Step 1:** Check for charter (`test -f CHARTER.md`)

**Step 2:** If exists, check for template placeholders
- If TEMPLATE (has placeholders): Proceed to Step 3 (Extraction/Inception)
- If COMPLETE (no placeholders): Display summary, mention update/validate options

**Step 3:** If no charter OR template detected
1. Check if codebase has existing code
2. If has code → Offer extraction mode
3. If empty → Offer inception mode
4. Present options: Create now / Skip for now / Never ask again

### Inception Mode (New Projects)

#### Essential Questions (Always Asked)
| # | Question | Maps To |
|---|----------|---------|
| 1 | What are you building? (1-2 sentences) | CHARTER.md Vision |
| 2 | What problem does it solve? | Inception/Charter-Details.md Problem Statement |
| 3 | What technology/language? | CHARTER.md Tech Stack |
| 4 | What's in scope for v1? (3-5 items) | CHARTER.md In Scope |

#### Complexity-Triggered Questions
| Trigger | Follow-Up Questions | Maps To |
|---------|---------------------|---------|
| Web app | "Will users need to log in?" / "What data stored?" | Constraints, Architecture |
| API service | "Who consumes this API?" / "Rate limiting?" | Charter-Details, Constraints |
| Multi-user | "What access levels?" / "How permissions managed?" | Constraints (Security) |
| Data handling | "Sensitive/personal data?" / "Compliance (GDPR, HIPAA)?" | Constraints (Compliance) |
| External integrations | "What external services?" / "Constraints from those?" | Tech-Stack, Constraints |

#### Dynamic Follow-Up Generation
| Answer Pattern | Dynamic Follow-Up |
|----------------|-------------------|
| Vague scope item | "What specifically happens with...?" |
| Implicit constraint | "Any specific requirements (response time, throughput)?" |
| Missing boundary | "Any size limits or restrictions?" |
| Unclear priority | "Is this core to v1 or nice-to-have?" |

| Project Complexity | Total Questions |
|--------------------|-----------------|
| Simple (CLI tool) | 4 essential only |
| Medium (web app, API) | 4-6 questions |
| Complex (multi-service, compliance) | 6-8 questions |

#### Artifact Generation
| Answer | Primary Artifact | Secondary Artifacts |
|--------|------------------|---------------------|
| What are you building? | CHARTER.md → Vision | Inception/Charter-Details.md |
| What problem? | Inception/Charter-Details.md → Problem Statement | CHARTER.md (context) |
| What technology? | CHARTER.md → Tech Stack | Inception/Tech-Stack.md |
| What's in scope? | CHARTER.md → In Scope | Inception/Scope-Boundaries.md |
| Auth requirements? | Inception/Constraints.md → Security | - |
| Data handling? | Inception/Constraints.md → Compliance | - |

**Generation Process:**
1. Collect all answers into structured data
2. Generate CHARTER.md using Templates/Lifecycle/CHARTER.md
3. Generate Inception/ artifacts
4. Create Construction/ directories
5. Create Transition/ directory with templates
6. Use "TBD" for sections without answers
7. Commit all artifacts in single commit

### /charter update
1. Read current charter and Charter-Details.md
2. **ASK USER** what to update (Vision, Focus, Tech Stack, Scope, Milestones)
3. Apply updates, sync if vision changes
4. Update Last Updated date, commit

### /charter refresh
1. Analyze codebase (manifest files, source structure, README, tests)
2. Compare with existing Inception/ artifacts
3. Present diff to user
4. Merge changes with confirmation

### /charter validate
1. Load CHARTER.md and Scope-Boundaries.md
2. Identify current work (issue, commits, staged changes)
3. Compare against in-scope/out-of-scope items
4. Report alignment status

## Token Budget
| Artifact | Loaded | Tokens |
|----------|--------|--------|
| `CHARTER.md` | Always for /charter | ~150-200 |
| `Inception/Charter-Details.md` | For update/validate | ~1,200-1,500 |
| `Inception/Scope-Boundaries.md` | For validate | ~500-800 |

---

**End of /charter Command**
