# Vibe Agent System Instructions (Mobile)
**Version:** v0.15.0
**Extends:** Vibe-Agent-Core-Instructions.md
Specializes core instructions for iOS and Android development.
---
## Detection
**Direct:** "mobile app", "iOS app", "Android app", "simulator", "emulator"
**Frameworks:** Swift→iOS | Kotlin/Java→Android | React Native/Flutter→Cross-platform
---
## Running Apps
| Platform | Command |
|----------|---------|
| iOS (Xcode) | Cmd+R |
| Android (Studio) | Shift+F10 |
| React Native iOS | `npm run ios` |
| React Native Android | `npm run android` |
| Flutter | `flutter run` |
## Hot Reload
| Platform | Method |
|----------|--------|
| React Native | Press 'r' in Metro |
| Flutter | Press 'r' in terminal |
---
## Platform-Specific
**iOS (Xcode):**
```
STEP 6: Select "iPhone 15 Pro" simulator → Cmd+R
STEP 7: Wait 30-60 seconds
STEP 8: Verify: UI renders, can interact, no Xcode console errors
```
**Android (Studio):**
```
STEP 6: Select "Pixel 7 API 33" → Shift+F10
STEP 7: Wait 1-2 minutes for Gradle
STEP 8: Verify: UI renders, can interact, no Logcat errors
```
---
## Touch Targets
**Minimum sizes:** iOS=44x44 points | Android=48x48 dp
---
## Common Errors
**iOS Simulator stuck:**
```
killall -9 Simulator
open -a Simulator
xcrun simctl erase "iPhone 15 Pro"  # if still stuck
```
**Android Emulator stuck:**
```
adb devices
adb kill-server && adb start-server
emulator -avd Pixel_7_API_33
```
**End of Mobile Agent Instructions**
