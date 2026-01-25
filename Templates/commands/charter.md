---
version: "v0.33.0"
description: View, create, or manage project charter
argument-hint: "[update|refresh|validate]"
---
# /charter
Context-aware charter command. Shows summary if exists, starts creation if missing.
## Usage
| Command | Description |
|---------|-------------|
| `/charter` | Show summary or start creation |
| `/charter update` | Update specific sections |
| `/charter refresh` | Re-extract from code, merge |
| `/charter validate` | Check work against scope |
## Execution Instructions
Use `TodoWrite` to create todos from workflow steps.
## Template Detection
Detect placeholders with regex: `/{[a-z][a-z0-9-]*}/`
If placeholders found, treat as template and run creation flow.
## Workflow: /charter (No Arguments)
1. Check for `CHARTER.md`
2. If exists with placeholders, treat as template
3. If complete, display summary
4. If missing/template: offer extraction mode (existing code) or inception mode (new project)
## Extraction Mode (Existing Projects)
1. Load `Skills/codebase-analysis/SKILL.md`
2. Analyze codebase for tech stack, architecture, features
3. Present findings for user confirmation
4. Generate charter artifacts
## Inception Mode (New Projects)
**Essential Questions:**
1. What are you building?
2. What problem does it solve?
3. What technology/language?
4. What's in scope for v1?
5. What testing framework? (if applicable)
**Generate artifacts:** CHARTER.md, Inception/, Construction/, Transition/
## /charter update
Read current charter, ask what to update, apply changes.
**If Tech Stack modified:** Trigger skill and recipe suggestions for new tech only.
## /charter refresh
Re-analyze codebase, compare with existing, present diff, merge changes.
**After merge:** Trigger skill and recipe suggestions for new tech only.
## /charter validate
Check current work against charter scope, report alignment.
## Project Skills Selection
After charter creation:
1. Load `.claude/metadata/skill-registry.json`
2. Match charter against skill triggers
3. Present matches to user
4. Store in `framework-config.json` projectSkills
5. Deploy skills: `node .claude/scripts/shared/install-skill.js <skills>`
6. Report deployment results
## Extension Recipe Suggestions
After skill selection, suggest extension recipes based on tech stack.
**Triggers:** `/charter` (create), `/charter update` (Tech Stack), `/charter refresh` (re-detect)
**Skip if:** `extensionSuggestions: false` or no release commands installed.
**Steps:**
1. Load `.claude/metadata/recipe-tech-mapping.json`
2. Match tech indicators → recipes
3. Filter already-installed (check extension point content)
4. ASK USER: Install recipes? (y/n/select)
5. Implement: Insert template between `USER-EXTENSION-START/END` markers
6. Report: `✓ {recipe} → {command}:{point}`
**Opt-out:** Add `"extensionSuggestions": false` to `framework-config.json`
---
**End of /charter Command**
