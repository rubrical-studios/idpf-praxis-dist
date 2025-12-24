---
name: mutation-testing
version: v0.15.0
description: Mutation testing with mutmut, Stryker, PIT
---

# Mutation Testing

## When to Use
- Evaluating test suite quality
- Finding weak tests
- Improving test coverage meaningfulness
- After achieving high line coverage

## Concept
Mutation testing introduces small bugs (mutations) into code. If tests don't fail, they're weak.

## Tools
| Language | Tool |
|----------|------|
| Python | mutmut |
| JavaScript | Stryker |
| Java | PIT |

## Mutation Types
| Mutation | Example |
|----------|---------|
| Arithmetic | `+` → `-` |
| Comparison | `>` → `>=` |
| Boolean | `True` → `False` |
| Return | `return x` → `return None` |
| Delete | Remove statement |

## mutmut (Python)
```bash
# Run mutation testing
mutmut run

# See results
mutmut results

# See specific mutation
mutmut show 1
```

## Stryker (JavaScript)
```bash
# Initialize
npx stryker init

# Run
npx stryker run
```

## Metrics
- **Killed:** Test caught the mutant (good)
- **Survived:** Test missed the mutant (bad)
- **Mutation Score:** killed / total (aim for >80%)

## Best Practices
- Start with critical code paths
- Fix surviving mutants by adding assertions
- Don't aim for 100% (diminishing returns)
- Use incrementally, not all at once
