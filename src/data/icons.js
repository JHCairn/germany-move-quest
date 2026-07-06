/**
 * ============================================================
 * Germany Move Quest
 * Icon Catalog
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the application's visual icon language.
 *
 * UI components should avoid importing icons directly from
 * lucide-react. Instead, they should use this catalog so icon
 * choices remain centralized and consistent across the app.
 */

import {
  Route,
  ListTodo,
  House,
  UserRound,
} from "lucide-react";

export const icons = {
  journey: Route,
  quests: ListTodo,
  home: House,
  profile: UserRound,
};