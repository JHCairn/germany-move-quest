# Germany Move Quest – Product Principles

## Purpose

This document captures the principles that guide the design and evolution of Germany Move Quest.

Rather than documenting specific features or implementation details, it explains the philosophy behind the product and the reasoning used to make product decisions.

Features, architecture, and technology will evolve over time. These principles should remain comparatively stable and provide a consistent framework for future decisions.

Whenever new ideas are considered, they should be evaluated against these principles before implementation.

---

# Product Philosophy

## A Companion, Not a Checklist

Germany Move Quest is a companion for relocating to Germany, settling in, and living well.

The goal is not simply to help users complete tasks. It is to help them successfully transition to life in Germany.

The application should provide guidance, reassurance, and a sense of progress throughout that journey.

---

## Reduce Stress, Build Confidence

Relocating to another country is complex and often overwhelming.

Every design decision should aim to reduce uncertainty, build confidence, and help users feel that they are making meaningful progress.

The application should feel calm, supportive, and encouraging rather than demanding or transactional.

---

## Progress Over Completion

The journey matters more than the checklist.

Users should feel they are continually moving forward rather than simply crossing items off a list.

Visible progress should motivate rather than pressure.

---

## The Journey Continues

Germany Move Quest does not end when the move is complete.

The product continues to provide value as users establish their home, build routines, discover their community, and enjoy everyday life in Germany.

Relocation is the beginning of the journey—not the end.

---

# Information Architecture

## Store Facts. Derive Everything Else.

The application stores facts about the user and their journey.

Everything else should be derived.

Examples of stored facts include:

* user profile information
* milestones
* selected home needs
* completed actions

Examples of derived information include:

* recommended quests
* active quests
* progress
* applicability
* completion status

This minimizes duplication, improves consistency, and makes the application easier to evolve.

---

## Every Stored Field Becomes a Liability

Stored data should exist only when it represents a genuine fact.

If a value can be calculated reliably from existing information, it should not be stored.

Keeping the data model small reduces maintenance, simplifies future enhancements, and minimizes the risk of inconsistent data.

---

## Model Reality, Not the Interface

The application should model the user's real-world situation rather than the current user interface.

The UI should be a presentation of the underlying model rather than driving it.

Examples include:

* Home Needs represent whether an item is still needed, not whether a checkbox has been selected.
* Actual milestone dates represent what happened in real life.
* Recommendations are derived from the user's current situation rather than manually maintained.

---

## One Source of Truth

Every concept should have a single authoritative source.

Catalogs define what the application knows.

User data records what is true for an individual user.

The Journey Engine derives what should be presented.

---

# User Experience

## Context Before Action

Users make better decisions when they understand why something matters.

Provide enough context to help users understand the purpose of a recommendation before asking them to take action.

---

## One Page. One Purpose.

Every page should have a clear primary responsibility.

Avoid mixing unrelated concepts or competing calls to action.

Users should always understand what a page is for.

---

## Calm Over Clever

The interface should reduce cognitive load rather than showcase creativity.

Simple interactions, generous spacing, restrained visual styling, and clear language should always be preferred over novelty.

---

## Show Only What Matters Now

The application should focus attention on information that is currently relevant.

Additional detail should remain available but should not compete with the user's immediate priorities.

Progressive disclosure should be used wherever appropriate.

---

# Language & Learning

## German Teaches. English Reassures.

Germany Move Quest supports language learning through everyday use.

German terminology should appear where users will encounter it in real life.

English should provide reassurance, explanation, and confidence.

The objective is practical familiarity rather than formal language instruction.

---

## Use Real-World Terminology

Whenever possible, the application should use the same words users will encounter in Germany.

The goal is to build confidence through familiarity with everyday language.

---

# Interface Design

## Interactive Things Should Look Interactive

Users should immediately recognize which elements can be clicked, edited, or expanded.

Visual affordances should be clear and consistent throughout the application.

---

## Consistency Over Novelty

Reusable patterns should be preferred over one-off solutions.

Consistent layouts, controls, terminology, and interactions reduce cognitive effort and make the application easier to learn.

---

## Responsive, Not Resized

The application should adapt thoughtfully to different screen sizes.

Desktop layouts should take advantage of available space without simply stretching a mobile interface.

---

# Product Evolution

## Build From Real Experience

Whenever practical, product decisions should be informed by real relocation experiences.

Observations from real relocation experiences are captured and evaluated as potential product improvements.

Not every observation becomes a feature, but every observation is an opportunity to improve the product.

---

## Simplicity Is Our Friend

Complexity should be introduced only when it creates meaningful value.

Simple solutions are generally easier to understand, maintain, and evolve.

When faced with multiple approaches, prefer the simplest solution that satisfies the user's needs.

---

## Evolve Deliberately

Germany Move Quest is designed to grow over time.

New features should strengthen the overall product rather than increase complexity for its own sake.

Every additional feature should support the product vision, respect these principles, and contribute to helping users successfully transition to life in Germany
