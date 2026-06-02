def test_list_products_uses_frontend_contract(client):
    response = client.get("/api/v1/products")

    assert response.status_code == 200
    products = response.json()
    assert products
    assert set(products[0]) == {"id", "name", "categoryId", "image", "unit", "description"}


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
