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

export const user002 = {
  id: "user002",
  name: "Maria",
  testPersona: "Family relocation • Children • No pets • Just Arrived",

  currentStageId: "just-arrived",

  // Facts represent the user's current situation.
  // The Quest Engine derives applicability from these values.
  // Do not duplicate this information elsewhere in the user model.
  facts: {
    about: {
      havePets: false,
      haveDog: false,
      haveChildren: true,
      haveCar: false,
      housingType: "renting",
      needKitchen: false,
      needFurniture: true,
    },

    milestones: {
      moveDate: {
        plannedDate: "",
        actualDate: "2026-06-15",
      },
      keyHandover: {
        plannedDate: "",
        actualDate: "2026-06-10",
      },
      anmeldung: {
        plannedDate: "",
        actualDate: "2026-06-20",
      },
    },
  },

    completedQuestIds: 
  ["important-documents",
"school-registration",
"krankenkasse",
"moving-budget",
"moving-logistics",
"tax-id",
"electricity",
"furniture-delivery"],

neededHomeItemIds: [
  "vacuum",
  "kettle",
  "laundry-basket",
],

};