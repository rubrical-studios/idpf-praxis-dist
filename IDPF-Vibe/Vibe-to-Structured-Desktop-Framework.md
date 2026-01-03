# Vibe-to-Structured Development Framework (Desktop)
**Version:** 0.17.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Desktop-Framework.md
**Type:** Desktop Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for Windows, macOS, Linux desktop applications.
**Evolution Target:** IDPF-Agile

---

## Platform Coverage
**Windows, macOS, Linux, Cross-platform (Electron, Tauri, Qt)**

### Application Types
CLI tools, GUI apps (WinForms, WPF, SwiftUI, GTK), System utilities, File processors

---

## Session Initialization Questions
- Primary target platform? (Windows/macOS/Linux/Cross-platform)
- Application type? (CLI/GUI/System utility)
- User environment?
- Language preference?

---

## Windows Development

### Paths and Scripts
- Use backslashes: `E:\Projects\my-app\src\main.py`
- Environment: `%USERPROFILE%`, `%APPDATA%`, `%TEMP%`
- Use `.cmd` or `.bat` scripts (NOT PowerShell)

### Verification
```
cd E:\Projects\my-app
python src\main.py --help
```

---

## macOS Development

### Paths and Scripts
- Use forward slashes: `/Users/username/Projects/my-app/`
- Environment: `$HOME`, `$TMPDIR`
- Use `.sh` bash scripts, make executable with `chmod +x`

### Verification
```bash
cd ~/Projects/my-app
python3 src/main.py --help
```

---

## Linux Development

### Paths and Scripts
- Use forward slashes: `/home/username/projects/my-app/`
- Environment: `$HOME`, `$XDG_CONFIG_HOME`
- Follow XDG directory specs

---

## Cross-Platform Development

### Frameworks
| Framework | Description |
|-----------|-------------|
| Electron | JS/Node.js, web tech |
| Tauri | Rust + Web, lightweight |
| Qt | C++/Python, native look |
| .NET MAUI | C#, cross-platform |

### Path Handling
```python
import os
from pathlib import Path
data_path = os.path.join('data', 'input.txt')
config = Path.home() / '.config' / 'myapp'
```

---

## Desktop Verification Patterns

### CLI
```
python src\main.py
python src\main.py --input data\test.txt
python src\main.py --input nonexistent.txt  # Error handling
```

### GUI
- Does window appear?
- Do controls render?
- Click, type, check menus

---

## Electron Workflow
```bash
npm init -y && npm install electron --save-dev
```
- `main.js` (main process), `preload.js` (bridge), `index.html` (UI)
- Use `contextBridge` for security

## Tauri Workflow
```bash
npm create tauri-app@latest my-app
```
- Rust backend, web frontend
- Smaller bundles than Electron

---

## Best Practices

### Vibe Phase
- Test in cmd.exe (Windows), Terminal (macOS/Linux)
- Handle spaces in paths
- Use pathlib for cross-platform

### Evolution Point
- Document platform requirements
- Plan packaging per platform

### Agile Phase
- Platform-specific tests
- Create installers

---

## Packaging

| Platform | Tool | Output |
|----------|------|--------|
| Windows | PyInstaller | .exe |
| macOS | py2app | .app |
| Linux | AppImage | .AppImage |
| Cross | electron-builder | All platforms |

---

## When to Use
**Use for:** CLI tools, GUI apps, System utilities, File processors, Cross-platform desktop
**Consider other frameworks for:** Mobile, Web, Games

---

**End of Desktop Framework**
