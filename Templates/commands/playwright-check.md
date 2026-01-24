---
version: "v0.32.0"
description: Verify Playwright installation and browser availability
argument-hint: "[--fix]"
---
<!-- MANAGED -->
# /playwright-check
Verify Playwright installation and browsers. Reports status with remediation for issues.
## Usage
| Command | Description |
|---------|-------------|
| `/playwright-check` | Check installation status |
| `/playwright-check --fix` | Auto-fix common issues |
---
## Verification Steps
### Step 1: Check package.json
```bash
node -e "const pkg = require('./package.json'); const deps = {...pkg.dependencies, ...pkg.devDependencies}; console.log(deps['@playwright/test'] || deps['playwright'] || 'NOT_FOUND')"
```
**If NOT_FOUND:** Suggest `npm install -D @playwright/test`
### Step 2: Check Version
```bash
npx playwright --version
```
### Step 3: Check Browser Status
```bash
npx playwright install --dry-run 2>&1
```
Parse for installed browsers vs needing download.
### Step 4: Verify Browser Launch (if Step 3 passes)
```javascript
// .playwright-verify.js
const { chromium } = require('playwright');
(async () => {
  try {
    const browser = await chromium.launch({ timeout: 10000 });
    console.log('LAUNCH_OK');
    await browser.close();
  } catch (e) {
    console.log('LAUNCH_FAILED: ' + e.message);
  }
})();
```
```bash
node .playwright-verify.js
rm .playwright-verify.js
```
---
## Output Format
### Success
```
Playwright Installation Check
─────────────────────────────
✓ Package installed: @playwright/test@1.40.0
✓ Chromium: installed
✓ Firefox: installed
✓ WebKit: installed
✓ Browser launch: success

All checks passed!
```
### Failure
```
Playwright Installation Check
─────────────────────────────
✓ Package installed: @playwright/test@1.40.0
✗ Chromium: NOT INSTALLED
✗ Firefox: NOT INSTALLED
✗ WebKit: NOT INSTALLED

Fix: Run `npx playwright install` to download browsers
```
---
## Auto-Fix Mode (--fix)
| Issue | Fix Command |
|-------|-------------|
| Browsers not installed | `npx playwright install` |
| System deps missing | `npx playwright install-deps` |
| Corrupted install | `npx playwright install --force` |
**Note:** Package install NOT auto-fixed (avoids modifying package.json).
---
## Remediation Reference
| Issue | Fix |
|-------|-----|
| Package not installed | `npm install -D @playwright/test` |
| Browsers not downloaded | `npx playwright install` |
| System deps (Linux) | `npx playwright install-deps` |
| Corrupted browsers | `npx playwright install --force` |
| Version mismatch | `npm update @playwright/test && npx playwright install` |
---
## Related
- **playwright-setup** skill - Installation guide and CI patterns
- **electron-development** skill - Playwright with Electron
---
**End of /playwright-check Command**
