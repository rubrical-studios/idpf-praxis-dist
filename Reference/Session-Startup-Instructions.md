# Session Startup
**Version:** 1.2
**Source:** Reference/Session-Startup-Instructions.md

---

## Startup Sequence

When starting a new session in this repository, perform these steps:

### 1. Acknowledge the Date
State the date from your environment information and proceed with startup. The user can correct if needed.

### 2. Read Framework Summary
Load the compact summary file for context:
```
Overview/Framework-Summary.md
```
This provides: Current versions and counts, Framework selection matrix, Skills registry, On-demand file references

### 3. Confirm Initialization
After the rules auto-load completes:
1. Report: Date, Framework version, Skill count, Specialists count
2. Display GitHub Workflow activation message (from 02-github-workflow.md)
3. Ask user what they would like to work on

### 4. Check Open Releases
Before proceeding with work, verify release context:
```bash
gh pmu release list
```
**If no open releases:**
```
No open releases found. Create one to start working:
  gh pmu release start --version "X.Y.Z"
```
**If releases exist, display them:**
```
Open releases:
  - v0.16.0 (branch: release/v0.16.0)
  - v0.15.1 (branch: patch/v0.15.1)
```

---

## On-Demand Documentation
Load detailed documentation only when needed:
| When Working On | Load File |
|-----------------|-----------|
| IDPF frameworks (Structured, Agile, Vibe, LTS) | Overview/Framework-Development.md |
| Testing frameworks | Overview/Framework-Testing.md |
| System Instructions or Domain Specialists | Overview/Framework-System-Instructions.md |
| Skills (creating, updating, reviewing) | Overview/Framework-Skills.md |
| Framework transitions or hybrid usage | Overview/Framework-Transitions.md |
| Complete reference (all details) | Overview/Framework-Overview.md |
| Skill creation rules | Assistant/Anti-Hallucination-Rules-for-Skill-Creation.md |
| PRD work | Assistant/Anti-Hallucination-Rules-for-PRD-Work.md |

---

## Post-Compact Behavior
Rules in `.claude/rules/` are automatically reloaded after compaction. No manual re-reading required.

---

**End of Session Startup**
