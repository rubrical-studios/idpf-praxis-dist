# IDPF-PRD Framework
**Version:** 0.17.0
**Source:** IDPF-PRD/IDPF-PRD.md
**Framework-Debug:** True
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

---

## Overview
IDPF-PRD transforms ideas into implementation-ready requirements through guided AI-assisted elicitation.
**Purpose:** Generate PRD documents for IDPF-Agile development.

---

## Terminology
1. **ASSISTANT**: AI assistant (Claude)
2. **User**: Human developer/product owner
3. **PRD**: Product Requirements Document
4. **NFR**: Non-Functional Requirement
5. **Session**: Conversation for one project's requirements

---

## Workflow Phases
```
Phase 1: Discovery -> Domain Analysis, Stakeholder Mapping, Vision & Goals
Phase 2: Elicitation -> Functional Reqs, Non-Functional Reqs, Constraints & Risks
Phase 3: Specification -> Requirement Detailing, Acceptance Criteria, Testing Approach
Phase 4: Generation -> Template Selection, PRD Assembly, Framework Handoff
```

---

## Session Initialization
1. Load Anti-Hallucination Rules
2. Declare Framework Revision
3. Display Commands
4. Begin Discovery
5. Guide through phases

**Critical:** Never invent requirements - only document stakeholder statements or code evidence.

---

## Phase 1: Discovery

### Domain Analysis
- Industry/vertical, regulatory requirements (HIPAA, PCI-DSS, GDPR, SOC 2)
- Similar products, domain terminology, common patterns

### Stakeholder Mapping
- Primary/secondary users, sponsors, technical authority, approval chain

### Vision & Goals
- Problem solved, vision statement, success metrics, 6-month/1-year goals

**Output:** Discovery Worksheet

---

## Phase 2: Elicitation

### Functional Requirements
- Core features, user tasks, workflows, inputs/outputs, integrations

### NFR Questions
| Category | Questions |
|----------|-----------|
| Performance | Response time, concurrent users, throughput |
| Security | Authentication, authorization, encryption |
| Reliability | Availability (99.9%+), downtime, backup/recovery |
| Usability | Accessibility (WCAG), browsers/devices, locales |

### Constraints
- Budget, deadline, technology, team skills, infrastructure, legacy systems

**Output:** Elicitation Worksheet

---

## Phase 3: Specification

### Requirement Format
```
REQ-XXX: [Title]
├── Description
├── Rationale
├── Priority: [High/Medium/Low]
├── Dependencies
├── Acceptance Criteria (AC-1, AC-2, AC-3)
├── NFR Links
└── Testing Approach
```

### Testing Approach Selection
| Approach | Required | When |
|----------|----------|------|
| TDD | Yes | All development |
| ATDD | Optional | Formal acceptance, compliance |
| BDD | Optional | Stakeholder collaboration |

**Output:** Specification Worksheet

---

## Phase 4: Generation

### Template Selection
**Auto-Selection:**
| Framework | Template |
|-----------|----------|
| IDPF-Agile | PRD-Agile-Lightweight |

**Decision tree:** Regulated/enterprise -> Comprehensive, Standard -> Agile-Lightweight, Exploratory -> Skip PRD, use IDPF-Vibe

### Framework Handoff
**To IDPF-Agile:** Features -> Epics, Capabilities -> Stories, Success -> AC, NFRs -> DoD, then Backlog creation

**Output:** PRD-[ProjectName].md

---

## PRD Commands

### Navigation
| Command | Description |
|---------|-------------|
| PRD-Start | Begin new session |
| PRD-Status | Show phase and progress |
| PRD-Next | Move to next activity |
| PRD-Back | Return to previous |
| PRD-Skip | Skip current activity |

### Phase Completion
| Command | Description |
|---------|-------------|
| Discovery-Complete | Proceed to Elicitation |
| Elicitation-Complete | Proceed to Specification |
| Specification-Complete | Proceed to Generation |
| Generate-PRD | Assemble PRD document |

### Utility
| Command | Description |
|---------|-------------|
| List-NFRs | Show NFR catalog |
| Suggest-NFRs | Domain-specific suggestions |
| Use-Template [name] | Override template |
| Review-Worksheet | Display captured info |

---

## PRD Lifecycle

| Status | Location | Description |
|--------|----------|-------------|
| Draft | PRD/ | Being written |
| Ready | PRD/ | Ready for development |
| Backlog Created | PRD/ | Issues created from PRD |
| In Progress | PRD/ | Development underway |
| Complete | PRD/Implemented/ | All requirements done |

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

## Domain Patterns
| Domain | NFRs | Integrations |
|--------|------|--------------|
| E-commerce | PCI-DSS, 99.9% uptime | Payment, inventory |
| Healthcare | HIPAA, encryption | EHR, labs |
| Finance | SOX, transaction atomicity | Banking, reporting |
| SaaS | Multi-tenancy, 99.9% SLA | Identity, billing |

---

## Reverse-PRD: Extraction from Code

### When to Use
- Legacy codebase without documentation
- Compliance/audit requirement generation
- Onboarding to existing project

### Workflow
```
R1: Analyze -> Structure Scan, Tech Stack, Architecture
R2: Extract -> Test Parsing, API Extraction, NFR Detection
R3: Refine -> User Validation, Context Addition, Priority
R4: Generate -> Standard IDPF-PRD Generation
```

### Commands
| Command | Description |
|---------|-------------|
| Reverse-PRD-Start | Begin extraction |
| Reverse-PRD-Analyze | Run structure analysis |
| Reverse-PRD-Extract | Generate draft worksheets |
| Reverse-PRD-Refine | Interactive refinement |

**Skill:** `extract-prd`
**Limitation:** Extracts only explicit content; requires human refinement.

---

## Framework Transitions

**PRD -> IDPF-Agile:** Requirements defined, ready for development
**PRD -> Skip (IDPF-Vibe):** Exploratory, unknown scope

---

**End of Framework**
