---
name: property-based-testing
description: Guide developers through property-based testing including property definition, shrinking, and framework-specific implementation
license: Complete terms in LICENSE.txt
---
# Property-Based Testing
**Version:** v0.22.0
**Source:** Skills/property-based-testing/SKILL.md

Guides developers through property-based testing (PBT), where you define properties that should hold for all inputs, and the framework generates test cases automatically.
## When to Use This Skill
- Writing tests for functions with many possible inputs
- Testing mathematical or algorithmic properties
- Finding edge cases traditional testing might miss
- Verifying serialization/deserialization roundtrips
- Testing parsers or data transformations
## Traditional vs Property-Based
**Traditional:** `Test: add(2, 3) should equal 5`
**Property-based:** `For all integers a, b: add(a, b) == add(b, a)` [commutative]
## Key Concepts
- **Property:** Assertion that should hold for all valid inputs
- **Generator:** Creates random test inputs
- **Shrinking:** When test fails, finds minimal failing case
- **Counterexample:** Specific input that violates the property
## Common Property Types
| Property | Pattern |
|----------|---------|
| **Roundtrip** | `decode(encode(x)) == x` |
| **Idempotence** | `f(f(x)) == f(x)` |
| **Commutativity** | `f(a, b) == f(b, a)` |
| **Associativity** | `f(f(a, b), c) == f(a, f(b, c))` |
| **Identity** | `f(x, identity) == x` |
| **Invariant** | After operation, invariant still holds |
| **Reference** | `new_impl(x) == reference_impl(x)` |
## Generators
**Built-in:** Integers, floats, strings, booleans, lists, dictionaries
**Custom examples:**
```
positive_int = integers(min_value=1)
small_list = lists(integers(), max_size=10)
user = builds(User, name=text(min_size=1), age=integers(0, 150))
```
## Shrinking
When test fails, framework finds simpler input that still fails.
```
Original failing: [43, -91, 7, 0, -15, 28, -3, 99]
After shrinking:  [0, -1]
```
Use shrunk counterexample to understand and fix the bug.
## Framework Tools
| Language | Framework | Notes |
|----------|-----------|-------|
| Python | Hypothesis | Most popular, excellent shrinking |
| JavaScript | fast-check | Good TypeScript support |
| Java | jqwik | JUnit 5 integration |
| Rust | proptest | Good Rust integration |
**Python example:**
```python
from hypothesis import given, strategies as st
@given(st.lists(st.integers()))
def test_sort_preserves_length(lst):
    assert len(sorted(lst)) == len(lst)
```
## Common Pitfalls
| Pitfall | Solution |
|---------|----------|
| Overly constrained generators | Use varying sizes including empty |
| Testing implementation details | Test properties, not implementation |
| Non-deterministic properties | Use deterministic properties |
| Slow generators | Size inputs appropriately |
| Ignoring counterexamples | Fix bug, add as regression test |
## Debugging Failed Properties
1. Read the counterexample
2. Reproduce manually
3. Simplify if needed
4. Add debug logging
5. Fix the bug
6. Add counterexample as regression test
## Resources
See `resources/` directory for property patterns, shrinking guide, and framework examples.
## Relationship to Other Skills
**Complements:** `test-writing-patterns`, `mutation-testing`, `tdd-red-phase`
**Independent from:** Beginner skills
## Expected Outcome
After using this skill: Property-based testing concepts understood, properties defined, generators configured, counterexamples analyzed, property tests integrated with test suite.
---
**End of Property-Based Testing Skill**
