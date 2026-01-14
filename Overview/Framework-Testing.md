# Framework Testing Reference
**Version:** v0.25.0
**Purpose:** IDPF testing frameworks reference
---
## IDPF-Testing-Core Framework
**Location:** `IDPF-Testing-Core/IDPF-Testing-Core.md`
**Type:** Foundational Testing Framework
### Purpose
Common architecture, terminology, workflows for testing efforts. Foundation that specialized frameworks extend.
**Principle:** "Test automation is software development. Same tools, skills, practices."
### Architecture
```
IDPF-Testing-Core (foundation)
    ├── IDPF-QA-Automation (Selenium, Playwright, Cypress, Appium)
    ├── IDPF-Performance (k6, JMeter, Gatling, Locust)
    ├── IDPF-Security (OWASP ZAP, Burp, SAST/DAST)
    ├── IDPF-Accessibility (axe, Lighthouse, Pa11y)
    ├── IDPF-Chaos (Chaos Monkey, Gremlin, LitmusChaos)
    └── IDPF-Contract-Testing (Pact, Spring Cloud Contract)
```
### Embedded vs Separate
**Embedded (No IDPF-Testing):** TDD, ATDD, BDD in application repo with IDPF-Agile
**Separate (Uses IDPF-Testing):**
| Type | Framework | Rationale |
|------|-----------|-----------|
| QA Automation | IDPF-QA-Automation | Independent codebase |
| Performance | IDPF-Performance | Specialized tooling |
| Security | IDPF-Security | Compliance tracking |
| Chaos | IDPF-Chaos | Separate from deployment |
| Contract Testing | IDPF-Contract-Testing | Cross-repo coordination |
| Accessibility | IDPF-Accessibility | Flexible: Embedded OR Separate |
### Workflow
```
PLAN -> DESIGN -> DEVELOP -> EXECUTE -> REPORT
```
### Test Plan
**Location:** `<test-repo>/PRD/TestPlans/`
**Required:** Link to app repo, link to app PRD, requirement coverage mapping, version under test
---
## IDPF-QA-Automation
**Extends:** Testing-Core | **Type:** UI & E2E Automation
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
### Architecture
**Page Object Model:** One page object per page, encapsulates locators, exposes actions
### Selector Priority
1. data-testid, 2. ID, 3. Name, 4. ARIA, 5. CSS Class
---
## IDPF-Performance
**Extends:** Testing-Core | **Type:** Performance Testing
### Test Types
| Type | Purpose | Duration |
|------|---------|----------|
| Load | Expected load | 15-60 min |
| Stress | Breaking point | Until failure |
| Endurance | Memory leaks | 4-24 hours |
| Spike | Traffic bursts | 15-30 min |
| Capacity | Max throughput | Varies |
### Tools
| Tool | Language | Best For |
|------|----------|----------|
| k6 | JavaScript | Modern APIs, CI/CD |
| JMeter | Java/XML | Enterprise, GUI |
| Gatling | Scala/Java | High throughput |
| Locust | Python | Python teams |
### Key Metrics
| Metric | Good Value |
|--------|------------|
| Response Time (p95) | < 500ms |
| Response Time (p99) | < 1000ms |
| Error Rate | < 0.1% |
| Apdex | > 0.9 |
---
## IDPF-Security
**Extends:** Testing-Core | **Type:** Security Testing
### Test Types
| Type | When | Tools |
|------|------|-------|
| SAST | Dev/CI | SonarQube, Semgrep, CodeQL |
| SCA | Dev/CI | Snyk, Dependabot |
| DAST | Staging | OWASP ZAP, Burp Suite |
| Secret Scanning | Dev/CI | GitLeaks, TruffleHog |
### OWASP Top 10
A01 Broken Access Control, A02 Crypto Failures, A03 Injection, A04 Insecure Design, A05 Misconfiguration, A06 Vulnerable Components, A07 Auth Failures, A08 Data Integrity, A09 Logging Failures, A10 SSRF
### Vulnerability SLAs
| Severity | CVSS | SLA |
|----------|------|-----|
| Critical | 9.0-10.0 | 24 hours |
| High | 7.0-8.9 | 7 days |
| Medium | 4.0-6.9 | 30 days |
| Low | 0.1-3.9 | 90 days |
---
## IDPF-Accessibility
**Extends:** Testing-Core | **Type:** Accessibility Testing
**Repository:** Flexible (Embedded or Separate)
### Test Types
| Type | Automation | Coverage |
|------|------------|----------|
| Automated Scans | Full | 30-40% |
| Keyboard | Partial | Focus management |
| Screen Reader | Manual | Content |
| Color Contrast | Full | Visual |
### WCAG Levels
| Level | Requirement |
|-------|-------------|
| A | Must meet |
| AA | Typically required (legal) |
| AAA | Aspirational |
**Recommendation:** Target WCAG 2.1 Level AA
### Tools
**Automated:** axe-core, Lighthouse, Pa11y, WAVE
**Screen Readers:** NVDA, JAWS, VoiceOver, TalkBack
---
## IDPF-Chaos
**Extends:** Testing-Core | **Type:** Chaos Engineering
**Principle:** Proactively test resilience by introducing controlled failures.
### Fault Types
| Category | Examples |
|----------|----------|
| Infrastructure | Instance termination, AZ failure |
| Network | Latency, packet loss, DNS failure |
| Application | Memory pressure, CPU stress |
| Dependency | Service unavailable |
### Tools
| Tool | Platform |
|------|----------|
| Chaos Monkey | AWS |
| Gremlin | Multi-cloud, K8s |
| LitmusChaos | Kubernetes |
| Chaos Mesh | Kubernetes |
| AWS FIS | AWS |
| Toxiproxy | Any |
### Workflow
```
Hypothesis -> Observability -> Design -> Approval -> Execute -> Analyze -> Fix
```
---
## IDPF-Contract-Testing
**Extends:** Testing-Core | **Type:** API Contract Testing
### Flow
```
Consumer -> Generate Contract -> Publish to Broker -> Provider Verifies -> Can-I-Deploy -> Deploy
```
### Tools
| Tool | Best For |
|------|----------|
| Pact | Multi-language, mature broker |
| Spring Cloud Contract | Spring ecosystem |
| Specmatic | OpenAPI-based |
### Concepts
- **Consumer:** Service calling API
- **Provider:** Service exposing API
- **Contract:** Request/response agreement
- **Broker:** Central contract repository
- **Can-I-Deploy:** Deployment safety check
---
**End of Framework Testing Reference**
