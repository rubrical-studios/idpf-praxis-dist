# IDPF-Contract-Testing Framework
**Version:** v0.19.0
**Source:** IDPF-Contract-Testing/IDPF-Contract-Testing.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for API contract testing using Pact, Spring Cloud Contract, Specmatic.
Validates consumers and providers agree on interface contracts.

---

## Terminology
| Term | Definition |
|------|------------|
| Consumer | Service that calls an API |
| Provider | Service that exposes an API |
| Contract/Pact | Agreement on request/response format |
| Consumer-Driven | Consumer defines expected interactions |
| Provider Verification | Provider validates it meets contracts |
| Broker | Central repository for contracts |
| Can-I-Deploy | Check if safe to deploy |
| Provider State | Precondition setup for verification |

---

## Contract Testing Flow
```
Consumer: Write tests -> Generate Contract -> Publish to Broker
Provider: Fetch Contracts -> Setup States -> Verify -> Publish Results
Both: Can-I-Deploy check -> Deploy
```

---

## Tool Selection
| Tool | Best For |
|------|----------|
| Pact | Multi-language, most scenarios |
| Spring Cloud Contract | Spring ecosystem |
| Specmatic | OpenAPI-based |
| Hoverfly | Service virtualization |

---

## Directory Structure

### Consumer Repo (Embedded)
```
tests/contract/consumer-tests.spec.ts
pacts/ (generated)
```

### Provider Repo (Embedded)
```
tests/contract/provider-verification.spec.ts
pact/provider-states/
```

### Separate Repo
```
contracts/, broker/, docs/, scripts/
```

---

## Consumer-Driven Workflow

### Consumer Side
1. Write contract test (mock provider)
2. Run tests
3. Generate pact
4. Publish to broker

### Provider Side
1. Fetch contracts
2. Setup provider states
3. Run verification
4. Publish results

---

## Provider States
Setup preconditions for verification:
```typescript
'order exists': async () => await database.seed(testOrder)
'no orders': async () => await database.clear('orders')
```

---

## Pact Broker

### Can-I-Deploy
```bash
pact-broker can-i-deploy \
  --pacticipant order-service \
  --version $GIT_SHA \
  --to-environment production
```

---

## CI/CD Integration

### Consumer Pipeline
1. Run contract tests
2. Publish pacts (on main)
3. Can-I-Deploy check

### Provider Pipeline
1. Start provider
2. Verify contracts
3. Can-I-Deploy check
4. Trigger: push, PR, webhook (new pact published)

---

## Versioning Strategy
| Approach | Use Case |
|----------|----------|
| Git SHA | Standard CI/CD |
| Semantic | Formal releases |
| Branch-based | Feature branches |

### Pending Pacts (WIP)
- New contracts marked "pending"
- Provider not blocked by pending
- Once verified, becomes "supported"

---

## GitHub Labels
| Label | Description |
|-------|-------------|
| consumer | Consumer-side contract |
| provider | Provider-side contract |
| breaking-change | Breaking contract change |
| pending-pact | WIP contract |
| verification-failed | Failed verification |

---

## Session Commands
| Command | Description |
|---------|-------------|
| Contract-Plan-Start | Begin planning |
| Consumer-Test-Create | Create consumer test |
| Provider-State-Create | Create state handler |
| Pact-Publish | Publish to broker |
| Provider-Verify | Run verification |
| Can-I-Deploy | Check deployment safety |

---

## Workflow Phases
| Phase | Activities |
|-------|------------|
| Plan | Identify consumer/provider pairs, scope |
| Design | Design interactions, define states |
| Develop | Write consumer tests, state handlers |
| Execute | Publish contracts, verify provider |
| Report | Monitor broker, track verification |

---

**End of Framework**
