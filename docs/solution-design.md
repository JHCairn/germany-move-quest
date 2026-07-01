This is a living and evolving document


# Solution Design Document Purposes

1. It will help future-me remember why decisions were made.
2. It will become an excellent talking point in interviews, showing not just what I've built with AI assisted develoment, but the reasoning behind my technical and product choices.


# Design Philosophy

Germany Move Quest is designed as a personalized relocation and living companion rather than a static checklist. The solution adapts to each user's profile, circumstances, stage of journey, and progress, presenting only relevant guidance and recommending the most appropriate next actions over time.


# Building Blocks

- User Profile
- User Journey including Onboarding flow
- Applicability rules
- Journey engine 
- Stages
- Quests
- Actions
- Dependencies and timing
- Recommendation engine 
- Progress model
- Future AI capabilities


## Applicability rules

Actions and quests are not universally relevant. The Journey Engine evaluates each action against the user's current profile and only surfaces content that is applicable to their circumstances. Changes to the user's profile (for example, becoming a dog owner or changing employment status) trigger a re-evaluation of applicable content.

## Journey engine

This answers: "What content is relevant to this user?"

It looks at things like:

- User Profile
- Applicability Rules
- Stage

and decides which quests and actions should exist.


## Recommendation engine

This answers: Of everything that exists, what should I show the user today?

It considers:

- Dependencies
- Timing
- Priority
- Progress
- Estimated effort
- Due dates

and produces something like:

Recommended Today:

✓ Book Anmeldung appointment

✓ Compare internet providers

✓ Buy a vacuum cleaner




# Technical Overview
This is not a developer-heavy architecture document, but one that will explain things like:

1. Why React?
2. Why Vite?
3. Why a Progressive Web App instead of native?
4. Why local storage for the MVP?
5. Why GitHub + Netlify?
6. How the application is organized into components.





# Data Strategy

## MVP

The MVP uses browser Local Storage to persist all user data.

Reasons:

- Simple architecture
- No backend required
- No user accounts
- Works offline
- Fast development
- No hosting costs

The MVP intentionally avoids user authentication to reduce complexity and enable offline-first operation. Local storage provides sufficient persistence for a single-user personal application while leaving the door open for future cloud synchronization.

## Future

If cloud synchronization becomes desirable, the application can evolve to:

- Authentication
- Cloud database
- Multi-device synchronization

