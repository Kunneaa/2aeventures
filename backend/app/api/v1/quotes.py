from fastapi import APIRouter, Depends, HTTPException

from app.api.dependencies import require_admin_token
from app.schemas.quote import QuoteCreate, QuoteResponse
from app.services.quote_svc import quote_service

router = APIRouter()


@router.post("", response_model=QuoteResponse, response_model_by_alias=True, status_code=201)
def create_quote(payload: QuoteCreate) -> QuoteResponse:
    return quote_service.create_quote(payload)


@router.get("", response_model=list[QuoteResponse], response_model_by_alias=True)
def list_quotes(_: None = Depends(require_admin_token)) -> list[QuoteResponse]:
    return quote_service.list_quotes()


@router.get("/{quote_id}", response_model=QuoteResponse, response_model_by_alias=True)
def quote_detail(
    quote_id: str,
    _: None = Depends(require_admin_token),
) -> QuoteResponse:
    quote = quote_service.get_quote(quote_id)
    if quote is None:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote
