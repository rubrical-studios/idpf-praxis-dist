# Vibe-to-Structured Development Framework (Core)
**Version:** 0.19.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Core-Framework.md
**Type:** Core Framework (Platform-Agnostic)

---

## Purpose
Core framework for Vibe-to-Structured methodology. Platform-agnostic.
**Platform-specific frameworks:** Desktop, Mobile, Web, Game, Embedded, Newbie

---

## Platform Selection

| Framework | Target | Technologies | Best For |
|-----------|--------|--------------|----------|
| Web | Browsers, servers | React, Vue, Node.js | Websites, APIs, SaaS |
| Desktop | Windows, macOS, Linux | Electron, Tauri | Local apps, tools |
| Mobile | iOS, Android | React Native, Flutter | Phone/tablet apps |
| Game | PC, consoles, web | Unity, Unreal, Godot | Games |
| Embedded | Microcontrollers | Arduino, ESP32, RPi | IoT, hardware |
| Newbie | Any (simplified) | Varies | Learning, first projects |

---

## Terminology
1. **ASSISTANT**: AI assistant (Claude)
2. **Claude Code**: Execution tool
3. **User**: Human developer
4. **Vibe Phase**: Exploratory development without formal requirements
5. **Structured Phase**: TDD development with requirements
6. **Evolution Point**: Transition from Vibe to Agile

---

## Two-Tool Workflow
1. ASSISTANT provides TASK/STEP instructions in chat
2. User copies code block to Claude Code
3. Claude Code executes
4. User reports results back to ASSISTANT

---

## Three-Phase Workflow
```
VIBE PHASE → EVOLUTION POINT → AGILE PHASE
```

---

## Phase 1: VIBE PHASE

### Initialization
1. Verify Claude Code setup
2. Declare Framework Revision
3. Establish project location
4. Identify project type
5. Ask clarifying questions
6. Suggest starting point
7. Display Vibe Commands
8. Wait for "Vibe-Start"

### Philosophy
- No formal requirements (yet)
- Natural language descriptions
- Rapid iteration without strict TDD
- Focus on exploration
- Build working prototypes quickly

### Commands
| Command | Description |
|---------|-------------|
| Vibe-Start | Begin exploration |
| Try-This | Describe feature to try |
| Show-Me | See what's built |
| That-Works | Feature good, next idea |
| Undo-That | Remove last change |
| Run-It | Get run instructions |
| Vibe-Status | Summarize progress |
| Vibe-End | Save snapshot, pause |
| Ready-to-Structure | Trigger evolution |
| Vibe-Abandon | Stop project |

---

## Phase 2: EVOLUTION POINT

### Triggers
- User issues "Ready-to-Structure"
- ASSISTANT detects maturity (3-5 features, stable architecture)

### Evolution Target: IDPF-Agile
All Vibe projects evolve to **IDPF-Agile**:
- Iterative sprints with user stories
- Prioritization and backlog management
- Generates: Product Backlog with Stories/Epics

### Process
1. Pause development
2. Analyze existing code
3. Generate Product Backlog
4. Propose test strategy
5. Present evolution plan
6. Refine with user
7. Save backlog document
8. Begin Sprint Planning

---

## Phase 3: AGILE PHASE

### Transition
1. Switch to TDD Mode (RED-GREEN-REFACTOR)
2. Add tests for existing code
3. Continue development with rigor
4. Maintain backlog

### Commands
All IDPF-Agile commands apply:
- Create-Backlog, Plan-Sprint, Start-Story, Story-Complete
- Run-Tests, Show-Coverage, Sprint-Retro, End-Sprint

**TDD Execution Model:** TDD phases (RED → GREEN → REFACTOR) execute **autonomously** within each story. No user interaction between phases.

---

## Claude Code Communication Format
```
TASK: [Brief description]
STEP 1: [Open/create file]
STEP 2: [Navigate/action]
STEP 3: [Add/modify code - COMPLETE]
STEP 4: [Context]
STEP 5: [Save file]
STEP 6: [Run/test]
STEP 7: [Verify outcome]
STEP 8: [Report results]
```
**Critical:** ONE code block, numbered steps, complete code, exact paths

---

## Best Practices

### Vibe Phase
- Small iterations, run frequently
- Don't overthink, explore
- Embrace messiness
- Fail fast

### Evolution Point
- Don't rush, capture good requirements
- Be honest about what exists vs needed
- Plan for quality

### Agile Phase
- TDD rigorously
- Test existing code
- Refactor freely with safety net
- Keep documentation current

---

## When to Use

**Use Vibe-to-Structured:** Unclear requirements, exploring technology, prototyping, learning
**Use IDPF-Agile directly:** Clear requirements, existing codebase, mature project
**Don't use:** Safety-critical systems, production without staging, fixed-scope projects

---

**End of Core Framework**
