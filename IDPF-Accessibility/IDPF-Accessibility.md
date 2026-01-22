# IDPF-Accessibility Framework
**Version:** v0.30.0
**Extends:** IDPF-Testing-Core

## Overview
Framework for accessibility testing: WCAG compliance, automated a11y scanning, manual audits, and assistive technology testing. Validates usability for people with disabilities and legal compliance (ADA, Section 508, EAA).

## Repository Type: Flexible
| Model | Use Case | Location |
|-------|----------|----------|
| **Embedded** | Automated a11y checks in CI | App repo (`tests/a11y/`) |
| **Separate** | Comprehensive audits, manual testing | Dedicated repo |

## Testing Types
| Type | Automation | Coverage | Tools |
|------|------------|----------|-------|
| Automated Scans | Full | ~30-40% | axe-core, Lighthouse, Pa11y |
| Keyboard Testing | Partial | Focus, navigation | Manual + scripts |
| Screen Reader | Manual | Content, announcements | NVDA, JAWS, VoiceOver |
| Color Contrast | Full | Visual design | axe, Contrast checkers |
| Cognitive | Manual | Readability, simplicity | Manual review |

## WCAG Conformance Levels
| Level | Description | Requirement |
|-------|-------------|-------------|
| **A** | Minimum | Must meet |
| **AA** | Standard | Typically required (legal) |
| **AAA** | Enhanced | Aspirational |
**Target:** WCAG 2.1 Level AA as baseline.

## Tool Selection
| Tool | Best For | Integration |
|------|----------|-------------|
| **axe-core** | CI/CD | npm, browser extension |
| **Lighthouse** | Overall audit | Chrome, CI |
| **Pa11y** | CLI scanning | Node.js |
| **WAVE** | Visual feedback | Browser extension |

| Assistive Tech | Platform | Type |
|----------------|----------|------|
| **NVDA** | Windows | Screen reader (Free) |
| **JAWS** | Windows | Screen reader (Commercial) |
| **VoiceOver** | macOS/iOS | Screen reader (Built-in) |
| **TalkBack** | Android | Screen reader (Built-in) |

## WCAG Checklist (Key Success Criteria)
| SC | Description | Level | Test Method |
|----|-------------|-------|-------------|
| 1.1.1 | Non-text Content | A | Automated + Manual |
| 1.4.3 | Contrast (Minimum) | AA | Automated |
| 2.1.1 | Keyboard | A | Manual |
| 2.4.2 | Page Titled | A | Automated |
| 2.4.7 | Focus Visible | AA | Manual |
| 3.1.1 | Language of Page | A | Automated |
| 4.1.2 | Name, Role, Value | A | Automated + Manual |

## Issue Severity
| Severity | Impact | SLA |
|----------|--------|-----|
| Critical | Blocker for AT users | Before release |
| Serious | Major barrier | 30 days |
| Moderate | Degraded experience | 60 days |
| Minor | Inconvenience | 90 days |

## Directory Structure (Separate Repo)
```
<accessibility-test-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── src/automated/axe-config.js, src/manual/checklists/
├── audits/YYYY-QN-WCAG-Audit/findings.md, recommendations.md
└── .github/workflows/
```

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `wcag-a` | `#0E8A16` | Level A issue |
| `wcag-aa` | `#1D76DB` | Level AA issue |
| `wcag-aaa` | `#5319E7` | Level AAA issue |
| `screen-reader` | `#D93F0B` | Screen reader issue |
| `keyboard` | `#FBCA04` | Keyboard navigation |
| `color-contrast` | `#C5DEF5` | Color contrast issue |

## Key Metrics
| Metric | Target |
|--------|--------|
| Lighthouse a11y score | > 90 |
| Critical issues open | 0 |
| Serious issues open | < 5 |
| WCAG AA conformance | 100% |

## Legal Requirements
| Regulation | Jurisdiction | Standard |
|------------|--------------|----------|
| **ADA** | United States | WCAG 2.1 AA |
| **Section 508** | US Federal | WCAG 2.0 AA |
| **EAA** | European Union | EN 301 549 (WCAG 2.1 AA) |

**End of Framework**
