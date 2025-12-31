# Skill: extract-prd
**Version:** v0.19.1
**Source:** Skills/extract-prd/SKILL.md

**Purpose:** Extract PRD worksheets from existing codebases
**Audience:** Developers documenting legacy/undocumented projects
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

---

## When to Use
- Legacy codebase without documentation
- Project built without upfront requirements
- Onboarding to existing project
- Compliance/audit requirement generation

## Skill Commands
| Command | Purpose |
|---------|---------|
| `Analyze-Structure` | Map file/directory organization, detect tech stack |
| `Extract-From-Tests` | Parse test files for feature descriptions |
| `Extract-From-API` | Parse API definitions for endpoints/operations |
| `Detect-NFRs` | Identify NFRs from code patterns |
| `Generate-Worksheets` | Output IDPF-PRD compatible worksheets |

## Code Analysis Sources

### Priority 1: High-Value
| Source | Extracts |
|--------|----------|
| Test files | Features, acceptance criteria |
| API routes | Endpoints, operations |
| OpenAPI/Swagger | Full API specification |
| GraphQL schema | Types, queries, mutations |

### Priority 2: Supporting
| Source | Extracts |
|--------|----------|
| README.md | Overview, setup, features |
| Config files | NFRs, environment settings |
| Package files | Dependencies, tech stack |
| Dockerfile | Deployment pattern |

### Priority 3: Supplementary
| Source | Extracts |
|--------|----------|
| Git history | Feature evolution |
| Comments | Intent, constraints |
| Error handlers | Edge cases |

## Test Parsing Patterns
**Python (pytest):** `def test_[feature]_[behavior]()` → Feature + Behavior
**JavaScript (Jest):** `describe()` → Feature, `it()` → Behaviors/AC
**Java (JUnit):** `@DisplayName` → Description, class name → Feature
**Ruby (RSpec):** `describe` → Feature, `context` → Scenario, `it` → Behavior

## NFR Detection Patterns

### Security
| Pattern | NFR |
|---------|-----|
| `bcrypt`, `argon2` | SEC-001: Password hashing |
| `@authenticate` | SEC-002: Authentication required |
| `@authorize` | SEC-003: Authorization controls |
| `csrf_token` | SEC-004: CSRF protection |
| `validate`, `sanitize` | SEC-006: Input validation |
| `rateLimit` | SEC-008: Rate limiting |

### Performance
| Pattern | NFR |
|---------|-----|
| `@cache`, `redis` | PERF-001: Caching |
| `async`, `await` | PERF-002: Async processing |
| `pool` | PERF-003: Connection pooling |
| `index` | PERF-004: Database indexing |
| `pagination` | PERF-005: Pagination |

### Reliability
| Pattern | NFR |
|---------|-----|
| `retry` | REL-001: Retry logic |
| `circuit`, `breaker` | REL-002: Circuit breaker |
| `timeout` | REL-003: Timeout handling |
| `transaction` | REL-005: Transaction support |
| `health`, `liveness` | REL-007: Health checks |

### Observability
| Pattern | NFR |
|---------|-----|
| `logger` | OBS-001: Logging |
| `metrics` | OBS-002: Metrics collection |
| `trace`, `span` | OBS-003: Distributed tracing |
| `audit` | OBS-004: Audit logging |

## Architecture Inference
| Pattern | Architecture |
|---------|--------------|
| `/api/*` routes | REST API |
| `schema.graphql` | GraphQL API |
| `/pages/*` (Next.js) | SSR Web Application |
| `socket`, `websocket` | Real-time Application |

## Confidence Levels
| Level | Criteria | Action |
|-------|----------|--------|
| **High** | Multiple sources confirm | Verify only |
| **Medium** | Single source | Review and confirm |
| **Low** | Indirect evidence | Validate carefully |

## Output Location
- PRD: `PRD/PRD-[ProjectName].md`
- Worksheets: `PRD/Worksheets/[Type]-Worksheet-[ProjectName].md`

## Workflow Integration
```
Reverse-PRD-Start → [extract-prd executes]
→ Reverse-PRD-Analyze → Reverse-PRD-Extract
→ Reverse-PRD-Refine → Generate-PRD
```

## Limitations
1. Cannot understand intent - only explicit code
2. Missing business rationale
3. Possible false positives
4. Best support: Python, JavaScript, Java, Ruby

**Critical:** All extracted requirements must be traceable to code evidence. Mark inferences with confidence levels.

---

**End of Skill**
