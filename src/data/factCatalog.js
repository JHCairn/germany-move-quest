/**
 * ============================================================
 * Germany Move Quest
 * Fact Catalog
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the single-value facts the application knows how to
 * collect.
 *
 * The catalog contains definitions only:
 * - what question to ask
 * - what type of answer is expected
 * - which conceptual section contains the fact
 *
 * It must never contain user-specific values.
 *
 * Display order
 * -------------
 * Facts render in the order they appear in this file.
 * The catalog itself is the source of truth for display order.
 *
 * Therefore:
 * - do not introduce an explicit order property
 * - insert new facts where they logically belong
 * - keep related facts grouped together
 *
 * Section labels and section display order belong to the
 * Fact Section Catalog. Facts reference sections only by
 * stable section ID.
 *
 * Architecture
 * ------------
 *
 * Catalogs
 *     ↓
 * User Facts
 *     ↓
 * Actions
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
      sectionId: "household",
      type: "boolean",
      question: "Do you have pets?",
    },
    {
      id: "haveDog",
      sectionId: "household",
      type: "boolean",
      question: "Do you have a dog?",
    },
    {
      id: "haveCar",
      sectionId: "transport",
      type: "boolean",
      question: "Do you have a car?",
    },
    {
      id: "haveChildren",
      sectionId: "family",
      type: "boolean",
      question: "Do you have children?",
    },
    {
      id: "housingType",
      sectionId: "home",
      type: "select",
      question: "Are you renting or buying?",
      options: [
        {
          value: "renting",
          label: "Renting",
        },
        {
          value: "buying",
          label: "Buying",
        },
      ],
    },
    {
      id: "needKitchen",
      sectionId: "home",
      type: "boolean",
      question: "Do you need a kitchen?",
    },
    {
      id: "needFurniture",
      sectionId: "home",
      type: "boolean",
      question: "Do you need major furniture?",
    },
  ],
};