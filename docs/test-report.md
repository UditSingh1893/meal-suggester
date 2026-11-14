# Test report and traceability

Prepared 14 November 2026. This report records completed checks and their supporting evidence.

## Recorded build validation

[VALIDATION.md](../VALIDATION.md) records the earlier Windows build validation: backend compilation and frontend production build passed, along with TypeScript, lint, and the backend test suite.

## Verification on 14 November 2026

Environment: Windows, Node.js 20.17.0, npm 11.7.0, MongoDB 7.0.24. Application base commit: `e8be002`.

| Check | Result |
| --- | --- |
| Lockfile installation with optional MongoDB postinstall download disabled | Passed: 429 packages installed |
| `npm run typecheck` | Passed for backend and frontend |
| `npm run lint` | Passed for backend |
| `npm run test:unit -w apps/backend` | Passed: 5 tests across 2 files |
| `npm test` with temporary MongoDB | Passed: 10 tests across 4 files |
| Separate browser capture workflow | Passed: 7 application screenshots and selected workflow assertions |
| Local Markdown links and balanced code fences | Passed |
| `git diff --check` | Passed |

Integration tests used temporary databases and a MongoDB 7.0.24 executable selected through MONGOMS_SYSTEM_BINARY. The server executable's size and ZIP CRC were verified. The browser capture used installed Chromium revision 1248 with a separate automated workflow. See [the screenshot gallery](screenshots/README.md) for captured states and environment details.

## Automated test coverage

Paths are relative to `apps/backend/tests`.

| Requirement | Recorded coverage | Evidence |
| --- | --- | --- |
| FR-01 Pantry | Direct access, create, update, delete | integration/api.test.ts |
| FR-02 Recipe browsing | Retrieve a created recipe | integration/recipe-crud.test.ts |
| FR-03 Recipe CRUD | Create, update, delete, confirm deletion | integration/recipe-crud.test.ts |
| FR-04 Ingredient coverage | 4/5 = 80%, complete match, duplicate handling | unit/matching.test.ts and API integration |
| FR-05 Category/ranking | Complete/partial categories and stronger-match ranking | unit/matching.test.ts |
| FR-06 Favorites | Save and list favorites | integration/api.test.ts |
| FR-07 Shopping | Generate missing ingredients and mark purchased | integration/api.test.ts |
| Ingredient identity | Name normalization examples | unit/normalize.test.ts |
| NFR-04 Explainability | Available/missing ingredient and percentage assertions | Matching unit/API tests |
| NFR-05 Maintainability | Type checking, lint, unit and integration checks | Workspace commands |

## Verified browser states

| Case | Workflow | Verified result | Screenshot |
| --- | --- | --- | --- |
| B-01 | Add rice, tomato, onion, oil through Pantry | Four saved ingredient rows | 02 |
| B-02 | Open seeded Tomato Rice details | Ingredients and instructions visible | 03 |
| B-03 | Open Recommendations with four ingredients | Tomato Rice 80%, Almost Ready, garlic missing | 04 |
| B-04 | Save Tomato Rice as favorite | Favorite displayed | 05 |
| B-05 | Add missing ingredients | Garlic displayed in shopping list | 06 |
| B-06 | Add garlic and revisit Recommendations | Tomato Rice 100%, Can Make Now | 07 |

The dashboard state was also captured as screenshot 01. These records describe the checks performed during the separate browser capture workflow.

## Reproduction

Run `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` as appropriate. Use the README's recommended Node version for the locked tooling.

For the repository's Playwright suite, start MongoDB and the apps, seed dedicated demo data, install Playwright Chromium, and run `npm run test:e2e -w apps/frontend`.

Use a dedicated TEST_MONGODB_URI: integration tests clear collections. Use a separate demo database for browser workflows that create pantry, favorite, and shopping records.

Record each run's date, commit, environment versions, command, exit code, and output. Link browser evidence to the corresponding screenshots.
