# Task Management Backend

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

A robust and scalable backend API for task management with AI-powered suggestions, built with NestJS, TypeScript, and PostgreSQL.

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Development](#-development)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database](#-database)
- [Development](#-development)
- [Testing](#-testing)
- [Docker Setup](#-docker-setup)
- [Project Structure](#-project-structure)
- [License](#-license)

## 🎯 Overview

Task Management Backend is a RESTful API service that provides comprehensive task management capabilities with intelligent AI-powered suggestions. The application is built using NestJS framework, leveraging TypeScript for type safety and Prisma as the ORM for database operations.

## ✨ Features

- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Task Status Management**: Track tasks through TODO, IN_PROGRESS, and DONE states
- **Status Cycling**: Quick status transitions with a single endpoint
- **Bulk Operations**: Delete multiple tasks by status
- **AI-Powered Suggestions**: Get intelligent task suggestions using OpenAI
- **Data Validation**: Input validation using class-validator
- **CORS Support**: Configurable CORS for frontend integration
- **Type Safety**: Full TypeScript support with Prisma-generated types

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: TypeScript 5.9
- **Database**: PostgreSQL 15
- **ORM**: Prisma 6.18
- **AI Integration**: OpenAI API
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/) (or use Docker)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (optional)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd task-management-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"

# Application
PORT=3001
CLIENT_URL=http://localhost:3000

# OpenAI (for AI suggestions)
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `PORT` | Server port | 3001 | No |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 | No |
| `OPENAI_API_KEY` | OpenAI API key for suggestions | - | Yes (for suggestions) |

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will start on `http://localhost:3001` (or the port specified in your `.env` file).

### Production Mode

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## 📚 API Documentation

### Base URL

```
http://localhost:3001
```

### Tasks Endpoints

#### Get All Tasks

```http
GET /tasks
```

**Response:**
```json
[
  {
    "id": "clx123...",
    "title": "Complete project documentation",
    "date": "2024-01-15T10:00:00.000Z",
    "notes": "Include API examples",
    "status": "IN_PROGRESS",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

#### Get Task by ID

```http
GET /tasks/:id
```

**Response:**
```json
{
  "id": "clx123...",
  "title": "Complete project documentation",
  "date": "2024-01-15T10:00:00.000Z",
  "notes": "Include API examples",
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### Create Task

```http
POST /tasks
Content-Type: application/json

{
  "title": "New task",
  "notes": "Task description",
  "date": "2024-01-20T10:00:00.000Z",
  "status": "TODO"
}
```

**Response:**
```json
{
  "id": "clx456...",
  "title": "New task",
  "notes": "Task description",
  "date": "2024-01-20T10:00:00.000Z",
  "status": "TODO",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### Update Task

```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated task title",
  "notes": "Updated notes",
  "status": "IN_PROGRESS"
}
```

#### Delete Task

```http
DELETE /tasks/:id
```

#### Delete Tasks by Status

```http
DELETE /tasks?status=DONE
```

**Query Parameters:**
- `status`: `TODO` | `IN_PROGRESS` | `DONE`

#### Cycle Task Status

```http
PUT /tasks/:id/cycle
```

Cycles through task statuses: `TODO` → `IN_PROGRESS` → `DONE` → `TODO`

### Suggestions Endpoint

#### Get AI Suggestions

```http
POST /suggestions
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "I need to organize my work tasks"
    }
  ]
}
```

**Response:**
```json
{
  "suggestion": "AI-generated suggestion text..."
}
```

## 🗄 Database

### Schema

The application uses the following Prisma schema:

```prisma
model Task {
  id        String   @id @default(cuid())
  title     String
  date      DateTime @default(now())
  notes     String
  status    TaskStatus @default(TODO)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}
```

### Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 💻 Development

### Code Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Project Structure

```
task-management-backend/
├── src/
│   ├── tasks/              # Task module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── models/        # Task models
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── suggestions/        # AI suggestions module
│   │   ├── suggestions.controller.ts
│   │   ├── suggestions.service.ts
│   │   └── suggestions.module.ts
│   ├── app.module.ts      # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts            # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── generated/
│   └── prisma/            # Generated Prisma Client
├── test/                  # E2E tests
├── docker-compose.yml     # Docker services configuration
└── package.json
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### E2E Tests

```bash
npm run test:e2e
```

### Coverage

```bash
npm run test:cov
```

## 🐳 Docker Setup

The project includes a `docker-compose.yml` file for easy database setup:

### Start Services

```bash
docker-compose up -d
```

This will start:
- **PostgreSQL** on port `5432`
- **pgAdmin** on port `5050` (http://localhost:5050)

### Stop Services

```bash
docker-compose down
```

### Access pgAdmin

- URL: http://localhost:5050
- Configure your credentials in `docker-compose.yml`

### Connect to Database

Configure your database connection using the credentials defined in your `docker-compose.yml` file and `.env` file.

## 📝 License

This project is licensed under the UNLICENSED license.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the repository.

---

<div align="center">

Made with ❤️ using NestJS

</div>
