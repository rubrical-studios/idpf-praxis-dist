# IDPF-Chaos Framework
**Version:** v0.26.3
**Extends:** IDPF-Testing-Core
**Framework-Debug:** True

## Overview
Framework for chaos engineering experiments: resilience testing, fault injection, failure scenario validation.
**Core Principle:** Proactively test system resilience by introducing controlled failures to discover weaknesses before production incidents.

## Principles
| Principle | Description |
|-----------|-------------|
| Build a Hypothesis | Define expected behavior under failure |
| Vary Real-World Events | Inject realistic failures |
| Run in Production | Test real systems with real traffic (safely) |
| Automate Experiments | Enable continuous validation |
| Minimize Blast Radius | Start small, expand gradually |

## Terminology
| Term | Definition |
|------|------------|
| **Chaos Experiment** | Controlled fault injection with hypothesis |
| **Steady State** | Normal behavior metrics before fault |
| **Blast Radius** | Scope of potential impact |
| **GameDay** | Scheduled event running multiple scenarios |
| **Abort Condition** | Threshold triggering immediate stop |

## Fault Injection Types
**Infrastructure:** Instance termination, AZ/Region failure, Disk failure, Resource exhaustion
**Network:** Latency injection, Packet loss, DNS failure, Network partition, Bandwidth throttling
**Application:** Memory pressure, CPU stress, Disk fill, Process kill, Thread exhaustion
**Dependency:** Service unavailable, Slow dependency, Database failure, Cache eviction, Message queue failure

## Tool Selection
| Tool | Platform | Best For |
|------|----------|----------|
| **Chaos Monkey** | AWS | Instance termination |
| **Gremlin** | Multi-cloud, K8s | Enterprise chaos |
| **LitmusChaos** | Kubernetes | K8s native |
| **Chaos Mesh** | Kubernetes | K8s native |
| **AWS FIS** | AWS | AWS infrastructure |
| **Toxiproxy** | Any | Network simulation |

```
Decision: K8s? → LitmusChaos/Chaos Mesh | Enterprise? → Gremlin | AWS? → AWS FIS | Docker? → Pumba
```

## Hypothesis Template
```
Given: [steady-state conditions]
When: [fault is injected]
Then: [expected system behavior]
```

## Experiment Workflow
```
Define Hypothesis → Set Up Observability → Design Experiment → Get Approval → Run (Limited Scope) → Analyze Results → If hypothesis valid: Expand Scope | If not: Fix System and repeat
```

## Blast Radius Controls
| Control | Example |
|---------|---------|
| Target Scope | 1 of 10 pods |
| User Impact | Canary traffic only |
| Duration | Max 10 minutes |
| Auto-Rollback | Error rate > 5% |
| Environment | Staging first |

**Abort Conditions:** Error rate > threshold, Latency > threshold, Revenue impact, Customer complaints, On-call escalation, Data loss

## Directory Structure
```
<chaos-engineering-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── experiments/infrastructure/, network/, application/, dependency/
├── gamedays/YYYY-QN-GameDay/runbook.md, results.md, action-items.md
├── dashboards/, scripts/rollback/, scripts/validation/
└── .github/workflows/
```

## GameDay
**Structure:** Kickoff (15 min) → Experiments (2-4 hours) → Debrief (30 min) → Documentation (1 hour)
**Roles:** GameDay Lead, Fault Operator, Observer, Scribe, On-Call
**Frequency:** Beginning (Quarterly, staging) → Intermediate (Monthly, limited production) → Advanced (Weekly, full production)

## Safety Practices
| Stage | Environment | Approval |
|-------|-------------|----------|
| 1 | Development | Self |
| 2-3 | Staging | Team lead / Manager |
| 4 | Production (canary) | SRE lead |
| 5 | Production (multiple) | VP Engineering |

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `experiment` | `#0E8A16` | Chaos experiment |
| `gameday` | `#D93F0B` | GameDay related |
| `infrastructure-fault` | `#0052CC` | Infrastructure failure |
| `network-fault` | `#1D76DB` | Network failure |
| `dependency-fault` | `#5319E7` | Dependency failure |
| `finding` | `#FBCA04` | Resilience finding |

## Session Commands
**Chaos:** "Chaos-Start", "Chaos-Status", "Design-Experiment", "Plan-GameDay", "Run-Experiment", "Abort-Experiment", "Chaos-Report"
**Standard:** All IDPF-Testing-Core and IDPF-Agile commands apply

## Maturity Model
| Level | Characteristics |
|-------|-----------------|
| 1: Initial | Manual, staging only, reactive |
| 2: Managed | Documented, some production, planned |
| 3: Defined | Standard processes, regular GameDays |
| 4: Measured | Automated, continuous production, SLO-driven |
| 5: Optimized | Fully automated, proactive, industry leadership |

**End of Framework**
