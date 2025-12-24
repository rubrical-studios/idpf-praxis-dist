---
name: migration-patterns
version: v0.2.0
description: Schema versioning, rollback strategies, zero-downtime migrations
---

# Migration Patterns

## When to Use
- Database schema changes needed
- Adding/modifying tables or columns
- Production database updates
- Need rollback capability

## Migration Tools
| Language | Tool |
|----------|------|
| Python | Alembic, Flask-Migrate |
| Node.js | Knex, Sequelize |
| Ruby | ActiveRecord Migrations |
| Go | golang-migrate |

## Migration Structure
```
migrations/
├── 001_create_users.sql
├── 002_add_email_to_users.sql
└── 003_create_orders.sql
```

## Safe Migration Patterns

### Adding Column (Safe)
```sql
ALTER TABLE users ADD COLUMN email VARCHAR(255);
```

### Removing Column (Careful)
1. Stop using column in code
2. Deploy code changes
3. Remove column in later migration

### Renaming Column (Zero-Downtime)
1. Add new column
2. Copy data to new column
3. Update code to use new column
4. Remove old column

## Rollback Strategy
```sql
-- Up
ALTER TABLE users ADD COLUMN age INTEGER;

-- Down
ALTER TABLE users DROP COLUMN age;
```

## Best Practices
- Always write rollback migrations
- Test migrations on staging first
- Backup before production migrations
- Avoid destructive changes during traffic
- Use transactions where possible
