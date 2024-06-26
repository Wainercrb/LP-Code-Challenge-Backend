# Node.js Application README

This is a Node.js application aimed at addressing the TrueNorth code challenge.

## Requirements

- Node.js v20.11.0
- npm v10.2.4

## Getting Started

To get started, follow these simple steps:

1. Clone this repository to your local machine.
2. Make you that you are using the correct node version.
3. Install dependencies by running `npm install`.
4. Add the .env file with(It is not good practice to add these values here, but for this reason I will do it):
   ```dosini
   DB_HOST="c7q.h.filess.io"
   DB_USER="mydatabase_rubbedtime"
   DB_PASSWORD="fb4b5a5083c4c2a7ef7d96ca9f03e1985d495eee"
   DB_PORT="3307"
   DB_NAME="mydatabase_rubbedtime"
   TOKEN_SECRET="secret"
   RANDOM_ORG_API_KEY="0ca83608-4a7a-4128-b1f3-7794887d1203"
   RANDOM_ORG_HASHED_KEY="A1vVwpBzrNWYcGBtL7qZRcO9K233zUC5QaLz20CP228ZpclxHSf33+dmqParhYBTKrtyNx90cd8c5xaUjPRcIQ=="
   RANDOM_ORG_API_URL="https://api.random.org/json-rpc/2/invoke"
   ```
5. Depending on your preference:
   - For local development with TypeScript, run `npm run dev`.
   - For local development with pure JavaScript, run `npm run build && npm run start:dist` for transpiled files.

## Main Stack

Our application is built using the following technologies:

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Sequelize**: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **Lint**: Ensure code consistency and identify problematic patterns.
- **Jest**: Delightful JavaScript Testing Framework with a focus on simplicity.
- **Zod**: TypeScript-first schema declaration and validation library.
- **AWS**: Cloud services for deploying and scaling web applications.
- **jsonwebtoken**: JSON Web Token implementation for authentication.
- **cookies**: Handling cookies for secure session management.

## Infrastructure

We have chosen a Domain-Driven Design (DDD) infrastructure to ensure scalability, maintainability, and flexibility in our application architecture.

It's important to mention that this isn't a pure DDD architecture, but rather an attempt to replicate its basic concepts.

## CI/CD

We utilize GitHub Actions for automating our CI/CD pipeline. GitHub Actions are configured to:

- Format code
- Lint code
- Run tests
- Build the project

## Cloud

Our application is deployed on AWS, utilizing the following services:

- **EC2**: Scalable virtual servers to run applications.
- **PM2**: Advanced, production process manager for Node.js.
- **NGINX**: High-performance web server for reverse proxying and load balancing.
- **API Gateway**: Fully managed service for creating, publishing, maintaining, monitoring, and securing APIs at any scale.

## Database

For database services, we utilize Filess.io, a free database service that provides a reliable database instance. We have created seed and migrations for the database. To rebuild the database and insert dummy data, simply run `npm run prestart`.

## Code Coverage

We are proud to achieve almost 95% code coverage in our tests, ensuring the reliability and stability of our application.

## Solution Provided

### Routes Created:

- **POST /sign-in**: User can sign in to the application.
- **POST /sign-up**: User can sign up, with a default amount set, which will be reduced for each operation.
- **GET /profile**: Get logged user info.
- **GET /verify-user**: Check if user is logged in with valid credentials.
- **GET /get-logged-user-records**: Get logged user records with pagination.
- **POST /create-records**: User can create records, fetching the operation to assign the operation_id to the record.
- **GET /get-available-operation**: Get available operations.

### Application Flow:

1. **Sign In**: Users can sign in to the application.
2. **Sign Up**: Upon sign-up, a default amount is set, which is reduced for each operation.
3. **List**: Users can list their records, sorting in ascending and descending order based on a given column and applying match filters.
4. **Create Record**: Users can create records, fetching the operation to assign the operation_id to the record.

## Issues

One known issue is that cookies are being deleted if the browser refreshes the page. We are actively investigating this issue and working on a resolution.
