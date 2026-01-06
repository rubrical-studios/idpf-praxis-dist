---
name: common-beginner-coding-errors
description: Diagnose and solve common beginner programming mistakes in Flask or Sinatra development with detailed explanations
license: Complete terms in LICENSE.txt
---
# Common Beginner Coding Errors
**Version:** v0.22.0
**Source:** Skills/common-errors/SKILL.md

Helps beginners diagnose and fix the most common errors encountered when learning Flask or Sinatra web development.
## When to Use This Skill
- Beginner reports an error message
- Code isn't working as expected
- User asks "Why isn't this working?"
## Common Errors by Category
### 1. Changes Don't Appear When Refreshing Browser
**Diagnosis:**
1. Did you save the file? (Check for unsaved indicator: * or dot)
2. Did you restart the server? (Flask auto-reloads with debug=True, Sinatra doesn't)
3. Are you editing the correct file?
**Solutions:**
- **File Not Saved:** Ctrl+S (Windows/Linux) or Cmd+S (Mac)
- **Server Not Restarted (Sinatra):** Ctrl+C then `ruby app.rb`
- **Browser Cache:** Hard refresh with Ctrl+Shift+R
### 2. Template Not Found
**Flask:** `TemplateNotFound: index.html`
**Sinatra:** `Errno::ENOENT: No such file or directory`
**Solution:**
- Flask: Templates must be in `templates/` folder (exact name)
- Sinatra: Templates must be in `views/` folder (exact name)
### 3. IndentationError (Python)
Python uses indentation to group code. Use 4 spaces for each indentation level. Don't mix tabs and spaces.
```python
# Wrong:
def my_function():
print("hello")  # Not indented!
# Right:
def my_function():
    print("hello")  # Indented 4 spaces
```
### 4. ModuleNotFoundError: No module named 'flask'
**Diagnosis:** Check for `(venv)` at start of terminal prompt.
**Solutions:**
- **Virtual environment not activated:** `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
- **Flask not installed:** `pip install flask`
### 5. NameError: uninitialized constant Sinatra (Ruby)
**Solution:** Check `require 'sinatra'` at top of file, run `bundle install`, use `bundle exec ruby app.rb`
### 6. 404 Not Found
**Causes:**
- Typo in URL (routes are case-sensitive)
- Route not defined in code
- Wrong HTTP method (GET vs POST)
**Solutions:**
- Check spelling in both code and browser
- Add the missing route
- Flask: `@app.route('/add', methods=['GET', 'POST'])`
- Sinatra: Use `get '/add'` or `post '/add'`
### 7. Address Already in Use
**Cause:** Port already being used by another process
**Solutions:**
- Find and stop other server running in another terminal
- Kill process using the port
- Use different port: Flask `app.run(port=5001)`, Sinatra `set :port, 4568`
### 8. Nothing Returned from Route
**Cause:** Route function doesn't return anything
**Solution:** Routes MUST return something (HTML string, template, redirect, JSON)
```python
# Flask - Right:
@app.route('/')
def home():
    return render_template('index.html', notes=notes)
```
```ruby
# Sinatra - Right:
get '/' do
  erb :index
end
```
## Error Diagnosis Process
1. **Get Complete Error Information** - Exact message, file/line number, terminal output
2. **Identify Error Category** - Look for keywords (IndentationError, TemplateNotFound, 404, etc.)
3. **Guide to Solution** - Explain cause, show fix steps, explain why fix works
4. **Teach Prevention** - How to avoid this error in future
## Debugging Mindset for Beginners
1. **Read the Error** - Error messages are helpful, not scary
2. **Find the Location** - Error shows file and line number
3. **Form a Hypothesis** - What might be wrong?
4. **Test the Hypothesis** - Make one small change, test
5. **Learn from It** - You'll remember this error
## Resources
See `resources/` directory for framework-specific error guides:
- `flask-errors.md`
- `sinatra-errors.md`
- `general-errors.md`
---
**End of Common Beginner Coding Errors Skill**
