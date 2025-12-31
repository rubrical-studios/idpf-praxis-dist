# Vibe Agent System Instructions (Desktop)
**Version:** v0.19.1
**Type:** Desktop Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes core instructions for desktop development on Windows, macOS, Linux.

---

## Platform Detection
**Direct:** CLI tool, desktop app, GUI, file system ops
**Frameworks:** Python+tkinter/PyQt, Ruby+gtk, Electron/Tauri, C#+WinForms/WPF, Swift+AppKit, Rust+iced

---

## Windows (Default)

**Path Syntax:** Backslashes
```
STEP 1: Open src\main.py
STEP 2: Save to E:\Projects\my-app\data\output.txt
```

**Script Files:** `.cmd` or `.bat` (NOT .ps1)

**Commands:** `dir` (ls), `type` (cat), `del` (rm), `copy` (cp), `move` (mv), `cls` (clear)

---

## macOS

**Path Syntax:** Forward slashes, tilde for home
```
STEP 1: Open src/main.py
STEP 2: Save to ~/Documents/my-app/config.json
```

**Script Files:** `.sh` with `chmod +x`
**Python:** Use `python3`, `pip3`

---

## Linux

**Path Syntax:** Forward slashes, tilde, XDG vars
```
Save to ~/.config/my-app/config.json
```

**Script Files:** `.sh` with `#!/bin/bash`

---

## Cross-Platform Code

```python
from pathlib import Path
project_root = Path(__file__).parent
config_file = project_root / 'config' / 'settings.json'
```

---

## Quick Reference

| | Windows | macOS/Linux |
|--|---------|-------------|
| Path | `src\main.py` | `src/main.py` |
| Python | `python` | `python3` |
| Script | `.cmd` | `.sh` |
| List | `dir` | `ls` |
| Show file | `type` | `cat` |

---

**End of Desktop Agent Instructions**
