/**
 * Fact Catalog
 *
 * This file defines the facts the app knows how to collect.
 *
 * The catalog contains definitions only:
 * - what question to ask
 * - what type of answer is expected
 * - which conceptual group the fact belongs to
 *
 * It must not contain user-specific values.
 *
 * Architectural principle:
 * Store facts. Derive everything else.
 */

export const factCatalog = {
  about: [
    {
      id: "havePets",
      group: "about",
      type: "boolean",
      question: "Do you have pets?",
    },
    {
      id: "haveChildren",
      group: "about",
      type: "boolean",
      question: "Do you have children?",
    },
    {
      id: "haveCar",
      group: "about",
      type: "boolean",
      question: "Do you have a car?",
    },
    {
      id: "housingType",
      group: "about",
      type: "select",
      question: "Are you renting or buying?",
      options: [
        { value: "renting", label: "Renting" },
        { value: "buying", label: "Buying" },
      ],
    },
    {
      id: "needKitchen",
      group: "about",
      type: "boolean",
      question: "Do you need a kitchen?",
    },
    {
      id: "needFurniture",
      group: "about",
      type: "boolean",
      question: "Do you need major furniture?",
    },
    {
      id: "haveDog",
      group: "about",
      type: "boolean",
      question: "Do you have a dog?",
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