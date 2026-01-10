# Framework Development Reference
**Version:** v0.23.0
**Purpose:** IDPF development frameworks (2: Agile, Vibe)
---
## IDPF-PRD Framework (Pre-Development)
**Location:** `IDPF-PRD/IDPF-PRD.md`
**Type:** Requirements Engineering & PRD Generation
### Purpose
Transform ideas into implementation-ready PRDs through AI-assisted elicitation. Pre-development phase feeding into IDPF-Agile.
### Automatic Template Selection (Rev 3)
| Framework | Auto-Selected Template |
|-----------|------------------------|
| IDPF-Agile | PRD-Agile-Lightweight |
Use `Use-Template [name]` to override.
### Workflow Phases
**Forward Path:** `Discovery -> Elicitation -> Specification -> Generation`
1. **Discovery:** Domain analysis, stakeholder mapping, vision & goals
2. **Elicitation:** Functional requirements, NFRs, constraints & risks
3. **Specification:** Requirement detailing, acceptance criteria, testing approach
4. **Generation:** Template selection, PRD assembly, framework handoff
**Reverse Path:** `Analyze -> Extract -> Refine -> Generate`
1. **Analyze:** Scan structure, detect tech stack, infer architecture
2. **Extract:** Parse tests for features, detect NFRs from patterns
3. **Refine:** User validates/modifies extracted content
4. **Generate:** Standard PRD generation from validated worksheets
### Key Resources
**Templates:** Discovery-Worksheet.md, Elicitation-Worksheet.md, Specification-Worksheet.md, Generation-Checklist.md
**Guides:** Domain-Analysis-Guide.md, NFR-Catalog.md, Stakeholder-Mapping-Guide.md, Template-Selection-Guide.md, Extraction-Guide.md
**Checklists:** Phase checklists, PRD-Readiness-Checklist.md
### PRD Commands
**Forward:** PRD-Start, PRD-Status, PRD-Next, PRD-Back, Discovery-Complete, Elicitation-Complete, Specification-Complete, Generate-PRD, Export-PRD, List-NFRs, Suggest-NFRs
**Reverse:** Reverse-PRD-Start, Reverse-PRD-Analyze, Reverse-PRD-Extract, Reverse-PRD-Refine, Reverse-PRD-Status
### Framework Handoff
- **PRD -> IDPF-Agile:** Features mapped to Epics/Stories, begin Sprint 0
- **Skip PRD -> IDPF-Vibe:** Exploratory projects with unknown scope
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
