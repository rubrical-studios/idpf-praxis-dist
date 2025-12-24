# Framework Testing Reference
**Version:** v0.2.0

---

## IDPF-Testing-Core Framework

**Location:** `IDPF-Testing-Core/IDPF-Testing-Core.md`
**Version:** v0.2.0
**Type:** Foundational Testing Framework

**Core Principle:** "Test automation is software development."

### Architecture

```
IDPF-Testing-Core (foundation)
    ├── IDPF-QA-Automation      (Selenium, Playwright, Cypress, Appium)
    ├── IDPF-Performance        (k6, JMeter, Gatling, Locust)
    ├── IDPF-Security           (OWASP ZAP, Burp Suite, SAST/DAST)
    ├── IDPF-Accessibility      (axe, Lighthouse, Pa11y)
    ├── IDPF-Chaos              (Chaos Monkey, Gremlin, LitmusChaos)
    └── IDPF-Contract-Testing   (Pact, Spring Cloud Contract)
```

### Embedded vs Separate Repository

| Testing Type | Framework | Rationale |
|--------------|-----------|-----------|
| TDD/ATDD/BDD | Embedded in app repo | Part of application development |
| QA Automation | IDPF-QA-Automation | Independent codebase |
| Performance | IDPF-Performance | Specialized tooling |
| Security | IDPF-Security | Compliance, vulnerability tracking |
| Chaos | IDPF-Chaos | Separate from deployment |
| Contract Testing | IDPF-Contract-Testing | Cross-repo coordination |
| Accessibility | IDPF-Accessibility | Flexible: Embedded OR Separate |

### Workflow: PLAN → DESIGN → DEVELOP → EXECUTE → REPORT

---

## IDPF-QA-Automation Framework

**Extends:** IDPF-Testing-Core
**Type:** UI & End-to-End Test Automation

### Test Types

| Type | Scope | Time |
|------|-------|------|
| Smoke | Critical paths | < 5 min |
| Regression | Full coverage | 30-60 min |
| E2E | User journeys | 15-45 min |

### Tool Ecosystem

**Web:** Selenium, Playwright, Cypress, WebDriverIO
**Mobile:** Appium, XCUITest, Espresso, Detox

### Selector Priority
1. data-testid → 2. ID → 3. Name → 4. ARIA → 5. CSS Class

---

## IDPF-Performance Framework

**Extends:** IDPF-Testing-Core
**Type:** Performance Testing

### Test Types

| Type | Purpose | Load Pattern |
|------|---------|--------------|
| Load | Expected load | Steady state |
| Stress | Breaking point | Ramping up |
| Endurance | Memory leaks | 4-24 hours |
| Spike | Traffic bursts | Sudden spikes |

### Tools
k6 (JS), JMeter (Java), Gatling (Scala), Locust (Python)

### Key Metrics
- Response Time p95 < 500ms, p99 < 1000ms
- Error Rate < 0.1%
- Apdex > 0.9

---

## IDPF-Security Framework

**Extends:** IDPF-Testing-Core
**Type:** Security Testing

### Testing Types

| Type | When | Tools |
|------|------|-------|
| SAST | Dev/CI | SonarQube, Semgrep, CodeQL |
| SCA | Dev/CI | Snyk, Dependabot |
| DAST | Staging | OWASP ZAP, Burp Suite |
| Secret Scan | Dev/CI | GitLeaks, TruffleHog |

### OWASP Top 10 Coverage
A01-A10: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Misconfiguration, Vulnerable Components, Auth Failures, Data Integrity, Logging Failures, SSRF

### Vulnerability SLAs
Critical (9.0-10.0): 24h | High (7.0-8.9): 7d | Medium (4.0-6.9): 30d | Low: 90d

---

## IDPF-Accessibility Framework

**Extends:** IDPF-Testing-Core
**Type:** Accessibility Testing (Flexible: Embedded OR Separate)

### Testing Types

| Type | Automation | Coverage |
|------|------------|----------|
| Automated Scans | Full | ~30-40% |
| Keyboard | Partial | Focus management |
| Screen Reader | Manual | Content |

### WCAG Levels
- A: Minimum (must meet)
- AA: Standard (legal requirement)
- AAA: Enhanced (aspirational)

**Target:** WCAG 2.1 Level AA

### Tools
**Automated:** axe-core, Lighthouse, Pa11y
**Assistive:** NVDA (Windows), JAWS, VoiceOver (macOS/iOS), TalkBack (Android)

---

## IDPF-Chaos Framework

**Extends:** IDPF-Testing-Core
**Type:** Chaos Engineering

### Fault Injection Types

| Category | Examples |
|----------|----------|
| Infrastructure | Instance termination, AZ failure |
| Network | Latency, packet loss, DNS failure |
| Application | Memory pressure, CPU stress |
| Dependency | Service unavailable |
| State | Database failure, cache eviction |

### Tools
Chaos Monkey (AWS), Gremlin (Enterprise), LitmusChaos (K8s), Chaos Mesh (K8s), Toxiproxy (Network)

### Workflow
Hypothesis → Observability → Design → Approval → Execute → Analyze → Fix

---

## IDPF-Contract-Testing Framework

**Extends:** IDPF-Testing-Core
**Type:** API Contract Testing

### Flow
```
Consumer → Generate Contract → Broker → Provider Verifies → Can-I-Deploy → Deploy
```

### Tools
Pact (multi-lang), Spring Cloud Contract (Java), Specmatic (OpenAPI)

### Key Concepts
- Consumer: Service calling API
- Provider: Service exposing API
- Contract: Request/response agreement
- Broker: Central repository
- Can-I-Deploy: Safety check

---

**End of Framework Testing Reference**
