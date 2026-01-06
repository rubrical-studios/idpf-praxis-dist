---
name: postgresql-integration
description: Guide developers through PostgreSQL setup, connection configuration, query patterns, and best practices
license: Complete terms in LICENSE.txt
---
# PostgreSQL Integration
**Version:** v0.22.0
**Source:** Skills/postgresql-integration/SKILL.md

Guides developers through PostgreSQL database integration including connection setup, query patterns, transaction handling, and connection pooling.
## When to Use This Skill
- Setting up PostgreSQL connection in a new project
- Implementing database queries and operations
- Configuring connection pooling
- Handling transactions
- Troubleshooting common PostgreSQL issues
## Connection Setup
### Connection String Format
```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
```
**Security:** NEVER hardcode credentials. Use environment variables or secret management.
### SSL/TLS Configuration
| Mode | Description |
|------|-------------|
| `disable` | No SSL |
| `require` | Require SSL, no verification |
| `verify-ca` | Require SSL with CA verification |
| `verify-full` | Require SSL with full verification |
## Query Patterns
**ALWAYS use parameterized queries:**
```sql
-- CORRECT
SELECT * FROM users WHERE id = $1
-- WRONG (SQL injection vulnerable)
SELECT * FROM users WHERE id = {user_id}
```
**Common Operations:**
```sql
-- SELECT with RETURNING
INSERT INTO table_name (col1, col2) VALUES ($1, $2) RETURNING id;
-- UPDATE with RETURNING
UPDATE table_name SET col1 = $1 WHERE id = $2 RETURNING *;
-- Batch INSERT
INSERT INTO table_name (col1, col2) VALUES ($1, $2), ($3, $4), ($5, $6);
```
## Transaction Handling
```sql
BEGIN;
-- operations
COMMIT;  -- or ROLLBACK;
```
**Isolation Levels:**
| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| READ COMMITTED (default) | No | Possible | Possible |
| REPEATABLE READ | No | No | Possible |
| SERIALIZABLE | No | No | No |
**Best Practices:**
- Keep transactions short
- Handle errors explicitly
- Never wait for user input mid-transaction
## Connection Pooling
**Why:** Opening connections is expensive (TCP handshake, auth, memory)
**Key Parameters:**
- `min_connections` - Minimum to maintain
- `max_connections` - Maximum allowed
- `connection_timeout` - Wait time for available connection
- `idle_timeout` - Time before closing idle connection
**Sizing Guideline:** `max_connections = core_count * 2`
## Error Handling
**Connection errors:** `ECONNREFUSED` (server not running), `ETIMEDOUT` (network issue), `authentication failed`
**Query errors:** `syntax error`, `relation does not exist`, `duplicate key`, `foreign key violation`
**Retry Strategy:** Wait with exponential backoff, maximum retry count (e.g., 3), log each attempt
## Performance Tips
**Indexing:**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
```
**Query Analysis:**
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```
Look for: Sequential scans on large tables, high cost estimates, actual vs estimated row counts.
## Resources
See `resources/` directory for setup guide, query patterns, and common errors.
## Relationship to Other Skills
**Complements:** `sqlite-integration`, `migration-patterns`
**Independent from:** TDD skills
## Expected Outcome
After using this skill: PostgreSQL connection configured securely, queries use parameterized inputs, transactions handled appropriately, connection pooling configured.
---
**End of PostgreSQL Integration Skill**
