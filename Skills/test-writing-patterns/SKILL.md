---
name: test-writing-patterns
description: Guide experienced developers on test structure, patterns, assertions, and test doubles for effective test-driven development
license: Complete terms in LICENSE.txt
---
# Test Writing Patterns
**Version:** v0.22.0
**Source:** Skills/test-writing-patterns/SKILL.md

Provides experienced developers with test structure patterns, assertion strategies, test doubles, and organizational practices.
## When to Use This Skill
- Guidance on test structure
- Questions about test organization
- Deciding which type of test to write
- Test double (mock/stub/fake) guidance
- Want to improve test quality
## Test Structure Patterns
### AAA Pattern (Arrange-Act-Assert)
```
ARRANGE: Set up test conditions and inputs
ACT: Execute the behavior being tested
ASSERT: Verify the expected outcome
```
### Given-When-Then (BDD Style)
```
GIVEN: Initial context/preconditions
WHEN: Action/event occurs
THEN: Expected outcomes
```
Mapping: GIVEN=ARRANGE, WHEN=ACT, THEN=ASSERT
## Test Organization
### File Organization
Mirror production structure:
```
src/services/user_service -> tests/services/test_user_service
src/utils/validator -> tests/utils/test_validator
```
### Naming Convention
`test_[unit]_[scenario]_[expected]`
Example: `test_get_user_when_not_found_returns_null`
## Assertion Strategies
### Single Concept Per Test
Good: Multiple assertions verifying the same concept (user creation sets properties)
Poor: Multiple unrelated assertions (test user operations)
### Common Assertion Types
| Type | Example |
|------|---------|
| Equality | `assert actual == expected` |
| Truthiness | `assert condition is true` |
| Comparison | `assert value > 0` |
| Collection | `assert item in collection` |
| Exception | `assert raises(ExpectedException)` |
## Test Doubles
| Type | Purpose | When to Use |
|------|---------|-------------|
| **Stub** | Provide predetermined responses | Control dependency behavior |
| **Mock** | Verify interactions/calls | Verify method was called |
| **Fake** | Working simplified implementation | Need realistic behavior |
| **Spy** | Record info while delegating to real object | Real behavior + verification |
**Selection guide:**
- Need to control response? -> Stub
- Need to verify call made? -> Mock
- Need working but simple version? -> Fake
- Need real behavior + verification? -> Spy
## Test Isolation
**Each test should:**
- Set up its own data
- Clean up after itself
- Run in any order
- Not depend on other tests
## Test Data Strategies
**Explicit over random:** Use clear, specific test data
**Minimal:** Use simplest data that tests the behavior
**Builders:** Pattern for complex object creation with defaults
## Testing by Type
| Type | Characteristics | Focus |
|------|-----------------|-------|
| **Unit** | Fast, isolated, no external deps | Logic, edge cases |
| **Integration** | Multiple units, may use real deps | Interface contracts, data flow |
| **E2E** | Complete workflows, real system | Critical user paths |
## Test Smells and Fixes
| Smell | Fix |
|-------|-----|
| Test does too much | Split into multiple focused tests |
| Tests are brittle | Test behavior, not implementation |
| Tests are slow | Use test doubles, optimize setup |
| Tests are unclear | Better naming, clear AAA structure |
| Tests depend on each other | Ensure test isolation |
| Duplicate setup | Extract to fixtures |
## Coverage Considerations
Coverage shows which code is executed by tests, not that tests are good quality.
**Guidelines:**
- High coverage for critical paths
- Focus on meaningful tests, not coverage numbers
- Use coverage to find untested code
## Parameterized Tests
Same test logic, different data - reduces duplication, easy to add cases.
## Resources
See `resources/` directory for AAA pattern template, test doubles guide, assertion patterns, organization examples.
## Relationship to Other Skills
**Used by:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`
**Complements:** `tdd-failure-recovery`
**Independent from:** `beginner-testing`
## Expected Outcome
After applying patterns: Tests are well-structured, appropriate test doubles used, clear assertions, good organization, independent tests, maintainable test suite.
---
**End of Test Writing Patterns Skill**
