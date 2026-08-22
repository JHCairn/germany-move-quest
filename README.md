# Germany Move Quest

## Welcome to Germany Move Quest

Germany Move Quest is a Progressive Web App that serves as a companion for relocating to Germany, settling in, and living well.

Rather than focusing solely on the logistics of moving, the application provides personalised guidance, meaningful progress tracking, and contextual recommendations to help users successfully transition to everyday life in Germany.

The project was inspired by my own relocation to Germany and is being developed primarily for my personal use. It also serves as a practical learning project exploring AI-assisted software development, modern frontend technologies, and product design.

---

## Project Background

Relocating to Germany involves many interconnected activities before, during, and long after the move—from immigration and registration to home setup, shopping, utilities, learning the language, and becoming part of a local community.

Rather than relying on multiple spreadsheets, checklists, and bookmarked websites, the goal of this project is to create a single application that guides users through the journey one meaningful step at a time using personalised recommendations, progress tracking, and light gamification.

The application is designed to remain useful throughout the entire transition to life in Germany, continuing to support users as they establish a home and build confidence in everyday life.

---

## Evolution of the Project

This application has evolved through several iterations using different AI-assisted development approaches.

### Prototype 1 – Lovable

The first prototype was created using ChatGPT to develop the initial product vision and Lovable to generate, build, deploy, and host the application.

### Prototype 2 – Netlify + Claude

The second prototype used the same product vision but was developed using Netlify and its integrated AI developer, Claude.

Both prototypes explored different AI-assisted workflows. Each demonstrated strengths and weaknesses, but neither represented the architecture or long-term direction I wanted for the product.

### Current Version – React + ChatGPT

The current implementation is a complete rebuild using React and Vite.

This version is being developed collaboratively with ChatGPT acting as both a development partner and tutor. The project is managed in GitHub and automatically built and deployed through Netlify.

An unusual aspect of the project is that it is being developed alongside my own real relocation to Germany. Product decisions are increasingly informed by genuine experience rather than assumptions, with observations captured as *Field Notes* before being evaluated as potential enhancements.

The focus of this version is not only to build a useful relocation companion, but also to gain hands-on experience with modern frontend development practices, including:

* React component architecture
* Progressive Web Apps (PWA)
* Responsive design
* Browser and cloud data persistence
* Multi-device data synchronisation
* Git and GitHub workflows
* Continuous deployment with Netlify
* Product design and UX principles
* AI-assisted software development

---

## Data Persistence

Germany Move Quest preserves individual user facts and progress independently from the application catalogs and business logic.

User data is persisted locally in the browser and can be exported and restored as a backup.

For users with cloud persistence enabled, Germany Move Quest can also synchronise persisted data through OneDrive, allowing the same working state to be used across devices. Local and cloud changes are reconciled so that independent changes are not silently overwritten.

The persistence architecture is intentionally separated from the journey model so that the underlying storage provider can evolve without redefining the product's core concepts.

See the **Solution Design** documentation for more information about the persistence architecture.

---

## Technology Stack

* React
* Vite
* JavaScript
* CSS
* Progressive Web App (PWA)
* Browser Local Storage
* Microsoft Authentication Library (MSAL)
* Microsoft Graph / OneDrive
* Git
* GitHub
* Netlify

---

## Live Application

https://germany-move-quest.netlify.app/

---

## Documentation

Additional project documentation is available in the `docs` folder.

* Vision
* Product Principles
* Solution Design
* UX & UI Design Guidelines
* Roadmap
* Next Up
* Brainstorm

---

## Status

🚧 **Active Development**

Germany Move Quest continues to evolve through real-world experience, iterative product design, and AI-assisted software development. As new insights emerge, the product, documentation, and architecture evolve together while remaining guided by a clear vision and consistent product principles.
