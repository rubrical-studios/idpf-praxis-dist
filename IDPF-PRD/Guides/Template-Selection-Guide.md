# Template Selection Guide
**Version:** v0.2.0

**Purpose:** Help select the appropriate PRD template based on project characteristics.

---

## Available Templates

| Template | Best For | Formality | Typical Projects |
|----------|----------|-----------|------------------|
| **PRD-Structured-Comprehensive** | Large, formal projects | High | Enterprise, regulated |
| **PRD-Structured-Moderate** | Standard projects | Medium | Most development |
| **PRD-Agile-Lightweight** | Iterative projects | Low | Startups, rapid delivery |

---

## Decision Tree

```
Start Here
    │
    ▼
Are requirements well-defined and stable?
    │
    ├─ YES ──► Is this a regulated/enterprise project?
    │              │
    │              ├─ YES ──► PRD-Structured-Comprehensive
    │              │
    │              └─ NO ───► PRD-Structured-Moderate
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

### PRD-Structured-Comprehensive

**Use When:**
- Requirements are fixed and well-understood
- Regulatory compliance is required
- Multiple stakeholders need sign-off
- Project is large (6+ months)
- Detailed documentation is mandatory
- Contract/SOW requires detailed specs

**Contains:**
- Executive summary
- Complete stakeholder analysis
- Detailed functional requirements (REQ-IDs)
- Comprehensive NFR specifications
- Full constraint and risk analysis
- Detailed acceptance criteria
- Traceability matrix
- Approval signatures
- Version history

**Typical Size:** 20-50+ pages

### PRD-Structured-Moderate

**Use When:**
- Requirements are reasonably stable
- Standard development project
- Internal stakeholders primarily
- Medium project size (1-6 months)
- Documentation needed but not excessive
- Solo developer or small team

**Contains:**
- Overview and goals
- Key stakeholders
- Core functional requirements
- Essential NFRs
- Major constraints
- Acceptance criteria
- Testing approach

**Typical Size:** 5-15 pages

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
- 7-15: PRD-Agile-Lightweight
- 16-25: PRD-Structured-Moderate
- 26-35: PRD-Structured-Comprehensive

---

## Template Contents Comparison

| Section | Comprehensive | Moderate | Lightweight |
|---------|---------------|----------|-------------|
| Executive Summary | ✅ Detailed | ✅ Brief | ❌ |
| Stakeholder Analysis | ✅ Full RACI | ✅ Key roles | ✅ Brief |
| Functional Requirements | ✅ REQ-IDs | ✅ REQ-IDs | ✅ Features/Stories |
| NFRs | ✅ Comprehensive | ✅ Key NFRs | ✅ High-level |
| Constraints | ✅ Full analysis | ✅ Major only | ✅ Key only |
| Risks | ✅ Risk register | ✅ Major risks | ❌ |
| Acceptance Criteria | ✅ Per requirement | ✅ Per requirement | ✅ Per story |
| Traceability | ✅ Full matrix | ❌ | ❌ |
| Approvals | ✅ Formal sign-off | ✅ Simple | ❌ |
| Version Control | ✅ Detailed | ✅ Basic | ✅ Basic |

---

## Framework Compatibility

| Template | Primary Framework | Can Also Use |
|----------|-------------------|--------------|
| Comprehensive | IDPF-Structured | IDPF-Agile (with backlog conversion) |
| Moderate | IDPF-Structured | IDPF-Agile (with backlog conversion) |
| Lightweight | IDPF-Agile | IDPF-Structured (with formalization) |

---

## Conversion Notes

### Comprehensive/Moderate → Agile

If starting with Structured template but moving to Agile:
1. Group requirements into Epics (feature areas)
2. Convert REQ-IDs to User Stories
3. Move acceptance criteria to story level
4. Create Product Backlog from requirements
5. Prioritize for Sprint 0 planning

### Lightweight → Structured

If starting with Agile template but need more formality:
1. Assign REQ-IDs to features/stories
2. Expand NFRs with specific targets
3. Add constraint analysis
4. Create traceability matrix
5. Add formal approval section

---

## Special Cases

### When to Skip PRD Entirely

**Use IDPF-Vibe when:**
- Exploring a completely new idea
- Don't know what to build yet
- Proof of concept needed first
- Learning a new technology
- Personal project with no requirements

**Use IDPF-LTS when:**
- Maintaining existing system
- Bug fixes only
- No new features planned
- System in maintenance mode

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
