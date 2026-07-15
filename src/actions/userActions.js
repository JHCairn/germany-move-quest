/**
 * User Actions
 * ------------
 * Actions are the only layer allowed to express user intent as a change
 * to user facts.
 *
 * Important architectural rule:
 *
 *   Store facts. Derive everything else.
 *
 * About You facts describe the user's current situation.
 * Milestones store related planned and actual dates.
 * Home Needs store the household items the user still needs
 * and those they have already acquired.
 *
 * Quest applicability and all journey meaning are derived later by the
 * Quest Engine.
 */

/**
 * Update one fact in the user's About You facts.
 *
 * This function knows where About You facts are stored so UI components
 * do not need to understand the internal structure of the user object.
 *
 * The original user object and nested fact objects are not mutated.
 * A new user object is returned so React state updates remain predictable.
 */
export function updateAboutFact(user, factId, value) {
  const currentAboutFacts = user.facts?.about ?? {};

  if (currentAboutFacts[factId] === value) {
    return user;
  }

  return {
    ...user,
    facts: {
      ...user.facts,
      about: {
        ...currentAboutFacts,
        [factId]: value,
      },
    },
  };
}

/**
 * Update one date field within a milestone.
 *
 * A milestone contains two related date facts:
 * - plannedDate
 * - actualDate
 *
 * This action knows where milestone values are stored so presentation
 * components do not need to understand the user object's structure.
 *
 * The original user object and nested milestone objects are not mutated.
 */
export function updateMilestoneDate(
  user,
  milestoneId,
  field,
  value
) {
  const currentMilestones = user.facts?.milestones ?? {};
  const currentMilestone = currentMilestones[milestoneId] ?? {
    plannedDate: "",
    actualDate: "",
  };

  if (currentMilestone[field] === value) {
    return user;
  }

  return {
    ...user,
    facts: {
      ...user.facts,
      milestones: {
        ...currentMilestones,
        [milestoneId]: {
          ...currentMilestone,
          [field]: value,
        },
      },
    },
  };
}

/**
 * Update one field within the user's Home Needs facts.
 *
 * Home Needs currently contains:
 * - neededHomeItemIds
 * - acquiredHomeItemIds
 *
 * This action knows where Home Needs are stored so presentation
 * components do not need to understand the user object's structure.
 *
 * The original user object and nested Home Needs objects are not mutated.
 */
export function updateHomeNeeds(user, field, value) {
  const currentHomeNeeds = user.facts?.homeNeeds ?? {};

  if (currentHomeNeeds[field] === value) {
    return user;
  }

  return {
    ...user,
    facts: {
      ...user.facts,
      homeNeeds: {
        ...currentHomeNeeds,
        [field]: value,
      },
    },
  };
}