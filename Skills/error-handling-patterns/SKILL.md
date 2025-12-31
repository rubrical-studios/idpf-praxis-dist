---
name: error-handling-patterns
description: Guide developers through consistent error handling including error hierarchies, API responses, and logging integration
license: Complete terms in LICENSE.txt
---

# Error Handling Patterns
**Version:** v0.19.1

## When to Use
- Designing error strategy for new project
- Standardizing API error responses
- Implementing error logging
- Creating user-facing messages

## Core Principles
1. **Fail fast:** Detect/report early
2. **Fail safely:** No data corruption
3. **Be informative:** Help diagnose
4. **Be actionable:** Tell what to do
5. **Be consistent:** Same patterns everywhere

## Error Audiences
| Audience | Needs |
|----------|-------|
| End users | Non-technical, actionable |
| API consumers | Error code, how to fix |
| Operations | Stack trace, request context |

## Error Hierarchy

```python
class AppError(Exception):
    def __init__(self, message, code='UNKNOWN', details=None):
        self.message = message
        self.code = code
        self.details = details or {}

class ValidationError(AppError): pass
class NotFoundError(AppError): pass
class AuthorizationError(AppError): pass
class BusinessError(AppError): pass
class ExternalServiceError(AppError): pass
```

## API Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {"field": "email"},
    "request_id": "abc-123"
  }
}
```

## HTTP Status Mapping
| Error Type | Status |
|------------|--------|
| ValidationError | 400 |
| AuthenticationError | 401 |
| AuthorizationError | 403 |
| NotFoundError | 404 |
| BusinessError | 409 |
| RateLimitError | 429 |
| InternalError | 500 |

## User vs Developer Messages
**User:** "We couldn't process your payment. Please check card details."
**Developer:** `{"code": "INVALID_PARAMETER", "message": "limit must be 1-100"}`

## Logging

**Always log:** Error type/code, timestamp, request ID, user ID, stack trace
**Never log:** Passwords, API keys, credit cards, PII

```json
{
  "level": "error",
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "abc-123",
  "error": {"type": "ValidationError", "code": "INVALID_EMAIL"}
}
```

## Recovery Patterns

**Retry with backoff:**
```python
for attempt in range(max_attempts):
    try: return func()
    except ExternalServiceError:
        time.sleep(2 ** attempt)
```

**Circuit breaker:** Prevent cascading failures by stopping calls to failing services.

**Fallback:** Try primary, fall back to cache.

## Testing
```python
def test_validation_error_format():
    error = ValidationError('Invalid', field='email')
    assert error.to_dict()['error']['code'] == 'VALIDATION_ERROR'
```

---

**End of Error Handling Patterns Skill**
