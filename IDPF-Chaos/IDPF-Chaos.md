# IDPF-Chaos Framework

**Version:** v0.2.0
**Extends:** IDPF-Testing-Core

---

## Core Principle
Proactively test resilience by introducing controlled failures.

## Chaos Principles
1. **Build Hypothesis** - Define expected behavior under failure
2. **Vary Real-World Events** - Inject realistic failures
3. **Run in Production** - Test real systems safely
4. **Automate Experiments** - Enable continuous validation
5. **Minimize Blast Radius** - Start small, expand gradually

## Fault Types
**Infrastructure:** Instance termination, AZ failure, disk failure
**Network:** Latency, packet loss, DNS failure, partition
**Application:** Memory pressure, CPU stress, process kill
**Dependency:** Service unavailable, slow dependency, database failure

## Tools
| Tool | Platform | Best For |
|------|----------|----------|
| Chaos Monkey | AWS | Instance termination |
| Gremlin | Multi-cloud | Enterprise |
| LitmusChaos | Kubernetes | K8s native |
| Chaos Mesh | Kubernetes | K8s native |
| Toxiproxy | Any | Network simulation |

## Hypothesis Template
```
Given: [steady-state conditions]
When: [fault injected]
Then: [expected behavior]
```

## Abort Conditions
Stop immediately if: Error rate > threshold, latency > threshold, data loss, customer complaints, on-call escalation

## Experiment Workflow
```
Define Hypothesis → Set Up Observability → Design Experiment → Get Approval → Run → Analyze → Expand or Fix
```

## GameDay Structure
| Phase | Duration |
|-------|----------|
| Kickoff | 15 min |
| Experiments | 2-4 hours |
| Debrief | 30 min |
| Documentation | 1 hour |

## Progressive Complexity
| Stage | Environment | Approval |
|-------|-------------|----------|
| 1 | Development | Self |
| 2-3 | Staging | Team/Manager |
| 4-5 | Production | SRE/VP |

## Commands
- `Chaos-Start` - Begin session
- `Design-Experiment` - Create plan
- `Plan-GameDay` - Plan event
- `Run-Experiment` - Execute
- `Abort-Experiment` - Emergency stop
- `Chaos-Report` - Generate report

---

**End of Framework**
