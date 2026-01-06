---
name: beginner-testing
description: Introduce test-driven development to beginners with simple Flask/Sinatra test examples and TDD concepts
license: Complete terms in LICENSE.txt
---
# Beginner Testing Introduction
**Version:** v0.22.0
**Source:** Skills/beginner-testing/SKILL.md

Introduces beginners to automated testing and Test-Driven Development (TDD) with simple, understandable examples.
## When to Use This Skill
- User has working Vibe app ready to transition to Structured Phase
- User mentions "testing" or asks "how to test"
- Evolution Point reached (user says "Ready-to-Structure")
- User has built 3-4 features and wants to add quality assurance
## Prerequisites
User should have:
- Working Flask or Sinatra app with 3-4 features
- Understanding of routes and functions
- Code that works, but no tests yet
## What is Testing?
Testing means writing code that checks if your code works.
**Without tests:** Make a change -> Open browser -> Click around manually -> Hope nothing broke -> Repeat
**With tests:** Make a change -> Run tests (one command) -> See green or red -> Know immediately if something broke
## What is TDD?
**The TDD Cycle: RED -> GREEN -> REFACTOR**
1. **RED:** Write a test that fails (feature doesn't exist yet)
2. **GREEN:** Write just enough code to make test pass
3. **REFACTOR:** Clean up the code while tests still pass
Then repeat for next feature!
## Types of Tests
1. **Unit Tests** - Tests individual functions/pieces
2. **Route Tests** - Tests that web pages load correctly (start here for beginners)
3. **Integration Tests** - Tests that different parts work together
## Your First Test (Flask)
```python
# test_app.py
def test_homepage_loads():
    """Test that homepage loads without errors."""
    from app import app
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200  # 200 = success
```
**Run:** `pip install pytest && pytest`
## Your First Test (Sinatra)
```ruby
# test_app.rb
require 'minitest/autorun'
require 'rack/test'
require_relative 'app'
class AppTest < Minitest::Test
  include Rack::Test::Methods
  def app
    Sinatra::Application
  end
  def test_homepage_loads
    get '/'
    assert last_response.ok?
  end
end
```
**Run:** `ruby test_app.rb`
## Common Assertions
**Python (pytest):**
```python
assert something == True
assert value == 5
assert 'text' in response.data
```
**Ruby (minitest):**
```ruby
assert something
assert_equal 5, value
assert_includes body, 'text'
```
## TDD Example: Adding Delete Feature
**Step 1: RED** - Write failing test
```python
def test_delete_note():
    client = app.test_client()
    client.post('/add', data={'note': 'Test note'})
    response = client.get('/delete/1')
    assert response.status_code == 302
```
Run test -> It fails! (Route doesn't exist yet)
**Step 2: GREEN** - Make test pass
```python
@app.route('/delete/<int:note_id>')
def delete_note(note_id):
    conn = get_db()
    conn.execute('DELETE FROM notes WHERE id = ?', (note_id,))
    conn.commit()
    conn.close()
    return redirect('/')
```
Run test -> It passes!
**Step 3: REFACTOR** - Clean up code (tests still pass)
## Common Testing Mistakes
1. **Not running tests** - Run tests after every change
2. **Tests depend on order** - Each test should work independently
3. **Testing too much at once** - Small tests, one thing each
4. **Not testing the right thing** - Actually verify the important behavior
## Benefits of TDD for Beginners
1. **Clarity** - Test defines what "working" means
2. **Confidence** - Know immediately when something breaks
3. **Better Code** - Testable code is usually better organized
4. **Documentation** - Tests show how to use your code
5. **Less Fear** - Change code without worrying about breaking things
## Resources
See `resources/` directory for complete examples:
- `flask-test-example.py`
- `sinatra-test-example.rb`
- `tdd-explained.md`
## Next Steps
Once comfortable with basic testing: Add more route tests, test form submissions, test database operations, learn fixtures and mocking.
---
**End of Beginner Testing Introduction Skill**
