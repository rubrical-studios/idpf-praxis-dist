# Framework Transitions Reference
**Version:** v0.2.0

---

## Transition Diagram

```
VIBE ──► STRUCTURED ──► LTS
  │          ↑↓
  └────► AGILE ────────► LTS

Invalid: Structured/Agile → Vibe, LTS → Any
```

---

## Valid Transitions

| From | To | When |
|------|-----|------|
| Vibe | Structured | Fixed scope emerged, solo/small team |
| Vibe | Agile | Large feature set, need sprints |
| Structured | Agile | Scope expanded, need iterative delivery |
| Agile | Structured | Scope narrowed, sprint overhead not justified |
| Structured | LTS | Production ready, maintenance mode |
| Agile | LTS | Final sprint complete, backlog frozen |

---

## Transition Principles

**Always Preserved:**
- Code, tests, Git history
- TDD methodology (RED-GREEN-REFACTOR)
- Testing framework, architecture, dependencies

**What Changes:**
- Documentation format (Requirements ↔ User Stories ↔ Bug Triage)
- Workflow structure (Linear ↔ Sprints ↔ Maintenance)
- Progress tracking (Completion ↔ Velocity ↔ Regression Prevention)

**Best Practices:**
1. Complete current work unit before transitioning
2. Ensure all tests pass (100% green)
3. Commit all work-in-progress
4. Create transition documentation
5. Generate new framework artifacts

---

## Invalid Transitions

- ❌ Structured → Vibe (defeats discipline)
- ❌ Agile → Vibe (defeats discipline)
- ❌ LTS → Any (LTS is terminal)

**Rationale:** Quality standards never decrease. LTS is end-of-lifecycle.

---

## Framework-Specific Transitions

### Structured → Agile
**Changes:** Requirements → User Stories, Linear → Sprints, Add velocity

### Structured → LTS
**Changes:** New features forbidden, Requirements → Bug triage

### Agile → Structured
**Changes:** User Stories → Requirements, Sprints → Linear

### Agile → LTS
**Changes:** User Stories → Bug reports, Sprint Planning → LTS triage

### LTS Transitions
- LTS is terminal - no transitions FROM LTS
- New development requires new major version

---

## Simultaneous Framework Usage

**Valid Hybrid Scenarios:**
- Backend (Structured) + Frontend (Agile) - separate concerns
- Core Platform (LTS) + Extensions (Agile) - separate repos
- Production v2.x (LTS) + Next Version v3.x (Vibe/Agile)

**Guidelines:**
- Document which framework governs which concern
- Maintain clear boundaries
- Never mix frameworks for same feature

---

## Selection Criteria

| Use Case | Framework |
|----------|-----------|
| Fixed requirements, clear scope | IDPF-Structured |
| Evolving requirements, sprints needed | IDPF-Agile |
| Unclear requirements, exploration | IDPF-Vibe |
| Production maintenance only | IDPF-LTS |
| Separate test repository | IDPF-Testing-Core |

---

**End of Framework Transitions Reference**
