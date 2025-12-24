# Anti-Hallucination Rules for PRD Work
**Version:** v0.2.0

---

**Core Principle:** Stakeholder truth over helpful invention. Traceability over assumption. Validation over completion.

## Information Source Hierarchy
1. **Stakeholder statements** (absolute authority) - Direct quotes, feedback, meeting notes
2. **Existing artifacts** - Codebase, test files, API docs, schemas
3. **Domain standards** - HIPAA, PCI-DSS, GDPR, best practices
4. **Logical inference** (with explicit caveats) - Flag, validate, don't state as fact

## Absolute Rules

### NEVER Invent:
- ❌ Requirements not stated by stakeholders
- ❌ User stories without evidence
- ❌ NFRs without code evidence or stakeholder input
- ❌ Priority levels without stakeholder confirmation
- ❌ Technical constraints not verified with team

### NEVER Assume:
- ❌ What stakeholders "probably meant"
- ❌ Requirements are complete without asking
- ❌ Priority because it "seems important"
- ❌ NFR targets without discussion

## Requirement Source Attribution

**Every requirement MUST have a source:**
```markdown
REQ-001: User can reset password via email
Source: Stakeholder interview 2025-01-15, Sarah Chen
```

| Source Type | Confidence | Action |
|-------------|------------|--------|
| Direct stakeholder quote | High | Document verbatim |
| Written feedback | High | Reference document |
| Inferred from code/tests | Medium | Flag, confirm |
| Assistant suggestion | Low | Flag, require validation |

## Scope Rules
- **In-Scope:** Only explicitly requested features
- **Out-of-Scope:** Document when stakeholders exclude items
- **Scope Creep:** Flag additions with "This wasn't discussed. Should I add [X]?"

## Priority Rules
- Never assign priority without stakeholder input
- MoSCoW requires explicit stakeholder words ("required"→Must, "want"→Should, "nice to have"→Could)

## NFR Rules

**Code-Inferred (extract-prd):**
```markdown
NFR-SEC-001: Password hashing required
Source: Code pattern - bcrypt in auth.py:45
Status: [Inferred - confirm with stakeholders]
```

**Never invent NFR targets.** Ask: "Uptime requirement not discussed. What availability target?"

## Acceptance Criteria
- Derive only from stated requirements
- Flag implied AC: `[Derived] - confirm this AC`
- Every AC must be verifiable, specific, traceable

## extract-prd Rules

| Extraction | Minimum Evidence |
|------------|------------------|
| Feature exists | Test file + passing assertions |
| NFR implemented | Code pattern in multiple locations |
| API endpoint | Route definition + handler |

**Never over-state evidence:** "Found login (3 tests). Registration not found—confirm if needed."

## Elicitation Rules
- Record verbatim, don't interpret
- Clarify "fast"/"secure"/"easy to use" immediately
- Don't fill gaps silently—ask about error handling, etc.

## Self-Checking

**PRD Checklist:**
- [ ] Every requirement has documented source
- [ ] All priorities assigned by stakeholders
- [ ] NFR targets from stakeholders or code evidence
- [ ] Scope boundaries explicitly defined
- [ ] Assumptions flagged for validation

**extract-prd Checklist:**
- [ ] All features traced to code/test evidence
- [ ] Confidence levels accurate
- [ ] Gaps in coverage noted
- [ ] Output marked as draft

## Final Reminder
**Invented requirements build the wrong product.** Stop → Source → Flag → Validate.

---
**End of Anti-Hallucination Rules for PRD Work**
