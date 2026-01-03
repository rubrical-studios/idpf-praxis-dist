---
name: test-writing-patterns
description: Guide experienced developers on test structure, patterns, assertions, and test doubles for effective test-driven development
license: Complete terms in LICENSE.txt
---

# Test Writing Patterns
**Version:** 0.17.0

Test structure patterns, assertion strategies, test doubles, and organizational practices.

## When to Use
- Need guidance on test structure
- Questions about test organization
- Need test double (mock/stub/fake) guidance
- Uncertainty about assertion strategies

## Test Structure Patterns

### AAA Pattern (Arrange-Act-Assert)
```
ARRANGE: Set up test conditions and inputs
ACT: Execute the behavior being tested
ASSERT: Verify the expected outcome
```

### Given-When-Then (BDD Style)
```
GIVEN = ARRANGE (preconditions)
WHEN = ACT (action/event)
THEN = ASSERT (expected outcomes)
```

## Test Organization

**File Organization:** Mirror production structure
**Naming:** `test_[unit]_[scenario]_[expected]`
**Suite Organization:** By test type (unit/integration/e2e) or by feature

## Assertion Strategies

**Single Concept Per Test:** One assertion or set of related assertions
**Good Assertions:** Specific, include messages, test behavior not implementation

**Common Types:**
- Equality: `assert actual == expected`
- Truthiness: `assert condition is true`
- Comparison: `assert value > 0`
- Collection: `assert item in collection`
- Exception: `assert raises(ExpectedException)`

## Test Doubles

| Type | Purpose | When to Use |
|------|---------|-------------|
| **Stub** | Return predetermined responses | Control dependency behavior |
| **Mock** | Verify interactions/calls | Verify method was called |
| **Fake** | Working simplified implementation | Integration testing |
| **Spy** | Record calls while delegating to real | Need real behavior + verification |

**Selection:**
- Need controlled response? → Stub
- Need to verify call made? → Mock
- Need simple working version? → Fake
- Need real behavior + verification? → Spy

## Test Isolation

**Each test should:**
- Set up its own data
- Clean up after itself
- Run in any order
- Not depend on other tests

**Achieving Isolation:**
- Setup/Teardown per test
- Fixtures (fresh for each test)
- Database transactions/rollback

## Test Data Strategies

**Prefer:** Explicit, minimal, clear data
**Avoid:** Random data, excessive fields

**Test Data Builders:**
```
user = UserBuilder().with_name("Alice").with_role("admin").build()
```

## Test Types

| Type | Characteristics |
|------|-----------------|
| Unit | Fast, isolated, test single unit, use test doubles |
| Integration | Multiple units, may use real dependencies |
| E2E | Complete workflows, slowest, highest confidence |

## Test Smells and Fixes

| Smell | Fix |
|-------|-----|
| Does too much | Split into focused tests |
| Brittle | Test behavior, not implementation |
| Slow | Test doubles, optimize setup |
| Unclear | Better naming, AAA structure |
| Dependent on order | Test isolation |
| Duplicate setup | Fixtures, builders |

## Coverage Guidelines
- Focus on meaningful tests, not coverage numbers
- High coverage of critical paths
- Use coverage to find untested code
- TDD naturally produces good coverage

---

**End of Test Writing Patterns Skill**
