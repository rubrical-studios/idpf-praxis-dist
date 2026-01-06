---
name: tdd-failure-recovery
description: Guide experienced developers through TDD failure scenarios and recovery procedures when tests behave unexpectedly
license: Complete terms in LICENSE.txt
---
# TDD Failure Recovery
**Version:** v0.22.0
**Source:** Skills/tdd-failure-recovery/SKILL.md

Guides experienced developers through diagnosing and recovering from unexpected test behaviors in the TDD cycle.
## When to Use This Skill
- RED phase test passes unexpectedly (should fail)
- GREEN phase test still fails (should pass)
- REFACTOR phase breaks tests (should stay green)
- Tests behave unpredictably or inconsistently
- Need to rollback to previous working state
## Scenario 1: RED Phase Test Passes Unexpectedly
**Expected:** Test should FAIL | **Actual:** Test PASSES immediately
**Possible causes:**
- Feature already exists
- Test is too permissive
- Test setup incorrect
**Recovery:**
1. Verify test is executing (add intentional failure)
2. Check for existing implementation
3. Review test logic
4. Revise test, verify it fails
5. Resume TDD cycle
## Scenario 2: GREEN Phase Test Still Fails
**Expected:** Implementation should make test PASS | **Actual:** Test still FAILS
**Possible causes:**
- Implementation incomplete
- Implementation has bugs
- Test expectations misunderstood
- Environmental issues
**Recovery:**
1. Read failure message carefully
2. Verify implementation
3. Check test requirements
4. Revise implementation
5. Run full test suite
6. Resume TDD cycle
## Scenario 3: REFACTOR Phase Breaks Tests
**Expected:** Refactoring should keep tests GREEN | **Actual:** Tests FAIL
**Critical:** `TESTS MUST STAY GREEN. If refactoring breaks tests -> ROLLBACK`
**Possible causes:**
- Behavioral change introduced
- Breaking change in API
- Incomplete refactoring
- Test dependency on implementation
**Recovery:**
1. **IMMEDIATE ROLLBACK** to last green state
2. Analyze what broke
3. Options: Skip refactoring, smaller refactoring, or fix brittle test
4. Resume TDD cycle
## Scenario 4: Inconsistent Test Results
**Problem:** Tests pass sometimes, fail other times
**Possible causes:**
- Test order dependency
- Timing issues / race conditions
- External dependencies
- Random data in tests
**Recovery:**
1. Isolate the test (run alone, different order)
2. Check test isolation
3. Fix: proper setup/teardown, fixtures, mock externals
4. Verify consistency
## Diagnostic Flowchart
```
Test failed unexpectedly -> What phase?
├── RED (should fail, but passes) -> Test invalid -> Revise test
├── GREEN (should pass, but fails) -> Impl incomplete -> Revise impl
└── REFACTOR (should stay green, but fails) -> ROLLBACK immediately
```
## Prevention Strategies
**RED phase:** Always run test and verify it fails
**GREEN phase:** Run test and verify it passes, run full suite
**REFACTOR phase:** Run full suite after every change, small steps
**Golden rule:** Tests should ALWAYS be green except during RED phase
## Common Recovery Patterns
| Pattern | Situation | Action |
|---------|-----------|--------|
| **Reset** | Confused state | Rollback to last known green |
| **Minimal Fix** | Small issue, clear fix | Targeted correction |
| **Skip** | Risk > reward | Skip change, maintain green |
| **Divide and Conquer** | Large change broke something | Break into smaller changes |
## Resources
See `resources/` directory for failure diagnostic flowchart, recovery procedures, and test isolation guide.
## Relationship to Other Skills
**Supports all phases:** `tdd-red-phase`, `tdd-green-phase`, `tdd-refactor-phase`
**Related:** `test-writing-patterns`
## Expected Outcome
After successful failure recovery: Tests returned to expected state, understanding of what went wrong, ready to resume TDD cycle.
---
**End of TDD Failure Recovery Skill**
