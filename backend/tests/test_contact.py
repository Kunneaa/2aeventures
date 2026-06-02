def test_create_and_read_contact_message(client):
    payload = {
        "name": "Nguyen Van A",
        "email": "buyer@example.com",
        "phone": "0900000000",
        "message": "Can tu van san pham",
        "locale": "vi",
    }

    create_response = client.post("/api/v1/contact", json=payload)
    assert create_response.status_code == 201
    message = create_response.json()
    assert message["status"] == "received"
    assert message["email"] == payload["email"]
    assert "createdAt" in message

    unauthorized_response = client.get(f"/api/v1/contact/{message['id']}")
    assert unauthorized_response.status_code == 403

    detail_response = client.get(
        f"/api/v1/contact/{message['id']}",
        headers={"X-Admin-Token": "test-admin-token"},
    )
    assert detail_response.status_code == 200
    assert detail_response.json()["id"] == message["id"]
