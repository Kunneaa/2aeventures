from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.common import EmailString, LongTextString, PhoneString, ShortString


class QuoteCustomerInfo(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: ShortString
    email: EmailString
    company: ShortString
    phone: PhoneString


class QuoteItemCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, str_strip_whitespace=True)

    product_id: Annotated[str, Field(alias="productId", min_length=1, max_length=120)]


class QuoteCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True, str_strip_whitespace=True)

    items: list[QuoteItemCreate] = Field(min_length=1)
    customer_info: Annotated[QuoteCustomerInfo, Field(alias="customerInfo")]
    notes: LongTextString | None = None
    locale: Literal["vi", "en"] | None = None


class QuoteResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    status: Literal["pending"]
    items: list[QuoteItemCreate]
    customer_info: Annotated[QuoteCustomerInfo, Field(alias="customerInfo")]
    notes: str | None = None
    locale: Literal["vi", "en"] | None = None
    created_at: Annotated[str, Field(alias="createdAt")]
