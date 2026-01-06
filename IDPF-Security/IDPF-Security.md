# IDPF-Security Framework
**Version:** v0.22.0
**Source:** IDPF-Security/IDPF-Security.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for security testing: SAST, DAST, penetration testing, vulnerability management, and security compliance.
**Core Principle:** Validate applications against common vulnerabilities and security requirements from PRD.

---

## Terminology
| Term | Definition |
|------|------------|
| **SAST** | Static Application Security Testing - source code analysis |
| **DAST** | Dynamic Application Security Testing - running application analysis |
| **SCA** | Software Composition Analysis - dependency vulnerability scanning |
| **IAST** | Interactive Application Security Testing - runtime analysis |
| **Penetration Testing** | Manual + automated attack simulation |
| **Secret Scanning** | Detection of credentials, keys, tokens in code |
| **CVE** | Common Vulnerabilities and Exposures identifier |
| **CVSS** | Common Vulnerability Scoring System |

---

## Security Testing Types
| Test Type | When | What | Tools |
|-----------|------|------|-------|
| **SAST** | Development/CI | Source code analysis | SonarQube, Semgrep, CodeQL |
| **SCA** | Development/CI | Dependency vulnerabilities | Snyk, Dependabot, OWASP Dependency-Check |
| **DAST** | Staging/Pre-prod | Running application | OWASP ZAP, Burp Suite, Nuclei |
| **IAST** | Testing | Runtime analysis | Contrast Security, Hdiv |
| **Penetration Testing** | Pre-release | Manual + automated | Various |
| **Secret Scanning** | Development/CI | Credentials in code | GitLeaks, TruffleHog, GitHub Secret Scanning |

---

## Tool Selection Guide
### SAST Tools
| Tool | Languages | Best For | Licensing |
|------|-----------|----------|-----------|
| **SonarQube** | Multi-language | Enterprise, quality + security | Community/Commercial |
| **Semgrep** | Multi-language | Custom rules, fast | Open Source/Commercial |
| **CodeQL** | Multi-language | GitHub integration | Free for public repos |
| **Checkmarx** | Multi-language | Enterprise, compliance | Commercial |

### DAST Tools
| Tool | Best For | Strengths |
|------|----------|-----------|
| **OWASP ZAP** | API/Web apps | Free, scriptable, CI-friendly |
| **Burp Suite** | Manual + automated | Comprehensive, industry standard |
| **Nuclei** | Template-based scanning | Fast, community templates |

### SCA Tools
| Tool | Integration | Features |
|------|-------------|----------|
| **Snyk** | IDE, CI/CD, Git | Fix suggestions, monitoring |
| **Dependabot** | GitHub native | Auto PRs for updates |
| **OWASP Dependency-Check** | CLI, CI/CD | Free, comprehensive |

### Secret Scanning Tools
| Tool | Integration | Features |
|------|-------------|----------|
| **GitLeaks** | CLI, CI/CD | Configurable rules, fast |
| **TruffleHog** | CLI, CI/CD | Entropy detection |
| **GitHub Secret Scanning** | GitHub native | Automatic, partner patterns |

---

## OWASP Top 10 Coverage
| # | Vulnerability | Testing Approach | Tools |
|---|---------------|------------------|-------|
| A01 | Broken Access Control | DAST, Manual | ZAP, Burp |
| A02 | Cryptographic Failures | SAST, Manual | SonarQube, Semgrep |
| A03 | Injection | SAST, DAST | All |
| A04 | Insecure Design | Manual Review | Threat Modeling |
| A05 | Security Misconfiguration | DAST, Config Scan | ZAP, ScoutSuite |
| A06 | Vulnerable Components | SCA | Snyk, Dependabot |
| A07 | Auth Failures | DAST, Manual | ZAP, Burp |
| A08 | Data Integrity Failures | SAST, DAST | SonarQube, ZAP |
| A09 | Logging Failures | SAST, Manual | Code review |
| A10 | SSRF | DAST, Manual | ZAP, Burp |

---

## Vulnerability Management
### Severity Classification
| Severity | CVSS Score | Remediation SLA |
|----------|------------|-----------------|
| Critical | 9.0 - 10.0 | 24 hours |
| High | 7.0 - 8.9 | 7 days |
| Medium | 4.0 - 6.9 | 30 days |
| Low | 0.1 - 3.9 | 90 days |

### Workflow
```
Discovery → Triage → Assignment → Remediation → Verification → Closure
```
- **Exception Process:** Documented risk acceptance, Security Lead + Product Owner approval, time-bounded with review dates

---

## CI/CD Integration
### Pipeline Gate Strategy
| Stage | Tool Type | Gate Criteria |
|-------|-----------|---------------|
| Commit | SAST | No critical/high issues |
| Commit | Secret Scan | No secrets detected |
| PR | SCA | No critical vulnerabilities |
| Pre-Deploy | DAST | No critical findings |

### GitHub Actions Example
```yaml
name: Security Scans
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: returntocorp/semgrep-action@v1
        with:
          config: p/owasp-top-ten
      - uses: gitleaks/gitleaks-action@v2
  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
  dast:
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    needs: [sast, dependency-scan]
    steps:
      - uses: actions/checkout@v4
      - run: docker-compose up -d
      - uses: zaproxy/action-full-scan@v0.8.0
        with:
          target: 'http://localhost:8080'
```

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `security` | `#FF5630` | Security work |
| `sast` | `#0052CC` | Static analysis |
| `dast` | `#D93F0B` | Dynamic analysis |
| `sca` | `#0E8A16` | Dependency scanning |
| `pentest` | `#5319E7` | Penetration testing |
| `vulnerability` | `#FBCA04` | Vulnerability tracking |
| `compliance` | `#1D76DB` | Compliance related |

---

## Reporting & Metrics
| Metric | Target |
|--------|--------|
| Mean Time to Remediate (Critical) | < 24 hours |
| Mean Time to Remediate (High) | < 7 days |
| Vulnerability Escape Rate | < 5% |
| False Positive Rate | < 10% |
| Scan Coverage | > 95% |
| OWASP Top 10 Coverage | 100% |

---

## Compliance Mapping
| Framework | Focus | Security Testing Requirements |
|-----------|-------|-------------------------------|
| **SOC 2** | Security, availability | Vulnerability scanning, penetration testing |
| **PCI-DSS** | Payment card data | Quarterly scans, annual pentest |
| **HIPAA** | Healthcare data | Risk assessments, access controls testing |
| **GDPR** | Personal data | Data protection testing, privacy controls |
| **ISO 27001** | Information security | Regular security testing, vulnerability mgmt |

---

## Session Commands
- **Security-Scan-Start** - Initialize security scanning session
- **Run-SAST** - Execute static analysis scans
- **Run-DAST** - Execute dynamic analysis scans
- **Run-SCA** - Execute dependency scanning
- **Vuln-Triage [finding-id]** - Triage a vulnerability finding
- **Vuln-Status** - Show open vulnerability status

---

## References
- [OWASP ZAP](https://www.zaproxy.org/docs/)
- [Semgrep](https://semgrep.dev/docs/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)

---

**End of Framework**
