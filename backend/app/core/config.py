import os
from functools import lru_cache
from pathlib import Path


class Settings:
    app_name = "2aeventures-backend"
    api_v1_prefix = "/api/v1"
    backend_env = os.getenv("BACKEND_ENV", "development")
    log_level = os.getenv("BACKEND_LOG_LEVEL", "info")
    admin_token = os.getenv("BACKEND_ADMIN_TOKEN")
    data_dir = Path(os.getenv("BACKEND_DATA_DIR", "../data")).expanduser()
    cors_origins = tuple(
        origin.strip()
        for origin in os.getenv(
            "BACKEND_CORS_ORIGINS",
            ",".join(
                [
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://127.0.0.1:3000",
                    "http://127.0.0.1:3001",
                ]
            ),
        ).split(",")
        if origin.strip()
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
