from fastapi import APIRouter, HTTPException, Query

from app.schemas.product import Category, Product
from app.services.product_svc import product_service

router = APIRouter()


@router.get("", response_model=list[Product], response_model_by_alias=True)
def list_products(
    search: str | None = Query(default=None, min_length=1),
    category: str | None = Query(default=None, min_length=1),
    sort_by: str | None = Query(default=None, alias="sortBy"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=100, ge=1, le=100),
) -> list[Product]:
    return product_service.list_products(
        search=search,
        category=category,
        sort_by=sort_by,
        page=page,
        limit=limit,
    )


@router.get("/categories", response_model=list[Category])
def list_categories() -> list[Category]:
    return product_service.list_categories()


@router.get("/featured", response_model=list[Product], response_model_by_alias=True)
def featured_products(limit: int = Query(default=4, ge=1, le=12)) -> list[Product]:
    return product_service.get_featured_products(limit=limit)


@router.get("/search", response_model=list[Product], response_model_by_alias=True)
def search_products(
    q: str = Query(min_length=1),
    limit: int = Query(default=20, ge=1, le=100),
) -> list[Product]:
    return product_service.search_products(q, limit=limit)


@router.get("/category/{category_id}", response_model=list[Product], response_model_by_alias=True)
def products_by_category(category_id: str) -> list[Product]:
    if not product_service.category_exists(category_id):
        raise HTTPException(status_code=404, detail="Category not found")
    return product_service.get_products_by_category(category_id)


@router.get("/{product_id}", response_model=Product, response_model_by_alias=True)
def product_detail(product_id: str) -> Product:
    product = product_service.get_product(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
