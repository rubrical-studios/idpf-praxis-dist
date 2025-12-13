---
name: error-handling-patterns
version: 1.0.0
description: Guide developers through consistent error handling including error hierarchies, API responses, and logging integration
license: Complete terms in LICENSE.txt
---
# Error Handling Patterns
This Skill guides developers through implementing consistent error handling across applications, including error hierarchy design, API error responses, and logging integration.
## When to Use This Skill
Invoke this Skill when:
- Designing error handling strategy for a new project
- Standardizing error responses in an API
- Implementing error logging and monitoring
- Creating user-facing error messages
- Refactoring inconsistent error handling
## Error Handling Philosophy
### Core Principles
1. **Fail fast:** Detect and report errors as early as possible
2. **Fail safely:** Errors should not corrupt data or leave systems in invalid states
3. **Be informative:** Error messages should help diagnose the problem
4. **Be actionable:** Tell users/developers what they can do about it
5. **Be consistent:** Use the same patterns throughout the application
### Error Audiences
Different audiences need different information:
**End users:** Clear, non-technical explanation; what happened; what they can do
**Developers (API consumers):** Error code for programmatic handling; technical description; how to fix their request
**Operations (your team):** Stack traces; request context; system state
## Error Hierarchy Design
### Base Error Class
```python
# Python example
class AppError(Exception):
    """Base class for application errors."""
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
```javascript
// JavaScript example
class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details
      }
    };
  }
}
```
### Error Categories
**Validation Errors:**
```python
class ValidationError(AppError):
    """Input validation failed."""
    def __init__(self, message, field=None, constraint=None):
        super().__init__(
            message,
            code='VALIDATION_ERROR',
            details={'field': field, 'constraint': constraint}
        )
```
**Not Found Errors:**
```python
class NotFoundError(AppError):
    """Requested resource not found."""
    def __init__(self, resource_type, resource_id):
        super().__init__(
            f'{resource_type} with id {resource_id} not found',
            code='NOT_FOUND',
            details={'resource_type': resource_type, 'resource_id': resource_id}
        )
```
**Authorization Errors:**
```python
class AuthorizationError(AppError):
    """User not authorized for this action."""
    def __init__(self, action, resource=None):
        super().__init__(
            f'Not authorized to {action}',
            code='UNAUTHORIZED',
            details={'action': action, 'resource': resource}
        )
```
**Business Logic Errors:**
```python
class BusinessError(AppError):
    """Business rule violation."""
    def __init__(self, message, rule=None):
        super().__init__(
            message,
            code='BUSINESS_RULE_VIOLATION',
            details={'rule': rule}
        )
```
**External Service Errors:**
```python
class ExternalServiceError(AppError):
    """External service failed."""
    def __init__(self, service, original_error=None):
        super().__init__(
            f'External service {service} failed',
            code='EXTERNAL_SERVICE_ERROR',
            details={'service': service, 'original': str(original_error)}
        )
```
### Error Hierarchy Structure
```
AppError
├── ValidationError
│   ├── InvalidFormatError
│   ├── MissingFieldError
│   └── OutOfRangeError
├── NotFoundError
│   ├── UserNotFoundError
│   └── ResourceNotFoundError
├── AuthorizationError
│   ├── AuthenticationError
│   └── PermissionDeniedError
├── BusinessError
│   ├── InsufficientFundsError
│   └── DuplicateEntryError
└── ExternalServiceError
    ├── DatabaseError
    └── ThirdPartyAPIError
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
    "request_id": "abc-123",
    "documentation_url": "https://api.example.com/docs/errors#VALIDATION_ERROR"
  }
}
```
### HTTP Status Code Mapping
| Error Type | HTTP Status | When to Use |
|------------|-------------|-------------|
| ValidationError | 400 Bad Request | Invalid input format |
| AuthenticationError | 401 Unauthorized | Invalid/missing credentials |
| AuthorizationError | 403 Forbidden | Valid credentials, no permission |
| NotFoundError | 404 Not Found | Resource doesn't exist |
| BusinessError | 409 Conflict | Business rule violation |
| RateLimitError | 429 Too Many Requests | Rate limit exceeded |
| InternalError | 500 Internal Server Error | Unexpected server error |
| ExternalServiceError | 502/503 | Downstream service failure |
### Error Response Examples
**Validation error (400):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "errors": [
        {"field": "email", "message": "Invalid email format"},
        {"field": "age", "message": "Must be a positive number"}
      ]
    }
  }
}
```
**Not found (404):**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "details": {
      "resource_type": "user",
      "resource_id": "123"
    }
  }
}
```
**Internal error (500):**
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "request_id": "abc-123"
  }
}
```
### Error Handler Implementation
```python
# Flask example
from flask import jsonify
@app.errorhandler(AppError)
def handle_app_error(error):
    response = jsonify(error.to_dict())
    response.status_code = get_status_code(error)
    return response
@app.errorhandler(Exception)
def handle_unexpected_error(error):
    # Log the full error for debugging
    app.logger.exception('Unexpected error')
    # Return safe response to client
    response = jsonify({
        'error': {
            'code': 'INTERNAL_ERROR',
            'message': 'An unexpected error occurred',
            'request_id': request.id
        }
    })
    response.status_code = 500
    return response
```
```javascript
// Express example
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(getStatusCode(err)).json(err.toJSON());
  }
  // Log unexpected errors
  console.error('Unexpected error:', err);
  // Return safe response
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      request_id: req.id
    }
  });
};
app.use(errorHandler);
```
## User-Facing vs Developer-Facing Errors
### User-Facing Messages
**Characteristics:** Non-technical language, actionable guidance, no sensitive information, translated/localized
**Examples:**
```
GOOD: "We couldn't process your payment. Please check your card details and try again."
BAD:  "PaymentGateway threw InvalidCardException at line 234"
GOOD: "This email address is already registered. Try logging in instead."
BAD:  "Duplicate key violation on users.email"
GOOD: "Something went wrong. Please try again in a few minutes."
BAD:  "NullPointerException in UserService.getUserById()"
```
### Developer-Facing Messages
**Characteristics:** Technical and precise, include error codes, reference documentation, include request context
**Examples:**
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'limit' parameter must be between 1 and 100",
    "parameter": "limit",
    "received_value": 500,
    "documentation_url": "https://api.example.com/docs/pagination"
  }
}
```
### Message Strategy
```python
class UserFacingError(AppError):
    """Error with user-friendly message."""
    def __init__(self, user_message, technical_message, code, details=None):
        super().__init__(technical_message, code, details)
        self.user_message = user_message
    def to_user_dict(self):
        return {
            'error': {
                'message': self.user_message
            }
        }
    def to_developer_dict(self):
        return {
            'error': {
                'code': self.code,
                'message': self.message,
                'details': self.details
            }
        }
```
## Logging Integration
### What to Log
**Always log:** Error type/code, timestamp, request ID/correlation ID, user ID (if authenticated), error message, stack trace (for unexpected errors)
**Context to include:** Request method and path, request body (sanitized), response status, duration
### What NOT to Log
**Never log:** Passwords, API keys/tokens, credit card numbers, full social security numbers, other PII without consent
### Logging Pattern
```python
import logging
import json
class ErrorLogger:
    def __init__(self, logger):
        self.logger = logger
    def log_error(self, error, request=None):
        log_data = {
            'error_type': type(error).__name__,
            'error_code': getattr(error, 'code', 'UNKNOWN'),
            'error_message': str(error),
            'timestamp': datetime.utcnow().isoformat()
        }
        if request:
            log_data['request'] = {
                'method': request.method,
                'path': request.path,
                'request_id': request.id,
                'user_id': getattr(request, 'user_id', None)
            }
        if isinstance(error, AppError):
            self.logger.warning(json.dumps(log_data))
        else:
            log_data['stack_trace'] = traceback.format_exc()
            self.logger.error(json.dumps(log_data))
```
### Structured Logging
```json
{
  "level": "error",
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "abc-123",
  "error": {
    "type": "ValidationError",
    "code": "INVALID_EMAIL",
    "message": "Invalid email format"
  },
  "request": {
    "method": "POST",
    "path": "/api/users",
    "user_id": null
  },
  "duration_ms": 45
}
```
## Error Recovery Patterns
### Retry Pattern
```python
def with_retry(func, max_attempts=3, backoff_factor=2):
    """Retry function with exponential backoff."""
    attempt = 0
    while attempt < max_attempts:
        try:
            return func()
        except ExternalServiceError as e:
            attempt += 1
            if attempt >= max_attempts:
                raise
            sleep_time = backoff_factor ** attempt
            time.sleep(sleep_time)
```
### Circuit Breaker Pattern
```python
class CircuitBreaker:
    """Prevent cascading failures."""
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.state = 'closed'  # closed, open, half-open
        self.last_failure_time = None
    def call(self, func):
        if self.state == 'open':
            if self._should_attempt_reset():
                self.state = 'half-open'
            else:
                raise CircuitOpenError('Circuit breaker is open')
        try:
            result = func()
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
```
### Fallback Pattern
```python
def get_user_with_fallback(user_id):
    """Try primary source, fall back to cache."""
    try:
        return user_service.get_user(user_id)
    except ExternalServiceError:
        cached_user = cache.get(f'user:{user_id}')
        if cached_user:
            return cached_user
        raise UserNotFoundError(user_id)
```
## Testing Error Handling
### Unit Tests
```python
def test_validation_error_format():
    error = ValidationError('Invalid email', field='email')
    result = error.to_dict()
    assert result['error']['code'] == 'VALIDATION_ERROR'
    assert result['error']['details']['field'] == 'email'
def test_error_handler_returns_correct_status():
    with app.test_client() as client:
        response = client.get('/users/nonexistent')
        assert response.status_code == 404
        assert response.json['error']['code'] == 'NOT_FOUND'
```
### Integration Tests
```python
def test_error_logged_correctly(caplog):
    with app.test_client() as client:
        client.post('/api/users', json={'invalid': 'data'})
    assert 'VALIDATION_ERROR' in caplog.text
    assert 'request_id' in caplog.text
```
## Resources
See `resources/` directory for:
- `hierarchy-patterns.md` - Error hierarchy design patterns
- `api-errors.md` - API error response patterns
- `logging-integration.md` - Logging setup and integration
## Relationship to Other Skills
**Complements:**
- `api-versioning` - API design consistency
- `common-errors` - Specific error troubleshooting
**Independent from:**
- TDD skills - This skill focuses on error handling design
## Expected Outcome
After using this skill:
- Error hierarchy established
- Consistent API error responses
- Proper logging integration
- User-facing and developer-facing messages separated
- Error recovery patterns implemented
---
**End of Error Handling Patterns Skill**
