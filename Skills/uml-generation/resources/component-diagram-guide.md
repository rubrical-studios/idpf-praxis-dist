# Component Diagram Guide
**Version:** v0.15.0

PlantUML syntax reference for generating component and architecture diagrams from source code.

---

## Basic Component

```plantuml
@startuml
[Component Name]
@enduml
```

Or with explicit keyword:

```plantuml
@startuml
component "Component Name" as C1
@enduml
```

---

## Component Types

### Standard Component

```plantuml
@startuml
[Web Application]
[API Service]
[Database Client]
@enduml
```

### With Stereotypes

```plantuml
@startuml
[Web App] <<frontend>>
[API Gateway] <<service>>
[User Service] <<microservice>>
[PostgreSQL] <<database>>
@enduml
```

---

## Interfaces

### Provided Interface (Lollipop)

```plantuml
@startuml
[Order Service] - OrderAPI
[Inventory Service] - InventoryAPI
@enduml
```

### Required Interface (Socket)

```plantuml
@startuml
[Order Service] -( PaymentAPI
[Payment Service] - PaymentAPI
@enduml
```

### Named Interface

```plantuml
@startuml
interface "REST API" as API
[Web Client] --> API
API - [Backend Service]
@enduml
```

---

## Packages and Layers

### Basic Package

```plantuml
@startuml
package "Frontend" {
  [Web App]
  [Mobile App]
}

package "Backend" {
  [API Gateway]
  [Services]
}
@enduml
```

### Package Styles

```plantuml
@startuml
package "Node" <<node>> {
  [Component]
}

package "Folder" <<folder>> {
  [Component]
}

package "Frame" <<frame>> {
  [Component]
}

package "Cloud" <<cloud>> {
  [Component]
}

package "Database" <<database>> {
  [Tables]
}
@enduml
```

### Nested Packages

```plantuml
@startuml
package "Application" {
  package "Presentation" {
    [Controllers]
    [Views]
  }

  package "Business" {
    [Services]
    [Domain]
  }

  package "Data" {
    [Repositories]
    [Entities]
  }
}
@enduml
```

---

## Relationships

### Dependency

```plantuml
@startuml
[Component A] --> [Component B]
[Component A] ..> [Component C] : uses
@enduml
```

### Directional Dependencies

```plantuml
@startuml
[A] --> [B] : calls
[A] <-- [C] : notifies
[A] <--> [D] : bidirectional
@enduml
```

### Arrow Styles

| Arrow | Meaning |
|-------|---------|
| `-->` | Dependency (solid) |
| `..>` | Dependency (dashed) |
| `--` | Association |
| `..` | Association (dashed) |

---

## Ports

```plantuml
@startuml
component [Web Server] {
  port HTTP
  port HTTPS
}

[Client] --> HTTP
[Secure Client] --> HTTPS
@enduml
```

---

## Database and Storage

```plantuml
@startuml
database "PostgreSQL" {
  [Users Table]
  [Orders Table]
}

database "Redis" <<cache>> {
  [Session Cache]
}

cloud "S3" {
  [File Storage]
}

[User Service] --> [Users Table]
[User Service] --> [Session Cache]
[File Service] --> [File Storage]
@enduml
```

---

## Actors and External Systems

```plantuml
@startuml
actor Customer
actor Admin

cloud "External" {
  [Payment Gateway]
  [Email Service]
}

package "Our System" {
  [Web App]
  [API]
  [Worker]
}

Customer --> [Web App]
Admin --> [Web App]
[API] --> [Payment Gateway]
[Worker] --> [Email Service]
@enduml
```

---

## Complete Example: Microservices Architecture

```plantuml
@startuml
title E-Commerce Microservices Architecture

actor Customer
actor Admin

cloud "CDN" {
  [Static Assets]
}

package "Frontend" <<frame>> {
  [Web Application] <<SPA>>
  [Admin Dashboard] <<SPA>>
}

package "API Layer" <<frame>> {
  [API Gateway] <<gateway>>
  [Auth Service] <<service>>
}

package "Core Services" <<frame>> {
  [User Service] <<microservice>>
  [Product Service] <<microservice>>
  [Order Service] <<microservice>>
  [Inventory Service] <<microservice>>
  [Payment Service] <<microservice>>
  [Notification Service] <<microservice>>
}

package "Data Layer" <<database>> {
  database "Users DB" as UsersDB
  database "Products DB" as ProductsDB
  database "Orders DB" as OrdersDB
  database "Inventory DB" as InventoryDB
}

package "Infrastructure" <<cloud>> {
  queue "Message Queue" as MQ
  database "Redis Cache" as Cache
  [Elasticsearch] <<search>>
}

package "External" <<cloud>> {
  [Stripe] <<payment>>
  [SendGrid] <<email>>
  [Twilio] <<sms>>
}

' Customer flows
Customer --> [Static Assets]
Customer --> [Web Application]
[Web Application] --> [API Gateway]

' Admin flows
Admin --> [Admin Dashboard]
[Admin Dashboard] --> [API Gateway]

' API Gateway routing
[API Gateway] --> [Auth Service]
[API Gateway] --> [User Service]
[API Gateway] --> [Product Service]
[API Gateway] --> [Order Service]

' Service dependencies
[User Service] --> UsersDB
[User Service] --> Cache

[Product Service] --> ProductsDB
[Product Service] --> [Elasticsearch]
[Product Service] --> Cache

[Order Service] --> OrdersDB
[Order Service] --> [Inventory Service]
[Order Service] --> [Payment Service]
[Order Service] ->> MQ : events

[Inventory Service] --> InventoryDB
[Inventory Service] ->> MQ : events

[Payment Service] --> [Stripe]

[Notification Service] --> [SendGrid]
[Notification Service] --> [Twilio]
MQ ->> [Notification Service]
@enduml
```

---

## Layered Architecture Example

```plantuml
@startuml
title Layered Architecture

package "Presentation Layer" {
  [REST Controllers]
  [GraphQL Resolvers]
  [WebSocket Handlers]
}

package "Application Layer" {
  [Use Cases]
  [DTOs]
  [Mappers]
}

package "Domain Layer" {
  [Entities]
  [Value Objects]
  [Domain Services]
  [Repository Interfaces]
}

package "Infrastructure Layer" {
  [Repository Implementations]
  [External API Clients]
  [Message Publishers]
  [Database Context]
}

[REST Controllers] --> [Use Cases]
[GraphQL Resolvers] --> [Use Cases]
[WebSocket Handlers] --> [Use Cases]

[Use Cases] --> [Entities]
[Use Cases] --> [Domain Services]
[Use Cases] --> [Repository Interfaces]

[Repository Implementations] ..|> [Repository Interfaces]
[Repository Implementations] --> [Database Context]

note right of [Domain Layer]
  Pure business logic
  No infrastructure dependencies
end note
@enduml
```

---

## Extraction Patterns

### From Directory Structure

```
src/
├── api/           → [API Layer] package
│   ├── controllers/ → [Controllers] component
│   └── middleware/  → [Middleware] component
├── services/      → [Services] package
│   ├── user/      → [User Service] component
│   └── order/     → [Order Service] component
├── repositories/  → [Data Access] package
└── models/        → [Domain] package
```

### From Import/Dependency Analysis

1. Scan import statements in each file
2. Group files by directory/module
3. Map imports to component dependencies
4. Identify external package dependencies

### Focus Areas

For large systems, create separate diagrams for:
- High-level system overview
- Single bounded context/domain
- Deployment view (nodes, containers)
- Data flow view
- Integration points only

---

## Styling

### Colors

```plantuml
@startuml
skinparam component {
  BackgroundColor<<frontend>> LightBlue
  BackgroundColor<<service>> LightGreen
  BackgroundColor<<database>> LightYellow
}

[Web App] <<frontend>>
[API Service] <<service>>
[Database] <<database>>
@enduml
```

### Direction

```plantuml
@startuml
left to right direction
[A] --> [B] --> [C]
@enduml
```

### Monochrome

```plantuml
@startuml
skinparam monochrome true
[Component A] --> [Component B]
@enduml
```

---

**End of Component Diagram Guide**
