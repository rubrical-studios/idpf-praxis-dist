---
name: error-handling-patterns
version: v0.5.0
description: Error hierarchy, API errors, logging patterns
---

# Error Handling Patterns

## When to Use
- Designing error handling strategy
- Creating custom exception hierarchies
- API error responses
- Logging and monitoring setup

## Exception Hierarchy
```python
class AppError(Exception):
    """Base application error"""
    pass

class ValidationError(AppError):
    """Input validation failed"""
    pass

class NotFoundError(AppError):
    """Resource not found"""
    pass

class AuthorizationError(AppError):
    """User not authorized"""
    pass
```

## API Error Response Format
```json
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid email format",
        "details": [
            {"field": "email", "message": "Must be valid email"}
        ]
    }
}
```

## HTTP Status Codes
| Code | Use Case |
|------|----------|
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 500 | Internal Server Error |

## Logging Pattern
```python
import logging

logger = logging.getLogger(__name__)

try:
    result = process_order(order_id)
except ValidationError as e:
    logger.warning(f"Validation failed: {e}", extra={'order_id': order_id})
    raise
except Exception as e:
    logger.exception(f"Unexpected error processing order {order_id}")
    raise
```

## Best Practices
- Create custom exception hierarchy
- Include context in error messages
- Log at appropriate levels
- Don't expose internal details to users
- Use structured logging for analysis
