from fastapi import HTTPException

from app.repositories.quote_repo import quote_repository
from app.schemas.quote import QuoteCreate, QuoteResponse
from app.services.product_svc import product_service


class QuoteService:
    def create_quote(self, payload: QuoteCreate) -> QuoteResponse:
        missing = [
            item.product_id
            for item in payload.items
            if product_service.get_product(item.product_id) is None
        ]
        if missing:
            raise HTTPException(
                status_code=422,
                detail=f"Unknown product id(s): {', '.join(missing)}",
            )
        return quote_repository.create_quote(payload)

    def get_quote(self, quote_id: str) -> QuoteResponse | None:
        return quote_repository.get_quote(quote_id)

    def list_quotes(self) -> list[QuoteResponse]:
        return quote_repository.list_quotes()


quote_service = QuoteService()
