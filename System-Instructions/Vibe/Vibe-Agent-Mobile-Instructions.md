# Vibe Agent System Instructions (Mobile)
**Version:** v0.30.1
**Source:** System-Instructions/Vibe/Vibe-Agent-Mobile-Instructions.md
**Type:** Mobile Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md
---
## Purpose
Specializes core instructions for mobile app development on iOS and Android.
**Adds ONLY mobile-specific behaviors:** Mobile platform detection, simulator/emulator management, touch interaction guidance, platform-specific patterns.
---
## Mobile Platform Detection
**Direct indicators:** "mobile app", "iOS app", "Android app", "simulator", "emulator".
**Language/framework indicators:**
- Swift → iOS native
- Kotlin/Java → Android native
- React Native → Cross-platform
- Flutter/Dart → Cross-platform
---
## Platform-Specific Behaviors
### iOS (Xcode)
**Building and running:**
1. Select "iPhone 15 Pro" simulator
2. Press Cmd+R
3. Wait for build (30-60 seconds)
4. Verify in simulator: UI renders, can interact, no Xcode console errors
### Android (Android Studio)
**Building and running:**
1. Select "Pixel 7 API 33" emulator
2. Press Shift+F10
3. Wait for Gradle build (1-2 minutes)
4. Verify in emulator: UI renders, can interact, no Logcat errors
### React Native
```
npm start           # Start Metro bundler
npm run ios         # Run iOS (separate terminal)
npm run android     # Run Android (separate terminal)
```
Hot reload: Press 'r' in Metro.
### Flutter
```
flutter run         # Run app
```
Select device if multiple. Hot reload: Press 'r' in terminal.
---
## Mobile UI/UX Guidance
### Touch Target Sizes
**Minimum sizes:**
- iOS: 44x44 points
- Android: 48x48 dp
**Always ensure buttons are large enough for touch.**
---
## Common Mobile Errors
**Simulator not booting (iOS):**
```
killall -9 Simulator
open -a Simulator
xcrun simctl erase "iPhone 15 Pro"
```
**Emulator not starting (Android):**
```
adb devices
adb kill-server && adb start-server
emulator -avd Pixel_7_API_33
```
---
## Quick Reference
| Platform | Command |
|----------|---------|
| iOS (Xcode) | Cmd+R |
| Android (Studio) | Shift+F10 |
| React Native iOS | `npm run ios` |
| React Native Android | `npm run android` |
| Flutter | `flutter run` |
| Hot Reload (RN) | Press 'r' in Metro |
| Hot Reload (Flutter) | Press 'r' in terminal |
---
**End of Mobile Agent Instructions**
