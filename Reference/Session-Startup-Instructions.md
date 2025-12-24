# Session Startup Instructions
**Version:** v0.5.0

---

## Rules Auto-Loading
Rules in `.claude/rules/` load automatically:
- `01-anti-hallucination.md` - Framework development rules
- `02-github-workflow.md` - GitHub issue management
- `03-session-startup.md` - Startup procedure

No explicit file reads required at startup. Rules persist after compaction.

## Startup Sequence

### 1. Acknowledge the Date
State date from environment. User can correct if needed.

### 2. Read Framework Summary
Load `Overview/Framework-Summary.md` for context (versions, counts, matrix).

### 3. Confirm Initialization
Report: Date, Framework version, Skill count, Specialists count, GitHub Workflow activation.
Ask user what they would like to work on.

### 4. Check Open Releases
```bash
gh pmu release list
```
If no releases: `gh pmu release start --version "X.Y.Z"`

## Post-Compact Behavior
Rules auto-reload. No re-reading required.

## On-Demand Documentation

| When Working On | Load File |
|-----------------|-----------|
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
