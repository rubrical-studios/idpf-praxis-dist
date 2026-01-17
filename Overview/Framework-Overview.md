# Framework Overview
**Version:** v0.26.1
**Purpose:** Comprehensive reference for AI assistants and framework development
---
## Core Principle
**System Instructions** define WHO; **Frameworks** define WHAT process; **Skills** provide capabilities; **Assistant Guidelines** ensure accuracy.
---
## PRD Creation (create-prd Skill)
> **Note:** IDPF-PRD deprecated v0.24; replaced by `create-prd` skill.
**Skill:** `Skills/create-prd/SKILL.md` | **Command:** `/create-prd`
**Modes:** Promote (proposal→PRD), Extract (code→PRD), Interactive
**Handoff:** PRD -> Create-Backlog -> IDPF-Agile
---
## IDPF-Agile Framework
**Location:** `IDPF-Agile/` | **Type:** Sprint-Based Development
**Workflow:** Backlog Creation -> Sprint Planning -> Story Development (TDD) -> Sprint Review -> Retrospective
**User Story Format:** As a [user], I want [goal], So that [benefit] + Acceptance Criteria + Story Points + Priority + Status
**Commands:** Create-Backlog, Plan-Sprint, Sprint-Status, Start-Story, Story-Complete, Sprint-Retro, End-Sprint, Run-Tests
---
## IDPF-Vibe Framework
**Location:** `IDPF-Vibe/` | **Core Rev:** 4.0 | **Type:** Exploratory -> Structured
**Platforms:** Desktop, Mobile, Web, Game, Embedded, Newbie
**Phase 1 VIBE:** Try-This, Show-Me, That-Works, Undo-That, Run-It
**Phase 2 EVOLUTION:** Ready-to-Structure -> IDPF-Agile
**Phase 3 AGILE:** TDD development
---
## Testing Frameworks
**IDPF-Testing-Core** (Foundation) + 6 Specialized:
- IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
- IDPF-Performance (k6, JMeter, Gatling, Locust)
- IDPF-Security (OWASP ZAP, SAST/DAST)
- IDPF-Accessibility (axe, Lighthouse, WCAG)
- IDPF-Chaos (Chaos Monkey, Gremlin)
- IDPF-Contract-Testing (Pact, Spring Cloud Contract)
**Workflow:** PLAN -> DESIGN -> DEVELOP -> EXECUTE -> REPORT
---
## System Instructions
**Architecture:** Core + Domain Specialization
**Core:** Core-Developer-Instructions.md (universal competencies)
**23 Domain Specialists:** Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, PRD-Analyst, Accessibility, Full-Stack, Desktop-App, Game, Graphics, Systems-Programmer, Technical-Writer
**Vibe Agent:** Core + 6 platform-specific instructions
---
## Skills (22)
**TDD:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns, bdd-writing
**PRD:** extract-prd, create-prd
**Code Quality:** anti-pattern-analysis, uml-generation
**Beginner:** flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing
**Database:** postgresql-integration, migration-patterns
**Advanced Testing:** property-based-testing, mutation-testing
**Architecture:** api-versioning, error-handling-patterns
**DevOps:** ci-cd-pipeline-design
---
## Assistant Guidelines
**Anti-Hallucination Rules:**
- NEVER invent API methods, class names, config syntax, command flags
- NEVER assume OS/platform, tools, project structure, versions
- Information hierarchy: User files > Official docs > Training data > Inference
- Always READ files before editing
- Enumerate ALL files before bulk operations
---
## Rules Auto-Loading (v2.9+)
**Location:** `.claude/rules/`
Files: 01-anti-hallucination.md, 02-github-workflow.md, 03-session-startup.md
Auto-loads at session start, persists after compaction.
---
## Framework Transitions
```
VIBE ──► AGILE (Terminal)
```
**Invalid:** Agile -> Vibe (quality standards never decrease)
**Preserved:** Code, tests, Git history, TDD, architecture
**Changes:** Documentation format, workflow structure, planning granularity
---
## Integration Architecture
```
System Instructions (WHO + EXPERTISE)
    |
Framework Selection (WHAT process)
    |
Skills (TOOLS)
    |
Assistant Guidelines (HOW WELL)
```
---
## Selection Matrix
| Project Type | Starting Point | Evolution |
|--------------|---------------|-----------|
| Defined requirements | IDPF-Agile | Terminal |
| Unclear requirements | IDPF-Vibe | Vibe -> Agile |
| Need requirements | `/create-prd` | PRD -> Agile |
| Separate test repo | IDPF-Testing-Core | Use Agile |
---
## Critical Success Factors
1. System Instructions MUST be loaded before framework use
2. Single code block format strictly enforced
3. TDD discipline maintained throughout
4. Context preservation across session
5. Anti-hallucination rules applied continuously
6. Framework transitions follow valid paths only
---
**End of Framework Overview**
