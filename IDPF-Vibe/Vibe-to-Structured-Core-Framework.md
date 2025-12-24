# Vibe-to-Structured Development Framework (Core)
**Version:** v0.15.0
**Type:** Core Framework (Platform-Agnostic)

---

## Purpose
Core framework for Vibe-to-Structured methodology. Platform-specific frameworks extend this:
- Desktop, Mobile, Web, Game, Embedded, Newbie

## Platform Selection
| Target | Framework |
|--------|-----------|
| Browser, servers | Web |
| Windows, macOS, Linux apps | Desktop |
| iOS, Android | Mobile |
| Games (Unity, Unreal, Godot) | Game |
| Arduino, ESP32, RPi | Embedded |
| Learning, beginners | Newbie |

## Three-Phase Workflow
```
VIBE PHASE → EVOLUTION POINT → STRUCTURED PHASE
```

## Phase 1: VIBE PHASE

### Initialization
1. Verify Claude Code setup
2. Declare framework revision
3. Establish project location
4. Identify project type
5. Ask clarifying questions
6. Wait for "Vibe-Start"

### Philosophy
- No formal requirements (yet)
- Natural language descriptions
- Rapid iteration without strict TDD
- Focus on exploration
- Build working prototypes quickly

### Commands
| Command | Purpose |
|---------|---------|
| `Vibe-Start` | Begin exploration |
| `Try-This` | Describe feature to try |
| `That-Works` | Feature good, next idea |
| `Undo-That` | Remove last change |
| `Run-It` | Run/test application |
| `Vibe-Status` | Summarize progress |
| `Vibe-End` | Save snapshot, end session |
| `Ready-to-Structure` | Trigger evolution |
| `Vibe-Abandon` | Stop project |

## Phase 2: EVOLUTION POINT

### Triggers
- User issues "Ready-to-Structure"
- ASSISTANT detects maturity (3-5 features working, stable architecture)

### Evolution Options
**Structured (IDPF-Structured):** Fixed scope, solo/small team, linear development
**Agile (IDPF-Agile):** Large feature set, prioritization, sprints

### Process
1. Pause development
2. Analyze what exists
3. Generate requirements/backlog
4. Propose test strategy
5. Present to user, refine
6. Save document
7. Transition to chosen framework

## Phase 3: STRUCTURED PHASE

Follows **IDPF-Structured** (for Structured evolution) or **IDPF-Agile** (for Agile evolution):
- All new features: TDD RED-GREEN-REFACTOR
- Add tests for existing vibe-phase code
- Full test suite at milestones
- All standard commands apply

## Instructions Format
```
TASK: [description]
STEP 1: [Open/create file]
STEP 2: [Navigate]
STEP 3: [Code - COMPLETE with indentation]
STEP 4: [Save]
STEP 5: [Run/test]
STEP 6: [Verify]
STEP 7: [Report]
```

## When to Use
**Vibe-to-Structured:** Unclear requirements, exploring, prototyping, learning
**Structured directly:** Clear requirements, existing codebase, quality-critical
**Don't use:** Safety-critical, production without staging, fixed scope

---

**End of Core Framework**
