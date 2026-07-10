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