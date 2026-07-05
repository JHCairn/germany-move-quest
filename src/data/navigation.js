/**
 * ============================================================
 * Germany Move Quest
 * Navigation Catalog
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the application pages available inside the app shell.
 *
 * This is product/navigation structure, not user state.
 */

export const pageIds = {
  JOURNEY: "journey",
  QUESTS: "quests",
  HOME_SETUP: "home-setup",
  PROFILE: "profile",
};

export const navigationItems = [
  {
    id: pageIds.JOURNEY,
    icon: "🏠",
    label: "Journey",
  },
  {
    id: pageIds.QUESTS,
    icon: "🧭",
    label: "Quests",
  },
  {
    id: pageIds.HOME_SETUP,
    icon: "🏡",
    label: "Home Setup",
  },
  {
    id: pageIds.PROFILE,
    icon: "👤",
    label: "Profile",
  },
];