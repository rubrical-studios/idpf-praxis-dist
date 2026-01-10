# IDPF-PRD Framework
**Version:** v0.23.0
**Status:** Deprecated
> **DEPRECATED:** Superseded by **`promote-to-prd`** skill. 4-phase workflow too heavyweight; static worksheets replaced by dynamic AI-generated questions; Inception/ artifacts provide strategic context. See Issue #643.

**Framework-Debug:** True
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

## Overview
IDPF-PRD (Product Requirements Document) transforms ideas into implementation-ready requirements through guided, AI-assisted elicitation. Generates comprehensive PRD documents for IDPF-Agile.

## Terminology
| Term | Definition |
|------|------------|
| **PRD** | Product Requirements Document |
| **NFR** | Non-Functional Requirement |
| **Stakeholder** | Anyone with interest in product outcome |
| **Session** | Conversation for one project's requirements |

## Workflow Phases
```
Phase 1: Discovery    → Domain Analysis, Stakeholder Mapping, Vision & Goals
Phase 2: Elicitation  → Functional Reqs, Non-Functional Reqs, Constraints & Risks
Phase 3: Specification→ Requirement Detailing, Acceptance Criteria, Testing Approach
Phase 4: Generation   → Template Selection, PRD Assembly, Framework Handoff
```

## Session Initialization
1. Load `Assistant/Anti-Hallucination-Rules-for-PRD-Work.md`
2. Declare Framework (IDPF-PRD)
3. Display Commands
4. Begin Discovery
5. Guide through phases systematically

**Critical:** Never invent requirements - only document what stakeholders state or code evidence supports.

## Phase 1: Discovery
| Activity | Purpose | Outputs |
|----------|---------|---------|
| Domain Analysis | Industry, compliance, patterns | Domain profile |
| Stakeholder Mapping | All stakeholders and needs | Stakeholder registry |
| Vision & Goals | Product vision, success metrics | Vision statement, KPIs |

## Phase 2: Elicitation
| Activity | Purpose | Outputs |
|----------|---------|---------|
| Functional Requirements | What system must do | Feature list, use cases |
| Non-Functional Requirements | Quality attributes | NFR specifications |
| Constraints & Risks | Limitations and risks | Constraint catalog, risk register |

## Phase 3: Specification
Requirement format:
```
REQ-XXX: [Title]
├── Description, Rationale, Priority, Dependencies
├── Acceptance Criteria (AC-1, AC-2, AC-3)
├── NFR Links
└── Testing Approach: TDD + ATDD/BDD if applicable
```

| Approach | Required | When to Use |
|----------|----------|-------------|
| **TDD** | Yes | All development |
| **ATDD** | Optional | Formal acceptance criteria |
| **BDD** | Optional | Stakeholder collaboration |

## Phase 4: Generation
**Auto-Selection:** IDPF-Agile uses PRD-Agile-Lightweight template
**Override:** "Use-Template [Comprehensive/Moderate/Agile-Lightweight]"

**Framework Handoff to IDPF-Agile:**
- Feature areas → Epics
- Capabilities → User Stories
- Success criteria → Acceptance Criteria
- NFRs inform Definition of Done
- Ready for Backlog creation, Sprint 0 planning

## PRD Commands
| Command | Description |
|---------|-------------|
| "PRD-Start" | Begin new session |
| "PRD-Status" | Show phase and progress |
| "PRD-Next" / "PRD-Back" / "PRD-Skip" | Navigate |
| "Discovery-Complete" | Proceed to Elicitation |
| "Elicitation-Complete" | Proceed to Specification |
| "Specification-Complete" | Proceed to Generation |
| "Generate-PRD" | Assemble document |
| "Use-Template [name]" | Override template |
| "Export-PRD" | Export final document |

## PRD Lifecycle
| Status | Location | Description |
|--------|----------|-------------|
| Draft | `PRD/` | Phases incomplete |
| Ready | `PRD/` | Ready for development |
| Backlog Created | `PRD/` | GitHub issues created |
| In Progress | `PRD/` | Development underway |
| Complete | `PRD/Implemented/` | All requirements implemented |

## NFR Categories
Performance, Security, Reliability, Usability, Scalability, Maintainability, Portability, Compliance (HIPAA, PCI-DSS, GDPR, SOC 2, SOX)

## Reverse-PRD: Extraction from Existing Code
**When to Use:** Legacy codebase without documentation, compliance/audit needs

**Phases:**
```
R1: Analyze → Structure Scan, Tech Stack Detection, Architecture Inference
R2: Extract → Test Parsing, API Extraction, NFR Detection
R3: Refine  → User Validation, Context Addition, Priority Assignment
R4: Generate→ Standard IDPF-PRD Generation
```

| Command | Description |
|---------|-------------|
| "Reverse-PRD-Start" | Begin extraction |
| "Reverse-PRD-Analyze" | Run structure analysis |
| "Reverse-PRD-Extract" | Generate draft worksheets |
| "Reverse-PRD-Refine" | Interactive refinement |

**Confidence Levels:** High (multiple sources), Medium (single source), Low (indirect evidence)
**Limitations:** Cannot understand intent, missing business context, best for Python/JS/Java/Ruby

**End of Framework**
