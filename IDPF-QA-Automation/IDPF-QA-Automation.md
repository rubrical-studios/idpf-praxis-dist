# IDPF-QA-Automation Framework

**Version:** v0.2.0
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for automated UI and end-to-end testing using Selenium, Playwright, Cypress, Appium.

## Test Types
| Type | Duration | Trigger |
|------|----------|---------|
| Smoke | < 5 min | Every deploy |
| Regression | 30-60 min | PR merge, nightly |
| Cross-Browser | Varies | Weekly, release |
| Mobile | Varies | PR merge, nightly |
| E2E | 15-45 min | Nightly, release |

## Tools
**Web:** Selenium, Playwright, Cypress, WebDriverIO
**Mobile:** Appium, XCUITest, Espresso, Detox
**Visual:** Percy, Applitools, BackstopJS
**Cloud:** BrowserStack, Sauce Labs, LambdaTest

## Page Object Model
- One page object per page/screen
- Encapsulate locators (private)
- Expose meaningful actions (public)
- No assertions in page objects

## Selector Priority
1. `data-testid` (Highest)
2. ID
3. Name
4. ARIA
5. CSS Class (stable)
6. Text content
7. XPath (Lowest)

## Wait Strategies
- Prefer explicit/auto waits
- NEVER use hard-coded `sleep()`
- Wait for specific conditions
- Timeouts: 5-30 seconds

## Test Data Management
| Approach | Use Case |
|----------|----------|
| Fixtures | Static reference data |
| Factories | Dynamic per-test data |
| API Seeding | Pre-test setup via API |

## Directory Structure
```
src/
├── pages/           # Page Objects
├── components/      # Reusable UI components
├── tests/{smoke,regression,e2e}/
├── fixtures/        # Test data
├── utils/           # Helpers
└── config/          # Environment configs
```

## Key Metrics
| Metric | Target |
|--------|--------|
| Pass Rate | > 95% |
| Flaky Rate | < 2% |
| Smoke Time | < 5 min |
| Regression | < 60 min |

## Flaky Test Management
1. Track results over time (>5% fail rate = flaky)
2. Quarantine flaky tests
3. Fix root cause (not just retries)
4. Return to main suite when stable

## Commands
- `QA-Start` - Begin session
- `Create-PageObject` - Generate template
- `Create-TestSpec` - Generate test spec
- `Run-Smoke` - Execute smoke suite
- `Run-Regression` - Execute regression
- `Flaky-Report` - Show analysis

---

**End of Framework**
