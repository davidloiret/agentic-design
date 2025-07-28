# Makefile for easier Docker Compose management

.PHONY: help dev prod build up down logs clean

help:
	@echo "Available commands:"
	@echo "  make dev      - Start development environment"
	@echo "  make prod     - Start production environment"
	@echo "  make build    - Build Docker images"
	@echo "  make up       - Start services in background"
	@echo "  make down     - Stop all services"
	@echo "  make logs     - View logs"
	@echo "  make clean    - Clean up volumes and images"

# Development commands
dev:
	docker-compose -f docker-compose.dev.yml up

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Production commands
prod:
	docker-compose -f docker-compose.prod.yml up -d

prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-down:
	docker-compose -f docker-compose.prod.yml down

# General commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

clean:
	docker-compose down -v
	docker system prune -af

# Database commands
db-shell:
	docker-compose exec postgres psql -U agentic -d agentic_design

redis-cli:
	docker-compose exec redis redis-cli

# Deployment
deploy:
	@echo "Building and deploying to production..."
	docker-compose -f docker-compose.prod.yml build
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Deployment complete!"