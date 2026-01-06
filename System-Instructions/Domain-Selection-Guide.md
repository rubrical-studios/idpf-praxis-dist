# Domain Specialist Selection Guide
**Version:** v0.22.0
**Source:** System-Instructions/Domain-Selection-Guide.md

**Purpose:** Guide for selecting the appropriate domain specialist for your project during installation.

---

## How to Use This Guide
**At Installation:** Identify project focus → Select ONE Base Expert → Installer configures Core + specialist
**During Sessions:** Selected specialist loads automatically. Additional expertise (Packs) available on-demand via JIT loading.

---

## Base Experts (Select ONE at Install)

### Backend Specialist
**File:** `Domain/Base/Backend-Specialist.md`
**Use When:** Server-side applications, REST/GraphQL/gRPC APIs, business logic, auth, background jobs
**Key Expertise:** Django, Flask, Express, Spring Boot, API design, JWT/OAuth 2.0, Celery, Bull

### Frontend Specialist
**File:** `Domain/Base/Frontend-Specialist.md`
**Use When:** User interfaces, JavaScript frameworks, web applications, client-side logic/UX
**Key Expertise:** React, Vue, Angular, Svelte, CSS architecture, Core Web Vitals, WCAG, state management

### Full-Stack Developer
**File:** `Domain/Base/Full-Stack-Developer.md`
**Use When:** End-to-end web apps, frontend+backend, rapid prototyping, solo/small team projects
**Key Expertise:** Frontend + Backend integration, API contracts, full application lifecycle

### Mobile Specialist
**File:** `Domain/Base/Mobile-Specialist.md`
**Use When:** Native iOS/Android apps, cross-platform mobile, mobile-specific features
**Key Expertise:** Swift/SwiftUI/UIKit, Kotlin/Jetpack Compose, React Native, Flutter, MVVM/MVI

### Desktop Application Developer
**File:** `Domain/Base/Desktop-Application-Developer.md`
**Use When:** Native desktop apps, cross-platform desktop, system tray utilities
**Key Expertise:** Qt, GTK, WinForms, WPF, Electron, Tauri, platform APIs, packaging

### Game Developer
**File:** `Domain/Base/Game-Developer.md`
**Use When:** Video games, game engine development, interactive simulations
**Key Expertise:** Unity, Unreal, Godot, game loop, ECS, physics, graphics, multiplayer

### Embedded Systems Engineer
**File:** `Domain/Base/Embedded-Systems-Engineer.md`
**Use When:** Firmware, hardware interfacing, real-time systems, IoT
**Key Expertise:** C/C++, ARM Cortex-M, AVR, ESP32, FreeRTOS, Zephyr, UART/SPI/I2C/CAN

### Systems Programmer Specialist
**File:** `Domain/Base/Systems-Programmer-Specialist.md`
**Use When:** Low-level systems, OS development, compilers, performance-critical systems
**Key Expertise:** Memory management, concurrency, OS internals, compiler design, assembly

### Data Engineer
**File:** `Domain/Base/Data-Engineer.md`
**Use When:** Data pipelines (ETL/ELT), data warehousing, analytics infrastructure, big data
**Key Expertise:** Spark, Airflow, dbt, Snowflake/BigQuery/Redshift, Kafka, Flink, dimensional modeling

### ML Engineer
**File:** `Domain/Base/ML-Engineer.md`
**Use When:** ML models, model training/deployment (MLOps), data science, AI/ML features
**Key Expertise:** TensorFlow, PyTorch, scikit-learn, deep learning, MLOps (MLflow), model monitoring

### Cloud Solutions Architect
**File:** `Domain/Base/Cloud-Solutions-Architect.md`
**Use When:** System architecture design, architectural decisions, multi-cloud, scalability/HA
**Key Expertise:** AWS/Azure/GCP, microservices, serverless, event-driven, CAP theorem, ADRs, DR

### Site Reliability Engineer (SRE)
**File:** `Domain/Base/SRE-Specialist.md`
**Use When:** System reliability, SLOs/error budgets, incident response, observability
**Key Expertise:** SLO/SLI/SLA, error budgets, metrics/logs/traces, incident management, chaos engineering

---

## Selection Decision Tree

| Focus Area | Select This Base Expert |
|------------|------------------------|
| Building User Interfaces | Frontend Specialist |
| Building APIs or Server Logic | Backend Specialist |
| End-to-End Web Apps | Full-Stack Developer |
| Mobile Application | Mobile Specialist |
| Desktop Application | Desktop Application Developer |
| Video Games | Game Developer |
| Hardware/Firmware/IoT | Embedded Systems Engineer |
| Low-Level/OS/Compilers | Systems Programmer Specialist |
| Data Pipelines/Warehousing | Data Engineer |
| Machine Learning/AI | ML Engineer |
| System Architecture Design | Cloud Solutions Architect |
| Reliability/SLOs/Operations | SRE Specialist |

---

## Expertise Packs (JIT Loading)
Specialized skill sets loaded on-demand during a session.

**Available Packs:**
- Database-Engineer, DevOps-Engineer, Security-Engineer, Performance-Engineer
- QA-Test-Engineer, Accessibility-Specialist, API-Integration-Specialist
- Graphics-Engineer-Specialist, Platform-Engineer, Technical-Writer-Specialist

**How JIT Loading Works:** Tell Claude you need specialized help → Claude loads relevant Pack expertise on-demand → Primary Base Expert remains active.

---

## PRD Analyst
**File:** `Domain/PRD/PRD-Analyst.md`
Specialized role for requirements engineering: PRDs, requirement analysis, user stories, acceptance criteria, reverse-engineering from code/tests.

---

**End of Domain Selection Guide**
