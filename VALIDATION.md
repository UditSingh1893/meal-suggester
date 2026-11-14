# Validation

## Recorded build validation

The earlier Windows validation used dependencies from the included lockfile and recorded:

- Backend and frontend TypeScript checks: passed.
- Backend ESLint: passed.
- Backend compilation: passed.
- Frontend production build: passed.
- Automated tests: 10 passed across 4 files.

## Verification on 14 November 2026

- Backend and frontend TypeScript checks: passed.
- Backend ESLint: passed.
- Backend automated suite: 10 passed across 4 files.
- Separate browser capture workflow: passed, producing seven application screenshots.
- Documentation links and code fences: passed.

Tests cover ingredient normalization, matching, duplicate handling, the 4/5 = 80% example, recommendation categories/ranking, pantry CRUD, recipe CRUD, favorites, missing-ingredient shopping generation, and marking items purchased.

Integration tests used temporary MongoDB 7.0.24 instances. The browser capture verified pantry entry, recipe detail, partial and complete matches, saving a favorite, and shopping-list generation.

See [the test report](docs/test-report.md) and [screenshot gallery](docs/screenshots/README.md) for detailed evidence.
