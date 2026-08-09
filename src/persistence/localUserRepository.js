import {
  buildActiveUser,
  cloneSourceUser,
  createEnvelope,
  validateEnvelope,
} from "./userDataEnvelope";

const USER_STORAGE_KEY_PREFIX =
  "germany-move-quest:user:";

function getUserStorageKey(userId) {
  return `${USER_STORAGE_KEY_PREFIX}${userId}`;
}

/**
 * ============================================================
 * Germany Move Quest
 * Local User Repository
 * ============================================================
 *
 * Responsibility
 * --------------
 * Stores and retrieves canonical GMQ user-data envelopes using
 * browser localStorage.
 *
 * This repository knows about localStorage, but it does not own the
 * GMQ persistence format. That is defined by userDataEnvelope.
 *
 * Today this is the application's persistence provider.
 * Later it can serve as the local cache beneath shared persistence.
 */

/**
 * Load one active user from browser-local persistence.
 *
 * Missing, malformed, incompatible, or wrong-user data is ignored and
 * the cloned source user is returned instead.
 */
export function loadLocalUser(sourceUser) {
  const fallbackUser = cloneSourceUser(sourceUser);

  try {
    const savedValue = window.localStorage.getItem(
      getUserStorageKey(sourceUser.id)
    );

    if (!savedValue) {
      return fallbackUser;
    }

    const envelope = JSON.parse(savedValue);
    const validation = validateEnvelope(
      envelope,
      sourceUser.id
    );

    if (!validation.ok) {
      console.warn(
        `Ignoring incompatible saved data for user "${sourceUser.id}": ` +
          validation.message
      );

      return fallbackUser;
    }

    return buildActiveUser(
      sourceUser,
      validation.envelope.data
    );
  } catch (error) {
    console.warn(
      `Could not load saved data for user "${sourceUser.id}".`,
      error
    );

    return fallbackUser;
  }
}

/**
 * Save one user's stored facts and progress to localStorage.
 */
export function saveLocalUser(user) {
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
 * Remove one user's locally saved record.
 */
export function removeLocalUser(userId) {
  try {
    window.localStorage.removeItem(
      getUserStorageKey(userId)
    );

    return true;
  } catch (error) {
    console.warn(
      `Could not remove saved data for user "${userId}".`,
      error
    );

    return false;
  }
}