---
name: api-versioning
version: 1.0.0
description: Guide developers through API versioning strategies, deprecation workflows, and backward compatibility patterns
license: Complete terms in LICENSE.txt
---
# API Versioning
This Skill guides developers through API versioning strategies including URL-based, header-based, and content negotiation approaches, along with deprecation workflows and backward compatibility patterns.
## When to Use This Skill
Invoke this Skill when:
- Designing a new API that will evolve over time
- Planning breaking changes to an existing API
- Establishing deprecation policies
- Migrating clients between API versions
- Choosing between versioning strategies
## Why Version APIs?
APIs change over time. Without versioning, changes can break existing clients. The goal is to allow API evolution while maintaining backward compatibility, providing clear migration paths, minimizing client maintenance burden, and supporting multiple versions during transitions.
## Versioning Strategies
### 1. URL Path Versioning
Version in the URL path.
**Format:** `/api/v1/users`, `/api/v2/users`
**Pros:** Highly visible and explicit, easy to route and cache, simple client implementation, clear separation of versions
**Cons:** URL pollution, can't version individual resources differently, requires URL changes when upgrading
**Best for:** Public APIs, APIs with major version changes, simple versioning needs
### 2. Query Parameter Versioning
Version as query parameter.
**Format:** `/api/users?version=1`, `/api/users?api-version=2024-01-01`
**Pros:** Optional (can default), single URL structure, easy to add to existing APIs
**Cons:** Easy to miss, can interfere with caching, less explicit than path versioning
**Best for:** Optional versioning, date-based versions, gradual introduction
### 3. Header Versioning
Version in HTTP header.
**Format:** `GET /api/users` with `Accept-Version: v1` or `X-API-Version: 2`
**Pros:** Clean URLs, follows HTTP semantics, can version per-request
**Cons:** Harder to test in browser, less visible, requires header manipulation
**Best for:** Internal APIs, APIs where URL cleanliness matters, fine-grained versioning
### 4. Content Negotiation (Media Type)
Version in Accept/Content-Type header.
**Format:** `GET /api/users` with `Accept: application/vnd.company.users.v2+json`
**Pros:** RESTful approach, can version representations separately, supports multiple formats
**Cons:** Complex implementation, harder for clients, less intuitive
**Best for:** APIs following strict REST principles, APIs with multiple representation formats, enterprise environments
## Choosing a Strategy
**Decision Matrix:**
| Factor | URL Path | Query Param | Header | Media Type |
|--------|----------|-------------|--------|------------|
| Visibility | High | Medium | Low | Low |
| Simplicity | High | High | Medium | Low |
| RESTful | Medium | Low | Medium | High |
| Caching | Easy | Medium | Complex | Complex |
| Testing | Easy | Easy | Medium | Hard |
**Recommendations by Context:**
- **Public APIs:** URL path versioning (most discoverable, easiest for third-party developers)
- **Internal APIs:** Header versioning (cleaner URLs, more control)
- **Enterprise APIs:** Media type versioning (follows standards, maximum flexibility)
- **Simple APIs:** Query parameter (easy to add, low overhead)
## Version Numbering
### Semantic Versioning for APIs
```
MAJOR.MINOR.PATCH
MAJOR: Breaking changes
MINOR: Backward-compatible additions
PATCH: Backward-compatible fixes
```
**Example:** `v1.0.0` → Initial release, `v1.1.0` → Added new endpoint, `v1.1.1` → Fixed bug in response, `v2.0.0` → Changed response structure (breaking)
### Date-Based Versioning
```
YYYY-MM-DD or YYYY-MM
2024-01-01
2024-03
```
**When to use:** Frequent releases, rolling deprecation windows, Azure/AWS style APIs
### Simple Major Versioning
```
v1, v2, v3
```
**When to use:** Infrequent major changes, simple version lifecycle, clear breaking changes
## Backward Compatibility
### What to Maintain
**Safe changes (usually compatible):**
- Adding new endpoints
- Adding optional parameters
- Adding new response fields
- Adding new enum values (if client handles unknown)
**Breaking changes (require new version):**
- Removing endpoints
- Removing response fields
- Changing field types
- Renaming fields
- Changing required parameters
- Changing authentication
### Compatibility Patterns
**Additive changes:**
```json
// v1 response
{"id": 1, "name": "Alice"}
// v1.1 response (compatible - added field)
{"id": 1, "name": "Alice", "email": "alice@example.com"}
```
**Optional fields:**
```json
// Allow null/missing for backward compatibility
{
  "id": 1,
  "name": "Alice",
  "profile": null  // Optional, may not exist in v1 clients
}
```
**Enum extension:**
```json
// v1: status can be "active" or "inactive"
// v1.1: status can be "active", "inactive", or "pending"
// Clients should handle unknown values gracefully
```
## Deprecation Workflow
### Deprecation Lifecycle
```
Active → Deprecated → Sunset → Removed
1. Active: Fully supported
2. Deprecated: Announced, still works, migration encouraged
3. Sunset: Warning period, reduced support
4. Removed: No longer available
```
### Communication
**Announce deprecation:**
- Documentation updates
- API response headers
- Email/changelog notifications
- Minimum notice period (e.g., 6 months)
**Deprecation header:**
```
Deprecation: true
Sunset: Sat, 01 Jun 2025 00:00:00 GMT
Link: <https://api.example.com/docs/migration>; rel="deprecation"
```
### Migration Support
**During deprecation period:**
1. Provide migration guide
2. Offer parallel versions
3. Log deprecated endpoint usage
4. Send notifications to heavy users
5. Provide tooling if complex
### Timeline Example
```
Month 0:  Announce v1 deprecation, v2 released
Month 1:  Add deprecation headers to v1
Month 3:  Start warning notifications
Month 6:  Enter sunset period
Month 9:  Remove v1 (or extend if needed)
```
## Client Migration
### Migration Guide Template
```markdown
# Migration Guide: v1 to v2
## Overview
- v2 released: [date]
- v1 sunset: [date]
- v1 removal: [date]
## Breaking Changes
1. [Change description]
   - Before: [v1 behavior]
   - After: [v2 behavior]
   - Migration: [steps]
## New Features in v2
- [Feature 1]
- [Feature 2]
## Step-by-Step Migration
1. [Step 1]
2. [Step 2]
...
## FAQ
Q: [Common question]
A: [Answer]
```
### Gradual Migration
**Strategy: Shadow testing**
1. Client sends to v1
2. Server also sends to v2 internally
3. Compare responses
4. Log differences
5. When confident, switch client to v2
**Strategy: Feature flags**
```
// Client configuration
const API_VERSION = process.env.USE_V2_API ? 'v2' : 'v1';
```
## REST API Patterns
### Resource Versioning
**Version the API, not resources:**
```
/api/v1/users      ✓
/api/v1/products   ✓
/api/users/v1      ✗ (inconsistent)
```
**Exception: different resource evolution:**
```
// If one resource evolves differently
/api/v1/users
/api/v1/products
/api/v2/products   // Only products changed significantly
```
### Response Evolution
**Envelope pattern:**
```json
{
  "data": { ... },
  "meta": {
    "version": "1.2.0",
    "deprecated": false
  }
}
```
**Version in response:**
```json
{
  "apiVersion": "1",
  "data": { ... }
}
```
## GraphQL Patterns
### Schema Evolution
GraphQL naturally supports additive changes:
```graphql
# v1
type User {
  id: ID!
  name: String!
}
# v1.1 (compatible)
type User {
  id: ID!
  name: String!
  email: String  # New optional field
}
```
### Deprecating Fields
```graphql
type User {
  id: ID!
  name: String! @deprecated(reason: "Use fullName instead")
  fullName: String!
}
```
### Multiple Schemas
If breaking changes needed:
```
/graphql       # Current version
/graphql/v2    # New version with breaking changes
```
## Implementation Checklist
### Before Releasing Versioned API
- [ ] Versioning strategy chosen
- [ ] Version numbering scheme defined
- [ ] Documentation includes version information
- [ ] Deprecation policy documented
- [ ] Client SDKs version-aware
### When Deprecating
- [ ] Deprecation announced
- [ ] Migration guide written
- [ ] Deprecation headers added
- [ ] Sunset date set
- [ ] Usage monitoring in place
### When Removing
- [ ] All clients migrated (or accepted)
- [ ] Logs show minimal traffic
- [ ] Final notifications sent
- [ ] Old version documentation archived
- [ ] Redirects or error messages in place
## Resources
See `resources/` directory for:
- `strategy-comparison.md` - Detailed strategy analysis
- `deprecation-workflow.md` - Step-by-step deprecation process
- `compatibility-guide.md` - Backward compatibility patterns
## Relationship to Other Skills
**Complements:**
- `error-handling-patterns` - API error responses
- `postgresql-integration` - Backend data evolution
**Independent from:**
- TDD skills - This skill focuses on API design, not testing
## Expected Outcome
After using this skill:
- API versioning strategy selected and documented
- Version numbering scheme established
- Deprecation policy defined
- Migration workflow understood
- Backward compatibility patterns applied
---
**End of API Versioning Skill**
