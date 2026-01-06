---
name: bdd-writing
description: Guide developers on writing BDD specifications using Gherkin syntax, feature files, and step definitions
license: Complete terms in LICENSE.txt
---
# BDD Writing
**Version:** v0.22.0
**Source:** Skills/bdd-writing/SKILL.md

Guidance for writing Behavior-Driven Development (BDD) specifications using Gherkin syntax, feature files, and step definitions.
## When to Use This Skill
- Writing acceptance criteria as executable specifications
- Creating feature files for new functionality
- Defining step definitions for scenarios
- Integrating BDD with TDD workflow
- Questions about Gherkin syntax or tool selection
## Gherkin Syntax
### Core Keywords
| Keyword | Purpose |
|---------|---------|
| **Feature** | Groups related scenarios |
| **Scenario** | Single test case |
| **Given** | Preconditions/context |
| **When** | Action/event |
| **Then** | Expected outcome |
| **And/But** | Continue previous step type |
| **Background** | Shared setup for all scenarios |
| **Scenario Outline** | Parameterized scenarios |
| **Examples** | Data table for outlines |
### Feature File Structure
```gherkin
Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account
  Background:
    Given the login page is displayed
  Scenario: Successful login with valid credentials
    Given a user "alice" exists with password "secret123"
    When the user enters username "alice"
    And the user enters password "secret123"
    And the user clicks the login button
    Then the user sees the dashboard
```
### Scenario Outline (Parameterized)
```gherkin
Scenario Outline: Login with various credentials
  Given a user "<username>" exists with password "<password>"
  When the user attempts to login with "<input_user>" and "<input_pass>"
  Then the result is "<outcome>"
  Examples:
    | username | password  | input_user | input_pass | outcome |
    | alice    | secret123 | alice      | secret123  | success |
    | alice    | secret123 | alice      | wrong      | failure |
```
## Step Definitions
Step definitions connect Gherkin steps to executable code.
**Best practices:**
1. **Keep Steps Reusable** - Generic over specific
2. **Use Parameters** - Single definition for multiple cases
3. **Declarative Over Imperative** - "Given user is logged in" not "Given user opens login page and enters..."
## Best Practices
| Do | Don't |
|----|-------|
| One behavior per scenario | Multiple behaviors per scenario |
| Use business language | Use technical jargon |
| Keep scenarios short (3-7 steps) | Write long scenarios (10+ steps) |
| Make scenarios independent | Create dependencies between scenarios |
| Focus on behavior | Focus on UI mechanics |
## Anti-Patterns to Avoid
1. **UI-Focused Steps** - Test behavior, not UI mechanics
2. **Too Many Steps** - Split into focused scenarios
3. **Coupled Steps** - Self-contained steps
4. **Inconsistent Language** - Use consistent terminology
## BDD + TDD Integration (Double Loop)
```
OUTER LOOP: BDD (Acceptance Tests)
  1. Write failing acceptance scenario
  INNER LOOP: TDD (Unit Tests)
    2. RED: Write failing unit test
    3. GREEN: Write minimal code to pass
    4. REFACTOR: Improve code quality
    5. Repeat until feature complete
  6. Acceptance scenario passes
  7. Move to next scenario
```
## Tool Selection
| Tool | Language | Best For |
|------|----------|----------|
| **Cucumber** | JS, Java, Ruby | Most popular, multi-language |
| **pytest-bdd** | Python | Python projects, pytest integration |
| **SpecFlow** | C#/.NET | .NET ecosystem |
| **Behave** | Python | Python alternative to pytest-bdd |
| **Karate** | Java | API testing with BDD |
## Resources
See `resources/` directory for Gherkin syntax reference, feature file templates, and step definition patterns.
## Relationship to Other Skills
**Complements:** `test-writing-patterns`, `tdd-red-phase`, `beginner-testing`
**Used by:** IDPF-Agile for user story validation
## Expected Outcome
After applying BDD writing patterns: Feature files are clear and readable, scenarios focus on behavior, step definitions are reusable, BDD integrates smoothly with TDD workflow.
---
**End of BDD Writing Skill**
