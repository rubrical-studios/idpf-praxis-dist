# Anti-Pattern Analysis Skill

---
name: anti-pattern-analysis
version: v0.5.0
description: Systematic detection of anti-patterns with actionable refactoring guidance
---

## When to Invoke
- Code review sessions
- Refactoring planning
- Technical debt assessment
- Architecture review
- Reverse-PRD extraction

## Anti-Pattern Categories

### Design/OOP Anti-Patterns
| Pattern | Description | Severity |
|---------|-------------|----------|
| God Object | Class with too many responsibilities | High |
| Singleton Abuse | Overuse creating global state | Medium |
| Anemic Domain Model | Data classes with no behavior | Medium |
| Circular Dependency | Classes depending on each other | High |

### Code Smells
| Pattern | Description | Severity |
|---------|-------------|----------|
| Long Method | Methods exceeding 20-30 lines | Medium |
| Deep Nesting | More than 3 levels | Medium |
| Magic Numbers | Unexplained literal values | Low |
| Feature Envy | Method uses another class's data excessively | Medium |
| Shotgun Surgery | One change requires many edits | High |

### Architecture Anti-Patterns
| Pattern | Description | Severity |
|---------|-------------|----------|
| Big Ball of Mud | No discernible architecture | Critical |
| Distributed Monolith | Microservices with tight coupling | High |
| Lava Flow | Dead code nobody removes | Medium |
| Copy-Paste Programming | Duplicated code blocks | High |

### Testing Anti-Patterns
| Pattern | Description | Severity |
|---------|-------------|----------|
| Ice Cream Cone | More E2E than unit tests | High |
| Hidden Dependencies | Tests rely on external state | Medium |
| Test Interdependence | Tests depend on each other | High |
