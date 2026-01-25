---
version: "v0.33.0"
description: Verify Playwright installation and browser availability
argument-hint: "[--fix]"
---
# /playwright-check
Verify Playwright installation and browsers. Reports status and remediation steps.
## Usage
| Command | Description |
|---------|-------------|
| `/playwright-check` | Check installation |
| `/playwright-check --fix` | Auto-fix issues |
## Verification Steps
### Step 0: Detect Project Context
```bash
if [ -f "CHARTER.md" ]; then
  PROJECT_NAME=$(grep -m1 "^# " CHARTER.md | sed 's/^# //')
fi
```
Use `$PROJECT_NAME` in headers if set.
### Step 1: Check package.json
```bash
test -f package.json || { echo "NO_PACKAGE_JSON"; exit 0; }
node -e "const pkg = require('./package.json'); const deps = {...pkg.dependencies, ...pkg.devDependencies}; console.log(deps['@playwright/test'] || deps['playwright'] || 'NOT_FOUND')"
```
**If NO_PACKAGE_JSON:** Report "No package.json found. Playwright is not installed."
### Step 2: Check Version
```bash
npx playwright --version
```
### Step 3: Check Browser Status
```bash
npx playwright install --dry-run 2>&1
```
### Step 4: Verify Browser Launch
Test chromium launch with timeout.
## Output Format
Header: `{ProjectName} - Playwright Installation Check` (or generic if no charter)
```
CodeForge - Playwright Installation Check
- Package installed: @playwright/test@X.X.X
- Chromium: installed
- Firefox: installed
- WebKit: installed
- Browser launch: success
```
**No package.json:** Report gracefully, suggest `npm init -y && npm install -D @playwright/test`
## Auto-Fix Mode
| Issue | Command |
|-------|---------|
| Browsers not installed | `npx playwright install` |
| System deps (Linux) | `npx playwright install-deps` |
| Corrupted install | `npx playwright install --force` |
---
**End of /playwright-check Command**
