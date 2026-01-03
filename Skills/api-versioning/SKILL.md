---
name: api-versioning
description: Guide developers through API versioning strategies, deprecation workflows, and backward compatibility patterns
license: Complete terms in LICENSE.txt
---

# API Versioning
**Version:** 0.17.0

## When to Use
- Designing evolving APIs
- Planning breaking changes
- Establishing deprecation policies
- Migrating clients between versions

## Versioning Strategies

### 1. URL Path (Recommended for Public)
```
/api/v1/users
/api/v2/users
```
**Pros:** Visible, easy routing/caching | **Cons:** URL pollution

### 2. Query Parameter
```
/api/users?version=1
```
**Pros:** Optional, easy to add | **Cons:** Less explicit

### 3. Header
```
Accept-Version: v1
```
**Pros:** Clean URLs | **Cons:** Harder to test

### 4. Media Type
```
Accept: application/vnd.company.users.v2+json
```
**Pros:** RESTful | **Cons:** Complex

## Decision Matrix
| Factor | URL | Query | Header | Media |
|--------|:---:|:-----:|:------:|:-----:|
| Visibility | High | Med | Low | Low |
| Simplicity | High | High | Med | Low |
| Caching | Easy | Med | Hard | Hard |

## Version Numbering
**Semantic:** `MAJOR.MINOR.PATCH` (breaking.additions.fixes)
**Date-based:** `2024-01-01` (frequent releases)
**Simple:** `v1, v2, v3` (infrequent changes)

## Backward Compatibility

**Safe changes:**
- Adding endpoints, optional parameters, new response fields

**Breaking changes (require new version):**
- Removing endpoints/fields, changing types, renaming fields

## Deprecation Lifecycle
```
Active → Deprecated → Sunset → Removed
```

**Communication:**
- Documentation updates
- Deprecation headers: `Deprecation: true`, `Sunset: [date]`
- Email notifications
- Minimum notice (e.g., 6 months)

## Deprecation Header
```
Deprecation: true
Sunset: Sat, 01 Jun 2025 00:00:00 GMT
Link: <https://api.example.com/docs/migration>; rel="deprecation"
```

## Migration Support
1. Provide migration guide
2. Offer parallel versions
3. Log deprecated usage
4. Notify heavy users

## Deployment Strategies
- **Blue-Green:** Deploy to inactive, switch traffic
- **Canary:** Route % to new version, monitor
- **Shadow:** Compare v1/v2 responses

## GraphQL Versioning
```graphql
type User {
  name: String! @deprecated(reason: "Use fullName")
  fullName: String!
}
```

## Checklists

**Before Release:**
- [ ] Strategy chosen and documented
- [ ] Version scheme defined
- [ ] Deprecation policy documented

**When Deprecating:**
- [ ] Migration guide written
- [ ] Headers added
- [ ] Sunset date set

---

**End of API Versioning Skill**
