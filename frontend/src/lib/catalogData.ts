import catalogData from "../data/catalog.json";
import type { Category, LocalizedText, Product, CategoryBrand, ProductSpecs } from "../types";

type CatalogProductRecord = {
  id: string;
  categoryId: string;
  cutId?: string;
  name: LocalizedText;
  description: LocalizedText;
  image?: string;
  imageKey?: string;
  unit?: LocalizedText;
  specs?: ProductSpecs;
};

type CatalogCategoryRecord = {
  id: string;
  name: LocalizedText;
  image?: string;
  imageKey?: string;
  brands?: CategoryBrand[];
};

export type HomeFocusSection = {
  title: LocalizedText;
  categoryIds: string[];
  featuredProductIds?: string[];
  maxItems?: number;
};

export type HomeFocusGroup = {
  type: "import" | "export";
  sections: HomeFocusSection[];
};

type CatalogData = {
  images: Record<string, string>;
  categories: CatalogCategoryRecord[];
  products: CatalogProductRecord[];
  featuredProductIds: string[];
  homeFocusGroups: HomeFocusGroup[];
};

const catalog = catalogData as CatalogData;
const defaultUnit: LocalizedText = { en: "pound", vi: "pound" };

const resolveImage = (
  record: { image?: string; imageKey?: string },
  fallbackImageKey: string,
): string => {
  if (record.image) return record.image;

  const imageKey = record.imageKey ?? fallbackImageKey;
  const image = catalog.images[imageKey];

  if (!image) {
    throw new Error(`Missing catalog image for key: ${imageKey}`);
  }

  return image;
};

export const categories: Category[] = catalog.categories.map((category) => ({
  id: category.id,
  name: category.name,
  image: resolveImage(category, category.id),
  brands: category.brands,
}));

export const products: Product[] = catalog.products.map((product) => ({
  id: product.id,
  name: product.name,
  categoryId: product.categoryId,
  cutId: product.cutId,
  image: resolveImage(product, product.categoryId),
  unit: product.unit ?? defaultUnit,
  description: product.description,
  specs: product.specs,
}));

export const featuredProductIds = catalog.featuredProductIds;
export const homeFocusGroups = catalog.homeFocusGroups;
