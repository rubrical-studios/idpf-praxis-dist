# IDPF-QA-Automation Framework
**Version:** 0.19.0
**Source:** IDPF-QA-Automation/IDPF-QA-Automation.md
**Extends:** IDPF-Testing-Core
**Framework-Debug:** True

---

## Overview
Framework for developing automated UI and E2E test suites using Selenium, Playwright, Cypress, Appium.
**Core Principle:** QA Automation tests validate user-facing behavior through browser/mobile automation.

---

## Terminology
| Term | Definition |
|------|------------|
| Page Object | Class encapsulating page elements and actions |
| Component Object | Reusable UI component abstraction |
| Smoke Suite | Critical path tests after deployment |
| Regression Suite | Full feature coverage tests |
| Flaky Test | Test with inconsistent results |

---

## Test Types
| Type | Execution Time | Trigger |
|------|----------------|---------|
| Smoke | < 5 min | Every deployment |
| Regression | 30-60 min | PR merge, nightly |
| Cross-Browser | Varies | Weekly, release |
| Mobile | Varies | PR merge, nightly |
| Visual | 10-30 min | PR, release |
| E2E | 15-45 min | Nightly, release |

---

## Tool Ecosystem

### Web Automation
| Tool | Best For | Strengths |
|------|----------|-----------|
| Selenium | Enterprise | Mature, wide browser support |
| Playwright | Modern apps | Auto-wait, traces |
| Cypress | JS apps | Fast, time-travel debugging |

### Mobile Automation
| Tool | Platform | Strengths |
|------|----------|-----------|
| Appium | iOS, Android | Single API both platforms |
| XCUITest | iOS | Apple-supported |
| Espresso | Android | Google-supported |

### Cloud Providers
BrowserStack, Sauce Labs, LambdaTest, AWS Device Farm

---

## Page Object Model
```
src/
├── pages/          # Page Objects
├── components/     # Reusable components
├── tests/smoke/regression/e2e/
├── fixtures/       # Test data
├── utils/          # Helpers
└── config/         # Environment configs
```

**Principles:**
- One page object per page
- Encapsulate locators (private)
- Expose meaningful actions (public)
- No assertions in page objects

---

## Selector Strategy
| Priority | Type | Reliability |
|----------|------|-------------|
| 1 | data-testid | Highest |
| 2 | ID | High |
| 3 | Name | High |
| 4 | ARIA | Medium-High |
| 5 | CSS Class | Medium |
| 6 | Text content | Low |
| 7 | XPath | Lowest |

**Best Practices:** Request data-testid, avoid indexes, avoid styling-based selectors

---

## Wait Strategies
| Strategy | Use Case |
|----------|----------|
| Explicit Wait | Specific conditions |
| Auto-Wait | Framework handles (Playwright) |
| Custom Wait | Complex conditions |

**Never:** Use hard-coded `sleep()` delays

---

## Test Data Management
| Approach | Use Case |
|----------|----------|
| Fixtures | Static reference data |
| Factories | Dynamic user-specific data |
| API Seeding | Pre-test setup |

---

## CI/CD Integration
**Smoke:** On deployment
**Regression:** On PR merge, matrix browsers
**Nightly:** Scheduled full suite

---

## Metrics
| Metric | Target |
|--------|--------|
| Pass Rate | > 95% |
| Flaky Rate | < 2% |
| Smoke Execution | < 5 min |
| Regression Execution | < 60 min |

---

## Flaky Test Management
1. Track results over time
2. Quarantine failing > 5%
3. Fix root cause (not retries)
4. Return when stable

**Common Causes:** Race conditions, shared state, external dependencies

---

## Session Commands
| Command | Description |
|---------|-------------|
| QA-Start | Begin development session |
| QA-Status | Show suite status/coverage |
| Create-PageObject | Generate page object template |
| Run-Smoke | Execute smoke suite |
| Run-Regression | Execute regression suite |
| Flaky-Report | Show flaky analysis |

---

## Best Practices

**Do:** Use Page Objects, prefer data-testid, keep tests isolated, meaningful names, explicit waits
**Don't:** Use sleep(), share state, use brittle selectors, ignore flaky tests

---

**End of Framework**
