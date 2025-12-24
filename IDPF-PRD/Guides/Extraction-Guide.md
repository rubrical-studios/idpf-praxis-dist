# PRD Extraction Guide
**Version:** v0.5.0

**Purpose:** Step-by-step guide for extracting a PRD from existing code
**Audience:** Developers documenting legacy or undocumented projects

---

## Overview

PRD Extraction reverse-engineers requirements documentation from working code. Use this when you have a codebase without formal requirements and need to create a PRD for:

- Legacy project documentation
- Team onboarding
- Pre-LTS baseline
- Compliance requirements
- Transitioning to structured development

---

## Prerequisites

Before starting extraction:

1. **Access to source code** - Full repository access
2. **Test files exist** - Tests are the primary extraction source
3. **Build/run capability** - Helps validate extracted features
4. **Stakeholder availability** - For refinement phase

---

## Quick Start

```
User: "Reverse-PRD-Start"
```

The ASSISTANT will:
1. Scan the codebase structure
2. Detect technology stack
3. Begin the extraction workflow

---

## Step-by-Step Workflow

### Step 1: Initialize Extraction

**Command:** `Reverse-PRD-Start`

**What happens:**
- ASSISTANT scans directory structure
- Identifies project type (web app, API, CLI, etc.)
- Detects language, framework, and database
- Reports initial analysis

**Example output:**
```
PRD Extraction Initialized

Project Analysis:
- Type: REST API
- Language: Python 3.11
- Framework: FastAPI
- Database: PostgreSQL
- Test Framework: pytest (45 test files)

Ready to proceed with extraction.
```

### Step 2: Analyze Structure

**Command:** `Reverse-PRD-Analyze`

**What happens:**
- Maps key directories and their purposes
- Identifies API endpoints
- Detects authentication patterns
- Lists external integrations

**Review the analysis:**
- Is the architecture assessment correct?
- Are all components identified?
- Any missing integrations?

### Step 3: Extract Requirements

**Command:** `Reverse-PRD-Extract`

**What happens:**
- Parses all test files for feature descriptions
- Extracts API endpoints and operations
- Detects NFRs from code patterns
- Generates draft worksheets

**Output files:**
- `Discovery-Worksheet-[Project].md` - Project overview, tech stack
- `Elicitation-Worksheet-[Project].md` - Features and NFRs

**Example extraction summary:**
```
Extraction Complete

Features Extracted: 12
- User Registration (High confidence)
- Authentication (High confidence)
- Profile Management (Medium confidence)
- ...

NFRs Detected: 8
- SEC-001: Password hashing (bcrypt)
- PERF-001: Response caching (Redis)
- REL-001: Retry logic (3 attempts)
- ...

API Endpoints: 24
- POST /api/users
- GET /api/users/:id
- ...
```

### Step 4: Refine Extracted Content

**Command:** `Reverse-PRD-Refine`

**Interactive process:**

For each extracted feature:
```
Feature: User Registration
Source: tests/test_users.py:23
Confidence: High

Description: User can create account with email and password

Evidence:
- Test: "test_user_can_register_with_valid_email"
- API: POST /api/users
- README: "User registration system"

[C]onfirm / [M]odify / [R]eject / [S]kip?
```

**Your actions:**
- **Confirm** - Feature is accurate as described
- **Modify** - Edit description or add context
- **Reject** - Not a real feature (false positive)
- **Skip** - Review later

**Add missing context:**
- Business rationale (why this feature exists)
- Priority (High/Medium/Low)
- Dependencies between features
- Stakeholder information

### Step 5: Generate PRD

**Command:** `Generate-PRD`

**Process:**
1. Select template (Structured or Agile)
2. ASSISTANT assembles validated content
3. Outputs `PRD-[ProjectName].md`

**PRD is ready for:**
- IDPF-Structured (with REQ-IDs)
- IDPF-Agile (with User Stories)

---

## Best Practices

### Before Extraction

1. **Run tests first** - Ensure tests pass to validate extraction
2. **Review README** - Provides context for extraction
3. **Check for existing docs** - May inform refinement

### During Extraction

1. **Don't skip refinement** - Extraction is a draft
2. **Add business context** - Code doesn't capture "why"
3. **Validate with stakeholders** - They know intent

### After Extraction

1. **Review for gaps** - What's missing from code?
2. **Prioritize features** - Not all are equal
3. **Add NFRs not in code** - Business requirements

---

## Confidence Levels Explained

| Level | Meaning | Example | Action |
|-------|---------|---------|--------|
| **High** | Multiple sources confirm | Test + API + README all mention feature | Quick verify |
| **Medium** | Single strong source | Only in tests, but explicit | Review carefully |
| **Low** | Inferred from patterns | NFR detected from code pattern | Validate thoroughly |

---

## Common Extraction Sources

### Tests (Highest Value)

| Framework | Pattern | Extraction |
|-----------|---------|------------|
| pytest | `def test_feature_behavior()` | Feature + Behavior |
| Jest | `describe('Feature', () => { it('behavior') })` | Nested hierarchy |
| JUnit | `@DisplayName("behavior")` | Explicit description |
| RSpec | `describe/context/it` blocks | Rich context |

### API Routes

| Pattern | Extraction |
|---------|------------|
| `GET /api/users` | Read users feature |
| `POST /api/orders` | Create orders feature |
| `DELETE /api/items/:id` | Delete item feature |

### Configuration

| Pattern | Inferred NFR |
|---------|--------------|
| `rateLimit: 100` | PERF: Rate limiting |
| `bcrypt.hash()` | SEC: Password hashing |
| `cache.ttl: 3600` | PERF: 1-hour caching |

---

## Troubleshooting

### Few Features Extracted

**Causes:**
- Limited test coverage
- Tests don't have descriptive names
- Non-standard test patterns

**Solutions:**
- Add features manually in refinement
- Review code files for functionality
- Check README for feature list

### Many False Positives

**Causes:**
- Helper/utility tests included
- Test patterns misinterpreted
- Overly aggressive pattern matching

**Solutions:**
- Reject during refinement
- Focus on High confidence items
- Skip Low confidence for manual review

### Missing NFRs

**Causes:**
- NFRs implemented without patterns
- Custom implementations
- Configuration-based NFRs

**Solutions:**
- Add manually during refinement
- Review configuration files
- Check infrastructure code

---

## Example: Full Extraction Session

```
User: Reverse-PRD-Start

ASSISTANT:
Scanning codebase...

Project: e-commerce-api
Type: REST API
Stack: Node.js + Express + PostgreSQL
Tests: 67 files (Jest)

Ready to extract.

---

User: Reverse-PRD-Extract

ASSISTANT:
Extracting from tests...
Parsing API routes...
Detecting NFRs...

Features Extracted: 15
- Product Catalog (High)
- Shopping Cart (High)
- User Authentication (High)
- Order Processing (High)
- Payment Integration (Medium)
- Inventory Management (Medium)
...

NFRs Detected: 11
- SEC-001: JWT Authentication
- SEC-002: Input Validation
- PERF-001: Redis Caching
- PERF-002: Pagination
- REL-001: Transaction Support
...

Worksheets generated.

---

User: Reverse-PRD-Refine

ASSISTANT:
Feature 1/15: Product Catalog

Description: Users can browse and search products
Source: tests/products.test.js
Confidence: High

Evidence:
- Test: "should list all products"
- Test: "should search products by name"
- API: GET /api/products
- API: GET /api/products/search

[C]onfirm / [M]odify / [R]eject?

User: C

ASSISTANT: Confirmed. Feature 2/15...

[Continue through all features]

---

User: Generate-PRD

ASSISTANT:
Template: Structured (fixed requirements)

Generating PRD...

PRD-ECommerceAPI.md created with:
- 15 requirements (REQ-001 through REQ-015)
- 11 NFRs documented
- Acceptance criteria from tests
- Testing approach: TDD

Ready for IDPF-Structured development.
```

---

## Related Resources

- `Skills/extract-prd/SKILL.md` - Full skill documentation
- `Skills/extract-prd/resources/test-parsing-guide.md` - Test parsing details
- `Skills/extract-prd/resources/nfr-detection-guide.md` - NFR pattern reference
- `IDPF-PRD/IDPF-PRD.md` - Full framework reference

---

**End of Guide**
