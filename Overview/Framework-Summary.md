# Framework Summary
**Version:** v0.35.2
**Purpose:** Compact startup reference for framework developers
## Quick Reference
| Component | Count | Location |
|-----------|-------|----------|
| Development Frameworks | 2 | IDPF-Agile, IDPF-Vibe (7 variants) |
| Testing Frameworks | 7 | IDPF-Testing-Core + 6 specialized |
| Domain Specialists | 22 | 12 Base + 10 Pack |
| Core Instructions | 2 | Core-Developer-Instructions + Domain-Selection-Guide |
| Skills | 25 | Skills/ |
| Assistant Guidelines | 4 | Assistant/ |
## Current Versions
### Development Frameworks
| Framework | Revision | Type |
|-----------|----------|------|
| IDPF-Agile | 3 | Sprint-Based Development |
| IDPF-Vibe (Core) | 4.0 | Exploratory → Agile |
> **Note:** IDPF-PRD deprecated in v0.24, replaced by `create-prd` skill.
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
| playwright-setup | Testing Setup |
| codebase-analysis | Code Quality |
| electron-development | Desktop |
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
| Framework-Development.md | IDPF-Agile, Vibe details, create-prd skill |
| Framework-Testing.md | Testing-Core + 6 specialized frameworks |
| Framework-System-Instructions.md | Core + 22 Domain Specialists |
| Framework-Skills.md | All 25 skills with descriptions |
| Framework-Transitions.md | Transition matrix, diagrams, hybrid usage |
| Framework-Overview.md | Complete reference (all sections) |
---
**End of Framework Summary**
