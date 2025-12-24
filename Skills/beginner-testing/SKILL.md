---
name: beginner-testing
version: v0.2.0
description: Introduce test-driven development to beginners with simple examples
---

# Beginner Testing Introduction

## When to Use
- User has working Vibe app ready for Structured Phase
- User mentions "testing" or asks "how to test"
- Evolution Point reached ("Ready-to-Structure")
- User asks "How do I know if my code works?"

## Prerequisites
- Working Flask or Sinatra app with 3-4 features
- Understanding of routes and functions
- Code that works but no tests yet

## What is Testing?
Writing code that checks if your code works.
- Without tests: Make change → Click around → Hope nothing broke
- With tests: Make change → Run tests → Know immediately if something broke

## TDD Cycle: RED → GREEN → REFACTOR
1. **RED:** Write a test that fails (feature doesn't exist yet)
2. **GREEN:** Write just enough code to pass
3. **REFACTOR:** Clean up while tests still pass

## Types of Tests
- **Unit tests:** Test one function
- **Integration tests:** Test functions working together
- **Route tests:** Test web endpoints

## First Test Pattern

**Flask (pytest):**
```python
def test_homepage_returns_200(client):
    response = client.get('/')
    assert response.status_code == 200
```

**Sinatra (minitest):**
```ruby
def test_homepage_returns_200
  get '/'
  assert last_response.ok?
end
```
