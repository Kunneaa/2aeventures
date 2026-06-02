import os
import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

os.environ["BACKEND_DATA_DIR"] = str(Path(tempfile.mkdtemp(prefix="2ae-tests-")))
os.environ["BACKEND_ADMIN_TOKEN"] = "test-admin-token"

from app.main import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)
