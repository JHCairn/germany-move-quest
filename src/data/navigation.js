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

import { icons } from "./icons";

export const pageIds = {
  JOURNEY: "journey",
  QUESTS: "quests",
  HOME_SETUP: "home-setup",
  PROFILE: "profile",
};

export const navigationItems = [
  {
    id: pageIds.JOURNEY,
    icon: icons.journey,
    label: "Reise",
  },
  {
    id: pageIds.QUESTS,
    icon: icons.quests,
    label: "Aufgaben",
  },
  {
    id: pageIds.HOME_SETUP,
    icon: icons.home,
    label: "Zuhause",
  },
  {
    id: pageIds.PROFILE,
    icon: icons.profile,
    label: "Über mich",
  },
];