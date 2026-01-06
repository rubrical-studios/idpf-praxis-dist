# Vibe Agent System Instructions (Web)
**Version:** v0.22.0
**Source:** System-Instructions/Vibe/Vibe-Agent-Web-Instructions.md
**Type:** Web Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes core instructions for web application development (frontend, backend, full-stack).

**Adds ONLY web-specific behaviors:** Project type detection, frontend/backend/full-stack patterns, browser testing, API testing, local server management.

---

## Web Project Detection
**Direct indicators:** "web app", "website", "API", "frontend", "backend", "browser", "localhost"
**Framework indicators:** React/Vue/Svelte → Frontend, Express/Flask/Django → Backend, Next.js/Remix → Full-stack

---

## Project-Type-Specific Behaviors
### Frontend
```
STEP 1: npm install
STEP 2: npm run dev
STEP 3: Note URL (usually http://localhost:5173)
STEP 4: Open browser
STEP 5: Verify: Page loads, UI renders, can interact
STEP 6: Test hot reload (edit, save, browser updates)
STEP 7: Check DevTools Console (F12) for errors
STEP 8: Report results
```

### Backend
```
Node.js/Express: node server.js
Python/Flask: python app.py

Test API: curl http://localhost:3000/api/endpoint
Report: API response and any errors
```

### Full-Stack (Next.js)
```
STEP 1: npm run dev
STEP 2: Open http://localhost:3000
STEP 3: Verify frontend loads
STEP 4: Test API: http://localhost:3000/api/items
STEP 5: Verify full flow: UI → API calls → Response
STEP 6: Check DevTools Network tab
STEP 7: Report frontend and API behavior
```

---

## API Testing with curl
**GET:** `curl http://localhost:3000/api/endpoint`
**POST:**
```
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}'
```

---

## CORS Handling
```javascript
// Express
const cors = require('cors');
app.use(cors());

// Flask
from flask_cors import CORS
CORS(app)
```

---

## Common Web Errors
**"Module not found":** `npm install [package-name]`, restart dev server
**"EADDRINUSE":** `PORT=3001 npm run dev` or kill process on port

---

## Quick Reference
### Dev Servers
| Framework | Command | Port |
|-----------|---------|------|
| Vite | `npm run dev` | 5173 |
| Next.js | `npm run dev` | 3000 |
| Express | `node server.js` | 3000 |
| Flask | `python app.py` | 5000 |

---

**End of Web Agent Instructions**
