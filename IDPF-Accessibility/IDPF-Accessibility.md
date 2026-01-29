# IDPF-Accessibility Framework
**Version:** v0.34.2
**Extends:** IDPF-Testing-Core
## Overview
Framework for accessibility testing: WCAG compliance, automated a11y scanning, manual audits, assistive technology testing.
## Repository Type
| Model | Use Case |
|-------|----------|
| **Embedded** | Automated a11y checks in CI (`tests/a11y/`) |
| **Separate** | Comprehensive audits, manual test suites |
## Accessibility Testing Types
| Test Type | Automation | Tools |
|-----------|------------|-------|
| Automated Scans | Full | axe-core, Lighthouse, Pa11y |
| Keyboard Testing | Partial | Manual + scripts |
| Screen Reader | Manual | NVDA, JAWS, VoiceOver |
| Color Contrast | Full | axe, Contrast checkers |
## WCAG Conformance Levels
| Level | Requirement |
|-------|-------------|
| **A** | Must meet (minimum) |
| **AA** | Typically required (legal) |
| **AAA** | Aspirational |
**Target:** WCAG 2.1 Level AA as baseline.
## Tool Selection
| Tool | Best For | Integration |
|------|----------|-------------|
| **axe-core** | CI/CD | npm, browser extension |
| **Lighthouse** | Overall audit | Chrome, CI |
| **NVDA** | Screen reader (Windows) | Free |
| **VoiceOver** | Screen reader (macOS/iOS) | Built-in |
## WCAG Success Criteria (Key)
| SC | Description | Level | Method |
|----|-------------|-------|--------|
| 1.1.1 | Non-text Content | A | Automated + Manual |
| 1.4.3 | Contrast (Minimum) | AA | Automated |
| 2.1.1 | Keyboard | A | Manual |
| 2.4.7 | Focus Visible | AA | Manual |
| 4.1.2 | Name, Role, Value | A | Automated + Manual |
## Issue Severity
| Severity | SLA |
|----------|-----|
| Critical | Before release |
| Serious | 30 days |
| Moderate | 60 days |
| Minor | 90 days |
## Metrics
| Metric | Target |
|--------|--------|
| Lighthouse a11y score | > 90 |
| Critical issues | 0 |
| WCAG AA conformance | 100% |
## Workflow Phases
| Phase | Activities |
|-------|------------|
| PLAN | Define WCAG target, identify pages |
| DESIGN | Select tools, define test matrix |
| DEVELOP | Configure scans, create checklists |
| EXECUTE | Run scans, manual testing, AT testing |
| REPORT | Document findings, track metrics |
---
**End of Framework Document**
