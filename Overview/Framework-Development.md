# Framework Development Reference
**Version:** v0.31.0
**Purpose:** IDPF development frameworks (2: Agile, Vibe)
---
## PRD Creation (Pre-Development)
> **Note:** IDPF-PRD deprecated v0.24; replaced by `create-prd` skill.
**Skill:** `Skills/create-prd/SKILL.md`
**Command:** `/create-prd`
### Modes
| Mode | Command | Purpose |
|------|---------|---------|
| Promote | `/create-prd Proposal/X.md` | Proposal to PRD |
| Extract | `/create-prd extract` | Codebase to PRD |
| Interactive | `/create-prd` | Mode selection |
### Features
- Charter validation against `CHARTER.md`
- Dynamic context-aware questions
- Story transformation (impl details → user stories)
- Priority validation (MoSCoW distribution)
- Optional UML diagrams (`.drawio.svg`)
- Single-session workflow
### Integration
- **Inputs:** `Proposal/*.md`, `Inception/`, `CHARTER.md`
- **Outputs:** `PRD/{name}/PRD-{name}.md`, `Diagrams/`
- **Downstream:** `Create-Backlog` generates GitHub issues
---
## IDPF-Agile Framework
**Location:** `IDPF-Agile/Agile-Driven Development Framework.md`
**Type:** Sprint-Based Development with User Stories
### Purpose
Agile software development with AI assistance, organizing work around user stories, sprints, and continuous iteration.
### Key Components
**Terminology:**
- Product Backlog: All user stories
- Sprint Backlog: Stories for current sprint
- User Story: Feature from user perspective with acceptance criteria
- Story Points: Relative effort (Fibonacci: 1, 2, 3, 5, 8, 13, 21)
- Sprint: Time-boxed iteration (1-2 weeks)
- Epic: Large feature area with multiple stories
- Definition of Done (DoD): Completion checklist
- Velocity: Story points per sprint
**Workflow Stages:**
1. Product Backlog Creation: Generate stories, organize into epics
2. Sprint Planning: Select stories, set goal, estimate capacity
3. Story Development: Implement using TDD (RED-GREEN-REFACTOR)
4. Sprint Review: Validate stories, gather feedback
5. Sprint Retrospective: Process improvement, velocity analysis
**User Story Format:**
```
As a [user type]
I want [goal]
So that [benefit]
Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
Story Points: [estimate]
Priority: [High/Medium/Low]
Status: [Backlog/Selected/In Progress/In Review/Done]
```
**Commands:**
- **Backlog:** Create-Backlog, Add-Story, Refine-Story, Estimate-Story, Prioritize-Backlog, Split-Story
- **Sprint:** Plan-Sprint, Sprint-Status, Start-Story, Story-Complete, Sprint-Retro, End-Sprint
- **Development:** Run-Tests, Show-Coverage
- **Release:** Open-Release, Prepare-Release, Close-Release
### When to Use
- Evolving requirements with iterative delivery
- Feature prioritization based on user value
- Medium to large projects needing velocity tracking
- Requirements are fixed and well-defined
### Integration Points
- Uses TDD cycles (RED-GREEN-REFACTOR)
- Requires appropriate System Instructions
- Terminal framework (projects remain in Agile)
---
## IDPF-Vibe Framework
**Location:** `IDPF-Vibe/`
**Core Revision:** 4.0
**Type:** Exploratory Development -> Structured Evolution
### Purpose
Enable exploratory development without formal requirements, evolve to IDPF-Agile when direction crystallizes.
### Architecture
**Core:** Vibe-to-Structured-Core-Framework.md (Rev 4.0)
**Platform-Specific:**
- Desktop (Rev 2): Windows, macOS, Linux
- Mobile (Rev 3): iOS, Android, cross-platform
- Web (Rev 2): Frontend, backend, full-stack
- Game (Rev 1): Godot, Unity, Unreal, browser
- Embedded (Rev 1): Arduino, ESP32, STM32, simulator-based
- Newbie (Rev 1): Beginner-friendly with Skills integration
### Three-Phase Workflow
**Phase 1: VIBE PHASE**
- Exploratory, rapid iteration
- Natural language prompts (Try-This, Show-Me, Run-It)
- No formal requirements or testing required
- Focus on discovery and experimentation
**Vibe Commands:** Vibe-Start, Try-This, Show-Me, That-Works, Undo-That, Run-It, Vibe-Status, Vibe-End, Ready-to-Structure, Vibe-Abandon
**Phase 2: EVOLUTION POINT**
- Triggered: User says "Ready-to-Structure" or project feels complete
- ASSISTANT transitions to IDPF-Agile
**Evolution to IDPF-Agile:**
- Generates As-built Product Backlog with completed stories (Done)
- Documents Vibe features as Story 0.x + Pending stories
- Status: "Ready for Sprint 1" or "No pending stories - project complete"
**Phase 3: AGILE PHASE**
- Switch to IDPF-Agile framework
- All new development follows TDD (RED-GREEN-REFACTOR)
- Add tests for existing vibe-phase code
### Platform Coverage
**Desktop:** CLI, GUI, system utilities (Python, Ruby, Node/Electron, C#, Rust)
**Mobile:** iOS (Swift/SwiftUI), Android (Kotlin/Compose), React Native, Flutter
**Web:** Frontend (React, Vue, Svelte), Backend (Node, Flask/Django, Rails), Full-stack (Next.js, Remix)
**Game:** Godot, Unity, Unreal, Browser (Phaser, PixiJS, Three.js)
**Embedded:** Arduino, ESP32, STM32, RPi, RTOS (FreeRTOS, Zephyr), Simulators
**Newbie:** Beginners (Flask/Sinatra, vanilla HTML/CSS/JS, SQLite)
### When to Use
- Unclear requirements needing exploration
- Prototyping before formalizing
- Requirements emerge from experimentation
- Evolves to IDPF-Agile when ready
---
## Framework Transition Flow
```
IDPF-Vibe -> IDPF-Agile (terminal)
```
- **IDPF-Vibe** (exploratory) evolves to **IDPF-Agile** (structured)
- **IDPF-Agile** is terminal - projects remain through completion
- No direct entry to Agile without PRD or Vibe exploration
---
**End of Framework Development Reference**
