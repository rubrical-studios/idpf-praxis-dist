# Vibe-to-Structured Framework (Embedded)
**Version:** v0.2.0
**Type:** Embedded Systems Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Platform Coverage
Simulator-based development for:
- Arduino (AVR)
- ESP32, ESP8266 (WiFi/BLE)
- Raspberry Pi Pico
- STM32

## Simulators
| Simulator | Platforms |
|-----------|-----------|
| Wokwi | Arduino, ESP32, Pico |
| SimAVR | AVR microcontrollers |
| QEMU | ARM, Pico |
| Proteus | Various MCUs |

## Initialization Questions
- Target microcontroller?
- Sensor/peripheral needs?
- Simulator available?
- Communication requirements?

## Vibe Patterns
1. **Breadboard-First:** Single component → Two interacting → Add communication → System behavior
2. **Verbose Serial:** Over-communicate state via Serial for debugging
3. **Isolation Testing:** Test one peripheral at a time
4. **Simulator Validation:** Verify in simulator before hardware

## Verification Pattern
```
STEP 6: Compile for target
STEP 7: Run in simulator
STEP 8: Check serial output
STEP 9: Verify peripheral behavior
STEP 10: Report results
```

## Embedded Best Practices
- Start in simulator, validate on hardware later
- Use verbose serial debugging during vibe
- Test edge cases: power cycling, timing, interrupts
- Document pin assignments and connections

---

**End of Embedded Framework**
