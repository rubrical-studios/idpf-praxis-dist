# Domain Specialist Selection Guide
**Version:** v0.5.0
---
## Usage
**Step 1:** Identify primary focus | **Step 2:** Match to specialist | **Step 3:** Load Core-Developer-Instructions.md + Domain specialist
---
## Quick Reference
| Domain | Primary Focus | When to Use |
|--------|---------------|-------------|
| Backend | Server logic, APIs | REST/GraphQL APIs, auth, business logic |
| Frontend | UI, client-side | SPAs, PWAs, component libraries |
| DevOps | Deployment, infra | CI/CD, Docker, Kubernetes, IaC |
| Database | Data modeling | Schema design, query optimization |
| API-Integration | System integration | Third-party APIs, microservices, webhooks |
| Security | App security | Audits, OWASP, compliance |
| Platform | Dev platforms | Internal portals, self-service infra |
| Mobile | iOS/Android | Native/cross-platform mobile |
| Data | Pipelines, warehousing | ETL, Spark, Airflow, dbt |
| QA & Test | Test automation | Test frameworks, QA process |
| Cloud Architect | System design | Cloud architecture, scalability |
| SRE | Reliability | SLOs, incident response |
| Embedded | Firmware, hardware | IoT, microcontrollers, RTOS |
| ML | Machine learning | Models, MLOps, training |
| Performance | Optimization | Load testing, profiling |
| PRD Analyst | Requirements | PRDs, user stories, acceptance criteria |
| Accessibility | WCAG, AT | Audits, compliance, screen readers |
| Desktop App | Desktop apps | Qt, Electron, Tauri, WPF |
| Game Dev | Video games | Unity, Unreal, Godot |
| Graphics | Rendering, shaders | Vulkan, DirectX, GLSL |
| Systems | Low-level, OS | Compilers, runtimes, drivers |
| Technical Writer | Documentation | API docs, doc sites |
---
## Decision Tree
- **Building UI?** → Frontend
- **Building APIs/server?** → Backend or API-Integration
- **Deploying/operating?** → DevOps or SRE or Platform
- **Working with data?** → Data (pipelines) or Database (optimization)
- **Mobile app?** → Mobile
- **Security focus?** → Security
- **System architecture?** → Cloud Architect
- **Quality assurance?** → QA & Test
- **Hardware/firmware?** → Embedded
- **Machine learning?** → ML
- **Performance tuning?** → Performance
- **Requirements/PRD?** → PRD Analyst
- **Accessibility/WCAG?** → Accessibility
- **Desktop app?** → Desktop App
- **Game development?** → Game Dev
- **Graphics/rendering?** → Graphics
- **Systems/low-level?** → Systems
- **Documentation?** → Technical Writer
---
## Combining Specialists
**Full-Stack Web:** Core + Backend + Frontend + Database
**Cloud-Native:** Core + API-Integration + DevOps + Cloud Architect
**Mobile + Backend:** Core + Mobile + Backend
**Data Platform:** Core + Data + Database + Cloud Architect
**Secure Production:** Core + Backend + Security + SRE
**End of Domain Selection Guide**
