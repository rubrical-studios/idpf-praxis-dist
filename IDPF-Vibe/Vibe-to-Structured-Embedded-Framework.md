# Vibe-to-Structured Development Framework (Embedded)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Embedded-Framework.md
**Type:** Embedded Systems Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Embedded systems development using simulators and emulators. Focus on development without physical hardware using free/open-source simulation tools.
**Evolution Target:** IDPF-Agile

---

## Embedded Platform Coverage
### Microcontroller Platforms
| Platform | Simulator | Languages | Use Cases |
|----------|-----------|-----------|-----------|
| **Arduino (AVR/ARM)** | Wokwi, SimulIDE | C++, Arduino | IoT, sensors, automation |
| **ESP32/ESP8266** | Wokwi | C++, MicroPython, Arduino | WiFi/BT IoT, web servers |
| **STM32 (ARM Cortex-M)** | Renode, QEMU | C, C++, Rust | Industrial, robotics |
| **ARM Cortex-M Generic** | QEMU, Renode | C, C++, Rust | General embedded |

### Embedded Linux
| Platform | Simulator | Languages | Use Cases |
|----------|-----------|-----------|-----------|
| **Raspberry Pi** | QEMU | Python, C, C++, Rust | IoT gateways, automation |
| **BeagleBone** | QEMU | Python, C, C++ | Industrial, robotics |

### RTOS Platforms
| Platform | Simulator | Use Cases |
|----------|-----------|-----------|
| **FreeRTOS** | QEMU, native | Real-time embedded |
| **Zephyr RTOS** | QEMU, Renode | IoT, wearables, industrial |

---

## Session Initialization
After Core Framework init (Steps 1-4), ask:
- Target platform? (Arduino/ESP32/STM32/Raspberry Pi/Other)
- Simulator preference? (Wokwi/QEMU/Renode/SimulIDE)
- Application type? (Sensor reading/Control system/IoT device/RTOS app)
- Language preference? (C/C++/MicroPython/Rust)
- Real-time requirements? (Yes - RTOS / No - bare metal or Linux)

---

## Simulator Selection Guide
### Wokwi (Web-Based) - EASIEST
**Best for:** Arduino, ESP32, beginners, quick prototyping
**Advantages:** No install, visual circuit builder, real-time simulation, URL sharing
**Limitations:** Requires internet, limited platforms
```
STEP 1: Open https://wokwi.com
STEP 2: Start new project, select platform
STEP 3: Drag components, wire visually
STEP 4: Write code, click "Start Simulation"
```

### QEMU - Best for Linux Systems
**Best for:** Raspberry Pi, ARM Linux, RTOS testing
```bash
# Install and run Raspberry Pi
qemu-system-arm -M versatilepb -cpu arm1176 \
  -kernel kernel.img -dtb versatile-pb.dtb \
  -hda raspbian.img -append "root=/dev/sda2" \
  -serial stdio -net user,hostfwd=tcp::5022-:22
# SSH: ssh pi@localhost -p 5022
```

### Renode - Best for Complex Embedded
**Best for:** STM32, nRF52, RISC-V, multi-node systems
```
# Basic usage
mach create "stm32"
machine LoadPlatformDescription @platforms/boards/stm32f4_discovery-kit.repl
sysbus LoadELF @path/to/firmware.elf
start
```

### SimulIDE - Visual Circuit
**Best for:** Arduino, AVR, visual circuit design, electronics learning

---

## Embedded Vibe Patterns
### Pattern 1: Breadboard-First Thinking
```
STEP 1: Single component (LED blinks)
STEP 2: Two components interacting (button controls LED)
STEP 3: Add communication (serial debugging)
STEP 4: System behavior (state machine)
```

### Pattern 2: Verbose Serial
```cpp
void vibeDebug(const char* location, const char* msg) {
    Serial.print("["); Serial.print(millis()); Serial.print("] ");
    Serial.print(location); Serial.print(": "); Serial.println(msg);
}
```

### Pattern 3: Safe Defaults First
```cpp
void setup() {
    pinMode(MOTOR_PIN, OUTPUT);
    digitalWrite(MOTOR_PIN, LOW);  // Safe state FIRST
    pinMode(BUTTON_PIN, INPUT_PULLUP);
    Serial.begin(115200);
}
```

### Pattern 4: Time-Boxed Experiments
```
EXPERIMENT: WiFi connection
TIME LIMIT: 30 minutes
SUCCESS: Connects, reconnects, shows status
ABANDON IF: Library won't compile (10 min), No connection (15 min)
```

### Pattern 5: Simulated Sensors
```cpp
float readTemperature() {
    static float baseTemp = 25.0;
    if (millis() - lastRead > 5000) baseTemp += random(-10, 11) / 100.0;
    return baseTemp + random(-50, 51) / 100.0;  // Add noise
}
```

---

## Bare-Metal vs RTOS Decision
| Factor | Bare-Metal | RTOS |
|--------|------------|------|
| Memory overhead | None | 2-10 KB |
| Timing predictability | Perfect | Good (with priority) |
| Multi-task handling | Manual | Built-in |
| Complexity | Low | Medium |
| Learning curve | Low | Medium |

**Use Bare-Metal:** Simple control loops, deterministic timing, minimal memory, single task
**Use RTOS:** Multiple concurrent tasks, priority scheduling, inter-task communication

---

## FreeRTOS Example
```cpp
#include <Arduino_FreeRTOS.h>
#include <semphr.h>
SemaphoreHandle_t serialMutex;

void TaskSensor(void *pvParameters) {
    for (;;) {
        float temp = readTemperature();
        xSemaphoreTake(serialMutex, portMAX_DELAY);
        Serial.print("Sensor: "); Serial.println(temp);
        xSemaphoreGive(serialMutex);
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}
void setup() {
    serialMutex = xSemaphoreCreateMutex();
    xTaskCreate(TaskSensor, "Sensor", 128, NULL, 2, NULL);
}
```

---

## Common Embedded Patterns
### State Machine
```cpp
enum State { IDLE, READING_SENSOR, PROCESSING, SENDING_DATA, ERROR };
State currentState = IDLE;
void loop() {
    switch (currentState) {
        case IDLE: if (shouldReadSensor()) currentState = READING_SENSOR; break;
        case READING_SENSOR: /* read, transition */ break;
        // ...
    }
}
```

### Interrupt Handling
```cpp
volatile bool buttonPressed = false;
void IRAM_ATTR buttonISR() { buttonPressed = true; }
void setup() {
    attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonISR, FALLING);
}
```

### Non-blocking Timing
```cpp
unsigned long previousMillis = 0;
const long interval = 1000;
void loop() {
    if (millis() - previousMillis >= interval) {
        previousMillis = millis();
        toggleLED();
    }
    checkButton();  // Other code runs continuously
}
```

---

## Memory & Resource Awareness
| Platform | Flash | SRAM | EEPROM |
|----------|-------|------|--------|
| Arduino Uno | 32 KB | 2 KB | 1 KB |
| ESP32 | 4 MB | 520 KB | 4 KB* |
| STM32F4 | 512 KB | 128 KB | None |
| Raspberry Pi | 32 GB (SD) | 1-8 GB | N/A |

**Resource Budget Template:**
```markdown
### Memory: Flash used/available, SRAM used/available
### CPU Time: Task time per loop iteration
### I/O Resources: GPIO/PWM/ADC/I2C/SPI/UART available
```

---

## Transition Triggers
| Trigger | Threshold | Action |
|---------|-----------|--------|
| Multiple targets | > 1 deployment target | Transition to Agile |
| Feature requirements | Evolving with feedback | Transition to Agile |
| OTA updates planned | Any | Transition to Agile |
| IoT platform integration | Any | Transition to Agile |

### Pre-Transition Checklist
- [ ] All sensors tested in simulation
- [ ] Communication protocols verified (I2C, SPI, UART)
- [ ] Pin assignments documented
- [ ] Memory budget evaluated
- [ ] Timing requirements measured

---

## Simulator to Hardware Migration
```cpp
#ifdef SIMULATION
    delay(100);  // Fast for testing
#else
    delay(2000); // Real sensor timing
#endif

#ifndef SIMULATOR
    #include <DHT.h>
    DHT dht(DHT_PIN, DHT22);
#endif
```

**Physical Testing Checklist:**
- [ ] Simulated sensors replaced with real drivers
- [ ] Timing adjusted for actual hardware
- [ ] Power consumption measured
- [ ] Error handling for real failures

---

## When to Use
**Use this:** Microcontroller firmware, Embedded Linux, RTOS apps, IoT devices, Control systems, Sensor acquisition
**Simulation sufficient:** Learning, algorithm development, proof of concept, logic verification
**Hardware required:** Precise timing validation, power measurement, real sensor noise, environmental testing

---

**End of Embedded Framework**
