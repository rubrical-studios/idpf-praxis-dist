# Vibe-to-Structured Development Framework (Mobile)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Mobile-Framework.md
**Type:** Mobile Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Mobile application development for iOS, Android, and cross-platform.
**Evolution Target:** IDPF-Agile

---

## Mobile Platform Coverage
- **iOS**: Swift/SwiftUI, Objective-C/UIKit, React Native, Flutter
- **Android**: Kotlin/Jetpack Compose, Java/Android Views, React Native, Flutter
- **Cross-platform**: React Native, Flutter, Ionic, Capacitor
- **PWAs**: Mobile-optimized web apps

---

## Session Initialization
After Core Framework init (Steps 1-4), ask:
- Target platform? (iOS/Android/Both)
- Development approach? (Native/React Native/Flutter/Other)
- Your environment? (What computer developing on?)
- Testing method? (Simulator/Emulator/Real device)
- App type? (Utility/Social/Game/Enterprise/etc.)

---

## iOS Development
**Requirements:** macOS, Xcode, iOS Simulator
**Running:**
```bash
# React Native
npx react-native run-ios --simulator="iPhone 15 Pro"
# Flutter
flutter run -d "iPhone 15 Pro"
```
**Verification:** Build (Cmd+R), verify in Simulator, check for errors.

**SwiftUI Example:**
```swift
struct ContentView: View {
    @State private var count = 0
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Count: \(count)").font(.largeTitle)
                Button("Increment") { count += 1 }.buttonStyle(.borderedProminent)
            }.navigationTitle("Home")
        }
    }
}
```

---

## Android Development
**Requirements:** Any OS, Android Studio, Android SDK, Emulator
**Running:**
```bash
# React Native
npx react-native run-android
# Flutter
flutter run -d emulator-5554
```
**Verification:** Run (Shift+F10), wait for emulator, verify app.

**Jetpack Compose Example:**
```kotlin
@Composable
fun HomeScreen() {
    var count by remember { mutableStateOf(0) }
    Column(modifier = Modifier.fillMaxSize(),
           verticalArrangement = Arrangement.Center,
           horizontalAlignment = Alignment.CenterHorizontally) {
        Text("Count: $count", style = MaterialTheme.typography.headlineLarge)
        Button(onClick = { count++ }) { Text("Increment") }
    }
}
```

---

## React Native Development
**Setup:**
```bash
npx create-expo-app MyApp && cd MyApp && npm start
npm run ios    # iOS Simulator
npm run android # Android Emulator
```

**Component Example:**
```javascript
import { View, Text, Button, StyleSheet } from 'react-native';
export default function HomeScreen() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
    </View>
  );
}
```

**Common Gotchas:**
| Issue | Solution |
|-------|----------|
| Metro bundler cache | `npx expo start -c` |
| Styling differences | Test both platforms |
| Performance on lists | Use `FlatList` |
| Native module errors | `npx pod-install` |

---

## Flutter Development
**Setup:**
```bash
flutter create my_app && cd my_app && flutter run
```
**Hot Reload:** `r` (hot reload), `R` (hot restart)

**StatefulWidget Example:**
```dart
class CounterScreen extends StatefulWidget {
  @override
  State<CounterScreen> createState() => _CounterScreenState();
}
class _CounterScreenState extends State<CounterScreen> {
  int _count = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(child: Text('Count: $_count')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _count++),
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

**Common Gotchas:**
| Issue | Solution |
|-------|----------|
| Widget overflow | Wrap with `Expanded`, `Flexible`, or `SingleChildScrollView` |
| State not updating | Use `setState()` in StatefulWidget |
| Hot reload not working | Try hot restart (`R`) |
| Build errors | `flutter clean` then `flutter pub get` |

---

## Mobile Vibe Patterns
### Pattern 1: Screen-First Exploration
```
Step 1: Create minimal screen with placeholder
Step 2: Add one interactive element
Step 3: Wire up simple navigation/action
Step 4: See it work on simulator, iterate
TIME TARGET: < 5 seconds per iteration with hot reload
```

### Pattern 2: Single-Screen Prototyping
Keep everything in one screen during exploration, extract components later.

### Pattern 3: Platform Toggle
```dart
final isIOS = Platform.isIOS;
Widget buildButton() => isIOS ? CupertinoButton(...) : ElevatedButton(...);
```

### Pattern 4: Feature Flags
```javascript
const FEATURES = { darkMode: true, offlineMode: false };
{FEATURES.darkMode && <DarkModeToggle />}
```

---

## Mobile UI/UX Patterns
**Touch Interactions:**
- Tap: Primary action | Long press: Context menu | Swipe: Navigation/delete
- Pinch: Zoom | Drag: Reorder | Pull to refresh: Update
**Touch targets:** Min 44x44 points (iOS), 48x48 dp (Android)

**Navigation:**
- Tab Navigation: Bottom tabs, 3-5 top-level sections
- Stack Navigation: Push/pop for hierarchical content

---

## Mobile Constraints
| Constraint | iOS | Android | Mitigation |
|------------|-----|---------|------------|
| Battery | Background App Refresh limits | Doze mode | Batch operations |
| Memory | ~200MB warning | Varies | Cache wisely |
| Background | 30s limit | WorkManager | Use platform APIs |

---

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Navigation depth | > 5 levels | Navigation architecture |
| State management | > 3 screens sharing state | State management solution |
| API integrations | > 3 endpoints | API layer architecture |
| Platform parity | Significant iOS/Android differences | Document requirements |
| App Store submission | Any public release | Metadata, screenshots, review prep |

---

## Testing Strategies
**iOS (XCTest):**
```swift
func testAddTodo() {
    let viewModel = TodoViewModel()
    viewModel.addTodo("Test")
    XCTAssertEqual(viewModel.todos.count, 1)
}
```

**Android (JUnit):**
```kotlin
@Test
fun addTodo_increasesList() {
    val viewModel = TodoViewModel()
    viewModel.addTodo("Test")
    assertEquals(1, viewModel.todos.size)
}
```

---

## When to Use
**Use this:** Native iOS/Android apps, Cross-platform mobile, Mobile-first applications, Apps requiring device features
**Consider other:** Desktop → Desktop Framework | Web → Web Framework

---

**End of Mobile Framework**
