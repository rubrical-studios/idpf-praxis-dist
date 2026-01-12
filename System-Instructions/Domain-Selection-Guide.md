# Domain Specialist Selection Guide
**Version:** v0.23.3
**Purpose:** Guide for selecting appropriate domain specialist during installation
---
## How to Use This Guide
**At Installation:**
1. Identify project's primary focus
2. Select ONE Base Expert from 12 options
3. Installer configures Core + selected specialist
**During Sessions:**
- Selected specialist loads automatically
- Additional expertise (Packs) available on-demand via JIT loading
---
## Base Experts (Select ONE)
### Backend Specialist
**File:** `Domain/Base/Backend-Specialist.md`
**Use When:** Server-side applications, REST/GraphQL/gRPC APIs, business logic, auth
**Expertise:** Django, Flask, Express, Spring Boot; JWT, OAuth 2.0; Celery, Bull
### Frontend Specialist
**File:** `Domain/Base/Frontend-Specialist.md`
**Use When:** User interfaces, JavaScript frameworks, web apps, client-side logic
**Expertise:** React, Vue, Angular, Svelte; CSS; Core Web Vitals; WCAG; Redux, Zustand, Pinia
### Full-Stack Developer
**File:** `Domain/Base/Full-Stack-Developer.md`
**Use When:** End-to-end web apps, frontend+backend, MVPs, solo/small teams
**Expertise:** Frontend+Backend integration, API contracts, full app lifecycle
### Mobile Specialist
**File:** `Domain/Base/Mobile-Specialist.md`
**Use When:** Native iOS/Android, cross-platform, push notifications, offline-first
**Expertise:** Swift, SwiftUI, UIKit; Kotlin, Jetpack Compose; React Native, Flutter; MVVM, MVI
### Desktop Application Developer
**File:** `Domain/Base/Desktop-Application-Developer.md`
**Use When:** Native desktop apps, cross-platform desktop, system tray utilities
**Expertise:** Qt, GTK, WinForms, WPF, Electron, Tauri; Win32, Cocoa, X11; packaging
### Game Developer
**File:** `Domain/Base/Game-Developer.md`
**Use When:** Video games, game engine development, interactive simulations
**Expertise:** Unity, Unreal, Godot; game loop, ECS, state machines; physics; multiplayer
### Embedded Systems Engineer
**File:** `Domain/Base/Embedded-Systems-Engineer.md`
**Use When:** Firmware, hardware interfacing, real-time systems, IoT
**Expertise:** C/C++; ARM Cortex-M, AVR, ESP32; FreeRTOS, Zephyr; UART, SPI, I2C, CAN
### Systems Programmer Specialist
**File:** `Domain/Base/Systems-Programmer-Specialist.md`
**Use When:** Low-level systems, OS development, compilers, performance-critical systems
**Expertise:** Memory management, concurrency, OS internals, compiler design, assembly
### Data Engineer
**File:** `Domain/Base/Data-Engineer.md`
**Use When:** Data pipelines (ETL/ELT), warehousing, analytics, big data
**Expertise:** Spark, Airflow, dbt; Snowflake, BigQuery, Redshift; Kafka, Flink; dimensional modeling
### ML Engineer
**File:** `Domain/Base/ML-Engineer.md`
**Use When:** Machine learning models, MLOps, data science, AI features
**Expertise:** TensorFlow, PyTorch, scikit-learn; CNNs, RNNs, Transformers; MLflow
### Cloud Solutions Architect
**File:** `Domain/Base/Cloud-Solutions-Architect.md`
**Use When:** System architecture, architectural decisions, cloud-native, scalability
**Expertise:** AWS, Azure, GCP; microservices, serverless, event-driven; CAP theorem; ADRs
### Site Reliability Engineer (SRE)
**File:** `Domain/Base/SRE-Specialist.md`
**Use When:** System reliability, SLOs, incident response, observability
**Expertise:** SLO/SLI/SLA, error budgets, metrics/logs/traces, chaos engineering
---
## Selection Decision Tree
| Focus Area | Select |
|------------|--------|
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
Specialized skill sets loaded on-demand during sessions:
- **Database-Engineer** - Database design, query optimization
- **DevOps-Engineer** - CI/CD, containers, K8s, IaC
- **Security-Engineer** - OWASP, auth, cryptography
- **Performance-Engineer** - Optimization, load testing
- **QA-Test-Engineer** - Test strategy, automation
- **Accessibility-Specialist** - WCAG, assistive tech
- **API-Integration-Specialist** - Microservices, API gateways
- **Graphics-Engineer-Specialist** - Rendering, shaders, GPU
- **Platform-Engineer** - IDPs, service catalogs
- **Technical-Writer-Specialist** - Documentation, API docs
**How JIT Works:** Tell Claude you need specialized help, relevant Pack loaded on-demand.
---
## PRD Analyst
**File:** `Domain/PRD/PRD-Analyst.md`
Specialized for requirements engineering:
- Creating PRDs
- Gathering/analyzing requirements
- Writing user stories and acceptance criteria
- Reverse-engineering requirements from code
Loaded separately for PRD-focused tasks.
---
## Quick Reference
| Base Expert | Primary Focus | Examples |
|-------------|---------------|----------|
| Backend | Server-side, APIs | REST APIs, microservices |
| Frontend | UIs, client-side | SPAs, web apps |
| Full-Stack | End-to-end web | MVPs, solo projects |
| Mobile | iOS/Android | Native/cross-platform |
| Desktop App | Desktop apps | Native, cross-platform |
| Game Dev | Video games | Engines, mechanics |
| Embedded | Firmware | IoT, microcontrollers |
| Systems | Low-level, OS | Compilers, drivers |
| Data | Pipelines, warehousing | ETL, analytics |
| ML | ML, AI | Models, MLOps |
| Cloud Architect | System design | Scalability |
| SRE | Reliability, ops | SLOs, incidents |
---
**End of Domain Selection Guide**
