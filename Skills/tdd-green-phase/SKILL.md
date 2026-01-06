---
name: tdd-green-phase
description: Guide experienced developers through GREEN phase of TDD cycle - writing minimal implementation to pass failing tests
license: Complete terms in LICENSE.txt
---
# TDD GREEN Phase
**Version:** v0.22.0
**Source:** Skills/tdd-green-phase/SKILL.md

Guides experienced developers through the GREEN phase: implementing the minimum code necessary to make a failing test pass.
## When to Use This Skill
- RED phase test has been verified as failing
- Proceeding autonomously from RED phase
- Implementing feature to pass test
## Prerequisites
- Completed RED phase with verified failing test
- Clear understanding of what test expects
- Claude Code available for execution
## GREEN Phase Objective
**Write the minimum code to make the test pass.**
**Correct approach:** Implements exactly what test requires, no additional features, simplest solution, avoids premature optimization
**Incorrect approach:** Implements untested features, over-engineers solution, adds "might need later" functionality
## GREEN Phase Workflow
### Step 1: Understand Test Requirements
- What behavior is expected?
- What inputs/outputs?
- What edge cases?
### Step 2: Plan Minimal Implementation
- Minimum logic needed
- Required data structures
- Avoid planning untested features
### Step 3: Implement and Verify
**Single Code Block Format:**
```
TASK: [Description]
STEP 1: [Open file]
STEP 2: [Add implementation]
STEP 3: [Save file]
STEP 4: [Run test command]
STEP 5: [Verify test PASSES]
STEP 6: [Report back: Did test pass?]
```
### Step 4: Analyze Success
- **If test passes:** Proceed to REFACTOR phase
- **If test still fails:** Revise implementation, repeat
- **If other tests fail:** Fix regressions, re-run all tests
## Best Practices
### YAGNI (You Aren't Gonna Need It)
Good: Implements exactly what test requires, hard-coded values acceptable
Poor: Implements untested features "just in case"
### Simplest Thing That Works
Test: Function should return sum of two numbers
RIGHT: Function takes two parameters, returns their sum. Done.
WRONG: Generic calculation engine with configuration system
### Let Tests Drive Design
Test tells you: function signature, parameters, return type, behavior
### Hard-Code First, Generalize Later
Test expects specific output? Return that output. Generalize in future tests.
## Implementation Strategies
| Strategy | When | Example |
|----------|------|---------|
| **Fake It** | Very simple test | Return hard-coded expected value |
| **Obvious Implementation** | Solution is straightforward | `return a + b` |
| **Triangulation** | Not sure how to generalize | Add more tests until pattern emerges |
## Common Mistakes
1. **Over-Implementation** - Adding features not required by test
2. **Premature Abstraction** - Creating abstractions before needed
3. **Ignoring Test Failure Details** - Not reading what test expects
4. **Breaking Existing Tests** - Not running full suite
## GREEN Phase Checklist
- [ ] Implementation code is complete and correct
- [ ] Target test now PASSES (green)
- [ ] Implementation is minimal
- [ ] No existing tests broke
- [ ] Code is understandable
- [ ] No untested features added
## Resources
See `resources/` directory for green-phase-checklist, minimal-implementation-guide, triangulation-examples.
## Relationship to Other Skills
**Flows from:** `tdd-red-phase`
**Flows to:** `tdd-refactor-phase`
**Related:** `tdd-failure-recovery`, `test-writing-patterns`
## Expected Outcome
After successful GREEN phase: Test is green, implementation is minimal, no regressions, ready for REFACTOR phase.
---
**End of TDD GREEN Phase Skill**
