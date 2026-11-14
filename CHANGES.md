# Simplification notes

The supplied no-login project now runs with a frontend, backend and MongoDB only.

- Removed worker workspace, Redis cache and invalidation, BullMQ jobs, rate limiting, Prometheus metrics, Grafana, Nginx, production containers, CI workflow, and generated API documentation infrastructure.
- Kept pantry CRUD, recipe CRUD and seed dataset, set-based matching, recommendation categories, favorites and shopping lists.
- Added recipe creation/editing/deletion controls to the recipe page.
- Recipe deletion also removes its favorites. Existing shopping entries remain usable as a shopping record.
- Added a Windows-compatible combined development launcher and corrected the compiled backend start path.
- Included a dependency lockfile and local Windows setup instructions.

The fixed internal workspace identifier is retained for compatibility with the original database records. There are no accounts, roles, sessions, tokens, login, profile or settings pages.

## Scope mapping

| Original module | Location in the app |
| --- | --- |
| Pantry Management | Pantry |
| Recipe Management | Recipes: create, search, view, edit, delete |
| Matching Engine | Recommendations: percentage, available and missing ingredients |
| Favorites | Favorite action and Favorites page |
| Shopping List | Add missing action and Shopping page |

The six sample recipes are maintained by the seed command. MongoDB is the only external service; it can run directly on Windows or through the optional one-service Compose file.
