# IDPF-Security Framework
**Version:** v0.26.1
**Extends:** IDPF-Testing-Core
**Framework-Debug:** True

## Overview
Framework for developing and executing security testing: SAST, DAST, penetration testing, vulnerability management, and compliance.
**Core Principle:** Validate applications are protected against common vulnerabilities and meet security requirements.

## Terminology
| Term | Definition |
|------|------------|
| **SAST** | Static Application Security Testing |
| **DAST** | Dynamic Application Security Testing |
| **SCA** | Software Composition Analysis |
| **Secret Scanning** | Detection of credentials in code |
| **CVE** | Common Vulnerabilities and Exposures |
| **CVSS** | Common Vulnerability Scoring System |

## Security Testing Types
| Type | When | Tools |
|------|------|-------|
| SAST | Development/CI | SonarQube, Semgrep, CodeQL |
| SCA | Development/CI | Snyk, Dependabot, OWASP Dependency-Check |
| DAST | Staging/Pre-prod | OWASP ZAP, Burp Suite, Nuclei |
| Secret Scanning | Development/CI | GitLeaks, TruffleHog |
| Penetration Testing | Pre-release | Manual + tools |

## OWASP Top 10 Coverage
| # | Vulnerability | Testing Approach |
|---|---------------|------------------|
| A01 | Broken Access Control | DAST, Manual |
| A02 | Cryptographic Failures | SAST, Manual |
| A03 | Injection | SAST, DAST |
| A04 | Insecure Design | Manual Review |
| A05 | Security Misconfiguration | DAST, Config Scan |
| A06 | Vulnerable Components | SCA |
| A07 | Auth Failures | DAST, Manual |
| A08 | Data Integrity Failures | SAST, DAST |
| A09 | Logging Failures | SAST, Manual |
| A10 | SSRF | DAST, Manual |

## Vulnerability Management
| Severity | CVSS | Remediation SLA |
|----------|------|-----------------|
| Critical | 9.0-10.0 | 24 hours |
| High | 7.0-8.9 | 7 days |
| Medium | 4.0-6.9 | 30 days |
| Low | 0.1-3.9 | 90 days |

**Workflow:** Discovery → Triage → Assignment → Remediation → Verification → Closure

## CI/CD Pipeline Gates
| Stage | Tool Type | Gate Criteria |
|-------|-----------|---------------|
| Commit | SAST | No critical/high |
| Commit | Secret Scan | No secrets |
| PR | SCA | No critical vulns |
| Pre-Deploy | DAST | No critical findings |

## Directory Structure
```
<security-test-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── src/sast/semgrep-rules/, src/dast/zap-scripts/, src/config/
├── reports/sast/, reports/dast/, reports/pentests/
├── vulnerabilities/open/, vulnerabilities/resolved/
└── .github/workflows/
```

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `sast` | `#0052CC` | Static analysis |
| `dast` | `#D93F0B` | Dynamic analysis |
| `sca` | `#0E8A16` | Dependency scanning |
| `pentest` | `#5319E7` | Penetration testing |
| `vulnerability` | `#FBCA04` | Vulnerability tracking |
| `compliance` | `#1D76DB` | Compliance related |

## Key Metrics
| Metric | Target |
|--------|--------|
| Mean Time to Remediate (Critical) | < 24 hours |
| Mean Time to Remediate (High) | < 7 days |
| Vulnerability Escape Rate | < 5% |
| False Positive Rate | < 10% |
| Scan Coverage | > 95% |
| OWASP Top 10 Coverage | 100% |

## Session Commands
**Security:** "Security-Scan-Start", "Run-SAST", "Run-DAST", "Run-SCA", "Vuln-Triage [id]", "Vuln-Status"
**Standard:** All IDPF-Testing-Core and IDPF-Agile commands apply

## Compliance Frameworks
| Framework | Focus | Requirements |
|-----------|-------|--------------|
| SOC 2 | Security, availability | Vuln scanning, pentesting |
| PCI-DSS | Payment card data | Quarterly scans, annual pentest |
| HIPAA | Healthcare data | Risk assessments |
| GDPR | Personal data | Data protection testing |
| ISO 27001 | Information security | Regular testing, vuln mgmt |

**End of Framework**
