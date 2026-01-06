# Anti-Hallucination Rules for PRD Work
**Version:** v0.22.0
**Source:** Assistant/Anti-Hallucination-Rules-for-PRD-Work.md

---

## Core Principle
**Stakeholder truth over helpful invention. Traceability over assumption. Validation over completion.**
PRD work requires rigorous accuracy because fabricated requirements lead to building the wrong product.

## Information Source Hierarchy
1. **Stakeholder statements** (absolute authority): Direct quotes, written feedback, meeting notes
2. **Existing artifacts** (documented evidence): Codebase, test files, API docs, schemas
3. **Domain standards** (external reference): Regulations (HIPAA, PCI-DSS, GDPR), compliance
4. **Logical inference** (with explicit caveats): Must be flagged and validated

## Absolute "Never Do" Rules
### NEVER Invent:
- Requirements not stated by stakeholders
- User stories without evidence of user need
- Acceptance criteria beyond what's testable/traceable
- NFRs without code evidence or stakeholder input
- Priority levels (MoSCoW) without stakeholder confirmation
- Success metrics, personas, user journeys without research
- Technical constraints or timeline estimates without verification

### NEVER Assume:
- What stakeholders "probably meant"
- Requirements are complete without asking
- User needs beyond what was stated
- Priority because it "seems important"
- Scope includes unstated features
- NFR targets without discussion

## Requirement Source Attribution
Every requirement MUST have a source:
```markdown
REQ-001: User can reset password via email
Source: Stakeholder interview 2025-01-15, Sarah Chen
"Users frequently forget passwords and need a self-service option"
```

| Source Type | Confidence | Action |
|-------------|------------|--------|
| Direct stakeholder quote | High | Document verbatim |
| Written stakeholder feedback | High | Reference document |
| Inferred from code/tests | Medium | Flag as "Inferred", confirm |
| Industry standard | Medium | Cite standard, confirm applicability |
| Assistant suggestion | Low | Flag as "Suggested", require validation |

## Scope Boundary Rules
- **In-Scope MUST Be Explicit:** Only include features stakeholders explicitly requested
- **Out-of-Scope MUST Be Documented:** Document what's excluded with rationale
- **Scope Creep Detection:** Flag when tempted to add features "users will expect" or "competitors have"

## Priority Assignment Rules
- **Never Assign Priority Without Stakeholder Input**
- **MoSCoW Requires Explicit Confirmation:**
  - Must Have: Stakeholder said "required", "must", "critical"
  - Should Have: Stakeholder said "important", "should", "want"
  - Could Have: Stakeholder said "nice to have", "if possible"
  - Won't Have: Stakeholder explicitly excluded

## NFR Rules
- Code-inferred NFRs must be flagged: "Status: [Inferred from code - confirm with stakeholders]"
- Never change stakeholder-stated NFR values
- Never invent NFR targets (e.g., "99.9% uptime" without discussion)

## Acceptance Criteria Rules
- Derive ONLY from stated requirements
- Flag implied AC: "Note: Error handling not explicitly discussed - confirm this AC"
- Every AC must be verifiable, specific, and traceable

## extract-prd Specific Rules
| Extraction | Minimum Evidence |
|------------|------------------|
| Feature exists | Test file + passing assertions |
| NFR implemented | Code pattern in multiple locations |
| API endpoint | Route definition + handler |
| Data model | Schema/migration + usage |

## Elicitation Session Rules
- **Record, Don't Interpret:** Capture exact stakeholder words
- **Clarify Ambiguity Immediately:** "Fast" → What response time? "Secure" → What requirements?
- **Don't Fill Gaps Silently:** Ask which approach when error handling wasn't discussed

## PRD Completion Checklist
- [ ] Every requirement has a documented source
- [ ] No requirements were invented without stakeholder input
- [ ] All priorities were assigned by stakeholders
- [ ] NFR targets came from stakeholders or code evidence
- [ ] Acceptance criteria derive from stated requirements only
- [ ] Scope boundaries explicitly defined (in/out)
- [ ] Assumptions are documented and flagged for validation

## When This Ruleset Applies
- Using IDPF-PRD framework for requirements gathering
- PRD-Analyst domain specialist is active
- Running extract-prd skill on existing code
- Creating or reviewing PRD documents

## Final Reminder
**Invented requirements build the wrong product.** When tempted to "help" by adding requirements:
1. **Stop** - Is this from a stakeholder or your imagination?
2. **Source** - Can you cite where this came from?
3. **Flag** - If inferred, mark it clearly
4. **Validate** - Get stakeholder confirmation before finalizing

---

**End of Anti-Hallucination Rules for PRD Work**
