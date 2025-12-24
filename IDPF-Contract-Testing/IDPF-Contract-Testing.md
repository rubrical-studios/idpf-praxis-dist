# IDPF-Contract-Testing Framework

**Version:** v0.15.0
**Extends:** IDPF-Testing-Core

---

## Overview
Consumer-driven contract testing for API consumers and providers.

## Terminology
| Term | Definition |
|------|------------|
| Consumer | Service calling an API |
| Provider | Service exposing an API |
| Contract/Pact | Request/response agreement |
| Broker | Central repository |
| Can-I-Deploy | Deployment safety check |

## Contract Testing Flow
```
Consumer writes tests → Generate Contract → Publish to Broker → Provider verifies → Publish results → Can-I-Deploy → Deploy
```

## Tools
| Tool | Best For |
|------|----------|
| Pact | Multi-language, most scenarios |
| Spring Cloud Contract | Spring Boot |
| Specmatic | OpenAPI-based |
| Dredd | API Blueprint/OpenAPI |

## Consumer Side
1. Write contract test (mock provider)
2. Run tests
3. Generate pact
4. Publish to broker

## Provider Side
1. Fetch contracts from broker
2. Setup provider states
3. Run verification
4. Publish results

## Can-I-Deploy
```bash
pact-broker can-i-deploy \
  --pacticipant [service] \
  --version [SHA] \
  --to-environment production
```

## Versioning
| Approach | Use Case |
|----------|----------|
| Git SHA | Standard CI/CD |
| Semantic | Formal releases |
| Branch-based | Feature branches |

## Pending Pacts (WIP)
- New contracts marked "pending"
- Provider not blocked by pending pacts
- Verification runs but doesn't fail
- Once verified, becomes "supported"

## Commands
- `Contract-Plan-Start` - Begin planning
- `Consumer-Test-Create` - Create consumer test
- `Provider-State-Create` - Create state handler
- `Pact-Publish` - Publish to broker
- `Provider-Verify` - Run verification
- `Can-I-Deploy` - Check deployment safety

---

**End of Framework**
