from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field

EmailString = Annotated[
    str,
    Field(min_length=3, max_length=254, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$"),
]
PhoneString = Annotated[str, Field(min_length=6, max_length=40)]
ShortString = Annotated[str, Field(min_length=1, max_length=160)]
MessageString = Annotated[str, Field(min_length=1, max_length=2000)]


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: ShortString
    email: EmailString
    phone: PhoneString
    message: MessageString
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
