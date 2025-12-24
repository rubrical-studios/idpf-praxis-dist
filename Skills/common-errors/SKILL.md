---
name: common-beginner-coding-errors
version: v0.15.0
description: Diagnose and solve common beginner programming mistakes in Flask or Sinatra
---

# Common Beginner Coding Errors

## When to Use
- Beginner reports an error message
- Code isn't working as expected
- User asks "Why isn't this working?"

## Common Errors

### Changes Don't Appear
**Causes:** File not saved, server not restarted, browser cache
**Fix:**
1. Check for unsaved indicator (● or *) → Ctrl+S
2. Restart server (Sinatra doesn't auto-reload)
3. Hard refresh: Ctrl+Shift+R

### Template Not Found
**Flask:** `TemplateNotFound: index.html`
**Fix:** Templates must be in `templates/` folder

**Sinatra:** `Errno::ENOENT`
**Fix:** Templates must be in `views/` folder

### Indentation Errors (Python)
**Error:** `IndentationError: expected an indented block`
**Fix:** Use consistent 4 spaces, no tabs

### NameError: name 'X' is not defined
**Causes:** Typo in variable name, variable not created yet, import missing
**Fix:** Check spelling, ensure variable is defined before use

### ModuleNotFoundError
**Error:** `ModuleNotFoundError: No module named 'flask'`
**Fix:** `pip install flask` (or gem install for Ruby)

### Port Already in Use
**Error:** `Address already in use`
**Fix:** Another server is running. Stop it with Ctrl+C or use different port

### Syntax Error
**Causes:** Missing colon, unmatched brackets, wrong quotes
**Fix:** Check line indicated in error, look for missing `:`, `(`, `{`
