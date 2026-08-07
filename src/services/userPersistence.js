/**
 * ============================================================
 * Germany Move Quest
 * User Persistence
 * ============================================================
 *
 * Responsibility
 * --------------
 * Centralises browser persistence, backup, and restore for stored
 * user facts and progress.
 *
 * Source users remain immutable seed data. Persisted browser data and
 * imported backup data are merged onto a cloned source user.
 *
 * Architectural rule:
 *
 *   Store facts. Derive everything else.
 *
 * This service never stores Journey Models, applicability, progress
 * percentages, recommendations, presentation groups, or other derived
 * conclusions.
 */

const STORAGE_VERSION = 1;
const USER_STORAGE_KEY_PREFIX = "germany-move-quest:user:";
const SELECTED_USER_STORAGE_KEY = "germany-move-quest:selected-user";

function getUserStorageKey(userId) {
  return `${USER_STORAGE_KEY_PREFIX}${userId}`;
}

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function cloneValue(value) {
  if (value === undefined || value === null || typeof value !== "object") {
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

  if (isPlainObject(sourceValue) && isPlainObject(storedValue)) {
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

  if (facts.about !== undefined && !isPlainObject(facts.about)) {
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

  if (data.facts !== undefined && !isValidFacts(data.facts)) {
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
 *
 * This is deliberately the one envelope validator used by local-storage
 * loading and backup restore so the two paths cannot drift into separate
 * schemas.
 */
function validateEnvelope(envelope, expectedUserId) {
  if (!isPlainObject(envelope)) {
    return {
      ok: false,
      code: "invalid-envelope",
      message: "The backup does not contain a valid Germany Move Quest record.",
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
      message: "The backup is missing a valid savedAt value.",
    };
  }

  if (!isValidStoredUserData(envelope.data)) {
    return {
      ok: false,
      code: "invalid-data",
      message: "The backup contains invalid stored user data.",
    };
  }

  return { ok: true, envelope };
}

/**
 * Keep the persistence boundary explicit.
 *
 * Only stored user facts and progress belong here. Developer metadata
 * such as name and testPersona continues to come from the source user.
 */
function selectPersistedUserData(user) {
  return {
    currentStageId: user.currentStageId,
    facts: cloneValue(user.facts ?? {}),
    completedQuestIds: cloneValue(user.completedQuestIds ?? []),
  };
}

function createEnvelope(user) {
  return {
    version: STORAGE_VERSION,
    userId: user.id,
    savedAt: new Date().toISOString(),
    data: selectPersistedUserData(user),
  };
}

function buildActiveUser(sourceUser, storedData) {
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

/**
 * Load one active user from browser storage.
 *
 * Missing, malformed, incompatible, or wrong-user data is ignored and
 * the cloned source user is returned instead.
 */
export function loadUser(sourceUser) {
  const fallbackUser = cloneSourceUser(sourceUser);

  try {
    const savedValue = window.localStorage.getItem(
      getUserStorageKey(sourceUser.id)
    );

    if (!savedValue) {
      return fallbackUser;
    }

    const envelope = JSON.parse(savedValue);
    const validation = validateEnvelope(envelope, sourceUser.id);

    if (!validation.ok) {
      console.warn(
        `Ignoring incompatible saved data for user "${sourceUser.id}": ` +
          validation.message
      );
      return fallbackUser;
    }

    return buildActiveUser(sourceUser, validation.envelope.data);
  } catch (error) {
    console.warn(
      `Could not load saved data for user "${sourceUser.id}".`,
      error
    );
    return fallbackUser;
  }
}

/**
 * Load all active users from their independent saved records.
 */
export function loadUsers(sourceUsers) {
  return sourceUsers.map((sourceUser) => loadUser(sourceUser));
}

/**
 * Save one user's stored facts and progress.
 */
export function saveUser(user) {
  const envelope = createEnvelope(user);

  try {
    window.localStorage.setItem(
      getUserStorageKey(user.id),
      JSON.stringify(envelope)
    );
    return true;
  } catch (error) {
    console.warn(
      `Could not save data for user "${user.id}".`,
      error
    );
    return false;
  }
}

/**
 * Create a human-readable JSON backup from the active user in React.
 *
 * This intentionally does not read localStorage. The active user may still
 * be source-derived and not yet have a saved browser record, and it must
 * nevertheless be exportable.
 */
export function createUserBackup(user) {
  const envelope = createEnvelope(user);

  return {
    envelope,
    json: JSON.stringify(envelope, null, 2),
  };
}

/**
 * Download a backup for the supplied active user.
 */
export function downloadUserBackup(user) {
  try {
    const { json } = createUserBackup(user);
    const now = new Date();

const date = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

const time = [
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
].join("");

const timestamp = `${date}-${time}`;

    const safeUserId = user.id.replace(/[^a-zA-Z0-9-_]/g, "-");
    
    const filename =
  `germany-move-quest-${safeUserId}-backup-${timestamp}.json`;
    
    const blob = new Blob([json], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    return { ok: true, filename };
  } catch (error) {
    console.warn(
      `Could not export data for user "${user.id}".`,
      error
    );

    return {
      ok: false,
      code: "export-failed",
      message: "The backup file could not be created.",
    };
  }
}

/**
 * Parse and validate backup JSON without changing application or browser
 * state. Callers can safely use this before asking the user to confirm.
 */
export function parseUserBackup(jsonText, expectedUserId) {
  let envelope;

  try {
    envelope = JSON.parse(jsonText);
  } catch {
    return {
      ok: false,
      code: "malformed-json",
      message: "The selected file is not valid JSON.",
    };
  }

  return validateEnvelope(envelope, expectedUserId);
}

/**
 * Apply a previously validated backup.
 *
 * The backup data is merged onto the current source shape, then saved
 * immediately using the normal persistence path. React state is updated
 * by AppShell with the returned user.
 */
export function restoreUserFromBackup(sourceUser, envelope) {
  const validation = validateEnvelope(envelope, sourceUser.id);

  if (!validation.ok) {
    return validation;
  }

  const restoredUser = buildActiveUser(
    sourceUser,
    validation.envelope.data
  );

  if (!saveUser(restoredUser)) {
    return {
      ok: false,
      code: "save-failed",
      message:
        "The backup was valid, but it could not be saved in this browser.",
    };
  }

  return {
    ok: true,
    user: restoredUser,
  };
}

/**
 * Remove one user's saved record.
 */
export function removeSavedUser(userId) {
  try {
    window.localStorage.removeItem(getUserStorageKey(userId));
    return true;
  } catch (error) {
    console.warn(
      `Could not remove saved data for user "${userId}".`,
      error
    );
    return false;
  }
}

/**
 * Restore one user to a fresh clone of its source data.
 */
export function resetUser(sourceUser) {
  removeSavedUser(sourceUser.id);
  return cloneSourceUser(sourceUser);
}

/**
 * Restore the last selected developer persona when it still exists.
 * Selection is stored separately because it is UI preference, not
 * journey data.
 */
export function loadSelectedUserId(sourceUsers, defaultUserId) {
  try {
    const savedUserId = window.localStorage.getItem(
      SELECTED_USER_STORAGE_KEY
    );

    const isKnownUser = sourceUsers.some(
      (user) => user.id === savedUserId
    );

    return isKnownUser ? savedUserId : defaultUserId;
  } catch (error) {
    console.warn("Could not restore selected user.", error);
    return defaultUserId;
  }
}

export function saveSelectedUserId(userId) {
  try {
    window.localStorage.setItem(
      SELECTED_USER_STORAGE_KEY,
      userId
    );
    return true;
  } catch (error) {
    console.warn("Could not save selected user.", error);
    return false;
  }
}
