from __future__ import annotations

import json
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT_DIR / "data" / "catalog.json"
FRONTEND_PUBLIC_DIR = ROOT_DIR / "frontend" / "public"
TARGET_PATHS = (
    ROOT_DIR / "backend" / "app" / "data" / "catalog.json",
    ROOT_DIR / "frontend" / "src" / "data" / "catalog.json",
)


def _is_localized_text(value: Any) -> bool:
    return (
        isinstance(value, dict)
        and isinstance(value.get("en"), str)
        and bool(value["en"].strip())
        and isinstance(value.get("vi"), str)
        and bool(value["vi"].strip())
    )


def _collect_duplicate_ids(records: list[dict[str, Any]]) -> list[str]:
    seen: set[str] = set()
    duplicates: set[str] = set()

    for record in records:
        record_id = record.get("id")
        if not isinstance(record_id, str):
            continue
        if record_id in seen:
            duplicates.add(record_id)
        seen.add(record_id)

    return sorted(duplicates)


def _asset_exists(image_path: str) -> bool:
    if not image_path.startswith("/images/"):
        return False

    return (FRONTEND_PUBLIC_DIR / image_path.removeprefix("/")).is_file()


def validate_catalog(catalog: dict[str, Any]) -> None:
    errors: list[str] = []

    images = catalog.get("images")
    categories = catalog.get("categories")
    products = catalog.get("products")
    featured_product_ids = catalog.get("featuredProductIds", [])
    home_focus_groups = catalog.get("homeFocusGroups", [])

    if not isinstance(images, dict):
        errors.append("images must be an object")
        images = {}
    if not isinstance(categories, list):
        errors.append("categories must be an array")
        categories = []
    if not isinstance(products, list):
        errors.append("products must be an array")
        products = []
    if not isinstance(featured_product_ids, list):
        errors.append("featuredProductIds must be an array")
        featured_product_ids = []
    if not isinstance(home_focus_groups, list):
        errors.append("homeFocusGroups must be an array")
        home_focus_groups = []

    category_duplicates = _collect_duplicate_ids(categories)
    product_duplicates = _collect_duplicate_ids(products)
    if category_duplicates:
        errors.append(f"duplicate category ids: {', '.join(category_duplicates)}")
    if product_duplicates:
        errors.append(f"duplicate product ids: {', '.join(product_duplicates)}")

    category_ids = {
        category["id"]
        for category in categories
        if isinstance(category, dict) and isinstance(category.get("id"), str)
    }
    product_ids = {
        product["id"]
        for product in products
        if isinstance(product, dict) and isinstance(product.get("id"), str)
    }

    for image_key, image_path in images.items():
        if not isinstance(image_key, str) or not isinstance(image_path, str):
            errors.append(f"invalid image entry: {image_key!r}")
            continue
        if not _asset_exists(image_path):
            errors.append(f"image asset not found for key {image_key}: {image_path}")

    for category in categories:
        if not isinstance(category, dict):
            errors.append("category entries must be objects")
            continue

        category_id = category.get("id")
        if not isinstance(category_id, str) or not category_id.strip():
            errors.append(f"category has invalid id: {category!r}")
            continue
        if not _is_localized_text(category.get("name")):
            errors.append(f"category {category_id} is missing localized name")

        image_key = category.get("imageKey", category_id)
        if category.get("image") is None and image_key not in images:
            errors.append(f"category {category_id} references missing image key: {image_key}")

    for product in products:
        if not isinstance(product, dict):
            errors.append("product entries must be objects")
            continue

        product_id = product.get("id")
        category_id = product.get("categoryId")
        if not isinstance(product_id, str) or not product_id.strip():
            errors.append(f"product has invalid id: {product!r}")
            continue
        if category_id not in category_ids:
            errors.append(f"product {product_id} references missing category: {category_id}")
        if not _is_localized_text(product.get("name")):
            errors.append(f"product {product_id} is missing localized name")
        if not _is_localized_text(product.get("description")):
            errors.append(f"product {product_id} is missing localized description")

        image_key = product.get("imageKey", category_id)
        if product.get("image") is None and image_key not in images:
            errors.append(f"product {product_id} references missing image key: {image_key}")

    for product_id in featured_product_ids:
        if product_id not in product_ids:
            errors.append(f"featuredProductIds references missing product: {product_id}")

    for group_index, group in enumerate(home_focus_groups, start=1):
        if not isinstance(group, dict):
            errors.append(f"homeFocusGroups[{group_index}] must be an object")
            continue

        if group.get("type") not in {"import", "export"}:
            errors.append(f"homeFocusGroups[{group_index}] has invalid type")

        sections = group.get("sections", [])
        if not isinstance(sections, list):
            errors.append(f"homeFocusGroups[{group_index}].sections must be an array")
            continue

        for section_index, section in enumerate(sections, start=1):
            if not isinstance(section, dict):
                errors.append(
                    f"homeFocusGroups[{group_index}].sections[{section_index}] must be an object"
                )
                continue

            label = f"homeFocusGroups[{group_index}].sections[{section_index}]"
            if not _is_localized_text(section.get("title")):
                errors.append(f"{label} is missing localized title")

            section_category_ids = section.get("categoryIds", [])
            if not isinstance(section_category_ids, list):
                errors.append(f"{label}.categoryIds must be an array")
                section_category_ids = []

            section_product_ids = section.get("featuredProductIds", [])
            if not isinstance(section_product_ids, list):
                errors.append(f"{label}.featuredProductIds must be an array")
                section_product_ids = []

            for category_id in section_category_ids:
                if category_id not in category_ids:
                    errors.append(f"{label} references missing category: {category_id}")

            for product_id in section_product_ids:
                if product_id not in product_ids:
                    errors.append(f"{label} references missing product: {product_id}")

    if errors:
        details = "\n".join(f"- {error}" for error in errors)
        raise SystemExit(f"Catalog validation failed:\n{details}")


def main() -> None:
    catalog = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    validate_catalog(catalog)

    content = json.dumps(catalog, ensure_ascii=False, indent=2) + "\n"

    SOURCE_PATH.write_text(content, encoding="utf-8")
    for target_path in TARGET_PATHS:
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(content, encoding="utf-8")

    print(
        "Catalog synced: "
        f"{len(catalog['categories'])} categories, "
        f"{len(catalog['products'])} products, "
        f"{len(TARGET_PATHS)} targets"
    )


if __name__ == "__main__":
    main()
