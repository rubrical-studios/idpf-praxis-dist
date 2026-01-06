# Generation Checklist
**Version:** v0.22.0

**Project Name:** _______________________
**Date:** _______________________

---

## Pre-Generation Verification

### Discovery Phase Complete
- [ ] Domain analysis documented
- [ ] Stakeholders identified and mapped
- [ ] Vision statement defined
- [ ] Success metrics established
- [ ] Scope boundaries clear

### Elicitation Phase Complete
- [ ] All functional requirements captured
- [ ] NFRs identified and prioritized
- [ ] Constraints documented
- [ ] Risks identified with mitigations
- [ ] Assumptions documented
- [ ] Dependencies mapped

### Specification Phase Complete
- [ ] All requirements have detailed specifications
- [ ] Acceptance criteria defined (Given/When/Then format)
- [ ] Edge cases identified
- [ ] NFRs have measurable specifications
- [ ] Testing approach selected
- [ ] Traceability matrix complete

---

## Template Selection

### Project Characteristics

**Requirements Stability:**
- [ ] Well-defined requirements -> Agile template
- [ ] Expected to evolve -> Agile template with iterative refinement
- [ ] Unknown/exploratory -> Consider IDPF-Vibe first

**Process Formality:**
- [ ] Formal, compliance-driven -> Agile-Comprehensive template
- [ ] Standard development -> Agile-Lightweight template
- [ ] Lightweight, iterative -> Agile-Lightweight template

**Team Size:**
- [ ] Solo/small team → Any template
- [ ] Large team → Comprehensive or Agile

### Selected Template

- [ ] PRD-Agile-Comprehensive.md
- [ ] PRD-Agile-Lightweight.md

**Template Location:** `PRD/Templates/[selected-template].md`

---

## PRD Assembly Checklist

### Document Header
- [ ] Project name
- [ ] Version number (1.0)
- [ ] Date
- [ ] Author(s)
- [ ] Status (Draft → Review → Approved)

### Executive Summary
- [ ] Problem statement
- [ ] Solution overview
- [ ] Key stakeholders
- [ ] Success criteria

### Scope Section
- [ ] In scope items listed
- [ ] Out of scope items listed
- [ ] Assumptions documented

### Requirements Section
- [ ] All REQ-IDs assigned
- [ ] Descriptions complete
- [ ] Acceptance criteria included
- [ ] Priority assigned to each
- [ ] Dependencies noted

### NFR Section
- [ ] Performance requirements
- [ ] Security requirements
- [ ] Reliability requirements
- [ ] Usability requirements
- [ ] Compliance requirements

### Constraints Section
- [ ] Technical constraints
- [ ] Business constraints
- [ ] Resource constraints

### Testing Section
- [ ] Testing approach documented
- [ ] TDD confirmation
- [ ] ATDD/BDD selection (if applicable)
- [ ] Test framework specified

---

## Framework Handoff Preparation

### For IDPF-Agile
- [ ] Features mapped to potential Epics
- [ ] Capabilities mapped to potential Stories
- [ ] Sprint 0 planning ready
- [ ] Backlog creation can begin

---

## Final Verification

### Quality Checks
- [ ] No conflicting requirements
- [ ] No missing dependencies
- [ ] All NFRs are measurable
- [ ] Acceptance criteria are testable
- [ ] No TBD/placeholder content remaining

### Stakeholder Review
- [ ] Technical review complete
- [ ] Business review complete
- [ ] Sign-off obtained (if required)

---

## Output

### Generated PRD
**Filename:** `PRD-[ProjectName].md`
**Location:** `PRD/PRD-[ProjectName].md`
**Status:** [ ] Draft [ ] In Review [ ] Approved

### Next Steps
1. [ ] Copy PRD to project's PRD/ directory
2. [ ] Begin IDPF-Agile development phase

---

## Handoff Statement

**This PRD is ready for:**
- [ ] IDPF-Agile development (iterative, sprint-based)

**Starting Point:**
- Create backlog from PRD, begin Sprint 0

**Facilitator Signature:** _______________________
**Date:** _______________________

---

*Template from IDPF-PRD Framework*
