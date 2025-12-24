# Specialist Relationships Guide
**Version:** v0.2.0
Guidance on specialist selection, scope boundaries, and combinations.
---
## Decision Tree
| Primary Task | Use Specialist |
|--------------|----------------|
| Server-side logic, databases | Backend |
| External APIs, webhooks | API-Integration |
| Cloud architecture decisions | Cloud-Solutions-Architect |
| CI/CD, deployment pipelines | DevOps |
| Web UI, JS frameworks | Frontend |
| Mobile apps | Mobile |
| Schema design, query optimization | Database-Engineer |
| ETL, data warehousing | Data-Engineer |
| Security audits, vulnerabilities | Security-Engineer |
| Performance testing | Performance-Engineer |
| Test automation, QA | QA-Test-Engineer |
| Production reliability | SRE |
| ML models, pipelines | ML-Engineer |
| Desktop apps | Desktop-Application-Developer |
| Game dev | Game-Developer |
| Graphics, shaders | Graphics-Engineer |
| Firmware, hardware | Embedded-Systems-Engineer |
| OS internals, compilers | Systems-Programmer |
| Platform/SDK dev | Platform-Engineer |
| WCAG, accessibility | Accessibility |
| PRD, requirements | PRD-Analyst |
| Documentation | Technical-Writer |
---
## Commonly Confused Specialists
### Backend vs API-Integration
| Aspect | Backend | API-Integration |
|--------|---------|-----------------|
| Focus | Internal business logic | System-to-system communication |
| API Work | Designing YOUR APIs | Consuming EXTERNAL APIs |
| Choose | Core app logic, auth | Third-party integrations, webhooks |
### Cloud-Architect vs DevOps
| Aspect | Cloud-Architect | DevOps |
|--------|-----------------|--------|
| Focus | Architecture, design | Implementation, automation |
| Output | Diagrams, decisions | Pipelines, IaC |
| Choose | New project architecture | CI/CD, Kubernetes, Terraform |
---
## Combination Matrix
| Project Type | Primary | Supporting |
|--------------|---------|------------|
| Web App | Full-Stack | Frontend, Backend, Database |
| API Service | Backend | API-Integration, Database |
| Mobile App | Mobile | Backend, API-Integration |
| Data Pipeline | Data-Engineer | Database, Cloud-Architect |
| ML System | ML-Engineer | Data-Engineer, Cloud-Architect |
| DevOps Setup | DevOps | Cloud-Architect, SRE |
| Security Audit | Security | Any domain |
| Performance | Performance | Any domain |
---
## Good Combinations
| Pair | Use Case |
|------|----------|
| Backend + Database | Data-heavy apps |
| Frontend + Accessibility | User-facing web |
| Cloud-Architect + DevOps | New infra |
| Backend + API-Integration | Service integrations |
| DevOps + SRE | Production ops |
| ML + Data-Engineer | ML pipelines |
| Security + ANY | Security review |
| QA + ANY | Test strategy |
| PRD-Analyst + ANY | Requirements |
---
## Loading
**Single:** `Core-Developer-Instructions.md + [Domain-Specialist].md`
**Multiple:** `Core-Developer-Instructions.md + [Primary].md + [Supporting].md`
**End of Specialist Relationships Guide**
