---
name: flask-setup-for-beginners
description: Set up Python Flask development environment for beginners with step-by-step guidance, virtual environment creation, and troubleshooting
license: Complete terms in LICENSE.txt
---
# Flask Setup for Beginners
**Version:** v0.22.0
**Source:** Skills/flask-setup/SKILL.md

Guides complete beginners through setting up a Flask development environment with detailed explanations and verification steps.
## When to Use This Skill
- User wants to build a Flask web application
- User is a beginner and needs Flask environment setup
- User asks "How do I set up Flask?"
## ASSISTANT Output Format
**CRITICAL:** Format ALL technical instructions as Claude Code copy/paste blocks.
```
TASK: Set up Flask project
STEP 1: Copy this entire code block
STEP 2: Open Claude Code
STEP 3: Paste into Claude Code
STEP 4: Report back: What did Claude Code say?
---
[Instructions for Claude Code to execute]
```
## Setup Steps
### Step 1: Verify Python
```bash
python --version
```
Expected: `Python 3.8.x` or higher
### Step 2: Create Virtual Environment
```bash
python -m venv venv
```
Creates isolated Python environment for this project. Wait 10-30 seconds.
### Step 3: Activate Virtual Environment
**Windows PowerShell:** `venv\Scripts\Activate.ps1`
**Windows Command Prompt:** `venv\Scripts\activate.bat`
**Mac/Linux:** `source venv/bin/activate`
Success indicator: `(venv)` appears at start of terminal prompt.
### Step 4: Install Flask
```bash
pip install flask
```
Wait 30-60 seconds. Success message: "Successfully installed flask-X.X.X"
### Step 5: Create app.py
Create new file `app.py` in project folder (same level as `venv` folder).
**Project structure:**
```
my-project/
├── venv/           <- Virtual environment folder
└── app.py          <- Your main Flask file
```
### Step 6: Verify Installation
```bash
python --version           # Python 3.8+
pip list                   # Should show Flask
python -c "import flask; print(flask.__version__)"  # Should print version
```
## Common Issues
| Issue | Solution |
|-------|----------|
| "python: command not found" | Install Python from python.org, check "Add to PATH" |
| "Execution policy error" (Windows) | `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| "ModuleNotFoundError: flask" | Virtual environment not activated |
| "pip: command not found" | Virtual environment not activated |
## Resources
See `resources/verification-checklist.md` for detailed troubleshooting.
## Next Steps
After setup: Create first Flask route, learn about development server, build first web page.
**Remember:** Keep terminal with `(venv)` open while developing!
---
**End of Flask Setup for Beginners Skill**
