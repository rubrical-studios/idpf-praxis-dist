# Vibe-to-Structured Development Framework (Game)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Game-Framework.md
**Type:** Game Development Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Game development for Godot, Unity, Unreal, and browser-based games.
**Evolution Target:** IDPF-Agile

---

## Game Platform Coverage
- **Godot Engine**: 2D/3D games with GDScript or C#
- **Unity**: 2D/3D games with C#
- **Unreal Engine**: 3D games with C++ or Blueprints
- **Browser Games**: Phaser, PixiJS, Three.js
- **Terminal Games**: Python curses, blessed (Node.js)
**Types:** 2D (Platformers, puzzle, roguelikes), 3D (FPS, racing, simulation), Mobile, Browser, Multiplayer

---

## Session Initialization
After Core Framework init (Steps 1-4), ask:
- Game engine? (Godot/Unity/Unreal/Browser/Other)
- 2D or 3D?
- Game genre? (Platformer/Puzzle/RPG/FPS/etc.)
- Target platform? (PC/Mobile/Web/Console)
- Art style? (Pixel art/3D models/Abstract/etc.)

---

## Godot Development
**Project Structure:**
```
MyGame/
├── project.godot
├── scenes/ (Main.tscn, Player.tscn, Enemy.tscn)
├── scripts/ (Player.gd, GameManager.gd)
├── assets/ (sprites/, models/, sounds/, fonts/)
└── exports/
```

**GDScript Player Example:**
```gdscript
extends CharacterBody2D
const SPEED = 300.0
const JUMP_VELOCITY = -400.0
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    if not is_on_floor(): velocity.y += gravity * delta
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY
    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED if direction else move_toward(velocity.x, 0, SPEED)
    move_and_slide()
```

**Verification:** F5 (run project), F6 (run scene), F8 (stop). Check Output panel for errors.

**Signals:**
```gdscript
signal health_changed(new_health)
health_changed.emit(health)
player.health_changed.connect(_on_player_health_changed)
```

---

## Unity Development
**Project Structure:**
```
Assets/
├── Scenes/MainScene.unity
├── Scripts/PlayerController.cs, GameManager.cs
├── Prefabs/, Materials/, Sprites/, Audio/, Animations/
```

**C# Player Example:**
```csharp
public class PlayerController : MonoBehaviour {
    public float speed = 5f, jumpForce = 10f;
    private Rigidbody2D rb;
    private bool isGrounded;

    void Update() {
        rb.velocity = new Vector2(Input.GetAxis("Horizontal") * speed, rb.velocity.y);
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
    }
    void OnCollisionEnter2D(Collision2D c) { if (c.gameObject.CompareTag("Ground")) isGrounded = true; }
    void OnCollisionExit2D(Collision2D c) { if (c.gameObject.CompareTag("Ground")) isGrounded = false; }
}
```

**Verification:** Play button (Ctrl+P), check Console panel, stop and report.

---

## Unreal Engine Development
**Blueprint vs C++:** Use Blueprints for prototyping, C++ for performance-critical code.
**Character Setup:**
1. Create Blueprint Class (Parent: Character)
2. Add Camera, Spring Arm components
3. Event Graph: Event Tick → Get Input → Add Movement
4. Character Movement: Max Walk Speed, Jump Z Velocity, Air Control
5. Test with PIE (Play In Editor)

**Verification:** Alt+P to play, Escape to stop, check Output Log.

---

## Browser Game (Phaser)
```bash
npm init -y && npm install phaser && npm install -D vite
```
```javascript
class GameScene extends Phaser.Scene {
    preload() { this.load.image('player', 'assets/player.png'); }
    create() {
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.cursors.left.isDown) this.player.setVelocityX(-160);
        else if (this.cursors.right.isDown) this.player.setVelocityX(160);
        else this.player.setVelocityX(0);
        if (this.cursors.up.isDown && this.player.body.touching.down)
            this.player.setVelocityY(-330);
    }
}
```

---

## Game-Specific Vibe Patterns
### Pattern 1: Playable-First
```
✅ Get player moving in first 10 minutes
❌ Don't build menus, loading screens first
Step 1: Player object → Step 2: Basic movement → Step 3: One constraint → Step 4: Play-test
```

### Pattern 2: Feel Before Features
```
✅ Spend time adjusting jump height, speed, gravity
❌ Don't add features until core feels good
FEEL VARIABLES: Player speed, Jump height, Acceleration, Gravity
```

### Pattern 3: One Mechanic Deep
```
✅ Perfect core mechanic before adding more
1. Player moves → 2. Jumps → 3. Feels good → 4. Coyote time → 5. Jump buffering
NOW add platforms/enemies
```

### Pattern 4: Debug Mode by Default
```gdscript
var debug_mode = true
func _draw():
    if debug_mode:
        draw_line(Vector2.ZERO, velocity * 0.1, Color.RED, 2)
```

### Pattern 5: Real-Time Parameter Tweaking
```gdscript
@export var speed = 300.0
@export var jump_force = -400.0
@export var coyote_time = 0.1
```

---

## Game Loop & State Machine
```gdscript
enum GameState { MENU, PLAYING, PAUSED, GAME_OVER }
var current_state = GameState.MENU
func _process(delta):
    match current_state:
        GameState.MENU: update_menu()
        GameState.PLAYING: update_gameplay()
        GameState.PAUSED: update_pause_menu()
        GameState.GAME_OVER: update_game_over_screen()
```

---

## Performance Targets
| Platform | FPS Target |
|----------|------------|
| Desktop | 60 FPS minimum |
| Mobile | 30 FPS minimum, 60 ideal |
| VR | 90 FPS minimum |

**Profiling:** Godot (Debugger → Profiler), Unity (Window → Profiler)
**Optimization:** Object pooling, LOD, Occlusion culling, Batch rendering, Physics layers

---

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Content scope | > 5 levels/areas | Level design document |
| Character types | > 3 playable or > 10 enemies | Character design doc |
| Mechanics count | > 5 distinct mechanics | Game design document |
| Multiplayer | Any networked gameplay | Network architecture |
| Team size | > 1 person | Version control, task tracking |
| External playtesters | Anyone outside team | Build pipeline |

**Pre-Transition Checklist:**
- [ ] Core mechanic feels right (play-tested)
- [ ] Basic game loop works (start → play → end)
- [ ] Technical feasibility proven
- [ ] Scope understood, Platform requirements known

---

## Asset Pipeline
| Asset Type | Format | Notes |
|------------|--------|-------|
| 2D Sprites | PNG | Transparent backgrounds |
| 3D Models | FBX, GLTF | Separate animation files |
| Music | OGG, MP3 | OGG for Godot |
| Sound Effects | WAV, OGG | WAV for short sounds |

**Placeholder Strategy:** Colored rectangles, primitive shapes, free sounds (freesound.org)

---

## Testing Strategies
**Unit Testing (Godot GUT):**
```gdscript
func test_player_takes_damage():
    var player = Player.new()
    player.health = 100
    player.take_damage(10)
    assert_eq(player.health, 90)
```

**Play-Testing:** Test with fresh players, watch them play, note stuck points, iterate on feedback.

---

## When to Use
**Use this:** Video games, interactive simulations, game prototypes, game jams
**Consider other:** Game websites → Web Framework | Game launchers → Desktop Framework

---

**End of Game Framework**
