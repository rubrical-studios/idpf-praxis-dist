# IDPF-Performance Framework
**Version:** v0.22.0
**Source:** IDPF-Performance/IDPF-Performance.md
**Extends:** IDPF-Testing-Core

---

## Overview
Framework for performance tests. Validates response time, throughput, scalability, and resource utilization under various load conditions.

---

## Terminology
| Term | Definition |
|------|------------|
| **Load Test** | Validate under expected load |
| **Stress Test** | Find breaking point |
| **Endurance/Soak Test** | Detect degradation over time |
| **Spike Test** | Handle sudden bursts |
| **Capacity Test** | Determine max throughput |
| **Virtual Users (VUs)** | Simulated concurrent users |
| **Throughput** | Requests per second (RPS) |
| **Percentile (p95/p99)** | Response time at percentile |
| **Ramp-Up** | Gradual VU increase |
| **Think Time** | User pause between requests |
| **Threshold** | Pass/fail criteria |

---

## Performance Test Types
| Type | Purpose | Duration | Pattern |
|------|---------|----------|---------|
| **Load Test** | Expected load | 15-60 min | Steady |
| **Stress Test** | Breaking point | Until failure | Ramping |
| **Endurance/Soak** | Memory leaks | 4-24 hours | Steady |
| **Spike Test** | Traffic bursts | 15-30 min | Spikes |
| **Capacity Test** | Max throughput | Varies | Incremental |
| **Scalability Test** | Scaling validation | Varies | Incremental |

---

## Tool Selection
| Tool | Language | Strengths |
|------|----------|-----------|
| **k6** | JavaScript | Developer-friendly, CI/CD, cloud option |
| **JMeter** | Java/XML | Mature, plugins, protocol support |
| **Gatling** | Scala/Java | Efficient, great reports |
| **Locust** | Python | Simple, distributed |
| **Artillery** | JavaScript | YAML config, easy CI |
| **wrk/wrk2** | Lua | Lightweight, precise latency |

**Selection:** JavaScript → k6/Artillery | Python → Locust | Java/Scala → Gatling/JMeter | GUI needed → JMeter | HTTP benchmarking → wrk2

---

## Load Profile Patterns

### Ramp-Up
```
Users: 0 → ramp up → steady state → ramp down → 0
```

### Spike
```
Users: baseline → spike → baseline → spike → baseline
```

### Step (Capacity)
```
Users: step increases until failure
```

---

## Key Metrics
| Metric | Description | Good Values |
|--------|-------------|-------------|
| **Response Time (p50)** | Median | < 200ms |
| **Response Time (p95)** | 95th percentile | < 500ms |
| **Response Time (p99)** | 99th percentile | < 1000ms |
| **Throughput** | RPS | Depends on capacity |
| **Error Rate** | Failed/total | < 0.1% |
| **Apdex** | Performance Index | > 0.9 |

### Threshold Configuration (k6)
```javascript
thresholds: {
  'http_req_duration': ['p(95)<500', 'p(99)<1000'],
  'http_req_failed': ['rate<0.01'],
  'http_reqs': ['rate>1000'],
}
```

---

## Test Data Management
| Approach | Use Case |
|----------|----------|
| **CSV Files** | User credentials, IDs |
| **JSON Files** | Complex payloads |
| **Dynamic Generation** | Unique data per request |
| **Shared Array** | Large datasets (k6) |

---

## CI/CD Integration

### GitHub Actions (k6)
```yaml
name: Load Test
on:
  workflow_dispatch:
    inputs:
      environment: { default: 'staging' }
      duration: { default: '5m' }
      vus: { default: '50' }
jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: grafana/k6-action@v0.3.1
        with:
          filename: src/scenarios/load-test.js
          flags: --env ENV=${{ inputs.environment }} --duration ${{ inputs.duration }} --vus ${{ inputs.vus }}
      - uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: results/
```

### Scheduled Soak Test
```yaml
name: Scheduled Soak Test
on:
  schedule:
    - cron: '0 2 * * 0'  # Sunday 2 AM
jobs:
  soak-test:
    runs-on: ubuntu-latest
    steps:
      - uses: grafana/k6-action@v0.3.1
        env:
          K6_DURATION: '4h'
          K6_VUS: '100'
```

---

## GitHub Project Labels
| Label | Color | Description |
|-------|-------|-------------|
| `performance` | `#0052CC` | Performance work |
| `load-test` | `#0E8A16` | Load test |
| `stress-test` | `#D93F0B` | Stress test |
| `soak-test` | `#5319E7` | Endurance test |
| `capacity` | `#1D76DB` | Capacity planning |
| `baseline` | `#C5DEF5` | Baseline measurement |

---

## Workflow Phases
| Phase | Activities |
|-------|------------|
| **PLAN** | Define SLAs/SLOs, identify critical paths, establish baselines |
| **DESIGN** | Create workload model, design profiles, configure thresholds |
| **DEVELOP** | Write scripts, build data generators, setup monitoring |
| **EXECUTE** | Run tests, collect metrics, monitor resources |
| **REPORT** | Analyze percentiles, compare baselines, generate recommendations |

---

## Session Commands
**Planning:** Perf-Plan-Start | Baseline-Define | SLA-Review
**Development:** Load-Test-Create | Stress-Test-Create | Threshold-Define
**Execution:** Run-Load-Test | Run-Stress-Test | Run-Soak-Test
**Analysis:** Analyze-Results | Compare-Baseline | Generate-Report

---

## Monitoring Integration
| Type | Examples | Purpose |
|------|----------|---------|
| APM | New Relic, Datadog | App-level metrics |
| Infrastructure | Prometheus, CloudWatch | Server/container |
| Logging | ELK, Splunk | Log correlation |
| Dashboards | Grafana | Visualization |

---

## References
- [k6 Documentation](https://k6.io/docs/)
- [JMeter Manual](https://jmeter.apache.org/usermanual/)
- [Gatling Documentation](https://gatling.io/docs/)

---

**End of Framework**
