# IDPF-QA-Automation Framework
**Version:** v0.30.1
**Extends:** IDPF-Testing-Core
**Framework-Debug:** True

## Overview
Framework for developing automated UI and end-to-end test suites using Selenium, Playwright, Cypress, and Appium.
**Core Principle:** QA Automation tests operate against running applications from external perspective, validating user-facing behavior.

## Terminology
| Term | Definition |
|------|------------|
| **Page Object** | Class encapsulating page elements and actions |
| **Component Object** | Reusable UI component abstraction |
| **Locator/Selector** | Element finding strategy (CSS, XPath, data-testid) |
| **Smoke Suite** | Critical path tests after deployment |
| **Regression Suite** | Full feature coverage tests |
| **Flaky Test** | Test with inconsistent results |

## Test Types
| Test Type | Execution Time | Trigger |
|-----------|----------------|---------|
| Smoke | < 5 min | Every deployment |
| Regression | 30-60 min | PR merge, nightly |
| Cross-Browser | Varies | Weekly, release |
| E2E | 15-45 min | Nightly, release |

## Tool Selection
| Tool | Best For | Language |
|------|----------|----------|
| **Selenium** | Enterprise, cross-browser | Java, Python, C#, JS |
| **Playwright** | Modern web apps | JS/TS, Python, C# |
| **Cypress** | JavaScript apps | JS/TS |
| **Appium** | Cross-platform mobile | Multiple |

## Page Object Model
```
src/
├── pages/BasePage.ts, LoginPage.ts, ...
├── components/Header.ts, SearchBar.ts, ...
├── tests/smoke/, regression/, e2e/
├── fixtures/
├── utils/
└── config/
```
**Principles:** One page object per page, encapsulate locators, expose meaningful actions, tests don't access locators, page objects don't assert.

## Selector Priority
1. `data-testid` (highest)
2. ID
3. Name
4. ARIA
5. CSS Class (stable)
6. Text content
7. XPath (lowest)

**Best Practices:** Request `data-testid` from developers, avoid index-based selectors, prefer semantic selectors.

## Wait Strategies
| Strategy | Use Case |
|----------|----------|
| Auto-Wait | Framework handles (Playwright) |
| Explicit Wait | Specific conditions |
| Implicit Wait | Global timeout |
**Never:** Use hard-coded `sleep()` delays

## Test Data Management
| Approach | Use Case |
|----------|----------|
| Fixtures | Static reference data |
| Factories | Dynamic user-specific data |
| API Seeding | Pre-test setup via API |

## Key Metrics
| Metric | Target |
|--------|--------|
| Pass Rate | > 95% |
| Flaky Rate | < 2% |
| Smoke Execution | < 5 min |
| Regression Execution | < 60 min |

## Flaky Test Management
1. Track tests failing > 5% of runs
2. Move to quarantine suite
3. Create issue for investigation
4. Fix root cause (not just retries)
5. Return to main suite when stable

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `smoke-suite` | `#0E8A16` | Smoke tests |
| `regression-suite` | `#1D76DB` | Regression tests |
| `cross-browser` | `#5319E7` | Cross-browser |
| `mobile` | `#D93F0B` | Mobile automation |
| `flaky` | `#FBCA04` | Flaky test issues |
| `page-object` | `#0E8A16` | Page object development |

## Session Commands
**QA Commands:** "QA-Start", "QA-Status", "Create-PageObject", "Create-TestSpec", "Run-Smoke", "Run-Regression", "Flaky-Report"
**Standard:** All IDPF-Testing-Core and IDPF-Agile commands apply

## Best Practices
**Do:** Use Page Object Model, prefer `data-testid`, keep tests independent, maintain separate suites, clean up test data, use explicit waits
**Don't:** Use `sleep`, share state, use brittle selectors, ignore flaky tests, hard-code URLs

**End of Framework**
