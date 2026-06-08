from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.common import EmailString, LongTextString, PhoneString, ShortString


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: ShortString
    email: EmailString
    phone: PhoneString
    message: LongTextString
    locale: Literal["vi", "en"] | None = None


class ContactResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    status: Literal["received"]
    name: str
    email: str
    phone: str
    message: str
    locale: Literal["vi", "en"] | None = None
    created_at: Annotated[str, Field(alias="createdAt")]
