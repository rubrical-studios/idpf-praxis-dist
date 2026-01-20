# Framework Transitions Reference
**Version:** v0.28.0
**Purpose:** Transition rules, diagrams, hybrid usage
---
## Transition Matrix
### Workflow Diagram
```
  VIBE ─────────────► AGILE (Terminal)
  Exploration         Sprint-Based Development
  - Rapid prototyping - User Stories
  - Requirements emerge- Sprints + Velocity
```
### Valid Transitions
| From | To | When |
|------|----|----- |
| Vibe | Agile | Exploration complete, requirements understood |
### Invalid Transitions
**Never:** Agile -> Vibe
**Rationale:** Quality standards should never decrease.
---
## Transition Principles
### Always Preserved
- All code and tests
- Git repository and history
- TDD methodology (RED-GREEN-REFACTOR)
- Testing framework and suite
- Architecture decisions
- Dependencies and configurations
### What Changes
- Documentation format (informal -> User Stories)
- Workflow structure (conversational -> Sprints)
- Planning granularity (ad-hoc -> Stories/Epics)
- Progress tracking (informal -> Velocity)
### Best Practices
1. Complete current work before transitioning
2. Ensure all tests pass (100% green)
3. Commit all work-in-progress
4. Create transition documentation
5. Archive old workflow artifacts
6. Generate new framework artifacts (backlog)
7. Communicate transition to stakeholders
---
## Framework-Specific Transitions
### Vibe -> Agile
**Preserves:** Code, tests, Git history
**Changes:** Informal -> User Stories, Ad-hoc -> Sprints, Add velocity tracking
**Steps:**
1. Document discovered requirements
2. Create initial backlog with epics
3. Break epics into stories
4. Plan first sprint
5. Continue with TDD discipline
### Agile as Terminal State
- No transitions FROM Agile
- Projects continue until completion
- Maintenance continues in Agile
---
## Simultaneous Framework Usage
### Valid Hybrid Scenarios
**Example 1: Exploration + Production**
- New feature: IDPF-Vibe (separate branch)
- Main product: IDPF-Agile
**Example 2: Multiple Products**
- Product A: IDPF-Agile
- Product B (exploration): IDPF-Vibe
- Separate repositories
### Guidelines
- Document which framework governs which concern
- Separate documentation per framework scope
- Maintain clear boundaries
- Never mix frameworks for same feature
---
## Integration Architecture
### Hierarchy
```
System Instructions (WHO + EXPERTISE)
    |
Framework Selection (WHAT process)
    |
Skills (TOOLS)
    |
Assistant Guidelines (HOW WELL)
```
### Selection Criteria
**IDPF-Agile:** Evolving requirements, iterative delivery, velocity tracking, team collaboration
**IDPF-Vibe:** Unclear requirements, exploration needed, prototyping, evolves to Agile
### Common Elements
**TDD:** RED-GREEN-REFACTOR across all frameworks
**Communication:** Single code block format, complete runnable code, exact paths
**Context:** Full awareness, cumulative conversation, session continuity
**Git:** GitFlow, GitHub Flow, trunk-based, Conventional Commits
---
## Selection Matrix
| Project Type | Starting Point | Evolution |
|--------------|---------------|-----------|
| Evolving requirements | IDPF-Agile | Terminal |
| Unclear requirements | IDPF-Vibe | -> Agile |
| Separate test repo | IDPF-Testing-Core | Use Agile |
---
**End of Framework Transitions Reference**
