# Skill: extract-prd
**Version:** v0.23.0

**Purpose:** Extract lifecycle artifacts from existing codebases
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

## Overview

Analyzes existing codebases to generate lifecycle artifacts (CHARTER.md + Inception/ directory). Extracts features from tests, infers architecture from code patterns, produces draft documentation for user refinement.

**Critical:** All extracted content must be traceable to code evidence. Never invent details not supported by tests, code patterns, or documentation. Mark all inferences with confidence levels.

**Output:** CHARTER.md + Inception/ artifacts (not PRD worksheets)

## When to Use

- Legacy codebase without documentation
- Project built without upfront requirements
- Onboarding to existing project
- Pre-LTS baseline documentation

## Skill Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `Analyze-Structure` | Map file/directory organization | Inception/Architecture.md, Inception/Tech-Stack.md |
| `Extract-From-Tests` | Parse test files for features | Inception/Scope-Boundaries.md |
| `Extract-From-API` | Parse API definitions | Inception/Scope-Boundaries.md |
| `Detect-NFRs` | Identify NFRs from code patterns | Inception/Constraints.md |
| `Generate-Artifacts` | Output full lifecycle structure | CHARTER.md + Inception/ |

## Extraction Source Mapping

### Priority 1: High-Value Sources

| Source | Extracts To |
|--------|-------------|
| Test files | Inception/Scope-Boundaries.md, Inception/Test-Strategy.md |
| API routes | Inception/Scope-Boundaries.md |
| OpenAPI/Swagger | Inception/Scope-Boundaries.md, Inception/Architecture.md |
| Source structure | Inception/Architecture.md |

### Priority 2: Supporting Sources

| Source | Extracts To |
|--------|-------------|
| README.md | CHARTER.md |
| Config files | Inception/Constraints.md |
| Package files | Inception/Tech-Stack.md |

## Test Parsing Patterns

**Python (pytest):** `def test_[feature]_[behavior]():`
**JavaScript (Jest):** `describe('[Feature]', () => { it('[behavior]', ...) })`
**Ruby (RSpec):** `describe/context/it blocks`
**Java (JUnit):** `@Test @DisplayName("...")`

## NFR Detection Patterns

| Pattern | Inferred Constraint |
|---------|---------------------|
| `bcrypt`, `argon2` | Password hashing required |
| `@authenticate` | Authentication required |
| `csrf_token` | CSRF protection |
| `@cache`, `redis` | Caching implemented |
| `retry`, `maxRetries` | Retry logic |
| `transaction` | Transaction support |

## Architecture Inference

| Pattern | Architecture |
|---------|--------------|
| `/api/*` routes | REST API |
| `schema.graphql` | GraphQL API |
| `/pages/*`, `/app/*` | SSR Web Application |
| `main()`, CLI args | Command Line Tool |
| `socket`, `websocket` | Real-time Application |

## Confidence Levels

| Level | Criteria | User Action |
|-------|----------|-------------|
| **High** | Multiple sources confirm, explicit in tests | Verify only |
| **Medium** | Single source, reasonable inference | Review and confirm |
| **Low** | Indirect evidence, pattern-based guess | Validate carefully |

## Output Structure

```
project-root/
├── CHARTER.md                 <- Overview (extracted)
├── Inception/                 <- What we're building
│   ├── Charter-Details.md
│   ├── Architecture.md
│   ├── Tech-Stack.md
│   ├── Scope-Boundaries.md
│   ├── Test-Strategy.md
│   ├── Constraints.md
│   └── Milestones.md          <- Empty (needs input)
├── Construction/              <- Empty (populated during dev)
└── Transition/                <- Empty (populated during release)
```

## User Confirmation Flow

After extraction, present summary with confidence levels and items needing review:
- Vision statement (Low confidence)
- Out of scope items (not extractable)
- Milestones (needs input)

## Limitations

1. Cannot understand intent - Only extracts what's explicit
2. Missing context - Business rationale not captured
3. False positives - Some patterns may be incorrectly interpreted
4. Language coverage - Best for Python, JavaScript, Java, Ruby, Go

**Extracted artifacts are drafts requiring human refinement.**

---

**End of Skill**
