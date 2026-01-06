# Framework Transitions Reference
**Version:** v0.22.0
**Source:** Overview/Framework-Transitions.md
---
## Framework Transition Matrix
### Workflow Diagram
**Development Path:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌───────┐                   ┌───────────┐                             │
│   │ VIBE  │──────────────────►│   AGILE   │                             │
│   │       │                   │ (Terminal)│                             │
│   └───────┘                   └───────────┘                             │
│                                                                         │
│   Exploration                 Sprint-Based Development                  │
│   - Conversational dev        - User Stories                            │
│   - Rapid prototyping         - Sprints + Velocity                      │
│   - Requirements emerge       - Formal workflows                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Legend:  ───► Valid transition
```
**Invalid Transition:**
```
     ┌───────────┐                   ┌───────────┐
     │   AGILE   │──────── ✗ ───────►│   VIBE    │
     └───────────┘                   └───────────┘

     Rationale: Quality standards should never decrease.
                Returning to Vibe abandons structured discipline.
```
---
## Valid Transitions
| From Framework | To Framework | When to Transition |
|----------------|--------------|-------------------|
| **Vibe** | **Agile** | Exploration complete, requirements understood, ready for structured development |
---
## Transition Principles
### Always Preserved
- All existing code and tests
- Git repository and commit history
- TDD methodology (RED-GREEN-REFACTOR)
- Testing framework and test suite
- Technical architecture decisions
- Dependencies and configurations
### What Changes
- Documentation format (informal → User Stories)
- Workflow structure (conversational → Sprints)
- Planning granularity (ad-hoc → Stories/Epics)
- Progress tracking (informal → Velocity)
### Best Practices
1. Complete current work unit before transitioning
2. Ensure all tests pass (100% green)
3. Commit all work-in-progress
4. Create transition documentation (preserve context)
5. Archive old workflow artifacts
6. Generate new framework artifacts (backlog)
7. Communicate transition to stakeholders (if applicable)
---
## Invalid Transitions
- **Never:** Agile → Vibe (defeats structured discipline)
- **Rationale:** Quality standards should never decrease
---
## Framework-Specific Transitions
### Vibe → Agile
**When:** Exploration complete, requirements understood
**Preserves:** Code, tests, Git history
**Changes:**
- Informal dev → User Stories
- Ad-hoc → Sprints
- Add velocity tracking
- Formalize requirements as epics/stories
**Steps:**
1. Document discovered requirements
2. Create initial backlog with epics
3. Break epics into stories
4. Plan first sprint
5. Continue with TDD discipline
### Agile as Terminal State
- No transitions FROM Agile to any other framework
- Projects in Agile continue until completion
- Maintenance work continues within Agile framework
**Starting Fresh:**
- New projects can start with Vibe for exploration
- New projects can start directly with Agile if requirements are clear
---
## Simultaneous Framework Usage
### Valid Hybrid Scenarios
**Exploration + Production:**
- New feature exploration: IDPF-Vibe
- Main product development: IDPF-Agile
- Separate branches or feature flags per concern
**Multiple Products:**
- Product A in active development: IDPF-Agile
- Product B in exploration phase: IDPF-Vibe
- Separate repositories per product
### Guidelines
- Clearly document which framework governs which concern
- Use separate documentation for each framework scope
- Maintain clear boundaries between framework contexts
- Never mix frameworks for same concern/feature
- Communicate framework assignment to all team members
---
## Framework Integration Architecture
### Dependency Hierarchy
```
System Instructions (REQUIRED foundation - WHO + EXPERTISE)
    ↓
Framework Selection (WHAT process to follow)
    ↓
Skills (TOOLS for specific capabilities)
    ↓
Assistant Guidelines (HOW WELL - quality control)
```
### Selection Criteria
**Use IDPF-Agile when:**
- Building products with evolving requirements
- Iterative delivery with regular feedback
- Feature prioritization based on user value
- Medium to large projects
- Velocity tracking and predictability needed
- Team collaboration requires sprint structure
- Ready for structured development process
**Use IDPF-Vibe when:**
- Starting with unclear requirements
- Need exploration phase first
- Prototyping before formalizing
- Requirements will emerge from experimentation
- Plan to evolve to Agile afterward
### Common Elements Across Frameworks
**TDD Methodology:** All frameworks use RED-GREEN-REFACTOR cycles, identical test-writing discipline, same verification requirements, skills invoked at appropriate TDD phases.
**Claude Code Communication:** Single code block format (numbered STEP format), complete runnable code with no placeholders, exact file paths and verification steps, report results back to assistant, two-tool workflow (ASSISTANT + Claude Code + User).
**Context Preservation:** Full awareness of previous steps and decisions, cumulative conversation context, reference previous implementations naturally, maintain session continuity.
**Git Workflows:** All frameworks support GitFlow, GitHub Flow, trunk-based; Conventional Commits; PR creation and code reviews; branch management strategies.
---
## Framework Selection Matrix
| Project Type | Starting Point | Evolution Path | Target Outcome |
|--------------|---------------|----------------|----------------|
| Evolving requirements, sprints | IDPF-Agile | Terminal | Sprint-based delivery |
| Unclear requirements, exploration | IDPF-Vibe | → Agile | Discovered requirements + TDD |
| Separate test repository | IDPF-Testing-Core | Use Agile for test dev | Test automation codebase |
---
**End of Framework Transitions Reference**
