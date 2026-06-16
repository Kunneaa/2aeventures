from __future__ import annotations

from typing import Annotated, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class ChatSessionCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    created_at: Annotated[Optional[str], Field(alias="createdAt")] = None


class ChatSessionResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    session_id: Annotated[str, Field(alias="sessionId")]


class ChatSendRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    message: str
    session_id: Annotated[Optional[str], Field(alias="sessionId")] = None
    timestamp: Optional[str] = None
    language: Optional[Literal["vi", "en"]] = None
    locale: Optional[Literal["vi", "en"]] = None
    pathname: Optional[str] = None


class ChatMessage(BaseModel):
    id: str
    sender: Literal["user", "bot"]
    message: str
    timestamp: str
    attachments: list[str] = Field(default_factory=list)


class ChatHistoryCleared(BaseModel):
    cleared: bool
