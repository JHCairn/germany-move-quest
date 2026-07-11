This is a living and evolving document


# Solution Design Document Purposes

1. It will help future-me remember why decisions were made.
2. It will become an excellent talking point in interviews, showing not just what I've built with AI assisted develoment, but the reasoning behind my technical and product choices.


# Design Philosophy

Germany Move and Live Quest is designed as a personalized relocation and living companion rather than a static checklist. By adapting to each user's profile, circumstances, journey stage, and progress, the application presents only relevant guidance and recommends the most appropriate next actions at the right time. Its primary focus is to help people relocate to Germany with confidence, while continuing to provide value as they establish and enjoy their new lives in Germany.

The application should minimize visual noise by presenting only information that is currently relevant to the user. Additional information remains accessible without cluttering the primary experience.

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


## Data Model Concepts

### User Profile

The User Profile enables the Journey Engine to personalize guidance, determine applicability, and make recommendations.

#### Personal Profile

- Household Composition
- Citizenship
- Languages
- Pets

#### Planning Profile

- Country of Origin
- Destination
- Move Date
- Housing
- Employment
- Household Setup
- Vehicle Ownership
- Transport Preferences
- Interests

### Quest

A Quest is a long-lived area of responsibility.

Examples:
- Administration
- Home
- Finance
- Health
- Pets
- Transition
- Exploration

### Action

An Action is a finite thing the user may need to complete.

Actions may be app-provided or user-created.

Examples:
- Anmeldung
- German Bank Account
- Cancel Irish Broadband
- Update US Voting Address

### Home Item

A Home Item is not necessarily an action. It represents something the user may want for their home.

Examples:
- Bed
- Sofa
- Dining Chairs
- Floor Lamp

Home Items use a simple MVP lifecycle:

- Available
- Active
- Complete

The verb is intentionally omitted. The implied goal is to acquire or arrange the item in whatever way makes sense.

Example:
- A user may buy a bed, bring one, receive one from a friend, or decide it is no longer needed.

### Future Quantity Support

For MVP, Home Items default to quantity 1.

Future versions may support:
- desiredQuantity
- completedQuantity
- progress display such as `2 / 4`

This would support items such as dining chairs, lamps, towels, or place settings.


# Future

If cloud synchronization becomes desirable, the application can evolve to:

- Authentication
- Cloud database
- Multi-device synchronization


# Core Domain Model

User Profile
        │
        ▼
Applicability Rules
        │
        ▼
Journey Engine
        │
        ▼
Journey Stage
        │
        ▼
Quests
      ├─────────────┐
      ▼             ▼
  Actions      Home Items
      │             │
      └──────┬──────┘
             ▼
        User State
             │
             ▼
Recommendation Engine


## Each box has a single responsibility.

1. User Profile = Who are you?
2. Journey Engine = What applies to you?
3. Quests = Areas of responsibility.
4. Actions / Home Items = Things to accomplish.
5. User State = What have you already done?
6. Recommendation Engine = What should you focus on next?




# 3 core domain objects of the app
## Quest Catalog

This answers:What can exist?

It is the master library of all possible relocation quests.

questCatalog.js

## User

This answers: Who is this person?

Initially:

current stage
life situation
interests
completed quests

Eventually:

preferences
language
notifications
onboarding choices
etc.
users/
  user001.js

## Quest Engine

This answers: Given this user, what should they see?

It derives:

applicable quests
active quests
recommended quests
progress
milestones
dashboard cards



## Journey is the engine's output

Right now we have:

const journey = buildJourneyModel(...);

I actually love that.

The app is still about a Journey.

The catalog, user and engine are just how we calculate it.



## Architectural rule

1. The application stores facts, not conclusions.

### Facts:

- The quest belongs to the "Preparing" stage.
- Julie has a cat.
- Julie has completed "Bankkonto."
- A toaster is in the Kitchen category.
- Julie selected "Toaster."

### Conclusions:

- This quest is active.
- This quest is recommended.
- This item is outstanding.
- Julie has acquired 42% of her selected home inventory.

Those are never stored.

They're always derived.



# Architectural decisions made


## ✅ Actionability

A quest can be:

Applicable
Actionable
Completed

These are distinct concepts.

Milestones primarily drive actionability, not applicability.

## ✅ Reality beats UI

When a real-world milestone has an Actual Date, the Quest Engine may derive that the corresponding quest is already completed.

We start with:

Anmeldung milestone
        ↓
Anmeldung quest

using:

isQuestCompletedByMilestone()

## ✅ Actual dates

Product rule:

Planned dates may be any date.
Actual dates may not be in the future.

Implementation:

DateFactEditor remains generic.
MilestoneRow supplies max={today} only for Actual fields.

## ✅ Dashboard

The dashboard now has a genuine call to action:

Go to Quests

No fake "Open Quest" until deep-linking actually exists.

## ✅ Home Needs

This was the biggest discovery today.

Not for implementation yet.

But we now have a clear vision.

HomeInventoryCatalog
        ↓
About You
"What do you still need?"

        ↓
neededHomeItemIds

        ↓
Home Needs page

The important product decision:

We ask:

"Do you still need this for your new home?"

We do not ask:

"Do you own this?"

That completely changes the nature of the feature.