---
version: "v0.33.0"
description: Install skills from the framework to your project
argument-hint: "<skill-name> | --list [--installed]"
---
# /install-skill
Install skills from the IDPF framework to your project.
## Usage
| Command | Description |
|---------|-------------|
| `/install-skill <skill>` | Install a skill |
| `/install-skill <s1> <s2>` | Install multiple |
| `/install-skill --list` | List available |
| `/install-skill --list --installed` | Show status |
## Prerequisites
- `framework-config.json` with `frameworkPath`
- `.claude/metadata/skill-registry.json`
## List Mode
Load registry, display name/description/status table.
Check `.claude/skills/{skill}/SKILL.md` for installed status.
## Install Mode
**Step 1:** Validate `frameworkPath` in `framework-config.json`
**Step 2:** For each skill:
```bash
node .claude/scripts/shared/install-skill.js <skill-names>
```
Or manually:
1. Check if installed: `.claude/skills/{skill}/SKILL.md`
2. Locate: `{frameworkPath}/Skills/Packaged/{skill}.zip`
3. Extract to `.claude/skills/{skill}/`
4. Verify SKILL.md exists
**Step 3:** Add to `projectSkills` in framework-config.json
**Step 4:** Report results
## Output
```
Installing skills...
✓ electron-development - Installed (12 resources)
⊘ tdd-red-phase - Already installed (skipped)
✗ invalid-skill - Package not found
Installed: 1  Skipped: 1  Failed: 1
```
---
**End of /install-skill Command**
