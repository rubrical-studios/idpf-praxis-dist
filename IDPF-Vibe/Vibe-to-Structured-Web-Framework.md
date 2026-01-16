# Vibe-to-Structured Development Framework (Web)
**Version:** v0.26.0
**Type:** Web Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

## Web Platform Coverage
- **Frontend**: React, Vue, Svelte, vanilla JS, HTML/CSS
- **Backend**: Node.js, Python (Flask/Django), Ruby (Rails), PHP
- **Full-stack**: Next.js, Remix, SvelteKit, Nuxt, Rails

## Session Initialization (Web-Specific)
After Core Framework steps, ask:
- Type of project? (Frontend/Backend/Full-stack)
- Frontend framework? (React/Vue/Svelte/Vanilla)
- Backend framework? (Node.js/Python/Ruby)
- Database needed? (PostgreSQL/MySQL/MongoDB/None)
- API type? (REST/GraphQL/None)

## Frontend Development
**Setup (Vite):**
```bash
npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev
```
**Verification:** Open `http://localhost:5173`, check console, test hot reload

## Backend Development (Node.js/Express)
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/todos', (req, res) => res.json([]));
app.listen(3000);
```
**Test:** `curl http://localhost:3000/api/todos`

## Full-Stack (Next.js)
```bash
npx create-next-app@latest my-app
cd my-app && npm run dev
```
**Verify:** Frontend at `localhost:3000`, API at `localhost:3000/api/...`

## Database Integration
| Database | Library | Connection |
|----------|---------|------------|
| SQLite | better-sqlite3 | `new Database('file.db')` |
| PostgreSQL | pg | `new Pool({ connectionString })` |
| MongoDB | mongodb | `MongoClient.connect(url)` |

## API Testing
```bash
curl http://localhost:3000/api/todos           # GET
curl -X POST -H "Content-Type: application/json" -d '{"text":"item"}' http://localhost:3000/api/todos  # POST
```

## Requirements Additions
Document: Technology Stack (frontend/backend/deployment), Browser Support, Performance Targets (FCP < 1.5s, TTI < 3s)

## Best Practices
**Vibe:** Start dev server immediately, mock APIs, focus on UI/UX flow
**Evolution:** Document API endpoints, define schema, plan auth
**Structured:** Add tests, optimize bundles, implement error handling

**End of Web Framework**
