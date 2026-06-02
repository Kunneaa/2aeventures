from fastapi import APIRouter, HTTPException, Query

from app.schemas.chat import (
    ChatHistoryCleared,
    ChatMessage,
    ChatSendRequest,
    ChatSessionCreate,
    ChatSessionResponse,
)
from app.services.chat_svc import chat_service

router = APIRouter()


@router.post("/session", response_model=ChatSessionResponse, response_model_by_alias=True)
def create_session(_: ChatSessionCreate) -> ChatSessionResponse:
    return chat_service.create_session()


@router.post("/send", response_model=ChatMessage)
def send_message(payload: ChatSendRequest) -> ChatMessage:
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")
    return chat_service.send_message(payload)


@router.get("/history/{session_id}", response_model=list[ChatMessage])
def chat_history(
    session_id: str,
    limit: int = Query(default=50, ge=1, le=200),
) -> list[ChatMessage]:
    return chat_service.get_history(session_id, limit=limit)


@router.delete("/history/{session_id}", response_model=ChatHistoryCleared)
def clear_history(session_id: str) -> ChatHistoryCleared:
    return ChatHistoryCleared(cleared=chat_service.clear_history(session_id))


@router.get("/suggestions", response_model=list[str])
def suggestions() -> list[str]:
    return chat_service.suggestions()
