# EN2H Booking Platform API

A RESTful Booking Platform API built with NestJS and TypeScript for the EN2H Software Engineering Internship technical assessment.

This API allows authenticated users to manage services and allows customers to create bookings for available services.

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- SQLite
- JWT Authentication
- Swagger API Documentation
- Class Validator
- Jest Unit Testing
- Docker

## Features

### Authentication

- User registration
- User login
- JWT access token generation
- Protected routes using JWT authentication

### Service Management

Authenticated users can:

- Create a service
- Get all services
- Get a service by ID
- Update a service
- Delete a service

### Booking Management

Customers can:

- Create bookings without authentication

Authenticated users can:

- Get all bookings
- Get a booking by ID
- Update booking status
- Cancel bookings

### Bonus Features Implemented

- Pagination for bookings
- Search bookings by customer name, email, or phone
- Filter bookings by status
- Duplicate booking prevention
- Global exception handling
- Swagger request body examples
- Unit testing with Jest
- Docker support

## Business Rules Implemented

- A booking must belong to an existing service.
- Booking dates cannot be in the past.
- Cancelled bookings cannot be marked as completed.
- Only authenticated users can manage services.
- Customers can create bookings without authentication.
- Duplicate bookings are prevented for the same service, date, and time.

## Booking Status Enum

```ts
PENDING
CONFIRMED
CANCELLED
COMPLETED
```

## Project Structure

```text
src/
  auth/
    dto/
    auth.controller.ts
    auth.module.ts
    auth.service.ts
    jwt-auth.guard.ts
    jwt.strategy.ts

  bookings/
    dto/
    bookings.controller.ts
    bookings.module.ts
    bookings.service.ts

  common/
    filters/
      http-exception.filter.ts

  prisma/
    prisma.module.ts
    prisma.service.ts

  services/
    dto/
    services.controller.ts
    services.module.ts
    services.service.ts

  app.module.ts
  main.ts

prisma/
  migrations/
  schema.prisma

Dockerfile
.dockerignore
.env.example
README.md
```

## Installation Steps

### 1. Clone the repository

```bash
git clone https://github.com/dinithi-uthpala/en2h-booking-platform-api.git
cd en2h-booking-platform-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the project root and add:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_key"
```

A sample environment file is provided as `.env.example`.

## Database Setup

Run database migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Running the Application

```bash
npm run start:dev
```

The API will run on:

```text
http://localhost:3000
```

## Running with Docker

Build the Docker image:

```bash
docker build -t en2h-booking-api .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env en2h-booking-api
```

The API will be available at:

```text
http://localhost:3000
```

Swagger documentation will be available at:

```text
http://localhost:3000/api-docs
```

## API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

After starting the application, open this URL in a browser to view and test all API endpoints.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

### Services

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/services` | Create a service | Yes |
| GET | `/services` | Get all services | Yes |
| GET | `/services/:id` | Get service by ID | Yes |
| PATCH | `/services/:id` | Update service | Yes |
| DELETE | `/services/:id` | Delete service | Yes |

### Bookings

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/bookings` | Create a booking | No |
| GET | `/bookings` | Get all bookings with pagination, search, and status filter | Yes |
| GET | `/bookings/:id` | Get booking by ID | Yes |
| PATCH | `/bookings/:id/status` | Update booking status | Yes |
| PATCH | `/bookings/:id/cancel` | Cancel booking | Yes |

## Booking Query Parameters

The `GET /bookings` endpoint supports pagination, search, and status filtering.

| Query Parameter | Example | Description |
|---|---|---|
| `page` | `1` | Page number |
| `limit` | `5` | Number of records per page |
| `search` | `Kavindi` | Search by customer name, email, or phone |
| `status` | `CANCELLED` | Filter by booking status |

Example:

```text
GET /bookings?page=1&limit=5
GET /bookings?search=Kavindi
GET /bookings?status=CANCELLED
```

## Sample Request Bodies

### Register

```json
{
  "name": "Dinithi Uthpala",
  "email": "dinithi@test.com",
  "password": "123456"
}
```

### Login

```json
{
  "email": "dinithi@test.com",
  "password": "123456"
}
```

### Create Service

```json
{
  "title": "Hair Cut",
  "description": "Basic haircut service",
  "duration": 45,
  "price": 1800,
  "isActive": true
}
```

### Create Booking

```json
{
  "customerName": "Kavindi Perera",
  "customerEmail": "kavindi@test.com",
  "customerPhone": "0771234567",
  "serviceId": 1,
  "bookingDate": "2026-07-15",
  "bookingTime": "10:30",
  "notes": "First booking test"
}
```

### Update Booking Status

```json
{
  "status": "CONFIRMED"
}
```

## Authentication Usage

For protected endpoints, include the JWT token in the request header:

```text
Authorization: Bearer <access_token>
```

The access token is returned after successful login.

## Error Response Format

The API uses a global exception filter to return structured error responses.

Example:

```json
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2026-07-10T02:05:09.168Z",
  "path": "/bookings/1/status",
  "message": {
    "message": "Cancelled bookings cannot be marked as completed",
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

## Testing

Run unit tests:

```bash
npm test
```

Expected result:

```text
Test Suites: 8 passed, 8 total
Tests: 8 passed, 8 total
```

## Assumptions Made

- SQLite was used for easier local setup and testing.
- Customers can create bookings without registering or logging in.
- Service management is restricted to authenticated users.
- Booking status can be updated only by authenticated users.
- Duplicate bookings are not allowed for the same service, date, and time.
- Booking date validation checks the booking date against the current date.
- Docker support is provided for easier containerized setup.

## Future Improvements

- Add PostgreSQL support for production use.
- Add refresh token authentication.
- Add pagination for services.
- Add advanced filtering for services.
- Add role-based access control.
- Add integration tests.
- Deploy the API to a cloud platform.

## Author

Dinithi Uthpala

Software Engineering Internship Technical Assessment  
EN2H Global (Pvt) Ltd