# Vibe Agent System Instructions (Desktop)
**Version:** v0.2.0
**Extends:** Vibe-Agent-Core-Instructions.md
Specializes core instructions for desktop applications on Windows, macOS, Linux.
---
## Platform Detection
**Direct:** "CLI tool", "desktop app", "GUI application", Windows/macOS/Linux
**Frameworks:** Python+tkinter/PyQt | Ruby+gtk | JS+Electron/Tauri | C#+WinForms/WPF | Swift+AppKit | Rust+iced
---
## Windows (Default when unspecified)
**Paths:** Use backslashes `src\main.py`, `E:\Projects\app\`
**Scripts:** Create `.cmd`/`.bat` (NOT .ps1)
**Commands:** `dir` (not ls), `type` (not cat), `del` (not rm), `copy` (not cp), `cls` (not clear)
**Python:** `python` (not python3)
```
STEP 1: cd E:\Projects\my-tool
STEP 2: python src\main.py --input data\test.txt
STEP 3: dir results\output.txt
STEP 4: type results\output.txt
```
---
## macOS
**Paths:** Forward slashes `src/main.py`, `~/Projects/app/`
**Scripts:** `.sh` with `#!/bin/bash`, then `chmod +x`
**Python:** `python3`, `pip3`
```
STEP 1: cd ~/Projects/my-tool
STEP 2: python3 src/main.py --input data/test.txt
STEP 3: ls -l results/output.txt
STEP 4: cat results/output.txt
```
---
## Linux
**Paths:** Forward slashes, `~/.config/`, `$XDG_CONFIG_HOME`
**Scripts:** `.sh` with `#!/bin/bash` and `set -e`
**Python:** `python3`, `pip3`
---
## Cross-Platform Code
✅ Use `os.path.join()` or `pathlib.Path`
❌ Hardcoded paths like `data\\input.txt` or `/home/user/`
---
## Quick Reference
| Action | Windows | macOS/Linux |
|--------|---------|-------------|
| List | `dir` | `ls` |
| Show | `type` | `cat` |
| Delete | `del` | `rm` |
| Python | `python` | `python3` |
| Scripts | `.cmd` | `.sh` |
**End of Desktop Agent Instructions**
