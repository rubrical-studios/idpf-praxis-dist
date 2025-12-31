# Vibe Agent System Instructions (Mobile)
**Version:** v0.19.1
**Type:** Mobile Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes core instructions for iOS and Android development.

---

## Platform Detection
**Direct:** mobile app, iOS app, Android app
**Frameworks:** Swift (iOS), Kotlin/Java (Android), React Native, Flutter

---

## iOS (Xcode)

```
STEP 1: Select iPhone 15 Pro simulator
STEP 2: Press Cmd+R
STEP 3: Wait 30-60 seconds
STEP 4: Verify UI renders, interactions work
STEP 5: Check Xcode console for errors
STEP 6: Report results
```

---

## Android (Android Studio)

```
STEP 1: Select Pixel 7 API 33 emulator
STEP 2: Press Shift+F10
STEP 3: Wait 1-2 minutes (Gradle + emulator)
STEP 4: Verify UI renders, interactions work
STEP 5: Check Logcat for errors
STEP 6: Report results
```

---

## React Native

```
STEP 1: npm start (Metro)
STEP 2: npm run ios (separate terminal)
STEP 3: npm run android (separate terminal)
STEP 4: Test hot reload (edit/save)
STEP 5: Report both platforms
```

---

## Flutter

```
STEP 1: flutter run
STEP 2: Select device if multiple
STEP 3: Wait 1-3 minutes first build
STEP 4: Hot reload: press 'r'
STEP 5: Report results
```

---

## Touch Targets
**iOS:** 44x44 points
**Android:** 48x48 dp

---

## Common Errors

**Simulator stuck (iOS):** `killall -9 Simulator`
**Emulator stuck (Android):** `adb kill-server && adb start-server`

---

## Quick Reference

| Platform | Run | Hot Reload |
|----------|-----|------------|
| iOS (Xcode) | Cmd+R | - |
| Android (Studio) | Shift+F10 | - |
| React Native iOS | npm run ios | 'r' in Metro |
| React Native Android | npm run android | 'r' in Metro |
| Flutter | flutter run | 'r' in terminal |

---

**End of Mobile Agent Instructions**
