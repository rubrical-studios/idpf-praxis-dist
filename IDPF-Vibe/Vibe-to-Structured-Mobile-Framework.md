# Vibe-to-Structured Development Framework (Mobile)
**Version:** 0.17.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Mobile-Framework.md
**Type:** Mobile Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for iOS, Android, cross-platform mobile development.
**Evolution Target:** IDPF-Agile

---

## Platform Coverage
**iOS** (Swift, React Native, Flutter)
**Android** (Kotlin, React Native, Flutter)
**Cross-platform** (React Native, Flutter, Ionic)

---

## Prerequisites Verification
Before ANY mobile project, verify tools are installed:
- **iOS:** macOS + Xcode + iOS Simulator
- **Android:** Android Studio + SDK + Emulator
- **React Native:** Node.js + platform tools
- **Flutter:** Flutter SDK + `flutter doctor` passes

---

## Session Initialization Questions
- Target platform? (iOS/Android/Both)
- Development approach? (Native/React Native/Flutter)
- Testing method? (Simulator/Emulator/Device)
- App type?

---

## iOS Development

### Running
- Xcode: Select simulator, Cmd+R
- React Native: `npx react-native run-ios`
- Flutter: `flutter run -d "iPhone 15 Pro"`

### Verification
Build → Run in simulator → Test features → Report results

---

## Android Development

### Running
- Android Studio: Select device, Shift+F10
- React Native: `npx react-native run-android`
- Flutter: `flutter run -d emulator-5554`

### Verification
Build → Wait for emulator → Test features → Report results

---

## React Native Workflow
```bash
npx create-expo-app MyApp && cd MyApp && npm start
npm run ios    # or npm run android
```

**Hot reload:** Changes appear instantly on save

---

## Flutter Workflow
```bash
flutter create my_app && cd my_app && flutter run
```

**Hot reload:** Press `r` | **Hot restart:** Press `R`

---

## Mobile UI/UX Patterns

### Touch Interactions
- Tap, Long press, Swipe, Pinch, Drag, Pull to refresh
- Minimum touch target: 44x44 pt (iOS), 48x48 dp (Android)

### Navigation
- Tab Navigation: Bottom tabs for primary sections
- Stack Navigation: Push/pop for hierarchical content

---

## Mobile Requirements Additions

### Platform Support
```markdown
iOS: Minimum iOS 15.0, iPhone 8+
Android: Minimum SDK 24 (Android 7.0)
```

### Permissions
Camera, Location, Notifications

---

## Vibe Coding Patterns

### Screen-First
Create visible screen immediately, add interaction, iterate

### Hot Reload Workflow
Make change → Save → See instantly → Adjust → Repeat
**Target:** < 5 seconds per iteration

### Platform Toggle
```dart
final isIOS = Platform.isIOS;
final isAndroid = Platform.isAndroid;
```

---

## Transition Triggers

| Trigger | Threshold |
|---------|-----------|
| Navigation depth | > 5 levels |
| State management | > 3 screens sharing state |
| API integrations | > 3 endpoints |
| Offline support | Any requirement |
| App Store submission | Any public release |

---

## When to Use
**Use for:** Native iOS/Android, Cross-platform mobile, Apps requiring device features
**Consider other frameworks for:** Desktop, Web

---

**End of Mobile Framework**
