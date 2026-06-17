FROM node:20-alpine AS deps

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_API_URL=/api/v1
ARG API_PROXY_TARGET=https://twoae-demo-api.onrender.com
ARG NEXT_PUBLIC_APP_NAME="2AE VENTURES"
ARG NEXT_PUBLIC_DEFAULT_LOCALE=vi
ARG NEXT_PUBLIC_ENABLED_LOCALES=vi,en
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_PROXY_TARGET=$API_PROXY_TARGET
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE
ENV NEXT_PUBLIC_ENABLED_LOCALES=$NEXT_PUBLIC_ENABLED_LOCALES

COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .
COPY data/ /data/
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=10000
ENV NEXT_PUBLIC_API_URL=/api/v1
ENV NEXT_PUBLIC_APP_NAME="2AE VENTURES"
ENV NEXT_PUBLIC_DEFAULT_LOCALE=vi
ENV NEXT_PUBLIC_ENABLED_LOCALES=vi,en
ENV API_PROXY_TARGET=https://twoae-demo-api.onrender.com

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /data /data

USER node

EXPOSE 10000

CMD ["node", "server.js"]
