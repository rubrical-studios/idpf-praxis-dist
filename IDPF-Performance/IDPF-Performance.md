# IDPF-Performance Framework
**Version:** v0.30.0
**Extends:** IDPF-Testing-Core

## Overview
Framework for developing and executing performance tests: load testing, stress testing, endurance testing, and capacity planning. Validates response time, throughput, scalability, and resource utilization.

## Terminology
| Term | Definition |
|------|------------|
| **Load Test** | Validate under expected user load |
| **Stress Test** | Find breaking point beyond expected load |
| **Endurance/Soak Test** | Detect degradation over sustained load |
| **Spike Test** | Handle sudden traffic bursts |
| **Virtual Users (VUs)** | Simulated concurrent users |
| **Throughput** | Requests per second (RPS) |
| **Percentile (p95/p99)** | Response time at given percentile |
| **Threshold** | Pass/fail criteria for metrics |

## Test Types
| Type | Duration | Load Pattern |
|------|----------|--------------|
| Load | 15-60 min | Steady state |
| Stress | Until failure | Ramping up |
| Endurance/Soak | 4-24 hours | Steady state |
| Spike | 15-30 min | Sudden spikes |
| Capacity | Varies | Incremental |

## Tool Selection
| Tool | Language | Best For |
|------|----------|----------|
| **k6** | JavaScript | Modern APIs, CI/CD |
| **JMeter** | Java/XML | Enterprise, GUI-based |
| **Gatling** | Scala/Java | High throughput |
| **Locust** | Python | Python teams |
| **Artillery** | JavaScript | Serverless, APIs |

```
Decision: JS? → k6/Artillery | Python? → Locust | Java? → Gatling/JMeter | GUI? → JMeter
```

## Directory Structure
```
<performance-test-repo>/
├── PRD/Templates/, PRD/TestPlans/
├── src/scenarios/, src/lib/, src/data/, src/thresholds/, src/config/
├── results/, dashboards/
└── .github/workflows/
```

## Key Metrics
| Metric | Good Values |
|--------|-------------|
| Response Time (p50) | < 200ms |
| Response Time (p95) | < 500ms |
| Response Time (p99) | < 1000ms |
| Error Rate | < 0.1% |
| Apdex | > 0.9 |

## Threshold Configuration (k6)
```javascript
thresholds: {
  'http_req_duration': ['p(95)<500', 'p(99)<1000'],
  'http_req_failed': ['rate<0.01'],
  'http_reqs': ['rate>1000'],
}
```

## Test Data Management
| Approach | Use Case |
|----------|----------|
| CSV Files | User credentials, product IDs |
| JSON Files | Complex request payloads |
| Dynamic Generation | Unique data per request |
| Shared Array | Large datasets (k6) |

## GitHub Project Labels
| Label | Hex | Description |
|-------|-----|-------------|
| `load-test` | `#0E8A16` | Load test development |
| `stress-test` | `#D93F0B` | Stress test development |
| `soak-test` | `#5319E7` | Endurance test development |
| `capacity` | `#1D76DB` | Capacity planning |
| `baseline` | `#C5DEF5` | Baseline measurement |

## Workflow Phases (Performance-Specific)
| Phase | Activities |
|-------|------------|
| PLAN | Define SLAs/SLOs, identify critical paths, establish baselines |
| DESIGN | Create workload model, design load profiles, configure thresholds |
| DEVELOP | Write test scripts, build data generators, set up monitoring |
| EXECUTE | Run tests with proper environment, collect metrics |
| REPORT | Analyze percentiles, compare baselines, generate recommendations |

## Session Commands
**Planning:** "Perf-Plan-Start", "Baseline-Define", "SLA-Review"
**Development:** "Load-Test-Create", "Stress-Test-Create", "Threshold-Define"
**Execution:** "Run-Load-Test", "Run-Stress-Test", "Run-Soak-Test"
**Analysis:** "Analyze-Results", "Compare-Baseline", "Generate-Report"

## Integration Points
- **Extends:** IDPF-Testing-Core
- **References:** Application PRD for NFR traceability
- **Monitoring:** Prometheus, Grafana, CloudWatch, Datadog

**End of Framework**
