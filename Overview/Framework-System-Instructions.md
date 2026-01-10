# Framework System Instructions Reference
**Version:** v0.23.0
**Purpose:** System Instructions reference
---
## Overview
**Location:** `System-Instructions/`
**Purpose:** Define assistant identity, expertise, and behavioral patterns
**Critical:** System Instructions are REQUIRED for all framework operation.
---
## Domain Specialization Architecture
**Pattern:** Core + Domain Specialization
- **Core-Developer-Instructions.md (Rev 1.0):** Foundation competencies
- **23 Domain Specialists:** Specialized expertise (loaded with Core)
- **Domain-Selection-Guide.md (Rev 1.0):** Specialist selection guide
### Loading Pattern
1. Load Core-Developer-Instructions.md (universal competencies)
2. Load appropriate Domain specialist file(s)
3. Domain extends and deepens core competencies
### Core Developer Competencies
- Version Control (Git workflows, branching, PR reviews)
- Testing Fundamentals (Unit, Integration, E2E, TDD)
- Agile Development (Scrum, Kanban, CI/CD)
- Code Quality (SOLID, DRY, YAGNI, KISS)
- Design Patterns (Creational, Structural, Behavioral, MVC)
- Cross-Platform Awareness (OS differences, paths)
- Security Fundamentals (OWASP Top 10, authentication)
- Performance Basics (Big O, caching, profiling)
---
## Domain Specialists (23)
### Base Experts (12)
| Specialist | Focus |
|------------|-------|
| Full-Stack-Developer | End-to-end apps, holistic design, API contracts |
| Backend-Specialist | Server-side, REST/GraphQL, auth, business logic |
| Frontend-Specialist | React/Vue/Angular/Svelte, CSS, state, a11y |
| Mobile-Specialist | iOS (Swift), Android (Kotlin), cross-platform |
| Desktop-Application-Developer | Cross-platform desktop, UI frameworks |
| Game-Developer | Unity, Unreal, Godot, game patterns |
| Embedded-Systems-Engineer | C/C++, microcontrollers, RTOS, protocols |
| Systems-Programmer-Specialist | Low-level, OS, compilers, performance |
| Data-Engineer | ETL/ELT, data processing, warehousing |
| ML-Engineer | TensorFlow/PyTorch, MLOps, deep learning |
| Cloud-Solutions-Architect | System design, AWS/Azure/GCP, scalability |
| SRE-Specialist | SLO/SLI/SLA, error budgets, observability |
### Expertise Packs (10)
| Specialist | Focus |
|------------|-------|
| DevOps-Engineer | CI/CD, containers, K8s, IaC, monitoring |
| Database-Engineer | Schema, queries, replication, migrations |
| API-Integration-Specialist | REST/GraphQL/gRPC, microservices, messaging |
| Security-Engineer | OWASP, auth, cryptography, compliance |
| Platform-Engineer | IDPs, service catalogs, DevEx |
| QA-Test-Engineer | Test strategy, automation, performance |
| Performance-Engineer | Profiling, load testing, APM |
| Accessibility-Specialist | WCAG, assistive tech, legal compliance |
| Graphics-Engineer-Specialist | GPU, shaders, rendering, graphics APIs |
| Technical-Writer-Specialist | Documentation, API docs, style guides |
### PRD (1)
| Specialist | Focus |
|------------|-------|
| PRD-Analyst | Requirements elicitation, PRD creation, Reverse-PRD |
---
## Domain Selection Guide
### Quick Reference
| Use Case | Recommended |
|----------|-------------|
| Full-Stack Web | Core + Backend + Frontend + Database |
| Cloud-Native Microservices | Core + API-Integration + DevOps + Cloud-Architect |
| Mobile App with Backend | Core + Mobile + Backend |
| Data Platform | Core + Data-Engineer + Database + Cloud-Architect |
| Secure Production | Core + Backend + Security + SRE |
### Decision Tree
- APIs/services: Backend-Specialist
- UIs: Frontend-Specialist
- Infrastructure: DevOps-Engineer or Platform-Engineer
- System design: Cloud-Solutions-Architect
- Reliability: SRE-Specialist
- Data work: Data-Engineer + Database-Engineer
- Mobile: Mobile-Specialist
- Security: Security-Engineer
- Performance: Performance-Engineer
- ML: ML-Engineer
- Embedded/IoT: Embedded-Systems-Engineer
- Testing: QA-Test-Engineer
- Requirements: PRD-Analyst
- Accessibility: Accessibility-Specialist
- Desktop: Desktop-Application-Developer
- Games: Game-Developer
- Graphics: Graphics-Engineer-Specialist
- Systems/low-level: Systems-Programmer-Specialist
- Documentation: Technical-Writer-Specialist
**Multiple domains can be combined.**
---
## Vibe Agent System Instructions
### Core (Rev 1.3)
- Platform-agnostic behavioral instructions for Vibe workflow
- Key behaviors: Concise communication, single code block, context preservation, TDD management
### Platform-Specific
- Vibe-Agent-Desktop-Instructions.md
- Vibe-Agent-Web-Instructions.md
- Vibe-Agent-Mobile-Instructions.md
- Vibe-Agent-Game-Instructions.md
- Vibe-Agent-Embedded-Instructions.md
- Vibe-Agent-Newbie-Instructions.md
### Integration
- Core Vibe instructions apply to all platforms
- Platform-specific adds specialized guidance
- Both must be loaded together
---
**End of Framework System Instructions Reference**
