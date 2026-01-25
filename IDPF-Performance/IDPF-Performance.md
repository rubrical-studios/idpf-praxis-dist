# IDPF-Performance Framework
**Version:** v0.33.0
**Extends:** IDPF-Testing-Core
## Overview
Framework for performance tests: load, stress, endurance, capacity planning.
## Terminology
| Term | Definition |
|------|------------|
| **Load Test** | Validate under expected load |
| **Stress Test** | Find breaking point |
| **Endurance/Soak** | Detect degradation over time |
| **Spike Test** | Handle sudden bursts |
| **Virtual Users** | Simulated concurrent users |
| **Throughput** | Requests per second |
## Performance Test Types
| Test Type | Duration | Load Pattern |
|-----------|----------|--------------|
| Load | 15-60 min | Steady state |
| Stress | Until failure | Ramping up |
| Endurance | 4-24 hours | Steady state |
| Spike | 15-30 min | Sudden spikes |
| Capacity | Varies | Incremental |
## Tool Selection
| Tool | Language | Best For |
|------|----------|----------|
| **k6** | JavaScript | Modern APIs, CI/CD |
| **JMeter** | Java/XML | Enterprise, GUI |
| **Gatling** | Scala/Java | High throughput |
| **Locust** | Python | Python teams |
| **Artillery** | JavaScript | Serverless, APIs |
## Key Metrics
| Metric | Target |
|--------|--------|
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
}
```
## Load Profile Patterns
- **Ramp-Up:** Gradual increase → Steady state → Ramp down
- **Spike:** Baseline → Sudden spike → Return
- **Step:** Incremental increases until failure
## Workflow Phases
| Phase | Activities |
|-------|------------|
| PLAN | Define SLAs/SLOs, identify critical paths |
| DESIGN | Create workload model, configure thresholds |
| DEVELOP | Write scripts, build data generators |
| EXECUTE | Run tests, collect metrics, monitor |
| REPORT | Analyze percentiles, compare baselines |
## Session Commands
- **Load-Test-Create** - Create load test
- **Stress-Test-Create** - Create stress test
- **Run-Load-Test** - Execute load test
- **Run-Soak-Test** - Execute endurance test
- **Analyze-Results** - Analyze results
- **Compare-Baseline** - Compare against baseline
---
**End of Framework**
