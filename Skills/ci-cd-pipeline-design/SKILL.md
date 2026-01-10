---
name: ci-cd-pipeline-design
description: Guide developers through CI/CD pipeline design including architecture patterns, stage design, and security considerations
license: Complete terms in LICENSE.txt
---

# CI/CD Pipeline Design
**Version:** v0.23.0

## When to Use

- Setting up CI/CD for a new project
- Optimizing existing pipeline performance
- Adding security scanning to pipelines
- Designing multi-environment deployment
- Choosing between CI/CD platforms

## Pipeline Architecture

### Linear Pipeline
```
Build -> Test -> Security -> Deploy
```
**Best for:** Simple projects, single deployment target

### Parallel Pipeline
```
        ┌─ Unit Tests ─┐
Build ──┼─ Lint/Format ┼── Deploy
        └─ SAST Scan  ─┘
```
**Best for:** Faster feedback, resource efficiency

### Multi-Environment Pipeline
```
Build -> Test -> Staging -> Approval -> Production
```
**Best for:** Production deployments, compliance requirements

## Stage Design

### Build Stage
```yaml
build:
  steps:
    - checkout code
    - install dependencies
    - compile/transpile
    - create artifacts
```

### Test Stage
```yaml
test:
  parallel:
    unit_tests:
      - run unit tests
      - collect coverage
    integration_tests:
      - start dependencies
      - run integration tests
```

### Security Stage
```yaml
security:
  parallel:
    sast: static code analysis
    dependency_scan: check for vulnerable dependencies
    secrets_scan: detect hardcoded secrets
    container_scan: scan container images
```

**Tools:**
- SAST: SonarQube, Semgrep, CodeQL
- Dependencies: Dependabot, Snyk
- Secrets: GitLeaks, TruffleHog
- Containers: Trivy, Clair

## Environment Promotion

### Blue-Green Deployment
```
Load Balancer
    ├── Blue (current)
    └── Green (new)
```
Switch traffic after verification.

### Canary Deployment
```
Traffic: 90% -> Stable (v1)
         10% -> Canary (v2)
```
Gradually increase traffic to new version.

### Rolling Deployment
Update instances one at a time with health checks.

## Security Considerations

### Secrets Management
```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
```
- Use environment variables
- Use secret management services
- Rotate secrets regularly

### Supply Chain Security
```yaml
dependencies:
  steps:
    - npm audit --audit-level=high
    - syft packages . -o spdx-json > sbom.json
```

## GitHub API Best Practices

### Rate Limiting
```yaml
retry:
  max_attempts: 3
  initial_interval: 1s
  multiplier: 2
  randomization_factor: 0.5
```

### Workflow Triggers
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Abuse Detection Prevention
- Use fine-scoped PATs instead of interactive auth
- Implement request throttling
- Add delays between bulk operations
- Use GitHub Apps with proper rate limit handling

## Best Practices

1. **Fast Feedback** - Keep CI under 10 minutes
2. **Reliable Pipelines** - Pin dependency versions
3. **Clear Visibility** - Good naming, meaningful error messages
4. **Security First** - Scan early and often
5. **Environment Parity** - Infrastructure as code

## Resources

- `resources/architecture-patterns.md`
- `resources/stage-design.md`
- `resources/platform-examples.md`
- `resources/security-checklist.md`

---

**End of CI/CD Pipeline Design Skill**
