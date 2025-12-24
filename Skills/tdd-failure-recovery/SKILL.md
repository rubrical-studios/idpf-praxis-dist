---
name: tdd-failure-recovery
version: v0.15.0
description: Diagnose and recover from unexpected test behavior during TDD
---

# TDD Failure Recovery

## When to Use
- Test passes when it should fail (RED phase problem)
- Test fails when it should pass (GREEN phase problem)
- Test behavior is inconsistent
- Unexpected error messages

## Diagnosis Checklist

### Test Passes When Should Fail
1. Test assertions correct?
2. Test actually running? (check test discovery)
3. Test name matches pattern? (test_ prefix)
4. Correct file being tested?

### Test Fails When Should Pass
1. Implementation complete?
2. Correct return type?
3. Edge cases handled?
4. Dependencies mocked correctly?

### Inconsistent Results
1. Shared state between tests?
2. Order-dependent tests?
3. External dependencies (DB, network)?
4. Async timing issues?

## Recovery Strategies

### Rollback-Previous-Step
Undo last change, verify stable state, try again

### Isolate the Problem
Run single test, add debug output, check assumptions

### Verify Test Setup
Check fixtures, mocks, test database state

## Output Format
```
DIAGNOSIS: [What's wrong]
ROOT CAUSE: [Why it happened]
SOLUTION: [How to fix]
VERIFICATION: [How to confirm fixed]
```
