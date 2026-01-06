# Example PRD: SaaS Task Management Application
**Version:** v0.22.0

**Purpose:** This example demonstrates a complete PRD created using IDPF-PRD for a SaaS task management application.

---

## PRD Document

# TaskFlow Pro - Product Requirements Document

**Date:** 2025-12-01
**Author:** Product Team
**Status:** Approved

---

## Executive Summary

### Problem Statement
Small teams struggle with task coordination. Existing tools are either too complex (enterprise) or too simple (personal todo lists). Teams need a middle-ground solution that's easy to use but supports collaboration.

### Solution Overview
TaskFlow Pro is a SaaS task management application for small teams (5-20 members). It provides project boards, task assignments, due dates, and team collaboration features with a focus on simplicity and ease of use.

### Target Users
- Small team leads and project managers
- Team members working on collaborative projects
- Startups and small businesses

### Success Criteria
- 1,000 active teams within 6 months
- 70% monthly active user rate
- <2 minute time to create first task

---

## Stakeholders

| Role | Name/Team | Responsibility |
|------|-----------|----------------|
| Product Owner | Sarah Chen | Requirements, priorities |
| Technical Lead | Mike Johnson | Architecture, technical decisions |
| Development Team | Engineering | Implementation |
| QA Lead | Lisa Park | Quality standards |
| Target Users | Small teams | Feedback, validation |

---

## Scope

### In Scope
- User registration and authentication
- Team/workspace management
- Project boards with task lists
- Task creation, assignment, due dates
- Basic collaboration (comments)
- Email notifications
- Web application (responsive)

### Out of Scope (v1.0)
- Mobile native apps
- Advanced reporting/analytics
- Third-party integrations (Slack, etc.)
- Time tracking
- File attachments
- Gantt charts

---

## Functional Requirements

### REQ-001: User Registration

**Description:** Users can create an account with email and password.

**Rationale:** Required for user identification and data ownership.

**Priority:** High

**Acceptance Criteria:**
- AC-001-1: Given a valid email and password (8+ chars), When user submits registration, Then account is created and confirmation email sent
- AC-001-2: Given an email already in use, When user submits registration, Then error message displayed
- AC-001-3: Given invalid email format, When user submits registration, Then validation error shown

**Testing:** TDD

---

### REQ-002: User Authentication

**Description:** Users can log in with email and password.

**Rationale:** Secure access to user data.

**Priority:** High

**Acceptance Criteria:**
- AC-002-1: Given valid credentials, When user logs in, Then session created and redirected to dashboard
- AC-002-2: Given invalid credentials, When user logs in, Then error message displayed (no hint which field wrong)
- AC-002-3: Given 5 failed attempts, When user tries again, Then account locked for 15 minutes

**Testing:** TDD

---

### REQ-003: Create Workspace

**Description:** Users can create a workspace (team).

**Rationale:** Workspaces group users and projects together.

**Priority:** High

**Acceptance Criteria:**
- AC-003-1: Given logged in user, When creating workspace with name, Then workspace created and user is owner
- AC-003-2: Given workspace name >50 chars, When creating, Then validation error
- AC-003-3: Given user creates workspace, Then user can invite others via email

**Testing:** TDD

---

### REQ-004: Create Project Board

**Description:** Users can create project boards within a workspace.

**Rationale:** Projects organize related tasks.

**Priority:** High

**Acceptance Criteria:**
- AC-004-1: Given workspace member, When creating project with name, Then project board created with default columns (To Do, In Progress, Done)
- AC-004-2: Given project created, When viewing project, Then Kanban board displayed
- AC-004-3: Given project owner, When renaming project, Then name updated

**Testing:** TDD

---

### REQ-005: Create Task

**Description:** Users can create tasks on project boards.

**Rationale:** Core feature - tasks are the primary work item.

**Priority:** High

**Acceptance Criteria:**
- AC-005-1: Given project member, When creating task with title, Then task added to "To Do" column
- AC-005-2: Given task created, When adding description, Then description saved and displayed
- AC-005-3: Given task, When setting due date, Then due date displayed on task card

**Testing:** TDD

---

### REQ-006: Assign Task

**Description:** Tasks can be assigned to workspace members.

**Rationale:** Clear ownership of work items.

**Priority:** High

**Acceptance Criteria:**
- AC-006-1: Given task, When assigning to member, Then assignee displayed on task
- AC-006-2: Given task assigned, When assignee views dashboard, Then task appears in "My Tasks"
- AC-006-3: Given task assigned, Then email notification sent to assignee

**Testing:** TDD

---

### REQ-007: Move Task (Drag & Drop)

**Description:** Users can move tasks between columns via drag and drop.

**Rationale:** Intuitive task status updates.

**Priority:** High

**Acceptance Criteria:**
- AC-007-1: Given task in "To Do", When dragged to "In Progress", Then task moves to new column
- AC-007-2: Given task moved, Then status updated in real-time for other viewers
- AC-007-3: Given task in any column, When dragged to another column, Then order within column preserved

**Testing:** TDD

---

### REQ-008: Task Comments

**Description:** Users can add comments to tasks.

**Rationale:** Team collaboration on specific tasks.

**Priority:** Medium

**Acceptance Criteria:**
- AC-008-1: Given task, When adding comment, Then comment displayed with author and timestamp
- AC-008-2: Given comment added, Then task assignee notified (if different from commenter)
- AC-008-3: Given comment, When editing within 5 minutes, Then comment can be edited

**Testing:** TDD

---

## Non-Functional Requirements

### Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-001 | Page load time | <2 seconds |
| NFR-PERF-002 | API response time (p95) | <500ms |
| NFR-PERF-003 | Concurrent users per workspace | 50 |
| NFR-PERF-004 | Drag-drop latency | <100ms perceived |

### Security

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-SEC-001 | Authentication | Email/password, session tokens |
| NFR-SEC-002 | Password storage | bcrypt hashing |
| NFR-SEC-003 | Data in transit | TLS 1.2+ |
| NFR-SEC-004 | Session timeout | 24 hours |
| NFR-SEC-005 | CSRF protection | Token-based |

### Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-REL-001 | Availability | 99.9% |
| NFR-REL-002 | Data backup | Daily |
| NFR-REL-003 | Recovery time | <1 hour |

### Usability

| ID | Requirement | Standard |
|----|-------------|----------|
| NFR-USE-001 | Accessibility | WCAG 2.1 AA |
| NFR-USE-002 | Browser support | Chrome, Firefox, Safari, Edge (latest 2) |
| NFR-USE-003 | Responsive | 320px to 4K |

---

## Constraints

| ID | Constraint | Impact |
|----|------------|--------|
| CON-001 | Budget: $50K development | Feature scope limited |
| CON-002 | Timeline: 3 months to MVP | Prioritize core features |
| CON-003 | Team: 2 developers | Sequential feature development |
| CON-004 | Tech: Must use PostgreSQL | Database choice fixed |

---

## Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| RISK-001 | Real-time sync complexity | Medium | High | Start with polling, add WebSocket later |
| RISK-002 | Drag-drop cross-browser issues | Medium | Medium | Use proven library (react-beautiful-dnd) |
| RISK-003 | Email deliverability | Low | Medium | Use SendGrid or similar |

---

## Testing Approach

- **TDD:** Required for all development
- **ATDD:** No (team is small, informal acceptance)
- **BDD:** No (not needed for this scope)
- **E2E Tests:** Playwright for critical paths
- **Coverage Target:** 80%

---

## Framework Handoff

**Selected Framework:** IDPF-Agile

**Rationale:** Small team, iterative development approach, 3-month timeline.

**Starting Point:** Create backlog from PRD, begin Sprint 0

**Epic Structure:**
1. Epic: User Management (REQ-001, REQ-002)
2. Epic: Workspace Management (REQ-003)
3. Epic: Project Management (REQ-004)
4. Epic: Task Management (REQ-005, REQ-006, REQ-007)
5. Epic: Collaboration (REQ-008)

---

## Approval

| Role | Name | Date | Approved |
|------|------|------|----------|
| Product Owner | Sarah Chen | 2025-12-01 | [x] |
| Technical Lead | Mike Johnson | 2025-12-01 | [x] |

---

**PRD Status: APPROVED - Ready for IDPF-Agile development**

---

*Example from IDPF-PRD Framework*
