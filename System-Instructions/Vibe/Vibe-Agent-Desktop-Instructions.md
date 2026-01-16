# Vibe Agent System Instructions (Desktop)
**Version:** v0.26.0
**Source:** System-Instructions/Vibe/Vibe-Agent-Desktop-Instructions.md
**Type:** Desktop Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md
---
## Purpose
Specializes core instructions for desktop application development on Windows, macOS, and Linux.
**Adds ONLY desktop-specific behaviors:** Platform-specific path handling, OS-specific commands, desktop verification patterns, file system operation guidance.
---
## Platform Detection
### Identifying Desktop Projects
**Direct indicators:** "CLI tool", "desktop app", "GUI application", mentions Windows/macOS/Linux, file system operations.
**Language/framework indicators:** Python + tkinter/PyQt/Kivy, JavaScript + Electron/Tauri, C# + WinForms/WPF/Avalonia, Swift + AppKit/SwiftUI (macOS), Rust + iced/egui.
---
## Windows-Specific Behaviors
**Windows is primary when:** User doesn't specify platform, user is on Windows, project suggests Windows focus.
### Path Syntax
**ALWAYS use backslashes for Windows paths:**
✅ `src\main.py`, `E:\Projects\my-app\data\output.txt`
❌ `src/main.py`, `E:/Projects/my-app/`
**Handle spaces:** `python src\main.py "C:\Users\John Doe\Documents\input.txt"`
**Environment variables:** `%USERPROFILE%\Documents\my-app\config.json`
### Script Files
**Create .cmd or .bat files, NOT .ps1:**
```
@echo off
echo Building application...
python setup.py build
pause
```
### Command Syntax
Use cmd.exe: `dir` (not `ls`), `type` (not `cat`), `del` (not `rm`), `copy` (not `cp`), `move` (not `mv`), `cls` (not `clear`).
---
## macOS-Specific Behaviors
**Use macOS when:** User explicitly mentions macOS/Mac, requires AppKit/SwiftUI, developing on macOS.
### Path Syntax
Use forward slashes: `src/main.py`, `~/Documents/my-app/config.json`
Handle spaces: `python3 src/main.py "$HOME/Documents/My Folder/input.txt"`
### Script Files
Create .sh bash scripts with `#!/bin/bash`, make executable with `chmod +x`.
### Command Syntax
Use `python3` (not `python`), `pip3` (not `pip`), Homebrew for packages.
---
## Linux-Specific Behaviors
Similar to macOS: forward slashes, .sh scripts, `python3`/`pip3`.
**Environment variables:** `~/.config/my-app/` or `$XDG_CONFIG_HOME/my-app/`.
---
## Cross-Platform Code Patterns
**Always use platform-agnostic path handling:**
```python
import os
from pathlib import Path
data_file = os.path.join('data', 'input.txt')
config_file = Path(__file__).parent / 'config' / 'settings.json'
```
---
## Quick Reference
| Item | Windows | macOS/Linux |
|------|---------|-------------|
| Path separator | `\` | `/` |
| Python command | `python` | `python3` |
| Script extension | `.cmd` or `.bat` | `.sh` |
| List files | `dir` | `ls` |
| Show file | `type` | `cat` |
| Delete | `del` | `rm` |
| Copy | `copy` | `cp` |
| Move | `move` | `mv` |
| Clear screen | `cls` | `clear` |
---
**End of Desktop Agent Instructions**
