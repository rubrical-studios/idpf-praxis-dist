# IDPF-Testing-Core Framework
**Version:** v0.19.0
**Source:** IDPF-Testing-Core/IDPF-Testing-Core.md
**Framework-Debug:** True

---

## Overview
Foundation for all testing-focused development. Establishes common architecture, terminology, and workflows.
**Core Principle:** "Test automation is software development."

---

## Terminology
| Term | Definition |
|------|------------|
| Test Repository | Separate Git repo for test code |
| Test Plan | Lightweight document defining scope, referencing app PRD |
| AUT | Application Under Test |
| Test Infrastructure | Utilities, helpers, framework code |
| Coverage Mapping | Traceability from tests to requirements |

---

## Architecture
```
IDPF-Testing-Core
├── IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
├── IDPF-Performance (k6, JMeter, Gatling, Locust)
├── IDPF-Security (OWASP ZAP, Burp Suite, SAST/DAST)
├── IDPF-Accessibility (axe, Lighthouse, Pa11y)
├── IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
└── IDPF-Contract-Testing (Pact, Spring Cloud Contract)
```

---

## Embedded vs Separate Repository

### Embedded (Uses IDPF-Agile)
| Type | Location | Governance |
|------|----------|------------|
| TDD | App repo | IDPF-Agile |
| ATDD | App repo | IDPF-Agile + Specs |
| BDD | App repo | IDPF-Agile + Specs |

### Separate (Uses IDPF-Testing)
| Type | Framework | Rationale |
|------|-----------|-----------|
| QA Automation | IDPF-QA-Automation | Independent codebase |
| Performance | IDPF-Performance | Specialized tooling |
| Security | IDPF-Security | Vulnerability tracking |
| Chaos | IDPF-Chaos | Experiment definitions |
| Contract | IDPF-Contract-Testing | Cross-repo coordination |
| Accessibility | IDPF-Accessibility | Flexible (embedded or separate) |

---

## Test Development Methodology

Test repositories use IDPF-Agile for test development.

### TDD for Test Code
Applies to: Test utilities, Page objects, API clients, Test data generators, Framework infrastructure

---

## Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
| Phase | Activities |
|-------|------------|
| Plan | Create Test Plan, define scope, identify coverage |
| Design | Design architecture, select tools, define patterns |
| Develop | Write test code using TDD |
| Execute | Run tests (manual, CI/CD, scheduled) |
| Report | Analyze results, track metrics |

---

## Test Plan

Stored in `<test-repo>/PRD/TestPlans/`

**Must include:**
- Link to application repository
- Link to application PRD
- Requirement coverage mapping (REQ-IDs)
- Version of AUT

---

## Directory Structure
```
<test-repo>/
├── PRD/TestPlans/
├── src/tests/
├── src/pages/
├── src/utils/
├── reports/
├── .github/workflows/
└── README.md
```

---

## GitHub Labels
| Label | Description |
|-------|-------------|
| qa-automation | QA test development |
| performance | Performance tests |
| security | Security tests |
| accessibility | Accessibility tests |
| chaos | Chaos experiments |
| contract | Contract tests |
| test-plan | Planning/documentation |
| implementation | Test code development |

---

## Session Commands

### Planning
| Command | Description |
|---------|-------------|
| Test-Plan-Start | Begin test plan creation |
| Test-Plan-Review | Review existing plan |
| Coverage-Check | Verify requirement coverage |

### Development
| Command | Description |
|---------|-------------|
| Test-Dev-Start | Begin test development |
| Run-Tests | Execute suite |
| Generate-Report | Create results report |

Standard IDPF-Agile commands also apply.

---

## Framework Extensions
Each specialized framework extends Testing-Core with:
- Specialized Test Plan template
- Tool-specific configuration
- Domain terminology
- Framework-specific workflows

---

**End of Framework**
