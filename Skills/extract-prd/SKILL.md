# Skill: extract-prd
**Version:** v0.22.0
**Source:** Skills/extract-prd/SKILL.md

**Purpose:** Extract lifecycle artifacts from existing codebases
**Audience:** Developers documenting legacy or undocumented projects
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md
## Overview
Analyzes existing codebases to generate lifecycle artifacts (CHARTER.md + Inception/ directory). Extracts features from tests, infers architecture from code patterns, and produces draft documentation for user refinement.
**Use Case:** You have working code but no charter or documentation. This skill reverse-engineers lifecycle artifacts from what was built.
**Critical:** All extracted content must be traceable to code evidence. Never invent details not supported by tests, code patterns, or documentation. Mark all inferences with confidence levels.
**Output:** CHARTER.md + Inception/ artifacts (not PRD worksheets)
## When to Use
- Legacy codebase without documentation
- Project built without upfront requirements
- Onboarding to existing project
- Pre-LTS baseline documentation
- Session startup detects code but no charter
## Skill Commands
| Command | Purpose | Output |
|---------|---------|--------|
| `Analyze-Structure` | Map file/directory organization, detect tech stack | Inception/Architecture.md, Inception/Tech-Stack.md |
| `Extract-From-Tests` | Parse test files for feature descriptions | Inception/Scope-Boundaries.md |
| `Extract-From-API` | Parse API definitions for endpoints/operations | Inception/Scope-Boundaries.md |
| `Detect-NFRs` | Identify NFRs from code patterns | Inception/Constraints.md, Inception/Test-Strategy.md |
| `Generate-Artifacts` | Output CHARTER.md + Inception/ directory | Full lifecycle structure |
## Extraction Source Mapping
### Priority 1: High-Value Sources
| Source | Extracts To |
|--------|-------------|
| **Test files** | Inception/Scope-Boundaries.md, Inception/Test-Strategy.md |
| **API routes** | Inception/Scope-Boundaries.md |
| **OpenAPI/Swagger** | Inception/Scope-Boundaries.md, Inception/Architecture.md |
| **GraphQL schema** | Inception/Scope-Boundaries.md, Inception/Architecture.md |
| **Source structure** | Inception/Architecture.md |
### Priority 2: Supporting Sources
| Source | Extracts To |
|--------|-------------|
| **README.md** | CHARTER.md, Inception/Charter-Details.md |
| **Config files** | Inception/Constraints.md |
| **Package files** | Inception/Tech-Stack.md |
| **Dockerfile** | Inception/Architecture.md |
## Test Parsing Patterns
**Python (pytest):** Function name `test_<feature>_<behavior>` + docstring -> Feature + Behavior
**JavaScript (Jest/Mocha):** `describe()` blocks -> Feature grouping, `it()`/`test()` -> Individual behaviors
**Ruby (RSpec):** `describe/context/it` blocks -> Feature hierarchy
**Java (JUnit):** `@Test` with `@DisplayName` -> Feature + Behavior
## NFR Detection Patterns
| Code Pattern | Inferred Constraint |
|--------------|---------------------|
| `bcrypt`, `argon2` | Password hashing required |
| `@authenticate` | Authentication required |
| `csrf_token` | CSRF protection |
| `@cache`, `redis` | Caching implemented |
| `retry`, `maxRetries` | Retry logic implemented |
| `transaction` | Transaction support |
## Confidence Levels
| Level | Criteria | User Action |
|-------|----------|-------------|
| **High** | Multiple sources confirm, explicit in tests | Verify only |
| **Medium** | Single source, reasonable inference | Review and confirm |
| **Low** | Indirect evidence, pattern-based guess | Validate carefully |
## Output Structure
```
project-root/
├── CHARTER.md                      <- Overview (extracted)
├── Inception/                      <- What we're building
│   ├── Charter-Details.md          <- Full specs (extracted)
│   ├── Architecture.md             <- System view (extracted)
│   ├── Tech-Stack.md               <- Dependencies (extracted)
│   ├── Scope-Boundaries.md         <- Features (extracted)
│   ├── Test-Strategy.md            <- Test approach (extracted)
│   ├── Constraints.md              <- NFRs (extracted)
│   └── Milestones.md               <- Empty (needs input)
├── Construction/                   <- Empty (populated during dev)
└── Transition/                     <- Empty (populated during release)
```
## Limitations
1. Cannot understand intent - Only extracts what's explicit in code
2. Missing context - Business rationale not in code is not captured
3. False positives - Some patterns may be incorrectly interpreted
4. Language coverage - Best support for Python, JavaScript, Java, Ruby, Go
**Important:** Extracted artifacts are **drafts** requiring human refinement.
---
**End of Skill**
