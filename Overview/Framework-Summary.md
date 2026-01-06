# Framework Summary
**Version:** 0.22.0
**Source:** Overview/Framework-Summary.md

---

**Purpose:** Compact startup reference for framework developers

## Quick Reference
| Component | Count | Location |
|-----------|-------|----------|
| Development Frameworks | 2 | IDPF-Agile, IDPF-Vibe (7 variants) |
| Testing Frameworks | 7 | IDPF-Testing-Core + 6 specialized |
| Domain Specialists | 23 | 12 Base + 10 Pack + 1 PRD |
| Core Instructions | 2 | Core-Developer-Instructions + Domain-Selection-Guide |
| Skills | 22 | Skills/ |
| Assistant Guidelines | 4 | Assistant/ |

## Current Versions
### Development Frameworks
| Framework | Revision | Type |
|-----------|----------|------|
| IDPF-PRD | 3 | Requirements Engineering |
| IDPF-Agile | 3 | Sprint-Based Development |
| IDPF-Vibe (Core) | 4.0 | Exploratory → Agile |

### Testing Frameworks
| Framework | Revision | Extends |
|-----------|----------|---------|
| IDPF-Testing-Core | 1 | (Foundation) |
| IDPF-QA-Automation | 1 | Testing-Core |
| IDPF-Performance | 1 | Testing-Core |
| IDPF-Security | 1 | Testing-Core |
| IDPF-Accessibility | 1 | Testing-Core |
| IDPF-Chaos | 1 | Testing-Core |
| IDPF-Contract-Testing | 1 | Testing-Core |

### Skills Registry
| Skill | Version | Category |
|-------|---------|----------|
| tdd-red-phase | 0.17.0 | TDD |
| tdd-green-phase | 0.17.0 | TDD |
| tdd-refactor-phase | 0.17.0 | TDD |
| tdd-failure-recovery | 0.17.0 | TDD |
| test-writing-patterns | 0.17.0 | TDD |
| bdd-writing | 0.17.0 | BDD |
| extract-prd | 0.17.0 | PRD |
| promote-to-prd | 0.17.0 | PRD |
| anti-pattern-analysis | 0.17.0 | Code Quality |
| uml-generation | 0.17.0 | Code Quality |
| flask-setup | 0.17.0 | Beginner Setup |
| sinatra-setup | 0.17.0 | Beginner Setup |
| common-errors | 0.17.0 | Beginner Support |
| sqlite-integration | 0.17.0 | Beginner Support |
| beginner-testing | 0.17.0 | Beginner Support |
| postgresql-integration | 0.17.0 | Database |
| migration-patterns | 0.17.0 | Database |
| property-based-testing | 0.17.0 | Advanced Testing |
| mutation-testing | 0.17.0 | Advanced Testing |
| api-versioning | 0.17.0 | Architecture |
| error-handling-patterns | 0.17.0 | Architecture |
| ci-cd-pipeline-design | 0.17.0 | DevOps |

## Framework Selection Matrix
| Project Type | Starting Point | Evolution Path |
|--------------|---------------|----------------|
| Evolving requirements, sprints | IDPF-Agile | Terminal |
| Unclear requirements, exploration | IDPF-Vibe | → Agile |
| Separate test repository | IDPF-Testing-Core | Use Agile |

## Core Principle
**System Instructions** define WHO the assistant is
**Frameworks** define WHAT process to follow
**Skills** provide reusable capabilities
**Assistant Guidelines** ensure accuracy and quality

## Valid Framework Transitions
```
VIBE ──► AGILE (Terminal)
```
**Invalid:** Agile → Vibe (quality standards should never decrease)

## Detailed Documentation
| File | Content |
|------|---------|
| Framework-Development.md | IDPF-PRD, Agile, Vibe details |
| Framework-Testing.md | Testing-Core + 6 specialized frameworks |
| Framework-System-Instructions.md | Core + 23 Domain Specialists |
| Framework-Skills.md | All 22 skills with descriptions |
| Framework-Transitions.md | Transition matrix, diagrams, hybrid usage |
| Framework-Overview.md | Complete reference (all sections) |

---

**End of Framework Summary**
