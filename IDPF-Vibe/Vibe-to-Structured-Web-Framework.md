# Vibe-to-Structured Development Framework (Web)
**Version:** v0.22.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Web-Framework.md
**Type:** Web Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Web application development specialization. Covers frontend, backend, full-stack.
**Evolution Target:** IDPF-Agile

---

## Web Platform Coverage
- **Frontend**: React, Vue, Svelte, vanilla JS
- **Backend**: Node.js, Python (Flask/Django), Ruby, PHP
- **Full-stack**: Next.js, Remix, SvelteKit, Nuxt
- **Static Sites**: 11ty, Hugo, Jekyll, Astro
- **Types**: SPAs, MPAs, REST/GraphQL APIs, SSR, PWAs

---

## Session Initialization
After Core Framework init (Steps 1-4), ask:
- Type: Frontend/Backend/Full-stack?
- Frontend framework: React/Vue/Svelte/Vanilla/None?
- Backend framework: Node.js/Python/Ruby/None?
- Database: PostgreSQL/MySQL/MongoDB/No/Later?
- API type: REST/GraphQL/None?

---

## Frontend Development

### Setup (Vite)
```bash
npm create vite@latest my-app -- --template react  # or vue/svelte
cd my-app && npm install && npm run dev
```

### Verification Pattern
```
STEP 6: npm run dev
STEP 7: Open http://localhost:5173
STEP 8: Verify: Page loads, content renders, no console errors
STEP 9: Test hot reload: Edit, save, verify browser updates
STEP 10: Open DevTools (F12): Console, Network, Elements
STEP 11: Report: What appears, errors, hot reload working?
```

---

## Backend Development

### Node.js/Express
```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json([{ id: 1, text: 'Learn Express', done: false }]);
});

app.listen(3000, () => console.log('Server running on :3000'));
```

### Verification Pattern
```
STEP 6: node server.js
STEP 7: "Server running on http://localhost:3000"
STEP 8: curl http://localhost:3000/api/todos
STEP 9: Verify JSON response, status 200
STEP 10: Test POST endpoint
STEP 11: Report: API responses, errors, status codes
```

---

## Full-Stack (Next.js)
```bash
npx create-next-app@latest my-app
cd my-app && npm run dev
```

### Verification
```
STEP 6: npm run dev
STEP 7: Open http://localhost:3000
STEP 8: Verify frontend UI renders
STEP 9: Test API routes: http://localhost:3000/api/todos
STEP 10: Test data flow, check Network tab
STEP 11: Report: Frontend, API, errors
```

---

## Database Integration

### SQLite (Node.js)
```javascript
const Database = require('better-sqlite3');
const db = new Database('todos.db');
db.exec(`CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT, done INTEGER DEFAULT 0)`);
```

### PostgreSQL
```javascript
const { Pool } = require('pg');
const pool = new Pool({ user: 'postgres', host: 'localhost', database: 'myapp', password: 'password', port: 5432 });
```

---

## API Testing
```bash
# GET
curl http://localhost:3000/api/todos
# POST
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"text":"New"}'
```

---

## Requirements Template Additions
```markdown
## Technology Stack
### Frontend
- Framework: React 18, Build: Vite, Styling: Tailwind, State: Context/Redux
### Backend
- Framework: Express, API: REST, Auth: JWT, Database: PostgreSQL
### Deployment
- Frontend: Vercel/Netlify, Backend: Railway/Heroku
```

---

## Best Practices

### Vibe Phase
**Frontend:** Start dev server immediately, use hot reload, mock API initially
**Backend:** Start with in-memory data, test with curl, use nodemon
**Full-Stack:** Run both servers, test full data flow, handle CORS

### Structured Phase
- Add comprehensive tests
- Optimize bundle size
- Proper error handling
- Loading states
- Accessibility

---

## Testing

### Frontend (React Testing Library)
```javascript
test('adds todo', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('New todo'), { target: { value: 'Test' } });
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Backend (Jest + Supertest)
```javascript
describe('GET /api/todos', () => {
  it('returns todos array', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

---

## When to Use
**Use this:** Web apps, REST/GraphQL APIs, Full-stack, Static sites, PWAs
**Consider other:** Desktop → Desktop Framework | Mobile → Mobile Framework | Games → Game Framework

---

**End of Web Framework**
