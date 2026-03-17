## Description

URL Shortener - A small full-stack application for creating custom shoretened url and handling automatic redirection.

Build with **NestJS** and **React**, with a **postgreSQL** database.

## Project setup

```bash
$ cd backend && npm install
$ cd frontend && npm install
```

## Quick Start

**1. Clone the repository**
```bash
git clone <repository-url>
cd short-url
```

**2. Run project**

```bash
# development mode (all services with docker-compose)
$ make dev

# production mode (all services with docker-compose)
$ make

# wait few seconds, then the web app should be available at:
# http://localhost:3001/ on dev mode
# http://localhost/ on prod mode


# or run services individually

# backend development
$ cd backend
$ npm run start:dev

# frontend development
$ cd frontend
$ npm run dev
```

## Run tests

Backend integration tests directly in docker:
```bash
$ make test
```

Frontend unit tests:
```bash
$ cd frontend
$ npm test
```

## Makefile Commands

| Command           | Description                                                |
|-------------------|------------------------------------------------------------|
| `make`.           | Build and start all services in development mode (default) |
| `make dev-build`  | Build Docker images in development mode                    |
| `make dev-start`  | Start services in development mode                         |
| `make dev`        | Build and start all services in development mode           |
| `make prod-restart` | Restart services in developement mode with rebuild       |
| `make prod-build` | Build Docker images in production mode                     |
| `make prod-start` | Start services in production mode                          |
| `make prod`       | Build and start all services in production mode            |
| `make prod-restart` | Restart services in production with rebuild              |
| `make test`       | Build and run tests								         |
| `make test-start` | Run tests in Docker with database                          |
| `make build`      | Rebuild Docker images in production mode                   |
| `make start`      | Start existing stopped containers in production            |
| `make stop`       | Stop containers without removing them                      |
| `make down`       | Stop and remove all containers                             |
| `make clean`      | Remove containers and local images                         |
| `make flogs`      | Show frontend logs                                         |
| `make blogs`      | Show backend logs                                          |
