FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Runtime JSONL data dir (contacts, quotes) — created at startup
ENV BACKEND_DATA_DIR=/app/data

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

# Catalog is read from app/data/catalog.json (path relative to product_repo.py)
# Runtime data dir for JSONL files is /app/data — created here so it's writable
RUN mkdir -p /app/data

EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
