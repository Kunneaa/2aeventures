from __future__ import annotations

from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, Field


class LocalizedText(BaseModel):
    en: str
    vi: str


class CategoryBrand(BaseModel):
    id: str
    name: str
    logo_url: Annotated[str, Field(alias="logoUrl")]

class Category(BaseModel):
    id: str
    name: LocalizedText
    image: str
    brands: Optional[list[CategoryBrand]] = None

class ProductSpecs(BaseModel):
    packing: str
    brand: str

class Product(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: LocalizedText
    category_id: Annotated[str, Field(alias="categoryId")]
    cut_id: Annotated[Optional[str], Field(alias="cutId")] = None
    image: str
    unit: Optional[LocalizedText] = None
    description: LocalizedText
    specs: Optional[ProductSpecs] = None
