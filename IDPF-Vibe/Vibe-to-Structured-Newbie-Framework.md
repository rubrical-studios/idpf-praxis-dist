# Vibe-to-Structured Development Framework (Newbie)
**Version:** v0.25.0
**Type:** Beginner-Friendly Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Technology Scope (Newbie-Friendly)
**Backend:** Python/Flask or Ruby/Sinatra
**Frontend:** Vanilla HTML/CSS/JavaScript, htmx, Alpine.js
**Database:** SQLite or JSON/CSV files
**Avoid:** React, Webpack, PostgreSQL, Docker, auth initially

## Available Skills
- **flask-setup**: Flask environment setup
- **sinatra-setup**: Sinatra environment setup
- **common-errors**: Diagnosis for beginner mistakes
- **sqlite-integration**: SQLite with teaching examples
- **beginner-testing**: TDD introduction

## Session Initialization (Newbie)
**STEP 0:** Verify Claude Code setup (required before proceeding)
**Questions:**
- Operating system? (Windows/Mac/Linux)
- Programming experience? (None/Some/Comfortable)
- What to build? (Website/API/Desktop/Learning)
- Language preference? (Python/Ruby)

**Adapt explanations based on experience level.**

## Vibe Commands (Beginner-Friendly)
* **"Vibe-Start"** - Begin building
* **"Try-This"** - Add a feature
* **"Show-Me"** - See what's built
* **"That-Works"** - Move to next
* **"Run-It"** - Test the app

## Setup Workflow (CRITICAL ORDER)
1. User says "Vibe-Start"
2. ASSISTANT invokes flask-setup or sinatra-setup Skill
3. Wait for user to report setup complete
4. ONLY THEN begin application code

## Flask Example
```python
from flask import Flask, render_template, request, redirect
app = Flask(__name__)
notes = []

@app.route('/')
def home():
    return render_template('index.html', notes=notes)

@app.route('/add', methods=['POST'])
def add_note():
    notes.append(request.form['note'])
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
```

## Running Applications
**Flask:** `python app.py` -> `http://localhost:5000`
**Sinatra:** `ruby app.rb` -> `http://localhost:4567`
**Always:** Check terminal for errors, refresh browser, report results

## Progressive Skill Building
1. Single route, display text
2. HTML form, accept input
3. Store data in list
4. Multiple pages, navigation
5. SQLite database
6. CSS styling
7. Edit/delete items

## Error Handling
**"ModuleNotFoundError: flask"**: Activate venv, then `pip install flask`
**"Address already in use"**: Close other terminal running server

## When Ready to Graduate
- Built 3-4 working apps
- Comfortable with routes, templates, forms
- Understand request/response cycle
- Can debug common errors
- Want more complex patterns

**End of Newbie Framework**
