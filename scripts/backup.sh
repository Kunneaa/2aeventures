#!/usr/bin/env sh
set -eu

TS="$(date +%Y%m%d_%H%M%S)"
OUT_DIR="./backups"
mkdir -p "$OUT_DIR"

tar -czf "$OUT_DIR/2aeventures_$TS.tar.gz" \
  ./docker-compose.yml \
  ./docker-compose.prod.yml \
  ./nginx \
  ./backend

echo "Backup created: $OUT_DIR/2aeventures_$TS.tar.gz"
