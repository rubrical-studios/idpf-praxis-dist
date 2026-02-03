# IDPF-Contract-Testing Framework
**Version:** v0.35.4
**Extends:** IDPF-Testing-Core
## Overview
Framework for API contract tests using Pact, Spring Cloud Contract, Specmatic.
Contract testing validates consumer/provider API agreement without full end-to-end testing.
## Terminology
| Term | Definition |
|------|------------|
| **Consumer** | Service calling an API |
| **Provider** | Service exposing an API |
| **Contract** | Agreement on request/response format |
| **Provider State** | Precondition for verification |
| **Can-I-Deploy** | Check if safe to deploy |
## Contract Testing Flow
1. Consumer writes tests (mock provider)
2. Generate contract
3. Publish to broker
4. Provider fetches contracts
5. Provider verification
6. Publish results
7. Can-I-Deploy check
8. Deploy
## Tool Selection
| Tool | Best For |
|------|----------|
| **Pact** | Most scenarios (multi-language) |
| **Spring Cloud Contract** | Spring ecosystem |
| **Specmatic** | OpenAPI-based |
## Consumer-Driven Workflow
**Consumer:** Write test → Run against mock → Generate pact → Publish
**Provider:** Fetch contracts → Setup states → Verify → Publish results
## Provider States
```typescript
const stateHandlers = {
  'order exists': async () => await database.seed(testOrder),
  'no orders': async () => await database.clear('orders'),
};
```
## Can-I-Deploy
```bash
pact-broker can-i-deploy --pacticipant order-ui --version $GIT_SHA --to-environment production
```
## Versioning Strategy
| Approach | Use Case |
|----------|----------|
| Git SHA | Standard CI/CD |
| Semantic | Formal releases |
| Branch-based | Feature branches |
## Workflow Phases
| Phase | Activities |
|-------|------------|
| PLAN | Identify consumer/provider pairs |
| DESIGN | Design interactions, define states |
| DEVELOP | Write consumer tests, provider handlers |
| EXECUTE | Publish contracts, run verification |
| REPORT | Monitor broker dashboard |
## Session Commands
- **Consumer-Test-Create** - Create consumer test
- **Provider-State-Create** - Create provider state handler
- **Pact-Publish** - Publish pacts
- **Provider-Verify** - Run verification
- **Can-I-Deploy** - Check deployment safety
---
**End of Framework**
