# IDPF-PRD Framework

**Version:** v0.2.0
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

---

## Overview
Pre-development phase: transforms ideas into implementation-ready requirements.

## Workflow Phases
```
Discovery → Elicitation → Specification → Generation
```

### Phase 1: Discovery
- Domain Analysis (industry, compliance, patterns)
- Stakeholder Mapping (primary, secondary, sponsors)
- Vision & Goals (problem, metrics, success criteria)

### Phase 2: Elicitation
- Functional Requirements (features, workflows, integrations)
- Non-Functional Requirements (performance, security, reliability, usability)
- Constraints & Risks (budget, deadline, technology)

### Phase 3: Specification
- Requirement Detailing (REQ-XXX format with description, rationale, priority)
- Acceptance Criteria (happy path, errors, edge cases)
- Testing Approach (TDD required, ATDD/BDD optional)

### Phase 4: Generation
- Template Selection (auto by framework or manual)
- PRD Assembly
- Framework Handoff

## Template Selection
| Framework | Auto-Template |
|-----------|---------------|
| IDPF-Structured | PRD-Structured-Moderate |
| IDPF-Agile | PRD-Agile-Lightweight |

## Commands
| Command | Purpose |
|---------|---------|
| `PRD-Start` | Begin session |
| `PRD-Status` | Show progress |
| `PRD-Next` | Move to next activity |
| `Generate-PRD` | Assemble document |
| `Reverse-PRD-Start` | Extract from existing code |
| `List-NFRs` | Show NFR catalog |

## PRD Status Flow
Draft → Ready → Backlog Created → In Progress → Complete (→ PRD/Implemented/)

## Framework Handoff
**To IDPF-Structured:** REQ-IDs, acceptance criteria, TDD ready
**To IDPF-Agile:** Features→Epics, Capabilities→Stories, TDD ready

## Reverse-PRD Workflow
```
Analyze (structure, tech, architecture) → Extract (tests, APIs, NFRs) → Refine (user validation) → Generate
```
Uses `extract-prd` Skill for code analysis.

---

**End of Framework**
