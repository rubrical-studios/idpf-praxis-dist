# Framework Overview
**Version:** v0.36.2
**Purpose:** Comprehensive reference for AI assistants and framework development
**Core Principle:** System Instructions define WHO; Frameworks define WHAT process; Skills provide capabilities; Assistant Guidelines ensure quality.
## PRD Creation (create-prd Skill)
> **Note:** IDPF-PRD deprecated in v0.24, replaced by `create-prd` skill.
**Location:** `Skills/create-prd/SKILL.md` | **Command:** `/create-prd`
### Workflow Modes
| Mode | Command | Purpose |
|------|---------|---------|
| Promote | `/create-prd Proposal/Feature.md` | Transform proposal to PRD |
| Extract | `/create-prd extract` | Extract PRD from codebase |
| Interactive | `/create-prd` | Prompt for mode selection |
### Key Features
- Charter validation, dynamic questions, story transformation
- Priority validation (MoSCoW), optional UML diagrams
- Single session completion
### Integration
- **Inputs:** `Proposal/*.md`, `Inception/`, `CHARTER.md`
- **Outputs:** `PRD/{name}/PRD-{name}.md`
- **Downstream:** `Create-Backlog` generates issues from PRD
## IDPF-Agile Framework
**Location:** `IDPF-Agile/` | **Type:** Sprint-Based Development
### Key Components
**Terminology:** Product Backlog, Sprint Backlog, User Story, Story Points (Fibonacci), Sprint, Epic, Definition of Done, Velocity
**Workflow Stages:**
1. Product Backlog Creation
2. Sprint Planning
3. Story Development (TDD)
4. Sprint Review
5. Sprint Retrospective
**User Story Format:**
```
As a [user type]
I want [goal]
So that [benefit]

Acceptance Criteria:
- [ ] Criterion 1
Story Points: [estimate]
Priority: [High/Medium/Low]
Status: [Backlog/Selected/In Progress/In Review/Done]
```
**Commands:** Create-Backlog, Add-Story, Plan-Sprint, Sprint-Status, Sprint-Retro, End-Sprint, `work #N`, `done`
### Integration
- Uses TDD (RED-GREEN-REFACTOR)
- Receives projects from Vibe evolution
- Terminal framework
## IDPF-Vibe Framework
**Location:** `IDPF-Vibe/` | **Core Revision:** 4.0 | **Type:** Exploratory → Structured
### Architecture
**Core:** Vibe-to-Structured-Core-Framework.md (Rev 4.0)
**Platform-Specific:** Desktop (Rev 2), Mobile (Rev 3), Web (Rev 2), Game (Rev 1), Embedded (Rev 1), Newbie (Rev 1)
### Three-Phase Workflow
**Phase 1: VIBE** - Exploratory, rapid iteration, no formal requirements
**Commands:** Vibe-Start, Try-This, Show-Me, That-Works, Undo-That, Run-It, Vibe-Status, Vibe-End, Ready-to-Structure, Vibe-Abandon
**Phase 2: EVOLUTION** - Triggered by "Ready-to-Structure", generates as-built backlog
**Phase 3: AGILE** - Switch to IDPF-Agile, TDD for all new development
### Two-Tool Workflow
- **ASSISTANT:** Instructions in numbered STEP format
- **Claude Code:** Executes commands, reports results
- **User:** Bridges both tools
### Platform Coverage
| Platform | Technologies |
|----------|-------------|
| Desktop | Python, Ruby, Node/Electron, C#, Rust |
| Mobile | Swift, Kotlin, React Native, Flutter |
| Web | React, Vue, Svelte, Express, Flask, Rails |
| Game | Godot, Unity, Unreal, Phaser |
| Embedded | Arduino, ESP32, STM32, FreeRTOS, Zephyr |
| Newbie | Flask, Sinatra, vanilla HTML/CSS/JS, SQLite |
## IDPF-Testing-Core Framework
**Location:** `IDPF-Testing-Core/` | **Type:** Foundational Testing
**Core Principle:** "Test automation is software development."
### Architecture
```
IDPF-Testing-Core (foundation)
    ├── IDPF-QA-Automation
    ├── IDPF-Performance
    ├── IDPF-Security
    ├── IDPF-Accessibility
    ├── IDPF-Chaos
    └── IDPF-Contract-Testing
```
### Embedded vs Separate
**Embedded:** TDD, ATDD, BDD in application repo
**Separate:** QA Automation, Performance, Security, Chaos, Contract Testing, Accessibility (flexible)
### Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
## IDPF-QA-Automation
**Extends:** Testing-Core | **Type:** UI & E2E Test Automation
### Test Types
Smoke (<5 min), Regression (30-60 min), Cross-Browser, Mobile, Visual, E2E
### Tools
**Web:** Selenium, Playwright, Cypress, WebDriverIO
**Mobile:** Appium, XCUITest, Espresso, Detox
### Page Object Model
- One page object per page/screen
- Encapsulates locators, exposes actions
- Selector priority: data-testid > ID > Name > ARIA > CSS
## IDPF-Performance
**Extends:** Testing-Core | **Type:** Performance Testing
### Test Types
| Type | Purpose |
|------|---------|
| Load | Expected load validation |
| Stress | Find breaking point |
| Endurance | Detect leaks (4-24h) |
| Spike | Traffic bursts |
| Capacity | Max throughput |
### Tools
k6 (APIs, CI/CD), JMeter (Enterprise), Gatling (High throughput), Locust (Python)
### Metrics
p95 < 500ms, p99 < 1000ms, Error Rate < 0.1%, Apdex > 0.9
## IDPF-Security
**Extends:** Testing-Core | **Type:** Security Testing
### Testing Types
SAST (SonarQube, Semgrep), SCA (Snyk, Dependabot), DAST (ZAP, Burp), Penetration, Secret Scanning
### OWASP Top 10
A01-A10: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Auth Failures, Data Integrity, Logging Failures, SSRF
### Vulnerability SLA
Critical (9.0-10.0): 24h, High (7.0-8.9): 7d, Medium (4.0-6.9): 30d, Low (0.1-3.9): 90d
## IDPF-Accessibility
**Extends:** Testing-Core | **Type:** Accessibility Testing
### Repository Type: Flexible
Embedded (CI automated checks) OR Separate (comprehensive audits)
### Testing Types
Automated Scans (~30-40%), Keyboard, Screen Reader, Color Contrast, Cognitive, Mobile a11y
### WCAG Levels
A (must meet), AA (legal requirement), AAA (aspirational). Target: WCAG 2.1 AA
### Tools
**Scanning:** axe-core, Lighthouse, Pa11y, WAVE
**Assistive:** NVDA, JAWS, VoiceOver, TalkBack
## IDPF-Chaos
**Extends:** Testing-Core | **Type:** Chaos Engineering
**Core Principle:** Proactively test resilience with controlled failures.
### Fault Types
Infrastructure (instance termination), Network (latency, packet loss), Application (memory, CPU), Dependency (service unavailable), State (database failure)
### Tools
Chaos Monkey, Gremlin, LitmusChaos, Chaos Mesh, AWS FIS, Toxiproxy
### Workflow
Hypothesis → Observability → Design → Approval → Execute → Analyze → Fix
## IDPF-Contract-Testing
**Extends:** Testing-Core | **Type:** API Contract Testing
### Flow
Consumer → Generate Contract → Publish → Provider Verifies → Can-I-Deploy → Deploy
### Tools
Pact (most scenarios), Spring Cloud Contract (Spring), Specmatic (OpenAPI)
### Concepts
Consumer, Provider, Contract, Broker, Can-I-Deploy, Provider State
## System Instructions
**Location:** `System-Instructions/` | **Critical:** REQUIRED for all framework operation
### Architecture
**Core-Developer-Instructions.md (Rev 1.0):** Foundation competencies
**22 Domain Specialists:** Specialized expertise (loaded with Core)
**Domain-Selection-Guide.md (Rev 1.0):** Selection guidance
### Core Competencies
Version Control, Testing Fundamentals, Agile, Code Quality, Design Patterns, Cross-Platform, Security, Performance
### Domain Specialists (22)
Full-Stack, Backend, Frontend, DevOps, Database, API-Integration, Security, Platform, Mobile, Data, QA-Test, Cloud-Architect, SRE, Embedded, ML, Performance, Accessibility, Desktop-App, Game, Graphics, Systems-Programmer, Technical-Writer
### Vibe Agent Instructions
Core (Rev 1.3) + Platform-Specific (Desktop, Web, Mobile, Game, Embedded, Newbie)
## Skills
**Location:** `Skills/` | **Total:** 25 skills
### Categories
- **TDD (6):** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns, bdd-writing
- **PRD (2):** extract-prd, create-prd
- **Code Quality (3):** anti-pattern-analysis, uml-generation, codebase-analysis
- **Beginner Setup (2):** flask-setup, sinatra-setup
- **Beginner Support (3):** common-errors, sqlite-integration, beginner-testing
- **Database (2):** postgresql-integration, migration-patterns
- **Advanced Testing (2):** property-based-testing, mutation-testing
- **Architecture (2):** api-versioning, error-handling-patterns
- **DevOps (1):** ci-cd-pipeline-design
- **Testing Setup (1):** playwright-setup
- **Desktop (1):** electron-development
## Assistant Guidelines
**Location:** `Assistant/` | **Total:** 2 documents
### Anti-Hallucination Rules for Software Development
- Never invent API methods, class names, config syntax, command flags
- Never assume OS/platform, tools, project structure
- Information hierarchy: User files > Official docs > Training data > Inference
- Auto-trigger web search for "current", "latest", uncertain syntax
### Anti-Hallucination Rules for Skill Creation
- Never invent content not in source material
- Preserve exact wording from source
- Only create resource files for content in source
## Rules Auto-Loading (v2.9+)
**Location:** `.claude/rules/`
Files auto-load at session start:
- `01-anti-hallucination.md`
- `02-github-workflow.md`
- `03-session-startup.md`
Benefits: No explicit reads, compact-resilient, simplified startup
## Framework Transition Matrix
### Valid Transitions
| From | To | When |
|------|----|------|
| Vibe | Agile | Exploration complete |
**Invalid:** Agile → Vibe (quality standards never decrease)
### Principles
**Preserved:** Code, tests, Git history, TDD, architecture
**Changes:** Documentation format, workflow structure, planning granularity, progress tracking
## Integration Architecture
### Dependency Hierarchy
```
System Instructions (WHO) → Framework (WHAT) → Skills (TOOLS) → Guidelines (HOW WELL)
```
### Selection Criteria
**IDPF-Agile:** Evolving requirements, iterative delivery, velocity tracking
**IDPF-Vibe:** Unclear requirements, exploration, prototyping
### Common Elements
- TDD (RED-GREEN-REFACTOR)
- Claude Code single code block format
- Context preservation
- Git workflows
## Framework Ecosystem Summary
**Components:**
- 2 Development Frameworks: IDPF-Agile, IDPF-Vibe (7 variants)
- 7 Testing Frameworks: Testing-Core + 6 specialized
- System Instructions: 1 Core + 22 Domain Specialists + Vibe Agent (Core + 6 platforms)
- 25 Skills
- 2 Assistant Guidelines
**Selection Matrix:**
| Project Type | Starting Point | Evolution |
|--------------|---------------|-----------|
| Defined requirements | IDPF-Agile | Terminal |
| Unclear requirements | IDPF-Vibe | → Agile |
| Need requirements | `/create-prd` | PRD → Agile |
| Separate test repo | IDPF-Testing-Core | Agile for test dev |
**Critical Success Factors:**
1. System Instructions MUST be loaded
2. Single code block format enforced
3. TDD discipline maintained
4. Context preservation
5. Anti-hallucination rules applied
6. Valid framework transitions only
---
**End of Framework Overview**
