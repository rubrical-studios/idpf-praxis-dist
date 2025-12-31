# Framework Development Reference
**Version:** v0.19.0
**Source:** Overview/Framework-Development.md
**Purpose:** Detailed reference for IDPF development frameworks

---

## IDPF-PRD (Pre-Development)
**Location:** `IDPF-PRD/IDPF-PRD.md` | **Type:** Requirements Engineering

**Auto-Template Selection:**
| Framework | Template |
|-----------|----------|
| IDPF-Agile | PRD-Agile-Lightweight |

**Forward Path:** Discovery → Elicitation → Specification → Generation
**Reverse Path:** Analyze → Extract → Refine → Generate

**Commands:**
- Forward: PRD-Start, PRD-Status, PRD-Next, Generate-PRD, Export-PRD
- Reverse: Reverse-PRD-Start, Reverse-PRD-Analyze, Reverse-PRD-Extract

**Handoff:** PRD → Agile (Epics/Stories) | Skip → Vibe

---

## IDPF-Agile
**Location:** `IDPF-Agile/Agile-Driven Development Framework.md`
**Type:** Sprint-Based Development

**Terminology:**
- Product Backlog: All stories
- Sprint Backlog: Current sprint stories
- Story Points: Fibonacci (1,2,3,5,8,13,21)
- Velocity: Points per sprint

**Workflow:** Backlog Creation → Sprint Planning → Story Development (TDD) → Review → Retrospective

**User Story Format:**
```
As a [user type] I want [goal] So that [benefit]
Acceptance Criteria: - [ ] ...
Story Points: [n] | Priority: [H/M/L] | Status: [...]
```

**Commands:**
- Backlog: Create-Backlog, Add-Story, Refine-Story, Split-Story
- Sprint: Plan-Sprint, Start-Story, Story-Complete, Sprint-Retro
- Dev: Done-Next-Step, Rollback-Previous-Step, Run-Tests
- Release: Open-Release, Prepare-Release, Close-Release

**When to Use:** Evolving requirements, iterative delivery, velocity tracking

---

## IDPF-Vibe
**Location:** `IDPF-Vibe/` | **Core Rev:** 4.0

**Architecture:**
- Core: Platform-agnostic workflow
- Platforms: Desktop, Mobile, Web, Game, Embedded, Newbie

**Three-Phase Workflow:**

**Phase 1 (Vibe):** Exploratory, no formal requirements
- Commands: Vibe-Start, Try-This, Show-Me, That-Works, Undo-That, Run-It

**Phase 2 (Evolution):** User says "Ready-to-Structure"
- Evolves to IDPF-Agile: Generates as-built Product Backlog

**Phase 3 (Agile):** TDD with IDPF-Agile framework

**Platform Coverage:**
| Platform | Technologies |
|----------|-------------|
| Desktop | Python, Ruby, Node/Electron, C#, Rust |
| Mobile | Swift, Kotlin, React Native, Flutter |
| Web | React, Vue, Express, Flask, Django |
| Game | Godot, Unity, Unreal, Phaser |
| Embedded | Arduino, ESP32, STM32, Wokwi, QEMU |
| Newbie | Flask/Sinatra, vanilla HTML/CSS/JS, SQLite |

---

## Framework Transition Flow

```
IDPF-Vibe → IDPF-Agile (terminal)
```

**Transition Path:**
- **IDPF-Vibe** (exploratory) evolves to **IDPF-Agile** (structured)
- **IDPF-Agile** is terminal - projects remain in Agile through completion

---

**End of Framework Development Reference**
