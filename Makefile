.PHONY: up down build logs restart ps validate deploy backup prod-config

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

prod-config:
	docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml config

deploy:
	./scripts/deploy.sh

backup:
	./scripts/backup.sh
