# API reference

Base: `http://localhost:4000/api/v1`. JSON API for one shared workspace with direct access. This reference describes the implemented route handlers.

## Conventions

Most responses use `{ "data": ... }`, optionally `meta`. Creates return 201; deletes return 204 without a body. Health responses use `status` directly.

```json
{"error":{"code":"VALIDATION_ERROR","message":"Validation details"}}
```

This illustrates the structured error response. AppError preserves the response status and code. Validation responses provide input details, while duplicate pantry creation returns 409/PANTRY_DUPLICATE. Server error responses use 500/INTERNAL_ERROR.

## Endpoints

All paths are relative to the base. IDs are MongoDB IDs unless stated otherwise.

| Method | Path | Input | Success |
| --- | --- | --- | --- |
| GET | `/health/live` | None | 200, status ok |
| GET | `/health/ready` | None | 200 ready, or 503 not_ready |
| GET | `/pantry` | Optional q substring on display name | 200, array with populated ingredient reference |
| POST | `/pantry` | Pantry body | 201, created item |
| GET | `/pantry/:id` | Item ID | 200, populated item |
| PATCH | `/pantry/:id` | Subset of pantry fields | 200, updated item |
| DELETE | `/pantry/:id` | Item ID | 204 |
| GET | `/recipes` | q, category, maxTime, page, limit | 200, array and pagination meta |
| GET | `/recipes/:id` | ID or slug | 200, recipe with populated ingredients |
| POST | `/recipes` | Recipe body | 201, created recipe |
| PATCH | `/recipes/:id` | ID; subset of recipe fields | 200, updated recipe |
| DELETE | `/recipes/:id` | ID | 204, also removes favorites |
| GET | `/matching/recommendations` | Optional category, maxTime | 200, ranked matches; meta.pantryIngredientCount |
| GET | `/favorites` | None | 200, favorites with populated recipeId |
| GET | `/favorites/:recipeId/status` | Recipe ID | 200, data.favorite boolean |
| POST | `/favorites/:recipeId` | Existing recipe ID; no body required | 201, favorite; repeated save reuses it |
| DELETE | `/favorites/:recipeId` | Recipe ID | 204, including absent favorite |
| GET | `/shopping-lists` | None | 200, list array |
| POST | `/shopping-lists` | Name and optional items | 201, new list |
| POST | `/shopping-lists/from-recipe/:recipeId` | Recipe ID; no body required | 201, default list; meta.added |
| PATCH | `/shopping-lists/:listId/items/:itemId` | completed, quantity, unit (optional) | 200, updated list |
| DELETE | `/shopping-lists/:listId/items/:itemId` | List and embedded item ID | 204 |

Recipe q uses MongoDB title/category text search; category is exact; maxTime is cooking minutes. Pagination defaults to page 1/limit 12, maximum limit 50; metadata includes page, limit, total, pages. Use positive numeric values for page, limit, and maxTime.

## Body examples

### Pantry

```json
{"name":"tomatoes","quantity":2,"unit":"pcs","expiryDate":"2026-11-20"}
```

Only name required on create: trimmed length 1–80. Quantity optional/nonnegative; unit optional/max 30 characters; expiryDate must parse as a date. PATCH accepts a subset. Renaming can change canonical ingredient ID. The UI exposes name, quantity, unit; expiry editing is API-only.

### Recipe

```json
{
  "title":"Simple Rice",
  "category":"Student meals",
  "cookingTimeMinutes":20,
  "ingredients":[{"name":"rice","quantity":1,"unit":"cup"}],
  "instructions":["Rinse rice.","Cook until tender."]
}
```

Title 2–150 characters; category optional/max 60; cookingTimeMinutes optional, positive integer/max 600. At least one ingredient and instruction required. Ingredient name 1–80, quantity optional/positive, unit optional/max 30. Optional imageUrl must be a URL. Title generates slug. PATCH replaces supplied arrays.

The UI accepts title, category, comma-separated ingredient names, and instructions one per line. Cooking time, imageUrl, ingredient quantities/units are currently API-only editing options.

### Shopping

```json
{"name":"Weekend groceries","items":[{"displayName":"garlic","quantity":1,"unit":"bulb"}]}
```

Custom list name length 1–100. Items optional; each displayName nonempty, quantity optional/positive, unit optional. Custom-list creation is API-only; UI generates the default list from recommendations.

Item PATCH example:

```json
{"completed":true}
```

PATCH also accepts positive quantity and unit up to 30 characters. Missing-ingredient generation skips existing outstanding ingredient IDs; meta.added reports the missing recipe entry count before deduplication.

## Recommendation example

Illustrative ID; each result also includes a recipe ingredient ID/display-name array omitted below for brevity.

```json
{
  "data":[{
    "id":"<recipe-object-id>",
    "title":"Tomato Rice",
    "category":"Indian",
    "cookingTimeMinutes":30,
    "matchPercentage":80,
    "availableIngredients":["rice","tomato","onion","oil"],
    "missingIngredients":["garlic"],
    "recommendationCategory":"Almost Ready",
    "score":76.5
  }],
  "meta":{"pantryIngredientCount":4}
}
```
