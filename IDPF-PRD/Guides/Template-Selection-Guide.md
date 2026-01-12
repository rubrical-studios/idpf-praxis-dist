# Template Selection Guide
**Version:** v0.23.3

**Purpose:** Help select the appropriate PRD template based on project characteristics.

---

## Available Templates

| Template | Best For | Formality | Typical Projects |
|----------|----------|-----------|------------------|
| **PRD-Agile-Comprehensive** | Large, formal projects | High | Enterprise, regulated |
| **PRD-Agile-Lightweight** | Standard and iterative projects | Low-Medium | Most development, startups |

---

## Decision Tree

```
Start Here
    │
    ▼
Are requirements well-defined?
    │
    ├─ YES ──► Is this a regulated/enterprise project?
    │              │
    │              ├─ YES ──► PRD-Agile-Comprehensive
    │              │
    │              └─ NO ───► PRD-Agile-Lightweight
    │
    └─ NO ───► Is there uncertainty about scope?
                   │
                   ├─ HIGH ──► Consider IDPF-Vibe first
                   │           (PRD later if needed)
                   │
                   └─ LOW ───► PRD-Agile-Lightweight
```

---

## Template Comparison

### PRD-Agile-Comprehensive

**Use When:**
- Regulatory compliance is required
- Multiple stakeholders need sign-off
- Project is large (6+ months)
- Detailed documentation is mandatory
- Contract/SOW requires detailed specs

**Contains:**
- Executive summary
- Complete stakeholder analysis
- Detailed functional requirements
- Comprehensive NFR specifications
- Full constraint and risk analysis
- Detailed acceptance criteria
- Traceability matrix
- Approval signatures
- Version history

**Typical Size:** 20-50+ pages

### PRD-Agile-Lightweight

**Use When:**
- Requirements will evolve during development
- Iterative, sprint-based delivery
- Need to start development quickly
- User feedback will shape features
- Startup or rapid prototyping
- Product-market fit exploration

**Contains:**
- Vision and goals
- Feature areas (Epics)
- Initial user stories
- Key success metrics
- High-level NFRs
- Definition of Done

**Typical Size:** 3-10 pages

---

## Selection Criteria Matrix

Rate each factor (1-5) to help determine template:

| Factor | 1 = Low | 5 = High | Your Score |
|--------|---------|----------|------------|
| Requirements stability | Evolving | Fixed | ___ |
| Regulatory requirements | None | Critical | ___ |
| Project duration | <1 month | >6 months | ___ |
| Team size | Solo | Large team | ___ |
| Stakeholder count | Few | Many | ___ |
| Documentation needs | Minimal | Extensive | ___ |
| Risk tolerance | High | Low | ___ |

**Scoring:**
- 7-20: PRD-Agile-Lightweight
- 21-35: PRD-Agile-Comprehensive

---

## Template Contents Comparison

| Section | Comprehensive | Lightweight |
|---------|---------------|-------------|
| Executive Summary | ✅ Detailed | ❌ |
| Stakeholder Analysis | ✅ Full RACI | ✅ Brief |
| Functional Requirements | ✅ Features/Stories | ✅ Features/Stories |
| NFRs | ✅ Comprehensive | ✅ High-level |
| Constraints | ✅ Full analysis | ✅ Key only |
| Risks | ✅ Risk register | ❌ |
| Acceptance Criteria | ✅ Per story | ✅ Per story |
| Traceability | ✅ Full matrix | ❌ |
| Approvals | ✅ Formal sign-off | ❌ |
| Version Control | ✅ Detailed | ✅ Basic |

---

## Framework Compatibility

| Template | Target Framework |
|----------|------------------|
| Comprehensive | IDPF-Agile |
| Lightweight | IDPF-Agile |

---

## Template Usage Notes

### Comprehensive Template

Best for projects requiring formal documentation:
1. Full stakeholder analysis with RACI
2. Detailed NFRs with specific targets
3. Comprehensive constraint analysis
4. Full traceability matrix
5. Formal approval section

### Lightweight Template

Best for most development projects:
1. Focus on features and user stories
2. High-level NFRs
3. Key constraints only
4. Quick to create and iterate

---

## Special Cases

### When to Skip PRD Entirely

**Use IDPF-Vibe when:**
- Exploring a completely new idea
- Don't know what to build yet
- Proof of concept needed first
- Learning a new technology
- Personal project with no requirements

### When to Start Lightweight and Grow

Consider starting with Agile-Lightweight and expanding if:
- Time pressure to start development
- Requirements likely to change significantly
- Stakeholder availability is limited
- Need to prove concept before full spec

---

## Checklist for Template Selection

- [ ] Assessed requirements stability
- [ ] Identified regulatory requirements
- [ ] Estimated project duration
- [ ] Counted stakeholders
- [ ] Evaluated documentation needs
- [ ] Considered team size
- [ ] Selected appropriate template
- [ ] Confirmed with stakeholders

---

*Guide from IDPF-PRD Framework*
