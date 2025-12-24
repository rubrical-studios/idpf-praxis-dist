# Elicitation Worksheet - [Project Name]
**Version:** v0.2.0

**Extracted:** [Date]
**Method:** PRD Extraction (extract-prd Skill v1.0)

---

## 1. Extracted Features

### Feature: [Feature Name]

**ID:** FEAT-[NNN]
**Confidence:** High | Medium | Low

**Description:**
[Extracted from test description, docstring, or inferred]

**Evidence:**
- [ ] Test: `[test file:test name]`
- [ ] API: `[HTTP method] [route]`
- [ ] README: `[section reference]`
- [ ] Code: `[file:function]`

**Behaviors Detected:**
| Behavior | Source | Priority |
|----------|--------|----------|
| [behavior 1] | [test/code] | High/Medium/Low |
| [behavior 2] | [test/code] | High/Medium/Low |

**Status:**
- [ ] Confirmed - Accurate as extracted
- [ ] Modified - Needs refinement (see notes)
- [ ] Rejected - Not a real feature
- [ ] Merged - Combined with another feature

**Refinement Notes:**
[User notes for modification]

---

### Feature: [Feature Name]

**ID:** FEAT-[NNN]
**Confidence:** High | Medium | Low

[Repeat structure for each extracted feature]

---

## 2. Extracted Non-Functional Requirements

### Security Requirements

#### SEC-[NNN]: [NFR Title]

**Category:** Security
**Confidence:** High | Medium | Low

**Pattern Detected:**
```
[code snippet showing pattern]
```

**Inferred Requirement:**
[Description of NFR]

**Status:**
- [ ] Confirmed
- [ ] Modified
- [ ] Rejected

---

### Performance Requirements

#### PERF-[NNN]: [NFR Title]

**Category:** Performance
**Confidence:** High | Medium | Low

**Pattern Detected:**
```
[code snippet showing pattern]
```

**Inferred Requirement:**
[Description of NFR]

**Status:**
- [ ] Confirmed
- [ ] Modified
- [ ] Rejected

---

### Reliability Requirements

#### REL-[NNN]: [NFR Title]

**Category:** Reliability
**Confidence:** High | Medium | Low

**Pattern Detected:**
```
[code snippet showing pattern]
```

**Inferred Requirement:**
[Description of NFR]

**Status:**
- [ ] Confirmed
- [ ] Modified
- [ ] Rejected

---

### Observability Requirements

#### OBS-[NNN]: [NFR Title]

**Category:** Observability
**Confidence:** High | Medium | Low

**Pattern Detected:**
```
[code snippet showing pattern]
```

**Inferred Requirement:**
[Description of NFR]

**Status:**
- [ ] Confirmed
- [ ] Modified
- [ ] Rejected

---

## 3. API Endpoints Detected

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | /api/[resource] | [inferred] | Yes/No |
| POST | /api/[resource] | [inferred] | Yes/No |
| PUT | /api/[resource]/:id | [inferred] | Yes/No |
| DELETE | /api/[resource]/:id | [inferred] | Yes/No |

---

## 4. Constraints Detected

### Technical Constraints

| Constraint | Evidence | Impact |
|------------|----------|--------|
| [constraint] | [source] | [impact] |

### Dependency Constraints

| Dependency | Version Constraint | Reason |
|------------|-------------------|--------|
| [package] | [version spec] | [if known] |

---

## 5. Gaps Identified

### Missing Test Coverage

| Area | Observation |
|------|-------------|
| [area] | No tests found for [functionality] |

### Undocumented Features

| Feature | Evidence | Notes |
|---------|----------|-------|
| [feature] | [code location] | Found in code but no tests/docs |

---

## 6. Extraction Statistics

| Metric | Count |
|--------|-------|
| Features Extracted | [N] |
| NFRs Detected | [N] |
| API Endpoints | [N] |
| Test Files Analyzed | [N] |
| High Confidence Items | [N] |
| Medium Confidence Items | [N] |
| Low Confidence Items | [N] |

---

## 7. Refinement Checklist

**User Action Required:**

- [ ] Review each feature for accuracy
- [ ] Confirm or reject each NFR
- [ ] Add missing features not in code
- [ ] Provide business context for features
- [ ] Prioritize features (if not detected)
- [ ] Add constraints not evident in code
- [ ] Document dependencies between features

---

## 8. User Additions

### Additional Features (Not Extracted)

[User adds features that exist but weren't detected]

### Additional NFRs (Not Detected)

[User adds NFRs not evident in code patterns]

### Additional Context

[User provides business rationale, stakeholder needs, etc.]

---

**Status:** Draft - Requires User Validation

**Next Step:** Validate all items, add missing context, then proceed to Specification phase

---

**End of Elicitation Worksheet**
