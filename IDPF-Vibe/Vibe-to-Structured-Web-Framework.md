# Vibe-to-Structured Framework (Web)
**Version:** v0.2.0
**Type:** Web Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Platform Coverage
- Frontend: React, Vue, Svelte, vanilla JS
- Backend: Node.js, Python (Flask/Django), Ruby, PHP
- Full-stack: Next.js, Remix, SvelteKit, Nuxt
- Static Sites: 11ty, Hugo, Jekyll, Astro

## Initialization Questions
- Frontend only / Backend only / Full-stack?
- Frontend framework?
- Backend framework?
- Database needed?
- API type? (REST / GraphQL)

## Frontend Setup
```bash
npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev
```
Open http://localhost:5173

## Backend Setup (Express)
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/todos', (req, res) => res.json([...]));
app.listen(3000);
```

## Verification Pattern
```
STEP 6: Start dev server
STEP 7: Open browser
STEP 8: Check Console for errors
STEP 9: Test hot reload
STEP 10: Report results
```

## Database Options
- SQLite: Simple, file-based
- PostgreSQL: Production-grade
- MongoDB: Document-based

## API Testing
```bash
curl http://localhost:3000/api/todos
curl -X POST -H "Content-Type: application/json" -d '{"text":"test"}' http://localhost:3000/api/todos
```

## Best Practices
**Vibe:** Start dev server immediately, mock APIs initially, focus on UI/UX flow
**Evolution:** Document API endpoints, define schema, plan auth
**Structured:** Add comprehensive tests, optimize bundles, proper error handling

---

**End of Web Framework**
