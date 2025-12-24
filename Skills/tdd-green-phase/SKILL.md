---
name: tdd-green-phase
version: v0.2.0
description: Guide experienced developers through GREEN phase of TDD cycle - minimal implementation
---

# TDD GREEN Phase

## When to Use
- RED phase test verified as failing
- User responds "Done-Next-Step" after RED phase
- Moving from RED to GREEN in TDD cycle

## GREEN Phase Goal
**Write the minimum code to make the test pass.**

**Correct:** Implements exactly what test requires, simplest solution
**Incorrect:** Over-engineers, adds untested features, premature optimization

## Workflow
1. **Understand Test Requirements:** What does test expect?
2. **Plan Minimal Implementation:** Only what's tested
3. **Implement:** Write minimum code to pass
4. **Execute:** Verify test PASSES
5. **Report:** Did test pass?

## Output Format
```
TASK: [description]
STEP 1: [Open implementation file]
STEP 2: [Navigate to location]
STEP 3: [Add implementation code]
STEP 4: [Save file]
STEP 5: [Run test command]
STEP 6: [Verify PASSES]
STEP 7: [Report results]
```

## Next Step
After test passes → User says "Done-Next-Step" → Invoke tdd-refactor-phase
