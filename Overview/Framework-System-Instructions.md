# Framework System Instructions Reference
**Version:** v0.19.1
**Source:** Overview/Framework-System-Instructions.md
**Purpose:** Reference for System Instructions

---

## Architecture
**Pattern:** Core + Domain Specialization
- **Core-Developer-Instructions.md:** Universal competencies
- **23 Domain Specialists:** Specialized expertise (loaded with Core)
- **Domain-Selection-Guide.md:** Specialist selection

**Loading:** Core first → Domain specialist(s) for depth

---

## Core Competencies
- Version Control (Git, branching, PRs)
- Testing (Unit, Integration, E2E, TDD)
- Agile (Scrum, Kanban, CI/CD)
- Code Quality (SOLID, DRY, YAGNI, KISS)
- Design Patterns (MVC, Repository)
- Cross-Platform Awareness
- Security (OWASP Top 10)
- Performance (Big O, caching)

---

## Domain Specialists

| # | Specialist | Focus |
|---|------------|-------|
| 1 | Full-Stack-Developer | End-to-end, API contracts, React/Vue + Node/Python |
| 2 | Backend-Specialist | REST/GraphQL, OAuth/JWT, Django/Flask/Express/Rails |
| 3 | Frontend-Specialist | React/Vue/Angular, CSS, state management, a11y |
| 4 | DevOps-Engineer | CI/CD, Docker, K8s, Terraform, monitoring |
| 5 | Database-Engineer | Schema, optimization, replication, migrations |
| 6 | API-Integration-Specialist | REST/GraphQL/gRPC, microservices, message brokers |
| 7 | Security-Engineer | OWASP, OAuth 2.0, cryptography, compliance |
| 8 | Platform-Engineer | IDPs, service catalogs, DevEx |
| 9 | Mobile-Specialist | iOS/Android, React Native/Flutter, offline-first |
| 10 | Data-Engineer | ETL, Spark, data warehousing, governance |
| 11 | QA-Test-Engineer | Test strategy, automation, TDD/BDD |
| 12 | Cloud-Solutions-Architect | System design, AWS/Azure/GCP, scalability |
| 13 | SRE-Specialist | SLO/SLI, error budgets, incident response |
| 14 | Embedded-Systems-Engineer | C/C++, ARM/ESP32, RTOS, hardware protocols |
| 15 | ML-Engineer | TensorFlow/PyTorch, MLOps, model optimization |
| 16 | Performance-Engineer | Profiling, load testing, APM |
| 17 | PRD-Analyst | Requirements, IDPF-PRD, Reverse-PRD |
| 18 | Accessibility-Specialist | WCAG, assistive tech, legal compliance |
| 19 | Desktop-Application-Developer | Qt/Electron/Tauri, native APIs, packaging |
| 20 | Game-Developer | Unity/Unreal/Godot, game patterns, multiplayer |
| 21 | Graphics-Engineer-Specialist | GPU programming, Vulkan/DirectX/OpenGL |
| 22 | Systems-Programmer-Specialist | Memory, OS internals, compilers |
| 23 | Technical-Writer-Specialist | Docs-as-code, API docs, style guides |

---

## Selection Guide

| Use Case | Domains |
|----------|---------|
| Full-Stack Web | Core + Backend + Frontend + Database |
| Cloud Microservices | Core + API-Integration + DevOps + Cloud-Architect |
| Mobile + Backend | Core + Mobile + Backend |
| Data Platform | Core + Data + Database + Cloud-Architect |
| Secure Production | Core + Backend + Security + SRE |

**Decision Tree:**
- APIs/services → Backend
- UIs → Frontend
- Infrastructure → DevOps/Platform
- System design → Cloud-Architect
- Reliability → SRE
- Data → Data-Engineer + Database
- Mobile → Mobile
- Security → Security-Engineer
- Performance → Performance-Engineer
- ML → ML-Engineer
- Embedded → Embedded-Systems
- Testing → QA-Test
- Requirements → PRD-Analyst
- Accessibility → Accessibility-Specialist
- Desktop → Desktop-App
- Games → Game-Developer
- Graphics → Graphics-Engineer
- Systems → Systems-Programmer
- Documentation → Technical-Writer

---

## Vibe Agent Instructions

**Core:** Vibe-Agent-Core-Instructions.md (Rev 1.3)
- Platform-agnostic behaviors
- Concise communication
- Single code block enforcement
- Context preservation

**Platform-Specific:**
- Vibe-Agent-Desktop-Instructions.md
- Vibe-Agent-Web-Instructions.md
- Vibe-Agent-Mobile-Instructions.md
- Vibe-Agent-Game-Instructions.md
- Vibe-Agent-Embedded-Instructions.md
- Vibe-Agent-Newbie-Instructions.md

**Loading:** Core + Platform-specific together

---

**End of Framework System Instructions Reference**
