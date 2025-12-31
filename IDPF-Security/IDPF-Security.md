# IDPF-Security Framework
**Version:** v0.19.0
**Source:** IDPF-Security/IDPF-Security.md
**Extends:** IDPF-Testing-Core
**Framework-Debug:** True

---

## Overview
Framework for security testing: SAST, DAST, penetration testing, vulnerability management, compliance.

---

## Terminology
| Term | Definition |
|------|------------|
| SAST | Static Application Security Testing - source code analysis |
| DAST | Dynamic Application Security Testing - running app analysis |
| SCA | Software Composition Analysis - dependency scanning |
| CVE | Common Vulnerabilities and Exposures |
| CVSS | Common Vulnerability Scoring System |

---

## Security Testing Types
| Type | When | Tools |
|------|------|-------|
| SAST | Development/CI | SonarQube, Semgrep, CodeQL |
| SCA | Development/CI | Snyk, Dependabot |
| DAST | Staging/Pre-prod | OWASP ZAP, Burp Suite |
| Secret Scanning | Development/CI | GitLeaks, TruffleHog |
| Penetration | Pre-release | Manual + tools |

---

## Tool Selection

### SAST
| Tool | Best For |
|------|----------|
| SonarQube | Enterprise, quality + security |
| Semgrep | Custom rules, fast |
| CodeQL | GitHub integration |

### DAST
| Tool | Best For |
|------|----------|
| OWASP ZAP | Free, scriptable, CI-friendly |
| Burp Suite | Manual + automated |
| Nuclei | Template-based scanning |

### SCA
| Tool | Best For |
|------|----------|
| Snyk | Fix suggestions, monitoring |
| Dependabot | GitHub native, auto PRs |

---

## OWASP Top 10 Coverage
| # | Vulnerability | Testing |
|---|---------------|---------|
| A01 | Broken Access Control | DAST, Manual |
| A02 | Cryptographic Failures | SAST |
| A03 | Injection | SAST, DAST |
| A04 | Insecure Design | Manual Review |
| A05 | Security Misconfiguration | DAST, Config Scan |
| A06 | Vulnerable Components | SCA |
| A07 | Auth Failures | DAST, Manual |
| A08 | Data Integrity Failures | SAST, DAST |
| A09 | Logging Failures | SAST, Manual |
| A10 | SSRF | DAST, Manual |

---

## Vulnerability Management

### Severity Classification
| Severity | CVSS | Remediation SLA |
|----------|------|-----------------|
| Critical | 9.0-10.0 | 24 hours |
| High | 7.0-8.9 | 7 days |
| Medium | 4.0-6.9 | 30 days |
| Low | 0.1-3.9 | 90 days |

### Workflow
Discovery -> Triage -> Assignment -> Remediation -> Verification -> Closure

---

## Directory Structure
```
<security-test-repo>/
├── PRD/TestPlans/
├── src/sast/ (custom rules)
├── src/dast/ (ZAP scripts, Nuclei templates)
├── reports/
├── vulnerabilities/open/resolved/
└── .github/workflows/
```

---

## CI/CD Integration

### Pipeline Gates
| Stage | Tool | Gate Criteria |
|-------|------|---------------|
| Commit | SAST | No critical/high |
| Commit | Secret Scan | No secrets |
| PR | SCA | No critical |
| Pre-Deploy | DAST | No critical |

---

## GitHub Labels
| Label | Description |
|-------|-------------|
| sast | Static analysis |
| dast | Dynamic analysis |
| sca | Dependency scanning |
| vulnerability | Vulnerability tracking |
| compliance | Compliance related |

---

## Metrics
| Metric | Target |
|--------|--------|
| MTTR (Critical) | < 24 hours |
| MTTR (High) | < 7 days |
| Vulnerability Escape Rate | < 5% |
| False Positive Rate | < 10% |
| Scan Coverage | > 95% |

---

## Session Commands
| Command | Description |
|---------|-------------|
| Security-Scan-Start | Initialize session |
| Run-SAST | Execute static analysis |
| Run-DAST | Execute dynamic analysis |
| Run-SCA | Execute dependency scan |
| Vuln-Triage [id] | Triage finding |
| Vuln-Status | Show open vulnerabilities |

---

## Compliance Mapping
| Framework | Requirements |
|-----------|--------------|
| SOC 2 | Vulnerability scanning, pentest |
| PCI-DSS | Quarterly scans, annual pentest |
| HIPAA | Risk assessments, access controls |
| ISO 27001 | Regular testing, vuln mgmt |

---

**End of Framework**
