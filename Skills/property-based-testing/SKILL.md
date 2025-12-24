---
name: property-based-testing
version: v0.5.0
description: Property-based testing with Hypothesis (Python) and fast-check (JS)
---

# Property-Based Testing

## When to Use
- Testing mathematical properties
- Edge case discovery
- Fuzz testing
- Input validation testing

## Concept
Instead of specific examples, define properties that should always hold true. The framework generates many random inputs.

## Hypothesis (Python)
```python
from hypothesis import given
from hypothesis.strategies import integers, text

@given(integers(), integers())
def test_addition_is_commutative(a, b):
    assert a + b == b + a

@given(text())
def test_string_roundtrip(s):
    assert s.encode().decode() == s
```

## fast-check (JavaScript)
```javascript
const fc = require('fast-check');

test('sort is idempotent', () => {
    fc.assert(fc.property(
        fc.array(fc.integer()),
        (arr) => {
            const sorted = [...arr].sort((a, b) => a - b);
            return JSON.stringify(sorted) ===
                   JSON.stringify([...sorted].sort((a, b) => a - b));
        }
    ));
});
```

## Common Strategies
| Strategy | Generates |
|----------|-----------|
| integers() | Random integers |
| text() | Random strings |
| lists() | Random lists |
| dictionaries() | Random dicts |

## Benefits
- Finds edge cases automatically
- Tests properties, not examples
- Shrinks failing cases to minimal examples
- Better coverage than manual tests
