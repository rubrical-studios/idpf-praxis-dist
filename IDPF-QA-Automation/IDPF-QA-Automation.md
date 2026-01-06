# IDPF-QA-Automation Framework
**Version:** v0.22.0
**Source:** IDPF-QA-Automation/IDPF-QA-Automation.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for automated UI and end-to-end test suites using Selenium, Playwright, Cypress, and Appium.
**Core Principle:** QA Automation tests operate against running applications from external perspective, validating user-facing behavior.

---

## Terminology
| Term | Definition |
|------|------------|
| **Page Object** | Class encapsulating a page's elements and actions |
| **Component Object** | Reusable UI component abstraction |
| **Locator/Selector** | Strategy for finding elements (CSS, XPath, data-testid) |
| **Smoke Suite** | Critical path tests run after every deployment |
| **Regression Suite** | Full feature coverage tests |
| **Flaky Test** | Test with inconsistent pass/fail results |
| **Wait Strategy** | Approach for handling asynchronous UI updates |

---

## QA Automation Test Types
| Test Type | Scope | Execution Time | Trigger |
|-----------|-------|----------------|---------|
| **Smoke Tests** | Critical paths only | < 5 minutes | Every deployment |
| **Regression Tests** | Full feature coverage | 30-60 minutes | PR merge, nightly |
| **Cross-Browser Tests** | Browser compatibility | Varies | Weekly, release |
| **Mobile Tests** | Native/hybrid apps | Varies | PR merge, nightly |
| **Visual Tests** | UI appearance | 10-30 minutes | PR, release |
| **E2E Tests** | Full user journeys | 15-45 minutes | Nightly, release |

---

## Tool Selection
### Web Automation
| Tool | Best For | Key Strengths |
|------|----------|---------------|
| **Selenium** | Enterprise, cross-browser | Mature ecosystem, wide browser support |
| **Playwright** | Modern web apps | Auto-wait, multiple browsers, traces |
| **Cypress** | JavaScript apps | Fast, great DX, time-travel debugging |
| **WebDriverIO** | Flexible automation | Plugin ecosystem, multiple protocols |

### Mobile Automation
| Tool | Best For | Platform |
|------|----------|----------|
| **Appium** | Cross-platform | iOS, Android |
| **XCUITest** | iOS native | iOS only |
| **Espresso** | Android native | Android only |
| **Detox** | React Native | iOS, Android |

### Visual Testing
| Tool | Best For | Integration |
|------|----------|-------------|
| **Percy** | Component/page screenshots | CI/CD native |
| **Applitools** | AI-powered visual testing | All frameworks |
| **BackstopJS** | Open-source visual regression | Self-hosted |

---

## Page Object Model (POM)
**Principles:**
1. One page object per page/screen
2. Page objects encapsulate element locators
3. Page objects expose meaningful actions
4. Tests should not directly access locators
5. Page objects should not make assertions

**Structure:**
```
src/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── components/ (Header.ts, SearchBar.ts)
├── tests/ (smoke/, regression/, e2e/)
├── fixtures/, utils/, config/
```

**Page Object Example:**
```typescript
export class LoginPage extends BasePage {
  private readonly emailInput = '[data-testid="email"]';
  private readonly passwordInput = '[data-testid="password"]';
  private readonly submitButton = '[data-testid="login-submit"]';

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }
}
```

---

## Selector Strategy (Priority Order)
| Priority | Selector Type | Example | Reliability |
|----------|---------------|---------|-------------|
| 1 | data-testid | `[data-testid="login-button"]` | Highest |
| 2 | ID | `#login-button` | High |
| 3 | Name | `[name="email"]` | High |
| 4 | ARIA | `[aria-label="Submit"]` | Medium-High |
| 5 | CSS Class (stable) | `.btn-primary` | Medium |
| 6 | Text content | `text="Login"` | Low |
| 7 | XPath | `//button[@type="submit"]` | Lowest |

**Best Practices:** Request `data-testid` from developers, avoid index-based selectors, use relative selectors within components.

---

## Wait Strategies
| Strategy | Use Case |
|----------|----------|
| **Implicit Wait** | Global timeout, set once |
| **Explicit Wait** | Specific conditions (element visible) |
| **Auto-Wait** | Framework handles (Playwright built-in) |
| **Custom Wait** | Complex conditions (poll for API response) |

**Best Practices:** Prefer explicit/auto waits, never use hard-coded `sleep()`, wait for specific conditions.

---

## CI/CD Integration
### Smoke Tests (On Deploy)
```yaml
name: Smoke Tests
on:
  deployment_status:
    states: [success]
jobs:
  smoke:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npx playwright install chromium
      - run: npm run test:smoke
        env:
          BASE_URL: ${{ github.event.deployment_status.target_url }}
```

### Regression Tests (On PR Merge)
```yaml
name: Regression Tests
on:
  push:
    branches: [main]
jobs:
  regression:
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps ${{ matrix.browser }}
      - run: npx playwright test --project=${{ matrix.browser }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report-${{ matrix.browser }}
          path: playwright-report/
```

---

## Metrics & Reporting
| Metric | Target |
|--------|--------|
| Pass Rate | > 95% |
| Flaky Rate | < 2% |
| Smoke Execution | < 5 min |
| Regression Execution | < 60 min |

---

## Flaky Test Management
**Identification:** Track results over time, flag tests failing > 5% of runs
**Quarantine Strategy:**
1. Move flaky test to quarantine suite
2. Create issue for investigation
3. Fix root cause (not just add retries)
4. Return to main suite when stable

**Common Causes:** Race conditions, shared test state, external dependencies, unstable test data, environment differences

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `qa-automation` | `#FF991F` | QA automation work |
| `smoke-suite` | `#0E8A16` | Smoke test development |
| `regression-suite` | `#1D76DB` | Regression test development |
| `cross-browser` | `#5319E7` | Cross-browser testing |
| `mobile` | `#D93F0B` | Mobile automation |
| `flaky` | `#FBCA04` | Flaky test issues |

---

## Session Commands
- **QA-Start** - Begin QA automation development
- **QA-Status** - Show test suite status and coverage
- **Create-PageObject** - Generate page object template
- **Create-TestSpec** - Generate test specification template
- **Run-Smoke** - Execute smoke test suite
- **Run-Regression** - Execute regression suite
- **Flaky-Report** - Show flaky test analysis

---

## Best Practices
### Do
- Use Page Object Model for organization
- Prefer `data-testid` selectors
- Keep tests independent and isolated
- Use meaningful test names
- Maintain separate smoke/regression suites
- Clean up test data
- Use explicit waits

### Don't
- Use hard-coded delays (`sleep`)
- Share state between tests
- Use brittle selectors (indexes, CSS styling)
- Mix test types in same spec file
- Ignore flaky tests
- Hard-code environment URLs

---

**End of Framework**
