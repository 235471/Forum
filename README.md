# Software Design with Domain-Driven Design (DDD)

This project is a practical application of advanced software architecture concepts, focusing on Domain-Driven Design (DDD) principles, Clean Architecture, and functional error handling using the Either pattern. The project is implemented in TypeScript with Node.js and follows test-driven development practices using Vitest.

## Key Features

- **Domain-Driven Design (DDD) principles**
- **Clean Architecture implementation**
- **Functional error handling with Either pattern (Left/Right)**
- **TypeScript with Node.js**
- **Test-driven development using Vitest**

## Concepts Covered

- **Aggregate patterns**
- **Value Objects**
- **Domain Events with Pub/Sub patterns**
- **Subdomain organization (Core, Support, Generic)**
- **In-memory repositories for testing**

## Project Structure

The project is organized into several key areas:

### Domain

Contains the core business logic and domain entities.

- **Entities**: Represent the core business objects (e.g., `Question`, `Answer`, `QuestionComment`).
- **Value Objects**: Immutable objects that represent a value (e.g., `Slug`).
- **Events**: Domain events that represent significant occurrences within the domain (e.g., `AnswerCreatedEvent`).

### Application

Contains the use cases and application services.

- **Use Cases**: Application-specific business logic (e.g., `CreateQuestionUseCase`, `AnswerQuestionUseCase`).
- **Subscribers**: Event handlers that react to domain events (e.g., `OnAnswerCreated`).

### Infrastructure

Contains the implementation details and infrastructure-specific code.

- **Repositories**: In-memory repositories for testing purposes (e.g., `InMemoryQuestionRepository`, `InMemoryAnswerRepository`).

## Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
```
npm install
```

Running Tests
The project uses Vitest for test-driven development. To run the tests, use the following command:
```
npm test
```