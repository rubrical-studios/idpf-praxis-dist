# Vibe-to-Structured Development Framework (Embedded)
**Version:** v0.19.1
**Source:** IDPF-Vibe/Vibe-to-Structured-Embedded-Framework.md
**Type:** Embedded Systems Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for embedded systems using simulators/emulators without physical hardware.
**Evolution Target:** IDPF-Agile

---

## Platform Coverage

### Microcontrollers
| Platform | Simulator | Languages |
|----------|-----------|-----------|
| Arduino/AVR | Wokwi, SimulIDE | C++, Arduino |
| ESP32/ESP8266 | Wokwi | C++, MicroPython |
| STM32 (ARM) | Renode, QEMU | C, C++, Rust |
| Raspberry Pi | QEMU | Python, C/C++ |

### RTOS
FreeRTOS, Zephyr RTOS - QEMU/Renode simulation

---

## Simulator Selection

### Wokwi (Web-Based) - EASIEST
**Best for:** Arduino, ESP32, beginners, quick prototyping
- No installation, visual circuit builder, real-time simulation
- https://wokwi.com

### QEMU - Best for Linux Systems
**Best for:** Raspberry Pi, ARM Linux, RTOS
```bash
qemu-system-arm -M versatilepb -cpu arm1176 ...
```

### Renode - Best for Complex Embedded
**Best for:** STM32, nRF52, multi-node systems
```
machine LoadPlatformDescription @platforms/boards/stm32f4_discovery-kit.repl
sysbus LoadELF @firmware.elf
start
```

---

## Vibe Coding Patterns

### Breadboard-First
```
STEP 1: Single component (LED blinks)
STEP 2: Two components interacting
STEP 3: Add communication (Serial)
STEP 4: System behavior (state machine)
```

### Verbose Serial Everything
```cpp
void vibeDebug(const char* location, const char* msg) {
    Serial.print("["); Serial.print(millis()); Serial.print("] ");
    Serial.print(location); Serial.print(": "); Serial.println(msg);
}
```

### Safe Defaults First
```cpp
// Disable outputs first
pinMode(MOTOR_PIN, OUTPUT);
digitalWrite(MOTOR_PIN, LOW);  // Safe state
// Then configure inputs with pull-ups
pinMode(BUTTON_PIN, INPUT_PULLUP);
```

---

## Wokwi Workflow
```
STEP 1: Open https://wokwi.com
STEP 2: Start new project (ESP32/Arduino)
STEP 3: Add components, wire visually
STEP 4: Write code in editor
STEP 5: Click "Start Simulation"
STEP 6: Observe LEDs, Serial output
STEP 7: Report results
```

---

## Common Patterns

### State Machine
```cpp
enum State { IDLE, READING, PROCESSING, SENDING, ERROR };
State currentState = IDLE;
void loop() {
    switch (currentState) { /* handle states */ }
}
```

### Timing Without delay()
```cpp
unsigned long previousMillis = 0;
void loop() {
    if (millis() - previousMillis >= interval) {
        previousMillis = millis();
        // Timed action
    }
    // Other code runs continuously
}
```

### Interrupt Handling
```cpp
volatile bool buttonPressed = false;
void IRAM_ATTR buttonISR() { buttonPressed = true; }
```

---

## Memory Constraints

| Platform | Flash | SRAM | EEPROM |
|----------|-------|------|--------|
| Arduino Uno | 32 KB | 2 KB | 1 KB |
| ESP32 | 4 MB | 520 KB | 4 KB* |
| STM32F4 | 512 KB | 128 KB | None |

---

## Bare-Metal vs RTOS

| Factor | Bare-Metal | RTOS |
|--------|------------|------|
| Memory overhead | None | 2-10 KB |
| Timing predictability | Perfect | Good |
| Multi-task | Manual | Built-in |
| Complexity | Low | Medium |

---

## Transition Triggers

**To IDPF-Agile:**
- Multiple deployment targets
- Evolving feature requirements
- Team collaboration needed
- OTA update capability planned
- IoT platform integration

**Checklist before transition:**
- [ ] All sensors tested in simulation
- [ ] Communication protocols verified
- [ ] Memory budget evaluated
- [ ] Timing requirements measured

---

## When to Use
**Use for:** Microcontroller firmware, IoT devices, RTOS apps, sensor systems
**Simulation sufficient for:** Learning, algorithm development, logic verification
**Physical hardware required for:** Precise timing, power measurement, environmental testing

---

**End of Embedded Framework**
