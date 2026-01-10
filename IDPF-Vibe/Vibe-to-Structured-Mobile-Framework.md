# Vibe-to-Structured Development Framework (Mobile)
**Version:** v0.23.1
**Type:** Mobile Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Mobile Platform Coverage
- **iOS**: Swift/SwiftUI, Objective-C/UIKit
- **Android**: Kotlin/Jetpack Compose, Java
- **Cross-platform**: React Native, Flutter, Ionic

## Session Initialization (Mobile-Specific)
After Core Framework steps, ask:
- Target platform? (iOS/Android/Both)
- Development approach? (Native/React Native/Flutter)
- Your environment? (Development computer)
- Testing method? (Simulator/Emulator/Device)
- App type? (Utility/Social/Game/Enterprise)

## iOS Development
**Requirements:** macOS, Xcode, iOS Simulator
**Run:** `npx react-native run-ios --simulator="iPhone 15 Pro"` or Cmd+R in Xcode
**Verification:** App launches, main screen displays, navigation works

## Android Development
**Requirements:** Android Studio, Android SDK, Emulator
**Run:** `npx react-native run-android` or Shift+F10 in Android Studio
**Verification:** App installs, UI renders, no Logcat errors

## React Native
```bash
npx create-expo-app@latest MyApp
cd MyApp && npx expo start
# npm run ios / npm run android
```
**Gotchas:** Metro cache (`npx expo start -c`), styling differences, use FlatList for lists

## Flutter
```bash
flutter create my_app
cd my_app && flutter run
# r=hot reload, R=hot restart
```
**Gotchas:** Widget overflow (wrap with Expanded), state updates need setState(), `flutter clean`

## Touch Patterns
- **Tap**: Primary action
- **Long press**: Context menu
- **Swipe**: Navigation, delete
- **Touch targets**: 44x44pt (iOS), 48x48dp (Android)

## Requirements Additions
Document: Platform Support (min iOS/Android versions), Device Features (permissions needed), Offline Requirements

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Navigation depth | > 5 levels | Need nav architecture |
| State management | > 3 screens sharing | Consider state solution |
| App Store submission | Any release | Need metadata, screenshots |

## Best Practices
**Vibe:** Use hot reload, single-screen prototyping, feature toggles
**Evolution:** Document platform requirements, plan store submission
**Structured:** Test on both platforms, optimize performance, accessibility audit

**End of Mobile Framework**
