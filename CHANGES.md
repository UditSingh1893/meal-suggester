# Project development notes

PantryPilot runs with a Next.js frontend, Express backend, and MongoDB database in one shared local workspace.

## Implemented features

- Pantry CRUD and canonical ingredient normalization.
- Recipe CRUD, search, detail views, and six seeded examples.
- Set-based ingredient matching, recommendation categories, and ranking.
- Favorite recipes and shopping lists generated from missing ingredients.
- Recipe creation, editing, and deletion controls in the frontend.
- Recipe deletion with favorite cleanup and retained shopping records.
- Windows-compatible combined development launcher.
- Dependency lockfile, sample configuration, and local setup instructions.
- Coursework documentation, diagrams, and seven application screenshots.

## Scope mapping

| Module | Location in the app |
| --- | --- |
| Pantry Management | Pantry |
| Recipe Management | Recipes: create, search, view, edit, delete |
| Matching Engine | Recommendations: percentage, available and missing ingredients |
| Favorites | Favorite action and Favorites page |
| Shopping List | Add missing action and Shopping page |

The fixed internal workspace identifier provides continuity with existing database records. MongoDB can run directly on Windows or through the included Compose service. The seed command maintains the six sample recipes.
