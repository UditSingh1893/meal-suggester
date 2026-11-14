# Software Requirements Specification

Version 1.0 | Prepared 14 November 2026 | Describes the existing local application.

## Purpose and scope

PantryPilot helps students and home cooks identify recipes using their available ingredients. The student maintains and submits the application; the faculty evaluator reviews its behavior and project-management evidence.

The system includes a shared pantry, recipe catalog, matching engine, favorites, shopping lists, and dashboard. It requires a browser, Node.js, and MongoDB. Six sample recipes can be seeded. Internet access may be needed during installation; matching uses the local database.

The project focuses on local meal planning through an ingredient-based recommendation workflow in one shared workspace.

## Functional requirements

| ID | Requirement | Acceptance criteria |
| --- | --- | --- |
| FR-01 | Manage pantry | Add, list, edit, and delete ingredients; optional quantity/unit; duplicate normalized ingredient on creation returns 409. |
| FR-02 | Browse recipes | Seed six examples; list/search recipes; view ingredients and instructions. |
| FR-03 | Manage recipes | Create with title, at least one ingredient and instruction; edit and delete; deletion also removes recipe favorites. |
| FR-04 | Calculate ingredient coverage | Four available unique ingredients out of five yield 80%; duplicates do not inflate the denominator; expose available and missing names. |
| FR-05 | Categorize and rank | 100% is Can Make Now; 70% to below 100% is Almost Ready; below 70% is More Ingredients Needed; use documented ranking score. |
| FR-06 | Manage favorites | Save an existing recipe, list favorites, and remove one; repeated saves do not create duplicates. |
| FR-07 | Manage shopping items | Generate missing ingredients, skip existing outstanding entries for the same ingredient, mark purchased, and remove items. |
| FR-08 | Summarize workspace | Show pantry/favorite counts, recommendation category counts, shopping progress, and a sample of missing ingredients. |

## Nonfunctional requirements

| ID | Requirement | Acceptance method |
| --- | --- | --- |
| NFR-01 | Reproducible setup | Fresh clone, lockfile installation, seed, and start using README. |
| NFR-02 | Persistence | Saved data remains after restarting against the same MongoDB database. |
| NFR-03 | Input validation | Validated routes return structured 400 responses for invalid request bodies and accept nonnegative pantry quantities. |
| NFR-04 | Explainable output | Recommendations expose percentage, category, available ingredients, and missing ingredients. |
| NFR-05 | Maintainability | Separate workspaces, module-based API, and unit/integration/type/lint/build checks. |
| NFR-06 | Demonstration usability | Complete the browser walkthrough and record the demonstrated application states. |

## Design and acceptance

Ingredient identity uses name normalization and canonical IDs. Matching uses ingredient presence, with quantities and expiry retained as inventory metadata. The API supports optional recipe fields alongside the frontend workflow. See [matching rules](matching.md) and [API reference](api.md).

Acceptance follows the documented walkthrough and verification commands. See [traceability](test-report.md) for recorded results. This SRS describes the implemented application.
