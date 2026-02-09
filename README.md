# IDPF Framework - AI-Assisted Development

**Current Version:** v0.41.1

A comprehensive ecosystem for AI-assisted software development with Claude.

---

## Installation

### Central Hub (recommended)
```bash
# Create central hub installation
node path/to/framework/install-hub.js
```

### Add to Project
```bash
# New project with IDPF integration
node path/to/framework/install-project-new.js

# Add to existing project
node path/to/framework/install-project-existing.js
```

The hub installer will:
- Create a central hub that serves multiple projects
- Deploy framework files, commands, rules, and scripts
- Configure Claude Code integration via symlinks

---

## Frameworks

| Framework | Use When |
|-----------|----------|
| **IDPF-Agile** | Story-based development with TDD |
| **IDPF-Vibe** | Exploration phase, unclear requirements → evolves to Agile |

### Testing Frameworks
- IDPF-Testing, IDPF-QA-Automation, IDPF-Performance
- IDPF-Security, IDPF-Accessibility, IDPF-Chaos, IDPF-Contract-Testing

### Requirements
> **Note:** Requirements engineering uses the `create-prd` skill (IDPF-PRD deprecated in v0.24).

---

## Skills (23)

**TDD:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

**Beginner Setup:** flask-setup, sinatra-setup

**Beginner Support:** beginner-testing, common-errors, sqlite-integration

**Database:** postgresql-integration, migration-patterns

**Architecture:** api-versioning, error-handling-patterns

**Advanced Testing:** property-based-testing, mutation-testing

**Analysis:** anti-pattern-analysis, bdd-writing, codebase-analysis, extract-prd

**DevOps:** ci-cd-pipeline-design

**Desktop:** electron-development, playwright-setup

---

## Domain Specialists (22)

Accessibility-Specialist, API-Integration-Specialist, Backend-Specialist, Cloud-Solutions-Architect, Database-Engineer, Data-Engineer, Desktop-Application-Developer, DevOps-Engineer, Embedded-Systems-Engineer, Frontend-Specialist, Full-Stack-Developer, Game-Developer, Graphics-Engineer-Specialist, ML-Engineer, Mobile-Specialist, Performance-Engineer, Platform-Engineer, QA-Test-Engineer, Security-Engineer, SRE-Specialist, Systems-Programmer-Specialist, Technical-Writer-Specialist

---

## Updating

```bash
# From your project directory (where framework-config.json is)
node [frameworkPath]/fetch-updates.js
```

---

## Rules Auto-Loading (v2.9+)

Rules in `.claude/rules/` load automatically at session start:
- No explicit file reads required
- Rules persist after context compaction
- ~47% token reduction at startup

### Adding IDPF to Existing Projects

```bash
node [frameworkPath]/install-project-existing.js
```

---

## Documentation

- `Overview/Framework-Overview.md` - Complete ecosystem reference
- `Reference/Session-Startup-Instructions.md` - Startup procedure

---

## Source Repository

https://github.com/rubrical-studios/idpf-praxis

---

## License

MIT License - Copyright (c) 2025 Rubrical Studios

See [LICENSE](LICENSE) for full text.
