# Session Startup Instructions
**Version:** v0.19.1
**Purpose:** Standard initialization procedure for AI assistant sessions

---

## Rules Auto-Loading (v2.9+)
Rules auto-load from `.claude/rules/`:
| File | Content |
|------|---------|
| `01-anti-hallucination.md` | Framework development quality |
| `02-github-workflow.md` | GitHub issue management |
| `03-session-startup.md` | Startup procedure |

---

## Startup Sequence

### 1. Acknowledge Date
State date from environment, proceed with startup.

### 2. Read Framework Summary
Load `Overview/Framework-Summary.md` for context (versions, counts, skills).

### 3. Confirm Initialization
Report: Date, Framework version, Skill count, Specialists count, GitHub Workflow status.
Ask: What would you like to work on?

### 4. Check Open Releases
```bash
gh pmu release list
```
If none: Suggest `gh pmu release start --version "X.Y.Z"`

---

## Post-Compact Behavior
Rules auto-reload. No re-reading required.

---

## On-Demand Loading

| Working On | Load File |
|------------|-----------|
| IDPF frameworks | `Overview/Framework-Development.md` |
| Testing frameworks | `Overview/Framework-Testing.md` |
| System Instructions | `Overview/Framework-System-Instructions.md` |
| Skills | `Overview/Framework-Skills.md` |
| Transitions | `Overview/Framework-Transitions.md` |
| Complete reference | `Overview/Framework-Overview.md` |
| Skill creation | `Assistant/Anti-Hallucination-Rules-for-Skill-Creation.md` |
| PRD work | `Assistant/Anti-Hallucination-Rules-for-PRD-Work.md` |

---

**End of Session Startup Instructions**
