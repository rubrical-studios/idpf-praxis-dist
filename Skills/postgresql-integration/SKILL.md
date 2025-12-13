---
name: postgresql-integration
version: 1.0.0
description: Guide developers through PostgreSQL setup, connection configuration, query patterns, and best practices
license: Complete terms in LICENSE.txt
---
# PostgreSQL Integration
This Skill guides developers through PostgreSQL database integration including connection setup, query patterns, transaction handling, and connection pooling.
## When to Use This Skill
Invoke this Skill when:
- Setting up PostgreSQL connection in a new project
- Implementing database queries and operations
- Configuring connection pooling
- Handling transactions
- Troubleshooting common PostgreSQL issues
## Prerequisites
- PostgreSQL server installed and running
- Database credentials available
- Appropriate client library for your language
## Connection Setup
### Connection String Format
```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
```
**Components:**
- `user` - Database username
- `password` - Database password (consider environment variables)
- `host` - Server hostname (default: localhost)
- `port` - Server port (default: 5432)
- `dbname` - Database name
### Security Best Practices
**NEVER hardcode credentials in source code.**
**Recommended approaches:**
1. Environment variables
2. Configuration files (not committed to version control)
3. Secret management services
```
# Environment variable approach
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```
### SSL/TLS Configuration
For production environments:
```
?sslmode=require
?sslmode=verify-ca
?sslmode=verify-full
```
**SSL modes:**
- `disable` - No SSL
- `allow` - Try SSL, fall back to non-SSL
- `prefer` - Try SSL first (default)
- `require` - Require SSL, no verification
- `verify-ca` - Require SSL with CA verification
- `verify-full` - Require SSL with full verification
## Query Patterns
### Parameterized Queries
**ALWAYS use parameterized queries to prevent SQL injection.**
```
# CORRECT - Parameterized
SELECT * FROM users WHERE id = $1
# WRONG - String interpolation (vulnerable to SQL injection)
SELECT * FROM users WHERE id = {user_id}
```
### Common Operations
**SELECT with filtering:**
```sql
SELECT column1, column2 FROM table_name
WHERE condition
ORDER BY column1
LIMIT 100;
```
**INSERT with returning:**
```sql
INSERT INTO table_name (column1, column2)
VALUES ($1, $2)
RETURNING id;
```
**UPDATE with conditions:**
```sql
UPDATE table_name
SET column1 = $1, updated_at = NOW()
WHERE id = $2
RETURNING *;
```
**DELETE with confirmation:**
```sql
DELETE FROM table_name
WHERE id = $1
RETURNING id;
```
### Batch Operations
For multiple inserts:
```sql
INSERT INTO table_name (column1, column2)
VALUES
  ($1, $2),
  ($3, $4),
  ($5, $6);
```
Or use `COPY` for large datasets:
```sql
COPY table_name FROM STDIN WITH (FORMAT csv);
```
## Transaction Handling
### Transaction Basics
```sql
BEGIN;
-- operations
COMMIT;
-- or ROLLBACK; if error
```
### Transaction Isolation Levels
| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Not possible | Possible | Possible |
| REPEATABLE READ | Not possible | Not possible | Possible |
| SERIALIZABLE | Not possible | Not possible | Not possible |
**PostgreSQL default:** READ COMMITTED
**Set isolation level:**
```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```
### Savepoints
For partial rollbacks within a transaction:
```sql
BEGIN;
INSERT INTO table1 ...;
SAVEPOINT my_savepoint;
INSERT INTO table2 ...;  -- might fail
ROLLBACK TO SAVEPOINT my_savepoint;  -- undo table2 insert only
INSERT INTO table2 ...;  -- retry
COMMIT;
```
### Best Practices
1. **Keep transactions short** - Long transactions block other operations
2. **Handle errors explicitly** - Always have rollback logic
3. **Use appropriate isolation** - Higher isolation = more overhead
4. **Avoid user interaction** - Never wait for user input mid-transaction
## Connection Pooling
### Why Connection Pooling
Opening database connections is expensive:
- TCP handshake
- Authentication
- Memory allocation
Connection pools maintain open connections for reuse.
### Pool Configuration
**Key parameters:**
- `min_connections` - Minimum connections to maintain
- `max_connections` - Maximum connections allowed
- `connection_timeout` - Time to wait for available connection
- `idle_timeout` - Time before closing idle connection
- `max_lifetime` - Maximum connection lifetime
### Sizing Guidelines
**Starting point:**
```
max_connections = (core_count * 2) + effective_spindle_count
```
For SSD-based systems:
```
max_connections = core_count * 2
```
**Considerations:**
- Monitor connection usage in production
- Adjust based on actual load patterns
- Account for all application instances
### Pool Health Monitoring
Monitor these metrics:
- Active connections
- Idle connections
- Wait time for connections
- Connection errors
- Pool exhaustion events
## Error Handling
### Common Error Categories
**Connection errors:**
- `ECONNREFUSED` - Server not running or wrong host/port
- `ETIMEDOUT` - Network issue or firewall blocking
- `authentication failed` - Wrong credentials
**Query errors:**
- `syntax error` - Invalid SQL
- `relation does not exist` - Table/view not found
- `column does not exist` - Invalid column reference
- `duplicate key` - Unique constraint violation
- `foreign key violation` - Referential integrity error
### Error Handling Pattern
```
try:
    execute query
catch connection_error:
    retry with backoff
catch constraint_violation:
    handle business logic
catch syntax_error:
    log and fix query
finally:
    return connection to pool
```
### Retry Strategy
For transient errors:
1. Wait with exponential backoff
2. Maximum retry count (e.g., 3 attempts)
3. Log each retry attempt
4. Fail after max retries
## Performance Tips
### Indexing
Create indexes for:
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
```
### Query Analysis
Use `EXPLAIN ANALYZE` to understand query execution:
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```
Look for:
- Sequential scans on large tables (may need index)
- High cost estimates
- Actual vs estimated row counts
### Connection Considerations
- Close connections promptly (or return to pool)
- Use connection pooling in production
- Set appropriate timeouts
- Monitor connection count
## Resources
See `resources/` directory for:
- `setup-guide.md` - Detailed setup instructions
- `query-patterns.md` - Additional query examples
- `common-errors.md` - Error troubleshooting guide
## Relationship to Other Skills
**Complements:**
- `sqlite-integration` - Lighter-weight alternative for simpler needs
- `migration-patterns` - Schema versioning and changes
**Independent from:**
- TDD skills - This skill focuses on database integration, not testing
## Expected Outcome
After using this skill:
- PostgreSQL connection configured securely
- Queries use parameterized inputs
- Transactions handled appropriately
- Connection pooling configured for production
- Common errors can be diagnosed and resolved
---
**End of PostgreSQL Integration Skill**
