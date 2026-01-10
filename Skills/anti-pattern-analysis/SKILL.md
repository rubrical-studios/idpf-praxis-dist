# Anti-Pattern Analysis Skill
**Version:** v0.23.0

---
name: anti-pattern-analysis
description: Systematic detection of anti-patterns during code review with actionable refactoring guidance
---

## Purpose

Structured guidance for identifying common anti-patterns across languages, architectures, and testing practices. Supports code reviews, refactoring planning, technical debt assessment, and reverse-PRD extraction workflows.

## When to Invoke

- Code review sessions
- Refactoring planning
- Technical debt assessment
- Architecture review
- Reverse-PRD extraction

## Anti-Pattern Categories

### 1. Design/OOP Anti-Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **God Object** | Class with too many responsibilities (>500 lines, >10 methods) | High |
| **Singleton Abuse** | Overuse of singletons creating global state | Medium |
| **Anemic Domain Model** | Data classes with no behavior, logic in services | Medium |
| **Poltergeist** | Classes that only exist to invoke other classes | Low |
| **Golden Hammer** | Using one solution/pattern for everything | Medium |
| **Circular Dependency** | Classes that depend on each other | High |
| **Yo-yo Problem** | Inheritance hierarchy requiring constant up/down navigation | Medium |

### 2. Code Smell Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **Long Method** | Methods exceeding 20-30 lines | Medium |
| **Deep Nesting** | More than 3 levels of indentation | Medium |
| **Magic Numbers** | Unexplained literal values in code | Low |
| **Primitive Obsession** | Using primitives instead of small objects | Medium |
| **Feature Envy** | Method uses another class's data excessively | Medium |
| **Shotgun Surgery** | One change requires edits in many places | High |
| **Divergent Change** | One class changed for many different reasons | High |

### 3. Architecture Anti-Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **Big Ball of Mud** | No discernible architecture | Critical |
| **Distributed Monolith** | Microservices with tight coupling | High |
| **Lava Flow** | Dead code nobody dares remove | Medium |
| **Copy-Paste Programming** | Duplicated code blocks | High |
| **Spaghetti Code** | Tangled control flow | High |

### 4. Database Anti-Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **N+1 Queries** | Loop executing individual queries | Critical |
| **SELECT *** | Fetching all columns unnecessarily | Medium |
| **EAV (Entity-Attribute-Value)** | Flexible but unqueryable schema | High |
| **No Indexes** | Missing indexes on frequently queried columns | High |

### 5. Testing Anti-Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **Flaky Tests** | Non-deterministic test results | Critical |
| **Test Interdependence** | Tests depend on execution order | High |
| **Over-Mocking** | Mocking so much the test is meaningless | High |
| **Testing Implementation** | Tests break on refactor | Medium |

### 6. Security Anti-Patterns

| Pattern | Description | Severity |
|---------|-------------|----------|
| **Hardcoded Secrets** | Credentials in source code | Critical |
| **SQL String Concatenation** | Building queries with string concatenation | Critical |
| **Trust All Input** | No input validation | Critical |
| **Rolling Own Crypto** | Custom cryptography implementation | Critical |
| **Missing Authentication** | Endpoints without auth checks | Critical |

## Severity Levels

| Level | Impact | Action Required |
|-------|--------|-----------------|
| **Critical** | Security risk, data loss, or system failure | Must fix before merge/release |
| **High** | Major technical debt, maintainability blocker | Should fix in same PR or sprint |
| **Medium** | Code smell, degraded maintainability | Create follow-up issue |
| **Low** | Minor improvement opportunity | Optional |

## Quick Review Checklist

### Design
- [ ] No God objects (classes >500 lines or >10 public methods)
- [ ] No circular dependencies between modules
- [ ] Single Responsibility principle followed

### Code Quality
- [ ] No methods exceeding 20-30 lines
- [ ] No nesting deeper than 3 levels
- [ ] No duplicated code blocks (>10 lines)

### Database
- [ ] No N+1 query patterns
- [ ] Indexes exist for frequently queried columns
- [ ] No string concatenation for SQL

### Testing
- [ ] Tests are deterministic
- [ ] Tests are independent
- [ ] Test pyramid followed

### Security
- [ ] No hardcoded secrets
- [ ] Input validation at system boundaries
- [ ] Parameterized queries used

## Reverse-PRD Integration

### Detection Output Format
```markdown
## Technical Debt (Auto-detected)

| Anti-Pattern | Location | Severity | Suggested NFR |
|--------------|----------|----------|---------------|
| N+1 Queries | UserService.getAll():42 | Critical | NFR-PERF-001 |
| God Object | AppController (1247 lines) | High | NFR-MAINT-001 |
```

### Mapping to NFR Categories
- Security anti-patterns -> NFR-SEC-*
- Performance anti-patterns -> NFR-PERF-*
- Maintainability anti-patterns -> NFR-MAINT-*
- Testing anti-patterns -> NFR-QUAL-*
- Architecture anti-patterns -> NFR-ARCH-*

## Resources

- [General Anti-Patterns](resources/general-anti-patterns.md)
- [Architecture Anti-Patterns](resources/architecture-anti-patterns.md)
- [Testing Anti-Patterns](resources/testing-anti-patterns.md)
- [Database Anti-Patterns](resources/database-anti-patterns.md)
- [Code Review Checklist](resources/code-review-checklist.md)

---

**End of Skill Document**
