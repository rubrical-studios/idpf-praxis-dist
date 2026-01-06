# Framework Development Reference
**Version:** v0.22.0
**Source:** Overview/Framework-Development.md

---

**Purpose:** Detailed reference for IDPF development frameworks (2 frameworks: Agile, Vibe)

## IDPF-PRD Framework (Pre-Development)
**Location:** `IDPF-PRD/IDPF-PRD.md`
**Type:** Requirements Engineering & PRD Generation

Transform ideas into implementation-ready Product Requirements Documents through guided, AI-assisted elicitation. IDPF-PRD is the **pre-development phase** that produces PRDs feeding into IDPF-Agile.

### Automatic Template Selection (Rev 3)
| Framework | Auto-Selected Template |
|-----------|------------------------|
| IDPF-Agile | PRD-Agile-Lightweight |
Use `Use-Template [name]` command to override.

### Workflow Phases
**Forward Path:** Phase 1: Discovery → Phase 2: Elicitation → Phase 3: Specification → Phase 4: Generation
1. **Discovery:** Domain analysis, stakeholder mapping, vision & goals
2. **Elicitation:** Functional requirements, NFRs, constraints & risks
3. **Specification:** Requirement detailing, acceptance criteria, testing approach
4. **Generation:** Template selection, PRD assembly, framework handoff

**Reverse Path:** Phase R1: Analyze → Phase R2: Extract → Phase R3: Refine → Phase R4: Generate
1. **Analyze:** Scan structure, detect tech stack, infer architecture
2. **Extract:** Parse tests for features, detect NFRs from patterns
3. **Refine:** User validates/modifies extracted content
4. **Generate:** Standard PRD generation from validated worksheets

### PRD Commands
**Forward Path:** PRD-Start, PRD-Status, PRD-Next, PRD-Back, Discovery-Complete, Elicitation-Complete, Specification-Complete, Generate-PRD, Export-PRD, List-NFRs, Suggest-NFRs
**Reverse Path:** Reverse-PRD-Start, Reverse-PRD-Analyze, Reverse-PRD-Extract, Reverse-PRD-Refine, Reverse-PRD-Status

### Framework Handoff
- **PRD → IDPF-Agile:** Features mapped to Epics/Stories, begin Sprint 0 planning
- **Skip PRD → IDPF-Vibe:** Exploratory projects with unknown scope

---

## IDPF-Agile Framework
**Location:** `IDPF-Agile/Agile-Driven Development Framework.md`
**Type:** Sprint-Based Development with User Stories

### Key Components
**Terminology:** Product Backlog, Sprint Backlog, User Story, Story Points (Fibonacci: 1, 2, 3, 5, 8, 13, 21), Sprint, Epic, Definition of Done (DoD), Velocity

**Workflow Stages:**
1. **Product Backlog Creation**: Generate stories from vision, organize into epics
2. **Sprint Planning**: Select stories, set sprint goal, estimate capacity
3. **Story Development**: Implement using TDD cycles (RED-GREEN-REFACTOR)
4. **Sprint Review**: Validate completed stories, gather feedback
5. **Sprint Retrospective**: Process improvement and velocity analysis

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

**Agile Commands:**
- **Backlog Operations**: Create-Backlog, Add-Story, Refine-Story, Estimate-Story, Prioritize-Backlog, Split-Story
- **GitHub Issue Commands**: Create-Backlog (creates Epic/Story hierarchy with sub-issue linking)
- **Sprint Commands**: Plan-Sprint, Sprint-Status, Start-Story, Story-Complete, Sprint-Retro, End-Sprint
- **Development Commands**: Run-Tests, Show-Coverage
- **Utility Commands**: List-Commands, Help
- **Release Lifecycle Commands**: Open-Release, Prepare-Release, Close-Release

### When to Use
- Building products with evolving requirements
- Iterative delivery with regular feedback
- Feature prioritization based on user value
- Medium to large projects
- Velocity tracking and predictability needed

### GitHub Project Template
See `Reference/GitHub-Project-Template-Agile.md` for views, labels, custom fields, issue hierarchy.

---

## IDPF-Vibe Framework
**Location:** `IDPF-Vibe/`
**Core Framework Revision:** 4.0
**Type:** Exploratory Development → Structured Evolution

Enable exploratory development phase without formal requirements, then evolve into IDPF-Agile when project direction crystallizes.

### Architecture
**Core Framework:** Vibe-to-Structured-Core-Framework.md (Rev 4.0)
**Platform-Specific:** Desktop (Rev 2), Mobile (Rev 3), Web (Rev 2), Game (Rev 1), Embedded (Rev 1), Newbie (Rev 1)

### Three-Phase Workflow
**Phase 1: VIBE PHASE** - Exploratory, rapid iteration, natural language prompts
**Vibe Commands:** Vibe-Start, Try-This, Show-Me, That-Works, Undo-That, Run-It, Vibe-Status, Vibe-End, Ready-to-Structure, Vibe-Abandon

**Phase 2: EVOLUTION POINT** - Triggered when user says "Ready-to-Structure" or project feels complete

**Evolution to IDPF-Agile:** Generates as-built Product Backlog with completed stories (Done), documents Vibe features as Story 0.x

**Phase 3: AGILE PHASE** - Switch to IDPF-Agile framework, all new development follows TDD

### Platform Coverage
- **Desktop (Rev 2):** CLI tools, GUI applications, Python, Ruby, JavaScript, C#, Rust
- **Mobile (Rev 3):** iOS, Android, React Native, Flutter
- **Web (Rev 2):** Frontend (React, Vue, Svelte), Backend (Node.js, Python, Ruby), Full-stack (Next.js, Remix)
- **Game (Rev 1):** Godot, Unity, Unreal, browser games
- **Embedded (Rev 1):** Arduino, ESP32, STM32, Raspberry Pi, RTOS
- **Newbie (Rev 1):** Python (Flask) or Ruby (Sinatra), Skills integration

### When to Use
- Starting with unclear requirements
- Need exploration phase first
- Prototyping before formalizing
- Requirements will emerge from experimentation

---

## Framework Transition Flow
```
IDPF-Vibe → IDPF-Agile (terminal)
```
- **IDPF-Vibe** evolves to **IDPF-Agile**
- **IDPF-Agile** is the terminal framework

**No direct entry to Agile:** Use IDPF-PRD first or use IDPF-Vibe for exploration

---

**End of Framework Development Reference**
