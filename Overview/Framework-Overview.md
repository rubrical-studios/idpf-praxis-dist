# Framework Overview
**Version:** 2.13.0
**Purpose:** Comprehensive reference for AI assistants and framework development

## Framework Purpose
This ecosystem supports AI-assisted software development across multiple methodologies.
**Core Principle:** System Instructions (WHO) → Frameworks (WHAT) → Skills (TOOLS) → Assistant Guidelines (HOW WELL)

## IDPF-PRD (Pre-Development)
**Revision:** 2 | Transform ideas into PRDs feeding into IDPF-Structured or IDPF-Agile.
**Forward Path:** Discovery → Elicitation → Specification → Generation
**Reverse Path:** Analyze → Extract → Refine → Generate
**Commands:** PRD-Start, PRD-Next, Generate-PRD, Reverse-PRD-Start
**Handoff:** PRD → Structured (REQ-IDs) | PRD → Agile (Epics/Stories) | Skip PRD → Vibe

## IDPF-Structured
**Revision:** 8 | TDD with fixed requirements, Claude Code integration.
**Workflow:** Session Init → TDD (RED-GREEN-REFACTOR) → Completion
**Commands:** Done-Next-Step, Rollback-Previous-Step, Push-Changes, Final-Commit-Create-PR
**Use When:** Fixed requirements, small-medium projects, solo/small team

## IDPF-Agile
**Revision:** 2 | Sprint-based development with user stories.
**Workflow:** Backlog → Sprint Planning → TDD Development → Review → Retro
**Story Format:** As a [user] I want [goal] So that [benefit] + Acceptance Criteria + Points
**Use When:** Evolving requirements, iterative delivery, velocity tracking needed

## IDPF-Vibe
**Core Rev:** 4.0 | Exploratory development → Structured evolution.
**Platforms:** Desktop, Mobile, Web, Game, Embedded, Newbie
**Phases:** VIBE (exploratory) → EVOLUTION (Ready-to-Structure) → STRUCTURED (TDD)
**Commands:** Vibe-Start, Try-This, That-Works, Run-It, Ready-to-Structure

## IDPF-LTS
**Revision:** 1 | Production maintenance with stability focus.
**Principles:** Stability First, Minimal Change, No New Features, Backwards Compatibility
**Workflow:** Triage → Impact Assessment → TDD Fix → Regression Prevention → Release
**Terminal State:** No transitions FROM LTS

## Testing Frameworks
```
IDPF-Testing-Core (foundation)
├── IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
├── IDPF-Performance (k6, JMeter, Gatling, Locust)
├── IDPF-Security (OWASP ZAP, Burp, SAST/DAST)
├── IDPF-Accessibility (axe, Lighthouse, Pa11y)
├── IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
└── IDPF-Contract-Testing (Pact, Spring Cloud Contract)
```
**Embedded:** TDD/ATDD/BDD in app repo
**Separate:** QA Automation, Performance, Security, Chaos, Contract - use IDPF-Testing

## System Instructions
**Architecture:** Core + Domain Specialization
- Core-Developer-Instructions.md: Foundation competencies
- 17 Domain Specialists: Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, PRD-Analyst, Accessibility
- Legacy: Senior_Full_Stack_Developer.md (backward compatibility)
- Vibe Agent: Core + 6 platform-specific

## Skills (21 total)
**TDD:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns
**BDD:** bdd-writing
**PRD:** extract-prd
**Code Quality:** anti-pattern-analysis, uml-generation
**Beginner Setup:** flask-setup, sinatra-setup
**Beginner Support:** common-errors, sqlite-integration, beginner-testing

## Assistant Guidelines
**Anti-Hallucination Rules:** Accuracy over helpfulness, uncertainty over invention, verification over assumption.
**Never Invent:** API methods, class names, config syntax, command flags, file paths
**Always:** Read files before editing, verify paths, auto-trigger web search for current/latest

## Rules Auto-Loading (v2.9+)
**Location:** `.claude/rules/` - auto-loads at session start
| File | Content | Source |
|------|---------|--------|
| 01-anti-hallucination.md | Framework quality rules | Assistant/ |
| 02-github-workflow.md | GitHub integration | Reference/ |
| 03-session-startup.md | Startup procedure | Generated |
**Benefits:** No explicit reads, compact-resilient, ~47% token reduction

## Framework Transitions
```
VIBE ──► STRUCTURED ──► LTS
  │          ↑↓
  └────► AGILE ────────► LTS
```
**Invalid:** Structured/Agile → Vibe, LTS → Any
**Preserved:** Code, tests, Git history, TDD methodology
**Changes:** Documentation format, workflow structure, planning granularity

## Selection Matrix
| Project Type | Framework | Evolution |
|--------------|-----------|-----------|
| Fixed requirements | IDPF-Structured | → LTS |
| Evolving requirements | IDPF-Agile | → LTS |
| Unclear requirements | IDPF-Vibe | → Structured/Agile |
| Production maintenance | IDPF-LTS | Terminal |
| Separate test repo | IDPF-Testing-Core | Use Structured/Agile |

## Critical Success Factors
1. System Instructions MUST be loaded before framework use
2. Single code block format strictly enforced
3. TDD discipline maintained throughout
4. Context preservation across session
5. Anti-hallucination rules applied continuously
6. Framework transitions follow valid paths only
