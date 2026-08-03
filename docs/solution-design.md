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

This approach reduces duplication, keeps information consistent, and also allows the user journey to continue evolving, adding value over time.

---

# Solution Overview

Germany Move Quest consists of four logical layers.

```
Catalogs
        ↓
User Facts
        ↓
Business Logic
        ↓
User Interface
```

Each layer has a single responsibility.

---

## Catalogs

Catalogs define the knowledge of the application.

They describe information that is common to every user, including:

* journey stages
* quests
* home items
* user profile questions
* recommendation rules (inputs to business logic engines)

Catalogs are part of the application itself and are not modified by individual users.

---

## User Facts

User facts describe an individual user's current situation.

Examples include:

* profile information (e.g., renting or buying accommodation, having children, having pets)
* completed milestones (e.g., address registration, move date)
* selected home needs by room (furniture, appliances, etc)
* acquired home items
* completed quest actions

Only information that represents genuine facts should be stored.

Whenever possible, conclusions should be derived rather than recorded.

---

## Business Logic

The business logic interprets user facts together with the application catalogs.

Its responsibilities include:

* determining which quests are applicable
* recommending next actions
* calculating progress (e.g. completion levels)
* identifying completed stages
* presenting relevant guidance

Business logic represents the "thinking" of the application.

---

## User Interface

The user interface presents the information produced by the business logic.

Pages should remain focused on presentation rather than decision-making.

The user interface should not make decisions or compute business rules. It should only display results that have already been calculated elsewhere.

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

Quests become relevant according to the user's circumstances rather than appearing in a fixed order, and can be completed or revisited in any sequence that reflects real-world behaviour.

---

## Facts

Facts represent information that is known to be true.

They form the foundation of the application's decision-making.

The application intentionally stores as few facts as possible, deriving everything else whenever practical.

---

## Home Needs

Home Needs represent items a user might still requires in order to establish their home. It is a broad list that serves to help a user consider items they may have otherwise overlooked.

The solution records what is still needed and what has already been acquired, allowing recommendations and progress to adapt naturally as circumstances change, and supports the user in changing their mind over time.

---

# Information Flow

Most information follows the same lifecycle.

```
User interaction
        ↓
User facts updated
        ↓
Business logic evaluates changes
        ↓
Recommendations and progress are recalculated
        ↓
User interface updates automatically
```

Because the application derives rather than stores conclusions, changing a single fact can naturally influence multiple areas of the application.

---

# Design Decisions

Several design decisions have shaped the evolution of Germany Move Quest.

## Facts Before Conclusions

Store facts.

Derive recommendations, progress, and applicability.

---

## One Source of Truth

Every concept should have a single authoritative source.

Avoid duplicated information whenever possible.

---

## Reality Before Presentation

The application models the user's real-world situation.

The interface presents that model rather than defining it.

---

## Generic Before Specific

Reusable structures should be preferred over one-off implementations.

Catalog-driven design reduces duplication and simplifies future expansion.

---

# Evolving the Solution

Germany Move Quest is intended to grow over time.

New features should build upon the existing concepts rather than introducing parallel structures.

Whenever possible, new capabilities should be achieved by extending catalogs, user facts, or business logic instead of creating additional special cases.

The overall design should remain simple, adaptable, and easy to understand.

---

# Relationship to Other Documentation

This document explains how the solution is designed.

* **Vision** describes what Germany Move Quest aims to achieve.
* **Product Principles** describe how product decisions are made.
* **Roadmap** describes planned future evolution.
* **Backlog** records work that has not yet been completed.
