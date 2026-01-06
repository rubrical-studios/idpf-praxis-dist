# Vibe-to-Structured Development Framework (Core)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Core-Framework.md
**Type:** Core Framework (Platform-Agnostic)

---

## Purpose
Core framework for Vibe-to-Structured methodology. Platform-agnostic, applies to all project types.
**Specialized frameworks:** Desktop, Mobile, Web, Game, Embedded, Newbie

---

## Platform Selection Guide
```
What are you building?
├── Website/web app? → Web Framework (React, Vue, Node.js)
├── Desktop app? → Desktop Framework (Electron, Tauri, native)
├── Mobile app? → Mobile Framework (React Native, Flutter)
├── Video game? → Game Framework (Unity, Unreal, Godot)
├── IoT/firmware? → Embedded Framework (Arduino, ESP32, RPi)
└── Learning? → Newbie Framework (simplified guidance)
```

---

## Terminology
- **ASSISTANT**: AI assistant (Claude)
- **Claude Code**: Executor tool for instructions
- **Vibe Phase**: Exploratory development without formal requirements
- **Structured Phase**: TDD development with documented requirements
- **Evolution Point**: Transition from Vibe to Structured

---

## Working with Claude Code
**Two-Tool Workflow:**
1. ASSISTANT provides instructions (in chat)
2. You copy code block → paste into Claude Code
3. Claude Code executes
4. You report results back to ASSISTANT

---

## Three-Phase Workflow
1. **VIBE PHASE**: Exploratory with natural language
2. **EVOLUTION POINT**: Capture learnings, formalize requirements
3. **STRUCTURED PHASE**: TDD-driven development

---

## Phase 1: VIBE PHASE

### Session Initialization
1. Verify Claude Code setup
2. Declare Framework version
3. Confirm Vibe Mode
4. Establish Project Location
5. Identify Project Type
6. Ask Clarifying Questions
7. Suggest Starting Point
8. Wait for "Vibe-Start"

### Philosophy
- No formal requirements
- Natural language descriptions
- Rapid iteration
- Focus on exploration
- Learn through building

### Commands
| Command | Description |
|---------|-------------|
| Vibe-Start | Begin exploration |
| Try-This | Describe feature to try |
| Show-Me | See current state |
| That-Works | Ready for next idea |
| Undo-That | Remove last change |
| Run-It | Get run instructions |
| Vibe-Status | Summarize progress |
| Vibe-End | Save snapshot, end session |
| Ready-to-Structure | Transition to structured |
| Vibe-Abandon | Stop project |

### Context Tracking
ASSISTANT maintains: Files created, Features implemented, Technologies chosen, Patterns emerged, Problems solved, User preferences, Architecture decisions

---

## Phase 2: EVOLUTION POINT

### Triggers
- User issues "Ready-to-Structure"
- ASSISTANT detects maturity (3-5 features, stable architecture)

### Evolution Target: IDPF-Agile
Generates Product Backlog with User Stories in Epics.

### Evolution Process
1. Pause development
2. Analyze what exists
3. Generate As-Built PRD with completed features marked DONE
4. Organize into Epics
5. Add Acceptance Criteria
6. Estimate Story Points
7. Prioritize Stories
8. Present PRD
9. Refine with User
10. Save to `/backlog/product-backlog.md`
11. Begin Sprint Planning

---

## Phase 3: STRUCTURED PHASE

### Transition
- Switch to TDD (RED-GREEN-REFACTOR)
- Add tests for existing code
- Maintain requirements

### Commands
| Command | Description |
|---------|-------------|
| List-Commands | Show all commands |
| Run-Tests | Execute test suite |
| Show-Coverage | Display coverage |
| Update-Requirements | Modify requirements |
| Double-Check | Verify against requirements |
| Final-Commit-Create-PR | Complete project |
| Roadblock-Stop | Document blocker |

**TDD Execution:** Phases execute autonomously. No interaction between phases.

---

## Instructions Format
```
TASK: [Brief description]
STEP 1: [File operation]
STEP 2: [Navigate/specify action]
STEP 3: [Add/modify code - COMPLETE]
STEP 4: [Context]
STEP 5: [Save]
STEP 6: [Run/test]
STEP 7: [Verify outcome]
STEP 8: [Report results]
```

**Requirements:** ONE code block | Numbered steps | Complete code | Exact paths | Verification steps

---

## Special Scenarios
- **Off Track:** Vibe-Abandon, create lessons learned
- **Early Evolution:** Generate requirements from limited context
- **Late Evolution:** Requirements capture existing implementation
- **Return to Vibe:** Discouraged; experimental code must pass tests

---

## Best Practices

### Vibe Phase
- Small iterations
- Run frequently
- Don't overthink
- Note what works
- Embrace messiness
- Fail fast

### Evolution Point
- Don't rush
- Be honest
- Think ahead
- Set clear goals
- Prioritize features

### Structured Phase
- Follow TDD rigorously
- Test existing code
- Refactor freely
- Update requirements
- Track progress

---

## When to Use
**Use Vibe-to-Structured:** Unclear requirements | New technology | Prototyping | Learning
**Use IDPF directly:** Clear requirements | Existing codebase | Quality-critical | Compliance

---

**End of Core Framework**
