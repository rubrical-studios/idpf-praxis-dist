# IDPF-Accessibility Framework
**Version:** v0.19.1
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for accessibility testing: WCAG compliance, automated a11y scanning, manual audits, assistive technology testing.
Validates apps are usable by people with disabilities and comply with ADA, Section 508, EAA.

---

## Repository Type: Flexible
| Model | Use Case | Location |
|-------|----------|----------|
| Embedded | Automated a11y in CI | App repo `tests/a11y/` |
| Separate | Comprehensive audits | Dedicated repo |

---

## Testing Types
| Type | Automation | Coverage | Tools |
|------|------------|----------|-------|
| Automated Scans | Full | 30-40% | axe-core, Lighthouse, Pa11y |
| Keyboard Testing | Partial | Focus, navigation | Manual + scripts |
| Screen Reader | Manual | Content, announcements | NVDA, JAWS, VoiceOver |
| Color Contrast | Full | Visual | axe, contrast checkers |

---

## WCAG Conformance
| Level | Description | Requirement |
|-------|-------------|-------------|
| A | Minimum | Must meet |
| AA | Standard | Typically required (legal) |
| AAA | Enhanced | Aspirational |

**Target:** WCAG 2.1 Level AA

---

## Tool Selection
### Automated
| Tool | Best For |
|------|----------|
| axe-core | CI/CD integration |
| Lighthouse | Overall audit |
| Pa11y | CLI scanning |

### Assistive Technology
| Tool | Platform | Cost |
|------|----------|------|
| NVDA | Windows | Free |
| VoiceOver | macOS/iOS | Built-in |
| TalkBack | Android | Built-in |

---

## Directory Structure
**Embedded:** `tests/a11y/`, `PRD/TestPlans/Accessibility/`
**Separate:** Full repo with audits/, src/automated/, src/manual/

---

## Key WCAG Criteria
### Perceivable (1.x)
1.1.1 Non-text Content, 1.3.1 Info/Relationships, 1.4.3 Contrast

### Operable (2.x)
2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible

### Understandable (3.x)
3.1.1 Language, 3.3.1 Error ID, 3.3.2 Labels

### Robust (4.x)
4.1.2 Name, Role, Value

---

## Issue Severity
| Severity | Impact | SLA |
|----------|--------|-----|
| Critical | Blocker for AT users | Before release |
| Serious | Major barrier | 30 days |
| Moderate | Degraded experience | 60 days |
| Minor | Inconvenience | 90 days |

---

## CI/CD Integration
Run axe-core and Lighthouse in GitHub Actions on every PR.

---

## GitHub Labels
| Label | Description |
|-------|-------------|
| wcag-a | Level A issue |
| wcag-aa | Level AA issue |
| screen-reader | SR issue |
| keyboard | Keyboard nav issue |
| color-contrast | Contrast issue |

---

## Metrics
| Metric | Target |
|--------|--------|
| Lighthouse a11y score | > 90 |
| Critical issues | 0 |
| WCAG AA conformance | 100% |

---

## Legal Requirements
| Regulation | Standard |
|------------|----------|
| ADA | WCAG 2.1 AA |
| Section 508 | WCAG 2.0 AA |
| EAA | EN 301 549 |

---

**End of Framework**
