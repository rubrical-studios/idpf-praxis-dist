# IDPF-Testing-Core Framework
**Version:** v0.36.3
## Overview
Foundational framework for all testing-focused development. Establishes common architecture, terminology, workflows, and integration patterns.
**Core Principle:** "Test automation is software development. Same tools, skills, practices."
## Terminology
| Term | Definition |
|------|------------|
| **Test Repository** | Separate Git repo for test code |
| **Test Plan** | Lightweight doc referencing application PRD |
| **AUT** | Application Under Test |
| **Coverage Mapping** | Traceability from tests to requirements |
## Testing Framework Architecture
```
IDPF-Testing-Core
├── IDPF-QA-Automation (Selenium, Playwright, Cypress)
├── IDPF-Performance (k6, JMeter, Gatling)
├── IDPF-Security (OWASP ZAP, SAST/DAST)
├── IDPF-Accessibility (axe, Lighthouse)
├── IDPF-Chaos (Chaos Monkey, Gremlin)
└── IDPF-Contract-Testing (Pact)
```
## Embedded vs Separate Repository
### Embedded (Uses IDPF-Agile, NOT IDPF-Testing)
| Type | Location |
|------|----------|
| TDD (unit tests) | Application repo |
| ATDD/BDD | Application repo |
### Separate (Uses IDPF-Testing)
| Type | Framework |
|------|-----------|
| QA Automation | IDPF-QA-Automation |
| Performance | IDPF-Performance |
| Security | IDPF-Security |
| Chaos | IDPF-Chaos |
| Contract | IDPF-Contract-Testing |
### Flexible
| Type | Options |
|------|---------|
| Accessibility | Embedded OR Separate |
## Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
| Phase | Activities |
|-------|------------|
| PLAN | Create Test Plan, define scope |
| DESIGN | Design architecture, select tools |
| DEVELOP | Write test code with TDD |
| EXECUTE | Run tests (CI/CD, scheduled) |
| REPORT | Analyze results, track metrics |
## Test Plan vs PRD
| Aspect | PRD | Test Plan |
|--------|-----|-----------|
| Purpose | Define what to build | Define what to test |
| Detail | Comprehensive | Lightweight |
| Traceability | Standalone | References application PRD |
## GitHub Project Labels
| Label | Description |
|-------|-------------|
| `qa-automation` | QA automation work |
| `performance` | Performance testing |
| `security` | Security testing |
| `accessibility` | Accessibility testing |
| `chaos` | Chaos engineering |
| `contract` | Contract testing |
| `test-plan` | Test planning |
## Session Commands
### Planning
- **Test-Plan-Start** - Begin test plan
- **Test-Plan-Review** - Review test plan
- **Coverage-Check** - Verify requirement coverage
### Development
- **Test-Dev-Start** - Begin test development
- **Run-Tests** - Execute test suite
- **Generate-Report** - Create results report
## Integration Points
- **Extends:** IDPF-Agile (TDD methodology)
- **References:** Application PRD for traceability
- **Uses:** ATDD/BDD specs for test design
---
**End of Framework**
