# Software Design with Domain-Driven Design (DDD)

This project demonstrates advanced software architecture concepts, focusing on Domain-Driven Design (DDD) principles, Clean Architecture, and functional error handling using the Either pattern. The project is implemented with TypeScript, Node.js, NestJS, and follows test-driven development practices using Vitest.

## Key Features

- **Domain-Driven Design (DDD) principles**
- **Clean Architecture implementation**
- **Functional error handling with Either pattern (Left/Right)**
- **TypeScript with Node.js and NestJS**
- **Test-driven development using Vitest**
- **JWT Authentication using RS256 with public/private keys**
- **Prisma ORM for database access**
- **AWS S3 integration for file storage**

## Concepts Covered

- **Aggregate patterns**
- **Value Objects**
- **Domain Events with Pub/Sub patterns**
- **Subdomain organization**
- **In-memory repositories for testing**
- **SOLID principles implementation:**
  - Single Responsibility Principle (SRP)
  - Interface Segregation Principle (ISP)
  - Dependency Inversion Principle (DIP)
- **JWT authentication and authorization**
- **Data validation with Zod**
- **RESTful API design**

## Project Structure

Based on the project's folder structure, it follows a well-organized architecture:

### Core (`/src/core`)

Contains foundational elements used throughout the application:
- Either pattern implementation for functional error handling
- Domain events infrastructure
- Generic entity implementations
- Base repository interfaces

### Domain (`/src/domain`)

Contains the core business logic organized into subdomains:

#### Forum Domain (`/src/domain/forum`)
- **Enterprise**: Contains domain entities and business rules
  - Entities: `Question`, `Answer`, `Student`, `QuestionComment`, `AnswerComment`
  - Value objects: `Slug`, `QuestionDetails`, `AnswerWithAuthor`
  - Entity lists: `QuestionAttachmentList`, `AnswerAttachmentList`

- **Application**: Contains use cases and domain services
  - Use cases: `CreateQuestion`, `AnswerQuestion`, `EditQuestion`, `DeleteQuestion`, `ChooseQuestionBestAnswer`, etc.
  - Repository interfaces defining domain persistence contracts
  - Cryptography interfaces for domain security concerns

#### Notification Domain (`/src/domain/notification`)
- Notification-related entities and services
- Subscribers for handling domain events

### Infrastructure (`/src/infra`)

Contains implementation details and technical concerns:

#### Authentication (`/src/infra/auth`)
- **JWT Strategy**: Implements authentication using RS256 with public/private keys
- **Guards**: Protects routes requiring authentication
- **Decorators**: Simplifies access to authenticated user information

#### HTTP (`/src/infra/http`)
- **Controllers**: RESTful API endpoints mapped to use cases
- **Presenters**: Data transformation for API responses
- **Pipes**: Request validation using Zod schemas

#### Database (`/src/infra/database`)
- Prisma ORM implementation for database access
- Repository implementations

#### Cryptography (`/src/infra/cryptography`)
- JWT implementation for token generation and validation
- Bcrypt implementation for password hashing

#### Storage (`/src/infra/storage`)
- AWS S3 integration for file uploads and attachments

#### Environment (`/src/infra/env`)
- Configuration management with environment variables

## Authentication Strategy

The project implements a robust JWT authentication mechanism:

- **RS256 Algorithm**: Uses asymmetric public/private key pairs for enhanced security
- **Passport Integration**: NestJS Passport module with JWT strategy
- **Global Guard**: Automatically protects all endpoints with opt-out for public routes
- **Token Payload Validation**: Uses Zod schema to validate token structure
- **Private/Public Key Management**: Keys stored as Base64-encoded environment variables

## Testing Strategy

The project employs a comprehensive testing approach:

- **Unit Tests**: For domain logic and use cases using in-memory repositories
- **E2E Tests**: For API endpoints with supertest
- **Test Factories**: For consistent entity creation in tests
- **Repository Doubles**: In-memory implementations for testing

## Getting Started

### Prerequisites

- Node.js
- TypeScript
- Docker (for PostgreSQL database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/235471/Forum.git
   cd your-repo-name
   ```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Generate public and private keys for JWT authentication

4. Start the database:
```
docker-compose up -d
```

5. Run Prisma migrations:
```
npx prisma migrate dev
```

### Running Tests

The project uses Vitest for test-driven development:

```
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run specific e2e test adjust the file path
npm run test:e2e:single
```