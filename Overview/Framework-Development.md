# Framework Development Reference
**Version:** v0.2.0

---

## IDPF-PRD Framework (Pre-Development)

**Location:** `IDPF-PRD/IDPF-PRD.md`
**Version:** v0.2.0
**Type:** Requirements Engineering & PRD Generation

### Forward Path (New Projects)
```
Discovery → Elicitation → Specification → Generation
```

### Reverse Path (Existing Code)
```
Analyze → Extract → Refine → Generate
```

### Auto Template Selection
| Framework | Template |
|-----------|----------|
| IDPF-Structured | PRD-Structured-Moderate |
| IDPF-Agile | PRD-Agile-Lightweight |

### Framework Handoff
- PRD → IDPF-Structured: Fixed requirements with REQ-IDs
- PRD → IDPF-Agile: Features mapped to Epics/Stories
- Skip PRD → IDPF-Vibe: Exploratory projects

---

## IDPF-Structured Framework

**Location:** `IDPF-Structured/Interactive Development Process Framework.md`
**Version:** v0.2.0
**Type:** TDD with Fixed Requirements

### Workflow
1. Session Initialization
2. TDD Iterations (RED-GREEN-REFACTOR)
3. Completion (PR or roadblock)

### Critical Requirements
- Single code block format (numbered STEP format)
- Complete, runnable code
- Exact file paths and verification steps

### Commands
- Done-Next-Step, Rollback-Previous-Step
- Push-Changes, Final-Commit-Create-PR
- Roadblock-Stop, Double-Check

### TDD Skills Integration
tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

---

## IDPF-Agile Framework

**Location:** `IDPF-Agile/`
**Version:** v0.2.0
**Type:** Sprint-Based Development

### Workflow
1. Product Backlog Creation
2. Sprint Planning
3. Story Development (TDD)
4. Sprint Review
5. Sprint Retrospective

### Story Format
```
As a [user] I want [goal] So that [benefit]
Acceptance Criteria: [checkboxes]
Story Points: [estimate]
```

### Commands
- **Backlog:** Create-Backlog, Add-Story, Prioritize-Backlog
- **Sprint:** Plan-Sprint, Start-Story, Story-Complete, End-Sprint
- **Development:** Done-Next-Step, Run-Tests, Refactor-Now
- **Release Lifecycle:** Open-Release, Prepare-Release, Close-Release (trunk-based)

---

## IDPF-Vibe Framework

**Location:** `IDPF-Vibe/`
**Core Revision:** 4.0
**Type:** Exploratory → Structured Evolution

### Three-Phase Workflow

**Phase 1: VIBE**
- Exploratory, rapid iteration
- Commands: Vibe-Start, Try-This, That-Works, Undo-That, Run-It

**Phase 2: EVOLUTION POINT**
- Ready-to-Structure → Choose Structured OR Agile

**Phase 3: STRUCTURED**
- Switch to chosen framework with TDD

### Platform Variants (7)
- Core, Desktop, Web, Mobile, Game, Embedded, Newbie

### Newbie Integration
Skills: flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing

---

## IDPF-LTS Framework

**Location:** `IDPF-LTS/Long-Term-Support-Framework.md`
**Version:** v0.2.0
**Type:** Production Maintenance

### Core Tenets
1. Stability First
2. Minimal Change
3. No New Features
4. Backwards Compatibility
5. Comprehensive Testing

### What Goes Into LTS
- ✅ Critical/high bugs, security patches, doc fixes
- ❌ New features, refactoring, non-security upgrades

### Five-Phase Workflow
```
Bug Triage → Impact Assessment → Fix (TDD) → Regression Prevention → Documentation & Release
```

### Severity
- P0 Critical: 24h (data loss, security, system failure)
- P1 High: Core broken, no workaround
- P2 Medium: Workaround exists
- P3/P4: Low/Trivial

### LTS is Terminal
- No transitions FROM LTS
- New development = new major version

---

**End of Framework Development Reference**
