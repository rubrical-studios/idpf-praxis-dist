# Framework Overview
**Version:** 0.21.1
**Source:** Overview/Framework-Overview.md
**Purpose:** Comprehensive reference for AI assistants and framework development

---

## Core Principle
**System Instructions** = WHO (identity/expertise)
**Frameworks** = WHAT (process)
**Skills** = TOOLS (capabilities)
**Guidelines** = HOW WELL (quality)

---

## IDPF-PRD (Pre-Development)
**Location:** `IDPF-PRD/IDPF-PRD.md` | **Type:** Requirements Engineering

**Forward Path:** Discovery → Elicitation → Specification → Generation
**Reverse Path:** Analyze → Extract → Refine → Generate

**Commands:** PRD-Start, PRD-Status, PRD-Next, Generate-PRD, Reverse-PRD-Start
**Handoff:** PRD → Agile (Epics/Stories) | Skip → Vibe

---

## IDPF-Agile
**Location:** `IDPF-Agile/Agile-Driven Development Framework.md`
**Type:** Sprint-Based Development

**Workflow:** Backlog Creation → Sprint Planning → Story Development (TDD) → Review → Retrospective
**Commands:** Create-Backlog, Plan-Sprint, Start-Story, Story-Complete, Sprint-Status, Sprint-Retro

**When to Use:** Evolving requirements, iterative delivery, feature prioritization, velocity tracking

---

## IDPF-Vibe
**Location:** `IDPF-Vibe/` | **Core Rev:** 4.0 | **Type:** Exploratory → Agile Evolution

**Platforms:** Desktop, Mobile, Web, Game, Embedded, Newbie (7 variants)

**Phase 1 (Vibe):** Exploratory, no formal requirements
**Phase 2 (Evolution):** Ready-to-Structure → Evolve to Agile
**Phase 3 (Agile):** TDD with IDPF-Agile framework

**Commands:** Vibe-Start, Try-This, That-Works, Run-It, Ready-to-Structure

---

## Testing Frameworks

```
IDPF-Testing-Core (foundation)
├── IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
├── IDPF-Performance (k6, JMeter, Gatling, Locust)
├── IDPF-Security (OWASP ZAP, SAST/DAST, SCA)
├── IDPF-Accessibility (axe, Lighthouse, WCAG)
├── IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
└── IDPF-Contract-Testing (Pact, Spring Cloud Contract)
```

**Separate repos** use Testing frameworks; **Embedded tests** use Agile

---

## System Instructions

**Architecture:** Core + Domain Specialization
- **Core-Developer-Instructions.md:** Universal competencies
- **23 Domain Specialists:** Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, PRD-Analyst, Accessibility, Full-Stack, Desktop-App, Game, Graphics, Systems-Programmer, Technical-Writer
- **Vibe Agents:** Core + 6 platform-specific

**Loading:** Core first, then Domain specialist(s)

---

## Skills (22 Total)

| Category | Skills |
|----------|--------|
| TDD | tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns |
| BDD | bdd-writing |
| PRD | extract-prd, promote-to-prd |
| Code Quality | anti-pattern-analysis, uml-generation |
| Beginner Setup | flask-setup, sinatra-setup |
| Beginner Support | common-errors, sqlite-integration, beginner-testing |
| Database | postgresql-integration, migration-patterns |
| Advanced Testing | property-based-testing, mutation-testing |
| Architecture | api-versioning, error-handling-patterns |
| DevOps | ci-cd-pipeline-design |

---

## Framework Transitions

**Valid:**
```
VIBE ──► AGILE (Terminal)
```

**Invalid:** Agile → Vibe

| From | To | When |
|------|----|------|
| Vibe | Agile | Exploration complete, requirements understood |

---

## Selection Matrix

| Project Type | Framework | Evolution |
|--------------|-----------|-----------|
| Defined requirements | IDPF-Agile | Terminal |
| Exploration needed | IDPF-Vibe | → Agile |
| Separate test repo | IDPF-Testing-Core | Use Agile |

---

**End of Framework Overview**
