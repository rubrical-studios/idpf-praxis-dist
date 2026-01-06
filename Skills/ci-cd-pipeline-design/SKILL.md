---
name: ci-cd-pipeline-design
description: Guide developers through CI/CD pipeline design including architecture patterns, stage design, and security considerations
license: Complete terms in LICENSE.txt
---
# CI/CD Pipeline Design
**Version:** v0.22.0
**Source:** Skills/ci-cd-pipeline-design/SKILL.md

Guides developers through designing effective CI/CD pipelines including pipeline architecture, stage design, environment promotion strategies, and security considerations.
## When to Use This Skill
- Setting up CI/CD for a new project
- Optimizing existing pipeline performance
- Adding security scanning to pipelines
- Designing multi-environment deployment
- Choosing between CI/CD platforms
## CI/CD Fundamentals
**Continuous Integration (CI):** Automatically build and test code on every change. Goals: detect integration issues early, maintain code quality, fast feedback (<10 min ideal).
**Continuous Delivery (CD):** Automatically prepare releases for deployment. Goals: always deployable main branch, consistent release process, reduced deployment risk.
**Continuous Deployment:** Automatically deploy every change to production. Requirements: high test coverage, feature flags, monitoring, fast rollback.
## Pipeline Architecture Patterns
### Linear Pipeline
```
Build -> Test -> Security -> Deploy
```
Best for simple projects, single deployment target.
### Parallel Pipeline
```
        ┌─ Unit Tests ──┐
Build ──┼─ Lint/Format ─┼── Deploy
        └─ SAST Scan ───┘
```
Best for faster feedback, independent quality gates.
### Multi-Environment Pipeline
```
Build -> Test -> Staging -> Approval -> Production
```
Best for production deployments, compliance requirements.
## Stage Design
**Build Stage:** Create deployable artifacts. Cache dependencies, use multi-stage builds, version artifacts.
**Test Stage:** Verify code quality. Follow test pyramid (many unit, some integration, few E2E).
**Security Stage:** Identify vulnerabilities. SAST, dependency scan, secrets scan, container scan.
**Deploy Stage:** Release to target environment. Automatic to staging, manual approval for production.
## Environment Promotion Strategies
| Strategy | Description |
|----------|-------------|
| **Sequential** | Dev -> QA -> Staging -> Production |
| **Blue-Green** | Deploy to Green, switch traffic, keep Blue for rollback |
| **Canary** | Deploy to subset (10%), monitor, gradually increase |
| **Rolling** | Update instances one at a time |
## Security Considerations
**Secrets Management:** Never hardcode secrets, use environment variables or secret management services, rotate regularly.
**SAST Integration:** Run static analysis (Semgrep, SonarQube, CodeQL), fail on high/critical findings.
**Supply Chain Security:** Dependency scanning (npm audit, Snyk), SBOM generation.
**Container Security:** Scan images (Trivy), sign images (cosign).
## GitHub API Best Practices
**Authentication:** Use fine-scoped PATs or GitHub Apps, reuse tokens across runs.
**Rate Limiting:** Implement exponential backoff with jitter, monitor `X-RateLimit-Remaining` headers.
**Workflow Triggers:** Prevent cascading runs with `concurrency` settings:
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```
**Abuse Detection Prevention:** Avoid high-volume auth attempts, rapid workflow creation/deletion, excessive API calls.
## Best Practices
1. **Fast Feedback** - Keep CI under 10 minutes, run fast tests first, parallelize
2. **Reliable Pipelines** - Reproducible builds, pin dependencies, consistent environments
3. **Clear Visibility** - Good naming, clear stage purposes, meaningful errors
4. **Security First** - Scan early, block on security failures, minimal permissions
5. **Environment Parity** - Same configuration patterns, infrastructure as code
## Resources
See `resources/` directory for architecture patterns, stage design, platform examples, and security checklist.
## Relationship to Other Skills
**Complements:** `api-versioning`, `migration-patterns`
**Independent from:** TDD skills
## Expected Outcome
After using this skill: Pipeline architecture designed, stages configured, security scanning integrated, environment promotion strategy defined, platform-specific implementation ready.
---
**End of CI/CD Pipeline Design Skill**
