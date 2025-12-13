---
name: mutation-testing
version: 1.0.0
description: Guide developers through mutation testing to assess and improve test suite quality
license: Complete terms in LICENSE.txt
---
# Mutation Testing
This Skill guides developers through mutation testing, a technique for evaluating test suite quality by introducing small changes (mutations) to code and checking if tests catch them.
## When to Use This Skill
Invoke this Skill when:
- Assessing test suite quality beyond code coverage
- Identifying weak spots in test coverage
- Evaluating whether tests are meaningful
- Improving test effectiveness
- Making decisions about test maintenance
## What is Mutation Testing?
### Core Concept
1. **Mutate:** Make small changes to source code (mutations)
2. **Test:** Run test suite against mutated code
3. **Evaluate:** Check if tests detect (kill) the mutations
### Key Terms
**Mutant:** A modified version of the original code with one small change.
**Mutation Operator:** A rule defining how to modify code (e.g., change `+` to `-`).
**Killed Mutant:** A mutant detected by at least one failing test.
**Survived Mutant:** A mutant not detected by any test (tests still pass).
**Equivalent Mutant:** A mutant that behaves identically to original (cannot be killed).
**Mutation Score:** Percentage of killed mutants: `killed / (total - equivalent)`.
## Why Mutation Testing?
### Code Coverage Limitations
```python
# 100% code coverage, but weak test
def calculate_discount(price, is_member):
    if is_member:
        return price * 0.9
    return price
def test_discount():
    assert calculate_discount(100, True) is not None  # Passes, but weak!
```
### Mutation Testing Catches This
```python
# Mutation: change 0.9 to 0.8
def calculate_discount(price, is_member):
    if is_member:
        return price * 0.8  # MUTANT
    return price
# Weak test still passes - mutant SURVIVES
# This reveals the test doesn't check the actual discount value
```
## Mutation Operators
### Arithmetic Operators
| Original | Mutated | Example |
|----------|---------|---------|
| `+` | `-` | `a + b` → `a - b` |
| `-` | `+` | `a - b` → `a + b` |
| `*` | `/` | `a * b` → `a / b` |
| `/` | `*` | `a / b` → `a * b` |
| `%` | `*` | `a % b` → `a * b` |
### Relational Operators
| Original | Mutated | Example |
|----------|---------|---------|
| `<` | `<=` | `x < y` → `x <= y` |
| `<=` | `<` | `x <= y` → `x < y` |
| `>` | `>=` | `x > y` → `x >= y` |
| `>=` | `>` | `x >= y` → `x > y` |
| `==` | `!=` | `x == y` → `x != y` |
| `!=` | `==` | `x != y` → `x == y` |
### Logical Operators
| Original | Mutated | Example |
|----------|---------|---------|
| `and` | `or` | `a and b` → `a or b` |
| `or` | `and` | `a or b` → `a and b` |
| `not` | (removed) | `not x` → `x` |
### Constant Mutations
| Original | Mutated | Example |
|----------|---------|---------|
| `0` | `1` | `return 0` → `return 1` |
| `1` | `0` | `x = 1` → `x = 0` |
| `true` | `false` | `return true` → `return false` |
| `""` | `"mutant"` | `s = ""` → `s = "mutant"` |
### Statement Mutations
| Type | Description | Example |
|------|-------------|---------|
| Statement deletion | Remove a statement | Delete `x = x + 1` |
| Return value | Change return | `return x` → `return 0` |
| Void call removal | Remove void method call | Delete `log(msg)` |
## Understanding Mutation Score
### Interpreting Scores
| Score | Interpretation |
|-------|----------------|
| 90-100% | Excellent test suite |
| 75-89% | Good test suite |
| 60-74% | Acceptable, room for improvement |
| Below 60% | Weak test suite, needs attention |
### Score Context Matters
**High-risk code:** Aim for 90%+ (payment processing, authentication, data validation)
**Standard code:** Aim for 75%+ (business logic, API endpoints, data transformations)
**Low-risk code:** 60% may be acceptable (logging, debug utilities, simple getters/setters)
### Why Not 100%?
- **Equivalent mutants:** Some mutations don't change behavior
- **Diminishing returns:** Last few percent may not be worth effort
- **Maintenance cost:** More tests = more maintenance
## Analyzing Survived Mutants
### Step-by-Step Process
1. **Review the mutant**
   ```
   Survived: Line 42: changed > to >=
   Original: if (count > 0)
   Mutant:   if (count >= 0)
   ```
2. **Understand the impact**
   ```
   What behavior changes when count == 0?
   Is this case tested?
   ```
3. **Decide on action**
   - Add test for boundary case
   - Mark as equivalent mutant
   - Accept the risk
### Common Survival Patterns
**Missing boundary tests:**
```
# Survives: count > 0 → count >= 0
# Fix: Add test for count == 0
```
**Missing error case tests:**
```
# Survives: removed throw statement
# Fix: Add test that expects exception
```
**Missing assertion:**
```
# Survives: return value changed
# Fix: Assert on return value, not just no exception
```
## Equivalent Mutants
### What Are They?
Mutants that produce identical behavior to the original code.
### Examples
```python
# Original
def max(a, b):
    if a > b:
        return a
    return b
# Equivalent mutant (same behavior when a == b)
def max(a, b):
    if a >= b:  # EQUIVALENT MUTANT
        return a
    return b
```
### Handling Equivalent Mutants
1. **Manual review:** Mark as equivalent in tool
2. **Exclude patterns:** Configure tool to skip known patterns
3. **Accept score impact:** Account for them in score interpretation
## Integration Workflow
### When to Run
**CI Pipeline:**
- On pull requests (subset or changed files only)
- Nightly full runs
- Before releases
**Local Development:**
- On specific modules you're working on
- Before marking feature complete
### Performance Optimization
Mutation testing can be slow. Optimization strategies:
1. **Limit scope:** Test only changed code
2. **Parallel execution:** Run mutants in parallel
3. **Incremental analysis:** Skip unchanged files
4. **Sampling:** Test subset of mutants
### Configuration Example
```yaml
# Example mutation testing config
mutation:
  target: src/
  tests: tests/
  timeout_factor: 2.0
  parallel: 4
  skip_patterns:
    - "**/generated/**"
    - "**/migrations/**"
  operators:
    - arithmetic
    - relational
    - logical
```
## Framework-Specific Guidance
### Python (mutmut)
```bash
# Install
pip install mutmut
# Run mutation testing
mutmut run
# View results
mutmut results
# View specific mutant
mutmut show 42
```
### JavaScript (Stryker)
```bash
# Install
npm install @stryker-mutator/core
# Initialize
npx stryker init
# Run
npx stryker run
```
### Java (PIT/Pitest)
```xml
<!-- Maven plugin -->
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.15.0</version>
</plugin>
```
```bash
# Run
mvn org.pitest:pitest-maven:mutationCoverage
```
### Other Frameworks
| Language | Tool | Notes |
|----------|------|-------|
| Python | mutmut | Simple CLI, good integration |
| JavaScript/TypeScript | Stryker | Feature-rich, good reporting |
| Java | PIT | Industry standard for Java |
| C# | Stryker.NET | .NET port of Stryker |
| Ruby | mutant | Semantic mutations |
| Go | go-mutesting | Go support |
## Best Practices
### 1. Start Small
Don't run on entire codebase at once:
- Start with critical modules
- Expand coverage gradually
- Focus on high-risk code first
### 2. Set Realistic Goals
Don't aim for 100% immediately:
- Start with current score
- Set incremental improvement targets
- Track progress over time
### 3. Address Survivors Systematically
For each survived mutant:
1. Is it equivalent? Mark it.
2. Is test missing? Add it.
3. Is it acceptable risk? Document why.
### 4. Integrate with CI
- Run on PRs (limited scope)
- Block on score regression
- Provide clear feedback
### 5. Balance Cost and Value
Mutation testing is expensive:
- Prioritize critical code
- Use sampling for large codebases
- Accept diminishing returns
## Common Pitfalls
### Pitfall 1: Running on Everything
**Problem:** Full mutation testing takes hours
**Solution:** Target specific modules, use incremental analysis
### Pitfall 2: Ignoring Equivalent Mutants
**Problem:** Score seems stuck below 80%
**Solution:** Review survivors, mark equivalents properly
### Pitfall 3: Adding Tests Without Understanding
**Problem:** Tests added just to kill mutants
**Solution:** Understand what behavior mutant changes, test that behavior
### Pitfall 4: Over-Testing to Kill Mutants
**Problem:** Hundreds of tests for edge cases
**Solution:** Focus on meaningful mutations, accept some survivors
## Resources
See `resources/` directory for:
- `operator-guide.md` - Detailed mutation operator reference
- `score-interpretation.md` - Understanding and improving scores
- `framework-examples.md` - Framework-specific setup and usage
## Relationship to Other Skills
**Complements:**
- `property-based-testing` - Another advanced testing technique
- `test-writing-patterns` - Writing effective tests
- `tdd-refactor-phase` - Improving code with test safety
**Independent from:**
- Beginner skills - This skill assumes testing experience
## Expected Outcome
After using this skill:
- Mutation testing configured for project
- Initial mutation score established
- Survived mutants analyzed
- Tests improved to kill meaningful mutants
- CI integration planned or implemented
---
**End of Mutation Testing Skill**
