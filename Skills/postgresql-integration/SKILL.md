---
name: postgresql-integration
description: Guide developers through PostgreSQL setup, connection configuration, query patterns, and best practices
license: Complete terms in LICENSE.txt
---

# PostgreSQL Integration
**Version:** v0.23.0

## When to Use

- Setting up PostgreSQL connection in a new project
- Implementing database queries and operations
- Configuring connection pooling
- Handling transactions

## Connection Setup

### Connection String Format
```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
```

### Security Best Practices

**NEVER hardcode credentials in source code.**

Use environment variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

### SSL Modes

| Mode | Description |
|------|-------------|
| `disable` | No SSL |
| `require` | Require SSL, no verification |
| `verify-ca` | Require SSL with CA verification |
| `verify-full` | Require SSL with full verification |

## Query Patterns

### Parameterized Queries

**ALWAYS use parameterized queries to prevent SQL injection.**

```sql
-- CORRECT
SELECT * FROM users WHERE id = $1

-- WRONG (vulnerable)
SELECT * FROM users WHERE id = {user_id}
```

### Common Operations

```sql
-- SELECT with filtering
SELECT column1, column2 FROM table_name
WHERE condition ORDER BY column1 LIMIT 100;

-- INSERT with returning
INSERT INTO table_name (column1, column2)
VALUES ($1, $2) RETURNING id;

-- UPDATE with conditions
UPDATE table_name
SET column1 = $1, updated_at = NOW()
WHERE id = $2 RETURNING *;
```

## Transaction Handling

```sql
BEGIN;
-- operations
COMMIT;
-- or ROLLBACK; if error
```

### Isolation Levels

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| READ COMMITTED | No | Possible | Possible |
| REPEATABLE READ | No | No | Possible |
| SERIALIZABLE | No | No | No |

**PostgreSQL default:** READ COMMITTED

### Best Practices

1. Keep transactions short
2. Handle errors explicitly
3. Use appropriate isolation
4. Avoid user interaction mid-transaction

## Connection Pooling

### Key Parameters

- `min_connections` - Minimum to maintain
- `max_connections` - Maximum allowed
- `connection_timeout` - Time to wait for available connection
- `idle_timeout` - Time before closing idle connection

### Sizing Guidelines

```
max_connections = core_count * 2
```

## Error Handling

### Common Error Categories

- **Connection:** ECONNREFUSED, ETIMEDOUT, authentication failed
- **Query:** syntax error, relation does not exist, duplicate key

### Retry Strategy

1. Wait with exponential backoff
2. Maximum retry count (3 attempts)
3. Log each retry attempt

## Performance Tips

### Indexing

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
```

### Query Analysis

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Resources

- `resources/setup-guide.md`
- `resources/query-patterns.md`
- `resources/common-errors.md`

---

**End of PostgreSQL Integration Skill**
