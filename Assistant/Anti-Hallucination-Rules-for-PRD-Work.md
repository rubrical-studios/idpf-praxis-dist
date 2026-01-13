# Anti-Hallucination Rules for PRD Work
**Version:** v0.24.1

## Core Principle
**Stakeholder truth over helpful invention. Traceability over assumption. Validation over completion.**

---

## Information Source Hierarchy
1. **Stakeholder statements** (absolute authority)
2. **Existing artifacts** (documented evidence)
3. **Domain standards** (external reference)
4. **Logical inference** (must be flagged, validated)

---

## NEVER Invent:
- ❌ Requirements not stated by stakeholders
- ❌ User stories without evidence
- ❌ Acceptance criteria beyond testable/traceable
- ❌ NFRs without code evidence or stakeholder input
- ❌ Priority levels without confirmation
- ❌ Success metrics not discussed
- ❌ Personas from imagination
- ❌ User journeys without research
- ❌ Technical constraints not verified
- ❌ Timeline estimates without team input

## NEVER Assume:
- ❌ What stakeholders "probably meant"
- ❌ Requirements are complete
- ❌ User needs beyond stated
- ❌ Priority because it "seems important"
- ❌ Technical feasibility
- ❌ Scope includes unstated features

---

## STOP Boundary Enforcement
When command includes `## STOP — Workflow Boundary`:
1. **STOP means STOP** - Execution must halt
2. **No "helpful continuation"** - Don't proceed even if logical
3. **User instruction required** - Only explicit instruction authorizes crossing
4. **Re-verify after context loss** - Re-read command specs after compaction

---

## Requirement Source Attribution
Every requirement MUST have a source:
```markdown
REQ-001: User can reset password via email
Source: Stakeholder interview 2025-01-15, Sarah Chen
```

| Source Type | Confidence | Action |
|-------------|------------|--------|
| Direct stakeholder quote | High | Document verbatim |
| Written feedback | High | Reference document |
| Inferred from code | Medium | Flag, confirm |
| Industry standard | Medium | Cite, confirm applicability |
| Assistant suggestion | Low | Flag, require validation |

---

## Scope Boundary Rules
**In-Scope:** Only explicitly requested features
**Out-of-Scope:** Document excluded items with reason

When tempted to add features "users will expect":
→ "This wasn't explicitly discussed. Should I add [X] or confirm with stakeholders first?"

---

## Priority Assignment Rules
NEVER assign priority without stakeholder input.
| Priority | Requires |
|----------|----------|
| Must Have | Stakeholder said "required", "must", "critical" |
| Should Have | Stakeholder said "important", "should", "want" |
| Could Have | Stakeholder said "nice to have", "if possible" |
| Won't Have | Stakeholder explicitly excluded |

---

## NFR Rules
- Code-inferred: Flag as "Inferred from code - confirm"
- Stakeholder-stated: Quote exactly, don't change values
- Never invent NFR targets

---

## Acceptance Criteria Rules
- Derive ONLY from stated requirements
- Flag implied criteria as "Needs validation"
- Must be verifiable, specific, traceable

---

## extract-prd Specific Rules
| Extraction | Minimum Evidence |
|------------|------------------|
| Feature exists | Test file + passing assertions |
| NFR implemented | Code pattern in multiple locations |
| API endpoint | Route definition + handler |
| Data model | Schema/migration + usage |

Never over-state code evidence.

---

## Elicitation Session Rules
- **Record, don't interpret** - Quote verbatim
- **Clarify ambiguity immediately** - Ask about vague terms
- **Don't fill gaps silently** - Ask before adding

| Vague Term | Required Clarification |
|------------|----------------------|
| "Fast" | Response time in seconds? |
| "Secure" | Specific security requirements? |
| "Easy to use" | What actions simplified? |
| "Reliable" | Uptime percentage? Recovery time? |
| "Scalable" | How many users? Data volume? |

---

## Self-Checking Checklists

### PRD Completion
- [ ] Every requirement has documented source
- [ ] No invented requirements
- [ ] All priorities assigned by stakeholders
- [ ] NFR targets from stakeholders or code
- [ ] Acceptance criteria from stated requirements only
- [ ] Scope boundaries defined (in/out)
- [ ] Ambiguous terms clarified
- [ ] Assumptions flagged for validation

### extract-prd Completion
- [ ] All features traced to code/test evidence
- [ ] Confidence levels accurate
- [ ] Inferred requirements flagged
- [ ] NFRs sourced to code patterns
- [ ] Gaps noted
- [ ] Output marked as draft

---

## Diagram Generation Rules

### NEVER Invent:
- ❌ Actors not in PRD user stories
- ❌ States not derived from acceptance criteria
- ❌ Components not in technical notes
- ❌ API calls not documented
- ❌ Relationships not stated

### ALWAYS Verify:
- ✓ Every actor appears in "As a..." clause
- ✓ Every state maps to acceptance criterion
- ✓ Every sequence traces to documented behavior
- ✓ Every component in Technical Notes

### Traceability Requirement
Each diagram element MUST cite source:
```
Actor: "Framework Maintainer" (Story 1.1, 2.1)
Use Case: "Create Branch" (Story 1.1)
Activity Step: "Validate" (Story 1.1, AC-1)
```

### When Evidence Insufficient
Skip diagram or flag elements as [TBD - needs validation].

---

## Final Reminder
**Invented requirements build the wrong product.**
1. **Stop** - Is this from stakeholder or imagination?
2. **Source** - Can you cite where this came from?
3. **Flag** - If inferred, mark clearly
4. **Validate** - Get stakeholder confirmation

---

**End of Anti-Hallucination Rules for PRD Work**
