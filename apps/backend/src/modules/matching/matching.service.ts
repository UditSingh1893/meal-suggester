export type MatchRecipe = { id: string; title: string; category?: string; cookingTimeMinutes?: number; ingredients: Array<{ingredientId: string; displayName: string}> };
export type MatchResult = MatchRecipe & { matchPercentage: number; availableIngredients: string[]; missingIngredients: string[]; recommendationCategory: 'Can Make Now'|'Almost Ready'|'More Ingredients Needed'; score: number };

export function matchRecipe(pantryIngredientIds: Iterable<string>, recipe: MatchRecipe, almostReadyThreshold = 70): MatchResult {
  const pantry = new Set([...pantryIngredientIds].map(String));
  const unique = new Map(recipe.ingredients.map(i => [String(i.ingredientId), i]));
  if (unique.size === 0) return { ...recipe, matchPercentage: 0, availableIngredients: [], missingIngredients: [], recommendationCategory: 'More Ingredients Needed', score: 0 };
  const available: string[] = [], missing: string[] = [];
  for (const [id, ing] of unique) (pantry.has(id) ? available : missing).push(ing.displayName);
  const matchPercentage = Math.round((available.length / unique.size) * 1000) / 10;
  const recommendationCategory = matchPercentage === 100 ? 'Can Make Now' : matchPercentage >= almostReadyThreshold ? 'Almost Ready' : 'More Ingredients Needed';
  const missingPenalty = missing.length * 3;
  const timePenalty = Math.min(recipe.cookingTimeMinutes ?? 0, 180) / 60;
  const score = Math.round((matchPercentage - missingPenalty - timePenalty) * 10) / 10;
  return { ...recipe, matchPercentage, availableIngredients: available, missingIngredients: missing, recommendationCategory, score };
}

export function rankRecommendations(pantryIngredientIds: Iterable<string>, recipes: MatchRecipe[], threshold = 70) {
  return recipes.map(r => matchRecipe(pantryIngredientIds, r, threshold)).sort((a,b) => b.score - a.score || a.title.localeCompare(b.title));
}
