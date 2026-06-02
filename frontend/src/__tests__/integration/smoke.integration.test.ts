import { describe, expect, it } from "vitest";
import { categories, products } from "../../lib/mockData";

describe("catalog data", () => {
  it("has products only in known categories", () => {
    const categoryIds = new Set(categories.map((category) => category.id));

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => categoryIds.has(product.categoryId))).toBe(true);
  });

  it("has localized product content", () => {
    expect(
      products.every(
        (product) =>
          product.name.vi &&
          product.name.en &&
          product.description.vi &&
          product.description.en,
      ),
    ).toBe(true);
  });
});
