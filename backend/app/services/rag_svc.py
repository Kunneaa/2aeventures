from app.schemas.product import Product
from app.services.product_svc import product_service


class CatalogRetrievalService:
    def find_catalog_matches(self, message: str, limit: int = 3) -> list[Product]:
        return product_service.search_products(message, limit=limit)


catalog_retrieval_service = CatalogRetrievalService()
