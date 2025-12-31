# Vibe Agent System Instructions (Web)
**Version:** v0.19.0
**Type:** Web Application Agent Behaviors
**Extends:** Vibe-Agent-Core-Instructions.md

---

## Purpose
Specializes core instructions for web development (frontend, backend, full-stack).

---

## Project Detection
**Direct:** web app, website, API, frontend, backend
**Frameworks:** React/Vue/Svelte (frontend), Express/Fastify (Node), Flask/Django (Python), Next.js/Remix (full-stack)

---

## Frontend

```
STEP 1: npm install
STEP 2: npm run dev
STEP 3: Open http://localhost:5173
STEP 4: Verify UI renders
STEP 5: Test hot reload (edit/save)
STEP 6: Check DevTools Console (F12)
STEP 7: Report results
```

---

## Backend

```
Node.js: node server.js
Flask: python app.py
Test: curl http://localhost:3000/api/endpoint
```

---

## Full-Stack (Next.js)

```
STEP 1: npm run dev
STEP 2: Open http://localhost:3000
STEP 3: Test frontend
STEP 4: Test API: /api/items
STEP 5: Check DevTools Network tab
STEP 6: Report frontend and API behavior
```

---

## API Testing

**GET:** `curl http://localhost:3000/api/endpoint`
**POST:** `curl -X POST http://localhost:3000/api/endpoint -H "Content-Type: application/json" -d '{"key":"value"}'`

---

## CORS Fix

**Express:** `app.use(cors())`
**Flask:** `CORS(app)`

---

## Common Errors

**Module not found:** `npm install [package]`, restart server
**Port in use:** `PORT=3001 npm run dev` or kill process

---

## Quick Reference

| Framework | Command | Port |
|-----------|---------|------|
| Vite | npm run dev | 5173 |
| Next.js | npm run dev | 3000 |
| Express | node server.js | 3000 |
| Flask | python app.py | 5000 |

---

**End of Web Agent Instructions**
