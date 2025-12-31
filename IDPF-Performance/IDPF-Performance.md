# IDPF-Performance Framework
**Version:** v0.19.1
**Source:** IDPF-Performance/IDPF-Performance.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for performance testing: load, stress, endurance, capacity planning.
Validates response time, throughput, scalability, resource utilization.

---

## Terminology
| Term | Definition |
|------|------------|
| Load Test | Behavior under expected load |
| Stress Test | Find breaking point |
| Endurance/Soak Test | Degradation over sustained load |
| Spike Test | Sudden traffic bursts |
| Capacity Test | Maximum throughput |
| Virtual Users (VUs) | Simulated concurrent users |
| Throughput | Requests per second (RPS) |
| Percentile (p95/p99) | Response time at percentile |

---

## Test Types
| Type | Duration | Load Pattern |
|------|----------|--------------|
| Load | 15-60 min | Steady state |
| Stress | Until failure | Ramping up |
| Endurance | 4-24 hours | Steady state |
| Spike | 15-30 min | Sudden spikes |
| Capacity | Varies | Incremental |

---

## Tool Selection
| Tool | Language | Strengths |
|------|----------|-----------|
| k6 | JavaScript | Developer-friendly, CI/CD |
| JMeter | Java/XML | Mature, plugins |
| Gatling | Scala | Efficient, great reports |
| Locust | Python | Simple, distributed |
| Artillery | JavaScript | YAML config, easy CI |

---

## Directory Structure
```
<performance-repo>/
├── PRD/TestPlans/
├── src/scenarios/ (load-test.js, stress-test.js)
├── src/lib/ (utilities)
├── src/data/ (test data)
├── src/thresholds/
├── results/
└── .github/workflows/
```

---

## Key Metrics
| Metric | Target |
|--------|--------|
| Response Time (p50) | < 200ms |
| Response Time (p95) | < 500ms |
| Response Time (p99) | < 1000ms |
| Error Rate | < 0.1% |
| Apdex | > 0.9 |

### Threshold Configuration (k6)
```javascript
thresholds: {
  'http_req_duration': ['p(95)<500', 'p(99)<1000'],
  'http_req_failed': ['rate<0.01'],
}
```

---

## Load Profiles

### Ramp-Up Pattern
```
Ramp Up → Steady State → Ramp Down
```

### Spike Pattern
```
Baseline → Spike → Baseline → Spike → Baseline
```

### Step Pattern (Capacity)
```
Step increases until failure
```

---

## Test Data Management
| Approach | Use Case |
|----------|----------|
| CSV Files | User credentials, IDs |
| JSON Files | Complex payloads |
| Dynamic Generation | Unique per request |

---

## CI/CD Integration
- **On-demand:** workflow_dispatch with inputs
- **Scheduled:** Nightly/weekly soak tests
- **Artifacts:** Upload results for analysis

---

## GitHub Labels
| Label | Description |
|-------|-------------|
| load-test | Load test development |
| stress-test | Stress test development |
| soak-test | Endurance testing |
| capacity | Capacity planning |
| baseline | Baseline measurement |

---

## Session Commands
| Command | Description |
|---------|-------------|
| Perf-Plan-Start | Begin planning |
| Baseline-Define | Establish baselines |
| Load-Test-Create | Create load test |
| Stress-Test-Create | Create stress test |
| Threshold-Define | Define pass/fail criteria |
| Run-Load-Test | Execute load test |
| Analyze-Results | Analyze results |
| Compare-Baseline | Compare to baseline |

---

## Monitoring Integration
APM (New Relic, Datadog), Infrastructure (Prometheus), Logging (ELK), Dashboards (Grafana)

---

**End of Framework**
