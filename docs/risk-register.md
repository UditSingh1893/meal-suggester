# Risk register and management measures

Reviewed 14 November 2026. The register organizes preventive measures for project delivery and evaluation. Likelihood and impact are planning ratings. The submitting student coordinates these activities, with named owners assignable for team submissions.

| ID | Planning area | Likelihood | Impact | Management measure |
| --- | --- | --- | --- | --- |
| R-01 | Database readiness | Medium | High | Verify MongoDB readiness before evaluation; use documented local or Docker setup. |
| R-02 | Ingredient consistency | Medium | Medium | Use canonical IDs, normalized names, aliases, and regression examples. |
| R-03 | Demonstration coverage | Medium | Medium | Demonstrate six seeded recipes and a custom recipe workflow. |
| R-04 | Test environment preparation | Medium | Medium | Prepare temporary MongoDB or a dedicated test database before testing. |
| R-05 | Sample data maintenance | Medium | Medium | Seed before editing examples and preserve custom content in a dedicated demo database. |
| R-06 | Test data isolation | Low | High | Use a distinct TEST_MONGODB_URI for integration tests that clear collections. |
| R-07 | Evaluation access | Low for local demo | High | Run the shared workspace locally for coursework evaluation. |
| R-08 | Submission scheduling | Medium | High | Allocate time for documentation, screenshots, review, and final preparation. |
| R-09 | Environment consistency | Medium | Medium | Use the lockfile, recommended runtime, and documented setup commands. |
| R-10 | Documentation alignment | Medium | Medium | Review diagrams, route descriptions, and walkthroughs against the implementation. |
| R-11 | Repository hygiene | Low | High | Review tracked files/history and retain environment-file ignore rules. |
| R-12 | Planning traceability | Medium | Medium | Label illustrative estimates and record actual dates, owners, and effort as work progresses. |

Supporting evidence appears in [the repository review](repository-review.md), [test report](test-report.md), and [project plan](project-plan.md).
