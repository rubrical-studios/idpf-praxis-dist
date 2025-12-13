---
name: ci-cd-pipeline-design
version: 1.0.0
description: Guide developers through CI/CD pipeline design including architecture patterns, stage design, and security considerations
license: Complete terms in LICENSE.txt
---
# CI/CD Pipeline Design
This Skill guides developers through designing effective CI/CD pipelines including pipeline architecture, stage design, environment promotion strategies, and security considerations.
## When to Use This Skill
Invoke this Skill when:
- Setting up CI/CD for a new project
- Optimizing existing pipeline performance
- Adding security scanning to pipelines
- Designing multi-environment deployment
- Choosing between CI/CD platforms
## CI/CD Fundamentals
### Continuous Integration (CI)
Automatically build and test code on every change.
**Goals:** Detect integration issues early, maintain code quality, provide fast feedback to developers
**Key practices:** Frequent commits (at least daily), automated builds, automated tests, fast feedback (under 10 minutes ideal)
### Continuous Delivery (CD)
Automatically prepare releases for deployment.
**Goals:** Always deployable main branch, consistent release process, reduced deployment risk
**Key practices:** Automated deployment to staging, manual approval for production, rollback capability, environment parity
### Continuous Deployment
Automatically deploy every change to production.
**Goals:** Fastest time to market, small incremental changes, immediate user feedback
**Requirements:** High test coverage, feature flags, monitoring and alerting, fast rollback
## Pipeline Architecture
### Linear Pipeline
```
┌───────┐    ┌──────┐    ┌──────────┐    ┌────────┐
│ Build │ →  │ Test │ →  │ Security │ →  │ Deploy │
└───────┘    └──────┘    └──────────┘    └────────┘
```
**Best for:** Simple projects, single deployment target, quick setup
### Parallel Pipeline
```
              ┌─────────────┐
          ┌───│ Unit Tests  │───┐
          │   └─────────────┘   │
┌───────┐ │   ┌─────────────┐   │   ┌────────┐
│ Build │─┼───│ Lint/Format │───┼───│ Deploy │
└───────┘ │   └─────────────┘   │   └────────┘
          │   ┌─────────────┐   │
          └───│ SAST Scan   │───┘
              └─────────────┘
```
**Best for:** Faster feedback, independent quality gates, resource efficiency
### Fan-out/Fan-in
```
              ┌──────────┐
          ┌───│ Test DB1 │───┐
          │   └──────────┘   │
┌───────┐ │   ┌──────────┐   │   ┌─────────────┐
│ Build │─┼───│ Test DB2 │───┼───│ Integration │
└───────┘ │   └──────────┘   │   └─────────────┘
          │   ┌──────────┐   │
          └───│ Test DB3 │───┘
              └──────────┘
```
**Best for:** Matrix testing, multi-platform builds, comprehensive coverage
### Multi-Environment Pipeline
```
┌───────┐    ┌──────┐    ┌─────────┐    ┌─────────┐    ┌────────────┐
│ Build │ →  │ Test │ →  │ Staging │ →  │ Approval│ →  │ Production │
└───────┘    └──────┘    └─────────┘    └─────────┘    └────────────┘
```
**Best for:** Production deployments, compliance requirements, risk mitigation
## Stage Design
### Build Stage
**Purpose:** Create deployable artifacts
```yaml
# Example build stage
build:
  steps:
    - checkout code
    - install dependencies
    - compile/transpile
    - create artifacts
  outputs:
    - application binary/bundle
    - docker image
    - deployment manifests
```
**Best practices:** Cache dependencies, use multi-stage builds, version artifacts, store build metadata
### Test Stage
**Purpose:** Verify code quality and functionality
```yaml
# Example test stage
test:
  parallel:
    unit_tests:
      - run unit tests
      - collect coverage
    integration_tests:
      - start dependencies
      - run integration tests
    e2e_tests:
      - deploy to test environment
      - run end-to-end tests
```
**Test pyramid:**
```
        /\
       /E2E\      Few, slow, expensive
      /─────\
     / Int   \    Some, medium speed
    /─────────\
   /   Unit    \  Many, fast, cheap
  /─────────────\
```
### Security Stage
**Purpose:** Identify security vulnerabilities
```yaml
# Example security stage
security:
  parallel:
    sast:
      - static code analysis
    dependency_scan:
      - check for vulnerable dependencies
    secrets_scan:
      - detect hardcoded secrets
    container_scan:
      - scan container images
```
**Tools by category:**
- SAST: SonarQube, Semgrep, CodeQL
- Dependencies: Dependabot, Snyk, OWASP Dependency-Check
- Secrets: GitLeaks, TruffleHog
- Containers: Trivy, Clair, Anchore
### Deploy Stage
**Purpose:** Release to target environment
```yaml
# Example deploy stage
deploy:
  environments:
    staging:
      trigger: automatic
      steps:
        - deploy application
        - run smoke tests
        - notify team
    production:
      trigger: manual_approval
      steps:
        - deploy canary (10%)
        - monitor metrics
        - gradual rollout
        - full deployment
```
## Environment Promotion
### Strategy: Sequential Promotion
```
Dev → QA → Staging → Production
```
**Process:**
1. Deploy to Dev on every commit
2. Promote to QA after Dev tests pass
3. Promote to Staging after QA approval
4. Promote to Production after final approval
### Strategy: Blue-Green Deployment
```
┌─────────────────────────┐
│    Load Balancer        │
└───────────┬─────────────┘
            │
     ┌──────┴──────┐
     │             │
┌────▼────┐  ┌─────▼───┐
│  Blue   │  │  Green  │
│(current)│  │  (new)  │
└─────────┘  └─────────┘
```
**Process:**
1. Deploy new version to Green
2. Run tests on Green
3. Switch traffic to Green
4. Keep Blue for rollback
### Strategy: Canary Deployment
```
Traffic: 100% ──────────────▶
              │ 90%
              └───▶ Stable (v1)
              │ 10%
              └───▶ Canary (v2)
```
**Process:**
1. Deploy new version to subset
2. Monitor errors and performance
3. Gradually increase traffic
4. Full rollout or rollback
### Strategy: Rolling Deployment
```
Instance 1: v1 → v2
Instance 2: v1 → v1 → v2
Instance 3: v1 → v1 → v1 → v2
```
**Process:**
1. Update instances one at a time
2. Wait for health checks
3. Continue until all updated
4. Rollback by reversing
## Platform-Specific Examples
### GitHub Actions
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm ci && npm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm ci && npm test
  security:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run security scan
        uses: github/codeql-action/analyze@v2
  deploy-staging:
    needs: [test, security]
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to staging
        run: ./deploy.sh staging
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: ./deploy.sh production
```
### GitLab CI
```yaml
stages:
  - build
  - test
  - security
  - deploy
build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
test:
  stage: test
  script:
    - npm ci
    - npm test
  coverage: '/Coverage: \d+\.\d+%/'
sast:
  stage: security
  template: Security/SAST.gitlab-ci.yml
deploy_staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
  only:
    - main
deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
  when: manual
  only:
    - main
```
### Jenkins (Declarative)
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
            }
        }
        stage('Security') {
            steps {
                sh 'npm audit'
            }
        }
        stage('Deploy Staging') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh staging'
            }
        }
        stage('Deploy Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
            }
            steps {
                sh './deploy.sh production'
            }
        }
    }
}
```
## Security Considerations
### Secrets Management
**Never:**
- Hardcode secrets in code
- Commit secrets to repository
- Log secrets
**Do:**
- Use environment variables
- Use secret management services
- Rotate secrets regularly
- Audit secret access
```yaml
# GitHub Actions secrets
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
    run: ./deploy.sh
```
### SAST Integration
```yaml
# Example SAST configuration
security_scan:
  steps:
    - name: Run SAST
      run: |
        semgrep --config=auto src/
        # or
        sonar-scanner
    - name: Check results
      run: |
        # Fail on high/critical findings
        if grep -q "CRITICAL\|HIGH" results.txt; then
          exit 1
        fi
```
### Supply Chain Security
```yaml
# Dependency scanning
dependencies:
  steps:
    - name: Check dependencies
      run: |
        npm audit --audit-level=high
        # or
        snyk test
    - name: SBOM generation
      run: |
        syft packages . -o spdx-json > sbom.json
```
### Container Security
```yaml
# Container scanning
container:
  steps:
    - name: Build image
      run: docker build -t myapp .
    - name: Scan image
      run: trivy image myapp
    - name: Sign image
      run: cosign sign myapp
```
## Pipeline Best Practices
### 1. Fast Feedback
- Keep CI under 10 minutes
- Run fast tests first
- Parallelize where possible
- Cache dependencies
### 2. Reliable Pipelines
- Make builds reproducible
- Pin dependency versions
- Use consistent environments
- Implement retry logic
### 3. Clear Visibility
- Good pipeline naming
- Clear stage purposes
- Meaningful error messages
- Notifications on failure
### 4. Security First
- Scan early and often
- Block on security failures
- Minimal permissions
- Audit pipeline changes
### 5. Environment Parity
- Same configuration patterns
- Infrastructure as code
- Consistent deployment process
- Test in production-like environments
## Resources
See `resources/` directory for:
- `architecture-patterns.md` - Pipeline architecture patterns
- `stage-design.md` - Detailed stage design guidance
- `platform-examples.md` - Platform-specific configurations
- `security-checklist.md` - Security considerations checklist
## Relationship to Other Skills
**Complements:**
- `api-versioning` - API deployment strategies
- `migration-patterns` - Database deployment considerations
**Independent from:**
- TDD skills - This skill focuses on deployment, not testing methodology
## Expected Outcome
After using this skill:
- Pipeline architecture designed
- Stages configured appropriately
- Security scanning integrated
- Environment promotion strategy defined
- Platform-specific implementation ready
---
**End of CI/CD Pipeline Design Skill**
