# Matching specification

Sources: backend `utils/normalize.ts`, `modules/matching/matching.service.ts`, and shopping routes.

## Ingredient identity

Names are trimmed, lowercased, and have underscores/hyphens and repeated whitespace normalized. Fixed aliases cover tomatoes → tomato, potatoes → potato, capsicum → bell pepper, and spring onion/scallions → green onion, among others. A simple trailing `s` rule handles other plurals except names ending in `ss`.

Canonical ingredients share a unique normalized name and MongoDB ID; matching compares those IDs. Normalization uses the fixed alias mapping in code. The Ingredient schema also includes an aliases array.

## Coverage and classification

Let P be pantry ingredient IDs and R the unique required ingredient IDs.

```text
available = R ∩ P
missing = R − P
percentage = round((|available| / |R|) × 1000) / 10
```

Coverage is rounded to one decimal place. Empty R returns 0%, empty available/missing arrays, More Ingredients Needed, and score 0. API recipe creation normally prevents an empty ingredient list.

| Rounded percentage | Category |
| --- | --- |
| 100 | Can Make Now |
| At least 70 and below 100 | Almost Ready |
| Below 70 | More Ingredients Needed |

Classification uses the rounded percentage. The 70% default is a project design choice.

## Ranking

```text
missingPenalty = unique missing ingredient count × 3
timePenalty = min(cookingTimeMinutes or 0, 180) / 60
score = round((percentage − missingPenalty − timePenalty) × 10) / 10
```

Sort descending by score, then alphabetically by title for ties. The score is a ranking value. An unspecified cooking time contributes zero time adjustment; the time adjustment is capped at three points.

Example: Tomato Rice needs rice, tomato, onion, oil, garlic. Having the first four gives 80%, garlic missing, Almost Ready. At 30 minutes the score is `80 − 3 − 0.5 = 76.5`. Adding garlic gives 100% and Can Make Now.

## Shopping and inventory behavior

Add missing creates or reuses My Shopping List. It skips an existing outstanding entry with the same ingredient ID. A completed ingredient can be added again. Each outstanding ingredient remains a distinct entry. `meta.added` reports the missing recipe entry count before deduplication.

Matching uses pantry membership, with amounts, units, and expiry maintained as inventory metadata. Every saved pantry ingredient counts as present. Recipe deletion includes favorite cleanup and preserves shopping records. Recommendations use current database reads.
