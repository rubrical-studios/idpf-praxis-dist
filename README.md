# IDPF Framework - AI-Assisted Development

**Current Version:** 2.9.5

A comprehensive ecosystem for AI-assisted software development with Claude.

---

## Installation

```bash
# From your project directory
node path/to/framework/install.js
```

The installer will:
- Detect your project type
- Copy required framework files
- Configure Claude Code integration
- Deploy rules to `.claude/rules/` for auto-loading

---

## Frameworks

| Framework | Use When |
|-----------|----------|
| **IDPF-Structured** | Fixed requirements, TDD rigor |
| **IDPF-Agile** | Evolving requirements, sprints |
| **IDPF-Vibe** | Unclear requirements, exploration |
| **IDPF-LTS** | Production maintenance mode |

### Testing Frameworks
- IDPF-Testing-Core, IDPF-QA-Automation, IDPF-Performance
- IDPF-Security, IDPF-Accessibility, IDPF-Chaos, IDPF-Contract-Testing

### Requirements
- IDPF-PRD - Requirements engineering with PRD templates

---

## Skills (14)

**TDD:** tdd-red-phase, tdd-green-phase, tdd-refactor-phase, tdd-failure-recovery, test-writing-patterns

**Beginner Setup:** flask-setup, sinatra-setup

**Beginner Support:** beginner-testing, common-errors, sqlite-integration

**Analysis:** uml-generation, anti-pattern-analysis, bdd-writing, extract-prd

---

## Domain Specialists (18)

Full-Stack-Developer, Backend-Specialist, Frontend-Specialist, DevOps-Engineer, Database-Engineer, API-Integration-Specialist, Security-Engineer, Platform-Engineer, Mobile-Specialist, Data-Engineer, QA-Test-Engineer, Cloud-Solutions-Architect, SRE-Specialist, Embedded-Systems-Engineer, ML-Engineer, Performance-Engineer, PRD-Analyst, Accessibility-Specialist

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

### Migration for Existing Projects

```bash
node [frameworkPath]/install.js --migrate
```

---

## Documentation

- `Overview/Framework-Overview.md` - Complete ecosystem reference
- `Reference/Session-Startup-Instructions.md` - Startup procedure

---

## Source Repository

https://github.com/rubrical-studios/process-docs

---

## License

[Your license here]
