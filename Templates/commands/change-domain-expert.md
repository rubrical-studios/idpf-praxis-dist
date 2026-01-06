---
version: "v0.22.0"
description: Change domain specialist for this project
argument-hint: [specialist-name] (optional)
---
**Source:** Templates/commands/change-domain-expert.md

# /change-domain-expert
Change the active domain specialist for this project.

**Prerequisites:** Framework v0.17.0+, `framework-config.json` exists

## Available Base Experts
| # | Specialist | Focus |
|---|------------|-------|
| 1 | Full-Stack-Developer | End-to-end web |
| 2 | Backend-Specialist | Server-side, APIs |
| 3 | Frontend-Specialist | UI/UX, client-side |
| 4 | Mobile-Specialist | iOS, Android, cross-platform |
| 5 | Desktop-Application-Developer | Native desktop |
| 6 | Embedded-Systems-Engineer | Hardware-software |
| 7 | Game-Developer | Game engines, graphics |
| 8 | ML-Engineer | ML and AI systems |
| 9 | Data-Engineer | Data pipelines |
| 10 | Cloud-Solutions-Architect | Cloud infrastructure |
| 11 | SRE-Specialist | Reliability, operations |
| 12 | Systems-Programmer-Specialist | Low-level systems |

## Workflow
### Step 1: Read Current Configuration
```bash
cat framework-config.json
```
Extract `frameworkPath` and current `projectType.domainSpecialist`.

### Step 2: Select New Specialist
**If argument:** Use specified name.
**If no argument:** Present numbered list, ask user to select (1-12) or type name.

### Step 3: Validate
Must be one of 12 Base Experts. If invalid, report error and stop.

### Step 4: Update framework-config.json
Update `projectType.domainSpecialist` to new value.

### Step 5: Update CLAUDE.md
Replace `**Domain Specialist:**` line and update On-Demand Documentation path.

### Step 6: Update .claude/rules/03-startup.md
Update: metadata line, specialist file path, "Active Role" message.

### Step 7: Load New Specialist
```bash
cat "{frameworkPath}/System-Instructions/Domain/Base/{new-specialist}.md"
```

### Step 8: Report
```
Domain specialist changed successfully.
Previous: {old-specialist}
New: {new-specialist}
The new specialist profile has been loaded and is now active.
```
