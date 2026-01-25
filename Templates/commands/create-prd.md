---
version: "v0.33.0"
description: Transform proposal into Agile PRD
argument-hint: "<issue-number> | extract [<directory>]"
---
# /create-prd
Transform a proposal into an Agile PRD with user stories and epics.
## Available Extension Points
| Point | Location | Purpose |
|-------|----------|---------|
| `pre-analysis` | Before proposal analysis | Custom validation |
| `post-analysis` | After gap analysis | Custom analysis |
| `pre-transform` | Before story transformation | Pre-transformation hooks |
| `post-transform` | After story transformation | Story validation |
| `pre-diagram` | Before diagram generation | Diagram setup |
| `post-diagram` | After diagram generation | Diagram post-processing |
| `pre-generation` | Before PRD generation | Template customization |
| `post-generation` | After PRD generation | Custom finalization |
| `diagram-generator` | Custom diagram generation | Replace default generator |
| `quality-checklist` | Custom quality checks | Additional validation |
## Arguments
| Argument | Description |
|----------|-------------|
| `<issue-number>` | Proposal issue number |
| `extract` | Extract PRD from codebase |
| `extract <directory>` | Extract from specific directory |
## Modes
| Mode | Invocation | Description |
|------|------------|-------------|
| **Issue-Driven** | `/create-prd 123` | Transform proposal to PRD |
| **Extract** | `/create-prd extract` | Extract from codebase |
| **Interactive** | `/create-prd` | Prompt for mode |
## Execution Instructions
Use `TodoWrite` to create todos from phases.
## Workflow (Issue-Driven Mode)
### Phase 1: Fetch Proposal
Parse issue number, validate `proposal` label, extract proposal path.
<!-- USER-EXTENSION-START: pre-analysis -->
<!-- USER-EXTENSION-END: pre-analysis -->
### Phase 2: Validate Against Charter
Compare proposal against charter scope.
### Phase 3: Analyze Gaps
Parse proposal for present/missing elements.
<!-- USER-EXTENSION-START: post-analysis -->
<!-- USER-EXTENSION-END: post-analysis -->
### Phase 4: Dynamic Questions
Generate context-aware questions for missing elements.
<!-- USER-EXTENSION-START: pre-transform -->
<!-- USER-EXTENSION-END: pre-transform -->
### Phase 4.5: Story Transformation
Transform requirements into Agile user stories.
<!-- USER-EXTENSION-START: post-transform -->
<!-- USER-EXTENSION-END: post-transform -->
### Phase 5: Priority Validation
Validate priority distribution (P0 <=40%, P1 30-40%, P2 >=20%).
<!-- USER-EXTENSION-START: pre-diagram -->
<!-- USER-EXTENSION-END: pre-diagram -->
### Phase 5.5: Diagram Generation
Generate UML diagrams as `.drawio.svg` files.
<!-- USER-EXTENSION-START: diagram-generator -->
<!-- USER-EXTENSION-END: diagram-generator -->
<!-- USER-EXTENSION-START: post-diagram -->
<!-- USER-EXTENSION-END: post-diagram -->
<!-- USER-EXTENSION-START: pre-generation -->
<!-- USER-EXTENSION-END: pre-generation -->
### Phase 6: Generate PRD
Create `PRD/{name}/PRD-{name}.md` with overview, epics, stories, diagrams.
<!-- USER-EXTENSION-START: post-generation -->
<!-- USER-EXTENSION-END: post-generation -->
<!-- USER-EXTENSION-START: quality-checklist -->
<!-- USER-EXTENSION-END: quality-checklist -->
### Phase 6.5: Generate TDD Test Plan
Create `PRD/{name}/Test-Plan-{name}.md` from acceptance criteria.
### Phase 6.6: Create Test Plan Approval Issue
Create approval issue with `test-plan` and `approval-required` labels.
### Phase 7: Complete Proposal Lifecycle
Move proposal to Implemented/, close proposal issue, create PRD tracking issue.
## Workflow (Extract Mode)
1. Check Inception/ artifacts
2. Load codebase-analysis skill
3. Analyze codebase
4. User validation
5. Generate PRD
## Technical Skills Mapping
After PRD generation, match technical requirements against skill registry.
---
**End of /create-prd Command**
