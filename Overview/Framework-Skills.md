# Framework Skills Reference
**Version:** v0.22.0
**Source:** Overview/Framework-Skills.md

---

**Location:** `Skills/`
**Total Skills:** 21 (6 TDD/BDD, 1 PRD extraction, 2 code quality, 2 beginner setup, 3 beginner support, 2 database, 2 advanced testing, 2 architecture, 1 DevOps)

**Skill Characteristics:**
- Packaged as distributable units (SKILL.md + resources/ + LICENSE.txt)
- Provide copy/paste Claude Code instruction blocks (NOT manual instructions)
- Include verification checklists and resource files

## TDD Skills (Experienced Developers)
| Skill | Function | When Used |
|-------|----------|-----------|
| tdd-red-phase | Guide RED phase - writing failing tests | Starting new feature/behavior |
| tdd-green-phase | Guide GREEN phase - minimal implementation | After RED phase verified failing |
| tdd-refactor-phase | Guide REFACTOR phase - code improvement | After GREEN phase success |
| tdd-failure-recovery | Handle unexpected test behaviors | Test behaves unexpectedly |
| test-writing-patterns | Test structure, patterns, assertions | Need guidance on test structure |
| bdd-writing | BDD specification with Gherkin syntax | Writing acceptance criteria |

## PRD Skills
| Skill | Function | When Used |
|-------|----------|-----------|
| extract-prd | Extract PRD worksheets from existing codebases | Reverse-PRD workflow |
| promote-to-prd | Transform proposals into PRD documents | Promoting approved proposals |

## Code Quality Skills
| Skill | Function | When Used |
|-------|----------|-----------|
| anti-pattern-analysis | Systematic detection of anti-patterns | Code reviews, refactoring |
| uml-generation | Generate UML diagrams using PlantUML | Architecture documentation |

## Beginner Setup Skills
| Skill | Function |
|-------|----------|
| flask-setup | Python Flask environment setup |
| sinatra-setup | Ruby Sinatra environment setup |

## Beginner Support Skills
| Skill | Function |
|-------|----------|
| common-errors | Troubleshooting reference |
| sqlite-integration | Database integration guidance |
| beginner-testing | Testing introduction and TDD education |

## Database Skills
| Skill | Function |
|-------|----------|
| postgresql-integration | PostgreSQL setup, connection pooling, queries |
| migration-patterns | Schema versioning, migrations, rollback |

## Advanced Testing Skills
| Skill | Function |
|-------|----------|
| property-based-testing | Property-based testing patterns |
| mutation-testing | Mutation testing and test suite assessment |

## Architecture Skills
| Skill | Function |
|-------|----------|
| api-versioning | API versioning strategies and deprecation |
| error-handling-patterns | Error hierarchy and API error responses |

## DevOps Skills
| Skill | Function |
|-------|----------|
| ci-cd-pipeline-design | CI/CD pipeline architecture |

## Framework-Skill Dependencies
| Framework | Required Skills |
|-----------|----------------|
| IDPF-Agile | tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-Vibe (vibe-newbie) | flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing |

**Standalone Skills:** anti-pattern-analysis, bdd-writing, extract-prd, promote-to-prd, uml-generation

---

**End of Framework Skills Reference**
