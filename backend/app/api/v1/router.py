from fastapi import APIRouter

from app.api.v1 import chat, contact, products, quotes

api_router = APIRouter()
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(quotes.router, prefix="/quotes", tags=["quotes"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
