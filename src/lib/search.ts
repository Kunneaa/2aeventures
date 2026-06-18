export const searchStopwords = new Set([
  'a',
  'an',
  'and',
  'bao',
  'can',
  'cần',
  'for',
  'gia',
  'giá',
  'i',
  'need',
  'quote',
  'quotation',
  'the',
  'toi',
  'tôi',
  'tu',
  'tư',
  'van',
  'vấn',
]);

export const normalizeSearchText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

export const tokenizeSearchQuery = (query: string): string[] =>
  normalizeSearchText(query)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !searchStopwords.has(token));

export const matchesSearchQuery = (searchableText: string, query: string): boolean => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const searchable = normalizeSearchText(searchableText);
  const tokens = tokenizeSearchQuery(query);

  return tokens.length > 0
    ? tokens.some((token) => searchable.includes(token))
    : searchable.includes(normalizedQuery);
};
