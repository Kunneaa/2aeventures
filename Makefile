.PHONY: up down build logs restart ps validate

up:
	docker compose up -d --build

down:
	docker compose down

build:
	docker compose build

logs:
	docker compose logs -f --tail=200

restart:
	docker compose restart

ps:
	docker compose ps

validate:
	docker compose config
