---
name: common-beginner-coding-errors
description: Diagnose and solve common beginner programming mistakes in Flask or Sinatra development with detailed explanations
license: Complete terms in LICENSE.txt
---

# Common Beginner Coding Errors
**Version:** v0.23.0

## When to Use

- Beginner reports an error message
- Code isn't working as expected
- User asks "Why isn't this working?"

## Error Diagnosis Process

1. Get complete error information
2. Identify error category
3. Guide to solution
4. Teach prevention

## Common Errors

### 1. Changes Don't Appear When Refreshing Browser

**Diagnosis:**
1. Did you save the file?
2. Did you restart the server?
3. Are you editing the correct file?

**Solutions:**
- **File Not Saved:** Check for unsaved indicator (dot/asterisk), press Ctrl+S
- **Server Not Restarted (Sinatra):** Ctrl+C then restart
- **Browser Cache:** Hard refresh with Ctrl+Shift+R

### 2. Template Not Found

**Flask:** `TemplateNotFound: index.html`
**Sinatra:** `Errno::ENOENT: No such file or directory`

**Flask Structure:**
```
my-project/
├── app.py
└── templates/      <- Must be named exactly "templates"
    └── index.html
```

**Sinatra Structure:**
```
my-project/
├── app.rb
└── views/          <- Must be named exactly "views"
    └── index.erb
```

### 3. IndentationError (Python)

```
IndentationError: expected an indented block
```

**Fix:**
- Use 4 spaces for each indentation level
- Don't mix tabs and spaces
- Enable "Show Whitespace" in editor

### 4. ModuleNotFoundError: No module named 'flask'

**Causes:**
1. Virtual environment not activated
2. Flask not installed

**Check for `(venv)` in terminal prompt:**
```
Wrong:  C:\Projects\my-app>
Correct: (venv) C:\Projects\my-app>
```

**Activate:**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

### 5. 404 Not Found

**Causes:**
1. Typo in URL
2. Route not defined
3. Wrong HTTP method

**Route Check:**
```python
# Flask
@app.route('/about')
def about():
    return "About page"

# For forms with POST:
@app.route('/add', methods=['GET', 'POST'])
```

### 6. Address Already in Use

**Solutions:**
1. Find and stop other server in another terminal
2. Kill the process:
   - Mac/Linux: `lsof -i :5000` then `kill <PID>`
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
3. Use different port: `app.run(debug=True, port=5001)`

### 7. Nothing Returned from Route

**Flask - Wrong:**
```python
@app.route('/')
def home():
    notes = get_notes()
    # Forgot to return something!
```

**Flask - Right:**
```python
@app.route('/')
def home():
    notes = get_notes()
    return render_template('index.html', notes=notes)
```

## Debugging Mindset

```
1. Read the Error - Error messages tell you what's wrong
2. Find the Location - Error shows file and line number
3. Form a Hypothesis - What might be wrong?
4. Test the Hypothesis - Make one small change, test
5. Learn from It - You'll remember this error
```

## Resources

- `resources/flask-errors.md`
- `resources/sinatra-errors.md`
- `resources/general-errors.md`

---

**End of Common Errors Skill**
