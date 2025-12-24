---
name: flask-setup-for-beginners
version: v0.2.0
description: Set up Python Flask development environment for beginners
---

# Flask Setup for Beginners

## When to Use
- User wants to build Flask web application
- User needs Flask environment setup
- User asks "How do I set up Flask?"

## Output Format
All instructions as Claude Code copy/paste blocks:
```
TASK: Set up Flask project
STEP 1: Copy entire block
STEP 2: Open Claude Code
STEP 3: Paste and execute
STEP 4: Report results
```

## Setup Steps

### 1. Create Project
```bash
mkdir [project-name]
cd [project-name]
```

### 2. Verify Python
```bash
python --version  # Should show Python 3.x
```

### 3. Create Virtual Environment
```bash
python -m venv venv
```

### 4. Activate Virtual Environment
**Windows:** `venv\Scripts\activate`
**macOS/Linux:** `source venv/bin/activate`

### 5. Install Flask
```bash
pip install flask
```

### 6. Create app.py
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

### 7. Run App
```bash
python app.py
```
Open http://localhost:5000

## Troubleshooting
- Python not found: Check installation, PATH
- pip not found: Use `python -m pip`
- Module not found: Activate virtual environment first
