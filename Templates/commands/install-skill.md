---
version: "v0.34.1"
description: Install skills from the framework to your project
argument-hint: "<skill-name> | --list [--installed]"
---

<!-- MANAGED -->
# /install-skill

Install skills from the IDPF framework to your project for use in development sessions.

---

## Usage

| Command | Description |
|---------|-------------|
| `/install-skill <skill-name>` | Install a specific skill |
| `/install-skill <skill1> <skill2>` | Install multiple skills |
| `/install-skill --list` | List available skills |
| `/install-skill --list --installed` | Show installation status |

---

## Prerequisites

- Framework must be installed (`framework-config.json` with `frameworkPath`)
- Skill registry must exist (`.claude/metadata/skill-registry.json`)

---

## Execution Instructions

### List Mode (`--list`)

```bash
# Load skill registry
cat .claude/metadata/skill-registry.json
```

**Display Format:**

```
Available Skills:

Name                          Description                                          Status
────────────────────────────────────────────────────────────────────────────────────────────────────
electron-development          Patterns and solutions for Electron app development  Installed
playwright-setup              Installation verification and troubleshooting        Available
postgresql-integration        Guide through PostgreSQL setup and best practices    Available

Total: 25 skills
Installed: 1
```

**If `--installed` flag specified:** Include Status column showing Installed/Available.

**To check installation:** Look for `.claude/skills/{skill-name}/SKILL.md`.

---

### Install Mode (`<skill-name>`)

**Step 1: Validate Prerequisites**

```bash
# Check framework-config.json exists and has frameworkPath
test -f framework-config.json || { echo "ERROR: framework-config.json not found"; exit 1; }
```

Read `frameworkPath` from config. If missing:
```
Error: Cannot install skills - frameworkPath not set in framework-config.json.
Run the framework installer to set up your project.
```

**Step 2: Install Each Skill**

For each skill name provided:

```bash
# Use shared installation script
node .claude/scripts/shared/install-skill.js <skill-names...>
```

**Or manually:**

1. Check if already installed:
   ```bash
   test -f .claude/skills/{skill}/SKILL.md && echo "ALREADY_INSTALLED"
   ```

2. Locate package:
   ```bash
   test -f {frameworkPath}/Skills/Packaged/{skill}.zip || echo "NOT_FOUND"
   ```

3. Extract package:
   ```bash
   # Windows
   powershell -Command "Expand-Archive -Path '{frameworkPath}/Skills/Packaged/{skill}.zip' -DestinationPath '.claude/skills/{skill}' -Force"

   # Unix
   unzip -q -o "{frameworkPath}/Skills/Packaged/{skill}.zip" -d ".claude/skills/{skill}"
   ```

4. Verify extraction:
   ```bash
   test -f .claude/skills/{skill}/SKILL.md || echo "EXTRACTION_FAILED"
   ```

**Step 3: Update framework-config.json**

Add installed skills to `projectSkills` array:

```javascript
const config = JSON.parse(fs.readFileSync('framework-config.json'));
config.projectSkills = config.projectSkills || [];
if (!config.projectSkills.includes(skillName)) {
  config.projectSkills.push(skillName);
}
config.projectSkills.sort();
fs.writeFileSync('framework-config.json', JSON.stringify(config, null, 2));
```

**Step 4: Report Results**

```
Installing skills...

✓ electron-development - Installed (12 resources)
✓ playwright-setup - Installed (2 resources)
⊘ tdd-red-phase - Already installed (skipped)
✗ nonexistent-skill - Package not found

Installed: 2  Skipped: 1  Failed: 1
```

---

## Output Symbols

| Symbol | Meaning |
|--------|---------|
| ✓ | Successfully installed |
| ⊘ | Already installed (skipped) |
| ✗ | Installation failed |

---

## Edge Cases

| Scenario | Handling |
|----------|----------|
| `framework-config.json` missing | Error: "Run framework installer first" |
| `frameworkPath` not set | Error: "frameworkPath not configured" |
| Skill package not found | Error: "Package not found" (continue with others) |
| Skill already installed | Skip with message (not an error) |
| `.claude/skills/` doesn't exist | Create directory automatically |
| Extraction fails | Error with details, continue with others |

---

## Examples

### Install Single Skill

```
> /install-skill electron-development

Installing skills...

✓ electron-development - Installed (12 resources)

Installed: 1  Skipped: 0  Failed: 0
```

### Install Multiple Skills

```
> /install-skill playwright-setup postgresql-integration error-handling-patterns

Installing skills...

✓ playwright-setup - Installed (2 resources)
✓ postgresql-integration - Installed (3 resources)
✓ error-handling-patterns - Installed (1 resources)

Installed: 3  Skipped: 0  Failed: 0
```

### List Available Skills

```
> /install-skill --list --installed

Available Skills:

Name                          Description                                          Status
────────────────────────────────────────────────────────────────────────────────────────────────────
api-versioning                Guide through API versioning strategies              Available
electron-development          Patterns for Electron app development                Installed
playwright-setup              Playwright installation and troubleshooting          Installed
...

Total: 25 skills
Installed: 2
```

---

## Related

- `/charter` - Automatically suggests and deploys skills during charter creation
- `Overview/Framework-Skills.md` - Complete skills documentation

---

**End of /install-skill Command**
