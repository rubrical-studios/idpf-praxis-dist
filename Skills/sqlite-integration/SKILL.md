---
name: sqlite-integration
version: v0.15.0
description: Add SQLite database storage with teaching examples
---

# SQLite Integration

## When to Use
- User needs to store data persistently
- User asks about databases
- Evolution Point - ready to add data storage
- Simple local database needed

## Why SQLite for Beginners
- No server setup required
- Just a file
- Built into Python (sqlite3)
- Easy to learn SQL

## Flask Setup
```python
import sqlite3

def get_db():
    db = sqlite3.connect('app.db')
    db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            done INTEGER DEFAULT 0
        )
    ''')
    db.commit()
```

## Basic SQL Operations

### Create
```sql
INSERT INTO todos (text) VALUES ('Buy milk');
```

### Read
```sql
SELECT * FROM todos WHERE done = 0;
```

### Update
```sql
UPDATE todos SET done = 1 WHERE id = 1;
```

### Delete
```sql
DELETE FROM todos WHERE id = 1;
```

## Python Example
```python
# Insert
db.execute('INSERT INTO todos (text) VALUES (?)', ['New task'])
db.commit()

# Query
todos = db.execute('SELECT * FROM todos').fetchall()
```

## Best Practices
- Use parameterized queries (?) to prevent SQL injection
- Close connections when done
- Use try/finally or context managers
