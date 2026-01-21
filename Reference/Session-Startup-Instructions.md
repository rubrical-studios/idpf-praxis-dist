# Session Startup Instructions
**Version:** v0.29.3
**Purpose:** Standard initialization procedure for AI assistant sessions
---
## Rules Auto-Loading (v2.9+)
Essential rules auto-load from `.claude/rules/`:
| Rule File | Content | Source |
|-----------|---------|--------|
| `01-anti-hallucination.md` | Framework development quality rules | `Assistant/Anti-Hallucination-Rules-for-Framework-Development.md` |
| `02-github-workflow.md` | GitHub issue management integration | `Reference/GitHub-Workflow.md` |
| `03-session-startup.md` | Startup procedure and on-demand loading | Generated |
**Benefits:** No explicit file reads at startup, rules persist after compaction, simplified initialization.
---
## Startup Sequence
### 1. Acknowledge the Date
State the date from environment information and proceed. If user corrects, use their provided date.
### 2. Read Framework Summary (On-Demand)
```
Overview/Framework-Summary.md
```
Provides: current versions/counts, framework selection matrix, skills registry, on-demand file references.
### 2a. Load Process Framework (Self-Hosted)
**Applies when:** `framework-config.json` contains `selfHosted: true`
1. Read `framework-config.json` for `processFramework` value
2. Load core file: `IDPF-Agile` → `.min-mirror/IDPF-Agile/Agile-Core.md`, `IDPF-Vibe` → `.min-mirror/IDPF-Vibe/Vibe-Core.md`
3. Report: "Process Framework: {name} (self-hosted)"
### 3. Check Project Charter (User Projects)
**Note:** Applies to user projects, not idpf-praxis framework repository.
1. Check for opt-out: `test -f .no-charter` - if exists, bypass charter prompting
2. Check for CHARTER.md:
   - **If exists:** Read and display brief summary (vision, current focus)
   - **If not exists:** Prompt with options: (1) Create charter now, (2) Skip for session, (3) Never ask again
**Token budget:** Only CHARTER.md loaded at startup (~150-200 tokens). Inception/ artifacts loaded on-demand.
### 4. Confirm Initialization
Report: Date, Framework version, Skill count, Specialists count, Process framework (if self-hosted), GitHub Workflow status, Charter status
Ask user what they would like to work on.
---
## Post-Compact Behavior
**No re-reading required.** Rules in `.claude/rules/` auto-reload after compaction.
---
## On-Demand Documentation Loading
| When Working On | Load File |
|-----------------|-----------|
| IDPF frameworks | `Overview/Framework-Development.md` |
| Testing frameworks | `Overview/Framework-Testing.md` |
| System Instructions or Domain Specialists | `Overview/Framework-System-Instructions.md` |
| Skills (creating, updating, reviewing) | `Overview/Framework-Skills.md` |
| Framework transitions or hybrid usage | `Overview/Framework-Transitions.md` |
| Complete reference | `Overview/Framework-Overview.md` |
| Skill creation rules | `Assistant/Anti-Hallucination-Rules-for-Skill-Creation.md` |
| PRD work | `Assistant/Anti-Hallucination-Rules-for-PRD-Work.md` |
---
## Token Reduction Summary
| Startup Type | Approach | Estimated Tokens |
|--------------|----------|------------------|
| Old (v2.8) | Explicit file reads | ~1500 |
| New (v2.9) | Rules auto-load | ~800 |
| Reduction | | ~47% |
---
## Note for Maintainers
`.claude/rules/` built from source files at release time:
- Source files in `Assistant/` and `Reference/`
- Rules built in `/prepare-release` Phase 2d
- Source files are single source of truth
---
**End of Session Startup Instructions**
