# Skill: extract-prd

**Version:** v0.15.0
**Purpose:** Extract PRD worksheets from existing codebases
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

---

## When to Use
- Legacy codebase without documentation
- Project built without upfront requirements
- Pre-LTS baseline documentation
- Compliance/audit requirement generation

## Commands
| Command | Purpose |
|---------|---------|
| `Analyze-Structure` | Map file/directory organization, detect tech stack |
| `Extract-From-Tests` | Parse test files for feature descriptions |
| `Extract-From-API` | Parse API definitions for endpoints |
| `Detect-NFRs` | Identify NFRs from code patterns |
| `Generate-Worksheets` | Output IDPF-PRD compatible worksheets |

## Code Analysis Sources

**Priority 1:** Test files, API routes, OpenAPI/Swagger, GraphQL schema
**Priority 2:** README.md, config files, package files, Dockerfile
**Priority 3:** Git history, comments, error handlers

## Confidence Levels
| Level | Meaning |
|-------|---------|
| High | Test explicitly covers feature |
| Medium | Multiple code patterns suggest feature |
| Low | Single reference, could be incomplete |

## Critical Rule
All extracted requirements must be traceable to code evidence. Never invent requirements not supported by tests or code. Mark all inferences with confidence levels.

## Output
Discovery Worksheet, Elicitation Worksheet, Specification Worksheet - all populated from code analysis with source references.
