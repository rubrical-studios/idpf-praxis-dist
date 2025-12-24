# Framework Overview

**Version:** v0.5.0

---

## Core Principle
System Instructions define WHO; Frameworks define WHAT process; Skills provide capabilities; Assistant Guidelines ensure quality.

---

## IDPF-PRD (Pre-Development)
**Version:** v0.5.0 | **Type:** Requirements Engineering

**Forward Path:** Discovery → Elicitation → Specification → Generation
**Reverse Path:** Analyze → Extract → Refine → Generate

**Commands:** PRD-Start, PRD-Status, PRD-Next, Generate-PRD, Reverse-PRD-Start

**Handoff:** PRD → Structured (REQ-IDs) | PRD → Agile (Epics/Stories) | Skip → Vibe

---

## IDPF-Structured
**Version:** v0.5.0 | **Type:** TDD with Fixed Requirements

**Workflow:** Session Init → TDD Iterations (RED-GREEN-REFACTOR) → Completion

**Critical:** Single code block, numbered STEP format, complete runnable code

**Commands:** Done-Next-Step, Rollback-Previous-Step, Push-Changes, Final-Commit-Create-PR, Roadblock-Stop, Double-Check

**Skills:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

---

## IDPF-Agile
**Version:** v0.5.0 | **Type:** Sprint-Based Development

**Workflow:** Backlog Creation → Sprint Planning → Story Dev (TDD) → Review → Retro

**Story Format:** As a [user] I want [goal] So that [benefit] + Acceptance Criteria + Story Points

**Commands:** Create-Backlog, Plan-Sprint, Start-Story, Story-Complete, Sprint-Review, End-Sprint
**Release Lifecycle:** Open-Release, Prepare-Release, Close-Release (trunk-based)

---

## IDPF-Vibe
**Core Revision:** 4.0 | **Type:** Exploratory → Structured Evolution

**Phase 1 VIBE:** Try-This, That-Works, Undo-That, Run-It, Vibe-Status
**Phase 2 EVOLUTION:** Ready-to-Structure → Choose Structured OR Agile
**Phase 3 STRUCTURED:** Switch to chosen framework with TDD

**Variants:** Core, Desktop, Web, Mobile, Game, Embedded, Newbie

---

## IDPF-LTS
**Version:** v0.5.0 | **Type:** Production Maintenance (Terminal)

**Allowed:** Critical bugs, security patches, doc fixes
**Forbidden:** New features, refactoring, non-security upgrades

**Workflow:** Bug Triage → Impact → Fix (TDD) → Regression Check → Release

**Severity:** P0 Critical (24h) | P1 High | P2 Medium | P3/P4 Low

---

## Testing Frameworks

```
IDPF-Testing-Core (foundation)
    ├── IDPF-QA-Automation (Selenium, Playwright, Cypress)
    ├── IDPF-Performance (k6, JMeter, Gatling)
    ├── IDPF-Security (OWASP ZAP, SAST/DAST)
    ├── IDPF-Accessibility (axe, Pa11y)
    ├── IDPF-Chaos (Gremlin, LitmusChaos)
    └── IDPF-Contract-Testing (Pact)
```

**Embedded:** TDD/ATDD/BDD in app repo
**Separate:** QA Automation, Performance, Security, Chaos, Contract

---

## System Instructions

**Architecture:** Core-Developer-Instructions.md + 23 Domain Specialists

**Core Competencies:** Git, Testing, Agile, SOLID, Design Patterns, Security, Performance

**Domain Specialists:** Full-Stack, Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, PRD-Analyst, Accessibility, Desktop, Game, Graphics, Systems-Programmer, Technical-Writer

**Legacy:** Senior_Full_Stack_Developer.md (backward compatibility)
**Vibe Agent:** Core + Platform-specific (Desktop, Web, Mobile, Game, Embedded, Newbie)

---

## Skills (21)

**TDD:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns, bdd-writing
**PRD:** extract-prd
**Code Quality:** anti-pattern-analysis, uml-generation
**Beginner:** flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing
**Database:** postgresql-integration, migration-patterns
**Advanced Testing:** property-based-testing, mutation-testing
**Architecture:** api-versioning, error-handling-patterns
**DevOps:** ci-cd-pipeline-design

---

## Framework Transitions

```
VIBE ──► STRUCTURED ──► LTS
  │          ↑↓
  └────► AGILE ────────► LTS
```

**Valid:** Vibe→Structured, Vibe→Agile, Structured↔Agile, Structured→LTS, Agile→LTS
**Invalid:** Structured/Agile→Vibe, LTS→Any

**Preserved:** Code, tests, Git history, TDD methodology
**Changes:** Documentation format, workflow structure, progress tracking

---

## Selection Matrix

| Project Type | Framework | Evolution |
|--------------|-----------|-----------|
| Fixed requirements | IDPF-Structured | → LTS |
| Evolving requirements | IDPF-Agile | → LTS |
| Unclear requirements | IDPF-Vibe | → Structured/Agile |
| Production maintenance | IDPF-LTS | Terminal |
| Separate test repo | IDPF-Testing-Core | Use Structured/Agile |

---

## Rules Auto-Loading

**Location:** `.claude/rules/`
- 01-anti-hallucination.md
- 02-github-workflow.md
- 03-session-startup.md

Benefits: No explicit reads, compact-resilient, token reduction

---

## Assistant Guidelines

**Anti-Hallucination (Software Dev):**
- NEVER invent API methods, class names, config syntax
- NEVER assume OS, tools, project structure, versions
- Auto-search: "current", "latest", uncertain syntax

**Confidence:** High → Medium → Low → "I don't know"

**File Operations:** READ before editing, verify paths, enumerate before bulk ops

---

**End of Framework Overview**
