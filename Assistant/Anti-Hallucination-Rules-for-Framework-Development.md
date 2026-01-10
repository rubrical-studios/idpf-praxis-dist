# Anti-Hallucination Rules for Framework Development
**Version:** v0.23.0
## Core Principle
**Accuracy over speed. Verification over assumption. Completeness over convenience.**
Framework errors propagate to all users. Version mistakes, missing CHANGELOG entries, or inconsistent registries affect every project using the framework.
---
## Information Source Hierarchy
1. **Git history and tags** (absolute authority) - Commit messages, tags, `git log`
2. **Existing framework files** (current state) - Registry files, CHANGELOG.md, directory contents
3. **Issue tracker** (intent and requirements) - GitHub issues, pull requests
4. **Documentation** (reference, may be stale) - Framework-Overview.md, README.md
---
## Absolute "Never Do" Rules
### NEVER Invent:
- Version numbers without analyzing commits
- CHANGELOG entries without reviewing actual changes
- Skill counts without listing actual directories
- Specialist counts without verifying files exist
- Framework features not implemented in code
- File paths without verifying they exist
- Registry entries for non-existent components
- Installation commands or user workflows without verifying documentation
- CLI commands, npm packages, or tool names without checking they exist
- URLs or endpoints without verifying they are valid
### NEVER Assume:
- A patch version is appropriate without commit analysis
- CHANGELOG is complete without verifying against commits
- Install scripts are synchronized without comparing both
- Skill packages match source directories without checking
- Counts in documentation match actual files
- Proposals were moved to Implemented without verifying
- All changes were committed
---
## STOP Boundary Enforcement
When a command spec includes STOP boundary (e.g., `## STOP — Workflow Boundary`), this is a **hard stop**.
**Rules:**
1. STOP means STOP - Execution must halt
2. No "helpful continuation" past boundaries
3. User instruction required to cross STOP boundary
4. Re-verify after context loss - Re-read command specs before continuing
---
## Version Management Rules
**Before Determining Version Number:**
```bash
git describe --tags --abbrev=0
git log <last-tag>..HEAD --oneline
git log <last-tag>..HEAD --oneline | wc -l
```
**Version Decision Matrix:**
| Commit Contains | Version Type |
|-----------------|--------------|
| ANY new framework (IDPF-*) | MINOR or MAJOR |
| ANY new domain specialist | MINOR |
| ANY new skill | MINOR |
| ANY new feature or capability | MINOR |
| ONLY bug fixes | PATCH |
| ONLY documentation updates | PATCH |
**If in doubt, choose HIGHER version type.**
### CHANGELOG Discipline
1. Review every commit (not just triggering issue)
2. Categorize properly (Added, Changed, Fixed, Removed)
3. Include issue numbers (#XX)
4. Group related changes
---
## Cross-Reference Validation Rules
| File A | Must Match | File B |
|--------|------------|--------|
| `framework-manifest.json` version | = | `CHANGELOG.md` latest version |
| `framework-manifest.json` version | = | `README.md` version |
| Skills in `Skills/` directories | = | Skills in `Skills/Packaged/*.zip` |
| Skills in MAINTENANCE.md registry | = | Skills in `Skills/` directories |
| Specialists in `System-Instructions/Domain/` | = | Count in documentation |
| Frameworks in `IDPF-*/` directories | = | List in framework-manifest.json |
**Validation Commands:**
```bash
ls -d Skills/*/ | grep -v Packaged | wc -l
ls Skills/Packaged/*.zip | wc -l
ls System-Instructions/Domain/*.md | wc -l
ls -d IDPF-*/ 2>/dev/null
```
---
## Registry Synchronization Rules
**Skills Registry (Skills/MAINTENANCE.md):**
- Every skill directory has registry entry
- Every registry entry has corresponding directory
- Version numbers match SKILL.md files
- Framework-Skill dependency matrix matches install scripts
---
## Proposal Workflow Rules
1. Before starting: Verify proposal exists in `Proposal/`
2. After implementing: Move to `Proposal/Implemented/`
3. In commit message: Reference the proposal file
4. In CHANGELOG: Document the implementation
---
## File Operation Rules
**Before Bulk Updates:**
1. List all files to be affected
2. Read each file before modifying
3. Track progress explicitly
4. Verify completion by listing again
---
## Self-Checking Before Release
**Pre-Release Checklist:**
- [ ] Ran `git log <last-tag>..HEAD` and reviewed ALL commits
- [ ] Version number reflects HIGHEST change type
- [ ] CHANGELOG documents every significant commit
- [ ] All counts in documentation match actual file counts
- [ ] Install scripts synchronized
- [ ] Skill packages match skill directories
- [ ] framework-manifest.json version matches CHANGELOG
- [ ] README.md version matches framework-manifest.json
- [ ] All implemented proposals moved to Implemented/
**Post-Release Verification:**
- [ ] Git tag created and pushed
- [ ] GitHub shows correct tag
- [ ] No uncommitted changes remain
---
## Common Mistakes to Avoid
| Mistake | Bad | Good |
|---------|-----|------|
| Patch for feature release | 69 commits with 7 new frameworks → v2.3.1 | → v2.4.0 |
| Incomplete CHANGELOG | Only mentions triggering issue | Documents all features/fixes |
| Assumed counts | "There are 14 skills" (memory) | "Listed Skills/: 14 directories found" |
| Invented commands | "Run `npx install-idpf`" | "Run `node install.js`" (verified) |
---
## When Communicating with Users
**Verify Before Stating:** Installation commands, CLI tool names, npm packages, URLs, file paths.
**When Uncertain, Be Generic:**
- BAD: "Run `npx idpf-install`"
- GOOD: "Follow the installation instructions in README.md"
---
## Final Reminder
**Framework errors multiply.** When tempted to skip verification:
1. **Stop** - The release can wait
2. **Verify** - Run the commands, check the files
3. **Document** - Show your verification work
4. **Release** - Only when confident
---
**End of Anti-Hallucination Rules for Framework Development**
