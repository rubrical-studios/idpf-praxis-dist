---
name: sqlite-integration-for-beginners
description: Add SQLite database to Flask or Sinatra app with beginner-friendly code examples and teaching comments
license: Complete terms in LICENSE.txt
---
# SQLite Integration for Beginners
**Version:** v0.22.0
**Source:** Skills/sqlite-integration/SKILL.md

Teaches beginners how to add persistent data storage using SQLite to their Flask or Sinatra applications.
## When to Use This Skill
- User has working app with in-memory storage (lists/arrays)
- User asks "How do I save data permanently?"
- User wants data to persist after server restart
- User has 3-4 features working and is ready for persistence
## Prerequisites
- Working Flask or Sinatra app
- Understanding of routes and templates
- At least one feature using list/array storage
## What is SQLite?
SQLite stores data in a file. Like writing in a notebook instead of a whiteboard.
**Perfect for beginners:**
- No server setup needed
- Just a file in your project
- Built into Python
- Easy to learn SQL basics
- Can upgrade to PostgreSQL/MySQL later
## Key Concepts
**Database has TABLES** (like spreadsheets) with COLUMNS (what kind of data) and ROWS (actual entries).
**SQL Commands:**
- `CREATE TABLE` - Make new table
- `INSERT INTO` - Add data
- `SELECT` - Get data
- `UPDATE` - Change data
- `DELETE` - Remove data
## Flask Implementation
**1. Import sqlite3:**
```python
import sqlite3
```
**2. Create connection function:**
```python
def get_db():
    conn = sqlite3.connect('notes.db')
    conn.row_factory = sqlite3.Row
    return conn
```
**3. Initialize database:**
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
**4. Update routes:**
```python
@app.route('/')
def home():
    conn = get_db()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    return render_template('index.html', notes=notes)
```
## Sinatra Implementation
**1. Require sqlite3:**
```ruby
require 'sqlite3'
```
**2. Create connection:**
```ruby
DB = SQLite3::Database.new 'notes.db'
DB.results_as_hash = true
```
**3. Create table:**
```ruby
DB.execute <<-SQL
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
SQL
```
**4. Update routes:**
```ruby
get '/' do
  @notes = DB.execute('SELECT * FROM notes')
  erb :index
end
```
## SQL Explanation
```sql
INSERT INTO notes (text) VALUES (?)
```
- `INSERT INTO notes`: Add data to notes table
- `(text)`: We're providing the text column
- `VALUES (?)`: The `?` is a placeholder (prevents SQL injection)
```sql
SELECT * FROM notes ORDER BY created_at DESC
```
- `SELECT *`: Get all columns
- `FROM notes`: From the notes table
- `ORDER BY created_at DESC`: Newest first
## Testing the Database
1. **Add a note** -> Restart server -> Note should still be there
2. **Check database file** -> `notes.db` should exist in project folder
3. **Delete database file** -> Restart server -> New empty database created
## Common Issues
| Issue | Solution |
|-------|----------|
| "no such table" | Run `init_db()` function |
| "Database is locked" | Close DB Browser or other tools |
| "No such column" | Check exact spelling in SQL |
## Resources
See `resources/` directory for complete examples:
- `flask-sqlite-example.py`
- `sinatra-sqlite-example.rb`
- `sql-basics.md`
## Next Steps
After SQLite: Add UPDATE and DELETE operations, learn foreign keys, add search/filter functionality.
---
**End of SQLite Integration for Beginners Skill**
