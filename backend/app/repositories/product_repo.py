from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from app.core.config import get_settings
from app.schemas.product import Category, Product


CATALOG_PATH = get_settings().data_dir / "catalog.json"
DEFAULT_UNIT = {"en": "pound", "vi": "pound"}


def load_catalog() -> dict[str, Any]:
    return json.loads(CATALOG_PATH.read_text(encoding="utf-8"))


CATALOG = load_catalog()
IMAGE_URLS: dict[str, str] = CATALOG["images"]
FEATURED_PRODUCT_IDS: tuple[str, ...] = tuple(CATALOG.get("featuredProductIds", ()))


def resolve_image(record: dict[str, Any], fallback_image_key: str) -> str:
    if image := record.get("image"):
        return image

    image_key = record.get("imageKey", fallback_image_key)
    try:
        return IMAGE_URLS[image_key]
    except KeyError as exc:
        raise ValueError(f"Missing catalog image for key: {image_key}") from exc


def category_from_record(record: dict[str, Any]) -> Category:
    return Category(
        id=record["id"],
        name=record["name"],
        image=resolve_image(record, record["id"]),
        brands=record.get("brands") or None,
    )


def product_from_record(record: dict[str, Any]) -> Product:
    category_id = record["categoryId"]

    return Product(
        id=record["id"],
        name=record["name"],
        categoryId=category_id,
        cutId=record.get("cutId"),
        image=resolve_image(record, category_id),
        unit=record.get("unit") or DEFAULT_UNIT,
        description=record["description"],
        specs=record.get("specs"),
    )


CATEGORIES: tuple[Category, ...] = tuple(
    category_from_record(record) for record in CATALOG["categories"]
)
PRODUCTS: tuple[Product, ...] = tuple(
    product_from_record(record) for record in CATALOG["products"]
)
PRODUCTS_BY_ID = {product.id: product for product in PRODUCTS}
CATEGORY_IDS = {category.id for category in CATEGORIES}


class ProductRepository:
    def list_categories(self) -> list[Category]:
        return list(CATEGORIES)

    def list_products(self) -> list[Product]:
        return list(PRODUCTS)

    def list_featured_product_ids(self) -> list[str]:
        return list(FEATURED_PRODUCT_IDS)

    def get_product(self, product_id: str) -> Product | None:
        return PRODUCTS_BY_ID.get(product_id)

    def category_exists(self, category_id: str) -> bool:
        return category_id in CATEGORY_IDS


product_repository = ProductRepository()
