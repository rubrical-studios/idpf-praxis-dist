# Framework Summary
**Version:** 0.21.1
**Source:** Overview/Framework-Summary.md
**Purpose:** Compact startup reference for framework developers

---

## Quick Reference

| Component | Count | Location |
|-----------|-------|----------|
| Development Frameworks | 2 | IDPF-Agile, IDPF-Vibe (7 variants) |
| Testing Frameworks | 7 | IDPF-Testing-Core + 6 specialized |
| Domain Specialists | 23 | 12 Base + 10 Pack + 1 PRD |
| Core Instructions | 2 | Core-Developer-Instructions + Domain-Selection-Guide |
| Skills | 22 | Skills/ |
| Assistant Guidelines | 4 | Assistant/ |

---

## Current Versions

### Development Frameworks
| Framework | Rev | Type |
|-----------|-----|------|
| IDPF-PRD | 3 | Requirements Engineering |
| IDPF-Agile | 3 | Sprint-Based Development |
| IDPF-Vibe (Core) | 4.0 | Exploratory → Agile |

### Testing Frameworks
| Framework | Rev | Extends |
|-----------|-----|---------|
| IDPF-Testing-Core | 1 | (Foundation) |
| IDPF-QA-Automation | 1 | Testing-Core |
| IDPF-Performance | 1 | Testing-Core |
| IDPF-Security | 1 | Testing-Core |
| IDPF-Accessibility | 1 | Testing-Core |
| IDPF-Chaos | 1 | Testing-Core |
| IDPF-Contract-Testing | 1 | Testing-Core |

### Skills Registry
| Skill | Category |
|-------|----------|
| tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns | TDD |
| bdd-writing | BDD |
| extract-prd, promote-to-prd | PRD |
| anti-pattern-analysis, uml-generation | Code Quality |
| flask-setup, sinatra-setup | Beginner Setup |
| common-errors, sqlite-integration, beginner-testing | Beginner Support |
| postgresql-integration, migration-patterns | Database |
| property-based-testing, mutation-testing | Advanced Testing |
| api-versioning, error-handling-patterns | Architecture |
| ci-cd-pipeline-design | DevOps |

---

## Framework Selection

| Project Type | Start | Evolution |
|--------------|-------|-----------|
| Evolving requirements | IDPF-Agile | Terminal |
| Exploration needed | IDPF-Vibe | → Agile |
| Separate test repo | IDPF-Testing-Core | Use Agile |

---

## Core Principle

**System Instructions** = WHO (identity/expertise)
**Frameworks** = WHAT (process)
**Skills** = TOOLS (capabilities)
**Guidelines** = HOW WELL (quality)

---

## Valid Transitions

```
VIBE ──► AGILE (Terminal)
```

**Invalid:** Agile → Vibe (quality standards should never decrease)

---

## Detailed Documentation

| File | Content |
|------|---------|
| Framework-Development.md | IDPF-PRD, Agile, Vibe details |
| Framework-Testing.md | Testing-Core + 6 specialized frameworks |
| Framework-System-Instructions.md | Core + 23 Domain Specialists |
| Framework-Skills.md | All 21 skills |
| Framework-Transitions.md | Transition matrix, hybrid usage |
| Framework-Overview.md | Complete reference |

---

**End of Framework Summary**
