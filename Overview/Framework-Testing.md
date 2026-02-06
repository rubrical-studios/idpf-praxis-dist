# Framework Testing Reference
**Version:** v0.37.2
**Purpose:** Reference for IDPF testing frameworks
## IDPF-Testing-Core Framework
**Location:** `IDPF-Testing-Core/` | **Type:** Foundational Testing Framework
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
**Embedded (No IDPF-Testing):** TDD, ATDD, BDD - Application repo with IDPF-Agile
**Separate (Uses IDPF-Testing):**
| Type | Framework | Rationale |
|------|-----------|-----------|
| QA Automation | IDPF-QA-Automation | Independent codebase |
| Performance | IDPF-Performance | Specialized tooling |
| Security | IDPF-Security | Vulnerability tracking, compliance |
| Chaos | IDPF-Chaos | Experiment definitions |
| Contract Testing | IDPF-Contract-Testing | Cross-repo coordination |
| Accessibility | IDPF-Accessibility | Flexible: Embedded OR Separate |
### Workflow Phases
```
PLAN → DESIGN → DEVELOP → EXECUTE → REPORT
```
### Test Plan Document
**Location:** `<test-repo>/PRD/TestPlans/`
**Required:** Link to app repo, link to app PRD, REQ-ID coverage mapping, version under test
## IDPF-QA-Automation
**Extends:** IDPF-Testing-Core | **Type:** UI & E2E Test Automation
### Test Types
| Type | Scope | Time |
|------|-------|------|
| Smoke | Critical paths | < 5 min |
| Regression | Full coverage | 30-60 min |
| Cross-Browser | Compatibility | Varies |
| E2E | Full journeys | 15-45 min |
### Tools
**Web:** Selenium, Playwright, Cypress, WebDriverIO
**Mobile:** Appium, XCUITest, Espresso, Detox
### Page Object Model
- One page object per page/screen
- Encapsulates locators
- Tests don't access locators directly
### Selector Priority
1. data-testid, 2. ID, 3. Name, 4. ARIA, 5. CSS Class
## IDPF-Performance
**Extends:** IDPF-Testing-Core | **Type:** Performance Testing
### Test Types
| Type | Purpose | Duration |
|------|---------|----------|
| Load | Expected load | 15-60 min |
| Stress | Breaking point | Until failure |
| Endurance | Memory leaks | 4-24 hours |
| Spike | Traffic bursts | 15-30 min |
| Capacity | Max throughput | Varies |
### Tools
| Tool | Best For |
|------|----------|
| k6 | Modern APIs, CI/CD |
| JMeter | Enterprise, GUI |
| Gatling | High throughput |
| Locust | Python teams |
### Key Metrics
| Metric | Good Value |
|--------|------------|
| p95 Response | < 500ms |
| p99 Response | < 1000ms |
| Error Rate | < 0.1% |
| Apdex | > 0.9 |
## IDPF-Security
**Extends:** IDPF-Testing-Core | **Type:** Security Testing
### Testing Types
| Type | When | Tools |
|------|------|-------|
| SAST | Dev/CI | SonarQube, Semgrep, CodeQL |
| SCA | Dev/CI | Snyk, Dependabot |
| DAST | Staging | OWASP ZAP, Burp Suite |
| Penetration | Pre-release | Manual + tools |
| Secret Scan | Dev/CI | GitLeaks, TruffleHog |
### OWASP Top 10 Coverage
A01: Broken Access Control, A02: Cryptographic Failures, A03: Injection, A04: Insecure Design, A05: Security Misconfiguration, A06: Vulnerable Components, A07: Auth Failures, A08: Data Integrity Failures, A09: Logging Failures, A10: SSRF
### Vulnerability SLA
| Severity | CVSS | SLA |
|----------|------|-----|
| Critical | 9.0-10.0 | 24 hours |
| High | 7.0-8.9 | 7 days |
| Medium | 4.0-6.9 | 30 days |
| Low | 0.1-3.9 | 90 days |
## IDPF-Accessibility
**Extends:** IDPF-Testing-Core | **Type:** Accessibility Testing
### Repository Type: Flexible
- **Embedded:** Automated a11y in CI (`tests/a11y/`)
- **Separate:** Comprehensive audits, manual testing
### Testing Types
| Type | Automation | Coverage |
|------|------------|----------|
| Automated Scans | Full | ~30-40% |
| Keyboard Testing | Partial | Focus management |
| Screen Reader | Manual | Content |
| Color Contrast | Full | Visual design |
### WCAG Levels
| Level | Requirement |
|-------|-------------|
| A | Must meet |
| AA | Legal requirement |
| AAA | Aspirational |
**Target:** WCAG 2.1 Level AA
### Tools
**Scanning:** axe-core, Lighthouse, Pa11y, WAVE
**Assistive:** NVDA, JAWS, VoiceOver, TalkBack
## IDPF-Chaos
**Extends:** IDPF-Testing-Core | **Type:** Chaos Engineering
**Core Principle:** Proactively test resilience by introducing controlled failures.
### Fault Injection Types
| Category | Faults | Tools |
|----------|--------|-------|
| Infrastructure | Instance termination, AZ failure | Chaos Monkey, Gremlin, AWS FIS |
| Network | Latency, packet loss | tc, Toxiproxy |
| Application | Memory pressure, CPU stress | stress-ng, Gremlin |
| Dependency | Service unavailable | Toxiproxy, Gremlin |
### Workflow
```
Hypothesis → Observability → Design → Approval → Execute → Analyze → Fix
```
## IDPF-Contract-Testing
**Extends:** IDPF-Testing-Core | **Type:** API Contract Testing
### Flow
```
Consumer → Generate Contract → Publish to Broker → Provider Fetches → Verify → Can-I-Deploy → Deploy
```
### Tools
| Tool | Best For |
|------|----------|
| Pact | Most scenarios, mature broker |
| Spring Cloud Contract | Spring ecosystem |
| Specmatic | OpenAPI-based |
### Key Concepts
Consumer, Provider, Contract, Broker, Can-I-Deploy, Provider State
---
**End of Framework Testing Reference**
