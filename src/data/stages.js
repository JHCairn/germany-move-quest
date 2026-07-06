import { icons } from "./icons";

/**
 * ============================================================
 * Germany Move Quest
 * Journey Stages
 * ============================================================
 *
 * Product catalog describing the high-level relocation journey.
 *
 * Stage IDs are stable identifiers used throughout the application.
 * Labels and icons are presentation metadata.
 */

export const stages = [
  {
    id: "preparing",
    germanLabel: "Vor dem Umzug",
    englishLabel: "Preparing to Move",
    icon: icons.stages.preparing,
  },
  {
    id: "just-arrived",
    germanLabel: "Frisch angekommen",
    englishLabel: "Just Arrived",
    icon: icons.stages["just-arrived"],
  },
  {
    id: "settling-in",
    germanLabel: "Einrichten",
    englishLabel: "Settling In",
    icon: icons.stages["settling-in"],
  },
  {
    id: "living",
    germanLabel: "Leben in Deutschland",
    englishLabel: "Living in Germany",
    icon: icons.stages.living,
  },
];