# PantryPilot — SPM local project

Single-user meal suggester: Next.js frontend, Express backend, MongoDB database.

## Windows quick start

Prerequisites: Node.js 20 or newer, npm, and MongoDB Community Server running locally. Docker is optional.

Open PowerShell in this folder:

~~~powershell
npm install
npm run seed
npm run dev
~~~

Open http://localhost:3000. The API runs at http://localhost:4000/api/v1.
No account, environment-file copy, Redis, worker, or other service is required.
Press Ctrl+C to stop the frontend and backend.

If using Docker for MongoDB instead of a local installation, start Docker Desktop, then run:

~~~powershell
docker compose up -d mongo
~~~

Alternatively start the apps in two terminals with npm run dev -w apps/backend and npm run dev -w apps/frontend.

## Required functionality

- Pantry: add, view, edit, delete ingredients.
- Recipes: six included recipes; add, edit, delete, search and view ingredients/instructions.
- Matching: unique ingredient sets; percentage = available required ingredients / all required ingredients × 100. Missing = recipe ingredients minus pantry.
- Recommendations: Can Make Now at 100%, Almost Ready at 70% or higher, More Ingredients Needed below 70%. Categories and cooking time are optional recipe metadata.
- Favorites: save, list, remove.
- Shopping: add missing ingredients, view items, mark purchased, remove items.

Ingredient matching uses normalized names; quantities do not affect set membership. The 70% cutoff is a local implementation choice because the brief says high partial match without specifying a number.

MongoDB persists data. Seeding is repeatable and updates the six sample recipes by slug; it does not clear pantry, favorites or shopping lists. Run it once for the demo, since rerunning replaces edits to those sample recipes.

## Checks

~~~powershell
npm test
npm run typecheck
npm run build
~~~

Integration tests use a temporary MongoDB process and may download its binary on first run. To use a dedicated existing test database instead:

~~~powershell
$env:TEST_MONGODB_URI='mongodb://127.0.0.1:27017/meal_suggester_test'
npm test
~~~

Tests clear that test database's collections. Never point TEST_MONGODB_URI at your demo database.

## Configuration and troubleshooting

Defaults work without any .env file. To override the database, set $env:MONGODB_URI='mongodb://127.0.0.1:27017/meal_suggester' before seed/start. BACKEND_PORT and FRONTEND_ORIGIN can also be set in PowerShell. If changing the backend port, set NEXT_PUBLIC_API_BASE_URL in apps/frontend/.env.local to the matching URL including /api/v1.

If the API cannot start, check MongoDB is running on port 27017. If a port is in use, stop the previous app instance. This app is intended for a local college demonstration; it has one shared workspace and no accounts.

Production infrastructure removed: Redis caching, BullMQ worker, rate limiting, metrics/monitoring, reverse proxy, production containers and CI workflow. Settings/profile/auth pages are absent. Recipe data is read directly on every request so pantry and recipe changes immediately affect recommendations.
