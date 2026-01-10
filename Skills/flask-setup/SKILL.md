---
name: flask-setup-for-beginners
description: Set up Python Flask development environment for beginners with step-by-step guidance, virtual environment creation, and troubleshooting
license: Complete terms in LICENSE.txt
---

# Flask Setup for Beginners
**Version:** v0.23.0

## When to Use

- User wants to build a Flask web application
- User is a beginner and needs Flask environment setup
- User asks "How do I set up Flask?"

## Instructions for ASSISTANT

**Format ALL technical instructions as Claude Code copy/paste blocks.**

```
TASK: Set up Flask project

STEP 1: Copy this entire code block
STEP 2: Open Claude Code
STEP 3: Paste into Claude Code
STEP 4: Report back: What did Claude Code say?

---
[Instructions for Claude Code to execute:]
cd [project-location]
mkdir [project-name]
cd [project-name]
python --version
python -m venv venv
[continue with commands...]

Report:
- What results did you see?
```

## Setup Steps

### 1. Verify Python
```bash
python --version
```
Expected: `Python 3.8.x` or higher

### 2. Create Virtual Environment
```bash
python -m venv venv
```
Wait 10-30 seconds. Creates `venv` folder.

### 3. Activate Virtual Environment

**Windows PowerShell:** `venv\Scripts\Activate.ps1`
**Windows Command Prompt:** `venv\Scripts\activate.bat`
**Mac/Linux:** `source venv/bin/activate`

Success indicator: `(venv)` appears at start of terminal prompt

### 4. Install Flask
```bash
pip install flask
```
Wait 30-60 seconds.

### 5. Verify Installation
```bash
python --version
pip list
python -c "import flask; print(flask.__version__)"
```

## Project Structure

```
my-project/
├── venv/           <- Virtual environment folder
└── app.py          <- Your main Flask file
```

**Don't create app.py inside the venv folder!**

## Common Issues

1. **Virtual environment not activated** - Check for `(venv)` in prompt
2. **Python not in PATH** - Reinstall Python with "Add to PATH" checked
3. **Permission errors** - Make sure virtual environment is activated
4. **Execution policy error (Windows):**
   ```bash
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Resources

- `resources/verification-checklist.md`

---

**Remember:** Keep the terminal window with `(venv)` open while developing!
