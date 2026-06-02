def test_create_and_read_quote(client):
    payload = {
        "items": [{"productId": "p-beef-1"}],
        "customerInfo": {
            "name": "Nguyen Van A",
            "email": "buyer@example.com",
            "company": "Example Co",
            "phone": "0900000000",
        },
        "notes": "Can bao gia som",
        "locale": "vi",
    }

    create_response = client.post("/api/v1/quotes", json=payload)
    assert create_response.status_code == 201
    quote = create_response.json()
    assert quote["status"] == "pending"
    assert quote["items"][0]["productId"] == "p-beef-1"
    assert "quantity" not in quote["items"][0]
    assert quote["customerInfo"]["email"] == "buyer@example.com"

    unauthorized_response = client.get(f"/api/v1/quotes/{quote['id']}")
    assert unauthorized_response.status_code == 403

    detail_response = client.get(
        f"/api/v1/quotes/{quote['id']}",
        headers={"X-Admin-Token": "test-admin-token"},
    )
    assert detail_response.status_code == 200
    assert detail_response.json()["id"] == quote["id"]
