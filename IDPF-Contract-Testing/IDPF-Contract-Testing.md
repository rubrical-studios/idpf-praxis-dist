# IDPF-Contract-Testing Framework
**Version:** v0.23.4
**Extends:** IDPF-Testing-Core

## Overview
Framework for API contract tests using Pact, Spring Cloud Contract, and Specmatic. Contract testing validates that API consumers and providers agree on interface contracts, catching integration issues early.

## Terminology
| Term | Definition |
|------|------------|
| **Consumer** | Service that calls an API |
| **Provider** | Service that exposes an API |
| **Contract/Pact** | Agreement on request/response format |
| **Consumer-Driven** | Consumer defines expected interactions |
| **Provider Verification** | Provider validates it meets contracts |
| **Broker** | Central repository for contracts |
| **Can-I-Deploy** | Check if safe to deploy based on contracts |
| **Provider State** | Precondition setup for verification |
| **Pending Pact** | WIP contract not yet verified |

## Contract Testing Flow
```
CONSUMER: Write tests (mock provider) → Generate Contract → Publish to Broker
BROKER: Central repository
PROVIDER: Fetch contracts → Verify Provider → Publish results
BOTH: Can-I-Deploy check → Deploy
```

## Tool Selection
| Tool | Language | Best For |
|------|----------|----------|
| **Pact** | Multi-language | Most scenarios |
| **Spring Cloud Contract** | Java/Kotlin | Spring ecosystem |
| **Specmatic** | Any (OpenAPI) | OpenAPI-based |
| **Dredd** | Any | API Blueprint/OpenAPI |

```
Decision: Spring Boot? → Spring Cloud Contract | Multi-language? → Pact | OpenAPI-first? → Specmatic
```

## Directory Structure (Consumer/Provider repos - Embedded)
```
<service-repo>/
├── tests/contract/pacts/, consumer-tests.spec.ts or provider-verification.spec.ts
└── pact/pact-config.js, provider-states/
```

## Directory Structure (Separate Repo)
```
<contract-testing-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── contracts/[service]/[consumer]/
├── broker/docker-compose.yml, broker-config.yml
├── docs/consumer-guide.md, provider-guide.md
├── scripts/publish-contracts.sh, verify-provider.sh, can-i-deploy.sh
└── .github/workflows/
```

## Consumer-Driven Workflow
**Consumer Side:**
1. Write Contract Test (define expected provider behavior)
2. Run Tests (against mock provider)
3. Generate Pact (contract file)
4. Publish to Broker

**Provider Side:**
1. Fetch Contracts (from broker)
2. Setup Provider States (preconditions)
3. Run Verification (real provider against contracts)
4. Publish Results

## Provider States Example
```typescript
const stateHandlers = {
  'order exists': async () => { await database.seed({ orders: [testOrder] }); },
  'no orders': async () => { await database.clear('orders'); },
};
```

## Can-I-Deploy
```bash
pact-broker can-i-deploy \
  --pacticipant order-service \
  --version $GIT_SHA \
  --to-environment production
```

## Versioning Strategy
| Approach | Use Case |
|----------|----------|
| Git SHA | Standard CI/CD |
| Semantic | Formal releases |
| Branch-based | Feature branches |

**Breaking Change Process:**
1. Consumer publishes new contract with breaking change
2. Provider verification fails
3. Teams coordinate
4. Provider implements change
5. Both services deploy

**Pending Pacts:** New contracts marked as "pending", provider not blocked, becomes "supported" once verified.

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `consumer` | `#0E8A16` | Consumer-side contract |
| `provider` | `#0052CC` | Provider-side contract |
| `breaking-change` | `#D93F0B` | Breaking contract change |
| `pending-pact` | `#FBCA04` | WIP contract |
| `verification-failed` | `#FF5630` | Failed verification |

## Workflow Phases (Contract-Specific)
| Phase | Activities |
|-------|------------|
| PLAN | Identify consumer/provider pairs, define contract scope |
| DESIGN | Design interactions, define provider states |
| DEVELOP | Write consumer tests, implement provider state handlers |
| EXECUTE | Publish contracts, run provider verification |
| REPORT | Monitor broker dashboard, track verification status |

## Session Commands
**Planning:** "Contract-Plan-Start", "Consumer-Identify", "Provider-Identify"
**Development:** "Consumer-Test-Create", "Provider-State-Create", "Pact-Generate"
**Verification:** "Pact-Publish", "Provider-Verify", "Can-I-Deploy"

**End of Framework**
