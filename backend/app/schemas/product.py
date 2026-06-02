from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field


class LocalizedText(BaseModel):
    en: str
    vi: str


class Category(BaseModel):
    id: str
    name: LocalizedText
    image: str


class Product(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: LocalizedText
    category_id: Annotated[str, Field(alias="categoryId")]
    image: str
    unit: LocalizedText
    description: LocalizedText
