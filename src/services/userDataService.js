import {
  buildActiveUser,
  cloneSourceUser,
  createEnvelope,
  validateEnvelope,
} from "../persistence/userDataEnvelope";

import {
  loadLocalEnvelope,
  loadLocalUser,
  removeLocalUser,
  saveLocalEnvelope,
  saveLocalUser,
} from "../persistence/localUserRepository";

import {
  loadOneDriveUser,
  saveOneDriveUserIfCurrent,
} from "../persistence/oneDriveUserRepository";

import {
  createDataFingerprint,
  loadSyncMetadata,
  saveOneDriveSyncMetadata,
} from "../persistence/syncMetadataRepository";

import {
  getMicrosoftAccount,
} from "./microsoftAuth";

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
 * Today the shared persistence provider is OneDrive, with browser
 * localStorage acting as the local cache.
 *
 * The service boundary allows the shared persistence provider to be
 * replaced later without coupling quest/domain logic to OneDrive.
 *
 * Architectural rule:
 *
 *   Store facts. Derive everything else.
 */

const SELECTED_USER_STORAGE_KEY =
  "germany-move-quest:selected-user";

/**
 * Load one active user.
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
 * Inspect local and shared persistence for one user without modifying
 * either user-data copy.
 *
 * Reconciliation uses the browser's last known synchronized data
 * fingerprint as the baseline.
 *
 * This allows GMQ to distinguish:
 *
 *   only local changed
 *   only cloud changed
 *   both changed
 *
 * without relying on savedAt timestamps to choose a winner.
 */
export async function inspectUserPersistenceState(userId) {
  const account = await getMicrosoftAccount();

  if (!account) {
    return {
      ok: false,
      code: "not-connected",
      message: "OneDrive is not connected.",
    };
  }

  const localResult = loadLocalEnvelope(userId);

  if (!localResult.ok) {
    return {
      ok: false,
      code: localResult.code,
      message: localResult.message,
    };
  }

  let cloudResult;

  try {
    cloudResult = await loadOneDriveUser(userId);
  } catch (error) {
    console.warn(
      `Could not inspect OneDrive data for user "${userId}".`,
      error
    );

    return {
      ok: false,
      code: "cloud-load-failed",
      message:
        `Could not load shared OneDrive data for user "${userId}".`,
    };
  }

  if (!cloudResult.ok) {
    return cloudResult;
  }

  const localFound = localResult.found;
  const cloudFound = cloudResult.found;

  if (!localFound && !cloudFound) {
    return {
      ok: true,
      state: "none",
      localEnvelope: null,
      cloudEnvelope: null,
      cloudETag: null,
    };
  }

  if (localFound && !cloudFound) {
    return {
      ok: true,
      state: "local-only",
      localEnvelope: localResult.envelope,
      cloudEnvelope: null,
      cloudETag: null,
    };
  }

  if (!localFound && cloudFound) {
    return {
      ok: true,
      state: "cloud-only",
      localEnvelope: null,
      cloudEnvelope: cloudResult.envelope,
      cloudETag: cloudResult.eTag,
    };
  }

  const localEnvelope = localResult.envelope;
  const cloudEnvelope = cloudResult.envelope;

  const localFingerprint =
    createDataFingerprint(localEnvelope.data);

  const cloudFingerprint =
    createDataFingerprint(cloudEnvelope.data);

  /**
   * If both copies contain identical data, there is no divergence,
   * regardless of timestamps or previous metadata.
   */
  if (localFingerprint === cloudFingerprint) {
    return {
      ok: true,
      state: "same",
      localEnvelope,
      cloudEnvelope,
      cloudETag: cloudResult.eTag,
    };
  }

  const syncMetadata = loadSyncMetadata(userId);

  /**
   * Without a known synchronized baseline, differing copies cannot be
   * classified safely. Do not guess which one should win.
   */
  if (!syncMetadata?.lastSyncedDataFingerprint) {
    return {
      ok: true,
      state: "conflict",
      reason: "unknown-sync-baseline",
      localEnvelope,
      cloudEnvelope,
      cloudETag: cloudResult.eTag,
    };
  }

  const baselineFingerprint =
    syncMetadata.lastSyncedDataFingerprint;

  const localMatchesBaseline =
    localFingerprint === baselineFingerprint;

  const cloudMatchesBaseline =
    cloudFingerprint === baselineFingerprint;

  /**
   * Local changed, cloud did not.
   *
   * This is ordinary unsynchronized local work and may be conditionally
   * uploaded using the current OneDrive eTag.
   */
  if (!localMatchesBaseline && cloudMatchesBaseline) {
    return {
      ok: true,
      state: "local-newer",
      localEnvelope,
      cloudEnvelope,
      cloudETag: cloudResult.eTag,
    };
  }

  /**
   * Cloud changed, local did not.
   *
   * The cloud copy may safely hydrate this browser.
   */
  if (localMatchesBaseline && !cloudMatchesBaseline) {
    return {
      ok: true,
      state: "cloud-newer",
      localEnvelope,
      cloudEnvelope,
      cloudETag: cloudResult.eTag,
    };
  }

  /**
   * Both copies changed relative to the last known synchronized
   * baseline. Neither copy may automatically replace the other.
   */
  return {
    ok: true,
    state: "conflict",
    reason: "both-changed",
    localEnvelope,
    cloudEnvelope,
    cloudETag: cloudResult.eTag,
  };
}

/**
 * Hydrate the local cache from shared persistence when the cloud copy
 * is clearly authoritative.
 *
 * This function never silently chooses a winner when both local and
 * cloud have changed.
 */
export async function hydrateUserFromSharedPersistence(
  sourceUser
) {
  const inspection =
    await inspectUserPersistenceState(sourceUser.id);

  if (!inspection.ok) {
    return inspection;
  }

  /**
   * Both copies already contain identical data.
   *
   * Establish or refresh the known synchronized baseline.
   */
  if (inspection.state === "same") {
    if (inspection.cloudETag) {
      saveOneDriveSyncMetadata(
        sourceUser.id,
        inspection.cloudETag,
        inspection.cloudEnvelope.data
      );
    }

    return {
      ok: true,
      hydrated: false,
      state: inspection.state,
      user: loadLocalUser(sourceUser),
      cloudETag: inspection.cloudETag ?? null,
    };
  }

  /**
   * Cloud is the only existing copy or is the only copy that changed
   * from the known synchronized baseline.
   */
  if (
    inspection.state === "cloud-only" ||
    inspection.state === "cloud-newer"
  ) {
    const saveResult = saveLocalEnvelope(
      inspection.cloudEnvelope
    );

    if (!saveResult.ok) {
      return saveResult;
    }

    if (inspection.cloudETag) {
      saveOneDriveSyncMetadata(
        sourceUser.id,
        inspection.cloudETag,
        inspection.cloudEnvelope.data
      );
    }

    const hydratedUser = buildActiveUser(
      sourceUser,
      inspection.cloudEnvelope.data
    );

    return {
      ok: true,
      hydrated: true,
      state: inspection.state,
      user: hydratedUser,
      cloudETag: inspection.cloudETag ?? null,
    };
  }

  /**
   * Local is the only copy that changed.
   *
   * Refresh the remembered eTag to the cloud revision we just proved
   * still contains the synchronized baseline. AppShell can then use
   * the normal conditional safe-save path to upload the local changes.
   *
   * The baseline fingerprint remains the cloud data until that upload
   * succeeds.
   */
  if (
    inspection.state === "local-newer" &&
    inspection.cloudETag
  ) {
    saveOneDriveSyncMetadata(
      sourceUser.id,
      inspection.cloudETag,
      inspection.cloudEnvelope.data
    );
  }

  /**
   * local-newer, conflict, local-only, and none do not automatically
   * replace either user-data copy here.
   */
  return {
    ok: true,
    hydrated: false,
    state: inspection.state,
    user: loadLocalUser(sourceUser),
    cloudETag: inspection.cloudETag ?? null,
  };
}

/**
 * Explicitly replace this browser's local user data with the current
 * OneDrive version.
 *
 * Unlike automatic hydration, this may replace conflicting local data
 * because the user has explicitly chosen the OneDrive copy.
 */
export async function resolveConflictUsingCloud(
  sourceUser
) {
  let cloudResult;

  try {
    cloudResult = await loadOneDriveUser(sourceUser.id);
  } catch (error) {
    console.warn(
      `Could not load OneDrive data for user "${sourceUser.id}".`,
      error
    );

    return {
      ok: false,
      code: "cloud-load-failed",
      message:
        "The OneDrive version could not be loaded.",
    };
  }

  if (!cloudResult.ok) {
    return cloudResult;
  }

  if (!cloudResult.found) {
    return {
      ok: false,
      code: "cloud-not-found",
      message:
        "There is no OneDrive version available for this user.",
    };
  }

  const saveResult = saveLocalEnvelope(
    cloudResult.envelope
  );

  if (!saveResult.ok) {
    return saveResult;
  }

  if (cloudResult.eTag) {
    saveOneDriveSyncMetadata(
      sourceUser.id,
      cloudResult.eTag,
      cloudResult.envelope.data
    );
  }

  const resolvedUser = buildActiveUser(
    sourceUser,
    cloudResult.envelope.data
  );

  return {
    ok: true,
    user: resolvedUser,
    eTag: cloudResult.eTag ?? null,
  };
}

/**
 * Explicitly keep this browser's local user data and replace the
 * current OneDrive version with it.
 *
 * This is only used after the user has explicitly chosen to keep this
 * device's version during a conflict.
 */
export async function resolveConflictUsingLocal(user) {
  let cloudResult;

  try {
    cloudResult = await loadOneDriveUser(user.id);
  } catch (error) {
    console.warn(
      `Could not load OneDrive data for user "${user.id}".`,
      error
    );

    return {
      ok: false,
      code: "cloud-load-failed",
      message:
        "The current OneDrive version could not be loaded.",
    };
  }

  if (!cloudResult.ok) {
    return cloudResult;
  }

  if (!cloudResult.found || !cloudResult.eTag) {
    return {
      ok: false,
      code: "cloud-version-unavailable",
      message:
        "A current OneDrive version is required before replacing the cloud copy.",
    };
  }

  let saveResult;

  try {
    saveResult = await saveOneDriveUserIfCurrent(
      user,
      cloudResult.eTag
    );
  } catch (error) {
    console.warn(
      `Could not replace OneDrive data for user "${user.id}".`,
      error
    );

    return {
      ok: false,
      code: "cloud-save-failed",
      message:
        "The local version could not be saved to OneDrive.",
    };
  }

  if (!saveResult.ok) {
    return saveResult;
  }

  if (saveResult.eTag) {
    saveOneDriveSyncMetadata(
      user.id,
      saveResult.eTag,
      saveResult.envelope.data
    );
  }

  return {
    ok: true,
    user,
    eTag: saveResult.eTag ?? null,
  };
}

/**
 * Save one user to shared persistence only when OneDrive has not
 * changed since this browser last observed it.
 *
 * This does not save to the local cache. Normal application updates
 * already do that through saveUser().
 */
export async function saveUserToSharedPersistence(user) {
  const account = await getMicrosoftAccount();

  if (!account) {
    return {
      ok: false,
      code: "not-connected",
      message: "OneDrive is not connected.",
    };
  }

  const syncMetadata = loadSyncMetadata(user.id);

  if (!syncMetadata?.lastKnownETag) {
    return {
      ok: false,
      code: "unknown-cloud-version",
      message:
        "This browser does not know which OneDrive version the local data is based on.",
    };
  }

  let result;

  try {
    result = await saveOneDriveUserIfCurrent(
      user,
      syncMetadata.lastKnownETag
    );
  } catch (error) {
    console.warn(
      `Could not save shared data for user "${user.id}".`,
      error
    );

    return {
      ok: false,
      code: "cloud-save-failed",
      message:
        `Could not save shared OneDrive data for user "${user.id}".`,
    };
  }

  if (!result.ok) {
    return result;
  }

  if (result.eTag) {
    saveOneDriveSyncMetadata(
      user.id,
      result.eTag,
      result.envelope.data
    );
  }

  return {
    ok: true,
    envelope: result.envelope,
    eTag: result.eTag,
  };
}

/**
 * Save one active user's stored facts and progress.
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