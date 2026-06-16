import json
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]


def test_list_products_uses_frontend_contract(client):
    response = client.get("/api/v1/products")

    assert response.status_code == 200
    products = response.json()
    assert products
    assert set(products[0]) >= {"id", "name", "categoryId", "image", "description"}


def test_product_detail_and_search(client):
    detail = client.get("/api/v1/products/p-beef-1")
    search = client.get("/api/v1/products/search", params={"q": "beef"})
    no_accent_search = client.get("/api/v1/products/search", params={"q": "thit bo"})

    assert detail.status_code == 200
    assert detail.json()["id"] == "p-beef-1"
    assert search.status_code == 200
    assert any(product["id"] == "p-beef-1" for product in search.json())
    assert no_accent_search.status_code == 200
    assert any(product["id"] == "p-beef-1" for product in no_accent_search.json())


def test_featured_products_use_catalog_order(client):
    response = client.get("/api/v1/products/featured", params={"limit": 4})

    assert response.status_code == 200
    assert [product["id"] for product in response.json()] == [
        "p-chicken-1",
        "p-beef-1",
        "p-seafood-1",
        "p-agriculture-1",
    ]


def test_beef_category_contains_detailed_cut_catalog(client):
    response = client.get("/api/v1/products/category/beef")
    search = client.get("/api/v1/products/search", params={"q": "than noi"})

    assert response.status_code == 200
    products = response.json()
    product_ids = {product["id"] for product in products}
    assert len(products) >= 24
    assert {
        "p-beef-chuck-7-bone-pot-roast",
        "p-beef-tenderloin",
        "p-beef-eye-of-round",
    }.issubset(product_ids)
    assert search.status_code == 200
    assert any(product["id"] == "p-beef-tenderloin" for product in search.json())


def test_chicken_category_contains_detailed_part_catalog(client):
    response = client.get("/api/v1/products/category/chicken")
    search = client.get("/api/v1/products/search", params={"q": "canh giua"})

    assert response.status_code == 200
    products = response.json()
    product_ids = {product["id"] for product in products}
    assert len(products) >= 16
    assert {
        "p-chicken-whole",
        "p-chicken-wingette",
        "p-chicken-gizzard",
    }.issubset(product_ids)
    assert search.status_code == 200
    assert any(product["id"] == "p-chicken-wingette" for product in search.json())
