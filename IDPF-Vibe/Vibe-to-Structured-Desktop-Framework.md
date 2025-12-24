# Vibe-to-Structured Framework (Desktop)
**Version:** v0.15.0
**Type:** Desktop Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Platform Coverage
- Windows, macOS, Linux desktop applications
- CLI tools, GUI applications, system utilities
- Cross-platform: Electron, Tauri, Qt

## Initialization Questions
- Primary target platform?
- Application type? (CLI/GUI/System utility)
- User environment?
- Language preference?

## Platform-Specific Commands

### Windows
- Paths: `E:\Projects\my-app\src\main.py`
- Scripts: `.cmd` or `.bat` (NOT `.ps1`)
- Test: `python src\main.py`

### macOS
- Paths: `/Users/username/Projects/my-app/`
- Scripts: `.sh` bash scripts
- Test: `python3 src/main.py`

### Linux
- Paths: `/home/username/projects/my-app/`
- Scripts: `.sh` bash scripts
- XDG directory specifications

## Desktop Frameworks
| Framework | Best For |
|-----------|----------|
| Electron | Web tech, large apps |
| Tauri | Rust + Web, small bundle |
| Qt | Native look, comprehensive |
| tkinter | Python, quick prototypes |

## Vibe Patterns
1. **Window-First:** Create visible window immediately
2. **Single-File:** Keep everything in one file during exploration
3. **Rapid Feedback:** < 30 seconds per iteration cycle
4. **Platform-Aware:** Quick platform detection for tweaks

## Verification Pattern
```
STEP 6: Run application
STEP 7: Test window/CLI behavior
STEP 8: Test interaction
STEP 9: Report results
```

## Packaging
- Windows: PyInstaller → .exe, NSIS installer
- macOS: py2app → .app, DMG
- Linux: AppImage, .deb

---

**End of Desktop Framework**
