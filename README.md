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

## Installation Steps

### 1. Clone the repository

```bash
git clone <your-github-repository-link>
cd en2h-booking-api
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
| GET | `/bookings` | Get all bookings | Yes |
| GET | `/bookings/:id` | Get booking by ID | Yes |
| PATCH | `/bookings/:id/status` | Update booking status | Yes |
| PATCH | `/bookings/:id/cancel` | Cancel booking | Yes |

## Sample Request Bodies

### Register

```json
{
  "name": "Dinithi",
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

## Assumptions Made

- SQLite was used for easier local setup and testing.
- Customers can create bookings without registering or logging in.
- Service management is restricted to authenticated users.
- Booking status can be updated only by authenticated users.
- Duplicate bookings are not allowed for the same service, date, and time.

## Future Improvements

- Add PostgreSQL support for production use.
- Add refresh token authentication.
- Add pagination for services and bookings.
- Add search and filtering for bookings.
- Add unit tests and integration tests.
- Add Docker support.
- Deploy the API to a cloud platform.

## Author

Dinithi Uthpala

Software Engineering Internship Technical Assessment  
EN2H Global (Pvt) Ltd