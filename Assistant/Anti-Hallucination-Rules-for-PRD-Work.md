# Anti-Hallucination Rules for PRD Work
**Version:** 0.17.0

## Core Principle
**Stakeholder truth over helpful invention. Traceability over assumption. Validation over completion.**

---

## Information Source Hierarchy
1. **Stakeholder statements** (absolute authority) - Direct quotes, written feedback, meeting notes
2. **Existing artifacts** - Codebase, tests, API docs, schemas (for extract-prd)
3. **Domain standards** - Regulations (HIPAA, PCI-DSS, GDPR), compliance
4. **Logical inference** (with caveats) - Flag as inference, validate with stakeholder

---

## NEVER Invent
- Requirements not stated by stakeholders
- User stories without evidence
- Acceptance criteria beyond traceable
- NFRs without code evidence/stakeholder input
- Priority levels without confirmation
- Success metrics not discussed
- Personas from imagination
- Timeline estimates without team input

## NEVER Assume
- What stakeholders "probably meant"
- Requirements are complete
- User needs beyond stated
- Priority because it "seems important"
- Technical feasibility without verification
- Scope includes unstated features

---

## Source Attribution
**Every requirement MUST have a source:**
```markdown
REQ-001: User can reset password via email
Source: Stakeholder interview 2025-01-15, Sarah Chen
"Users frequently forget passwords and need a self-service option"
```

| Source Type | Confidence | Action |
|-------------|------------|--------|
| Direct stakeholder quote | High | Document verbatim |
| Written feedback | High | Reference document |
| Inferred from code/tests | Medium | Flag, confirm |
| Industry standard | Medium | Cite, confirm applicability |
| Assistant suggestion | Low | Flag, require validation |

---

## Scope Rules
**In-Scope:** Only features stakeholders explicitly requested
**Out-of-Scope:** Must document explicitly excluded items
**Scope Creep:** Flag when tempted to add "expected" features

---

## Priority Rules
**Never assign without stakeholder input:**
| Priority | Requires |
|----------|----------|
| Must Have | "required", "must", "critical" |
| Should Have | "important", "should", "want" |
| Could Have | "nice to have", "if possible" |
| Won't Have | Explicitly excluded |

---

## NFR Rules
**Code-Inferred (extract-prd):** Flag confidence, cite evidence
**Stakeholder-Stated:** Quote exact targets
**Never Invent Targets:** Ask for uptime, response time requirements

---

## Acceptance Criteria
- Derive only from stated requirements
- Flag implied criteria for confirmation
- Must be testable, specific, traceable

---

## extract-prd Rules
| Extraction | Minimum Evidence |
|------------|------------------|
| Feature exists | Test file + passing assertions |
| NFR implemented | Code pattern in multiple locations |
| API endpoint | Route definition + handler |
| Data model | Schema/migration + usage |

**Never Over-State:** Document confidence level honestly

---

## Elicitation Rules
- Record, don't interpret
- Clarify ambiguity immediately ("fast" → what response time?)
- Don't fill gaps silently - ask

---

## Checklists
**PRD Completion:**
- [ ] Every requirement has documented source
- [ ] No invented requirements
- [ ] All priorities assigned by stakeholders
- [ ] NFR targets from stakeholders/code evidence
- [ ] AC derives from stated requirements only
- [ ] Scope boundaries explicit
- [ ] Ambiguous terms clarified
- [ ] Assumptions flagged for validation

**extract-prd Completion:**
- [ ] Features traced to code/test evidence
- [ ] Confidence levels accurate
- [ ] Inferred requirements flagged
- [ ] NFRs sourced to code patterns
- [ ] Gaps noted
- [ ] Output marked as draft

---

**End of Anti-Hallucination Rules for PRD Work**
