---
name: api-versioning
description: Guide developers through API versioning strategies, deprecation workflows, and backward compatibility patterns
license: Complete terms in LICENSE.txt
---

# API Versioning
**Version:** v0.23.0

## When to Use

- Designing a new API that will evolve over time
- Planning breaking changes to an existing API
- Establishing deprecation policies
- Migrating clients between API versions
- Choosing between versioning strategies

## Versioning Strategies

### 1. URL Path Versioning
```
/api/v1/users
/api/v2/users
```
**Best for:** Public APIs, major version changes

### 2. Query Parameter Versioning
```
/api/users?version=1
/api/users?api-version=2024-01-01
```
**Best for:** Optional versioning, date-based versions

### 3. Header Versioning
```
GET /api/users
Accept-Version: v1
```
**Best for:** Internal APIs, clean URLs

### 4. Content Negotiation (Media Type)
```
GET /api/users
Accept: application/vnd.company.users.v2+json
```
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

### Semantic Versioning
```
MAJOR.MINOR.PATCH
MAJOR: Breaking changes
MINOR: Backward-compatible additions
PATCH: Backward-compatible fixes
```

### Date-Based Versioning
```
YYYY-MM-DD or YYYY-MM
```

## Backward Compatibility

**Safe changes:**
- Adding new endpoints
- Adding optional parameters
- Adding new response fields

**Breaking changes (require new version):**
- Removing endpoints
- Removing response fields
- Changing field types
- Renaming fields
- Changing required parameters

## Deprecation Workflow

```
Active -> Deprecated -> Sunset -> Removed
```

**Deprecation header:**
```
Deprecation: true
Sunset: Sat, 01 Jun 2025 00:00:00 GMT
Link: <https://api.example.com/docs/migration>; rel="deprecation"
```

### Timeline Example
```
Month 0:  Announce v1 deprecation, v2 released
Month 1:  Add deprecation headers to v1
Month 6:  Enter sunset period
Month 9:  Remove v1
```

## Implementation Checklist

### Before Releasing Versioned API
- [ ] Versioning strategy chosen
- [ ] Version numbering scheme defined
- [ ] Deprecation policy documented
- [ ] Client SDKs version-aware

### When Deprecating
- [ ] Migration guide written
- [ ] Deprecation headers added
- [ ] Sunset date set
- [ ] Usage monitoring in place

## Resources

- `resources/strategy-comparison.md`
- `resources/deprecation-workflow.md`
- `resources/compatibility-guide.md`

---

**End of API Versioning Skill**
