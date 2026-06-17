import os
import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

import shutil

temp_data_dir = Path(tempfile.mkdtemp(prefix="2ae-tests-"))
root_data_dir = Path(__file__).resolve().parents[2] / "data"
if root_data_dir.exists():
    shutil.copytree(root_data_dir, temp_data_dir, dirs_exist_ok=True)

os.environ["BACKEND_DATA_DIR"] = str(temp_data_dir)
os.environ["BACKEND_ADMIN_TOKEN"] = "test-admin-token"

from app.main import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)
