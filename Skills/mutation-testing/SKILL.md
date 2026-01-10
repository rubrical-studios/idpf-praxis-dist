---
name: mutation-testing
description: Guide developers through mutation testing to assess and improve test suite quality
license: Complete terms in LICENSE.txt
---

# Mutation Testing
**Version:** v0.23.0

## When to Use

- Assessing test suite quality beyond code coverage
- Identifying weak spots in test coverage
- Evaluating whether tests are meaningful

## Core Concept

1. **Mutate:** Make small changes to source code (mutations)
2. **Test:** Run test suite against mutated code
3. **Evaluate:** Check if tests detect (kill) the mutations

### Key Terms

- **Mutant:** Modified version of original code
- **Killed Mutant:** Detected by at least one failing test
- **Survived Mutant:** Not detected by any test
- **Equivalent Mutant:** Behaves identically to original
- **Mutation Score:** `killed / (total - equivalent)`

## Mutation Operators

### Arithmetic Operators
| Original | Mutated |
|----------|---------|
| `+` | `-` |
| `*` | `/` |

### Relational Operators
| Original | Mutated |
|----------|---------|
| `<` | `<=` |
| `==` | `!=` |

### Logical Operators
| Original | Mutated |
|----------|---------|
| `and` | `or` |
| `not` | (removed) |

### Constants
| Original | Mutated |
|----------|---------|
| `0` | `1` |
| `true` | `false` |

## Interpreting Scores

| Score | Interpretation |
|-------|----------------|
| 90-100% | Excellent test suite |
| 75-89% | Good test suite |
| 60-74% | Acceptable, room for improvement |
| Below 60% | Weak test suite |

### Context Matters

- **High-risk code:** Aim for 90%+ (payments, auth, validation)
- **Standard code:** Aim for 75%+ (business logic, APIs)
- **Low-risk code:** 60% acceptable (logging, debug utilities)

## Analyzing Survived Mutants

1. Review the mutant
2. Understand the impact
3. Decide: Add test, mark as equivalent, or accept risk

### Common Survival Patterns

- Missing boundary tests
- Missing error case tests
- Missing assertion on return value

## Framework-Specific Guidance

### Python (mutmut)
```bash
pip install mutmut
mutmut run
mutmut results
mutmut show 42
```

### JavaScript (Stryker)
```bash
npm install @stryker-mutator/core
npx stryker init
npx stryker run
```

### Java (PIT/Pitest)
```bash
mvn org.pitest:pitest-maven:mutationCoverage
```

### Other Frameworks

| Language | Tool |
|----------|------|
| Python | mutmut |
| JavaScript/TypeScript | Stryker |
| Java | PIT |
| C# | Stryker.NET |
| Ruby | mutant |
| Go | go-mutesting |

## Best Practices

1. **Start Small** - Test critical modules first
2. **Set Realistic Goals** - Don't aim for 100% immediately
3. **Address Survivors Systematically** - Equivalent? Add test? Accept risk?
4. **Integrate with CI** - Run on PRs, block on regression
5. **Balance Cost and Value** - Prioritize critical code

## Common Pitfalls

1. Running on everything (too slow)
2. Ignoring equivalent mutants (stuck score)
3. Adding tests without understanding
4. Over-testing to kill mutants

## Resources

- `resources/operator-guide.md`
- `resources/score-interpretation.md`
- `resources/framework-examples.md`

---

**End of Mutation Testing Skill**
