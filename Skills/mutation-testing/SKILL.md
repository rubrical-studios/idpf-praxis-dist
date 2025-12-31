---
name: mutation-testing
description: Guide developers through mutation testing to assess and improve test suite quality
license: Complete terms in LICENSE.txt
---

# Mutation Testing
**Version:** v0.19.0

## When to Use
- Assessing test suite quality beyond coverage
- Identifying weak test coverage
- Evaluating test meaningfulness
- Improving test effectiveness

## Core Concept
1. **Mutate:** Make small code changes
2. **Test:** Run test suite against mutated code
3. **Evaluate:** Check if tests detect (kill) mutations

## Key Terms
- **Mutant:** Modified code with one change
- **Killed:** Test detected mutation (good)
- **Survived:** Test missed mutation (bad)
- **Equivalent:** Mutation behaves identically (can't kill)
- **Mutation Score:** killed / (total - equivalent)

## Mutation Operators

### Arithmetic
| Original | Mutated |
|----------|---------|
| `+` | `-` |
| `*` | `/` |

### Relational
| Original | Mutated |
|----------|---------|
| `<` | `<=` |
| `==` | `!=` |
| `>` | `>=` |

### Logical
| Original | Mutated |
|----------|---------|
| `and` | `or` |
| `not` | (removed) |

### Constants
| Original | Mutated |
|----------|---------|
| `0` | `1` |
| `true` | `false` |

## Score Interpretation
| Score | Quality |
|-------|---------|
| 90-100% | Excellent |
| 75-89% | Good |
| 60-74% | Acceptable |
| <60% | Weak |

**Context matters:** High-risk code (payment, auth) should target 90%+

## Analyzing Survivors
1. Review the mutant code change
2. Understand what behavior changed
3. Decide: Add test, mark equivalent, or accept risk

**Common survival patterns:**
- Missing boundary tests
- Missing error case tests
- Missing assertions on return values

## Framework Examples

**Python (mutmut):**
```bash
pip install mutmut
mutmut run
mutmut results
```

**JavaScript (Stryker):**
```bash
npm install @stryker-mutator/core
npx stryker init
npx stryker run
```

**Java (PIT):**
```bash
mvn org.pitest:pitest-maven:mutationCoverage
```

## Best Practices
1. Start small (critical modules first)
2. Set realistic goals (not 100%)
3. Address survivors systematically
4. Integrate with CI (limited scope on PRs)
5. Balance cost vs value

## Common Pitfalls
- Running on everything (too slow)
- Ignoring equivalent mutants
- Adding tests without understanding
- Over-testing to kill mutants

---

**End of Mutation Testing Skill**
