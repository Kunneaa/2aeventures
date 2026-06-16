from __future__ import annotations

from typing import Annotated, Literal, Optional

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
    notes: Optional[LongTextString] = None
    locale: Optional[Literal["vi", "en"]] = None


class QuoteResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    status: Literal["pending"]
    items: list[QuoteItemCreate]
    customer_info: Annotated[QuoteCustomerInfo, Field(alias="customerInfo")]
    notes: Optional[str] = None
    locale: Optional[Literal["vi", "en"]] = None
    created_at: Annotated[str, Field(alias="createdAt")]
