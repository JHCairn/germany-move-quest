/**
 * ============================================================
 * Germany Move Quest
 * Fact Catalog
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the facts the application knows how to collect.
 *
 * The catalog contains definitions only:
 * - what question to ask
 * - what type of answer is expected
 * - how facts should be conceptually grouped
 *
 * It must never contain user-specific values.
 *
 * Architecture
 * ------------
 *
 * Catalogs
 *     ↓
 * User Facts
 *     ↓
 * Quest Engine
 *     ↓
 * Journey Model
 *     ↓
 * Presentation
 *
 * Architectural principle:
 * Store facts. Derive everything else.
 */

export const factCatalog = {
  about: [
    {
      id: "havePets",
      section: "Household",
      type: "boolean",
      question: "Do you have pets?",
    },
    {
      id: "haveDog",
      section: "Household",
      type: "boolean",
      question: "Do you have a dog?",
    },
    {
      id: "haveCar",
      section: "Household",
      type: "boolean",
      question: "Do you have a car?",
    },
    {
      id: "haveChildren",
      section: "Family",
      type: "boolean",
      question: "Do you have children?",
    },
    {
      id: "housingType",
      section: "Home",
      type: "select",
      question: "Are you renting or buying?",
      options: [
        { value: "renting", label: "Renting" },
        { value: "buying", label: "Buying" },
      ],
    },
    {
      id: "needKitchen",
      section: "Home",
      type: "boolean",
      question: "Do you need a kitchen?",
    },
    {
      id: "needFurniture",
      section: "Home",
      type: "boolean",
      question: "Do you need major furniture?",
    },
  ],

  milestones: [
    {
      id: "moveDate",
      group: "milestones",
      type: "milestone",
      title: "Move to Germany",
    },
    {
      id: "keyHandover",
      group: "milestones",
      type: "milestone",
      title: "Apartment key handover",
    },
    {
      id: "anmeldung",
      group: "milestones",
      type: "milestone",
      title: "Anmeldung",
      subtitle: "Register your address",
    },
  ],
};