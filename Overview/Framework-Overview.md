# Framework Overview
**Version:** 0.21.1
**Source:** Overview/Framework-Overview.md

---

**Purpose:** Comprehensive reference for AI assistants (Claude/Claude Code) and framework development

**Core Principle:** System Instructions define WHO the assistant is; Frameworks define WHAT process to follow; Skills provide reusable capabilities; Assistant Guidelines ensure accuracy and quality.

## IDPF-PRD Framework (Pre-Development)
**Location:** `IDPF-PRD/IDPF-PRD.md`
**Type:** Requirements Engineering & PRD Generation

**Workflow Phases:**
- **Forward Path:** Discovery → Elicitation → Specification → Generation
- **Reverse Path:** Analyze → Extract → Refine → Generate

**PRD Commands:** PRD-Start, PRD-Status, PRD-Next, PRD-Back, Discovery-Complete, Elicitation-Complete, Specification-Complete, Generate-PRD, Export-PRD
**Reverse Path:** Reverse-PRD-Start, Reverse-PRD-Analyze, Reverse-PRD-Extract, Reverse-PRD-Refine, Reverse-PRD-Status

**Framework Handoff:** PRD → IDPF-Agile (Features mapped to Epics/Stories)

---

## IDPF-Agile Framework
**Location:** `IDPF-Agile/Agile-Driven Development Framework.md`
**Type:** Sprint-Based Development with User Stories

**Workflow Stages:** Product Backlog Creation → Sprint Planning → Story Development (TDD) → Sprint Review → Sprint Retrospective

**Agile Commands:** Create-Backlog, Add-Story, Refine-Story, Estimate-Story, Prioritize-Backlog, Split-Story, Plan-Sprint, Sprint-Status, Start-Story, Story-Complete, Sprint-Retro, End-Sprint, Run-Tests, Show-Coverage

**When to Use:** Building products with evolving requirements, iterative delivery, feature prioritization, velocity tracking

---

## IDPF-Vibe Framework
**Location:** `IDPF-Vibe/`
**Core Framework Revision:** 4.0
**Type:** Exploratory Development → Structured Evolution

**Three-Phase Workflow:**
1. **VIBE PHASE:** Exploratory, rapid iteration, natural language prompts
2. **EVOLUTION POINT:** Triggered by "Ready-to-Structure"
3. **AGILE PHASE:** Switch to IDPF-Agile, TDD for new development

**Platform Variants:** Desktop, Mobile, Web, Game, Embedded, Newbie

---

## Testing Frameworks

**IDPF-Testing-Core** (foundation) extends to:
- IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
- IDPF-Performance (k6, JMeter, Gatling, Locust)
- IDPF-Security (OWASP ZAP, Burp Suite, SAST/DAST)
- IDPF-Accessibility (axe, Lighthouse, Pa11y)
- IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
- IDPF-Contract-Testing (Pact, Spring Cloud Contract)

**Workflow Phases:** PLAN → DESIGN → DEVELOP → EXECUTE → REPORT

---

## System Instructions
**Location:** `System-Instructions/`

**Architecture Pattern:** Core + Domain Specialization
- **Core-Developer-Instructions.md (Rev 1.0)**: Foundation competencies
- **23 Domain Specialists**: Specialized expertise profiles
- **Domain-Selection-Guide.md (Rev 1.0)**: Guide for choosing specialist(s)

**Domain Specialists:** Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, PRD-Analyst, Accessibility, Full-Stack, Desktop-App, Game, Graphics, Systems-Programmer, Technical-Writer

**Vibe Agent Instructions:** Core + Platform-specific (Desktop, Web, Mobile, Game, Embedded, Newbie)

---

## Skills
**Location:** `Skills/`
**Total Skills:** 22

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

## Assistant Guidelines
**Location:** `Assistant/`

**Anti-Hallucination Rules for Software Development:**
- Never invent API methods, class names, config syntax, command flags
- Never assume OS/platform, available tools, project structure
- Information source hierarchy: User-provided > Official docs > Training data > Inference

**Anti-Hallucination Rules for Skill Creation:**
- Never invent content not in source material
- Preserve exact wording from source

---

## Framework Transition Matrix
```
IDPF-Vibe → IDPF-Agile (terminal)
```
**Invalid:** Agile → Vibe (quality standards never decrease)

**Selection Criteria:**
- **IDPF-Agile:** Defined requirements, sprints, velocity tracking
- **IDPF-Vibe:** Unclear requirements, exploration, prototyping

---

## Framework Ecosystem Summary
- **2 Development Process Frameworks**: IDPF-Agile, IDPF-Vibe (7 variants)
- **1 Requirements Engineering Framework**: IDPF-PRD
- **Testing Frameworks**: IDPF-Testing-Core + 6 specialized
- **System Instructions**: 1 Core + 23 Domain Specialists + Vibe Agent (Core + 6 platforms)
- **22 Skills**
- **2 Assistant Guideline Documents**

---

**End of Framework Overview**
