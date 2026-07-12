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

export const user003 = {
  id: "user003",
  name: "Thomas",
  testPersona: "Solo relocation • Car owner • Dog owner • Settling in",

  currentStageId: "settling-in",

  // Facts represent the user's current situation.
  // The Quest Engine derives applicability from these values.
  // Do not duplicate this information elsewhere in the user model.
  facts: {
    about: {
      havePets: true,
      haveDog: true,
      haveChildren: false,
      haveCar: true,
      housingType: "renting",
      needKitchen: false,
      needFurniture: false,
    },

    milestones: {
      moveDate: {
        plannedDate: "",
        actualDate: "2026-04-01",
      },
      keyHandover: {
        plannedDate: "",
        actualDate: "2026-03-25",
      },
      anmeldung: {
        plannedDate: "",
        actualDate: "2026-04-03",
      },
    },
  },

  
  completedQuestIds: 
  ["important-documents", 
"krankenkasse",
"moving-budget",
"bank",
"moving-logistics",
"pet-travel",
"tax-id",
"rundfunkbeitrag",
"electricity",
"mobile-phone",
"furniture-delivery", 
"furniture-basics",
"internet",
"hausarzt",
"pharmacy",
"waste-sorting",
"public-transport",
"german-learning",
"local-community"],

neededHomeItemIds: [
  "sofa",
  "coffee-table",
  "tv-stand",
  "cookware",
  "dishes",
  "cutlery",
  "vacuum",
],
acquiredHomeItemIds: [
  "kettle",
  "bed",
  "mattress",
  "pillow", 
],

};