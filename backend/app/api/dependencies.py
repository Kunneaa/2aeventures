from hmac import compare_digest

from fastapi import Header, HTTPException, status

from app.core.config import get_settings


def require_admin_token(x_admin_token: str | None = Header(default=None, alias="X-Admin-Token")) -> None:
    expected_token = get_settings().admin_token
    if (
        not expected_token
        or not x_admin_token
        or not compare_digest(x_admin_token, expected_token)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin token required",
        )
