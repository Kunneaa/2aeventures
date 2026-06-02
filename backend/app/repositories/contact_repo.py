from datetime import UTC, datetime
from uuid import uuid4

from app.core.config import get_settings
from app.repositories.jsonl_store import JsonlStore
from app.schemas.contact import ContactCreate, ContactResponse


class ContactRepository:
    def __init__(self) -> None:
        self._store = JsonlStore(get_settings().data_dir / "contacts.jsonl", ContactResponse)

    def create_message(self, payload: ContactCreate) -> ContactResponse:
        message = ContactResponse(
            id=str(uuid4()),
            status="received",
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            message=payload.message,
            locale=payload.locale,
            createdAt=datetime.now(UTC).isoformat(),
        )
        self._store.append(message)
        return message

    def list_messages(self) -> list[ContactResponse]:
        return self._store.list()

    def get_message(self, message_id: str) -> ContactResponse | None:
        return self._store.get(message_id)


contact_repository = ContactRepository()
