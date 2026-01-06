# Vibe-to-Structured Development Framework (Desktop)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Desktop-Framework.md
**Type:** Desktop Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Desktop application development specialization for Windows, macOS, Linux, and cross-platform.
**Evolution Target:** IDPF-Agile

---

## Desktop Platform Coverage
- **Windows**: WinForms, WPF, WinUI
- **macOS**: AppKit, SwiftUI
- **Linux**: GTK, Qt
- **Cross-platform**: Electron, Tauri, Qt, .NET MAUI
**Types**: CLI tools, GUI applications, System utilities, File processors

---

## Session Initialization
After Core Framework init (Steps 1-4), ask:
- Primary target platform? (Windows/macOS/Linux/Cross-platform)
- Application type? (CLI/GUI/System utility)
- User environment? (What OS developing on?)
- Language preference? (Python/Ruby/JavaScript/C#/Rust/etc.)

---

## Windows Desktop
**Paths:** `E:\Projects\my-app\src\main.py`, `%USERPROFILE%`, `%APPDATA%`, `%TEMP%`
**Scripts:** Use .cmd/.bat (not PowerShell)
**Libraries:** `pywin32`, `winshell`, `pyinstaller` (Python); `win32ole`, `ocra` (Ruby); `node-windows`, `electron` (Node.js)
```
STEP 6: python src\main.py
STEP 7: Verify output in console window
STEP 8: Report errors or success
```

---

## macOS Desktop
**Paths:** `/Users/username/...`, `~/Documents`, `$HOME`, `$TMPDIR`
**Scripts:** .sh bash scripts, `chmod +x build.sh`
**Frameworks:** AppKit, SwiftUI, `py2app`, `rumps`
```
STEP 6: python3 src/main.py
STEP 7: Verify output in Terminal
STEP 8: Report results
```

---

## Linux Desktop
**Paths:** `/home/username/...`, `~/.config/myapp/`, `$XDG_CONFIG_HOME`
**Scripts:** .sh bash scripts
**Libraries:** PyGObject (GTK), PyQt5, python-xlib; .desktop files for launchers; systemd for services
```
STEP 6: python3 src/main.py
STEP 7: Check terminal output
STEP 8: Report results
```

---

## Cross-Platform Frameworks
| Framework | Best For | Notes |
|-----------|----------|-------|
| **Electron** | Web tech (HTML/CSS/JS) | Native APIs via Node.js, large bundles (~150MB) |
| **Tauri** | Rust + Web | Lightweight (~3-10MB), system webview |
| **Qt** | Native look/feel | C++/Python/Ruby, comprehensive widgets |
| **.NET MAUI** | C# apps | Windows, macOS, Linux (via Avalonia) |

**Path handling:**
```python
import os
from pathlib import Path
data_path = os.path.join('data', 'input.txt')
home_dir = os.path.expanduser('~')
```

---

## Electron Development
```bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install electron --save-dev
```
**Structure:** `package.json`, `main.js`, `preload.js`, `index.html`, `renderer.js`
**IPC Pattern:** Use `contextBridge` in preload.js for secure main/renderer communication
**Gotchas:** Use `preload.js` with `contextIsolation: true` (not nodeIntegration), handle `window-all-closed`, use `path.join(__dirname, ...)`

---

## Tauri Development
```bash
npm create tauri-app@latest my-tauri-app
cd my-tauri-app && npm install && npm run tauri dev
```
**Structure:** `src/` (frontend), `src-tauri/` (Rust backend with `main.rs`, `tauri.conf.json`)
**Commands:** Define with `#[tauri::command]`, register in `invoke_handler!` macro
**Gotchas:** `cargo check` for quick feedback, update CSP in tauri.conf.json, use `--release` for smaller binaries

---

## Native Patterns
**SwiftUI (macOS):**
```swift
struct ContentView: View {
    @State private var message = "Hello, macOS!"
    var body: some View {
        VStack {
            Text(message).font(.largeTitle)
            Button("Click Me") { message = "Clicked!" }.buttonStyle(.borderedProminent)
        }.frame(width: 400, height: 300).padding()
    }
}
```
**WinUI 3 (Windows):** XAML layouts with C# code-behind

---

## Desktop Best Practices
### Vibe Phase
- **Windows:** Test in cmd.exe, use absolute paths, handle spaces in paths
- **macOS:** Test in Terminal, request permissions early, consider sandboxing
- **Linux:** Follow XDG specs, handle missing dependencies gracefully
- **Cross-Platform:** Use pathlib, test on multiple platforms early, abstract differences

### Structured Phase
- Add platform-specific tests
- Implement platform-specific optimizations
- Create platform-specific packaging

---

## Packaging & Distribution
| Platform | Tool | Output |
|----------|------|--------|
| Windows | PyInstaller | .exe, NSIS installer |
| macOS | py2app | .app bundle, .dmg |
| Linux | AppImage, dpkg-deb | .AppImage, .deb |
| Electron | electron-builder | All platforms |
| Tauri | tauri build | .msi, .dmg, .AppImage |

**Code Signing:** Windows (~$300-500/yr), macOS ($99/yr Apple Developer), Linux (GPG, free)

---

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Multiple windows | > 3 with inter-communication | State management architecture |
| Background processing | Long-running tasks blocking UI | Thread/process architecture |
| Data persistence | > 5 data types stored | Database design |
| Cross-platform | Support > 2 platforms | Platform abstraction layer |
| Packaging | Need installer/updates | Distribution strategy |

---

## When to Use
**Use this:** CLI tools, GUI applications, system utilities, file processors, cross-platform desktop apps
**Consider other:** Mobile → Mobile Framework | Web → Web Framework | Games → Game Framework

---

**End of Desktop Framework**
