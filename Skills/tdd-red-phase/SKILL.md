---
name: tdd-red-phase
version: v0.15.0
description: Guide experienced developers through RED phase of TDD cycle - writing failing tests
---

# TDD RED Phase

## When to Use
- Starting implementation of new feature
- "First-Step" command in IDPF-Structured
- "Start-Story [ID]" command in IDPF-Agile
- Beginning new TDD iteration

## RED Phase Goal
**Write a test that fails for the right reason.**

**Correct failure:** Test fails because feature doesn't exist yet
**Incorrect failure:** Syntax error, missing imports, test passes unexpectedly

## Workflow
1. **Identify Testable Behavior:** One test per behavior
2. **Write Failing Test:** ARRANGE → ACT → ASSERT
3. **Execute Test:** Verify it FAILS with expected message
4. **Report:** Did test fail as expected?

## Output Format
```
TASK: [description]
STEP 1: [Create/open test file]
STEP 2: [Add imports]
STEP 3: [Write complete test]
STEP 4: [Save file]
STEP 5: [Run test command]
STEP 6: [Verify FAILS with expected message]
STEP 7: [Report results]
```

## Next Step
After test fails correctly → User says "Done-Next-Step" → Invoke tdd-green-phase
