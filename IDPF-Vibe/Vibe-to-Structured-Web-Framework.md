# Vibe-to-Structured Development Framework (Web)
**Version:** 0.17.0
**Source:** IDPF-Vibe/Vibe-to-Structured-Web-Framework.md
**Type:** Web Application Specialization
**Extends:** Vibe-to-Structured-Core-Framework.md

---

## Purpose
Specializes Core Framework for web development: frontend, backend, full-stack.
**Evolution Target:** IDPF-Agile

---

## Coverage
**Frontend:** React, Vue, Svelte, vanilla JS
**Backend:** Node.js, Python (Flask/Django), Ruby (Rails), PHP
**Full-stack:** Next.js, Remix, SvelteKit, Nuxt, Rails
**Types:** SPAs, MPAs, Static Sites, REST/GraphQL APIs, SSR, PWAs

---

## Session Initialization
Core Framework steps + Web-Specific Questions:
- Project type? (Frontend / Backend / Full-stack)
- Frontend framework? (React / Vue / Svelte / Vanilla)
- Backend framework? (Node.js / Python / Ruby / PHP)
- Database needed? (PostgreSQL / MySQL / MongoDB / Later)
- API type? (REST / GraphQL / None)

---

## Frontend Development

### Setup (Vite)
```bash
npm create vite@latest my-app -- --template react  # or vue, svelte
cd my-app && npm install && npm run dev
```

### Verification Pattern
1. Start dev server: `npm run dev`
2. Open browser: http://localhost:5173
3. Verify: Page loads, no console errors
4. Test hot reload
5. Report results

---

## Backend Development

### Node.js/Express Setup
```bash
npm init -y && npm install express cors
```
```javascript
const express = require('express');
const app = express();
app.use(require('cors')());
app.use(express.json());
app.get('/api/todos', (req, res) => res.json([]));
app.listen(3000);
```

### Python/Flask Setup
```bash
pip install flask flask-cors
```
```python
from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/api/todos')
def get_todos(): return jsonify([])
```

### Verification Pattern
1. Start server: `node server.js` or `python app.py`
2. Test: `curl http://localhost:3000/api/todos`
3. Verify JSON response, status 200
4. Report results

---

## Full-Stack Development

### Next.js Setup
```bash
npx create-next-app@latest my-app && cd my-app && npm run dev
```
- API routes: `pages/api/*.js`
- Test frontend: http://localhost:3000
- Test API: http://localhost:3000/api/todos

---

## Database Integration

**SQLite:** `better-sqlite3` (Node.js)
**PostgreSQL:** `pg` (Node.js)
**MongoDB:** `mongodb` (Node.js)

---

## API Testing
```bash
curl http://localhost:3000/api/todos                              # GET
curl -X POST -H "Content-Type: application/json" -d '{"text":"..."}' http://localhost:3000/api/todos  # POST
```

---

## Web Requirements Additions

### Technology Stack
- Frontend: Framework, Build tool, Styling, State management
- Backend: Framework, API style, Auth, Database
- Deployment: Hosting for frontend/backend/database

### Browser Support
Chrome, Firefox, Safari, Edge (last 2 versions)

### Performance Targets
FCP < 1.5s, TTI < 3s, Lighthouse > 90

---

## Best Practices

### Vibe Phase
**Frontend:** Start dev server, use hot reload, mock APIs, focus on UI flow
**Backend:** In-memory data first, test with curl, use nodemon
**Full-stack:** Run both servers, test data flow, handle CORS

### Evolution Point
Document API endpoints, define schema, plan auth, set performance budgets

### Agile Phase
Add tests, optimize bundles, proper error handling, loading states, accessibility

---

## When to Use
Use for: Web apps, APIs, Full-stack, Static sites, PWAs, Browser tools
Consider other frameworks for: Desktop, Mobile, Games

---

**End of Web Framework**
