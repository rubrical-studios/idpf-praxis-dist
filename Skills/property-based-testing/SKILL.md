---
name: property-based-testing
description: Guide developers through property-based testing including property definition, shrinking, and framework-specific implementation
license: Complete terms in LICENSE.txt
---

# Property-Based Testing
**Version:** v0.19.0

## When to Use
- Functions with many possible inputs
- Testing mathematical/algorithmic properties
- Finding edge cases traditional testing misses
- Serialization/deserialization roundtrips
- Parsers or data transformations

## Core Concepts
**Property:** Assertion that holds for all valid inputs
**Generator:** Creates random test inputs
**Shrinking:** Finds minimal failing case when test fails
**Counterexample:** Specific input that violates property

## Property Types

| Pattern | Template | Example |
|---------|----------|---------|
| **Roundtrip** | `decode(encode(x)) == x` | serialize/deserialize |
| **Idempotence** | `f(f(x)) == f(x)` | sort, absolute |
| **Commutativity** | `f(a,b) == f(b,a)` | add, union |
| **Associativity** | `f(f(a,b),c) == f(a,f(b,c))` | addition |
| **Identity** | `f(x, identity) == x` | add(x,0) |
| **Invariant** | `invariant(state)` always true | length preserved |

## Writing Good Properties
- Describe **what**, not how
- Make properties specific
- Combine multiple properties for complete coverage
```
sort(list) properties:
1. len(sort(list)) == len(list)
2. is_sorted(sort(list)) == true
3. multiset(sort(list)) == multiset(list)
```

## Generators
**Built-in:** integers, floats, strings, booleans, lists, dicts
**Custom:** Constrained values, composite objects, dependent generators

## Shrinking
When test fails, framework finds simpler input that still fails.
```
Original: [43, -91, 7, 0, -15, 28]
Shrunk:   [0, -1]
```

## Framework Examples

**Python (Hypothesis):**
```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers()))
def test_sort_preserves_length(lst):
    assert len(sorted(lst)) == len(lst)
```

**JavaScript (fast-check):**
```javascript
fc.assert(fc.property(fc.array(fc.integer()), arr =>
  arr.sort().length === arr.length
));
```

## Frameworks
| Language | Framework |
|----------|-----------|
| Python | Hypothesis |
| JavaScript | fast-check |
| Java | jqwik |
| Scala | ScalaCheck |
| Rust | proptest |

## Common Pitfalls
- Overly constrained generators
- Testing implementation details
- Non-deterministic properties
- Slow generators
- Ignoring counterexamples

## Debug Process
1. Read counterexample
2. Reproduce manually
3. Add debug logging
4. Fix bug
5. Add as regression test

---

**End of Property-Based Testing Skill**
