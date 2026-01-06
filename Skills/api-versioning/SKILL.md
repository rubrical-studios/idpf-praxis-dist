---
name: api-versioning
description: Guide developers through API versioning strategies, deprecation workflows, and backward compatibility patterns
license: Complete terms in LICENSE.txt
---
# API Versioning
**Version:** v0.22.0
**Source:** Skills/api-versioning/SKILL.md

This Skill guides developers through API versioning strategies including URL-based, header-based, and content negotiation approaches, along with deprecation workflows and backward compatibility patterns.
## When to Use This Skill
Invoke this Skill when:
- Designing a new API that will evolve over time
- Planning breaking changes to an existing API
- Establishing deprecation policies
- Migrating clients between API versions
- Choosing between versioning strategies
## Versioning Strategies
### 1. URL Path Versioning
Version in the URL path: `/api/v1/users`, `/api/v2/users`
**Pros:** Highly visible, easy to route/cache, simple client implementation
**Cons:** URL pollution, can't version individual resources differently
**Best for:** Public APIs, major version changes
### 2. Query Parameter Versioning
Version as query parameter: `/api/users?version=1`
**Pros:** Optional (can default), single URL structure
**Cons:** Easy to miss, can interfere with caching
**Best for:** Optional versioning, date-based versions
### 3. Header Versioning
Version in HTTP header: `Accept-Version: v1` or `X-API-Version: 2`
**Pros:** Clean URLs, follows HTTP semantics
**Cons:** Harder to test in browser, less visible
**Best for:** Internal APIs, fine-grained versioning
### 4. Content Negotiation (Media Type)
Version in Accept header: `Accept: application/vnd.company.users.v2+json`
**Pros:** RESTful approach, supports multiple formats
**Cons:** Complex implementation, harder for clients
**Best for:** Strict REST, enterprise environments
## Decision Matrix
| Factor | URL Path | Query Param | Header | Media Type |
|--------|----------|-------------|--------|------------|
| Visibility | High | Medium | Low | Low |
| Simplicity | High | High | Medium | Low |
| RESTful | Medium | Low | Medium | High |
| Caching | Easy | Medium | Complex | Complex |
| Testing | Easy | Easy | Medium | Hard |
## Version Numbering
**Semantic Versioning:** `MAJOR.MINOR.PATCH` - MAJOR for breaking changes, MINOR for additions, PATCH for fixes
**Date-Based:** `YYYY-MM-DD` - For frequent releases, rolling deprecation windows
**Simple Major:** `v1, v2, v3` - For infrequent major changes
## Backward Compatibility
**Safe changes:** Adding new endpoints, optional parameters, new response fields, new enum values
**Breaking changes:** Removing endpoints/fields, changing field types, renaming fields, changing required parameters
## Deprecation Workflow
**Lifecycle:** Active -> Deprecated -> Sunset -> Removed
**Communication:** Documentation updates, API response headers, email/changelog notifications, minimum notice period
**Deprecation header:** `Deprecation: true`, `Sunset: Sat, 01 Jun 2025 00:00:00 GMT`
## Implementation Checklist
### Before Releasing
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
## Resources
See `resources/` directory for detailed guides on strategy comparison, deprecation workflow, and compatibility patterns.
## Relationship to Other Skills
**Complements:** `error-handling-patterns`, `postgresql-integration`
**Independent from:** TDD skills
## Expected Outcome
After using this skill: API versioning strategy selected, version numbering established, deprecation policy defined, migration workflow understood, backward compatibility patterns applied.
---
**End of API Versioning Skill**
