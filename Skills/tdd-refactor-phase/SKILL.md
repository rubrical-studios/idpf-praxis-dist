---
name: tdd-refactor-phase
description: Guide experienced developers through REFACTOR phase of TDD cycle - improving code quality while maintaining green tests
license: Complete terms in LICENSE.txt
---
# TDD REFACTOR Phase
**Version:** v0.22.0
**Source:** Skills/tdd-refactor-phase/SKILL.md

Guides experienced developers through the REFACTOR phase: improving code quality, structure, and clarity while ensuring all tests remain green.
## When to Use This Skill
- GREEN phase complete with passing test
- Proceeding autonomously from GREEN phase
- Evaluating refactoring opportunities
## Prerequisites
- Completed GREEN phase with all tests passing
- Full test suite available
- Claude Code available for execution
## REFACTOR Phase Objectives
1. **Improve code quality** - Make code cleaner, more maintainable
2. **Keep tests green** - All improvements maintain existing functionality
**Refactoring IS:** Improving structure without changing behavior, improving readability, eliminating duplication
**Refactoring IS NOT:** Adding new features, changing behavior, fixing bugs, performance optimization without measurement
## REFACTOR Phase Workflow
### Step 1: Analyze Refactoring Opportunities
Claude Code identifies: code duplication, long functions, unclear names, missing abstractions, complex conditionals
### Step 2: Evaluate Suggestions
**Refactor Now:** Clear improvement, low risk, high value
**Skip Refactoring:** Premature abstraction, risk > reward, better addressed later
### Step 3: Apply Refactoring (if approved)
**Single Code Block Format:**
```
TASK: [Description]
STEP 1: [Open file]
STEP 2: [Apply refactored code]
STEP 3: [Save file]
STEP 4: [Run full test suite]
STEP 5: [Verify ALL tests still PASS]
STEP 6: [Report back: All tests green?]
```
### Step 4: Verify Tests Remain Green
**Critical:** If ANY test fails -> ROLLBACK immediately -> Keep tests green
## Best Practices
### Refactor in Small Steps
Good: Extract one variable -> Run tests -> Rename one function -> Run tests
Poor: Extract + rename + restructure all at once
### One Refactoring at a Time
Focus on: Eliminate duplication, improve naming, extract function, simplify conditional
### Keep Tests Green
**Golden rule:** Tests must ALWAYS be green after refactoring.
If refactoring breaks tests -> Rollback immediately
### Refactor for Clarity, Not Cleverness
Good: Makes code easier to understand
Poor: Clever one-liners that obscure intent
## Common Refactorings
| Refactoring | Before | After |
|-------------|--------|-------|
| **Extract Variable** | Calculation embedded | Well-named variable |
| **Extract Function** | Long function | Multiple focused functions |
| **Rename** | Unclear names | Self-documenting code |
| **Eliminate Duplication** | Same code multiple places | Single function |
| **Simplify Conditional** | Nested conditions | Guard clauses |
## When to Skip Refactoring
| Scenario | Decision |
|----------|----------|
| Premature abstraction | Skip - Wait for second/third occurrence |
| Code already clear | Skip - Don't refactor for sake of it |
| High risk, low value | Skip/Defer |
| Over-engineering | Skip - Keep it simple |
## Anti-Patterns
1. **Refactoring Without Tests** - Always run tests after changes
2. **Accepting Broken Tests** - ROLLBACK if tests fail
3. **Big Bang Refactoring** - Use small incremental changes
4. **Refactoring + Features** - Never both at same time
## REFACTOR Phase Checklist
- [ ] Code analyzed for refactoring opportunities
- [ ] Suggestions evaluated
- [ ] If refactoring applied:
  - [ ] Refactored code is clear and improved
  - [ ] All tests PASS (green)
  - [ ] Behavior unchanged
- [ ] If refactoring skipped: Valid reason documented
## Resources
See `resources/` directory for refactor-checklist, common-refactorings, when-to-skip-refactoring.
## Relationship to Other Skills
**Flows from:** `tdd-green-phase`
**Flows to:** `tdd-red-phase` (next feature)
**Related:** `tdd-failure-recovery`
## Expected Outcome
After successful REFACTOR phase: Code quality improved (if refactored) or intentionally left as-is, all tests remain green, ready for next RED phase.
---
**End of TDD REFACTOR Phase Skill**
