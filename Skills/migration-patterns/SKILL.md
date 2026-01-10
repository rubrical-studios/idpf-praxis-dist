---
name: migration-patterns
description: Guide developers through database migration best practices including versioning, rollbacks, and zero-downtime strategies
license: Complete terms in LICENSE.txt
---

# Migration Patterns
**Version:** v0.23.0

## When to Use

- Planning database schema changes
- Setting up migration workflow for a new project
- Implementing rollback procedures
- Performing migrations in production environments

## Schema Versioning Strategies

### Sequential Numbering
```
001_create_users_table.sql
002_add_email_to_users.sql
```
**Best for:** Solo projects

### Timestamp-Based
```
20240115120000_create_users_table.sql
20240115143022_add_email_to_users.sql
```
**Best for:** Team projects

## Migration File Structure

```
migrations/
├── 001_create_users/
│   ├── up.sql
│   └── down.sql
└── 002_add_indexes/
    ├── up.sql
    └── down.sql
```

### Migration File Contents

**Up migration:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
```

**Down migration:**
```sql
DROP INDEX IF EXISTS idx_users_email;
DROP TABLE IF EXISTS users;
```

## Rollback Procedures

**Types:**
- **Forward-only** (recommended for production): Never delete data, fix with new migrations
- **Reversible:** Provide down migration for each up

### Safe Rollback Pattern
```sql
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM users LIMIT 1) THEN
        RAISE EXCEPTION 'Cannot rollback: users table has data';
    END IF;
END $$;
DROP TABLE users;
```

## Zero-Downtime Migrations

### Expand-Contract Pattern

1. **Expand:** Add new column/table, keep old working
2. **Migrate:** Copy/transform data to new structure
3. **Contract:** Remove old column/table

### Example: Renaming a Column

**Phase 1:** Add new column, sync with trigger
**Phase 2:** Application uses both
**Phase 3:** Remove old column

### Adding NOT NULL Constraint (Zero-Downtime)

```sql
-- Step 1: Add check constraint (not validated)
ALTER TABLE users ADD CONSTRAINT users_email_not_null
CHECK (email IS NOT NULL) NOT VALID;

-- Step 2: Validate constraint
ALTER TABLE users VALIDATE CONSTRAINT users_email_not_null;

-- Step 3: Convert to NOT NULL
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users DROP CONSTRAINT users_email_not_null;
```

### Adding Index Without Locking
```sql
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

## Pre-Migration Checklist

- [ ] Migration tested in staging
- [ ] Rollback tested and working
- [ ] Backup taken
- [ ] Team notified
- [ ] Monitoring in place

## Post-Migration Verification

```sql
\d table_name                  -- Verify structure
SELECT COUNT(*) FROM table_name; -- Verify data
```

## Common Migration Commands

| Action | Raw SQL | ORM Equivalent |
|--------|---------|----------------|
| Create table | CREATE TABLE | create_table |
| Add column | ALTER TABLE ADD | add_column |
| Add index | CREATE INDEX | add_index |

## Resources

- `resources/versioning-strategies.md`
- `resources/rollback-guide.md`
- `resources/zero-downtime.md`

---

**End of Migration Patterns Skill**
