# Vibe-to-Structured Development Framework (Core)
**Version:** v0.30.2
**Type:** Core Framework (Platform-Agnostic)

## Terminology
1. **ASSISTANT**: AI assistant (Claude) in chat
2. **Claude Code**: Separate tool executing code changes
3. **Vibe Phase**: Exploratory development without formal requirements
4. **Structured Phase**: TDD cycles with documented requirements
5. **Evolution Point**: Transition from Vibe to Structured development

## Platform Selection
| Framework | Target | Best For |
|-----------|--------|----------|
| Web | Browsers, servers | Websites, APIs, SaaS |
| Desktop | Windows, macOS, Linux | Local apps, tools |
| Mobile | iOS, Android | Phone/tablet apps |
| Game | PC, consoles, web | Interactive games |
| Embedded | Microcontrollers, SBCs | IoT, hardware projects |
| Newbie | Any (simplified) | Learning, first projects |

## Claude Code Workflow
```
YOU ask ASSISTANT -> ASSISTANT provides TASK/STEP block -> YOU copy -> Claude Code executes -> YOU report results
```
**DO:** Copy entire code block, report results
**DON'T:** Execute manually, skip reporting

## Phase 1: VIBE PHASE
### Session Initialization
1. Verify Claude Code Setup
2. Declare Framework (Vibe-to-Structured Rev 2)
3. Establish Project Location
4. Identify Project Type
5. Ask Clarifying Questions
6. Suggest Starting Point
7. Display Vibe Commands
8. Wait for "Vibe-Start"

### Vibe Commands
* **"Vibe-Start"** - Begin exploration
* **"Try-This"** - Describe feature to try
* **"Show-Me"** - See current state
* **"That-Works"** - Feature good, next idea
* **"Undo-That"** - Remove last change
* **"Run-It"** - Test application
* **"Vibe-Status"** - Progress summary
* **"Vibe-End"** - Save snapshot, pause session
* **"Ready-to-Structure"** - Evolve to TDD
* **"Vibe-Abandon"** - Stop project

### Context Tracking
Track: files created, features implemented, technologies, patterns, problems, user preferences, architecture decisions.

## Phase 2: EVOLUTION POINT
**Triggers:** "Ready-to-Structure" command OR maturity detected (3-5 features, stable architecture)

**Evolution Target:** IDPF-Agile (sprints, user stories, iterative delivery)

### Evolution Process
1. Pause Development
2. Analyze Existing Code
3. Generate As-Built PRD (completed features marked DONE)
4. Organize into Epics
5. Add Acceptance Criteria
6. Estimate Story Points
7. Present to User
8. Save Backlog: `/backlog/product-backlog.md`
9. Begin Sprint Planning

## Phase 3: STRUCTURED PHASE
Follow IDPF-Agile with TDD RED-GREEN-REFACTOR cycles.

### Structured Commands
* **"Run-Tests"** - Execute test suite
* **"Show-Coverage"** - Display coverage
* **"Update-Requirements"** - Modify requirements
* **"Final-Commit-Create-PR"** - Complete project

## Instruction Format
```
TASK: [Description]
STEP 1: [Action]
STEP 2: [Action]
...
STEP N: [Report results]
```
**Requirements:** Single code block, numbered steps, complete code, exact paths, verification steps.

## Best Practices
**Vibe Phase:** Small iterations, run code frequently, don't overthink, note what works, embrace messiness
**Evolution Point:** Don't rush, be honest about state, plan testing, commit vibe work
**Structured Phase:** Follow TDD rigorously, test existing code, refactor freely, maintain quality

**End of Core Framework**
