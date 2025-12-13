# IDPF-PRD Framework
**Revision:** 4
**Framework-Debug:** True
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

## Overview
Pre-development phase transforming ideas into implementation-ready requirements through guided elicitation.
**Output:** PRD documents for IDPF-Structured or IDPF-Agile.

## PRD Lifecycle
| Status | Location | Description |
|--------|----------|-------------|
| Draft | `PRD/` | Being written |
| Ready | `PRD/` | Phases complete |
| Backlog Created | `PRD/` | Issues created (Agile) |
| In Progress | `PRD/` | Development underway |
| Complete | `PRD/Implemented/` | All requirements done |

**Completion:** When all stories/requirements Done → Update status → `git mv PRD/PRD-[Name].md PRD/Implemented/`

## Terminology
- **ASSISTANT**: AI assistant guiding PRD process
- **User**: Developer/product owner providing requirements
- **PRD**: Product Requirements Document
- **NFR**: Non-Functional Requirement (performance, security, reliability)
- **Stakeholder**: Anyone with interest in product outcome

## Workflow Phases
**Phase 1: Discovery** → Domain Analysis → Stakeholder Mapping → Vision & Goals
**Phase 2: Elicitation** → Functional Reqs → NFRs → Constraints & Risks
**Phase 3: Specification** → Requirement Detailing → Acceptance Criteria → Testing Approach
**Phase 4: Generation** → Template Selection → PRD Assembly → Framework Handoff

## Session Initialization
1. Load Anti-Hallucination Rules
2. Declare Framework Revision
3. Display Commands
4. Begin Discovery (Phase 1)

**Critical:** Never invent requirements—only document what stakeholders state or code evidence supports.

## Phase 1: Discovery
**Domain Analysis:** Industry, compliance (HIPAA, PCI-DSS, GDPR), similar products, terminology, patterns
**Stakeholders:** Primary users, secondary users, sponsors, technical authority, approvers
**Vision:** Problem solved, one-sentence vision, top 3 metrics, 6-month/1-year success

## Phase 2: Elicitation
**Functional:** Core features, user tasks, workflows, inputs, outputs, integrations
**NFRs:** Performance (response time, concurrency), Security (auth, encryption), Reliability (availability, backup), Usability (accessibility, browsers)
**Constraints:** Budget, deadline, technology, team skills, infrastructure, legacy integration

## Phase 3: Specification
**Requirement Format:**
```
REQ-XXX: [Title]
├── Description, Rationale, Priority, Dependencies
├── Acceptance Criteria: AC-1, AC-2, AC-3
├── NFR Links, Testing Approach
```

**Testing Selection:** TDD (required all), ATDD (formal acceptance), BDD (stakeholder collaboration)

## Phase 4: Generation
**Template Selection:**
- IDPF-Structured declared → PRD-Structured-Moderate (override with "Use-Template Comprehensive")
- IDPF-Agile declared → PRD-Agile-Lightweight
- No framework → Use decision tree

**Handoff:**
- **To Structured:** REQ-IDs, acceptance criteria, NFRs, TDD ready
- **To Agile:** Features → Epics, Capabilities → Stories, TDD required

## PRD Commands
**Navigation:** PRD-Start, PRD-Status, PRD-Next, PRD-Back, PRD-Skip
**Phase:** Discovery-Complete, Elicitation-Complete, Specification-Complete, Generate-PRD
**Utility:** List-NFRs, Suggest-NFRs, List-Constraints, Show-Template, Use-Template [name], Review-Worksheet
**Export:** Export-Discovery, Export-Elicitation, Export-Specification, Export-PRD

## NFR Categories
| Category | Examples |
|----------|----------|
| Performance | Response time, throughput, concurrent users |
| Security | Authentication, authorization, encryption |
| Reliability | Availability, fault tolerance, backup |
| Usability | Accessibility, responsiveness |
| Scalability | Horizontal/vertical scaling |
| Compliance | HIPAA, PCI-DSS, GDPR, SOC 2 |

## Domain Patterns
| Domain | Common NFRs | Integrations |
|--------|-------------|--------------|
| E-commerce | PCI-DSS, 99.9% uptime | Payment gateways |
| Healthcare | HIPAA, audit logging | EHR systems |
| Finance | SOX, transaction atomicity | Banking APIs |
| SaaS | Multi-tenancy, 99.9% SLA | Identity, billing |

## Supporting Resources
**Templates:** Discovery-Worksheet, Elicitation-Worksheet, Specification-Worksheet, Generation-Checklist
**Guides:** Domain-Analysis-Guide, NFR-Catalog, Stakeholder-Mapping-Guide, Template-Selection-Guide
**Checklists:** Discovery, Elicitation, Specification, PRD-Readiness

## Reverse-PRD: Extraction from Existing Code
Extract PRD from existing codebases without documentation.

**When to use:** Legacy without docs, undocumented projects, onboarding, pre-LTS baseline

**Phases:**
- **R1 Analyze:** Structure scan, tech stack detection, architecture inference
- **R2 Extract:** Parse tests → features; Parse APIs → endpoints; Detect NFRs
- **R3 Refine:** User validates, adds context, assigns priorities
- **R4 Generate:** Standard Generation phase

**Commands:** Reverse-PRD-Start, Reverse-PRD-Analyze, Reverse-PRD-Extract, Reverse-PRD-Refine, Reverse-PRD-Status

**Confidence:** High (multiple sources), Medium (single source), Low (indirect evidence)

**Limitations:** Cannot understand intent, missing business context, best for Python/JS/Java/Ruby

---
**End of Framework**
