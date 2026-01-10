# Skill: promote-to-prd
**Version:** v0.23.0

**Purpose:** Transform proposals into detailed PRD documents using Inception/ context
**Load with:** Anti-Hallucination-Rules-for-PRD-Work.md

## Overview

Transforms a proposal document into a detailed Product Requirements Document (PRD). Uses Inception/ artifacts as context to validate scope alignment and generate targeted clarifying questions.

**Key Principle:** Proposals capture the "what and why" at a high level. PRDs add the "how" with user stories, acceptance criteria, and prioritized requirements.

**Replaces:** IDPF-PRD 4-phase workflow

## When to Use

- Proposal approved and ready for implementation planning
- Need detailed requirements before Create-Backlog
- Want to validate proposal fits current charter scope

## Command

`/prd promote <proposal-path>`

## Process Flow

### Phase 1: Load Context

| File | Purpose | Required |
|------|---------|----------|
| `<proposal-path>` | The proposal to promote | Yes |
| `CHARTER.md` | Project vision | If exists |
| `Inception/Scope-Boundaries.md` | In-scope/out-of-scope | If exists |
| `Inception/Constraints.md` | Constraints | If exists |
| `Inception/Architecture.md` | System architecture | If exists |

### Phase 2: Validate Against Charter

| Check | Action if Misaligned |
|-------|---------------------|
| Fits in-scope | Continue |
| Outside scope | Ask: "Expand scope?" |
| Conflicts with constraints | Flag conflict |

### Phase 3: Analyze Proposal Gaps

| Element | Gap Action |
|---------|------------|
| Problem statement | Ask if missing |
| User stories | Generate questions |
| Acceptance criteria | Generate questions |
| Priority | Ask if missing |

### Phase 4: Dynamic Question Generation

**Question Categories:**
- Users, Workflow, Done criteria, Constraints, Priority, Edge cases, Dependencies

**Rules:**
1. Context-aware
2. Minimal - only ask what's missing
3. Specific
4. Actionable

### Phase 5: Generate PRD

Create `PRD/PRD-<name>.md`:

```markdown
# PRD: <Feature Name>

**Status:** Draft
**Source Proposal:** <proposal-path>

## Overview
## User Stories
### Story 1: <Title>
**As a** <user type>
**I want** <capability>
**So that** <benefit>

**Acceptance Criteria:**
- [ ] <criterion 1>

## Requirements
### P0 - Critical
### P1 - High
### P2 - Medium

## Technical Considerations
## Out of Scope
## Dependencies
## Open Questions
```

### Phase 6: Next Steps

After PRD generation, prompt for Create-Backlog.

## Quality Checklist

- [ ] All user stories have acceptance criteria
- [ ] Requirements are prioritized (P0-P2)
- [ ] Out of scope is explicitly stated
- [ ] Open questions are flagged
- [ ] PRD is Create-Backlog compatible

---

**End of promote-to-prd Skill**
