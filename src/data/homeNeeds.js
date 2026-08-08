/**
 * ============================================================
 * Germany Move Quest
 * Home Needs
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the household items users may choose to keep on their
 * Home Needs list.
 *
 * The catalog describes available choices only.
 *
 * User selections are stored separately as an array of item IDs:
 *
 * neededHomeItemIds: [
 *   "bed",
 *   "vacuum",
 *   "kettle",
 * ]
 *
 * A selected item means only:
 *
 * "The user wants to keep this item on their Home Needs list."
 *
 * It does not describe:
 *
 * - current ownership
 * - quantities
 * - replacement intent
 * - purchase status
 * - where the item will be acquired
 *
 *
 * Design principles
 * -----------------
 *
 * Home Needs are intentionally high-level.
 *
 * Each item represents one acquisition decision,
 * not one physical object.
 *
 * The catalog exists to help users remember the
 * important categories needed to make a new home
 * livable. It is not intended to be a shopping
 * list or inventory.
 *
 * Home Needs are user-selected rather than derived
 * from other profile facts.
 *
 * All catalog choices are available to all users.
 * Selecting an item is itself the fact that the
 * household needs that item or category.
 */

export const homeNeeds = [
  {
    id: "bedroom",
    english: "Bedroom",
    german: "Schlafzimmer",
    items: [
      {
        id: "bed",
        english: "Bed",
        german: "Bett",
      },
      {
        id: "mattress",
        english: "Mattress",
        german: "Matratze",
      },
      {
        id: "wardrobe",
        english: "Wardrobe",
        german: "Kleiderschrank",
      },
      {
        id: "bedside-table",
        english: "Bedside table",
        german: "Nachttisch",
      },
    ],
  },

  {
    id: "living-room",
    english: "Living room",
    german: "Wohnzimmer",
    items: [
      {
        id: "sofa",
        english: "Sofa",
        german: "Sofa",
      },
      {
        id: "coffee-table",
        english: "Coffee table",
        german: "Couchtisch",
      },
      {
        id: "tv-stand",
        english: "TV stand",
        german: "TV-Möbel",
      },
      {
        id: "tv",
        english: "TV",
        german: "Fernseher",
      },
      {
        id: "lighting",
        english: "Lamps & lighting",
        german: "Lampen & Beleuchtung",
      },
    ],
  },

  {
    id: "dining",
    english: "Dining",
    german: "Essen",
    items: [
      {
        id: "dining-table",
        english: "Dining table",
        german: "Esstisch",
      },
      {
        id: "dining-chairs",
        english: "Dining chairs",
        german: "Esszimmerstühle",
      },
    ],
  },

  {
    id: "workspace",
    english: "Workspace",
    german: "Arbeitsbereich",
    items: [
      {
        id: "desk",
        english: "Desk",
        german: "Schreibtisch",
      },
      {
        id: "desk-chair",
        english: "Desk chair",
        german: "Schreibtischstuhl",
      },
    ],
  },

  {
    id: "kitchen",
    english: "Kitchen",
    german: "Küche",
    items: [
      {
        id: "dishes",
        english: "Dishes",
        german: "Geschirr",
      },
      {
        id: "cutlery",
        english: "Cutlery",
        german: "Besteck",
      },
      {
        id: "cookware",
        english: "Cookware",
        german: "Kochgeschirr",
      },
      {
        id: "kettle",
        english: "Kettle",
        german: "Wasserkocher",
      },
      {
        id: "toaster",
        english: "Toaster",
        german: "Toaster",
      },
    ],
  },

  {
    id: "cleaning",
    english: "Cleaning",
    german: "Reinigung",
    items: [
      {
        id: "vacuum",
        english: "Vacuum",
        german: "Staubsauger",
      },
      {
        id: "broom",
        english: "Broom",
        german: "Besen",
      },
      {
        id: "mop",
        english: "Mop",
        german: "Wischmopp",
      },
    ],
  },

  {
    id: "bathroom",
    english: "Bathroom",
    german: "Badezimmer",
    items: [
      {
        id: "towels",
        english: "Towels",
        german: "Handtücher",
      },
    ],
  },

  {
    id: "laundry",
    english: "Laundry",
    german: "Wäsche",
    items: [
      {
        id: "washing-machine",
        english: "Washing machine",
        german: "Waschmaschine",
      },
      {
        id: "dryer",
        english: "Dryer",
        german: "Trockner",
      },
      {
        id: "drying-rack",
        english: "Drying rack",
        german: "Wäscheständer",
      },
      {
        id: "laundry-basket",
        english: "Laundry basket",
        german: "Wäschekorb",
      },
    ],
  },

  {
    id: "household",
    english: "Household",
    german: "Haushalt",
    items: [
      {
        id: "waste-bins",
        english: "Waste bins / sorting system",
        german: "Mülleimer / Mülltrennsystem",
      },
      {
        id: "basic-tools",
        english: "Basic tools",
        german: "Werkzeug-Grundausstattung",
      },
      {
        id: "step-ladder",
        english: "Step stool / ladder",
        german: "Trittleiter",
      },
    ],
  },

  {
    id: "pets",
    english: "Pets",
    german: "Haustiere",
    items: [
      {
        id: "pet-supplies",
        english: "Pet supplies",
        german: "Haustierbedarf",
      },
    ],
  },

  {
    id: "outdoor",
    english: "Outdoor",
    german: "Außenbereich",
    items: [
      {
        id: "outdoor-table",
        english: "Outdoor table",
        german: "Gartentisch",
      },
      {
        id: "outdoor-chairs",
        english: "Outdoor chairs",
        german: "Gartenstühle",
      },
      {
        id: "outdoor-furnishings",
        english: "Other outdoor furnishings",
        german: "Weitere Außenmöbel",
      },
    ],
  },
];