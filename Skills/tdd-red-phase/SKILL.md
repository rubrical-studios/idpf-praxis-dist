---
name: tdd-red-phase
description: Guide experienced developers through RED phase of TDD cycle - writing failing tests and verifying expected failures
license: Complete terms in LICENSE.txt
---
# TDD RED Phase
**Version:** v0.22.0
**Source:** Skills/tdd-red-phase/SKILL.md

Guides experienced developers through the RED phase: writing failing tests and verifying expected failures.
## When to Use This Skill
- Starting implementation of a new feature or behavior
- User issues "Start-Story [ID]" command in IDPF-Agile
- Beginning a new TDD iteration
## Prerequisites
- Working development environment with test framework
- Clear understanding of the behavior to be tested
- Claude Code available for test execution
## RED Phase Objective
**Write a test that fails for the right reason.**
**Correct failure:** Test fails because feature doesn't exist yet, failure message clearly indicates what's missing
**Incorrect failure:** Syntax error, missing imports, incorrect test setup, test passes unexpectedly
## RED Phase Workflow
### Step 1: Identify Testable Behavior
**One test per behavior, one behavior per test.**
Good: "Function returns sum of two numbers", "GET /users returns 200 status"
Poor: "User management works" (too broad), "Fix the bug" (not a behavior)
### Step 2: Write the Failing Test
**Test structure (AAA):**
1. ARRANGE: Set up test data and preconditions
2. ACT: Execute the behavior being tested
3. ASSERT: Verify the expected outcome
**Single Code Block Format:**
```
TASK: [Description]
STEP 1: [Create/open test file]
STEP 2: [Add imports]
STEP 3: [Write complete test function]
STEP 4: [Save file]
STEP 5: [Run test command]
STEP 6: [Verify test FAILS with expected message]
STEP 7: [Report back: Did test fail as expected?]
```
### Step 3: Execute and Verify Failure
- Test executed without syntax errors
- Test failed (not passed)
- Failure message indicates missing implementation
### Step 4: Analyze Failure
- **If test fails as expected:** Proceed to GREEN phase
- **If test passes unexpectedly:** Test is invalid, revise test
- **If test errors instead of fails:** Fix test code, repeat
## Best Practices
### Write Minimal Tests
Good: Single assertion, simplest test data
Poor: Multiple unrelated assertions, complex setup
### Use Clear Test Names
`test_[unit]_[scenario]_[expected_result]`
Example: `test_add_function_with_positive_numbers_returns_sum`
### Write Descriptive Assertions
Good: Clear comparison, helpful failure messages, test behavior not implementation
## Common Mistakes
| Mistake | Solution |
|---------|----------|
| Test passes immediately | Verify feature doesn't exist yet |
| Test has syntax errors | Fix syntax, ensure proper imports |
| Test too broad | Split into multiple focused tests |
| Unclear failure message | Add descriptive assertion messages |
## Anti-Patterns
1. **Writing Implementation First** - Wrong order, should be test first
2. **Skipping Failure Verification** - Always RUN test and VERIFY it fails
3. **Tolerating Test Errors** - Fix test now so it fails cleanly
## RED Phase Checklist
- [ ] Test code is complete and syntactically correct
- [ ] Test executes without errors
- [ ] Test FAILS (does not pass)
- [ ] Failure message clearly indicates missing implementation
- [ ] Test name clearly describes behavior
- [ ] Test is focused on single behavior
## Resources
See `resources/` directory for red-phase-checklist, test-structure-patterns, failure-verification-guide.
## Relationship to Other Skills
**Flows to:** `tdd-green-phase`
**Related:** `test-writing-patterns`, `tdd-failure-recovery`
**Independent from:** `beginner-testing`
## Expected Outcome
After successful RED phase: One failing test exists, failure is verified and understood, ready for GREEN phase.
---
**End of TDD RED Phase Skill**
