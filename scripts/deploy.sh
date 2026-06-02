#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT_DIR"

COMPOSE="docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml"

if [ ! -f .env ]; then
  echo "Missing .env. Create it from .env.example, then set APP_HOSTS to your real domain."
  echo "Example: APP_HOSTS=2aeventures.com,www.2aeventures.com"
  exit 1
fi

set -a
. ./.env
set +a

APP_HOSTS="${APP_HOSTS:-}"
HTTP_PORT="${HTTP_PORT:-80}"
BACKEND_ADMIN_TOKEN="${BACKEND_ADMIN_TOKEN:-}"

if [ -z "$APP_HOSTS" ] || [ "$APP_HOSTS" = "example.com,www.example.com" ] || [ "$APP_HOSTS" = ":80" ]; then
  echo "APP_HOSTS must be set to your real domain in .env."
  echo "Example: APP_HOSTS=2aeventures.com,www.2aeventures.com"
  exit 1
fi

if [ -z "$BACKEND_ADMIN_TOKEN" ] || [ "$BACKEND_ADMIN_TOKEN" = "change-this-admin-token" ]; then
  echo "BACKEND_ADMIN_TOKEN must be changed in .env before production deploy."
  exit 1
fi

mkdir -p data backups

echo "Validating production compose..."
$COMPOSE config >/tmp/2aeventures-compose.yml

echo "Creating backup before deploy..."
./scripts/backup.sh

echo "Building and starting production stack..."
$COMPOSE up -d --build --remove-orphans

echo "Running health check..."
PRIMARY_HOST="$(printf "%s" "$APP_HOSTS" | cut -d "," -f 1)"
if command -v curl >/dev/null 2>&1; then
  curl -fsS -H "Host: $PRIMARY_HOST" "http://127.0.0.1:$HTTP_PORT/healthz" >/dev/null
fi

$COMPOSE ps

echo "Deploy completed."
echo "Open: https://$PRIMARY_HOST"
