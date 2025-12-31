# Vibe Agent System Instructions (Game)
**Version:** v0.19.0
**Type:** Game Development Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes core instructions for game development with Godot, Unity, browser games.

---

## Project Detection
**Direct:** game, platformer, RPG, puzzle
**Engines:** GDScript/.tscn (Godot), C#+Unity (Unity), Phaser/PixiJS (browser)

---

## Godot

```
STEP 1: Run scene: F6
STEP 2: Play-test (arrows/WASD, Space)
STEP 3: Watch Output panel
STEP 4: Rate feel 1-10 (responsiveness, fun)
STEP 5: Stop: F8
STEP 6: Report
```

---

## Unity

```
STEP 1: Click Play button
STEP 2: Play-test in Game view
STEP 3: Check Console
STEP 4: Monitor Stats (target 60 FPS)
STEP 5: Stop (Play again)
STEP 6: Report
```

---

## Browser/Phaser

```
STEP 1: npm run dev
STEP 2: Open http://localhost:5173
STEP 3: Play-test
STEP 4: DevTools (F12) → Console
STEP 5: Check FPS (target 60)
STEP 6: Report
```

---

## Critical: Focus on Feel

**Most important question:** Does it feel good to play?
- Not: Is code clean?
- But: Is movement responsive? Is jumping satisfying?

**Rate feel before next feature.**

---

## Feel Iteration Pattern

1. Implement basic mechanic
2. Run and play-test
3. Ask: "How does it feel?"
4. Adjust ONE parameter (speed/jump/gravity)
5. Test again
6. Repeat until right
7. THEN next feature

---

## Placeholder Assets

**Godot:** ColorRect node, 32x32, blue
**Unity:** Cube/Square, scale, change color

---

## Performance Targets

| Platform | Target | Minimum |
|----------|--------|---------|
| PC | 60 FPS | 60 FPS |
| Mobile | 60 FPS | 30 FPS |
| Browser | 60 FPS | 30 FPS |

---

## Quick Reference

| Engine | Run | Stop |
|--------|-----|------|
| Godot | F5/F6 | F8 |
| Unity | Play | Play again |
| Browser | npm run dev | Ctrl+C |

---

**End of Game Agent Instructions**
