from fastapi import APIRouter, Depends, HTTPException

from app.api.dependencies import require_admin_token
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_svc import contact_service

router = APIRouter()


@router.post("", response_model=ContactResponse, response_model_by_alias=True, status_code=201)
def create_contact_message(payload: ContactCreate) -> ContactResponse:
    return contact_service.create_message(payload)


@router.get("", response_model=list[ContactResponse], response_model_by_alias=True)
def list_contact_messages(_: None = Depends(require_admin_token)) -> list[ContactResponse]:
    return contact_service.list_messages()


@router.get("/{message_id}", response_model=ContactResponse, response_model_by_alias=True)
def contact_message_detail(
    message_id: str,
    _: None = Depends(require_admin_token),
) -> ContactResponse:
    message = contact_service.get_message(message_id)
    if message is None:
        raise HTTPException(status_code=404, detail="Contact message not found")
    return message
