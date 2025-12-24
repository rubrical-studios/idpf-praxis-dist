# IDPF-Testing-Core Framework

**Version:** v0.15.0

---

## Core Principle
"Test automation is software development. Same tools, skills, and practices."

## Architecture
```
IDPF-Testing-Core (foundation)
    ├── IDPF-QA-Automation      (Selenium, Playwright, Cypress, Appium)
    ├── IDPF-Performance        (k6, JMeter, Gatling, Locust)
    ├── IDPF-Security           (OWASP ZAP, Burp Suite, SAST/DAST)
    ├── IDPF-Accessibility      (axe, Lighthouse, Pa11y)
    ├── IDPF-Chaos              (Chaos Monkey, Gremlin, LitmusChaos)
    └── IDPF-Contract-Testing   (Pact, Spring Cloud Contract)
```

## Embedded vs Separate Repository

**Embedded (in app repo, NOT Testing frameworks):**
| Type | Governance |
|------|------------|
| TDD (unit) | IDPF-Structured/Agile |
| ATDD (acceptance) | IDPF-Structured/Agile |
| BDD (behavior) | IDPF-Structured/Agile |

**Separate Repository (uses IDPF-Testing):**
| Type | Framework |
|------|-----------|
| QA Automation | IDPF-QA-Automation |
| Performance | IDPF-Performance |
| Security | IDPF-Security |
| Chaos | IDPF-Chaos |
| Contract | IDPF-Contract-Testing |

**Flexible:** Accessibility (embedded OR separate)

## Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```

## Test Development Methodology
Use IDPF-Structured (fixed scope) or IDPF-Agile (evolving scope) for test code development. TDD applies to test utilities, page objects, API clients, data generators.

## Test Plan vs PRD
| Aspect | PRD (App) | Test Plan |
|--------|-----------|-----------|
| Purpose | What to build | What to test |
| Detail | Comprehensive | Lightweight |
| Traceability | Standalone | References app PRD |

## Directory Structure
```
<test-repo>/
├── PRD/TestPlans/          # Test plans
├── src/tests/              # Test code
├── src/pages/              # Page objects
├── src/utils/              # Helpers
├── reports/                # Results
└── .github/workflows/      # CI/CD
```

## Commands
- `Test-Plan-Start` - Begin test plan
- `Test-Plan-Review` - Review plan
- `Coverage-Check` - Verify requirement coverage
- `Test-Dev-Start` - Begin test development
- `Run-Tests` - Execute suite
- `Generate-Report` - Create report

---

**End of Framework**
