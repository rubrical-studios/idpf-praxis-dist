---
name: tdd-refactor-phase
version: v0.15.0
description: Guide through REFACTOR phase of TDD cycle - improving code while tests pass
---

# TDD REFACTOR Phase

## When to Use
- GREEN phase complete (test passes)
- User responds "Done-Next-Step" after GREEN
- Code works but could be improved

## REFACTOR Phase Goal
**Improve code quality while keeping tests green.**

## What to Refactor
- Remove duplication (DRY)
- Improve naming (clarity)
- Simplify logic (KISS)
- Extract methods/classes (SRP)
- Remove magic numbers
- Improve structure

## What NOT to Do
- Add new features (needs test first)
- Change behavior (tests should still pass)
- Break working code

## Workflow
1. Identify refactoring opportunity
2. Make small change
3. Run tests - must stay GREEN
4. Repeat or move to next RED phase

## Output Format
```
TASK: Refactor [description]
STEP 1: [Identify improvement]
STEP 2: [Apply refactoring]
STEP 3: [Run tests - verify GREEN]
STEP 4: [Report results]
```

## Next Step
After refactoring complete → Next TDD cycle (RED phase for new behavior)
