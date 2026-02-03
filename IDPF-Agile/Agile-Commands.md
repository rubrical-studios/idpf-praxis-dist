# Agile-Driven Development Framework - Commands
**Version:** v0.35.2
**Module:** Commands (loaded on-demand)
## Backlog Management
| Command | Description | Slash Command |
|---------|-------------|---------------|
| `Create-Backlog` | Create epics/stories from PRD | `/create-backlog` |
| `Add-Story` | Add story to epic | `/add-story` |
| `Prioritize-Backlog` | Update Priority (P0/P1/P2) | - |
| `Split-Story [#ID]` | Split story | `/split-story` |
### Create-Backlog Workflow
1. Validate PRD issue
2. Test plan approval gate (block if open)
3. Parse PRD for epics/stories
4. Load test cases
5. Create epic issues
6. Create story issues with TDD test cases
7. Link stories to epics
8. Update PRD status
### Add-Story Workflow
1. Validate epic
2. Get description
3. Charter compliance check
4. Create issue
5. Link to epic
6. Update test plan
## Story Workflow
| Action | Trigger | Behavior |
|--------|---------|----------|
| Start | `work #N` | Status to In Progress, display, begin TDD |
| Complete | `done` | Verify, test, status to Done |
## Release Lifecycle
| Command | Slash Command |
|---------|---------------|
| `Create-Branch` | `/create-branch` |
| `Prepare-Release` | `/prepare-release` |
| `Merge-Branch` | `/merge-branch` |
| `Destroy-Branch` | `/destroy-branch` |
### Release Flow
```
/create-branch release/vX.Y.Z
    → Work on branch
    → gh pmu move [#] --branch current
    → work #N
/prepare-release
    → Commit analysis → Version updates → Validation → PR → merge → tag → Close
```
## Special Scenarios
| Command | Slash Command |
|---------|---------------|
| `Emergency-Bug [desc]` | `/emergency-bug` |
| `Pivot [direction]` | `/pivot` |
---
**End of Commands Module**
