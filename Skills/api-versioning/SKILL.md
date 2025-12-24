---
name: api-versioning
version: v0.5.0
description: URL/header versioning strategies and deprecation patterns
---

# API Versioning

## When to Use
- Planning breaking API changes
- Supporting multiple API versions
- Deprecating old endpoints
- Long-term API maintenance

## Versioning Strategies

### URL Path Versioning
```
/api/v1/users
/api/v2/users
```
**Pros:** Clear, easy to understand, cacheable
**Cons:** Not truly RESTful

### Header Versioning
```
GET /api/users
Accept: application/vnd.myapp.v2+json
```
**Pros:** Clean URLs
**Cons:** Harder to test, not visible in URL

### Query Parameter
```
/api/users?version=2
```
**Pros:** Easy to implement
**Cons:** Optional parameter, cache issues

## Deprecation Pattern
```
Response Headers:
Deprecation: true
Sunset: Sat, 01 Jan 2025 00:00:00 GMT
Link: </api/v2/users>; rel="successor-version"
```

## Migration Strategy
1. Announce deprecation (6+ months)
2. Add deprecation headers
3. Log v1 usage for tracking
4. Provide migration guide
5. Remove after sunset date

## Best Practices
- Prefer URL versioning for public APIs
- Document all versions
- Provide clear migration paths
- Use semantic versioning concepts
- Monitor old version usage before removal
