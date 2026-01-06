# Vibe Agent System Instructions (Desktop)
**Version:** v0.22.0
**Source:** System-Instructions/Vibe/Vibe-Agent-Desktop-Instructions.md
**Type:** Desktop Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes Vibe Agent Core for desktop application development on Windows, macOS, and Linux.

**Adds ONLY desktop-specific behaviors:** Platform-specific paths, OS-specific commands, desktop verification patterns.

---

## Platform Detection
**Direct indicators:** "CLI tool", "desktop app", "GUI application", Windows/macOS/Linux mention
**Language/framework indicators:** Python+tkinter/PyQt, JavaScript+Electron/Tauri, C#+WinForms/WPF, Swift+AppKit

---

## Windows-Specific Behaviors
### Path Syntax
**Use backslashes:**
```
STEP 1: Open src\main.py
STEP 2: Save to E:\Projects\my-app\data\output.txt
```

**Handle spaces:** `"C:\Users\John Doe\Documents\input.txt"`
**Environment variables:** `%USERPROFILE%\Documents\`

### Script Files
Create `.cmd` or `.bat` files, NOT `.ps1`:
```
@echo off
echo Building application...
python setup.py build
pause
```

### Command Syntax
Use cmd.exe commands: `dir`, `type`, `del`, `copy`, `move`, `cls`

---

## macOS-Specific Behaviors
### Path Syntax
**Use forward slashes:**
```
STEP 1: Open src/main.py
STEP 2: Save to ~/Documents/my-app/config.json
```

### Script Files
Create `.sh` bash scripts:
```bash
#!/bin/bash
echo "Building application..."
python3 setup.py build
```
Make executable: `chmod +x build.sh`

### Commands
Use bash/zsh: `ls`, `cat`, `rm`, `cp`, `mv`, `clear`
Use `python3` and `pip3`

---

## Linux-Specific Behaviors
### Path Syntax
Forward slashes: `/home/username/projects/` or `~/.config/my-app/`

### Script Files
Same as macOS: `.sh` with `#!/bin/bash`

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
### Path Syntax
- **Windows:** `src\main.py`, `E:\Projects\`
- **macOS/Linux:** `src/main.py`, `~/Projects/`
- **Cross-platform:** `pathlib.Path` or `os.path.join`

### Python Command
- Windows: `python`
- macOS/Linux: `python3`

### Script Extension
- Windows: `.cmd`/`.bat`
- macOS/Linux: `.sh`

### Common Commands
| Action | Windows | macOS/Linux |
|--------|---------|-------------|
| List files | `dir` | `ls` |
| Show file | `type` | `cat` |
| Delete | `del` | `rm` |
| Copy | `copy` | `cp` |
| Move | `move` | `mv` |

---

**End of Desktop Agent Instructions**
