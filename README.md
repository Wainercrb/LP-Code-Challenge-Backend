# Node.js Application README

Welcome to our Node.js application! This README will guide you through setting up and running the project.

## Requirements

- Node.js v20.11.0
- npm v10.2.4

## Getting Started

To get started, follow these simple steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Depending on your preference:
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

## Infrastructure

We have chosen a Domain-Driven Design (DDD) infrastructure to ensure scalability, maintainability, and flexibility in our application architecture.

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

## Issues

One known issue is that cookies are being deleted if the browser refreshes the page. We are actively investigating this issue and working on a resolution.
