# Vibe-to-Structured Development Framework (Game)
**Version:** v0.19.1
**Source:** IDPF-Vibe/Vibe-to-Structured-Game-Framework.md
**Type:** Game Development Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for game development with Godot, Unity, Unreal, browser games.
**Evolution Target:** IDPF-Agile

---

## Platform Coverage
**Godot** (GDScript, C#), **Unity** (C#), **Unreal** (C++, Blueprints), **Browser** (Phaser, PixiJS)

### Game Types
2D (Platformers, puzzle, roguelike), 3D (FPS, racing, simulation), Mobile, Browser, Multiplayer

---

## Session Initialization Questions
- Game engine? (Godot/Unity/Unreal/Browser)
- 2D or 3D?
- Game genre?
- Target platform?
- Art style?

---

## Godot Engine

### Project Structure
```
MyGame/
├── project.godot
├── scenes/ (Main.tscn, Player.tscn)
├── scripts/ (Player.gd, GameManager.gd)
├── assets/ (sprites/, sounds/)
└── exports/
```

### Verification
Press F5 (run project) or F6 (run scene) → Test controls → Check Output panel → Report results

### GDScript Basics
```gdscript
extends CharacterBody2D
const SPEED = 300.0
func _physics_process(delta):
    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED
    move_and_slide()
```

---

## Unity

### Project Structure
```
Assets/
├── Scenes/
├── Scripts/
├── Prefabs/
├── Materials/
└── Audio/
```

### Verification
Click Play → Test game → Check Console → Report results

### C# Basics
```csharp
public class PlayerController : MonoBehaviour {
    public float speed = 5f;
    void Update() {
        float moveInput = Input.GetAxis("Horizontal");
        rb.velocity = new Vector2(moveInput * speed, rb.velocity.y);
    }
}
```

---

## Browser Games (Phaser)
```bash
npm init -y && npm install phaser vite
```
- `preload()` → `create()` → `update()`
- Test at http://localhost:5173

---

## Game-Specific Patterns

### Game Loop
1. Input: Detect actions
2. Update: Game state, physics, AI
3. Render: Draw frame

### State Management
```gdscript
enum GameState { MENU, PLAYING, PAUSED, GAME_OVER }
var current_state = GameState.MENU
```

---

## Play-Testing Focus

**During Vibe Phase:**
1. Implement mechanic quickly
2. Play-test immediately
3. Adjust parameters
4. Repeat until it "feels right"

**Key questions:** Responsive? Fun? Fair collisions? Good feedback?

---

## Vibe Coding Patterns

### Playable-First
Get player moving in first 10 minutes. Don't build menus first.

### Feel Before Features
```
Tune until right:
- Player speed: 100 → 200 → 150
- Jump height: Increase gravity if floaty
- Acceleration: Add ramp-up if instant
```

### One Mechanic Deep
Perfect core mechanic before adding enemies, powerups, levels.

### Debug Mode
Keep debug visualization on during exploration.

### Parameter Tweaking
```gdscript
@export var speed = 300.0
@export var jump_force = -400.0
```

---

## Performance Targets
- Desktop: 60 FPS minimum
- Mobile: 30 FPS minimum
- VR: 90 FPS minimum

---

## Transition Triggers

| Trigger | Threshold |
|---------|-----------|
| Content scope | > 5 levels |
| Character types | > 3 playable, > 10 enemies |
| Mechanics count | > 5 distinct |
| Multiplayer | Any networked gameplay |
| External playtesters | Anyone outside team |

**Exception:** Game jams (< 72h) → Stay in Vibe, ship what works

---

## When to Use
**Use for:** Video games, Interactive simulations, Game prototypes, Game jams
**Consider other frameworks for:** Game websites (Web), Game tools (Desktop)

---

**End of Game Framework**
