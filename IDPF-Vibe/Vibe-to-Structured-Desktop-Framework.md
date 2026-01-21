# Vibe-to-Structured Development Framework (Desktop)
**Version:** v0.29.3
**Type:** Desktop Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Desktop Platform Coverage
- **Windows**: WinForms, WPF, WinUI
- **macOS**: AppKit, SwiftUI
- **Linux**: GTK, Qt
- **Cross-platform**: Electron, Tauri, .NET MAUI

## Session Initialization (Desktop-Specific)
After Core Framework steps, ask:
- Primary target platform? (Windows/macOS/Linux/Cross-platform)
- Application type? (CLI/GUI/System utility)
- User environment? (Development OS)
- Language preference? (Python/Ruby/JavaScript/C#/Rust)

## Windows Development
**Paths:** `E:\Projects\my-app\src\main.py`
**Scripts:** Use .cmd or .bat (avoid PowerShell per system instructions)
**Commands:** `python src\main.py --help`
**Libraries:** pywin32, pyinstaller

## macOS Development
**Paths:** `/Users/username/Projects/my-app/src/main.py`
**Scripts:** .sh bash scripts, `chmod +x build.sh`
**Commands:** `python3 src/main.py --help`
**Libraries:** py2app, rumps (menu bar)

## Linux Development
**Paths:** `/home/username/projects/my-app/src/main.py`
**Scripts:** .sh bash scripts
**Commands:** `python3 src/main.py --help`
**Libraries:** PyGObject (GTK), PyQt5

## Cross-Platform Patterns
```python
import os
from pathlib import Path
data_path = Path(__file__).parent / 'config' / 'settings.json'  # pathlib for paths
if os.name == 'nt':  # Windows
elif sys.platform == 'darwin':  # macOS
elif sys.platform.startswith('linux'):  # Linux
```

## Electron/Tauri
| Factor | Tauri | Electron |
|--------|-------|----------|
| Bundle size | ~3-10 MB | ~150+ MB |
| Backend | Rust | JavaScript |
| Learning curve | Higher | Lower |

## Requirements Additions
Document: Installation per platform, File Locations (config/data/logs), Platform Requirements (OS versions, dependencies)

## Best Practices
**Vibe:** Test in target OS shell, use absolute paths, handle spaces in paths
**Evolution:** Document platform requirements, plan packaging
**Structured:** Add platform-specific tests, create installers

**End of Desktop Framework**
