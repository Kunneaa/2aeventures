from __future__ import annotations

from typing import Annotated, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.common import EmailString, LongTextString, PhoneString, ShortString


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: ShortString
    email: EmailString
    phone: PhoneString
    message: LongTextString
    locale: Optional[Literal["vi", "en"]] = None


class ContactResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    status: Literal["received"]
    name: str
    email: str
    phone: str
    message: str
    locale: Optional[Literal["vi", "en"]] = None
    created_at: Annotated[str, Field(alias="createdAt")]
