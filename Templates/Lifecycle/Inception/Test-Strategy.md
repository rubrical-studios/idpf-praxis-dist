# Test Strategy: {project-name}
**Last Updated:** {date}
---
## Testing Philosophy
{Brief statement of approach and priorities}
---
## Test Pyramid
| Level | Coverage | Approach |
|-------|----------|----------|
| Unit | {target %} | {framework, style} |
| Integration | {target %} | {approach} |
| E2E | {target %} | {framework, scope} |
---
## Test Types
### Unit Tests
- **Framework:** {test framework}
- **Location:** {test directory}
- **Naming:** {convention}
- **Coverage Target:** {X%}
### Integration Tests
- **Framework:** {test framework}
- **Scope:** {what integrations}
- **Environment:** {test database, mocks}
### End-to-End Tests
- **Framework:** {E2E framework}
- **Scope:** {critical user flows}
- **Environment:** {staging, docker}
---
## Quality Gates
| Gate | Criteria | Enforcement |
|------|----------|-------------|
| Pre-commit | | |
| PR Merge | | |
| Release | | |
---
## Test Data Strategy
| Type | Approach |
|------|----------|
| Unit test data | Fixtures / Factories / Inline |
| Integration test data | Seeded DB / Mocks |
| E2E test data | Test environment / Snapshots |
---
## Special Testing
### Performance Testing
{Approach or "Not in scope for MVP"}
### Security Testing
{Approach or "Manual review"}
### Accessibility Testing
{Approach or "Not applicable"}
---
## Definition of "Tested"
- [ ] Unit tests cover core logic
- [ ] Integration tests verify external dependencies
- [ ] E2E tests cover critical paths
- [ ] All tests pass in CI
---
*See: Charter-Details.md, Constraints.md*
