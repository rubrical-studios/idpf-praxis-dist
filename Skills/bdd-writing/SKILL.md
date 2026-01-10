---
name: bdd-writing
description: Guide developers on writing BDD specifications using Gherkin syntax, feature files, and step definitions
license: Complete terms in LICENSE.txt
---

# BDD Writing
**Version:** v0.23.0

## When to Use

- Writing acceptance criteria as executable specifications
- Creating feature files for new functionality
- Defining step definitions for scenarios
- Integrating BDD with TDD workflow
- Tool selection guidance (Cucumber, pytest-bdd, etc.)

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

### Basic Feature File Structure

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

### Scenario Outline (Parameterized Tests)

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

### Data Tables

```gherkin
Scenario: Create multiple users
  Given the following users exist:
    | username | email            | role  |
    | alice    | alice@example.com| admin |
    | bob      | bob@example.com  | user  |
  When I view the user list
  Then I see 2 users
```

## Step Definition Best Practices

1. **Keep Steps Reusable** - Generic over specific
2. **Use Parameters** - Single definition for multiple cases
3. **Declarative Over Imperative** - Test behavior, not UI mechanics

## Best Practices

| Do | Don't |
|----|-------|
| One behavior per scenario | Multiple behaviors per scenario |
| Use business language | Use technical jargon |
| Keep scenarios short (3-7 steps) | Write long scenarios (10+ steps) |
| Make scenarios independent | Create dependencies between scenarios |

## Anti-Patterns to Avoid

1. **UI-Focused Steps** - "When I click button with id submit-btn"
2. **Too Many Steps** - Split into focused scenarios
3. **Coupled Steps** - Steps should be self-contained
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

## Tool Selection Guide

| Tool | Language | Best For |
|------|----------|----------|
| **Cucumber** | JS, Java, Ruby | Multi-language, most popular |
| **pytest-bdd** | Python | pytest integration |
| **SpecFlow** | C#/.NET | .NET ecosystem |
| **Behave** | Python | Python alternative |
| **Karate** | Java | API testing with BDD |

## Resources

- `resources/gherkin-syntax.md`
- `resources/feature-file-template.md`
- `resources/step-definition-patterns.md`
- `resources/tool-comparison.md`

---

**End of BDD Writing Skill**
