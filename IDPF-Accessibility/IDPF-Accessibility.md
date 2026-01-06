# IDPF-Accessibility Framework
**Version:** v0.22.0
**Source:** IDPF-Accessibility/IDPF-Accessibility.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for accessibility testing. Validates WCAG compliance, automated a11y scanning, manual audits, and assistive technology testing.

---

## Repository Type: Flexible
| Model | Use Case | Location |
|-------|----------|----------|
| **Embedded** | Automated a11y checks in CI | `tests/a11y/` |
| **Separate** | Comprehensive audits, manual suites | Dedicated repo |

**Choose Embedded:** axe-core/Lighthouse in CI | Automated gates | No dedicated team
**Choose Separate:** Comprehensive WCAG audits | Manual AT testing | Dedicated team | Remediation tracking

---

## Accessibility Testing Types
| Test Type | Automation | Coverage | Tools |
|-----------|------------|----------|-------|
| Automated Scans | Full | ~30-40% | axe-core, Lighthouse, Pa11y |
| Keyboard Testing | Partial | Focus, nav | Manual + scripts |
| Screen Reader | Manual | Content | NVDA, JAWS, VoiceOver |
| Color Contrast | Full | Visual | axe, Contrast checkers |
| Cognitive | Manual | Readability | Manual review |
| Mobile a11y | Partial | Touch | Accessibility Scanner |

---

## WCAG Conformance Levels
| Level | Description | Requirement |
|-------|-------------|-------------|
| **A** | Minimum | Must meet |
| **AA** | Standard | Typically required (legal) |
| **AAA** | Enhanced | Aspirational |

**Target:** WCAG 2.1 Level AA baseline

---

## Tool Selection Guide
### Automated Scanning
| Tool | Best For | Integration |
|------|----------|-------------|
| **axe-core** | CI/CD | npm, browser extension |
| **Lighthouse** | Overall audit | Chrome, CI |
| **Pa11y** | CLI scanning | Node.js |
| **WAVE** | Visual feedback | Browser extension |
| **Tenon** | API-based | API, CI |

### Assistive Technology
| Tool | Platform | Cost |
|------|----------|------|
| **NVDA** | Windows | Free |
| **JAWS** | Windows | Commercial |
| **VoiceOver** | macOS/iOS | Built-in |
| **TalkBack** | Android | Built-in |

---

## WCAG Success Criteria Checklist

### Perceivable (1.x)
| SC | Description | Level | Method |
|----|-------------|-------|--------|
| 1.1.1 | Non-text Content | A | Auto + Manual |
| 1.2.1 | Audio-only/Video-only | A | Manual |
| 1.3.1 | Info and Relationships | A | Auto + Manual |
| 1.3.2 | Meaningful Sequence | A | Manual |
| 1.4.1 | Use of Color | A | Manual |
| 1.4.3 | Contrast (Minimum) | AA | Automated |
| 1.4.4 | Resize Text | AA | Manual |
| 1.4.11 | Non-text Contrast | AA | Manual |

### Operable (2.x)
| SC | Description | Level | Method |
|----|-------------|-------|--------|
| 2.1.1 | Keyboard | A | Manual |
| 2.1.2 | No Keyboard Trap | A | Manual |
| 2.4.1 | Bypass Blocks | A | Manual |
| 2.4.2 | Page Titled | A | Automated |
| 2.4.3 | Focus Order | A | Manual |
| 2.4.4 | Link Purpose | A | Manual |
| 2.4.6 | Headings and Labels | AA | Auto + Manual |
| 2.4.7 | Focus Visible | AA | Manual |

### Understandable (3.x)
| SC | Description | Level | Method |
|----|-------------|-------|--------|
| 3.1.1 | Language of Page | A | Automated |
| 3.2.1 | On Focus | A | Manual |
| 3.2.2 | On Input | A | Manual |
| 3.3.1 | Error Identification | A | Manual |
| 3.3.2 | Labels or Instructions | A | Manual |

### Robust (4.x)
| SC | Description | Level | Method |
|----|-------------|-------|--------|
| 4.1.1 | Parsing | A | Automated |
| 4.1.2 | Name, Role, Value | A | Auto + Manual |
| 4.1.3 | Status Messages | AA | Manual |

---

## Issue Severity Classification
| Severity | Impact | SLA |
|----------|--------|-----|
| Critical | Blocker for AT users | Before release |
| Serious | Major barrier | 30 days |
| Moderate | Degraded experience | 60 days |
| Minor | Inconvenience | 90 days |

---

## CI/CD Integration
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Checks
on: [push, pull_request]
jobs:
  axe-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build && npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npx @axe-core/cli http://localhost:3000 --exit
```

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `accessibility` | `#36B37E` | A11y work |
| `wcag-a` | `#0E8A16` | Level A issue |
| `wcag-aa` | `#1D76DB` | Level AA issue |
| `screen-reader` | `#D93F0B` | Screen reader issue |
| `keyboard` | `#FBCA04` | Keyboard nav issue |
| `color-contrast` | `#C5DEF5` | Contrast issue |

---

## Workflow Phases
| Phase | Activities |
|-------|------------|
| **PLAN** | Create Test Plan, define WCAG target, identify pages/flows |
| **DESIGN** | Select tools, define test matrix (browsers, AT) |
| **DEVELOP** | Configure scans, create manual checklists |
| **EXECUTE** | Run scans, manual testing, screen reader testing |
| **REPORT** | Document findings, remediation recommendations |

---

## Metrics
| Metric | Target |
|--------|--------|
| Lighthouse a11y score | > 90 |
| Critical issues open | 0 |
| Serious issues open | < 5 |
| WCAG AA conformance | 100% |

---

## Legal Requirements
| Regulation | Jurisdiction | Standard |
|------------|--------------|----------|
| **ADA** | US | WCAG 2.1 AA |
| **Section 508** | US Federal | WCAG 2.0 AA |
| **EAA** | EU | EN 301 549 (WCAG 2.1 AA) |
| **AODA** | Ontario, Canada | WCAG 2.0 AA |

---

## References
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core](https://www.deque.com/axe/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

**End of Framework Document**
