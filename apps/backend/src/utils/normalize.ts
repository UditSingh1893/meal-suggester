const aliasMap: Record<string, string> = {
  tomatoes: 'tomato', onions: 'onion', potatoes: 'potato', chillies: 'chili', chilies: 'chili',
  capsicum: 'bell pepper', scallions: 'green onion', 'spring onion': 'green onion', garlics: 'garlic'
};
export function normalizeIngredientName(input: string) {
  const cleaned = input.trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  const singular = cleaned.endsWith('s') && !cleaned.endsWith('ss') ? cleaned.slice(0, -1) : cleaned;
  return aliasMap[cleaned] ?? aliasMap[singular] ?? singular;
}
