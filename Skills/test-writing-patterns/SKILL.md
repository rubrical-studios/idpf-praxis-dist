---
name: test-writing-patterns
version: v0.15.0
description: Patterns for writing effective, maintainable tests
---

# Test Writing Patterns

## When to Use
- Writing new tests in any TDD phase
- Improving existing test quality
- Reviewing test code

## Core Patterns

### AAA Pattern (Arrange-Act-Assert)
```
# Arrange: Set up test data and conditions
user = create_user(name="Test")

# Act: Execute the behavior
result = user.greet()

# Assert: Verify the outcome
assert result == "Hello, Test!"
```

### Given-When-Then (BDD style)
```
# Given: Initial context
given_user_is_logged_in()

# When: Action occurs
when_user_clicks_logout()

# Then: Expected outcome
then_user_is_redirected_to_login()
```

## Test Double Types
| Type | Purpose |
|------|---------|
| Stub | Returns fixed values |
| Mock | Verifies interactions |
| Fake | Simplified implementation |
| Spy | Records calls for verification |

## Good Test Characteristics
- **Fast:** Run quickly
- **Isolated:** No dependencies on other tests
- **Repeatable:** Same result every time
- **Self-validating:** Pass or fail clearly
- **Timely:** Written at right time (before code)

## Naming Convention
`test_[unit]_[scenario]_[expected]`

Example: `test_user_with_invalid_email_raises_error`
