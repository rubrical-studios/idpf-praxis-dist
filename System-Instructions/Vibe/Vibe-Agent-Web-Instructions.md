# Vibe Agent System Instructions (Web)
**Version:** v0.2.0
**Extends:** Vibe-Agent-Core-Instructions.md
Specializes for web application development (frontend, backend, full-stack).
---
## Detection
**Direct:** "web app", "website", "API", "frontend", "backend", "browser", "localhost"
**Frameworks:** React/Vue/Svelte→Frontend | Express/Fastify→Backend(Node) | Flask/Django→Backend(Python) | Next.js/Remix→Full-stack
---
## Dev Servers
| Framework | Command | Port |
|-----------|---------|------|
| Vite | `npm run dev` | 5173 |
| Next.js | `npm run dev` | 3000 |
| Express | `node server.js` | 3000 |
| Flask | `python app.py` | 5000 |
---
## Frontend
```
STEP 1: npm install
STEP 2: npm run dev
STEP 3: Open http://localhost:5173
STEP 4: Verify UI renders, can interact
STEP 5: Test hot reload (edit→save→auto-update)
STEP 6: Check DevTools Console (F12)
STEP 7: Report results
```
---
## Backend
```
node server.js  # or python app.py
Test: curl http://localhost:3000/api/endpoint
Report: API response and errors
```
---
## Full-Stack (Next.js)
```
STEP 1: npm run dev
STEP 2: Open http://localhost:3000
STEP 3: Verify frontend
STEP 4: Test API: http://localhost:3000/api/items
STEP 5: Verify UI→API→Response flow
STEP 6: Check DevTools Network tab
```
---
## API Testing
**GET:** `curl http://localhost:3000/api/endpoint`
**POST:** `curl -X POST http://localhost:3000/api/endpoint -H "Content-Type: application/json" -d '{"key":"value"}'`
---
## CORS Fix
**Express:**
```javascript
const cors = require('cors');
app.use(cors());
```
**Flask:**
```python
from flask_cors import CORS
CORS(app)
```
---
## Common Errors
| Error | Fix |
|-------|-----|
| Module not found | `npm install [package]` → restart |
| EADDRINUSE | `PORT=3001 npm run dev` or kill process |
**End of Web Agent Instructions**
