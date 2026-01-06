---
name: mutation-testing
description: Guide developers through mutation testing to assess and improve test suite quality
license: Complete terms in LICENSE.txt
---
# Mutation Testing
**Version:** v0.22.0
**Source:** Skills/mutation-testing/SKILL.md

Guides developers through mutation testing, a technique for evaluating test suite quality by introducing small changes (mutations) to code and checking if tests catch them.
## When to Use This Skill
- Assessing test suite quality beyond code coverage
- Identifying weak spots in test coverage
- Evaluating whether tests are meaningful
- Making decisions about test maintenance
## Core Concept
1. **Mutate:** Make small changes to source code
2. **Test:** Run test suite against mutated code
3. **Evaluate:** Check if tests detect (kill) the mutations
## Key Terms
- **Mutant:** Modified version of original code
- **Killed Mutant:** Detected by at least one failing test
- **Survived Mutant:** Not detected (tests still pass)
- **Equivalent Mutant:** Behaves identically to original (cannot be killed)
- **Mutation Score:** `killed / (total - equivalent)`
## Mutation Operators
### Arithmetic Operators
| Original | Mutated |
|----------|---------|
| `+` | `-` |
| `*` | `/` |
| `%` | `*` |
### Relational Operators
| Original | Mutated |
|----------|---------|
| `<` | `<=` |
| `>` | `>=` |
| `==` | `!=` |
### Logical Operators
| Original | Mutated |
|----------|---------|
| `and` | `or` |
| `not` | (removed) |
### Constant Mutations
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
| Below 60% | Weak test suite, needs attention |
**Context matters:** High-risk code (payments, auth) aim for 90%+; Standard code aim for 75%+.
## Analyzing Survived Mutants
1. Review the mutant (e.g., `changed > to >=`)
2. Understand the impact (what behavior changes?)
3. Decide: Add test, mark as equivalent, or accept risk
## Framework Tools
| Language | Tool |
|----------|------|
| Python | mutmut |
| JavaScript/TS | Stryker |
| Java | PIT/Pitest |
| C# | Stryker.NET |
| Ruby | mutant |
| Go | go-mutesting |
**Python example:**
```bash
pip install mutmut
mutmut run
mutmut results
mutmut show 42  # View specific mutant
```
## Best Practices
1. **Start Small** - Test critical modules first, expand gradually
2. **Set Realistic Goals** - Don't aim for 100% immediately
3. **Address Survivors Systematically** - Equivalent? Add test? Accept risk?
4. **Integrate with CI** - Run on PRs (limited scope), block on regression
5. **Balance Cost and Value** - Mutation testing is expensive
## Common Pitfalls
| Pitfall | Solution |
|---------|----------|
| Running on everything | Target specific modules |
| Ignoring equivalent mutants | Review and mark properly |
| Adding tests without understanding | Understand what behavior mutant changes |
| Over-testing to kill mutants | Focus on meaningful mutations |
## Resources
See `resources/` directory for operator guide, score interpretation, and framework examples.
## Relationship to Other Skills
**Complements:** `property-based-testing`, `test-writing-patterns`, `tdd-refactor-phase`
**Independent from:** Beginner skills
## Expected Outcome
After using this skill: Mutation testing configured, initial score established, survived mutants analyzed, tests improved to kill meaningful mutants.
---
**End of Mutation Testing Skill**
