import { describe, expect, it } from "vitest";
import { categories, homeFocusGroups, products } from "../../lib/catalogData";

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

  it("keeps product IDs unique", () => {
    const productIds = products.map((product) => product.id);

    expect(new Set(productIds).size).toBe(productIds.length);
  });

  it("includes the detailed beef cut catalog", () => {
    const beefProductIds = new Set(
      products
        .filter((product) => product.categoryId === "beef")
        .map((product) => product.id),
    );

    expect(beefProductIds.size).toBeGreaterThanOrEqual(24);
    expect(beefProductIds).toContain("p-beef-chuck-7-bone-pot-roast");
    expect(beefProductIds).toContain("p-beef-tenderloin");
    expect(beefProductIds).toContain("p-beef-eye-of-round");
  });

  it("includes the detailed chicken part catalog", () => {
    const chickenProductIds = new Set(
      products
        .filter((product) => product.categoryId === "chicken")
        .map((product) => product.id),
    );

    expect(chickenProductIds.size).toBeGreaterThanOrEqual(16);
    expect(chickenProductIds).toContain("p-chicken-whole");
    expect(chickenProductIds).toContain("p-chicken-wingette");
    expect(chickenProductIds).toContain("p-chicken-gizzard");
  });

  it("keeps home focus catalog references valid", () => {
    const categoryIds = new Set(categories.map((category) => category.id));
    const productIds = new Set(products.map((product) => product.id));

    for (const group of homeFocusGroups) {
      for (const section of group.sections) {
        expect(section.categoryIds.every((categoryId) => categoryIds.has(categoryId))).toBe(true);
        expect(
          (section.featuredProductIds ?? []).every((productId) => productIds.has(productId)),
        ).toBe(true);
      }
    }
  });
});
