# Framework Transitions Reference
**Version:** 0.17.0
**Source:** Overview/Framework-Transitions.md
**Purpose:** Transition rules, diagrams, hybrid usage

---

## Transition Diagram
```
VIBE ──► AGILE (Terminal)
```

**Invalid:** Agile → Vibe

---

## Valid Transitions

| From | To | When |
|------|----|------|
| Vibe | Agile | Exploration complete, requirements understood |

---

## Transition Principles

**Preserved:**
- Code, tests, Git history
- TDD methodology
- Technical architecture
- Dependencies

**Changes:**
- Documentation format (informal → User Stories)
- Workflow structure (conversational → Sprints)
- Planning granularity (ad-hoc → Stories/Epics)
- Progress tracking (informal → Velocity)

**Best Practices:**
1. Complete current work
2. All tests green
3. Commit WIP
4. Create transition docs
5. Generate new artifacts (backlog)

---

## Invalid Transitions

| Invalid | Rationale |
|---------|-----------|
| Agile → Vibe | Defeats structured discipline, abandons testing |

---

## Vibe → Agile

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
- No transitions FROM Agile
- Projects continue until completion
- New projects can start with Vibe or directly with Agile

---

## Hybrid Usage

**Valid Scenarios:**
- New feature exploration (Vibe) + Main product (Agile)
- Product A in development (Agile) + Product B exploring (Vibe)

**Guidelines:**
- Document framework per concern
- Separate documentation
- Clear boundaries
- Never mix for same concern

---

## Selection Matrix

| Project Type | Framework | Evolution |
|--------------|-----------|-----------|
| Evolving requirements | Agile | Terminal |
| Exploration needed | Vibe | → Agile |
| Separate test repo | Testing-Core | Use Agile |

---

## Integration Architecture

```
System Instructions (WHO)
    ↓
Framework (WHAT)
    ↓
Skills (TOOLS)
    ↓
Guidelines (HOW WELL)
```

**Common Elements:**
- TDD: RED-GREEN-REFACTOR
- Claude Code: Single block, STEP format
- Context preservation
- Git workflows

---

**End of Framework Transitions Reference**
