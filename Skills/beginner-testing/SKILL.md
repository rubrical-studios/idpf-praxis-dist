---
name: beginner-testing
description: Introduce test-driven development to beginners with simple Flask/Sinatra test examples and TDD concepts
license: Complete terms in LICENSE.txt
---

# Beginner Testing Introduction
**Version:** v0.23.0

## When to Use

- User has working Vibe app ready to transition to Structured Phase
- User mentions "testing" or asks about "how to test"
- Evolution Point reached (user says "Ready-to-Structure")
- User asks "How do I know if my code works?"

## Prerequisites

- Working Flask or Sinatra app with 3-4 features
- Understanding of routes and functions
- Code that works, but no tests yet

## What is Testing?

```
Without tests:
1. Make a change to code
2. Open browser, click around manually
3. Hope nothing broke
4. Repeat for every change

With tests:
1. Make a change to code
2. Run tests (one command)
3. See green or red
4. Know immediately if something broke
```

## TDD Cycle

```
RED -> GREEN -> REFACTOR

1. RED: Write a test that fails (feature doesn't exist yet)
2. GREEN: Write just enough code to make test pass
3. REFACTOR: Clean up the code
Then repeat!
```

## Types of Tests

1. **Unit Tests** - Test individual functions
2. **Route Tests** - Test that web pages load correctly
3. **Integration Tests** - Test that different parts work together

**For beginners: Start with route tests!**

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

**How to run:**
```bash
pip install pytest
pytest
```

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

**How to run:**
```bash
ruby test_app.rb
```

## Common Test Assertions

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

**Step 1: RED - Write failing test**
```python
def test_delete_note():
    client = app.test_client()
    client.post('/add', data={'note': 'Test note'})
    response = client.get('/delete/1')
    assert response.status_code == 302
```
Test fails! (Route doesn't exist)

**Step 2: GREEN - Make test pass**
```python
@app.route('/delete/<int:note_id>')
def delete_note(note_id):
    # ... implementation
    return redirect('/')
```
Test passes!

**Step 3: REFACTOR - Clean up**

## What to Test (Beginners)

**Test:**
- Routes exist (not 404)
- Forms submit successfully
- Data saves to database
- Data displays correctly

**Don't worry yet about:**
- Edge cases
- Error handling
- Performance

## Common Testing Mistakes

1. **Not running tests** - Run tests after every change
2. **Tests depend on order** - Each test should work independently
3. **Testing too much at once** - Small tests, one thing each

## Resources

- `resources/flask-test-example.py`
- `resources/sinatra-test-example.rb`
- `resources/tdd-explained.md`

---

**End of Beginner Testing Skill**
