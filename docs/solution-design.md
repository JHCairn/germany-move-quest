# Germany Move Quest – Solution Design

## Purpose

This document describes the overall design of Germany Move Quest.

Rather than focusing on implementation details, it explains how the solution is structured, how its major concepts relate to one another, and why the application has been designed this way.

The Product Principles describe how product decisions are made. This document explains how those principles are realised within the solution.

---

# Design Philosophy

Germany Move Quest is designed around one central idea:

> Model the user's real-world journey rather than the user interface.

The application stores facts about the user's situation and derives recommendations, progress, and guidance from those facts.

This approach reduces duplication, keeps information consistent, and allows the user journey to continue evolving and adding value over time.

---

# Solution Overview

Germany Move Quest consists of four primary logical layers.

```text
Catalogs
        ↓
User Facts
        ↓
Business Logic
        ↓
User Interface
```

Persistence supports the User Facts layer by ensuring that an individual user's facts and progress can survive application sessions and, where cloud persistence is enabled, remain available across devices.

Each primary layer has a single responsibility.

---

## Catalogs

Catalogs define the knowledge of the application.

They describe information that is common to every user, including:

* journey stages
* quests
* home items
* user profile questions
* recommendation rules used by business logic

Catalogs are part of the application itself and are not modified by individual users.

Catalog data should not contain an individual user's ongoing real-world state.

---

## User Facts

User facts describe an individual user's current situation.

Examples include:

* profile information, such as renting or buying accommodation, having children, or having pets
* completed milestones, such as address registration or an actual move date
* selected home needs
* acquired home items
* completed quest actions

Only information that represents genuine facts should be stored.

Whenever possible, conclusions should be derived rather than recorded.

User facts belong to the individual user and are persisted independently from the catalogs that define application knowledge.

---

## Business Logic

The business logic interprets user facts together with the application catalogs.

Its responsibilities include:

* determining which quests are applicable
* recommending next actions
* calculating progress
* identifying completed stages
* presenting relevant guidance

Business logic represents the "thinking" of the application.

Derived journey state is recalculated from persisted user facts rather than stored as an independent source of truth.

---

## User Interface

The user interface presents the information produced by the business logic.

Pages should remain focused on presentation rather than decision-making.

The user interface should not make decisions or compute business rules. It should display results that have already been calculated elsewhere.

---

# Core Concepts

## Journey

The journey represents the user's transition to life in Germany.

It is organised into logical stages that reflect how relocation naturally progresses rather than enforcing a fixed sequence of tasks.

---

## Stages

Stages provide orientation within the overall journey.

They help users understand where they are and what generally comes next.

Stages represent phases of the journey rather than strict project milestones.

---

## Quests

Quests represent meaningful goals.

Each quest contains one or more tasks that contribute towards completing that goal.

Quests become relevant according to the user's circumstances rather than appearing in a fixed order, and they can be completed or revisited in any sequence that reflects real-world behaviour.

---

## Facts

Facts represent information that is known to be true.

They form the foundation of the application's decision-making.

The application intentionally stores as few facts as possible, deriving everything else whenever practical.

---

## Home Needs

Home Needs represent items a user may still require in order to establish their home.

The catalog provides a broad set of items intended to help users consider things they may otherwise overlook.

The user's data records which items are still needed and which have already been acquired. This allows recommendations and progress to adapt naturally as circumstances change and supports users changing their minds over time.

---

# Information Flow

Most information follows the same lifecycle.

```text
User interaction
        ↓
User facts updated
        ↓
User facts persisted
        ↓
Business logic evaluates changes
        ↓
Recommendations and progress are recalculated
        ↓
User interface updates automatically
```

Because the application derives rather than stores conclusions, changing a single fact can naturally influence multiple areas of the application.

---

# User Data and Persistence

Persistence ensures that User Facts survive beyond the current browser session while preserving the distinction between application knowledge and individual user data.

The persistence design follows the same principle as the rest of Germany Move Quest:

> Store facts. Derive everything else.

Only the user information required to reconstruct the user's real-world state and progress is persisted. Recommendations, applicability, progress calculations, and other derived journey state are recalculated by the application.

---

## Source Data and Persisted Data

Source user data may provide an initial state for a user or development persona.

This source data is treated as immutable seed data rather than as the user's continuing working record.

Once persisted user data exists, that persisted record becomes the user's working state.

This separation is important because application source data and individual user data serve different purposes:

* source data provides initialization or fallback
* persisted data records the individual's current facts and progress
* catalogs define shared application knowledge
* business logic derives conclusions from catalogs and persisted user facts

Real user data should therefore not unnecessarily form part of publicly deployed application source data.

---

## User Records

Persisted user data is maintained independently for each user.

Each user's record contains that user's own facts and progress and should not affect another user's data.

During development, persona selection may also be persisted separately from the user record itself. Persona selection is development state rather than part of the individual's relocation facts.

---

## Local Persistence

The browser provides the application's immediate local persistence layer.

When user facts change, the current state is saved locally.

When the application is opened again, valid persisted data is restored automatically.

If persisted data is malformed or incompatible, the application can fall back safely rather than allowing invalid data to become the active working state.

Resetting a user removes that user's persisted working record without changing the underlying catalogs or source definitions.

---

## Backup and Restore

Users can export their persisted data as a backup and later restore it.

Backup files contain the user's persisted state together with metadata needed to validate the backup.

Restore is intentionally user-specific. Data belonging to one user should not silently be restored into another user's record.

Backup and restore provide an additional recovery mechanism independent of normal browser or cloud persistence.

---

## Cloud Persistence

Germany Move Quest supports optional OneDrive-backed persistence for users who require shared state across devices.

Cloud persistence extends the local persistence model rather than replacing it with a separate application model.

The same user facts are used regardless of where they are stored.

This allows the rest of the application—including catalogs, business logic, and the user interface—to remain independent of the persistence provider.

The current cloud implementation uses a user-specific file stored in the application's OneDrive application area.

---

## Local and Cloud Copies

When cloud persistence is enabled, the application can encounter two copies of the same user's persisted data:

* the local browser copy
* the cloud copy

These copies may differ legitimately, for example when the user has made changes on another device or has worked temporarily while not connected to cloud storage.

The application therefore reconciles the copies rather than assuming that one location is always authoritative.

---

## Reconciliation Baseline

After local and cloud data have been successfully aligned, the application records a baseline representing the last known synchronized state.

This baseline allows the application to determine what has changed since the previous synchronization.

The comparison distinguishes between four meaningful conditions:

* **Same** — neither copy has changed relative to the shared baseline
* **Local newer** — only the local copy has changed
* **Cloud newer** — only the cloud copy has changed
* **Conflict** — both copies have changed independently

This distinction prevents ordinary one-sided changes from being treated as conflicts.

---

## One-Sided Changes

If only one copy has changed since the shared baseline, the application can reconcile automatically.

A local-only change can be synchronized to the cloud.

A cloud-only change can become the active local state.

Once synchronization succeeds, a new common baseline is established.

---

## Genuine Conflicts

A genuine conflict exists only when both the local and cloud copies have changed independently since their last known shared state.

In this situation the application does not silently choose a winner.

The user is asked which version should be retained.

The selected version then becomes the common state and establishes a new synchronization baseline.

This protects valid changes made on different devices from being overwritten without the user's knowledge.

---

## Cloud Version Awareness

Cloud storage provides version information that helps the application recognize whether the remote copy has changed.

This information complements the application's baseline comparison and helps ensure that cloud writes do not unknowingly overwrite a newer remote version.

The exact storage-provider mechanics remain an implementation detail. The architectural requirement is that remote changes can be detected and reconciled safely.

---

## Offline and Not-Connected Behaviour

Cloud persistence is an enhancement to the user's persisted state, not a requirement for every interaction.

If cloud storage is unavailable or the user is not connected, the locally persisted record remains available.

The application should continue to provide useful access to the user's data and make the cloud connection state clear.

When cloud access becomes available again, local and cloud state can be reconciled using the normal synchronization model.

---

## Persistence Provider Independence

OneDrive is the current cloud persistence provider, but it is not intended to define the application data model.

The application should continue to work with user facts through a persistence boundary rather than allowing cloud-provider behaviour to spread throughout catalogs, business logic, or presentation code.

This keeps open the possibility of replacing or supplementing OneDrive with a dedicated Germany Move Quest datastore in the future without redesigning the journey model.

---

# Data Ownership Boundaries

Germany Move Quest distinguishes between three broad categories of information.

## Application Knowledge

Application knowledge belongs in catalogs and source code.

Examples include:

* quest definitions
* stage definitions
* home-item catalogs
* profile-question definitions
* rules used to determine applicability

This information is shared across users.

---

## Individual User Data

Individual user data belongs in the user's persisted record.

Examples include:

* profile facts
* milestone dates
* completed quests
* home needs
* acquired items

This information represents one person's real-world situation and should remain separate from shared application knowledge.

---

## Derived Information

Derived information is calculated from application knowledge and individual user data.

Examples include:

* quest applicability
* recommended actions
* progress
* stage completion
* current guidance

Derived information should not become a separate authoritative data source unless there is a compelling reason to persist it.

---

# Design Decisions

Several design decisions have shaped the evolution of Germany Move Quest.

## Facts Before Conclusions

Store facts.

Derive recommendations, progress, applicability, and other conclusions.

---

## One Source of Truth

Every concept should have a single authoritative source.

Avoid duplicated information whenever possible.

Application knowledge belongs in catalogs.

Individual reality belongs in user data.

Derived conclusions belong in business logic.

---

## Reality Before Presentation

The application models the user's real-world situation.

The interface presents that model rather than defining it.

---

## Generic Before Specific

Reusable structures should be preferred over one-off implementations.

Catalog-driven design reduces duplication and simplifies future expansion.

---

## Persistence Should Not Define the Product Model

The user's journey model should remain independent of whether data is currently stored in the browser, OneDrive, or a future application datastore.

Persistence exists to preserve User Facts, not to determine what those facts mean.

---

## Protect User Changes

Synchronization should not silently discard legitimate user changes.

Automatic reconciliation is appropriate when only one side has changed.

When both sides have changed independently, the user should retain control over which version becomes authoritative.

---

# Evolving the Solution

Germany Move Quest is intended to grow over time.

New features should build upon the existing concepts rather than introducing parallel structures.

Whenever possible, new capabilities should be achieved by extending catalogs, user facts, business logic, or persistence boundaries instead of creating additional special cases.

The overall design should remain simple, adaptable, and easy to understand.

---

# Relationship to Other Documentation

This document explains how the solution is designed.

* **Vision** describes what Germany Move Quest aims to achieve.
* **Product Principles** describe how product decisions are made.
* **Roadmap** describes planned future evolution.
* **Next Up** identifies the immediate product focus.
* **Brainstorm** captures unprioritised ideas and opportunities.
* **UX & UI Design Guidelines** describe how the experience is presented.
