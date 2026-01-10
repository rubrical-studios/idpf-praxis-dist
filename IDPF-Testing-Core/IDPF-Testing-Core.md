# IDPF-Testing-Core Framework
**Version:** v0.23.1
**Framework-Debug:** True

## Overview
Foundational framework for all testing-focused development. Establishes common architecture, terminology, workflows, and integration patterns for specialized testing frameworks.
**Core Principle:** "Test automation is software development. Same tools, skills, practices."

## Terminology
| Term | Definition |
|------|------------|
| **Test Repository** | Separate Git repo for test code |
| **Test Plan** | Lightweight doc defining test scope, references application PRD |
| **AUT** | Application Under Test |
| **Test Suite** | Collection of related test cases |
| **Coverage Mapping** | Traceability from tests to requirements |

## Framework Architecture
```
IDPF-Testing-Core
├── IDPF-QA-Automation      (Selenium, Playwright, Cypress, Appium)
├── IDPF-Performance        (k6, JMeter, Gatling, Locust)
├── IDPF-Security           (OWASP ZAP, Burp Suite, SAST/DAST)
├── IDPF-Accessibility      (axe, Lighthouse, Pa11y)
├── IDPF-Chaos              (Chaos Monkey, Gremlin, LitmusChaos)
└── IDPF-Contract-Testing   (Pact, Spring Cloud Contract)
```

## Repository Types
**Embedded (Uses IDPF-Agile):** TDD unit tests, ATDD acceptance tests, BDD behavior specs
**Separate (Uses IDPF-Testing):** QA Automation, Performance, Security, Chaos, Contract Testing
**Flexible:** Accessibility (embedded for CI axe-core OR separate for audits)

## Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
| Phase | Activities |
|-------|------------|
| PLAN | Create Test Plan, define scope, identify requirements coverage |
| DESIGN | Design test architecture, select tools, define patterns |
| DEVELOP | Write test code using TDD, build utilities, create test data |
| EXECUTE | Run tests (manual, CI/CD, scheduled) |
| REPORT | Analyze results, track metrics, report to stakeholders |

## Test Plan vs PRD
| Aspect | PRD (Application) | Test Plan (Testing) |
|--------|-------------------|---------------------|
| Purpose | Define what to build | Define what to test |
| Scope | Features, requirements | Test coverage, scenarios |
| Detail | Comprehensive | Lightweight, evolving |
| Traceability | Standalone | References application PRD |

**Location:** `<test-repo>/PRD/TestPlans/[TestPlanName].md`
**Required:** Link to app repo, PRD doc, requirement coverage mapping, AUT version

## Directory Structure
```
<test-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── src/tests/, src/pages/, src/utils/, src/config/
├── reports/
└── .github/workflows/
```

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `qa-automation` | `#FF991F` | QA automation |
| `performance` | `#0052CC` | Performance testing |
| `security` | `#FF5630` | Security testing |
| `accessibility` | `#36B37E` | Accessibility testing |
| `chaos` | `#6554C0` | Chaos engineering |
| `contract` | `#00B8D9` | Contract testing |
| `test-plan` | `#6B778C` | Test planning |
| `implementation` | `#36B37E` | Test code development |

## Session Commands
**Planning:** "Test-Plan-Start", "Test-Plan-Review", "Coverage-Check"
**Development:** "Test-Dev-Start", "Run-Tests", "Generate-Report"
**Standard:** All IDPF-Agile commands apply

## Integration Points
- **Extends:** IDPF-Agile (test code follows TDD methodology)
- **References:** Application PRD for traceability
- **Uses:** ATDD/BDD specs for test case design
- **Outputs:** Test results, coverage reports, metrics

**End of Framework**
