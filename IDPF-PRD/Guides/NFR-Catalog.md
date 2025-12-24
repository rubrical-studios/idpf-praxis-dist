# NFR Catalog
**Version:** v0.5.0

**Purpose:** Comprehensive catalog of Non-Functional Requirements organized by category.

---

## How to Use This Catalog

1. Review each category relevant to your project
2. Select applicable NFRs
3. Customize target values for your context
4. Add to Elicitation Worksheet

---

## Performance NFRs

### Response Time

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-PERF-001 | Response time (p50) | <100ms | Median response |
| NFR-PERF-002 | Response time (p95) | <500ms | Most users |
| NFR-PERF-003 | Response time (p99) | <1000ms | Worst case |
| NFR-PERF-004 | API response time | <200ms | RESTful APIs |
| NFR-PERF-005 | Database query time | <50ms | Simple queries |

### Throughput

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-PERF-010 | Requests per second | 100-10000 rps | Depends on scale |
| NFR-PERF-011 | Transactions per second | Varies | Financial systems |
| NFR-PERF-012 | Messages per second | Varies | Event systems |

### Capacity

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-PERF-020 | Concurrent users | 100-100000 | Simultaneous |
| NFR-PERF-021 | Peak users | 2-10x normal | Traffic spikes |
| NFR-PERF-022 | Data volume | GB/TB/PB | Storage needs |

### User Experience

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-PERF-030 | Page load time | <3 seconds | Initial load |
| NFR-PERF-031 | Time to interactive | <5 seconds | Usable state |
| NFR-PERF-032 | First contentful paint | <1.5 seconds | Visual feedback |

---

## Security NFRs

### Authentication

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SEC-001 | Authentication method | Password, OAuth, SAML, MFA | User identity |
| NFR-SEC-002 | Multi-factor authentication | SMS, TOTP, hardware key | Additional security |
| NFR-SEC-003 | Session timeout | 15-60 minutes | Idle timeout |
| NFR-SEC-004 | Password policy | Complexity, history, expiry | Password rules |

### Authorization

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SEC-010 | Authorization model | RBAC, ABAC, ACL | Access control |
| NFR-SEC-011 | Principle of least privilege | Required | Minimal access |
| NFR-SEC-012 | Permission granularity | Resource-level | Fine-grained |

### Data Protection

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SEC-020 | Encryption in transit | TLS 1.2+, TLS 1.3 | Network security |
| NFR-SEC-021 | Encryption at rest | AES-256 | Storage security |
| NFR-SEC-022 | Key management | HSM, KMS | Key storage |
| NFR-SEC-023 | Data masking | PII, sensitive fields | Display security |

### Audit & Monitoring

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SEC-030 | Audit logging | All security events | Traceability |
| NFR-SEC-031 | Log retention | 90 days - 7 years | Compliance |
| NFR-SEC-032 | Intrusion detection | IDS/IPS | Threat detection |
| NFR-SEC-033 | Security monitoring | SIEM integration | Real-time alerts |

### Application Security

| ID | Requirement | Standard | Notes |
|----|-------------|----------|-------|
| NFR-SEC-040 | Input validation | OWASP guidelines | Injection prevention |
| NFR-SEC-041 | Output encoding | Context-aware | XSS prevention |
| NFR-SEC-042 | CSRF protection | Token-based | Request forgery |
| NFR-SEC-043 | Security headers | CSP, HSTS, etc. | Browser security |

---

## Reliability NFRs

### Availability

| ID | Requirement | Target | Downtime/Year |
|----|-------------|--------|---------------|
| NFR-REL-001 | 99% availability | Low criticality | 3.65 days |
| NFR-REL-002 | 99.9% availability | Standard | 8.76 hours |
| NFR-REL-003 | 99.99% availability | High criticality | 52.6 minutes |
| NFR-REL-004 | 99.999% availability | Mission critical | 5.26 minutes |

### Recovery

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-REL-010 | Recovery Time Objective (RTO) | Minutes to hours | Time to recover |
| NFR-REL-011 | Recovery Point Objective (RPO) | Seconds to hours | Data loss tolerance |
| NFR-REL-012 | Mean Time to Recovery (MTTR) | < 1 hour | Average recovery |

### Backup & Restore

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-REL-020 | Backup frequency | Hourly/Daily | Data protection |
| NFR-REL-021 | Backup retention | 30-365 days | History retention |
| NFR-REL-022 | Backup testing | Monthly | Verification |
| NFR-REL-023 | Geographic redundancy | Multi-region | Disaster recovery |

### Fault Tolerance

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-REL-030 | Failover capability | Automatic/Manual | Service continuity |
| NFR-REL-031 | Graceful degradation | Required | Partial functionality |
| NFR-REL-032 | Circuit breaker | Required | Cascade prevention |

---

## Usability NFRs

### Accessibility

| ID | Requirement | Standard | Notes |
|----|-------------|----------|-------|
| NFR-USE-001 | WCAG 2.1 Level A | Minimum | Basic accessibility |
| NFR-USE-002 | WCAG 2.1 Level AA | Recommended | Standard compliance |
| NFR-USE-003 | WCAG 2.1 Level AAA | Enhanced | Full accessibility |
| NFR-USE-004 | Section 508 | US Federal | Government requirement |

### Browser/Device Support

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-USE-010 | Desktop browsers | Chrome, Firefox, Safari, Edge | Latest 2 versions |
| NFR-USE-011 | Mobile browsers | Safari iOS, Chrome Android | Mobile support |
| NFR-USE-012 | Screen sizes | 320px - 4K | Responsive design |
| NFR-USE-013 | Touch support | Required for mobile | Input method |

### Internationalization

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-USE-020 | Language support | List languages | UI translations |
| NFR-USE-021 | RTL support | If needed | Arabic, Hebrew |
| NFR-USE-022 | Date/time formats | Locale-aware | Regional formats |
| NFR-USE-023 | Currency formats | Locale-aware | Regional formats |

### User Experience

| ID | Requirement | Target | Notes |
|----|-------------|--------|-------|
| NFR-USE-030 | Error messages | Clear, actionable | User guidance |
| NFR-USE-031 | Help documentation | Available | User support |
| NFR-USE-032 | Onboarding | Guided | New user experience |

---

## Scalability NFRs

### Horizontal Scaling

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SCA-001 | Auto-scaling | Required | Load-based scaling |
| NFR-SCA-002 | Stateless design | Required | Scale-out ready |
| NFR-SCA-003 | Load balancing | Required | Traffic distribution |

### Vertical Scaling

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SCA-010 | Resource limits | Defined | CPU, memory caps |
| NFR-SCA-011 | Resource allocation | Dynamic | Adjust as needed |

### Data Scaling

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-SCA-020 | Database scaling | Sharding, replication | Data distribution |
| NFR-SCA-021 | Cache scaling | Distributed cache | Performance |
| NFR-SCA-022 | Storage scaling | Object storage | File/blob storage |

---

## Maintainability NFRs

### Code Quality

| ID | Requirement | Target | Notes |
|----|-------------|--------|-------|
| NFR-MNT-001 | Test coverage | >80% | Code coverage |
| NFR-MNT-002 | Code review | Required | All changes |
| NFR-MNT-003 | Static analysis | Clean | No critical issues |
| NFR-MNT-004 | Documentation | Required | Code and API docs |

### Deployment

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-MNT-010 | CI/CD pipeline | Required | Automated deployment |
| NFR-MNT-011 | Deployment frequency | Daily/Weekly | Release cadence |
| NFR-MNT-012 | Rollback capability | Required | Revert changes |
| NFR-MNT-013 | Blue/green deployment | Recommended | Zero downtime |

### Monitoring

| ID | Requirement | Options | Notes |
|----|-------------|---------|-------|
| NFR-MNT-020 | Application monitoring | APM tool | Performance |
| NFR-MNT-021 | Infrastructure monitoring | Required | Resource usage |
| NFR-MNT-022 | Alerting | Required | Issue notification |
| NFR-MNT-023 | Log aggregation | Required | Centralized logs |

---

## Compliance NFRs

### Data Privacy

| ID | Regulation | Key Requirements |
|----|------------|------------------|
| NFR-CMP-001 | GDPR | Consent, right to erasure, data portability |
| NFR-CMP-002 | CCPA | Disclosure, opt-out, data access |
| NFR-CMP-003 | HIPAA | PHI protection, audit trails, encryption |
| NFR-CMP-004 | FERPA | Student data protection |

### Industry Standards

| ID | Standard | Key Requirements |
|----|----------|------------------|
| NFR-CMP-010 | PCI-DSS | Cardholder data protection |
| NFR-CMP-011 | SOC 2 | Security, availability, confidentiality |
| NFR-CMP-012 | SOX | Financial reporting controls |
| NFR-CMP-013 | FedRAMP | Federal cloud security |

### Data Retention

| ID | Requirement | Typical Values | Notes |
|----|-------------|----------------|-------|
| NFR-CMP-020 | Data retention period | Per regulation | Legal requirements |
| NFR-CMP-021 | Data deletion | Automated | Retention expiry |
| NFR-CMP-022 | Audit retention | 7 years typical | Compliance records |

---

## Quick Reference Matrix

| Domain | Key NFRs |
|--------|----------|
| E-commerce | PERF-030, SEC-020, REL-002, CMP-010 |
| Healthcare | SEC-020, SEC-030, REL-003, CMP-003 |
| Finance | SEC-001, REL-003, CMP-012, CMP-010 |
| SaaS | SCA-001, REL-002, MNT-010, CMP-011 |
| Mobile | PERF-030, USE-012, USE-010, SEC-001 |

---

*Catalog from IDPF-PRD Framework*
