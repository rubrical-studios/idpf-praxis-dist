# IDPF-Contract-Testing Framework
**Version:** v0.22.0
**Source:** IDPF-Contract-Testing/IDPF-Contract-Testing.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for API contract tests. Validates consumers and providers agree on interface contract, catching integration issues early without full E2E testing.

---

## Terminology
| Term | Definition |
|------|------------|
| **Consumer** | Service that calls an API |
| **Provider** | Service that exposes an API |
| **Contract** | Agreement on request/response format |
| **Pact** | A contract file (Pact format) |
| **Consumer-Driven** | Consumer defines expected interactions |
| **Provider Verification** | Provider validates it meets contracts |
| **Broker** | Central repository for contracts |
| **Can-I-Deploy** | Check if safe to deploy |
| **Provider State** | Precondition for verification |
| **Pending Pact** | WIP contract not yet verified |

---

## Contract Testing Flow
```
CONSUMER: Write tests (mock provider) → Generate Contract → Publish to Broker
BROKER: Central repository
PROVIDER: Fetch contracts → Verify → Publish results
BOTH: Can-I-Deploy check → Deploy
```

---

## Tool Selection
| Tool | Language | Best For |
|------|----------|----------|
| **Pact** | Multi-language | Most scenarios |
| **Spring Cloud Contract** | Java/Kotlin | Spring ecosystem |
| **Specmatic** | Any (OpenAPI) | OpenAPI-based |
| **Dredd** | Any | API Blueprint/OpenAPI |
| **Hoverfly** | Multi-language | Service virtualization |

**Selection:** Spring Boot → Spring Cloud Contract | Multi-language → Pact | OpenAPI-first → Specmatic | General → Pact

---

## Consumer-Driven Workflow

### Consumer Side
1. Write Contract Test (define expected behavior)
2. Run Tests (against mock)
3. Generate Pact (automatic)
4. Publish to Broker

### Provider Side
1. Fetch Contracts from broker
2. Setup Provider States (preconditions)
3. Run Verification (real provider)
4. Publish Results

---

## Provider States
```typescript
const stateHandlers = {
  'order exists': async () => { await database.seed({ orders: [testOrder] }); },
  'no orders': async () => { await database.clear('orders'); },
};
```

---

## Pact Broker Integration
| Setting | Description |
|---------|-------------|
| Base URL | Broker endpoint |
| Authentication | API token or basic auth |
| Webhooks | Trigger verification on publish |
| Environments | production, staging, development |

### Can-I-Deploy
```bash
pact-broker can-i-deploy \
  --pacticipant order-ui \
  --version $GIT_SHA \
  --to-environment production
```

---

## CI/CD Integration

### Consumer Pipeline
```yaml
name: Consumer Contract Tests
on: [push, pull_request]
jobs:
  contract-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run test:contract
      - name: Publish pacts
        if: github.ref == 'refs/heads/main'
        run: npx pact-broker publish ./pacts --consumer-app-version=${{ github.sha }}
```

### Provider Pipeline
```yaml
name: Provider Verification
on:
  push:
  repository_dispatch:
    types: [contract_requiring_verification_published]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - run: npm run start:test &
      - run: npx wait-on http://localhost:3000/health
      - run: npm run pact:verify
```

---

## Versioning Strategy
| Approach | Description | Use Case |
|----------|-------------|----------|
| **Git SHA** | Version = commit hash | Standard CI/CD |
| **Semantic** | Version = semver | Formal releases |
| **Branch-based** | Include branch | Feature branches |

### Breaking Change Process
1. Consumer publishes new contract
2. Provider verification fails
3. Teams coordinate
4. Provider implements change
5. Verification passes
6. Both deploy

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `contract` | `#00B8D9` | Contract work |
| `consumer` | `#0E8A16` | Consumer-side |
| `provider` | `#0052CC` | Provider-side |
| `breaking-change` | `#D93F0B` | Breaking change |
| `pending-pact` | `#FBCA04` | WIP contract |
| `verification-failed` | `#FF5630` | Failed verification |

---

## Workflow Phases
| Phase | Activities |
|-------|------------|
| **PLAN** | Identify consumer/provider pairs, define scope |
| **DESIGN** | Design interactions, define provider states |
| **DEVELOP** | Write consumer tests, implement state handlers |
| **EXECUTE** | Publish contracts, run verification |
| **REPORT** | Monitor broker, track verification status |

---

## Session Commands
**Planning:** Contract-Plan-Start | Consumer-Identify | Provider-Identify
**Development:** Consumer-Test-Create | Provider-State-Create | Pact-Generate
**Verification:** Pact-Publish | Provider-Verify | Can-I-Deploy

---

## References
- [Pact Documentation](https://docs.pact.io/)
- [Spring Cloud Contract](https://spring.io/projects/spring-cloud-contract)
- [Consumer-Driven Contracts - Martin Fowler](https://martinfowler.com/articles/consumerDrivenContracts.html)

---

**End of Framework**
