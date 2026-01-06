---
name: migration-patterns
description: Guide developers through database migration best practices including versioning, rollbacks, and zero-downtime strategies
license: Complete terms in LICENSE.txt
---
# Migration Patterns
**Version:** v0.22.0
**Source:** Skills/migration-patterns/SKILL.md

Guides developers through database migration best practices including schema versioning, rollback procedures, and zero-downtime migration patterns.
## When to Use This Skill
- Planning database schema changes
- Setting up migration workflow for a new project
- Implementing rollback procedures
- Performing migrations in production environments
- Dealing with large table migrations
## Schema Versioning Strategies
**Sequential Numbering:** `001_create_users.sql`, `002_add_email.sql`
- Pros: Simple, clear ordering
- Cons: Merge conflicts in teams
**Timestamp-Based:** `20240115120000_create_users.sql`
- Pros: Reduces merge conflicts, supports team development
- Cons: Longer filenames
**When to use:** Solo projects -> Sequential; Team projects -> Timestamp-based
## Migration File Structure
```
migrations/
├── up/
│   ├── 001_create_users.sql
│   └── 002_add_indexes.sql
├── down/
│   ├── 001_drop_users.sql
│   └── 002_drop_indexes.sql
└── seed/
    └── initial_data.sql
```
## Rollback Procedures
**Forward-only (recommended for production):** Never delete data, fix issues with new migrations
**Reversible:** Provide down migration for each up, allows rollback to any state
**Rollback Testing:**
```bash
migrate up -> migrate status -> migrate down -> migrate status -> migrate up -> migrate status
```
## Zero-Downtime Migrations
### Expand-Contract Pattern
**Phase 1 - Expand:** Add new column/table, keep old structure working
**Phase 2 - Migrate:** Copy/transform data to new structure
**Phase 3 - Contract:** Remove old column/table
### Large Table Migrations
```sql
-- Create new table with desired schema
CREATE TABLE users_new (...);
-- Copy data in batches
INSERT INTO users_new ... SELECT ... FROM users WHERE id > $last_id LIMIT 10000;
-- Swap tables
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;
```
### Adding NOT NULL Constraint (Zero-Downtime)
```sql
-- Step 1: Add check constraint (not validated)
ALTER TABLE users ADD CONSTRAINT users_email_not_null CHECK (email IS NOT NULL) NOT VALID;
-- Step 2: Validate constraint (allows reads)
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
\d table_name                    -- Verify structure
SELECT COUNT(*) FROM table_name  -- Verify data integrity
SELECT indexname FROM pg_indexes WHERE tablename = 'table_name'  -- Verify indexes
```
## Resources
See `resources/` directory for versioning strategies, rollback guide, and zero-downtime patterns.
## Relationship to Other Skills
**Complements:** `postgresql-integration`, `sqlite-integration`
**Independent from:** TDD skills
## Expected Outcome
After using this skill: Migration workflow established, versioning strategy implemented, rollback procedures defined, zero-downtime patterns understood.
---
**End of Migration Patterns Skill**
