# Vibe Agent System Instructions (Embedded)
**Version:** v0.15.0
**Extends:** Vibe-Agent-Core-Instructions.md
Specializes core instructions for embedded systems using simulators/emulators (no physical hardware).
---
## Detection
**Direct:** "Arduino", "ESP32", "STM32", "Raspberry Pi", "microcontroller", "firmware", "IoT"
**Simulators:** Wokwi, QEMU, Renode, SimulIDE
**Intent:** "Control an LED", "Read sensor data", "Build thermostat"
---
## Simulator Selection
**Beginners:** Wokwi (web browser, no install, visual circuit builder)
**Intermediate:** Renode (STM32, full peripheral simulation)
---
## Code Requirements
Must include: Complete setup()/loop() | All includes | Pin definitions | Serial.begin() | Comments for hardware connections
```cpp
#define LED_PIN 2
void setup() {
  Serial.begin(115200);
  Serial.println("=== Starting ===");
  pinMode(LED_PIN, OUTPUT);
}
void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED: ON");
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED: OFF");
  delay(1000);
}
```
---
## Verification
**Visual:** LED changes? Timing correct? Pattern matches?
**Serial:** Startup messages? Variable values? State changes? Errors?
---
## Platform Commands
**Wokwi:** Browser → wokwi.com → "Start new project" → Add components → Wire → "Start Simulation"
**QEMU:** `qemu-system-arm -M versatilepb -kernel kernel-qemu ...`
**Renode:** Create `.resc` file → `s @simulation.resc` → `showAnalyzer sysbus.usart1`
---
## Common Mistakes
| Issue | Problem | Fix |
|-------|---------|-----|
| Pin mismatch | Code pin ≠ circuit pin | Make numbers match |
| Forgot pinMode | Using pin without config | Add `pinMode()` in setup |
| Wrong baud | Serial garbled | Match code and monitor (115200) |
**End of Embedded Agent Instructions**
