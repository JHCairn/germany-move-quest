/**
 * ============================================================
 * Germany Move Quest
 * User Data Envelope
 * ============================================================
 *
 * Responsibility
 * --------------
 * Defines the canonical persisted user-data format used by GMQ,
 * independent of where that data is stored.
 *
 * The same envelope can be stored in browser-local persistence,
 * exported as a backup, stored in OneDrive, or later stored in
 * an internal GMQ datastore.
 *
 * Architectural rule:
 *
 *   Store facts. Derive everything else.
 */

export const STORAGE_VERSION = 1;

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function cloneValue(value) {
  if (
    value === undefined ||
    value === null ||
    typeof value !== "object"
  ) {
    return value;
  }

  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

/**
 * Clone a source user before placing it in editable application state.
 */
export function cloneSourceUser(sourceUser) {
  return cloneValue(sourceUser);
}

/**
 * Recursively merge stored user facts onto the latest source shape.
 *
 * Plain objects are merged so newly introduced source fields can still
 * appear. Arrays and primitive values are replaced by the stored value.
 */
function mergeStoredData(sourceValue, storedValue) {
  if (storedValue === undefined) {
    return cloneValue(sourceValue);
  }

  if (
    isPlainObject(sourceValue) &&
    isPlainObject(storedValue)
  ) {
    const merged = {};
    const keys = new Set([
      ...Object.keys(sourceValue),
      ...Object.keys(storedValue),
    ]);

    keys.forEach((key) => {
      merged[key] = mergeStoredData(
        sourceValue[key],
        storedValue[key]
      );
    });

    return merged;
  }

  return cloneValue(storedValue);
}

function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function isValidMilestones(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  return Object.values(value).every(
    (milestone) =>
      isPlainObject(milestone) &&
      (milestone.plannedDate === undefined ||
        typeof milestone.plannedDate === "string") &&
      (milestone.actualDate === undefined ||
        typeof milestone.actualDate === "string")
  );
}

function isValidHomeNeeds(value) {
  return (
    isPlainObject(value) &&
    (value.neededHomeItemIds === undefined ||
      isStringArray(value.neededHomeItemIds)) &&
    (value.acquiredHomeItemIds === undefined ||
      isStringArray(value.acquiredHomeItemIds))
  );
}

function isValidFacts(facts) {
  if (!isPlainObject(facts)) {
    return false;
  }

  if (
    facts.about !== undefined &&
    !isPlainObject(facts.about)
  ) {
    return false;
  }

  if (
    facts.milestones !== undefined &&
    !isValidMilestones(facts.milestones)
  ) {
    return false;
  }

  if (
    facts.homeNeeds !== undefined &&
    !isValidHomeNeeds(facts.homeNeeds)
  ) {
    return false;
  }

  return true;
}

function isValidStoredUserData(data) {
  if (!isPlainObject(data)) {
    return false;
  }

  if (
    data.currentStageId !== undefined &&
    typeof data.currentStageId !== "string"
  ) {
    return false;
  }

  if (
    data.facts !== undefined &&
    !isValidFacts(data.facts)
  ) {
    return false;
  }

  if (
    data.completedQuestIds !== undefined &&
    !isStringArray(data.completedQuestIds)
  ) {
    return false;
  }

  return true;
}

/**
 * Validate the shared persistence/backup envelope.
 */
export function validateEnvelope(
  envelope,
  expectedUserId
) {
  if (!isPlainObject(envelope)) {
    return {
      ok: false,
      code: "invalid-envelope",
      message:
        "The backup does not contain a valid Germany Move Quest record.",
    };
  }

  if (envelope.version !== STORAGE_VERSION) {
    return {
      ok: false,
      code: "unsupported-version",
      message:
        `This backup uses version ${String(envelope.version)}, ` +
        `but this app supports version ${STORAGE_VERSION}.`,
    };
  }

  if (envelope.userId !== expectedUserId) {
    return {
      ok: false,
      code: "wrong-user",
      message:
        `This backup belongs to "${String(envelope.userId)}", ` +
        `not "${expectedUserId}".`,
    };
  }

  if (typeof envelope.savedAt !== "string") {
    return {
      ok: false,
      code: "invalid-envelope",
      message:
        "The backup is missing a valid savedAt value.",
    };
  }

  if (!isValidStoredUserData(envelope.data)) {
    return {
      ok: false,
      code: "invalid-data",
      message:
        "The backup contains invalid stored user data.",
    };
  }

  return { ok: true, envelope };
}

/**
 * Select only the user data that belongs in persistence.
 *
 * Developer metadata such as name and testPersona continues to come
 * from the source user.
 */
export function selectPersistedUserData(user) {
  return {
    currentStageId: user.currentStageId,
    facts: cloneValue(user.facts ?? {}),
    completedQuestIds: cloneValue(
      user.completedQuestIds ?? []
    ),
  };
}

/**
 * Create the canonical GMQ persistence envelope.
 */
export function createEnvelope(user) {
  return {
    version: STORAGE_VERSION,
    userId: user.id,
    savedAt: new Date().toISOString(),
    data: selectPersistedUserData(user),
  };
}

/**
 * Build an editable active user by merging persisted data onto the
 * latest immutable source-user shape.
 */
export function buildActiveUser(
  sourceUser,
  storedData
) {
  const mergedUser = mergeStoredData(
    cloneSourceUser(sourceUser),
    storedData
  );

  // Source identity and developer metadata remain authoritative.
  return {
    ...mergedUser,
    id: sourceUser.id,
    name: sourceUser.name,
    testPersona: sourceUser.testPersona,
  };
}