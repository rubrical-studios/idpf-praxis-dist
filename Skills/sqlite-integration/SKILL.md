---
name: sqlite-integration-for-beginners
description: Add SQLite database to Flask or Sinatra app with beginner-friendly code examples and teaching comments
license: Complete terms in LICENSE.txt
---

# SQLite Integration for Beginners
**Version:** v0.23.0

## When to Use

- User has working app with in-memory storage (lists/arrays)
- User asks "How do I save data permanently?"
- User wants data to persist after server restart

## Prerequisites

- Working Flask or Sinatra app
- Understand routes and templates
- At least one feature using list/array storage

## What is SQLite?

```
List/Array: Like writing notes on a whiteboard
  - Fast and easy
  - Disappears when you turn off the server

SQLite: Like writing in a notebook
  - Data saved to a file (notes.db)
  - Stays there even after server stops
```

## Key Concepts

### Database = Organized Storage

```
Example "notes" table:
| id | text            | created_at         |
|----|-----------------|---------------------|
| 1  | Buy milk        | 2024-01-15 10:30   |
| 2  | Call doctor     | 2024-01-15 11:45   |
```

### SQL Commands

```
CREATE TABLE - Make new table
INSERT INTO  - Add data
SELECT       - Get data
UPDATE       - Change data
DELETE       - Remove data
```

## Flask Implementation

### 1. Import sqlite3
```python
import sqlite3
```

### 2. Create connection function
```python
def get_db():
    conn = sqlite3.connect('notes.db')
    conn.row_factory = sqlite3.Row
    return conn
```

### 3. Initialize database
```python
def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()
```

### 4. Update routes
```python
@app.route('/')
def home():
    conn = get_db()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    return render_template('index.html', notes=notes)
```

## Sinatra Implementation

### 1. Require sqlite3
```ruby
require 'sqlite3'
```

### 2. Create database connection
```ruby
DB = SQLite3::Database.new 'notes.db'
DB.results_as_hash = true
```

### 3. Create table
```ruby
DB.execute <<-SQL
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
SQL
```

### 4. Update routes
```ruby
get '/' do
  @notes = DB.execute('SELECT * FROM notes')
  erb :index
end
```

## SQL Statement Explanations

**CREATE TABLE:**
- `id INTEGER PRIMARY KEY AUTOINCREMENT` - Unique auto-incrementing ID
- `text TEXT NOT NULL` - Required text column
- `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` - Auto-filled timestamp

**INSERT:**
```sql
INSERT INTO notes (text) VALUES (?)
```
The `?` is a placeholder (prevents SQL injection).

**SELECT:**
```sql
SELECT * FROM notes ORDER BY created_at DESC
```

## Testing the Database

1. Add a note through form
2. Restart server
3. Check if note still there

## Troubleshooting

- **"no such table"** - Run `init_db()` function
- **"Database is locked"** - Close DB Browser or other tools
- **"No such column"** - Check spelling in SQL

## Resources

- `resources/flask-sqlite-example.py`
- `resources/sinatra-sqlite-example.rb`
- `resources/sql-basics.md`

---

**End of SQLite Integration Skill**
