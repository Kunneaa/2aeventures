import type { Category, Product } from '../types';

export const countProductsByCategory = (
  categories: Category[],
  products: Product[],
): Record<string, number> =>
  categories.reduce<Record<string, number>>((counts, category) => {
    counts[category.id] = products.reduce(
      (total, product) => total + (product.categoryId === category.id ? 1 : 0),
      0,
    );
    return counts;
  }, {});

export const getProductSearchableText = (product: Product): string =>
  [
    product.id,
    product.categoryId,
    product.name.en,
    product.name.vi,
    product.description.en,
    product.description.vi,
  ].join(' ');
