#!/usr/bin/env sh
set -eu

export APP_HOSTS="${APP_HOSTS:-:80}"
export HTTP_PORT="${HTTP_PORT:-8080}"
export HTTPS_PORT="${HTTPS_PORT:-8443}"

docker compose up --build
