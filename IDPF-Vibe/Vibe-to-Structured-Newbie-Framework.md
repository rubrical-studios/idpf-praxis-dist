# Vibe-to-Structured Development Framework (Newbie)
**Version:** v0.19.1
**Source:** IDPF-Vibe/Vibe-to-Structured-Newbie-Framework.md
**Type:** Beginner-Friendly Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for developers new to programming. Emphasizes learning, clear explanations, and gradual skill building.
**Evolution Target:** IDPF-Agile

---

## Required Skills
- **flask-setup**: Flask environment setup
- **sinatra-setup**: Sinatra environment setup
- **common-errors**: Troubleshooting common issues
- **sqlite-integration**: Database integration
- **beginner-testing**: TDD introduction

---

## Technology Scope (Newbie-Friendly)

### Backend (Choose One)
**Ruby/Sinatra:** Minimal syntax, reads like English
**Python/Flask:** Clear syntax, extensive resources

### Frontend
Vanilla HTML/CSS/JavaScript (no build tools)

### Database
**SQLite:** No setup, just a file
**File-based (JSON):** Human-readable

### What This Framework Avoids
React/Vue/Angular, complex build tools, microservices, Docker, cloud infrastructure

---

## Session Initialization

**STEP 0: Verify Claude Code Setup**
```
Do you have Claude Code installed and ready?
- Yes → "Yes, Claude Code is ready"
- No/Unsure → Guide through setup
```

**Then ask:**
- Operating system? (Windows/Mac/Linux)
- Programming experience? (None/Some/Comfortable)
- What to build? (Website/API/Desktop/Learning)
- Language? (Python or Ruby?)

---

## Vibe Phase Workflow

**After "Vibe-Start":**
1. Determine framework (Flask or Sinatra)
2. Invoke setup Skill BEFORE any code
3. Wait for user to report setup complete
4. ONLY THEN begin application code

---

## Instructive Code Pattern

```python
# app.py - Main Flask file

# Import Flask - gives us web tools
from flask import Flask, render_template, request

# Create Flask app instance
app = Flask(__name__)

# @app.route: when visiting '/', run this function
@app.route('/')
def home():
    # render_template finds HTML in templates/ folder
    return render_template('index.html', notes=notes)

# debug=True: helpful errors, auto-reload
if __name__ == '__main__':
    app.run(debug=True)
```

---

## Running Applications

**Flask:**
1. Activate venv: `venv\Scripts\activate` (Windows)
2. Run: `python app.py`
3. Browser: http://localhost:5000
4. Stop: Ctrl+C

**Sinatra:**
1. Run: `ruby app.rb`
2. Browser: http://localhost:4567
3. Stop: Ctrl+C

---

## Error Explanations

**"ModuleNotFoundError: No module named 'flask'"**
1. Flask not installed → `pip install flask`
2. venv not activated → run activate command
3. Wrong folder → `cd` to project folder

**"Address already in use"**
Server running in another terminal → Ctrl+C there first

---

## Progressive Levels

| Level | Skills |
|-------|--------|
| 1 | Single route, display text |
| 2 | HTML forms, user input |
| 3 | Store data in list |
| 4 | Multiple pages, navigation |
| 5 | SQLite database |
| 6 | CSS styling |
| 7 | Edit/Delete/Search |

---

## Verification Pattern

```
STEP 1: Save file (Ctrl+S)
STEP 2: Check terminal for errors
STEP 3: Refresh browser (F5)
STEP 4: Report: "It worked!" or "Error: [message]"
```

---

## Celebration Milestones

**First page load:** You created a web server!
**First form:** You handled user input!
**First database:** You're a database developer!

---

## When to Graduate

Ready for Web Framework when:
- Built 3-4 working apps
- Comfortable with routes, templates, forms
- Understand request/response cycle
- Can debug common errors yourself
- Comfortable with basic SQL

---

**End of Newbie Framework**
