This is a working documents

# Scope
This is not a developer-heavy architecture document, but one that will explain things like:

1. Why React?
2. Why Vite?
3. Why a Progressive Web App instead of native?
4. Why local storage for the MVP?
5. Why GitHub + Netlify?
6. How the application is organized into components.


# Purposes

1. It will help future-me remember why decisions were made.
2. It will become an excellent talking point in interviews, showing not just what I've built with AI assisted develoment, but the reasoning behind my technical and product choices.

---


## Data Strategy

### MVP

The MVP uses browser Local Storage to persist all user data.

Reasons:

- Simple architecture
- No backend required
- No user accounts
- Works offline
- Fast development
- No hosting costs

The MVP intentionally avoids user authentication to reduce complexity and enable offline-first operation. Local storage provides sufficient persistence for a single-user personal application while leaving the door open for future cloud synchronization.

### Future

If cloud synchronization becomes desirable, the application can evolve to:

- Authentication
- Cloud database
- Multi-device synchronization


