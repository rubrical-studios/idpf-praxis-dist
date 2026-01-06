# IDPF-PRD Framework
**Version:** v0.22.0
**Source:** IDPF-PRD/IDPF-PRD.md
**Status:** Deprecated

> **DEPRECATED** - Superseded by `promote-to-prd` skill. 4-phase workflow too heavyweight; static worksheets replaced by dynamic AI questions; Inception/ artifacts provide context upfront.
> **Migration:** Use `Skills/promote-to-prd/SKILL.md`

**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

---

## Overview
IDPF-PRD is the pre-development phase. Transforms ideas into implementation-ready requirements through guided elicitation.
**Purpose:** Generate PRD documents feeding into IDPF-Agile.

---

## Terminology
| Term | Definition |
|------|------------|
| **PRD** | Product Requirements Document |
| **NFR** | Non-Functional Requirement |
| **Stakeholder** | Anyone with interest in outcome |
| **Session** | Single conversation for one project |

---

## Workflow Phases
```
Phase 1: Discovery (Domain Analysis → Stakeholder Mapping → Vision & Goals)
Phase 2: Elicitation (Functional → Non-Functional → Constraints & Risks)
Phase 3: Specification (Requirement Detailing → Acceptance Criteria → Testing Approach)
Phase 4: Generation (Template Selection → PRD Assembly → Framework Handoff)
```

---

## Phase 1: Discovery
**Activities:** Domain Analysis | Stakeholder Mapping | Vision & Goals

**Domain Questions:** Industry/vertical? Regulatory requirements? (HIPAA, PCI-DSS, GDPR, SOC 2) Similar products? Domain terminology?
**Stakeholder Questions:** Primary end users? Secondary users? Business sponsors? Technical authority? Approvers?
**Vision Questions:** Problem solved? One-sentence vision? Top 3 success metrics? 6-month/1-year success?

**Output:** Discovery Worksheet or session responses

---

## Phase 2: Elicitation
**Activities:** Functional Requirements | Non-Functional Requirements | Constraints & Risks

**Functional:** Core features? User tasks? Critical workflows? Inputs/outputs? Integrations?

**NFR Questions:**
- **Performance:** Response time? Concurrent users? Throughput?
- **Security:** Authentication? Authorization? Encryption?
- **Reliability:** Availability (99.9%)? Downtime? Backup/recovery?
- **Usability:** Accessibility (WCAG 2.1)? Browsers/devices? Languages?

**Constraints:** Budget? Deadline? Technology? Team skills? Infrastructure? Legacy systems?

---

## Phase 3: Specification
**Requirement Format:**
```
REQ-XXX: [Title]
├── Description: [What it does]
├── Rationale: [Why needed]
├── Priority: [High/Medium/Low]
├── Dependencies: [Related]
├── Acceptance Criteria: AC-1, AC-2, AC-3
└── Testing Approach: [TDD + ATDD/BDD if applicable]
```

**Testing Approach:**
| Approach | Required | When |
|----------|----------|------|
| TDD | Yes | All development |
| ATDD | Optional | Formal acceptance, compliance |
| BDD | Optional | Stakeholder collaboration |

---

## Phase 4: Generation
**Template Selection:** Standard project → Agile-Lightweight | Regulated/enterprise → Comprehensive | Exploratory → Skip PRD, use IDPF-Vibe

**Framework Handoff to IDPF-Agile:**
- Feature areas → Epics
- Capabilities → User Stories
- Success criteria → Acceptance Criteria
- NFRs → Definition of Done
- Ready for: Backlog creation, Sprint 0

---

## PRD Commands
**Navigation:** PRD-Start | PRD-Status | PRD-Next | PRD-Back | PRD-Skip
**Phase:** Discovery-Complete | Elicitation-Complete | Specification-Complete | Generate-PRD
**Utility:** List-NFRs | Suggest-NFRs | List-Constraints | Show-Template | Use-Template [name] | Review-Worksheet
**Output:** Export-Discovery | Export-Elicitation | Export-Specification | Export-PRD

---

## PRD Lifecycle
| Status | Location | Description |
|--------|----------|-------------|
| Draft | `PRD/` | Phases incomplete |
| Ready | `PRD/` | Complete, ready for dev |
| Backlog Created | `PRD/` | GitHub issues created |
| In Progress | `PRD/` | Development underway |
| Complete | `PRD/Implemented/` | All requirements implemented |

---

## NFR Categories
| Category | Examples |
|----------|----------|
| Performance | Response time, throughput, latency |
| Security | Auth, encryption, audit |
| Reliability | Availability, fault tolerance |
| Usability | Accessibility, learnability |
| Scalability | Horizontal/vertical scaling |
| Compliance | HIPAA, PCI-DSS, GDPR, SOC 2 |

---

## Reverse-PRD: Extraction from Existing Code
**Purpose:** Extract PRD from existing codebases without documentation.

**Phases:**
- R1 Analyze: Structure scan → Tech stack → Architecture inference
- R2 Extract: Test parsing → API extraction → NFR detection
- R3 Refine: User validation → Context addition → Priority assignment
- R4 Generate: Standard PRD generation

**Commands:** Reverse-PRD-Start | Reverse-PRD-Analyze | Reverse-PRD-Extract | Reverse-PRD-Refine | Reverse-PRD-Status

**Confidence Levels:** High (multiple sources) → Verify | Medium (single source) → Confirm | Low (indirect) → Validate carefully

**Limitations:** Cannot understand intent | Missing business context | Language coverage | False positives possible

---

**End of Framework**
