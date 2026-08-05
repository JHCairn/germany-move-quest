
# Persistence Architecture Decisions

1. Source users are immutable seed data.
2. Active users are loaded from persistence.
3. Only facts are persisted.
4. Derived models are never persisted.
5. Actions mutate facts.
6. Persistence is centralized.
7. Pages never read/write browser storage directly.