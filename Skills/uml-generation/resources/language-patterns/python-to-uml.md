# Python to UML Patterns
**Version:** v0.5.0

Guide for extracting UML diagrams from Python source code.

---

## Class Extraction

### Basic Class

**Python:**
```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
        self._password: str = ""

    def authenticate(self, password: str) -> bool:
        return self._verify(password)

    def _verify(self, password: str) -> bool:
        # Private method
        pass
```

**PlantUML:**
```plantuml
@startuml
class User {
  +name: str
  +email: str
  -_password: str
  +authenticate(password: str): bool
  -_verify(password: str): bool
}
@enduml
```

### Visibility Mapping

| Python Convention | UML Symbol |
|-------------------|------------|
| `name` (no prefix) | `+` (public) |
| `_name` (single underscore) | `-` (private by convention) |
| `__name` (double underscore) | `-` (private, name mangled) |

---

## Type Hints to UML Types

### Basic Types

| Python Type | UML Type |
|-------------|----------|
| `str` | `string` |
| `int` | `int` |
| `float` | `float` |
| `bool` | `boolean` |
| `None` | `void` |
| `Any` | `any` |

### Collection Types

| Python Type | UML Type |
|-------------|----------|
| `List[T]` | `List<T>` |
| `Dict[K, V]` | `Map<K, V>` |
| `Set[T]` | `Set<T>` |
| `Tuple[A, B]` | `Tuple<A, B>` |
| `Optional[T]` | `T?` or `T [0..1]` |

### Example

**Python:**
```python
from typing import List, Optional, Dict

class OrderService:
    def get_orders(self, user_id: int) -> List[Order]:
        pass

    def find_order(self, order_id: str) -> Optional[Order]:
        pass

    def get_totals(self) -> Dict[str, float]:
        pass
```

**PlantUML:**
```plantuml
@startuml
class OrderService {
  +get_orders(user_id: int): List<Order>
  +find_order(order_id: str): Order?
  +get_totals(): Map<str, float>
}
@enduml
```

---

## Inheritance

### Single Inheritance

**Python:**
```python
class Animal:
    def make_sound(self) -> str:
        pass

class Dog(Animal):
    def make_sound(self) -> str:
        return "Bark"
```

**PlantUML:**
```plantuml
@startuml
class Animal {
  +make_sound(): str
}

class Dog {
  +make_sound(): str
}

Animal <|-- Dog
@enduml
```

### Multiple Inheritance

**Python:**
```python
class Swimmer:
    def swim(self) -> None:
        pass

class Flyer:
    def fly(self) -> None:
        pass

class Duck(Swimmer, Flyer):
    pass
```

**PlantUML:**
```plantuml
@startuml
class Swimmer {
  +swim(): void
}

class Flyer {
  +fly(): void
}

class Duck {
}

Swimmer <|-- Duck
Flyer <|-- Duck
@enduml
```

---

## Abstract Classes

**Python:**
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)
```

**PlantUML:**
```plantuml
@startuml
abstract class Shape {
  {abstract} +area(): float
  {abstract} +perimeter(): float
}

class Rectangle {
  +width: float
  +height: float
  +area(): float
  +perimeter(): float
}

Shape <|-- Rectangle
@enduml
```

---

## Protocols (Interfaces)

**Python:**
```python
from typing import Protocol

class Serializable(Protocol):
    def serialize(self) -> str:
        ...

    def deserialize(self, data: str) -> None:
        ...

class User:
    def serialize(self) -> str:
        return json.dumps(self.__dict__)

    def deserialize(self, data: str) -> None:
        self.__dict__.update(json.loads(data))
```

**PlantUML:**
```plantuml
@startuml
interface Serializable {
  +serialize(): str
  +deserialize(data: str): void
}

class User {
  +serialize(): str
  +deserialize(data: str): void
}

Serializable <|.. User
@enduml
```

---

## Dataclasses

**Python:**
```python
from dataclasses import dataclass
from typing import List
from datetime import datetime

@dataclass
class Order:
    id: str
    customer_id: int
    items: List[LineItem]
    created_at: datetime
    total: float = 0.0

@dataclass
class LineItem:
    product_id: str
    quantity: int
    unit_price: float
```

**PlantUML:**
```plantuml
@startuml
class Order <<dataclass>> {
  +id: str
  +customer_id: int
  +items: List<LineItem>
  +created_at: datetime
  +total: float = 0.0
}

class LineItem <<dataclass>> {
  +product_id: str
  +quantity: int
  +unit_price: float
}

Order *-- LineItem
@enduml
```

---

## Enums

**Python:**
```python
from enum import Enum, auto

class OrderStatus(Enum):
    PENDING = auto()
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
```

**PlantUML:**
```plantuml
@startuml
enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}
@enduml
```

---

## Associations from Type Hints

### One-to-One

**Python:**
```python
class User:
    profile: UserProfile

class UserProfile:
    user: User
```

**PlantUML:**
```plantuml
@startuml
class User {
  +profile: UserProfile
}

class UserProfile {
  +user: User
}

User "1" -- "1" UserProfile
@enduml
```

### One-to-Many

**Python:**
```python
class Customer:
    orders: List[Order]

class Order:
    customer: Customer
```

**PlantUML:**
```plantuml
@startuml
class Customer {
  +orders: List<Order>
}

class Order {
  +customer: Customer
}

Customer "1" --> "*" Order
@enduml
```

### Composition vs Aggregation

**Composition (strong ownership):**
```python
class House:
    def __init__(self):
        self.rooms: List[Room] = []  # Rooms don't exist without House
```

```plantuml
House *-- Room
```

**Aggregation (weak ownership):**
```python
class Department:
    def __init__(self):
        self.employees: List[Employee] = []  # Employees can exist independently
```

```plantuml
Department o-- Employee
```

---

## Decorators as Stereotypes

**Python:**
```python
from functools import lru_cache

class Calculator:
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b

    @classmethod
    def create(cls) -> 'Calculator':
        return cls()

    @property
    def name(self) -> str:
        return "Calculator"

    @lru_cache
    def expensive_operation(self, n: int) -> int:
        pass
```

**PlantUML:**
```plantuml
@startuml
class Calculator {
  {static} +add(a: int, b: int): int
  {static} +create(): Calculator
  +name: str <<property>>
  +expensive_operation(n: int): int <<cached>>
}
@enduml
```

---

## Module/Package Structure

### From Directory

```
src/
├── models/
│   ├── __init__.py
│   ├── user.py      → User, UserProfile
│   └── order.py     → Order, LineItem
├── services/
│   ├── __init__.py
│   ├── user_service.py
│   └── order_service.py
└── repositories/
    ├── __init__.py
    └── base.py
```

**PlantUML:**
```plantuml
@startuml
package "models" {
  class User
  class UserProfile
  class Order
  class LineItem
}

package "services" {
  class UserService
  class OrderService
}

package "repositories" {
  class BaseRepository
}

UserService --> User
OrderService --> Order
UserService --> BaseRepository
OrderService --> BaseRepository
@enduml
```

---

## Sequence from Function Calls

**Python:**
```python
class OrderController:
    def create_order(self, request: Request) -> Response:
        user = self.auth_service.get_current_user(request)
        order = self.order_service.create(user, request.items)
        self.notification_service.send_confirmation(user, order)
        return Response(order)
```

**PlantUML:**
```plantuml
@startuml
participant OrderController
participant AuthService
participant OrderService
participant NotificationService

-> OrderController: create_order(request)
activate OrderController

OrderController -> AuthService: get_current_user(request)
AuthService --> OrderController: user

OrderController -> OrderService: create(user, items)
OrderService --> OrderController: order

OrderController -> NotificationService: send_confirmation(user, order)

<-- OrderController: Response(order)
deactivate OrderController
@enduml
```

---

## Complete Example

**Python Source:**
```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum

class OrderStatus(Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"

@dataclass
class LineItem:
    product_id: str
    quantity: int
    unit_price: float

    @property
    def subtotal(self) -> float:
        return self.quantity * self.unit_price

class Order:
    def __init__(self, customer_id: int):
        self.id: Optional[str] = None
        self.customer_id = customer_id
        self.items: List[LineItem] = []
        self.status = OrderStatus.PENDING

    def add_item(self, item: LineItem) -> None:
        self.items.append(item)

    @property
    def total(self) -> float:
        return sum(item.subtotal for item in self.items)

class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: Order) -> Order:
        pass

    @abstractmethod
    def find_by_id(self, order_id: str) -> Optional[Order]:
        pass

class PostgresOrderRepository(OrderRepository):
    def save(self, order: Order) -> Order:
        # Implementation
        pass

    def find_by_id(self, order_id: str) -> Optional[Order]:
        # Implementation
        pass
```

**PlantUML:**
```plantuml
@startuml
enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
}

class LineItem <<dataclass>> {
  +product_id: str
  +quantity: int
  +unit_price: float
  +subtotal: float <<property>>
}

class Order {
  +id: str?
  +customer_id: int
  +items: List<LineItem>
  +status: OrderStatus
  +add_item(item: LineItem): void
  +total: float <<property>>
}

abstract class OrderRepository {
  {abstract} +save(order: Order): Order
  {abstract} +find_by_id(order_id: str): Order?
}

class PostgresOrderRepository {
  +save(order: Order): Order
  +find_by_id(order_id: str): Order?
}

Order *-- LineItem
Order --> OrderStatus
OrderRepository <|-- PostgresOrderRepository
@enduml
```

---

**End of Python to UML Patterns**
