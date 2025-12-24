# Domain Analysis Guide
**Version:** v0.15.0

**Purpose:** Help identify domain-specific patterns, requirements, and considerations during PRD development.

---

## How to Use This Guide

1. Identify your primary industry/domain
2. Review the domain profile for common patterns
3. Use suggested NFRs as starting points
4. Adapt terminology to your specific context

---

## Domain Profiles

### E-commerce / Retail

**Common Features:**
- Product catalog with search/filter
- Shopping cart and checkout
- User accounts and order history
- Payment processing
- Inventory management
- Shipping/fulfillment tracking
- Reviews and ratings
- Promotions and discounts

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Performance | Page load <3s, checkout <2s |
| Availability | 99.9% (especially during sales) |
| Security | PCI-DSS compliance |
| Scalability | Handle 10x traffic during sales |
| Data | Inventory consistency across channels |

**Common Integrations:**
- Payment gateways (Stripe, PayPal, Square)
- Shipping carriers (UPS, FedEx, USPS)
- Tax calculation services
- Email/SMS notifications
- Analytics platforms

**Compliance:** PCI-DSS (payment), GDPR/CCPA (customer data)

---

### Healthcare / Medical

**Common Features:**
- Patient registration and records
- Appointment scheduling
- Clinical documentation
- Prescription management
- Lab results integration
- Billing and insurance
- Patient portal
- Telemedicine

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Security | HIPAA compliance, encryption at rest |
| Audit | Complete audit trail of all access |
| Availability | 99.99% for critical systems |
| Access Control | Role-based, need-to-know |
| Data Retention | Per regulatory requirements |

**Common Integrations:**
- EHR/EMR systems (Epic, Cerner)
- Lab information systems
- Pharmacy systems
- Insurance verification
- HL7/FHIR interfaces

**Compliance:** HIPAA, HITECH, state regulations

---

### Finance / Banking

**Common Features:**
- Account management
- Transaction processing
- Balance inquiries
- Fund transfers
- Bill payment
- Statements and reports
- Fraud detection
- Customer notifications

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Security | Multi-factor authentication, encryption |
| Reliability | Transaction atomicity (ACID) |
| Audit | Complete transaction history |
| Availability | 99.99% for core banking |
| Performance | Real-time transaction processing |

**Common Integrations:**
- Core banking systems
- Payment networks (ACH, SWIFT)
- Credit bureaus
- Fraud detection services
- Regulatory reporting

**Compliance:** SOX, PCI-DSS, GLBA, state banking regulations

---

### SaaS / B2B Software

**Common Features:**
- Multi-tenant architecture
- User/organization management
- Role-based access control
- Subscription/billing
- API access
- Integrations marketplace
- Usage analytics
- Admin dashboard

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Availability | 99.9% SLA |
| Scalability | Horizontal scaling |
| Security | SOC 2 Type II compliance |
| Multi-tenancy | Data isolation |
| Performance | <200ms API response |

**Common Integrations:**
- Identity providers (Okta, Auth0)
- Payment/billing (Stripe, Chargebee)
- CRM systems (Salesforce)
- Communication (Slack, Teams)
- Analytics (Segment, Mixpanel)

**Compliance:** SOC 2, GDPR, industry-specific

---

### IoT / Connected Devices

**Common Features:**
- Device registration/provisioning
- Telemetry collection
- Remote monitoring
- Firmware updates
- Alerting/notifications
- Device management
- Data visualization
- Rule engine

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Reliability | Offline operation capability |
| Performance | Low latency for real-time |
| Scalability | Millions of devices |
| Security | Device authentication, TLS |
| Bandwidth | Efficient protocols (MQTT, CoAP) |

**Common Integrations:**
- Cloud IoT platforms (AWS IoT, Azure IoT)
- Time-series databases
- Message brokers (MQTT)
- Visualization tools
- Machine learning services

**Compliance:** Industry-specific (medical devices, automotive)

---

### Mobile / Consumer Apps

**Common Features:**
- User authentication
- Profile management
- Push notifications
- Offline capability
- Sync across devices
- In-app purchases
- Social features
- Analytics

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Performance | <100ms UI response |
| Offline | Core features work offline |
| Battery | Minimal battery drain |
| Size | App size optimization |
| Accessibility | WCAG mobile guidelines |

**Common Integrations:**
- Push notification services
- Analytics (Firebase, Amplitude)
- Payment (App Store, Google Play)
- Social login (Google, Apple, Facebook)
- Cloud storage

**Compliance:** App store guidelines, GDPR/CCPA

---

### Education / EdTech

**Common Features:**
- Course/content management
- User enrollment
- Progress tracking
- Assessments/quizzes
- Video streaming
- Discussion forums
- Certificates/badges
- Gradebook

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Accessibility | WCAG 2.1 AA |
| Availability | 99.9% during school hours |
| Scalability | Handle exam periods |
| Privacy | Student data protection |
| Video | Adaptive streaming |

**Common Integrations:**
- LMS platforms (Canvas, Blackboard)
- Video platforms (Vimeo, Wistia)
- Payment processors
- Single sign-on (SAML)
- Proctoring services

**Compliance:** FERPA, COPPA (K-12), accessibility laws

---

### Government / Public Sector

**Common Features:**
- Citizen services portal
- Form submission/processing
- Document management
- Case management
- Reporting/analytics
- Public records
- Notifications
- Multi-language support

**Typical NFRs:**
| Category | Requirement |
|----------|-------------|
| Accessibility | Section 508, WCAG 2.1 AA |
| Security | FedRAMP (federal), state standards |
| Availability | 99.9% for citizen services |
| Audit | Complete audit trails |
| Archival | Long-term data retention |

**Common Integrations:**
- Identity verification services
- Payment processors (Pay.gov)
- Document management
- GIS systems
- Legacy mainframes

**Compliance:** FedRAMP, Section 508, state/local regulations

---

## Domain Analysis Questions

### Universal Questions

1. **What is the primary domain?**
2. **What regulations apply?**
3. **Who are the end users?**
4. **What is the expected scale?**
5. **What systems must integrate?**

### Domain-Specific Questions

**E-commerce:**
- What payment methods needed?
- International or domestic only?
- Physical or digital products?

**Healthcare:**
- What PHI is handled?
- Integration with existing EHR?
- Telemedicine requirements?

**Finance:**
- What transaction types?
- Real-time or batch processing?
- Regulatory reporting needs?

**SaaS:**
- Single or multi-tenant?
- Self-service or sales-led?
- API-first requirements?

---

## Using Domain Patterns

1. **Start with domain profile** - Use as baseline
2. **Customize for context** - Add/remove based on specifics
3. **Verify with stakeholders** - Confirm assumptions
4. **Document deviations** - Note where you differ from patterns

---

*Guide from IDPF-PRD Framework*
