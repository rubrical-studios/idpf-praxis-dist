---
name: error-handling-patterns
description: Guide developers through consistent error handling including error hierarchies, API responses, and logging integration
license: Complete terms in LICENSE.txt
---
# Error Handling Patterns
**Version:** v0.22.0
**Source:** Skills/error-handling-patterns/SKILL.md

Guides developers through implementing consistent error handling across applications, including error hierarchy design, API error responses, and logging integration.
## When to Use This Skill
- Designing error handling strategy for a new project
- Standardizing error responses in an API
- Implementing error logging and monitoring
- Creating user-facing error messages
- Refactoring inconsistent error handling
## Core Principles
1. **Fail fast:** Detect and report errors as early as possible
2. **Fail safely:** Errors should not corrupt data or leave invalid states
3. **Be informative:** Error messages should help diagnose the problem
4. **Be actionable:** Tell users/developers what they can do about it
5. **Be consistent:** Use the same patterns throughout the application
## Error Hierarchy Design
```
AppError (base)
├── ValidationError
├── NotFoundError
├── AuthorizationError
├── BusinessError
└── ExternalServiceError
```
**Base Error Class (Python example):**
```python
class AppError(Exception):
    def __init__(self, message, code=None, details=None):
        super().__init__(message)
        self.message = message
        self.code = code or 'UNKNOWN_ERROR'
        self.details = details or {}
```
## API Error Responses
### Standard Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {"field": "email", "constraint": "must be valid email"},
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
| ExternalServiceError | 502/503 |
## User-Facing vs Developer-Facing
**User-Facing:** Non-technical language, actionable guidance, no sensitive information
```
GOOD: "We couldn't process your payment. Please check your card details."
BAD:  "PaymentGateway threw InvalidCardException at line 234"
```
**Developer-Facing:** Technical and precise, include error codes, reference documentation
```json
{"error": {"code": "INVALID_PARAMETER", "message": "The 'limit' parameter must be between 1 and 100"}}
```
## Logging Integration
**Always log:** Error type/code, timestamp, request ID, user ID, error message, stack trace (for unexpected errors)
**Never log:** Passwords, API keys, credit card numbers, PII without consent
## Error Recovery Patterns
**Retry Pattern:** Retry with exponential backoff for transient errors
**Circuit Breaker:** Prevent cascading failures by failing fast when service is down
**Fallback Pattern:** Try primary source, fall back to cache if unavailable
## Testing Error Handling
```python
def test_validation_error_format():
    error = ValidationError('Invalid email', field='email')
    result = error.to_dict()
    assert result['error']['code'] == 'VALIDATION_ERROR'
    assert result['error']['details']['field'] == 'email'
```
## Resources
See `resources/` directory for hierarchy patterns, API error patterns, and logging integration guides.
## Relationship to Other Skills
**Complements:** `api-versioning`, `common-errors`
**Independent from:** TDD skills
## Expected Outcome
After using this skill: Error hierarchy established, consistent API error responses, proper logging integration, user-facing and developer-facing messages separated, error recovery patterns implemented.
---
**End of Error Handling Patterns Skill**
