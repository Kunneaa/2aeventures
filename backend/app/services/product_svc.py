from unicodedata import combining, normalize

from app.repositories.product_repo import product_repository
from app.schemas.product import Category, Product


SEARCH_STOPWORDS = {
    "a",
    "an",
    "and",
    "bao",
    "can",
    "cần",
    "for",
    "gia",
    "giá",
    "i",
    "need",
    "quote",
    "quotation",
    "the",
    "toi",
    "tôi",
    "tu",
    "tư",
    "van",
    "vấn",
}


class ProductService:
    def list_categories(self) -> list[Category]:
        return product_repository.list_categories()

    def list_products(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        sort_by: str | None = None,
        page: int = 1,
        limit: int = 100,
    ) -> list[Product]:
        products = product_repository.list_products()

        if category:
            products = [item for item in products if item.category_id == category]

        if search:
            query = self._normalize(search)
            if not query:
                return []
            products = [item for item in products if self._matches_product(item, query)]

        if sort_by == "name":
            products = sorted(products, key=lambda item: item.name.en.casefold())

        start = max(page - 1, 0) * limit
        end = start + limit
        return products[start:end]

    def get_product(self, product_id: str) -> Product | None:
        return product_repository.get_product(product_id)

    def get_products_by_category(self, category_id: str) -> list[Product]:
        return self.list_products(category=category_id)

    def get_featured_products(self, limit: int = 4) -> list[Product]:
        return self.list_products(limit=limit)

    def search_products(self, query: str, limit: int = 20) -> list[Product]:
        return self.list_products(search=query, limit=limit)

    def category_exists(self, category_id: str) -> bool:
        return product_repository.category_exists(category_id)

    def _matches_product(self, product: Product, query: str) -> bool:
        searchable = self._normalize(
            " ".join(
                [
                    product.id,
                    product.category_id,
                    product.name.en,
                    product.name.vi,
                    product.description.en,
                    product.description.vi,
                ]
            )
        )
        tokens = [
            token
            for token in query.split()
            if len(token) > 1 and token not in SEARCH_STOPWORDS
        ]
        if not tokens:
            return query in searchable
        return any(token in searchable for token in tokens)

    def _normalize(self, value: str) -> str:
        without_accents = "".join(
            char
            for char in normalize("NFD", value.replace("đ", "d").replace("Đ", "D"))
            if not combining(char)
        )
        return without_accents.casefold().strip()


product_service = ProductService()
