#!/usr/bin/env sh
set -eu

TS="$(date +%Y%m%d_%H%M%S)"
OUT_DIR="./backups"
mkdir -p "$OUT_DIR"
mkdir -p ./data

tar \
  --exclude="./frontend/node_modules" \
  --exclude="./frontend/.next" \
  --exclude="./frontend/coverage" \
  --exclude="./frontend/*.tsbuildinfo" \
  --exclude="./backend/data" \
  --exclude="./backend/.venv" \
  --exclude="./backend/.venv*" \
  --exclude="./backend/__pycache__" \
  --exclude="./backend/.pytest_cache" \
  --exclude="./backups" \
  -czf "$OUT_DIR/2aeventures_$TS.tar.gz" \
  ./Makefile \
  ./.env.example \
  ./README.md \
  ./docker-compose.yml \
  ./docker-compose.prod.yml \
  ./caddy \
  ./backend \
  ./frontend \
  ./data

echo "Backup created: $OUT_DIR/2aeventures_$TS.tar.gz"
