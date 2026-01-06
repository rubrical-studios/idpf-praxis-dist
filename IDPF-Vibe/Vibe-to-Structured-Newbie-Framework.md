# Vibe-to-Structured Development Framework (Newbie)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Newbie-Framework.md
**Type:** Beginner-Friendly Development Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specialization for developers new to programming. Emphasizes learning, clear explanations, and gradual skill building using simple technologies.
**Evolution Target:** IDPF-Agile

---

## Technology Scope (Newbie-Friendly)
### Backend Frameworks
| Framework | Why | Complexity |
|-----------|-----|------------|
| **Ruby with Sinatra** | Minimal syntax, reads like English | ⭐ Easiest |
| **Python with Flask** | Clear syntax, extensive resources | ⭐ Very beginner-friendly |

### Frontend
- **Vanilla HTML/CSS/JS**: No build tools, fundamentals (⭐)
- **htmx/Alpine.js**: Add interactivity without much JS (⭐⭐)

### Database
- **SQLite**: No server setup, simple SQL (⭐)
- **File-based (JSON/CSV)**: No database needed (⭐)

### What This Framework Avoids
- Complex JS frameworks (React, Vue, Angular)
- Advanced build tools (Webpack)
- Microservices, complex databases
- Docker, containers, cloud infrastructure

---

## Session Initialization
**STEP 0: Verify Claude Code Setup**
```
Do you have Claude Code installed and ready?
✅ "Yes, Claude Code is ready"
❓ "No" or "I'm not sure" → Guide installation
```

**After verification, ask:**
- Operating system? (Windows/Mac/Linux)
- Programming experience? (None/Some/Comfortable with basics)
- What do you want to build? (Website/API/Desktop app/Learning project)
- Language preference? (Python or Ruby/No preference)
- Preferred learning style? (Step-by-step/Explore freely/Mix)

**Adapt based on OS:**
- Windows: `venv\Scripts\activate`, PowerShell/CMD
- Mac/Linux: `source venv/bin/activate`, Bash

---

## Setup: Flask (Python)
```bash
mkdir my-app && cd my-app
python -m venv venv
# Windows: venv\Scripts\activate | Mac: source venv/bin/activate
pip install flask
```

## Setup: Sinatra (Ruby)
```bash
mkdir my-app && cd my-app
gem install bundler
# Create Gemfile with: gem 'sinatra'
bundle install
```

---

## Flask Example (Beginner)
```python
# app.py
from flask import Flask, render_template, request, redirect

app = Flask(__name__)
notes = []  # Data storage (list for now)

@app.route('/')
def home():
    return render_template('index.html', notes=notes)

@app.route('/add', methods=['POST'])
def add_note():
    note_text = request.form['note']
    notes.append(note_text)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
```

**Running:**
```
STEP 1: Activate venv (see (venv) in terminal)
STEP 2: python app.py
STEP 3: Open http://localhost:5000
STEP 4: To stop: Ctrl+C
```

---

## Sinatra Example (Beginner)
```ruby
# app.rb
require 'sinatra'

$notes = []

get '/' do
  erb :index, locals: { notes: $notes }
end

post '/add' do
  $notes << params['note']
  redirect '/'
end
```

**Running:** `ruby app.rb` → Open http://localhost:4567

---

## Error Explanations (Newbie-Friendly)
**"ModuleNotFoundError: No module named 'flask'"**
```
1. Flask isn't installed → pip install flask
2. Venv not activated → Run activate command
3. Wrong folder → cd to your project folder
```

**"Address already in use"**
```
Server already running in another terminal.
Fix: Find other terminal → Ctrl+C to stop → Try again
```

---

## Progressive Feature Addition
| Level | Focus | Learn |
|-------|-------|-------|
| 1 | Single route, static text | Routes, functions, server |
| 2 | Forms and input | GET vs POST, forms |
| 3 | Store in list/array | Variables, loops |
| 4 | Multiple pages | Routing, links |
| 5 | SQLite database | SQL basics, persistence |
| 6 | Basic styling | CSS, layouts |
| 7 | Edit/Delete/Search | CRUD operations |

---

## Verification Pattern (Extra Detailed)
```
STEP 1: Save file (Ctrl+S / Cmd+S)
STEP 2: Check terminal (server running? errors?)
STEP 3: Refresh browser (F5 / Ctrl+R)
STEP 4: Did change appear? If not: Did you save? Restart server?
STEP 5: If error, read ENTIRE error message
STEP 6: Report: "It worked!" OR "Error: [exact message]"
```

---

## Pedagogical Approach
**Explain the "Why":**
```
We're using POST because POST is for actions that CHANGE data.
GET is for actions that just READ data.
```

**Use Analogies:**
```
Routes are like doors in a building:
- Each route (door) leads somewhere different
- The URL is like the door number
- The function is what happens inside that room
```

**Celebrate Progress:**
```
🎉 You just created a web server! That's a major milestone.
```

---

## Desktop App Option (No Web Server)
```python
import json, os

NOTES_FILE = 'notes.json'

def load_notes():
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, 'r') as f: return json.load(f)
    return []

def main():
    notes = load_notes()
    while True:
        print("\n1. View  2. Add  3. Delete  4. Quit")
        choice = input("Choice: ")
        if choice == '1': print(notes)
        elif choice == '2': notes.append(input("Note: "))
        elif choice == '4': break

if __name__ == '__main__': main()
```

---

## Evolution Point for Newbies
**When to Evolve:**
- Completed 4-5 small features
- Comfortable with basic concepts
- Code works but feels messy
- Asking about "best practices"

**Testing Introduction:**
```
Testing means:
- Writing code that checks if your code works
- Catching bugs before users find them
- Being confident when making changes
```

---

## Graduation Criteria
Ready to move to Web Framework when:
- ✅ Built 3-4 working applications
- ✅ Comfortable with routes, templates, forms
- ✅ Understand request/response cycle
- ✅ Can debug common errors yourself
- ✅ Comfortable with basic SQL
- ✅ Want to learn more complex patterns

**Don't rush!** This framework is designed for learning.

---

## Resources
- **Flask**: https://flask.palletsprojects.com/tutorial/
- **Sinatra**: http://sinatrarb.com/intro.html
- **Web Basics**: https://developer.mozilla.org/
- **SQL**: https://www.sqlitetutorial.net/

---

**End of Newbie Framework**
