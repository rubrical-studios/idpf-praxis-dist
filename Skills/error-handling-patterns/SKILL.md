---
name: error-handling-patterns
description: Guide developers through consistent error handling including error hierarchies, API responses, and logging integration
license: Complete terms in LICENSE.txt
---

# Error Handling Patterns
**Version:** v0.23.0

## When to Use

- Designing error handling strategy for a new project
- Standardizing error responses in an API
- Implementing error logging and monitoring
- Creating user-facing error messages

## Core Principles

1. **Fail fast:** Detect and report errors as early as possible
2. **Fail safely:** Errors should not corrupt data
3. **Be informative:** Error messages should help diagnose the problem
4. **Be actionable:** Tell users/developers what they can do
5. **Be consistent:** Use the same patterns throughout

## Error Hierarchy Design

### Base Error Class

```python
class AppError(Exception):
    def __init__(self, message, code=None, details=None):
        super().__init__(message)
        self.message = message
        self.code = code or 'UNKNOWN_ERROR'
        self.details = details or {}

    def to_dict(self):
        return {
            'error': {
                'code': self.code,
                'message': self.message,
                'details': self.details
            }
        }
```

### Error Categories

```python
class ValidationError(AppError):
    """Input validation failed."""
    code = 'VALIDATION_ERROR'

class NotFoundError(AppError):
    """Requested resource not found."""
    code = 'NOT_FOUND'

class AuthorizationError(AppError):
    """User not authorized for this action."""
    code = 'UNAUTHORIZED'

class BusinessError(AppError):
    """Business rule violation."""
    code = 'BUSINESS_RULE_VIOLATION'

class ExternalServiceError(AppError):
    """External service failed."""
    code = 'EXTERNAL_SERVICE_ERROR'
```

## API Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "email",
      "constraint": "must be a valid email address"
    },
    "request_id": "abc-123"
  }
}
```

### HTTP Status Code Mapping

| Error Type | HTTP Status |
|------------|-------------|
| ValidationError | 400 Bad Request |
| AuthenticationError | 401 Unauthorized |
| AuthorizationError | 403 Forbidden |
| NotFoundError | 404 Not Found |
| BusinessError | 409 Conflict |
| RateLimitError | 429 Too Many Requests |
| InternalError | 500 Internal Server Error |

## User-Facing vs Developer-Facing

**User-Facing:**
```
GOOD: "We couldn't process your payment. Please check your card details."
BAD:  "PaymentGateway threw InvalidCardException at line 234"
```

**Developer-Facing:**
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'limit' parameter must be between 1 and 100",
    "received_value": 500
  }
}
```

## Logging Integration

### What to Log

- Error type/code
- Timestamp
- Request ID/correlation ID
- User ID (if authenticated)
- Stack trace (for unexpected errors)

### What NOT to Log

- Passwords
- API keys/tokens
- Credit card numbers
- PII without consent

## Error Recovery Patterns

### Retry Pattern

```python
def with_retry(func, max_attempts=3, backoff_factor=2):
    attempt = 0
    while attempt < max_attempts:
        try:
            return func()
        except ExternalServiceError as e:
            attempt += 1
            if attempt >= max_attempts:
                raise
            time.sleep(backoff_factor ** attempt)
```

### Circuit Breaker Pattern

Prevent cascading failures by tracking failure counts and opening circuit after threshold.

### Fallback Pattern

```python
def get_user_with_fallback(user_id):
    try:
        return user_service.get_user(user_id)
    except ExternalServiceError:
        return cache.get(f'user:{user_id}')
```

## Resources

- `resources/hierarchy-patterns.md`
- `resources/api-errors.md`
- `resources/logging-integration.md`

---

**End of Error Handling Patterns Skill**
