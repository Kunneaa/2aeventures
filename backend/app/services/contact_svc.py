from __future__ import annotations

from app.repositories.contact_repo import contact_repository
from app.schemas.contact import ContactCreate, ContactResponse


class ContactService:
    def create_message(self, payload: ContactCreate) -> ContactResponse:
        return contact_repository.create_message(payload)

    def list_messages(self) -> list[ContactResponse]:
        return contact_repository.list_messages()

    def get_message(self, message_id: str) -> ContactResponse | None:
        return contact_repository.get_message(message_id)


contact_service = ContactService()
