---
name: postgresql-integration
version: v0.2.0
description: PostgreSQL connection pooling and query patterns
---

# PostgreSQL Integration

## When to Use
- Moving from SQLite to production database
- Need concurrent connections
- Scaling beyond single-file database

## Connection Pool Setup

### Python (psycopg2)
```python
from psycopg2 import pool

connection_pool = pool.ThreadedConnectionPool(
    minconn=1,
    maxconn=10,
    host='localhost',
    database='myapp',
    user='postgres',
    password='password'
)
```

### Node.js (pg)
```javascript
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    database: 'myapp',
    user: 'postgres',
    password: 'password',
    max: 10
});
```

## Query Patterns

### Parameterized Queries (Prevent SQL Injection)
```python
cursor.execute(
    "SELECT * FROM users WHERE id = %s",
    (user_id,)
)
```

### Transactions
```python
try:
    cursor.execute("UPDATE accounts SET balance = balance - %s WHERE id = %s", (amount, from_id))
    cursor.execute("UPDATE accounts SET balance = balance + %s WHERE id = %s", (amount, to_id))
    conn.commit()
except:
    conn.rollback()
    raise
```

## Best Practices
- Always use connection pooling
- Use parameterized queries
- Handle transactions properly
- Close connections/cursors
- Index frequently queried columns
