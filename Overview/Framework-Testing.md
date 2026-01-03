# Framework Testing Reference
**Version:** 0.17.0
**Source:** Overview/Framework-Testing.md
**Purpose:** Reference for IDPF testing frameworks

---

## Architecture
```
IDPF-Testing-Core (foundation)
├── IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
├── IDPF-Performance (k6, JMeter, Gatling, Locust)
├── IDPF-Security (OWASP ZAP, SAST/DAST, SCA)
├── IDPF-Accessibility (axe, Lighthouse, WCAG)
├── IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
└── IDPF-Contract-Testing (Pact, Spring Cloud Contract)
```

**Embedded vs Separate:**
- Embedded (app repo): TDD, ATDD, BDD
- Separate repo: QA Automation, Performance, Security, Chaos, Contract Testing
- Flexible: Accessibility

---

## IDPF-Testing-Core
**Workflow:** PLAN → DESIGN → DEVELOP → EXECUTE → REPORT

**Test Plans** replace PRDs for test repos. Location: `<test-repo>/PRD/TestPlans/`

**Commands:** Test-Plan-Start, Test-Plan-Review, Coverage-Check, Run-Tests, Generate-Report

---

## IDPF-QA-Automation
**Type:** UI & E2E Test Automation

| Test Type | Scope | Time |
|-----------|-------|------|
| Smoke | Critical paths | < 5 min |
| Regression | Full coverage | 30-60 min |
| E2E | User journeys | 15-45 min |

**Tools:**
- Web: Selenium, Playwright, Cypress, WebDriverIO
- Mobile: Appium, XCUITest, Espresso, Detox

**Pattern:** Page Object Model (one per page, encapsulates locators)

**Selector Priority:** data-testid > ID > Name > ARIA > CSS Class

---

## IDPF-Performance
**Test Types:**
| Type | Purpose | Duration |
|------|---------|----------|
| Load | Expected load | 15-60 min |
| Stress | Breaking point | Until failure |
| Soak | Memory leaks | 4-24 hours |
| Spike | Traffic bursts | 15-30 min |

**Tools:** k6 (JS), JMeter (Java), Gatling (Scala), Locust (Python)

**Key Metrics:** Response time p95 < 500ms, p99 < 1s, Error rate < 0.1%

---

## IDPF-Security
**Test Types:** SAST (source), SCA (dependencies), DAST (running app), IAST (runtime), Pentest (manual)

**OWASP Top 10 Coverage:**
| # | Vulnerability | Approach |
|---|---------------|----------|
| A01 | Broken Access Control | DAST, Manual |
| A02 | Cryptographic Failures | SAST |
| A03 | Injection | SAST, DAST |
| A06 | Vulnerable Components | SCA |

**Remediation SLA:** Critical 24h, High 7d, Medium 30d, Low 90d

**CI/CD Gates:** SAST (commit), Secret Scan (commit), SCA (PR), DAST (pre-deploy)

---

## IDPF-Accessibility
**Flexible:** Embedded OR Separate repository

**Test Types:**
| Type | Automation | Coverage |
|------|------------|----------|
| Automated Scans | Full | ~30-40% |
| Keyboard Testing | Partial | Focus management |
| Screen Reader | Manual | Content |

**WCAG Levels:** A (minimum), AA (standard/legal), AAA (enhanced)

**Tools:** axe-core, Lighthouse, Pa11y, NVDA, JAWS, VoiceOver

---

## IDPF-Chaos
**Principles:** Hypothesis → Real-world events → Production testing → Automate → Minimize blast radius

**Fault Types:**
| Category | Examples |
|----------|----------|
| Infrastructure | Instance termination, AZ failure |
| Network | Latency, packet loss |
| Application | Memory pressure, CPU stress |
| Dependency | Service unavailable |

**Tools:** Chaos Monkey, Gremlin, LitmusChaos, Chaos Mesh, Toxiproxy

---

## IDPF-Contract-Testing
**Flow:** Consumer → Generate Contract → Publish → Provider Verify → Can-I-Deploy → Deploy

**Concepts:**
- Consumer: Calls API
- Provider: Exposes API
- Contract: Request/response agreement
- Broker: Contract repository

**Tools:** Pact, Spring Cloud Contract, Specmatic

---

**End of Framework Testing Reference**
