# Framework Summary
**Version:** v0.29.0
**Purpose:** Compact startup reference
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
| Framework | Revision | Type |
|-----------|----------|------|
| IDPF-Agile | 3 | Sprint-Based Development |
| IDPF-Vibe (Core) | 4.0 | Exploratory to Agile |
> **Note:** IDPF-PRD deprecated v0.24; use `create-prd` skill.
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
| Skill | Category |
|-------|----------|
| tdd-red-phase | TDD |
| tdd-green-phase | TDD |
| tdd-refactor-phase | TDD |
| tdd-failure-recovery | TDD |
| test-writing-patterns | TDD |
| bdd-writing | BDD |
| extract-prd | PRD |
| create-prd | PRD |
| anti-pattern-analysis | Code Quality |
| uml-generation | Code Quality |
| flask-setup | Beginner Setup |
| sinatra-setup | Beginner Setup |
| common-errors | Beginner Support |
| sqlite-integration | Beginner Support |
| beginner-testing | Beginner Support |
| postgresql-integration | Database |
| migration-patterns | Database |
| property-based-testing | Advanced Testing |
| mutation-testing | Advanced Testing |
| api-versioning | Architecture |
| error-handling-patterns | Architecture |
| ci-cd-pipeline-design | DevOps |
---
## Framework Selection Matrix
| Project Type | Starting Point | Evolution Path |
|--------------|---------------|----------------|
| Evolving requirements, sprints | IDPF-Agile | Terminal |
| Unclear requirements, exploration | IDPF-Vibe | Agile |
| Separate test repository | IDPF-Testing-Core | Use Agile |
---
## Core Principle
- **System Instructions**: WHO the assistant is
- **Frameworks**: WHAT process to follow
- **Skills**: Reusable capabilities
- **Assistant Guidelines**: Accuracy and quality
---
## Valid Framework Transitions
```
VIBE --> AGILE (Terminal)
```
**Invalid:** Agile to Vibe (quality standards never decrease)
---
## Detailed Documentation
| File | Content |
|------|---------|
| Framework-Development.md | Agile, Vibe details, create-prd |
| Framework-Testing.md | Testing-Core + 6 specialized |
| Framework-System-Instructions.md | Core + 23 Domain Specialists |
| Framework-Skills.md | All 22 skills |
| Framework-Transitions.md | Transition matrix, hybrid usage |
| Framework-Overview.md | Complete reference |
---
**End of Framework Summary**
