---
version: "v0.32.1"
description: Change domain specialist for this project
argument-hint: [specialist-name] (optional)
---
# /change-domain-expert
Change the active domain specialist for this project.
## Available Base Experts
| # | Specialist | Focus Area |
|---|------------|------------|
| 1 | Full-Stack-Developer | End-to-end web development |
| 2 | Backend-Specialist | Server-side systems and APIs |
| 3 | Frontend-Specialist | UI/UX and client-side development |
| 4 | Mobile-Specialist | iOS, Android, cross-platform apps |
| 5 | Desktop-Application-Developer | Native desktop applications |
| 6 | Embedded-Systems-Engineer | Hardware-software integration |
| 7 | Game-Developer | Game engines and graphics |
| 8 | ML-Engineer | Machine learning and AI systems |
| 9 | Data-Engineer | Data pipelines and warehousing |
| 10 | Cloud-Solutions-Architect | Cloud infrastructure design |
| 11 | SRE-Specialist | Reliability and operations |
| 12 | Systems-Programmer-Specialist | Low-level systems programming |
## Workflow
1. Read `framework-config.json` for current specialist
2. If no argument, present list for selection
3. Validate selection (must be one of 12 Base Experts)
4. Update `framework-config.json`
5. Update `CLAUDE.md` domain specialist line
6. Update `.claude/rules/03-startup.md`
7. Load new specialist file
8. Report completion
---
**End of Change Domain Expert**
