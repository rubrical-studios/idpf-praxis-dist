# Stakeholder Mapping Guide
**Version:** v0.5.0

**Purpose:** Identify and categorize all stakeholders involved in product development.

---

## Why Stakeholder Mapping Matters

- Ensures all perspectives are considered
- Identifies decision-makers and influencers
- Prevents missed requirements
- Establishes communication channels
- Clarifies approval workflows

---

## Stakeholder Categories

### 1. End Users (Primary Stakeholders)

**Definition:** People who directly use the product.

| Role Type | Description | Example |
|-----------|-------------|---------|
| Primary User | Main daily users | Customers, employees |
| Secondary User | Occasional users | Managers, supervisors |
| Indirect User | Affected by system | Recipients of reports |

**Questions to Ask:**
- Who will use this system daily?
- Who will use it occasionally?
- Who receives outputs from the system?
- What are their technical skill levels?
- What are their primary pain points?

### 2. Business Stakeholders

**Definition:** People with business interest in the product's success.

| Role | Responsibilities | Typical Authority |
|------|------------------|-------------------|
| Executive Sponsor | Funding, strategic direction | Budget approval |
| Product Owner | Requirements, priorities | Feature decisions |
| Business Analyst | Requirements gathering | Requirement details |
| Department Heads | Domain expertise | Domain sign-off |

**Questions to Ask:**
- Who is funding this project?
- Who owns the product vision?
- Who defines success metrics?
- Who approves requirements?

### 3. Technical Stakeholders

**Definition:** People responsible for building and maintaining the product.

| Role | Responsibilities | Typical Authority |
|------|------------------|-------------------|
| Technical Lead | Architecture, design | Technical decisions |
| Development Team | Implementation | Implementation details |
| QA Lead | Testing strategy | Quality standards |
| DevOps/SRE | Operations, deployment | Infrastructure |
| Security Team | Security requirements | Security standards |

**Questions to Ask:**
- Who designs the architecture?
- Who implements features?
- Who ensures quality?
- Who manages deployment?
- Who handles security?

### 4. External Stakeholders

**Definition:** People outside the organization with interest in the product.

| Role Type | Description | Example |
|-----------|-------------|---------|
| Customers | Pay for product | B2B clients |
| Partners | Integrate with product | API consumers |
| Regulators | Enforce compliance | Auditors, agencies |
| Vendors | Provide services | Cloud providers |

**Questions to Ask:**
- Who are our customers?
- Who integrates with us?
- What regulatory bodies apply?
- What vendors do we depend on?

---

## RACI Matrix

Use RACI to clarify responsibilities:

- **R**esponsible: Does the work
- **A**ccountable: Makes final decision (only one per item)
- **C**onsulted: Provides input
- **I**nformed: Kept updated

### Template

| Decision/Deliverable | Sponsor | Product Owner | Tech Lead | Dev Team | QA |
|---------------------|---------|---------------|-----------|----------|-----|
| Requirements approval | I | A | C | C | C |
| Technical architecture | I | C | A | R | C |
| Feature prioritization | C | A | C | I | I |
| Quality standards | I | C | C | R | A |
| Release approval | A | R | C | I | C |

---

## Stakeholder Analysis Matrix

### Power/Interest Grid

```
                    Interest
                Low         High
           ┌──────────┬──────────┐
    High   │  Keep    │  Manage  │
           │ Satisfied│  Closely │
Power      ├──────────┼──────────┤
           │  Monitor │   Keep   │
    Low    │  (Min)   │ Informed │
           └──────────┴──────────┘
```

| Quadrant | Strategy | Actions |
|----------|----------|---------|
| High Power, High Interest | Manage Closely | Regular engagement, involve in decisions |
| High Power, Low Interest | Keep Satisfied | Periodic updates, consult on major decisions |
| Low Power, High Interest | Keep Informed | Regular communication, address concerns |
| Low Power, Low Interest | Monitor | Minimal communication, general updates |

### Template

| Stakeholder | Power | Interest | Strategy | Communication |
|-------------|-------|----------|----------|---------------|
| [Name/Role] | H/M/L | H/M/L | [Strategy] | [Frequency/Method] |

---

## Communication Plan

### By Stakeholder Type

| Stakeholder Type | Frequency | Method | Content |
|------------------|-----------|--------|---------|
| Executive Sponsor | Weekly | Email/Meeting | Status, risks, decisions |
| Product Owner | Daily | Standup/Chat | Progress, blockers |
| Development Team | Daily | Standup | Tasks, dependencies |
| End Users | As needed | Surveys/Interviews | Feedback, validation |
| External Partners | Weekly | Email | Integration updates |

---

## Stakeholder Registry Template

### Stakeholder Profile

```
Name: ________________________
Role: ________________________
Organization: ________________________
Category: [ ] End User [ ] Business [ ] Technical [ ] External

Contact Information:
- Email: ________________________
- Phone: ________________________
- Preferred Method: ________________________

Influence:
- Power Level: [ ] High [ ] Medium [ ] Low
- Interest Level: [ ] High [ ] Medium [ ] Low
- Engagement Strategy: ________________________

Requirements Input:
- Primary concerns: ________________________
- Success criteria: ________________________
- Key constraints: ________________________

Communication:
- Frequency: ________________________
- Format: ________________________
- Key messages: ________________________
```

---

## Common Stakeholder Identification Techniques

### 1. Brainstorming
- List all possible stakeholders
- Include obvious and non-obvious
- Consider "who cares if this fails?"

### 2. Organizational Chart Review
- Walk org chart systematically
- Identify affected departments
- Find hidden stakeholders

### 3. Process Mapping
- Map current business processes
- Identify touchpoints
- Find process owners

### 4. Document Review
- Review existing documentation
- Check previous project stakeholders
- Review compliance requirements

### 5. Stakeholder Referrals
- Ask "who else should I talk to?"
- Follow the chain of influence
- Validate completeness

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Forgetting end users | Build wrong product | Include user research |
| Ignoring operations | Deployment issues | Include DevOps/SRE |
| Missing compliance | Regulatory failure | Include legal/compliance |
| Single point of contact | Biased requirements | Multiple stakeholders |
| No executive sponsor | Lack of authority | Identify and engage |

---

## Checklist

- [ ] All end user types identified
- [ ] Business stakeholders mapped
- [ ] Technical stakeholders included
- [ ] External stakeholders considered
- [ ] RACI matrix complete
- [ ] Power/Interest analysis done
- [ ] Communication plan defined
- [ ] Contact information collected

---

*Guide from IDPF-PRD Framework*
