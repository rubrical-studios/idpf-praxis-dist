# Vibe-to-Structured Development Framework (Game)
**Version:** v0.25.0
**Type:** Game Development Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Game Platform Coverage
- **Godot**: 2D/3D with GDScript or C#
- **Unity**: 2D/3D with C#
- **Unreal**: 3D with C++ or Blueprints
- **Browser**: Phaser, PixiJS, Three.js

## Session Initialization (Game-Specific)
After Core Framework steps, ask:
- Game engine? (Godot/Unity/Unreal/Browser)
- 2D or 3D?
- Game genre? (Platformer/Puzzle/RPG/FPS)
- Target platform? (PC/Mobile/Web/Console)
- Art style? (Pixel art/3D models/Abstract)

## Godot Development
**Structure:** `project.godot`, `scenes/`, `scripts/`, `assets/`
**Run:** F5 (project) or F6 (current scene)
**Signals:** `signal health_changed(value)`, `emit_signal("health_changed", health)`

## Unity Development
**Structure:** `Assets/Scenes/`, `Assets/Scripts/`, `Assets/Prefabs/`
**Run:** Play button or Ctrl+P
**Events:** `UnityEvent<int> OnHealthChanged;`, `OnHealthChanged?.Invoke(health);`

## Phaser 3 (Browser)
```javascript
const config = {
  type: Phaser.AUTO, width: 800, height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 300 } } },
  scene: [GameScene]
};
const game = new Phaser.Game(config);
```

## Game Loop Fundamentals
1. **Input**: Detect player actions
2. **Update**: Physics, AI, logic
3. **Render**: Draw frame

**Godot:** `_process(delta)`, `_physics_process(delta)`
**Unity:** `Update()`, `FixedUpdate()`

## Play-Testing Focus
Game feel matters more than logic:
1. Implement mechanic quickly
2. Play-test immediately
3. Adjust parameters (speed, jump height)
4. Repeat until "feels right"

## Vibe Coding Patterns
1. **Playable-First**: Get player moving in first 10 min
2. **Feel Before Features**: Tune until it feels right
3. **One Mechanic Deep**: Perfect core before adding more
4. **Debug Mode Default**: Keep debug visualization on
5. **Real-Time Tweaking**: Expose variables (`@export`, `[SerializeField]`)

## Requirements Additions
Document: Core Mechanic, Game Feel Targets, Performance Targets (60 FPS desktop, 30 FPS mobile), Asset Pipeline

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Content scope | > 5 levels | Level design document |
| Mechanics count | > 5 | Game design document |
| Multiplayer | Any networked | Network architecture |

**End of Game Framework**
