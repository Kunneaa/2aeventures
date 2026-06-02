from pathlib import Path
from threading import RLock
from typing import Generic, TypeVar

from pydantic import BaseModel, ValidationError

ModelT = TypeVar("ModelT", bound=BaseModel)


class JsonlStore(Generic[ModelT]):
    def __init__(self, path: Path, model: type[ModelT]) -> None:
        self.path = path
        self.model = model
        self._lock = RLock()
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.touch(exist_ok=True)

    def append(self, item: ModelT) -> None:
        with self._lock:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            with self.path.open("a", encoding="utf-8") as file:
                file.write(item.model_dump_json(by_alias=True))
                file.write("\n")

    def list(self) -> list[ModelT]:
        with self._lock:
            if not self.path.exists():
                return []

            records: list[ModelT] = []
            with self.path.open("r", encoding="utf-8") as file:
                for line in file:
                    raw = line.strip()
                    if not raw:
                        continue
                    try:
                        records.append(self.model.model_validate_json(raw))
                    except ValidationError:
                        continue
            return records

    def get(self, record_id: str) -> ModelT | None:
        return next((record for record in self.list() if record.id == record_id), None)
