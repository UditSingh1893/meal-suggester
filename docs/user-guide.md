# User guide and demonstration

Follow [README setup](../README.md#windows-quick-start). Use a dedicated demo database to preserve existing data. This walkthrough assumes six seeded recipes and an initially empty demo pantry.

## Five-minute walkthrough

1. Open `http://localhost:3000/dashboard`. Explain the shared workspace and summary counts.
2. Open Pantry. Add rice, tomato, onion, oil one at a time. Quantity/unit are optional. Show Edit, Save, and Cancel controls without changing these ingredient identities.
3. Open Recipes. Search Tomato Rice and open its title. Show the five ingredients and cooking instructions. Return and clear search.
4. Open Recommendations. Find Tomato Rice: expect 80%, Almost Ready, garlic missing. Explain the formula and 70% cutoff.
5. Click Favorite on Tomato Rice. Open Favorites and verify it appears. Remove deletes the favorite, not the recipe.
6. Return to Recommendations and click Add missing on Tomato Rice. Open Shopping lists; verify garlic appears. Tick purchased, untick, or Remove as needed.
7. Add garlic to Pantry. Reopen/refresh Recommendations: Tomato Rice should now show 100%, Can Make Now.
8. Optionally create a separate custom recipe: title, category, comma-separated ingredients, instructions one per line. Save, search, open, edit, and delete it to show CRUD. Deletion asks for confirmation.

Use a dedicated database with the four listed ingredients to reproduce the 80% example. Update Pantry separately when ingredients are purchased.

## Controls

| Page | Actions |
| --- | --- |
| Pantry | Add; Edit then Save/Cancel; Delete |
| Recipes | Add; Search; open title; Edit; Delete |
| Recommendations | Inspect matches; Favorite; Add missing when applicable |
| Favorites | View saved recipes; Remove |
| Shopping lists | Check/uncheck purchased; Remove |
| Dashboard | Read summaries |

## Setup and usage tips

- Prepare recipes by starting MongoDB and seeding against the same URI as the backend.
- Connect the frontend to the API using the configured URL, available ports, and running MongoDB instance.
- Edit existing pantry rows when updating ingredients; aliases map equivalent names to one canonical ingredient.
- Review [the matching specification](matching.md) for ingredient normalization and presence-based coverage.
- Revisit or refresh summary pages after updating records.

Use [the screenshot gallery and checklist](screenshots/README.md) to present the demonstration. Recorded verification appears in [the test report](test-report.md).
