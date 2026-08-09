import {
  buildActiveUser,
  cloneSourceUser,
  createEnvelope,
  validateEnvelope,
} from "../persistence/userDataEnvelope";

import {
  loadLocalUser,
  removeLocalUser,
  saveLocalUser,
} from "../persistence/localUserRepository";

/**
 * ============================================================
 * Germany Move Quest
 * User Data Service
 * ============================================================
 *
 * Responsibility
 * --------------
 * Coordinates application-level user-data persistence.
 *
 * App-level code uses this service rather than communicating directly
 * with a particular persistence provider.
 *
 * Today the persistence provider is browser localStorage.
 * Later this service can coordinate:
 *
 *   shared persistence + local cache
 *
 * without requiring the quest engine, actions, or presentation code
 * to know where user data is stored.
 *
 * Architectural rule:
 *
 *   Store facts. Derive everything else.
 */

const SELECTED_USER_STORAGE_KEY =
  "germany-move-quest:selected-user";

/**
 * Load one active user.
 *
 * For now, browser-local persistence is the authoritative provider.
 */
export function loadUser(sourceUser) {
  return loadLocalUser(sourceUser);
}

/**
 * Load all active users from their independent saved records.
 */
export function loadUsers(sourceUsers) {
  return sourceUsers.map((sourceUser) =>
    loadUser(sourceUser)
  );
}

/**
 * Save one active user's stored facts and progress.
 *
 * For now, this writes only to browser-local persistence.
 */
export function saveUser(user) {
  return saveLocalUser(user);
}

/**
 * Create a human-readable JSON backup from the active user in React.
 *
 * This intentionally operates on the active user rather than reading
 * from a persistence provider.
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

    const safeUserId = user.id.replace(
      /[^a-zA-Z0-9-_]/g,
      "-"
    );

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
 * Parse and validate backup JSON without changing application or
 * browser state.
 */
export function parseUserBackup(
  jsonText,
  expectedUserId
) {
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
 * Backup data is merged onto the current source shape and then saved
 * through the normal application persistence path.
 */
export function restoreUserFromBackup(
  sourceUser,
  envelope
) {
  const validation = validateEnvelope(
    envelope,
    sourceUser.id
  );

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
 * Restore one user to a fresh clone of its source data.
 */
export function resetUser(sourceUser) {
  removeLocalUser(sourceUser.id);

  return cloneSourceUser(sourceUser);
}

/**
 * Restore the last selected developer persona when it still exists.
 *
 * Persona selection remains a browser-local UI preference. It is not
 * journey data and therefore does not belong in shared persistence.
 */
export function loadSelectedUserId(
  sourceUsers,
  defaultUserId
) {
  try {
    const savedUserId = window.localStorage.getItem(
      SELECTED_USER_STORAGE_KEY
    );

    const isKnownUser = sourceUsers.some(
      (user) => user.id === savedUserId
    );

    return isKnownUser
      ? savedUserId
      : defaultUserId;
  } catch (error) {
    console.warn(
      "Could not restore selected user.",
      error
    );

    return defaultUserId;
  }
}

/**
 * Save the selected developer persona as a local UI preference.
 */
export function saveSelectedUserId(userId) {
  try {
    window.localStorage.setItem(
      SELECTED_USER_STORAGE_KEY,
      userId
    );

    return true;
  } catch (error) {
    console.warn(
      "Could not save selected user.",
      error
    );

    return false;
  }
}