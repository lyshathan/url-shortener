
COMPOSE = docker compose -f ./docker-compose.prod.yml
COMPOSE-DEV = docker compose -f ./docker-compose.yml
COMPOSE-TEST = docker compose -f ./docker-compose.test.yml

all: dev-start

dev-build:
	@echo "DEVELOPMENT mode - Building images..."
	$(COMPOSE-DEV) build
	@echo "Images built"

dev-start:
	@echo "DEVELOPMENT mode - Starting services..."
	$(COMPOSE-DEV) up -d
	@echo "Services started"

dev: dev-build dev-start

dev-restart:
	@echo "DEVELOPMENT mode - Restarting with rebuild..."
	$(COMPOSE-DEV) down -v
	$(COMPOSE-DEV) build
	$(COMPOSE-DEV) up -d
	@echo "Services restarted"

prod-build:
	@echo "PRODUCTION mode - Building images..."
	$(COMPOSE) build
	@echo "Images built"

prod-start:
	@echo "PRODUCTION mode - Starting services..."
	$(COMPOSE) up -d
	@echo "Services started"

prod: prod-build prod-start

prod-restart:
	@echo "PRODUCTION mode - Restarting with rebuild..."
	$(COMPOSE) down -v
	$(COMPOSE) build
	$(COMPOSE) up -d
	@echo "Services restarted"

test:
	@echo "Starting PRODUCTION mode..."
	@echo "Building images ..."
	$(COMPOSE-TEST) up --build --exit-code-from backend-test
	@echo "Tests finished"

test-start:
	@echo "Running tests in Docker..."
	$(COMPOSE-TEST) up -d db-test
	$(COMPOSE-TEST) run --rm --entrypoint sh backend-test -c "npx prisma generate && npx prisma migrate deploy && npm run test"
	@echo "Tests finished"

blogs:
	$(COMPOSE) logs backend -f

flogs:
	$(COMPOSE) logs frontend -f

build:
	$(COMPOSE) build

start:
	$(COMPOSE) start

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v
	docker rmi url-shortener-backend url-shortener-frontend


.PHONY: clean build start stop down prod