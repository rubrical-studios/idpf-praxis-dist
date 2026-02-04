# Anti-Hallucination Rules for Framework Development
**Version:** v0.36.2
**Source:** Assistant/Anti-Hallucination-Rules-for-Framework-Development.md
## Core Principle
**Accuracy over speed. Verification over assumption. Completeness over convenience.**
Framework errors propagate to all users. Version mistakes, missing CHANGELOG entries, or inconsistent registries affect every project.
---
## Information Source Hierarchy
1. **Git history and tags** (absolute authority) - commits, tags, `git log`
2. **Existing framework files** (current state) - MAINTENANCE.md, framework-manifest.json, CHANGELOG.md
3. **Issue tracker** (intent) - GitHub issues, PRs
4. **Documentation** (reference, may be stale)
---
## Absolute "Never Do" Rules
**NEVER Invent:**
- ❌ Version numbers without analyzing commits
- ❌ CHANGELOG entries without reviewing actual changes
- ❌ Skill/specialist counts without listing actual directories
- ❌ Framework features not implemented in code
- ❌ File paths without verifying they exist
- ❌ Registry entries for non-existent components
- ❌ CLI commands, npm packages, URLs without verification
**NEVER Assume:**
- ❌ Patch version appropriate without commit analysis
- ❌ CHANGELOG complete without verifying against commits
- ❌ Install scripts synchronized without comparing both
- ❌ Counts in documentation match actual files
- ❌ Proposals moved to Implemented without verifying
**NEVER Defer or Reduce Scope Without Confirmation:**
- ❌ Mark requirements as "optional" without user approval
- ❌ Defer to "future work" without explicit agreement
- ❌ Skip acceptance criteria without confirmation
- ❌ Simplify requirements without consent
- ❌ Declare anything "out of scope" that was specified
**When concerns arise:** STOP → REPORT concern → ASK user → WAIT for decision
```
❌ "I've implemented core functionality. Edge cases can be added later."
✅ "Edge cases in AC-3 require additional work. Proceed as specified, or adjust scope?"
```
---
## STOP Boundary Enforcement
Command spec STOP boundaries are **absolute hard stops**.
**Rules:**
1. **STOP means STOP** - Execution halts at the boundary
2. **No "helpful continuation"** - Do not proceed even if logical
3. **User instruction required** - Only explicit user instruction authorizes crossing
4. **Re-verify after compaction** - Re-read command specs, verify position
---
## Version Management Rules
**Before determining version:**
```bash
git describe --tags --abbrev=0                    # Last release
git log <last-tag>..HEAD --oneline               # All commits since
git log <last-tag>..HEAD --pretty=format:"%s" | grep -E "^(Add|Implement)"  # Features
git log <last-tag>..HEAD --pretty=format:"%s" | grep -E "^Fix"              # Fixes
```
**Version Decision Matrix:**
| Commit Contains | Version Type |
|-----------------|--------------|
| ANY new framework/specialist/skill/feature | MINOR |
| ONLY bug fixes or docs | PATCH |
**If in doubt, choose HIGHER version type.**
**CHANGELOG Discipline:** Every release documents ALL changes since last release. Review every commit, categorize properly (Added/Changed/Fixed/Removed), include issue numbers.
---
## Cross-Reference Validation
| File A | Must Match | File B |
|--------|------------|--------|
| `framework-manifest.json` version | = | `CHANGELOG.md` latest |
| `framework-manifest.json` version | = | `README.md` version |
| Skills in `Skills/` | = | `Skills/Packaged/*.zip` |
| Skills in MAINTENANCE.md | = | `Skills/` directories |
| Specialists in `System-Instructions/Domain/` | = | Documentation count |
| Frameworks in `IDPF-*/` | = | `framework-manifest.json` |
**Validation:**
```bash
ls -d Skills/*/ | grep -v Packaged | wc -l    # Skill directories
ls Skills/Packaged/*.zip | wc -l               # Skill packages
ls System-Instructions/Domain/*.md | wc -l     # Specialists
ls -d IDPF-*/ 2>/dev/null                      # Frameworks
```
---
## Registry Synchronization
Before release verify:
- [ ] Every skill directory has registry entry
- [ ] Every registry entry has corresponding directory
- [ ] Version numbers match SKILL.md files
- [ ] Framework-Skill dependency matrix matches install scripts
---
## Proposal Workflow
1. **Before starting:** Verify proposal exists in `Proposal/`
2. **After implementing:** `git mv Proposal/Name.md Proposal/Implemented/`
3. **In commit:** Reference proposal file
4. **In CHANGELOG:** Document implementation
---
## File Operation Rules
1. **List all files** before bulk updates
2. **Read each file** before modifying
3. **Track progress** explicitly
4. **Verify completion** by listing again
```
❌ BAD: "Updated all 14 skills"
✅ GOOD: "Listed skills: [14 names]. Updated each. Verified: 14 complete."
```
---
## Pre-Release Checklist
- [ ] Ran `git log <last-tag>..HEAD` and reviewed ALL commits
- [ ] Version reflects HIGHEST change type in commits
- [ ] CHANGELOG documents every significant commit
- [ ] All counts match actual file counts
- [ ] Install scripts synchronized
- [ ] Skill packages match directories
- [ ] framework-manifest.json version = CHANGELOG = README
- [ ] Implemented proposals moved to Implemented/
**Post-Release:**
- [ ] Git tag created and pushed
- [ ] GitHub shows correct tag
- [ ] No uncommitted changes remain
---
## Common Mistakes
| Mistake | Bad | Good |
|---------|-----|------|
| Patch for features | 69 commits, 7 frameworks → v2.3.1 | → v2.4.0 |
| Incomplete CHANGELOG | Only triggering issue | All changes since last release |
| Assumed counts | "14 skills" (memory) | "Listed: 14 found" (verified) |
| Invented commands | `npx install-idpf` | `node install.js` (verified) |
---
## User Communication
**Verify before stating:** Installation commands, CLI tools, npm packages, URLs, file paths.
**When uncertain, be generic:**
```
❌ "Run `npx idpf-install`"
✅ "Follow instructions in README.md"
```
---
## Final Reminder
**Framework errors multiply.** Verify:
1. **Commits** - Review all before versioning
2. **Counts** - List files, don't assume
3. **Consistency** - Cross-check versions
4. **Completeness** - Document everything
When tempted to skip: **Stop → Verify → Document → Release**
---
**End of Anti-Hallucination Rules for Framework Development**
