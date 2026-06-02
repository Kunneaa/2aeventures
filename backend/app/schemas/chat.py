from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field


class ChatSessionCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    created_at: Annotated[str | None, Field(alias="createdAt")] = None


class ChatSessionResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    session_id: Annotated[str, Field(alias="sessionId")]


class ChatSendRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    message: str
    session_id: Annotated[str | None, Field(alias="sessionId")] = None
    timestamp: str | None = None
    language: Literal["vi", "en"] | None = None
    locale: Literal["vi", "en"] | None = None
    pathname: str | None = None


class ChatMessage(BaseModel):
    id: str
    sender: Literal["user", "bot"]
    message: str
    timestamp: str
    attachments: list[str] = Field(default_factory=list)


class ChatHistoryCleared(BaseModel):
    cleared: bool
