# Skill: promote-to-prd
**Version:** v0.22.0
**Source:** Skills/promote-to-prd/SKILL.md

**Purpose:** Transform proposals into detailed PRD documents using Inception/ context
**Audience:** Developers promoting approved proposals to actionable requirements
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md
## Overview
Transforms a proposal document into a detailed Product Requirements Document (PRD). Uses Inception/ artifacts as context to validate scope alignment and generate targeted clarifying questions.
**Key Principle:** Proposals capture the "what and why" at a high level. PRDs add the "how" with user stories, acceptance criteria, and prioritized requirements.
**Replaces:** IDPF-PRD 4-phase workflow
## When to Use
- Proposal approved and ready for implementation planning
- Need detailed requirements before Create-Backlog
- Want to validate proposal fits current charter scope
- Need user stories and acceptance criteria from high-level idea
## Skill Command
`/prd promote <proposal-path>` - Transform proposal into PRD
## Process Flow
### Phase 1: Load Context
| File | Purpose | Required |
|------|---------|----------|
| `<proposal-path>` | The proposal to promote | Yes |
| `CHARTER.md` | Project vision and current focus | If exists |
| `Inception/Scope-Boundaries.md` | In-scope/out-of-scope items | If exists |
| `Inception/Constraints.md` | Technical/business constraints | If exists |
### Phase 2: Validate Against Charter
| Check | Action if Misaligned |
|-------|---------------------|
| Fits in-scope items | Continue |
| Outside current scope | Ask: "Expand scope?" |
| Conflicts with constraints | Flag conflict, ask for resolution |
### Phase 3: Analyze Proposal Gaps
| Element | Gap Action |
|---------|------------|
| Problem statement | Ask if missing |
| Proposed solution | Ask if missing |
| User stories | Generate questions |
| Acceptance criteria | Generate questions |
| Priority | Ask if missing |
### Phase 4: Dynamic Question Generation
Questions are tailored to this specific proposal, not from a static bank.
**Question Categories:** Users, Workflow, Done criteria, Constraints, Priority, Edge cases, Dependencies
**Rules:** Context-aware, minimal, specific, actionable. Present 3-5 at a time.
### Phase 5: Generate PRD
Creates PRD document in `PRD/PRD-<name>.md` with:
- Overview (from proposal)
- User Stories with Acceptance Criteria
- Requirements (P0-P2 prioritized)
- Technical Considerations (aligned with Architecture)
- Out of Scope
- Dependencies
- Open Questions
### Phase 6: Next Steps
After PRD generation: Review/edit, run Create-Backlog to generate issues, assign to release.
## Integration
| Component | Integration |
|-----------|-------------|
| **Proposals** | Input: `Proposal/<name>.md` |
| **Inception/** | Context: Scope, constraints, architecture |
| **PRD/** | Output: `PRD/PRD-<name>.md` |
| **Create-Backlog** | Downstream: Generates issues from PRD |
| **extract-prd** | Complementary: Extracts from code |
## Quality Checklist
- [ ] All user stories have acceptance criteria
- [ ] Requirements are prioritized (P0-P2)
- [ ] Technical considerations align with architecture
- [ ] Out of scope is explicitly stated
- [ ] Open questions are flagged
- [ ] PRD is Create-Backlog compatible
---
**End of promote-to-prd Skill**
