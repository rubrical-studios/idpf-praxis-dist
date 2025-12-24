# Testing Framework Selection Guide
**Version:** v0.15.0

**Purpose:** Help teams select the appropriate IDPF testing framework and development methodology.

---

## Overview

This guide helps you determine:
1. Whether to use embedded testing or a separate test repository
2. Which IDPF testing framework to use
3. Whether to use IDPF-Structured or IDPF-Agile for test development

---

## Decision 1: Embedded vs Separate Repository

### Use Embedded Testing (No Separate Repo)

**When your testing is:**
- Unit tests (TDD)
- Acceptance tests (ATDD)
- Behavior tests (BDD)
- Tightly coupled with application code
- Part of the same release cycle as the application

**Governance:** Use IDPF-Structured or IDPF-Agile for the application repository. Tests are developed alongside application code.

### Use Separate Test Repository

**When your testing is:**
- UI/E2E automation requiring page objects and utilities
- Performance testing with specialized tools
- Security testing with scan configurations
- Chaos engineering experiments
- Contract testing between services
- Has a different release cycle than the application
- Requires specialized infrastructure
- Managed by a separate team

**Governance:** Use an IDPF-Testing framework with its own GitHub Project.

---

## Decision 2: Which Testing Framework?

```
What type of testing are you doing?
│
├─ UI/E2E Automation (Selenium, Playwright, Cypress, Appium)
│   └─► IDPF-QA-Automation
│
├─ Performance/Load Testing (k6, JMeter, Gatling, Locust)
│   └─► IDPF-Performance
│
├─ Security Testing (OWASP ZAP, Burp Suite, SAST/DAST)
│   └─► IDPF-Security
│
├─ Accessibility Testing (axe, Lighthouse, Pa11y)
│   └─► IDPF-Accessibility (Embedded OR Separate)
│
├─ Chaos Engineering (Chaos Monkey, Gremlin, LitmusChaos)
│   └─► IDPF-Chaos
│
└─ API Contract Testing (Pact, Spring Cloud Contract)
    └─► IDPF-Contract-Testing
```

### Framework Quick Reference

| Testing Need | Framework | Repo Type |
|--------------|-----------|-----------|
| Web UI testing | IDPF-QA-Automation | Separate |
| Mobile app testing | IDPF-QA-Automation | Separate |
| Load testing | IDPF-Performance | Separate |
| Stress testing | IDPF-Performance | Separate |
| Security scans | IDPF-Security | Separate |
| Penetration testing | IDPF-Security | Separate |
| WCAG compliance | IDPF-Accessibility | Flexible |
| Resilience testing | IDPF-Chaos | Separate |
| Consumer contracts | IDPF-Contract-Testing | Separate |
| Provider contracts | IDPF-Contract-Testing | Separate |

---

## Decision 3: IDPF-Structured vs IDPF-Agile for Test Development

### Use IDPF-Structured When:

| Factor | Indicator |
|--------|-----------|
| Test scope | Fixed, well-defined test cases |
| Team size | Solo tester or small team (1-3) |
| Application state | Stable, mature application |
| Test suite | Smaller, focused regression suite |
| Delivery | Milestone-based releases |
| Stakeholders | Minimal involvement after initial planning |

**Best for:**
- Regression test suites for stable applications
- Compliance testing with fixed requirements
- Performance baselines with specific targets
- Security scan configurations that rarely change

### Use IDPF-Agile When:

| Factor | Indicator |
|--------|-----------|
| Test scope | Evolving, growing test coverage |
| Team size | Larger team (4+) with sprint planning |
| Application state | Active development, frequent changes |
| Test suite | Large, continuously expanding |
| Delivery | Sprint-based, iterative |
| Stakeholders | Regular reviews and feedback |

**Best for:**
- Test automation for actively developed applications
- Growing test frameworks with new features
- Performance testing with evolving scenarios
- Security testing with ongoing vulnerability assessment

---

## Decision Tree

```
Start
│
├─ Is this TDD/ATDD/BDD for application development?
│   │
│   └─ YES ──► Use EMBEDDED testing in application repo
│              (IDPF-Structured or IDPF-Agile for the app)
│
└─ NO (Separate testing effort)
    │
    ├─ What type of testing? ──► Select IDPF-Testing-* framework
    │
    └─ How is test development managed?
        │
        ├─ Fixed scope, small team, stable app
        │   └─► IDPF-Structured for test development
        │
        └─ Evolving scope, larger team, active development
            └─► IDPF-Agile for test development
```

---

## Examples

### Example 1: E-commerce Regression Suite

**Scenario:** Building automated regression tests for a stable e-commerce platform.

**Decision:**
- Separate repository (complex page objects, utilities)
- Framework: IDPF-QA-Automation
- Methodology: IDPF-Structured (stable app, defined test cases)

### Example 2: API Performance Testing

**Scenario:** Performance testing a microservices architecture with evolving endpoints.

**Decision:**
- Separate repository (specialized k6 scripts, infrastructure)
- Framework: IDPF-Performance
- Methodology: IDPF-Agile (endpoints change frequently)

### Example 3: Accessibility Compliance

**Scenario:** Ensuring WCAG 2.1 AA compliance for a government website.

**Decision:**
- Flexible - could be embedded (axe-core in CI) or separate (full audit docs)
- Framework: IDPF-Accessibility
- Methodology: IDPF-Structured (fixed WCAG requirements)

### Example 4: Security Testing for Healthcare App

**Scenario:** HIPAA compliance security testing for a healthcare application.

**Decision:**
- Separate repository (scan configs, vulnerability tracking)
- Framework: IDPF-Security
- Methodology: IDPF-Structured (compliance requirements fixed)

### Example 5: Contract Testing for Microservices

**Scenario:** Consumer-driven contracts between 5 microservices.

**Decision:**
- Separate repository (shared between teams)
- Framework: IDPF-Contract-Testing
- Methodology: IDPF-Agile (contracts evolve with services)

---

## Checklist

Before starting a testing project:

- [ ] Determined embedded vs separate repository
- [ ] Selected appropriate IDPF-Testing framework
- [ ] Chose IDPF-Structured or IDPF-Agile methodology
- [ ] Created test repository (if separate)
- [ ] Set up GitHub Project with appropriate labels
- [ ] Created Test Plan from framework template
- [ ] Established traceability to application PRD

---

*Guide from IDPF-Testing-Core Framework*
