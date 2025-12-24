---
name: ci-cd-pipeline-design
version: v0.15.0
description: Pipeline architecture, stage design, security for CI/CD
---

# CI/CD Pipeline Design

## When to Use
- Setting up automated builds/deploys
- Designing pipeline architecture
- GitHub Actions, GitLab CI, Jenkins

## Pipeline Stages
```
Build → Test → Security Scan → Deploy (staging) → Deploy (prod)
```

## GitHub Actions Example
```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

## GitHub API Best Practices

### Rate Limits
- Authenticated: 5,000 requests/hour
- Use conditional requests (If-None-Match)
- Implement exponential backoff

### Authentication
- GitHub Apps (recommended for CI)
- Personal Access Tokens (fine-grained)
- GITHUB_TOKEN (workflow default)

### Workflow Cascade Prevention
```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - '**.md'
      - '.github/**'
```

## Security Best Practices
- Use secrets for credentials
- Pin action versions (v4, not v4.x)
- Scan dependencies (Dependabot)
- Run SAST before deploy
- Use OIDC for cloud deployments
