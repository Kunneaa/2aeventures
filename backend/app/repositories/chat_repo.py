from __future__ import annotations

from collections import defaultdict
from uuid import uuid4

from app.schemas.chat import ChatMessage


class ChatRepository:
    def __init__(self) -> None:
        self._sessions: dict[str, list[ChatMessage]] = defaultdict(list)

    def create_session(self) -> str:
        session_id = str(uuid4())
        self._sessions[session_id] = []
        return session_id

    def ensure_session(self, session_id: str | None) -> str:
        if session_id and session_id in self._sessions:
            return session_id
        if session_id:
            self._sessions[session_id] = []
            return session_id
        return self.create_session()

    def add_message(self, session_id: str, message: ChatMessage) -> ChatMessage:
        self._sessions[session_id].append(message)
        return message

    def get_history(self, session_id: str, limit: int = 50) -> list[ChatMessage]:
        history = self._sessions.get(session_id, [])
        return history[-limit:]

    def clear_history(self, session_id: str) -> bool:
        self._sessions[session_id] = []
        return True


chat_repository = ChatRepository()
