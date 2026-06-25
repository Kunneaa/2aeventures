import type { Category, Product } from '../types';


export const getProductSearchableText = (product: Product): string =>
  [
    product.id,
    product.categoryId,
    product.name.en,
    product.name.vi,
    product.description.en,
    product.description.vi,
  ].join(' ');
