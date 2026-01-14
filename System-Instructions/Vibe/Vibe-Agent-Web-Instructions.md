# Vibe Agent System Instructions (Web)
**Version:** v0.25.0
**Source:** System-Instructions/Vibe/Vibe-Agent-Web-Instructions.md
**Type:** Web Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md
---
## Purpose
Specializes core instructions for web application development (frontend, backend, full-stack).
**Adds ONLY web-specific behaviors:** Web project type detection, frontend/backend/full-stack patterns, browser testing, API testing, local server management.
---
## Web Project Detection
**Direct indicators:** "web app", "website", "API", "frontend", "backend", "browser", "server", "localhost".
**Language/framework indicators:**
- React/Vue/Svelte → Frontend
- Express/Fastify → Backend (Node.js)
- Flask/Django → Backend (Python)
- Next.js/Remix → Full-stack
---
## Project-Type-Specific Behaviors
### Frontend
```
STEP 1: Install dependencies: npm install
STEP 2: Start dev server: npm run dev
STEP 3: Open browser to URL (usually http://localhost:5173)
STEP 4: Verify page loads, UI renders, can interact
STEP 5: Test hot reload: Edit file → Save → Browser updates
STEP 6: Check DevTools Console (F12) for errors
```
### Backend
```
Node.js/Express: node server.js
Python/Flask: python app.py
Server shows: "Running on http://localhost:3000"
Test API with curl: curl http://localhost:3000/api/endpoint
```
### Full-Stack (Next.js)
```
STEP 1: Start: npm run dev
STEP 2: Open http://localhost:3000
STEP 3: Verify frontend loads
STEP 4: Test API directly: http://localhost:3000/api/items
STEP 5: Verify full flow: UI → API calls → Response
STEP 6: Check DevTools Network tab
```
---
## API Testing with curl
**GET:** `curl http://localhost:3000/api/endpoint`
**POST:** `curl -X POST http://localhost:3000/api/endpoint -H "Content-Type: application/json" -d '{"key":"value"}'`
---
## CORS Handling
**When CORS error appears:**
**Express fix:**
```javascript
const cors = require('cors');
app.use(cors());
```
**Flask fix:**
```python
from flask_cors import CORS
CORS(app)
```
---
## Common Web Errors
**"Module not found":**
```
npm install [package-name]
Restart dev server
```
**"EADDRINUSE" (Port in use):**
```
PORT=3001 npm run dev
Or kill process: lsof -i :3000 → kill -9 [PID]
```
---
## Quick Reference
| Framework | Command | Port |
|-----------|---------|------|
| Vite | `npm run dev` | 5173 |
| Next.js | `npm run dev` | 3000 |
| Express | `node server.js` | 3000 |
| Flask | `python app.py` | 5000 |
---
**End of Web Agent Instructions**
