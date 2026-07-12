/**
 * ------------------------------------------------------------
 * Developer Metadata
 * ------------------------------------------------------------
 *
 * Used by prototype tooling to identify representative
 * test personas.
 *
 * Never consumed by the Quest Engine.
 */

export const user001 = {
  id: "user001",
  name: "Julie",
  testPersona: "Solo relocation • Cat owner • No car • Preparing",

  currentStageId: "preparing",

  // Facts represent the user's current situation.
  // The Quest Engine derives applicability from these values.
  // Do not duplicate this information elsewhere in the user model.

  facts: {
    about: {
      havePets: true,
      haveDog: false,
      haveChildren: false,
      haveCar: false,
      housingType: "buying",
      needKitchen: true,
      needFurniture: true,
      },

    milestones: {
      moveDate: {
        plannedDate: "2026-09-01",
        actualDate: "",
      },
      keyHandover: {
        plannedDate: "2026-07-08",
        actualDate: "2026-07-08",
      },
      anmeldung: {
        plannedDate: "2026-07-20",
        actualDate: "",
      },
    },
  },

  completedQuestIds: 
  ["important-documents",
"bank"],

neededHomeItemIds: [
  "bed",
  "sofa",
  "coffee-table",
  "tv-stand",
  "vacuum",
  "cookware",
  "dishes",
  "cutlery",
  "kettle",
  "toaster",
  "towels",
  "laundry-basket",
],
};