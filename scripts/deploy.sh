#!/usr/bin/env sh
set -eu

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose ps
