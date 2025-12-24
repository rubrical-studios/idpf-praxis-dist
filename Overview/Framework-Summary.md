# Framework Summary
**Version:** v0.2.0

---

**Purpose:** Compact startup reference for framework developers

## Quick Reference

| Component | Count | Location |
|-----------|-------|----------|
| Development Frameworks | 4 | IDPF-Structured, IDPF-Agile, IDPF-Vibe (7 variants), IDPF-LTS |
| Testing Frameworks | 7 | IDPF-Testing-Core + 6 specialized |
| System Instructions | 23 Domain + 1 Core + 1 Legacy + Vibe Agent | System-Instructions/ |
| Skills | 21 | Skills/ |
| Assistant Guidelines | 4 | Assistant/ |

## Current Versions

### Development Frameworks

| Framework | Revision | Type |
|-----------|----------|------|
| IDPF-PRD | 3 | Requirements Engineering |
| IDPF-Structured | 9 | TDD with Fixed Requirements |
| IDPF-Agile | 3 | Sprint-Based Development |
| IDPF-Vibe (Core) | 4.0 | Exploratory → Structured |
| IDPF-LTS | 1 | Production Maintenance |

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
| tdd-red-phase | 1.0.0 | TDD |
| tdd-green-phase | 1.0.0 | TDD |
| tdd-refactor-phase | 1.0.0 | TDD |
| tdd-failure-recovery | 1.0.0 | TDD |
| test-writing-patterns | 1.0.0 | TDD |
| bdd-writing | 1.0.0 | BDD |
| extract-prd | 1.2.0 | PRD |
| anti-pattern-analysis | 1.0.0 | Code Quality |
| uml-generation | 1.0.0 | Code Quality |
| flask-setup | 1.0.0 | Beginner Setup |
| sinatra-setup | 1.0.0 | Beginner Setup |
| common-errors | 1.0.0 | Beginner Support |
| sqlite-integration | 1.0.0 | Beginner Support |
| beginner-testing | 1.0.0 | Beginner Support |
| postgresql-integration | 1.0.0 | Database |
| migration-patterns | 1.0.0 | Database |
| property-based-testing | 1.0.0 | Advanced Testing |
| mutation-testing | 1.0.0 | Advanced Testing |
| api-versioning | 1.0.0 | Architecture |
| error-handling-patterns | 1.0.0 | Architecture |
| ci-cd-pipeline-design | 1.0.0 | DevOps |

## Framework Selection Matrix

| Project Type | Starting Point | Evolution Path |
|--------------|---------------|----------------|
| Fixed requirements, clear scope | IDPF-Structured | → LTS |
| Evolving requirements, large scope | IDPF-Agile | → LTS |
| Unclear requirements, exploration | IDPF-Vibe | → Structured or Agile |
| Production maintenance | IDPF-LTS | Terminal |
| Separate test repository | IDPF-Testing-Core | Use Structured or Agile |

## Core Principle

**System Instructions** define WHO the assistant is
**Frameworks** define WHAT process to follow
**Skills** provide reusable capabilities
**Assistant Guidelines** ensure accuracy and quality

## Valid Framework Transitions

```
VIBE ──► STRUCTURED ──► LTS
  │          ↑↓
  └────► AGILE ────────► LTS
```

**Invalid:** Structured/Agile → Vibe, LTS → Any

## Detailed Documentation

| File | Content |
|------|---------|
| Framework-Development.md | IDPF-PRD, Structured, Agile, Vibe, LTS details |
| Framework-Testing.md | Testing-Core + 6 specialized frameworks |
| Framework-System-Instructions.md | Core + 17 Domain Specialists |
| Framework-Skills.md | All 21 skills with descriptions |
| Framework-Transitions.md | Transition matrix, diagrams, hybrid usage |
| Framework-Overview.md | Complete reference (all sections) |

---
**End of Framework Summary**
