---
name: migration-patterns
description: Guide developers through database migration best practices including versioning, rollbacks, and zero-downtime strategies
license: Complete terms in LICENSE.txt
---

# Migration Patterns
**Version:** 0.17.0

## When to Use
- Planning database schema changes
- Setting up migration workflow
- Implementing rollback procedures
- Production migrations
- Large table migrations

## Schema Versioning

### Sequential Numbering
```
001_create_users.sql
002_add_email.sql
```
**Pros:** Simple, clear | **Cons:** Merge conflicts

### Timestamp-Based
```
20240115120000_create_users.sql
```
**Pros:** Reduces conflicts, supports teams | **Cons:** Longer names

**Choose:** Solo → Sequential | Team → Timestamp

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

## Rollback Procedures

### Types
| Type | Description |
|------|-------------|
| Forward-only | Fix with new migrations (recommended for prod) |
| Reversible | Provide down migration for each up |

### Safe Rollback Pattern
```sql
-- Check before rollback
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM users LIMIT 1) THEN
        RAISE EXCEPTION 'Cannot rollback: has data';
    END IF;
END $$;
DROP TABLE users;
```

### Rollback Testing
```bash
migrate up → verify → migrate down → verify → migrate up → verify
```

## Zero-Downtime Migrations

### Expand-Contract Pattern
1. **Expand:** Add new column/table, keep old working
2. **Migrate:** Copy/transform data
3. **Contract:** Remove old structure

### Renaming Column Example
```sql
-- Phase 1: Add new
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);
UPDATE users SET full_name = name;

-- Phase 2: Sync trigger (while app transitions)
-- Phase 3: Remove old
ALTER TABLE users DROP COLUMN name;
```

### Large Table Migrations
```sql
-- Create new table with desired schema
CREATE TABLE users_new (...);

-- Copy in batches
INSERT INTO users_new SELECT ... FROM users WHERE id > $last LIMIT 10000;

-- Swap tables
BEGIN;
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;
COMMIT;
```

### Adding NOT NULL (Zero-Downtime)
```sql
-- Step 1: Add check constraint (not validated)
ALTER TABLE users ADD CONSTRAINT check_email CHECK (email IS NOT NULL) NOT VALID;

-- Step 2: Validate (allows reads)
ALTER TABLE users VALIDATE CONSTRAINT check_email;

-- Step 3: Convert to NOT NULL
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users DROP CONSTRAINT check_email;
```

### Adding Index Without Lock
```sql
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

## Pre-Migration Checklist
- [ ] Tested in staging
- [ ] Rollback tested
- [ ] Backup taken
- [ ] Team notified
- [ ] Monitoring in place

## Post-Migration Verification
```sql
\d table_name                    -- structure
SELECT COUNT(*) FROM table_name; -- data
SELECT indexname FROM pg_indexes WHERE tablename = 'table_name';
```

---

**End of Migration Patterns Skill**
