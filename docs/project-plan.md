# Project plan and work breakdown

Prepared 14 November 2026 for Software Project Management coursework.

## Planning basis

This retrospective work breakdown documents the implemented application and proposes a submission-preparation schedule. Effort values are illustrative planning estimates.

## Work breakdown structure

| WBS | Work package | Estimated effort | Depends on | Evidence/status |
| --- | --- | --- | --- | --- |
| 1 | Problem, scope, requirements | 3–5 h | None | SRS reconstructed from source |
| 2 | Architecture and database design | 4–6 h | 1 | Existing models; diagrams added |
| 3 | Backend CRUD and validation | 10–14 h | 2 | Existing routes |
| 4 | Normalization and matching | 4–6 h | 3 | Existing service/unit tests |
| 5 | Frontend and API integration | 10–14 h | 3, 4 | Existing Next.js pages |
| 6 | Favorites and shopping workflow | 4–6 h | 3, 5 | Existing routes/pages |
| 7 | Unit, integration, browser verification | 5–8 h | 4, 5, 6 | Backend suite passed; seven application screenshots captured |
| 8 | Documents and screenshots | 5–8 h | 1–7 | Documentation added; see screenshot gallery |
| 9 | Repository review and release preparation | 1–2 h | 7, 8 | Repository hygiene verified; README includes submission details |

Total illustrative planning estimate: **46–69 person-hours**.

## Proposed submission schedule

Relative days can be aligned with the actual deadline.

| Milestone | Proposed window | Exit criterion |
| --- | --- | --- |
| M1: Documentation review | Day 1 | Confirm SRS, diagrams, and matching rules against app |
| M2: Verification | Day 2 | Execute checks and walkthrough; record results |
| M3: Evidence and attribution | Day 3 | Capture screenshots; add actual student/team details and sources |
| M4: Submission | Day 4 | Verify fresh clone, review final report, tag submission release |

## Responsibilities and progress

The project team comprises Dhruv Sharma, Saumya Joshi, Kavya Sanghvi, and Udit Singh, under the guidance of Dr. Karan Verma. The work breakdown covers requirements, design, implementation, verification, documentation, and submission preparation. Presentation speaking assignments are separate from development responsibilities.

| Measure | Planned outcome | Actual evidence |
| --- | --- | --- |
| Functional scope | Pantry, recipes, matching, favorites, shopping | Implemented in source; selected workflows captured in browser |
| Backend verification | Tests, types, lint, build | Recorded results in [the test report](test-report.md) |
| Browser verification | Happy-path test and manual walkthrough | Seven screenshots and selected browser assertions recorded |
| Submission artifacts | Requirements, plan, risks, diagrams, guide, screenshots | Documents added; capture status in gallery |

## Change management

Track project work using GitHub Issues with an owner, priority, acceptance criteria, and milestone. Suggested board columns: To do, In progress, Review, Done. Record real progress and scope changes with their effort/schedule impact. Git history records implementation and documentation changes.

Use GitHub Issues, a project board, and a final release tag to organize the submission and identify its evaluated version.
