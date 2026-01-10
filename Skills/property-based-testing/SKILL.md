---
name: property-based-testing
description: Guide developers through property-based testing including property definition, shrinking, and framework-specific implementation
license: Complete terms in LICENSE.txt
---

# Property-Based Testing
**Version:** v0.23.0

## When to Use

- Writing tests for functions with many possible inputs
- Testing mathematical or algorithmic properties
- Finding edge cases traditional testing might miss
- Verifying serialization/deserialization roundtrips

## Traditional vs Property-Based

**Traditional:** `Test: add(2, 3) should equal 5`
**Property-based:** `For all integers a and b, add(a, b) should equal add(b, a)`

### Key Concepts

- **Property:** Assertion that should hold for all valid inputs
- **Generator:** Creates random test inputs
- **Shrinking:** Finds minimal failing case when test fails
- **Counterexample:** Specific input that violates property

## Property Definition Patterns

| Pattern | Example |
|---------|---------|
| **Roundtrip** | `decode(encode(x)) == x` |
| **Idempotence** | `f(f(x)) == f(x)` |
| **Commutativity** | `f(a, b) == f(b, a)` |
| **Associativity** | `f(f(a, b), c) == f(a, f(b, c))` |
| **Identity** | `f(x, identity) == x` |
| **Invariant** | Property holds after any operation |

### Writing Good Properties

- **Describe what, not how**
- **Make properties specific**
- **Combine multiple properties**

## Generators

### Built-in
Integers, floats, strings, booleans, lists, dictionaries, optional values

### Custom Generators
```python
# Only positive integers
positive_int = integers(min_value=1)

# Bounded list size
small_list = lists(integers(), min_size=0, max_size=10)
```

## Shrinking

When a test fails, the framework tries to find a simpler input that still fails.

```
Original failing input: [43, -91, 7, 0, -15, 28, -3, 99]
After shrinking:        [0, -1]
```

## Framework-Specific Guidance

### Python (Hypothesis)
```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers()))
def test_sort_preserves_length(lst):
    assert len(sorted(lst)) == len(lst)
```

### JavaScript (fast-check)
```javascript
const fc = require('fast-check');

fc.assert(
  fc.property(fc.array(fc.integer()), (arr) => {
    return arr.sort().length === arr.length;
  })
);
```

### Other Frameworks

| Language | Framework |
|----------|-----------|
| Python | Hypothesis |
| JavaScript | fast-check |
| Java | jqwik |
| Scala | ScalaCheck |
| Rust | proptest |
| Go | gopter |

## Common Pitfalls

1. Overly constrained generators
2. Testing implementation details
3. Non-deterministic properties
4. Slow generators
5. Ignoring counterexamples

## Debugging Failed Properties

1. Read the counterexample
2. Reproduce manually
3. Simplify if needed
4. Add debug logging
5. Fix the bug
6. Add regression test

## Resources

- `resources/property-patterns.md`
- `resources/shrinking-guide.md`
- `resources/framework-examples.md`

---

**End of Property-Based Testing Skill**
