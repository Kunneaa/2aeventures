def test_chat_session_send_history_and_clear(client):
    session_response = client.post("/api/v1/chat/session", json={"createdAt": "2026-05-27T00:00:00Z"})
    assert session_response.status_code == 200
    session_id = session_response.json()["sessionId"]

    send_response = client.post(
        "/api/v1/chat/send",
        json={"message": "Tôi cần báo giá thịt bò", "sessionId": session_id, "language": "vi"},
    )
    assert send_response.status_code == 200
    bot_message = send_response.json()
    assert bot_message["sender"] == "bot"
    assert bot_message["message"]

    history_response = client.get(f"/api/v1/chat/history/{session_id}")
    assert history_response.status_code == 200
    assert len(history_response.json()) == 2

    clear_response = client.delete(f"/api/v1/chat/history/{session_id}")
    assert clear_response.status_code == 200
    assert clear_response.json() == {"cleared": True}
