# IDPF-Chaos Framework
**Version:** v0.22.0
**Source:** IDPF-Chaos/IDPF-Chaos.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for chaos engineering experiments. Tests system resilience by introducing controlled failures to discover weaknesses before production incidents.

---

## Chaos Engineering Principles
| Principle | Description |
|-----------|-------------|
| **Build Hypothesis** | Define expected behavior under failure |
| **Vary Real-World Events** | Inject realistic failures |
| **Run in Production** | Test real systems safely |
| **Automate Experiments** | Enable continuous validation |
| **Minimize Blast Radius** | Start small, expand gradually |

---

## Terminology
| Term | Definition |
|------|------------|
| **Chaos Experiment** | Controlled fault injection with hypothesis |
| **Steady State** | Normal behavior metrics before injection |
| **Blast Radius** | Scope of potential impact |
| **Fault Injection** | Deliberate failure introduction |
| **GameDay** | Scheduled multi-scenario event |
| **Abort Condition** | Threshold triggering immediate stop |

---

## Fault Injection Types

### Infrastructure Faults
| Fault Type | Tools | Risk |
|------------|-------|------|
| Instance termination | Chaos Monkey, Gremlin, AWS FIS | Medium |
| AZ/Region failure | Gremlin, AWS FIS | High |
| Disk failure | Gremlin, dd | Medium |
| Resource exhaustion | stress-ng, Gremlin | Medium |

### Network Faults
| Fault Type | Tools | Risk |
|------------|-------|------|
| Latency injection | tc, Gremlin, Toxiproxy | Low |
| Packet loss | tc, Gremlin, Pumba | Medium |
| DNS failure | Gremlin, custom | Medium |
| Network partition | iptables, Gremlin | High |

### Application Faults
| Fault Type | Tools | Risk |
|------------|-------|------|
| Memory pressure | stress-ng, Gremlin | Medium |
| CPU stress | stress-ng, Gremlin | Medium |
| Process kill | kill, Gremlin | Medium |
| Thread exhaustion | Custom, Gremlin | Medium |

### Dependency Faults
| Fault Type | Tools | Risk |
|------------|-------|------|
| Service unavailable | Toxiproxy, Gremlin | Medium |
| Slow dependency | Toxiproxy, Gremlin | Low |
| Database failure | Gremlin, custom | High |
| Cache eviction | Custom scripts | Low |
| Message queue failure | Gremlin, custom | Medium |

### State Faults
| Fault Type | Tools | Risk |
|------------|-------|------|
| Data corruption | Custom scripts | High |
| Clock skew | chrony, Gremlin | Medium |
| Certificate expiry | Custom scripts | Medium |

---

## Tool Selection
| Tool | Platform | Best For | Cost |
|------|----------|----------|------|
| **Chaos Monkey** | AWS | Instance termination | Free |
| **Gremlin** | Multi-cloud, K8s | Enterprise chaos | Commercial |
| **LitmusChaos** | Kubernetes | K8s native | Free |
| **Chaos Mesh** | Kubernetes | K8s native | Free |
| **AWS FIS** | AWS | AWS infrastructure | Pay per use |
| **Toxiproxy** | Any | Network simulation | Free |
| **Pumba** | Docker | Docker chaos | Free |

**Selection:** K8s extensive → LitmusChaos | Enterprise SaaS → Gremlin | AWS only → AWS FIS + Chaos Monkey | Network faults → Toxiproxy

---

## Experiment Design

### Hypothesis Template
```
Given: [steady-state conditions]
When: [fault injected]
Then: [expected behavior]
```

### Steady State Metrics
| Category | Examples |
|----------|----------|
| Availability | Uptime %, success rate |
| Latency | p50, p95, p99 |
| Throughput | Requests/second |
| Error Rate | Failed %, exceptions |
| Saturation | CPU %, memory %, queue depth |

### Blast Radius Controls
| Control | Example |
|---------|---------|
| Target Scope | 1 of 10 pods |
| User Impact | Canary traffic only |
| Duration | Max 10 minutes |
| Auto-Rollback | Error rate > 5% |
| Environment | Staging first |

### Abort Conditions
Immediately stop if: Error rate > threshold | Latency > threshold | Revenue impact | Customer complaints | On-call escalation | Data loss

---

## Experiment Workflow
```
Define Steady State Hypothesis → Set Up Observability → Design Experiment → Get Approval → Run (Limited) → Analyze → Hypothesis Valid? → Expand Scope OR Fix System
```

---

## GameDay Planning
**Structure:**
| Phase | Duration | Activities |
|-------|----------|------------|
| Kickoff | 15 min | Objectives, safety briefing |
| Experiments | 2-4 hours | Run scenarios |
| Debrief | 30 min | Findings, action items |
| Documentation | 1 hour | Write up results |

**Roles:** GameDay Lead | Fault Operator | Observer | Scribe | On-Call

**Frequency:** Beginning: Quarterly (staging) | Intermediate: Monthly (staging + limited prod) | Advanced: Weekly/Continuous (full prod)

---

## Observability Integration
| Type | Purpose | Tools |
|------|---------|-------|
| Metrics | Impact measurement | Prometheus, Datadog |
| Logs | Error details | ELK, Splunk |
| Traces | Request flow | Jaeger, Zipkin |
| Dashboards | Visualization | Grafana |
| Alerts | Abort triggers | PagerDuty |

---

## Safety Practices
| Stage | Scope | Environment | Approval |
|-------|-------|-------------|----------|
| 1 | Single instance | Development | Self |
| 2 | Single instance | Staging | Team lead |
| 3 | Multiple instances | Staging | Eng manager |
| 4 | Single instance | Production (canary) | SRE lead |
| 5 | Multiple instances | Production | VP Engineering |

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `chaos` | `#6554C0` | Chaos work |
| `experiment` | `#0E8A16` | Chaos experiment |
| `gameday` | `#D93F0B` | GameDay related |
| `infrastructure-fault` | `#0052CC` | Infrastructure failure |
| `network-fault` | `#1D76DB` | Network failure |
| `finding` | `#FBCA04` | Resilience finding |

---

## Session Commands
**Chaos:** Chaos-Start | Chaos-Status | Design-Experiment | Plan-GameDay | Run-Experiment | Abort-Experiment | Chaos-Report

---

## Best Practices
**Do:** Clear hypothesis | Define abort conditions | Notify stakeholders | Staging first | Document findings | Fix before expanding | Automate experiments | Practice rollback
**Don't:** Run without monitoring | Skip hypothesis | Ignore abort conditions | Production without approval | Expand after failures | Disable safety controls

---

## Maturity Model
| Level | Characteristics |
|-------|-----------------|
| 1: Initial | Manual, staging only, reactive |
| 2: Managed | Documented, some production, planned |
| 3: Defined | Standard processes, regular GameDays |
| 4: Measured | Automated, continuous production, SLO-driven |
| 5: Optimized | Fully automated, proactive discovery |

---

**End of Framework**
