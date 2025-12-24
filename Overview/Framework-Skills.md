# Framework Skills Reference
**Version:** v0.5.0

---

## Skills Overview

**Location:** `Skills/`
**Total:** 21 skills

### Skill Characteristics
- Packaged as SKILL.md + resources/ + LICENSE.txt
- Provide Claude Code instruction blocks
- Include verification checklists

---

## TDD Skills (Experienced Developers)

| Skill | Function | When Used |
|-------|----------|-----------|
| tdd-red-phase | Write failing tests, verify failures | "First-Step", "Start-Story" |
| tdd-green-phase | Minimal implementation to pass | After RED phase |
| tdd-refactor-phase | Code improvement, green tests | After GREEN phase |
| tdd-failure-recovery | Diagnostics, rollback | Unexpected test behavior |
| test-writing-patterns | AAA, Given-When-Then, test doubles | Test structure guidance |
| bdd-writing | Gherkin, feature files, step definitions | Executable specifications |

---

## PRD Skills

**extract-prd (v1.1.0)**
- Extract PRD worksheets from existing codebases
- Coverage: Test parsing, NFR detection, architecture inference
- Used by: IDPF-PRD Reverse-PRD commands

---

## Code Quality Skills

| Skill | Function |
|-------|----------|
| anti-pattern-analysis | Detect anti-patterns, code smells, technical debt |
| uml-generation | Generate PlantUML diagrams from code |

---

## Beginner Setup Skills

| Skill | Function |
|-------|----------|
| flask-setup | Python Flask environment setup |
| sinatra-setup | Ruby Sinatra environment setup |

---

## Beginner Support Skills

| Skill | Function |
|-------|----------|
| common-errors | Troubleshooting Flask, Sinatra, general errors |
| sqlite-integration | Database setup, basic queries |
| beginner-testing | Testing introduction, simple TDD |

---

## Database Skills

| Skill | Function |
|-------|----------|
| postgresql-integration | Connection pooling, query patterns |
| migration-patterns | Schema versioning, rollback, zero-downtime |

---

## Advanced Testing Skills

| Skill | Function |
|-------|----------|
| property-based-testing | Hypothesis (Python), fast-check (JS) |
| mutation-testing | mutmut, Stryker, PIT |

---

## Architecture Skills

| Skill | Function |
|-------|----------|
| api-versioning | URL/header versioning, deprecation |
| error-handling-patterns | Error hierarchy, API errors, logging |

---

## DevOps Skills

**ci-cd-pipeline-design**
- Pipeline architecture, stage design, security
- Platforms: GitHub Actions, GitLab CI, Jenkins

---

## Framework-Skill Dependencies

| Framework | Required Skills |
|-----------|----------------|
| IDPF-Structured | tdd-red/green/refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-Agile | tdd-red/green/refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-LTS | tdd-red/green/refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-Vibe (newbie) | flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing |

**Standalone:** anti-pattern-analysis, bdd-writing, extract-prd, uml-generation

---

**End of Framework Skills Reference**
