
# Persistence Architecture Tests Validated

1. source users are immutable seed data;
2. persisted browser data becomes the active working state;
3. one storage record per user;
4. selected persona is stored separately during development;
5. only facts/progress are persisted;
6. derived journey state is recalculated;
7. malformed or incompatible saved data falls back to source data;
8. reset removes only the selected user's persisted record;
9. manual Local Storage edits must remain valid JSON.