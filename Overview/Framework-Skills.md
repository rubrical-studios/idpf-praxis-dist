# Framework Skills Reference
**Version:** v0.26.1
**Purpose:** Skills reference
---
## Skills Overview
**Location:** `Skills/`
**Total:** 21 (6 TDD/BDD, 1 PRD extraction, 2 code quality, 2 beginner setup, 3 beginner support, 2 database, 2 advanced testing, 2 architecture, 1 DevOps)
### Characteristics
- Packaged as SKILL.md + resources/ + LICENSE.txt
- Provide copy/paste Claude Code instruction blocks
- Include verification checklists and resource files
---
## TDD Skills (Experienced)
### tdd-red-phase
**Function:** RED phase - writing failing tests, verifying failures
**Coverage:** Test structure (AAA), assertions, failure verification, Claude Code format
**When Used:** Starting new feature, "First-Step" or "Start-Story"
### tdd-green-phase
**Function:** GREEN phase - minimal implementation to pass tests
**Coverage:** YAGNI, implementation strategies, regression checking
**When Used:** After RED phase test verified as failing
### tdd-refactor-phase
**Function:** REFACTOR phase - code improvement maintaining green tests
**Coverage:** Refactoring analysis, rollback procedures, when to skip
**When Used:** After GREEN phase success
### tdd-failure-recovery
**Function:** Handle unexpected test behaviors and recovery
**Coverage:** Failure diagnostics for all phases, recovery steps, rollback, test isolation
**When Used:** Test behaves unexpectedly, need rollback
### test-writing-patterns (Standalone)
**Function:** Test structure, patterns, assertions, test doubles
**Coverage:** AAA, Given-When-Then, assertions, test doubles (mock/stub/fake/spy)
### bdd-writing (Standalone)
**Function:** BDD specification writing with Gherkin syntax
**Coverage:** Feature files, scenarios, step definitions, scenario outlines, data tables
**Tools:** Cucumber, pytest-bdd, SpecFlow, Behave, RSpec
---
## PRD Skills
### extract-prd
**Function:** Extract PRD worksheets from existing codebases
**Coverage:** Test parsing (pytest, Jest, JUnit, RSpec), NFR detection, architecture inference
**When Used:** Reverse-PRD workflow, documenting legacy code
**Output:** PRD documents in `PRD/PRD-[ProjectName].md`
### create-prd
**Function:** Transform proposals into detailed PRDs using Inception/ context
**Coverage:** Proposal analysis, charter alignment, user story generation, acceptance criteria
**When Used:** Promoting approved proposals, pre-Create-Backlog planning
**Integration:** Streamlined PRD creation (supersedes deprecated IDPF-PRD), feeds into Create-Backlog
---
## Code Quality Skills
### anti-pattern-analysis
**Function:** Systematic anti-pattern detection during code review
**Coverage:** Design/OOP, code smells, architecture, database, testing, security patterns
**When Used:** Code reviews, refactoring planning, technical debt assessment
### uml-generation
**Function:** Generate UML diagrams from source code using PlantUML
**Coverage:** Class, sequence, component, activity diagrams
**When Used:** Code analysis, architecture documentation, reverse-engineering
---
## Beginner Setup Skills
### flask-setup
**Function:** Python Flask environment setup
**Coverage:** Virtual environment, dependencies, verification
### sinatra-setup
**Function:** Ruby Sinatra environment setup
**Coverage:** Bundler, Gemfile, dependencies, verification
---
## Beginner Support Skills
### common-errors
**Function:** Troubleshooting common development issues
**Coverage:** Flask errors, Sinatra errors, general programming errors
### sqlite-integration
**Function:** Database integration for beginners
**Coverage:** Database setup, basic queries, schema creation
### beginner-testing
**Function:** Testing introduction and TDD education
**Coverage:** Test writing basics, assertions, simple TDD cycle
---
## Database Skills
### postgresql-integration
**Function:** PostgreSQL setup, connection pooling, query patterns
**Coverage:** Connection setup, pooling, transactions, error handling
### migration-patterns
**Function:** Database schema versioning, migration strategies
**Coverage:** Schema versioning, forward/backward migrations, rollback, zero-downtime
---
## Advanced Testing Skills
### property-based-testing
**Function:** Property-based testing patterns
**Coverage:** Property definition, shrinking, generator composition
**Tools:** Hypothesis (Python), fast-check (JS/TS), QuickCheck
### mutation-testing
**Function:** Mutation testing operators and test suite assessment
**Coverage:** Mutation operators, score interpretation, test suite improvement
**Tools:** mutmut (Python), Stryker (JS/TS/.NET), PIT (Java)
---
## Architecture Skills
### api-versioning
**Function:** API versioning strategies and deprecation workflows
**Coverage:** URL path, header-based, content negotiation, deprecation, backward compatibility
### error-handling-patterns
**Function:** Error hierarchy design and API error responses
**Coverage:** Error hierarchy, API responses, logging, recovery strategies
---
## DevOps Skills
### ci-cd-pipeline-design
**Function:** CI/CD pipeline architecture and configuration
**Coverage:** Pipeline architecture, stage design, environment promotion, security
**Platforms:** GitHub Actions, GitLab CI, Jenkins, Azure DevOps
---
## Framework-Skill Dependencies
| Framework | Required Skills |
|-----------|----------------|
| IDPF-Agile | tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns |
| IDPF-Vibe (newbie) | flask-setup, sinatra-setup, common-errors, sqlite-integration, beginner-testing |
**Standalone:** anti-pattern-analysis, bdd-writing, extract-prd, create-prd, uml-generation
---
**End of Framework Skills Reference**
