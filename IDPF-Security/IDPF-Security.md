# IDPF-Security Framework

**Version:** v0.5.0
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for SAST, DAST, penetration testing, and vulnerability management.

## Testing Types
| Type | When | Tools |
|------|------|-------|
| SAST | Dev/CI | SonarQube, Semgrep, CodeQL |
| SCA | Dev/CI | Snyk, Dependabot |
| DAST | Staging | OWASP ZAP, Burp Suite |
| Secret Scan | Dev/CI | GitLeaks, TruffleHog |
| Penetration | Pre-release | Manual + tools |

## OWASP Top 10 Coverage
A01-A10: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Misconfiguration, Vulnerable Components, Auth Failures, Data Integrity, Logging Failures, SSRF

## Vulnerability Severity & SLA
| Severity | CVSS | SLA |
|----------|------|-----|
| Critical | 9.0-10.0 | 24 hours |
| High | 7.0-8.9 | 7 days |
| Medium | 4.0-6.9 | 30 days |
| Low | 0.1-3.9 | 90 days |

## Vulnerability Workflow
```
Discovery → Triage → Assignment → Remediation → Verification → Closure
```

## Pipeline Gates
| Stage | Tool | Gate |
|-------|------|------|
| Commit | SAST | No critical/high |
| Commit | Secret Scan | No secrets |
| PR | SCA | No critical |
| Pre-Deploy | DAST | No critical |

## Directory Structure
```
src/
├── sast/            # Custom rules, profiles
├── dast/            # ZAP scripts, Nuclei templates
└── config/          # Environment configs
vulnerabilities/
├── open/            # Active findings
└── resolved/        # Resolved findings
```

## Metrics
| Metric | Target |
|--------|--------|
| MTTR (Critical) | < 24 hours |
| MTTR (High) | < 7 days |
| Escape Rate | < 5% |
| False Positive Rate | < 10% |
| Scan Coverage | > 95% |

## Commands
- `Security-Scan-Start` - Initialize session
- `Run-SAST` - Static analysis
- `Run-DAST` - Dynamic analysis
- `Run-SCA` - Dependency scan
- `Vuln-Triage [finding-id]` - Triage finding
- `Vuln-Status` - Show open vulnerabilities

## Compliance Mapping
SOC 2, PCI-DSS, HIPAA, GDPR, ISO 27001 - map test cases to controls

---

**End of Framework**
