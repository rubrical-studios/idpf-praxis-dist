# Framework Skills Reference
**Version:** v0.19.0
**Source:** Overview/Framework-Skills.md
**Purpose:** Reference for all Skills

---

## Overview
**Location:** `Skills/` | **Total:** 21 skills
**Format:** SKILL.md + resources/ + LICENSE.txt

---

## TDD Skills

| Skill | Function | When Used |
|-------|----------|-----------|
| tdd-red-phase | Write failing tests, verify failure | First-Step, Start-Story |
| tdd-green-phase | Minimal implementation to pass | After RED verified |
| tdd-refactor-phase | Improve code, maintain green | After GREEN success |
| tdd-failure-recovery | Handle unexpected behaviors, rollback | Test misbehaves |
| test-writing-patterns | AAA pattern, test doubles, assertions | Test structure guidance |

---

## BDD Skills

| Skill | Function | When Used |
|-------|----------|-----------|
| bdd-writing | Gherkin syntax, feature files, step definitions | Acceptance criteria as specs |

**Tools:** Cucumber, pytest-bdd, SpecFlow, Behave, RSpec

---

## PRD Skills

| Skill | Function | When Used |
|-------|----------|-----------|
| extract-prd | Extract PRD from existing code | Reverse-PRD workflow |

**Coverage:** Test parsing (pytest, Jest, JUnit, RSpec), NFR detection, architecture inference

---

## Code Quality Skills

| Skill | Function | When Used |
|-------|----------|-----------|
| anti-pattern-analysis | Detect anti-patterns in code review | Reviews, refactoring planning |
| uml-generation | Generate UML from source (PlantUML) | Architecture documentation |

---

## Beginner Skills

| Skill | Function |
|-------|----------|
| flask-setup | Flask environment setup |
| sinatra-setup | Sinatra environment setup |
| common-errors | Troubleshooting reference |
| sqlite-integration | Database integration for beginners |
| beginner-testing | TDD introduction |

---

## Database Skills

| Skill | Function |
|-------|----------|
| postgresql-integration | PostgreSQL setup, pooling, queries |
| migration-patterns | Schema versioning, rollback, zero-downtime |

---

## Advanced Testing Skills

| Skill | Function |
|-------|----------|
| property-based-testing | Hypothesis/fast-check patterns |
| mutation-testing | Test suite quality assessment |

---

## Architecture Skills

| Skill | Function |
|-------|----------|
| api-versioning | Versioning strategies, deprecation |
| error-handling-patterns | Error hierarchy, API responses |

---

## DevOps Skills

| Skill | Function |
|-------|----------|
| ci-cd-pipeline-design | Pipeline architecture, security |

---

## Framework Dependencies

| Framework | Required Skills |
|-----------|----------------|
| IDPF-Agile | tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-Vibe (Newbie) | flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing |

**Standalone:** anti-pattern-analysis, bdd-writing, extract-prd, uml-generation

---

**End of Framework Skills Reference**
