from datetime import UTC, datetime
from uuid import uuid4

from app.core.config import get_settings
from app.repositories.jsonl_store import JsonlStore
from app.schemas.quote import QuoteCreate, QuoteResponse


class QuoteRepository:
    def __init__(self) -> None:
        self._store = JsonlStore(get_settings().data_dir / "quotes.jsonl", QuoteResponse)

    def create_quote(self, payload: QuoteCreate) -> QuoteResponse:
        quote = QuoteResponse(
            id=str(uuid4()),
            status="pending",
            items=payload.items,
            customerInfo=payload.customer_info,
            notes=payload.notes,
            locale=payload.locale,
            createdAt=datetime.now(UTC).isoformat(),
        )
        self._store.append(quote)
        return quote

    def get_quote(self, quote_id: str) -> QuoteResponse | None:
        return self._store.get(quote_id)

    def list_quotes(self) -> list[QuoteResponse]:
        return self._store.list()


quote_repository = QuoteRepository()
