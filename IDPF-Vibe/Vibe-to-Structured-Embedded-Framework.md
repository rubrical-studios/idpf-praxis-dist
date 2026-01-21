# Vibe-to-Structured Development Framework (Embedded)
**Version:** v0.29.2
**Type:** Embedded Systems Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Embedded Platform Coverage
| Platform | Simulator | Languages |
|----------|-----------|-----------|
| Arduino/ESP32 | Wokwi (web) | C++, Arduino |
| STM32 | Renode, QEMU | C, C++, Rust |
| Raspberry Pi | QEMU | Python, C, C++ |
| FreeRTOS/Zephyr | QEMU, Renode | C, C++ |

## Session Initialization (Embedded-Specific)
After Core Framework steps, ask:
- Target platform? (Arduino/ESP32/STM32/Raspberry Pi)
- Simulator preference? (Wokwi/QEMU/Renode)
- Application type? (Sensor reading/Control system/IoT)
- Real-time requirements? (RTOS needed?)

## Wokwi (Easiest Start)
**Best for:** Arduino, ESP32, beginners
**Workflow:** Open wokwi.com -> New project -> Add components -> Write code -> Start Simulation
**Advantages:** No installation, visual circuit builder, real-time simulation

## QEMU (Linux Systems)
**Best for:** Raspberry Pi, ARM Linux
**Setup:** Download image, extract kernel, run: `qemu-system-arm -M versatilepb ...`
**Access:** SSH `pi@localhost -p 5022`

## Renode (Complex Embedded)
**Best for:** STM32, nRF52, RISC-V
**Setup:** Create .resc script, `sysbus LoadELF @firmware.elf`, `start`

## Vibe Coding Patterns
1. **Breadboard-First**: Single component -> Two interacting -> Add communication
2. **Verbose Serial**: `Serial.println()` everywhere for debugging
3. **Safe Defaults**: Initialize outputs LOW before enabling features
4. **Time-Boxed Experiments**: 30-min limit with success/abandon criteria
5. **Simulated Sensors**: Model realistic behavior (drift, noise)

## Memory/Resource Awareness
| Platform | Flash | SRAM |
|----------|-------|------|
| Arduino Uno | 32 KB | 2 KB |
| ESP32 | 4 MB | 520 KB |
| STM32F4 | 512 KB | 128 KB |

**Track:** Memory usage, CPU time per loop, I/O resources

## Common Patterns
**State Machine:**
```cpp
enum State { IDLE, READING, PROCESSING, ERROR };
switch (currentState) { case IDLE: ... }
```
**Non-Blocking Timing:**
```cpp
if (millis() - previousMillis >= interval) { previousMillis = millis(); /* action */ }
```
**Interrupt:**
```cpp
volatile bool flag = false;
void IRAM_ATTR isr() { flag = true; }
attachInterrupt(pin, isr, FALLING);
```

## Transition Checklist
- [ ] All sensors tested in simulation
- [ ] Communication protocols verified
- [ ] Pin assignments documented
- [ ] Memory budget evaluated
- [ ] Timing requirements measured

## Requirements Additions
Document: Hardware Specification (virtual), Simulation Environment, Power & Timing Constraints

**End of Embedded Framework**
