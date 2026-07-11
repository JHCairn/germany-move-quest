/**
 * ============================================================
 * Germany Move Quest
 * Milestone Catalog
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the milestones the application knows how to collect.
 *
 * Each milestone contains two related user facts:
 * - plannedDate
 * - actualDate
 *
 * The catalog contains definitions only. It must never contain
 * user-specific dates.
 *
 * Display order
 * -------------
 * Milestones render in the order they appear in this file.
 *
 * Therefore:
 * - do not introduce an explicit order property
 * - insert new milestones where they logically belong
 * - keep milestones in chronological journey order
 */

export const milestoneCatalog = {
  section: {
    id: "milestones",
    german: "Meilensteine",
    english: "Milestones",
  },

  milestones: [
    {
      id: "keyHandover",
      title: "Apartment key handover",
    },
    {
      id: "anmeldung",
      title: "Anmeldung",
      subtitle: "Address registration",
    },
    {
      id: "moveDate",
      title: "Move to Germany",
    },
  ],
};