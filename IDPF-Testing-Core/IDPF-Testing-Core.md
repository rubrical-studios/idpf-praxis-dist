# IDPF-Testing-Core Framework
**Version:** v0.22.0
**Source:** IDPF-Testing-Core/IDPF-Testing-Core.md

---

## Overview
Foundational framework for testing-focused development. Establishes common architecture, terminology, workflows, and integration patterns for specialized testing frameworks.
**Core Principle:** Test automation is software development. Same tools, skills, and practices.

---

## Terminology
| Term | Definition |
|------|------------|
| **Test Repository** | Separate Git repo with test code |
| **Test Plan** | Lightweight doc defining scope, referencing PRD |
| **Application Under Test (AUT)** | Application being tested |
| **Test Framework** | IDPF framework governing testing |
| **Test Suite** | Collection of related test cases |
| **Test Infrastructure** | Utilities, helpers, framework code |
| **Coverage Mapping** | Traceability from tests to requirements |

---

## Testing Framework Architecture
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

### Embedded (NOT IDPF-Testing)
| Testing Type | Location | Governance |
|--------------|----------|------------|
| TDD (unit) | Application repo | IDPF-Agile |
| ATDD (acceptance) | Application repo | IDPF-Agile + PRD |
| BDD (behavior) | Application repo | IDPF-Agile + PRD |

### Separate (Uses IDPF-Testing)
| Testing Type | Framework | Rationale |
|--------------|-----------|-----------|
| QA Automation | IDPF-QA-Automation | Independent codebase |
| Performance | IDPF-Performance | Specialized tooling |
| Security | IDPF-Security | Scans, vulnerability tracking |
| Chaos | IDPF-Chaos | Experiment definitions |
| Contract Testing | IDPF-Contract-Testing | Cross-repo coordination |

### Flexible
| Testing Type | Framework | Options |
|--------------|-----------|---------|
| Accessibility | IDPF-Accessibility | Embedded (axe-core CI) OR Separate (audit docs) |

---

## Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
| Phase | Activities |
|-------|------------|
| **PLAN** | Create Test Plan, define scope, identify requirements coverage |
| **DESIGN** | Design architecture, select tools, define patterns |
| **DEVELOP** | Write test code (TDD), build utilities, create test data |
| **EXECUTE** | Run tests (manual, CI/CD, scheduled) |
| **REPORT** | Analyze results, track metrics, report to stakeholders |

---

## Test Plan Document
Test Plans replace PRDs for test repositories. Lightweight, reference application PRD.

| Aspect | PRD (Application) | Test Plan (Testing) |
|--------|-------------------|---------------------|
| Purpose | Define what to build | Define what to test |
| Scope | Features, requirements | Test coverage, scenarios |
| Detail | Comprehensive | Lightweight, evolving |
| Traceability | Standalone | References application PRD |

**Location:** `<test-repo>/PRD/TestPlans/[TestPlanName].md`

**Required:**
- Link to application repository
- Link to application PRD
- Requirement coverage mapping (REQ-IDs)
- Version/release of AUT

---

## Directory Structure
```
<test-repo-root>/
├── PRD/
│   ├── Templates/
│   │   └── [Testing-Type]-Test-Plan.md
│   └── TestPlans/
├── src/
│   ├── tests/
│   ├── pages/        # Page objects (QA)
│   ├── utils/
│   └── config/
├── reports/
├── .github/workflows/
└── README.md
```

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `qa-automation` | `#FF991F` | QA automation |
| `performance` | `#0052CC` | Performance testing |
| `security` | `#FF5630` | Security testing |
| `accessibility` | `#36B37E` | Accessibility testing |
| `chaos` | `#6554C0` | Chaos engineering |
| `contract` | `#00B8D9` | Contract testing |
| `test-plan` | `#6B778C` | Test planning |
| `implementation` | `#36B37E` | Test code development |
| `bug` | `#FF5630` | Test framework issues |
| `enhancement` | `#6554C0` | Framework improvements |

---

## Session Commands
**Planning:** Test-Plan-Start | Test-Plan-Review | Coverage-Check
**Development:** Test-Dev-Start | Run-Tests | Generate-Report
**Standard:** All IDPF-Agile commands apply

---

## Integration Points
- **Extends:** IDPF-Agile (test code follows TDD)
- **References:** Application PRD for traceability
- **Uses:** ATDD/BDD specs from application
- **Outputs:** Test results, coverage reports, metrics

---

**End of Framework**
