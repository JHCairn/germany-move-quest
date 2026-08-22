/**
 * ------------------------------------------------------------
 * Developer Metadata
 * ------------------------------------------------------------
 *
 * Represents the primary real user identity without storing
 * real user facts or progress in publicly deployed source data.
 *
 * Persisted browser and cloud data provide the user's actual
 * working state.
 *
 * Never consumed by the Quest Engine.
 */

export const user001 = {
  id: "user001",
  name: "Julie",
  testPersona: "Primary real user",

  currentStageId: "preparing",

  // This file provides a privacy-safe source shape only.
  // Real facts and progress belong in persisted user data.

  facts: {
    about: {
      havePets: false,
      haveDog: false,
      haveChildren: false,
      haveCar: false,
      housingType: "",
      needKitchen: false,
      needFurniture: false,
    },

    milestones: {
      moveDate: {
        plannedDate: "",
        actualDate: "",
      },
      keyHandover: {
        plannedDate: "",
        actualDate: "",
      },
      anmeldung: {
        plannedDate: "",
        actualDate: "",
      },
    },

    homeNeeds: {
      neededHomeItemIds: [],
      acquiredHomeItemIds: [],
    },
  },

  completedQuestIds: [],
};