# Architecture and workflows

These diagrams describe the local implementation. GitHub renders Mermaid code blocks.

## System architecture

```mermaid
flowchart LR
    User[Student or home cook] --> Browser[Browser]
    Browser --> Frontend[Next.js frontend :3000]
    Frontend -->|JSON HTTP calls| API[Express API :4000/api/v1]
    API --> Validation[Zod body validation]
    API --> Matching[Matching and ranking]
    API --> Models[Mongoose models]
    Models --> DB[(MongoDB :27017)]
    Seed[Seed command] --> Models
```

The browser API client uses NEXT_PUBLIC_API_BASE_URL or localhost. TanStack Query manages frontend requests/caching. Express routes use a fixed demo workspace and Mongoose persistence. Zod validates selected request bodies; central middleware formats errors. The frontend, API, and database form the application runtime.

## Use-case overview

```mermaid
flowchart LR
    User[Shared workspace user] --> Pantry[Manage pantry]
    User --> Recipes[Browse and manage recipes]
    User --> Recommendations[View recommendations]
    User --> Favorites[Save or remove favorites]
    User --> Shopping[Manage shopping items]
    User --> Dashboard[View dashboard]
    Recommendations --> Missing[Inspect missing ingredients]
    Missing --> Generate[Add missing items to shopping]
```

This use-case overview is expressed as a flowchart. All actions are available through the shared local workspace.

## Recommendation activity

```mermaid
flowchart TD
    Start[Open Recommendations] --> Request[GET matching/recommendations]
    Request --> Read[Read pantry IDs and recipes]
    Read --> Unique[Deduplicate required ingredient IDs]
    Unique --> Compare[Find available and missing ingredients]
    Compare --> Percentage[Calculate rounded match percentage]
    Percentage --> Category[Assign category and ranking score]
    Category --> Sort[Sort by score then title]
    Sort --> Display[Display recommendation cards]
    Display --> Action{User action}
    Action -->|Favorite| Save[Save favorite recipe]
    Action -->|Add missing| List[Append missing shopping ingredients]
    Action -->|Continue browsing| End[End]
```

The flow shows the recommendation workflow. API middleware manages structured error responses. Exact formulas are in [matching.md](matching.md).
