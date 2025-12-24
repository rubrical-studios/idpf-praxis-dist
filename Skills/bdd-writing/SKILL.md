---
name: bdd-writing
version: v0.5.0
description: Write Gherkin feature files and step definitions for BDD
---

# BDD Writing Skill

## When to Use
- Writing executable specifications
- Creating Gherkin feature files
- Implementing step definitions
- ATDD/BDD workflow

## Gherkin Syntax
```gherkin
Feature: User Authentication
  As a registered user
  I want to log into my account
  So that I can access my data

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the dashboard

  Scenario: Invalid password
    Given I am on the login page
    When I enter wrong password
    Then I should see an error message
```

## Keywords
| Keyword | Purpose |
|---------|---------|
| Feature | High-level description |
| Scenario | Specific test case |
| Given | Precondition/context |
| When | Action/trigger |
| Then | Expected outcome |
| And/But | Additional steps |

## Step Definition Pattern (Python/Behave)
```python
@given('I am on the login page')
def step_login_page(context):
    context.browser.get('/login')

@when('I enter valid credentials')
def step_enter_credentials(context):
    context.browser.fill('username', 'test@example.com')
    context.browser.fill('password', 'password123')
```

## Best Practices
- Write in business language
- One behavior per scenario
- Keep steps reusable
- Avoid technical details in feature files
