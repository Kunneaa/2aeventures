from datetime import UTC, datetime
from uuid import uuid4

from app.repositories.chat_repo import chat_repository
from app.schemas.chat import ChatMessage, ChatSendRequest, ChatSessionResponse
from app.services.llm_svc import llm_service
from app.services.rag_svc import catalog_retrieval_service


class ChatService:
    def create_session(self) -> ChatSessionResponse:
        return ChatSessionResponse(sessionId=chat_repository.create_session())

    def send_message(self, request: ChatSendRequest) -> ChatMessage:
        session_id = chat_repository.ensure_session(request.session_id)
        created_at = request.timestamp or self._now()

        user_message = ChatMessage(
            id=str(uuid4()),
            sender="user",
            message=request.message.strip(),
            timestamp=created_at,
        )
        chat_repository.add_message(session_id, user_message)

        matches = catalog_retrieval_service.find_catalog_matches(request.message)
        bot_message = ChatMessage(
            id=str(uuid4()),
            sender="bot",
            message=llm_service.generate_reply(request, matches),
            timestamp=self._now(),
            attachments=[product.id for product in matches],
        )
        return chat_repository.add_message(session_id, bot_message)

    def get_history(self, session_id: str, limit: int = 50) -> list[ChatMessage]:
        return chat_repository.get_history(session_id, limit=limit)

    def clear_history(self, session_id: str) -> bool:
        return chat_repository.clear_history(session_id)

    def suggestions(self) -> list[str]:
        return [
            "Tôi cần báo giá thịt bò Mỹ",
            "Có những nhóm hàng đông lạnh nào?",
            "Làm sao để gửi yêu cầu báo giá?",
            "I need seafood suggestions",
        ]

    def _now(self) -> str:
        return datetime.now(UTC).isoformat()


chat_service = ChatService()
