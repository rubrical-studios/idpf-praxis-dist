# Class Diagram Guide
**Version:** v0.15.0

PlantUML syntax reference for generating class diagrams from source code.

---

## Basic Class Definition

```plantuml
@startuml
class ClassName {
  field: Type
  method(): ReturnType
}
@enduml
```

---

## Visibility Modifiers

| Symbol | Visibility | Example |
|--------|------------|---------|
| `+` | Public | `+name: string` |
| `-` | Private | `-password: string` |
| `#` | Protected | `#internalId: int` |
| `~` | Package/Internal | `~helper: Helper` |

```plantuml
@startuml
class User {
  +id: int
  +name: string
  -password: string
  #createdAt: datetime
  ~cache: Map

  +getName(): string
  -hashPassword(plain: string): string
  #validate(): boolean
}
@enduml
```

---

## Field and Method Modifiers

### Static Members
Use `{static}` or underline:

```plantuml
@startuml
class Config {
  {static} +instance: Config
  {static} +getInstance(): Config
}
@enduml
```

### Abstract Members
Use `{abstract}` or italics:

```plantuml
@startuml
abstract class Shape {
  {abstract} +area(): float
  {abstract} +perimeter(): float
}
@enduml
```

---

## Class Types

### Regular Class
```plantuml
class RegularClass {
}
```

### Abstract Class
```plantuml
abstract class AbstractClass {
}
```

### Interface
```plantuml
interface InterfaceName {
}
```

### Enum
```plantuml
enum Status {
  PENDING
  ACTIVE
  COMPLETED
  CANCELLED
}
```

### Annotation (Stereotype)
```plantuml
class Service <<service>> {
}

class Entity <<entity>> {
}
```

---

## Relationships

### Inheritance (extends)

```plantuml
@startuml
class Animal {
  +name: string
  +makeSound(): void
}

class Dog {
  +breed: string
  +makeSound(): void
}

Animal <|-- Dog
@enduml
```

**Arrow:** `<|--` (empty triangle pointing to parent)

### Implementation (implements)

```plantuml
@startuml
interface Serializable {
  +serialize(): string
  +deserialize(data: string): void
}

class User {
  +serialize(): string
  +deserialize(data: string): void
}

Serializable <|.. User
@enduml
```

**Arrow:** `<|..` (dashed, empty triangle)

### Association

```plantuml
@startuml
class Order {
  +customer: Customer
}

class Customer {
}

Order --> Customer
@enduml
```

**Arrow:** `-->` (simple arrow)

### Aggregation (has-a, weak)

```plantuml
@startuml
class Department {
  +employees: List<Employee>
}

class Employee {
}

Department o-- Employee
@enduml
```

**Arrow:** `o--` (empty diamond)

Parts can exist independently of the whole.

### Composition (has-a, strong)

```plantuml
@startuml
class House {
  +rooms: List<Room>
}

class Room {
}

House *-- Room
@enduml
```

**Arrow:** `*--` (filled diamond)

Parts cannot exist without the whole.

### Dependency

```plantuml
@startuml
class OrderService {
  +process(order: Order): void
}

class EmailService {
}

OrderService ..> EmailService : uses
@enduml
```

**Arrow:** `..>` (dashed arrow)

---

## Multiplicity

```plantuml
@startuml
class Order {
}

class LineItem {
}

class Customer {
}

Customer "1" --> "*" Order : places
Order "1" *-- "1..*" LineItem : contains
@enduml
```

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one |
| `*` | Zero or more |
| `0..1` | Zero or one |
| `1..*` | One or more |
| `n..m` | Between n and m |

---

## Labels and Notes

### Relationship Labels

```plantuml
@startuml
class User {
}

class Order {
}

User --> Order : places >
User <-- Order : < belongs to
@enduml
```

### Notes

```plantuml
@startuml
class User {
  +name: string
}

note right of User
  This is a domain entity
  representing system users
end note

note "Shared note" as N1
User .. N1
@enduml
```

---

## Packages and Namespaces

```plantuml
@startuml
package "Domain" {
  class User
  class Order
}

package "Services" {
  class UserService
  class OrderService
}

package "Repositories" <<database>> {
  class UserRepository
  class OrderRepository
}

UserService --> User
UserService --> UserRepository
OrderService --> Order
OrderService --> OrderRepository
@enduml
```

---

## Generics

```plantuml
@startuml
class Repository<T> {
  +find(id: int): T
  +save(entity: T): void
  +delete(entity: T): void
}

class UserRepository {
}

Repository <|-- UserRepository : T = User
@enduml
```

---

## Complete Example

```plantuml
@startuml
skinparam classAttributeIconSize 0

package "Domain" {
  abstract class Entity {
    #id: UUID
    #createdAt: datetime
    #updatedAt: datetime
  }

  class User {
    +email: string
    -passwordHash: string
    +name: string
    +role: UserRole
    --
    +authenticate(password: string): boolean
    +changePassword(old: string, new: string): void
  }

  class Order {
    +orderNumber: string
    +status: OrderStatus
    +total: decimal
    --
    +addItem(product: Product, qty: int): void
    +removeItem(lineItem: LineItem): void
    +calculateTotal(): decimal
  }

  class LineItem {
    +quantity: int
    +unitPrice: decimal
    +subtotal: decimal
  }

  class Product {
    +sku: string
    +name: string
    +price: decimal
  }

  enum UserRole {
    ADMIN
    CUSTOMER
    GUEST
  }

  enum OrderStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
    CANCELLED
  }
}

Entity <|-- User
Entity <|-- Order
Entity <|-- Product

User "1" --> "*" Order : places
Order "1" *-- "1..*" LineItem : contains
LineItem "*" --> "1" Product : references
User --> UserRole
Order --> OrderStatus
@enduml
```

---

## Styling Tips

### Hide Empty Members
```plantuml
hide empty members
```

### Hide Specific Elements
```plantuml
hide class circle
hide interface circle
hide enum circle
```

### Monochrome
```plantuml
skinparam monochrome true
```

### Direction
```plantuml
left to right direction
' or
top to bottom direction
```

---

## Extraction Patterns

### From Source Code

When analyzing code, extract:

1. **Classes**: All class/interface/enum definitions
2. **Fields**: Instance and static variables with types
3. **Methods**: Signatures with parameters and return types
4. **Relationships**:
   - Inheritance from `extends`/`:` keywords
   - Implementation from `implements`/`:` keywords
   - Associations from field types
   - Dependencies from method parameters and local variables

### Filtering

For large codebases, focus diagrams on:
- Single package/module at a time
- Specific feature or domain
- Public API only (hide private members)
- Key relationships only (hide weak dependencies)

---

**End of Class Diagram Guide**
