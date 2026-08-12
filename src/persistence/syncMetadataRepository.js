/**
 * ============================================================
 * Germany Move Quest
 * Sync Metadata Repository
 * ============================================================
 *
 * Responsibility
 * --------------
 * Stores device-local metadata needed to safely synchronize shared
 * persistence.
 *
 * This metadata is NOT part of the canonical GMQ user-data envelope.
 * It describes this browser's knowledge of a persistence provider,
 * rather than facts or progress belonging to the user.
 */

const SYNC_METADATA_KEY_PREFIX =
  "germany-move-quest:sync:";

function getSyncMetadataKey(userId) {
  return `${SYNC_METADATA_KEY_PREFIX}${userId}`;
}

/**
 * Create a stable serialized representation of user data.
 *
 * Object keys are sorted recursively so equivalent data produces the
 * same fingerprint regardless of object property order.
 *
 * This is a comparison fingerprint, not a security or cryptographic
 * hash.
 */
export function createDataFingerprint(value) {
  if (Array.isArray(value)) {
    return `[${value
      .map((item) => createDataFingerprint(item))
      .join(",")}]`;
  }

  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();

    return `{${keys
      .map(
        (key) =>
          `${JSON.stringify(key)}:${createDataFingerprint(
            value[key]
          )}`
      )
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

/**
 * Load locally remembered synchronization metadata for one user.
 */
export function loadSyncMetadata(userId) {
  try {
    const savedValue = window.localStorage.getItem(
      getSyncMetadataKey(userId)
    );

    if (!savedValue) {
      return null;
    }

    const metadata = JSON.parse(savedValue);

    if (
      !metadata ||
      typeof metadata !== "object" ||
      metadata.provider !== "onedrive" ||
      typeof metadata.lastKnownETag !== "string" ||
      typeof metadata.lastSyncedDataFingerprint !== "string"
    ) {
      console.warn(
        `Ignoring invalid sync metadata for user "${userId}".`
      );

      return null;
    }

    return metadata;
  } catch (error) {
    console.warn(
      `Could not load sync metadata for user "${userId}".`,
      error
    );

    return null;
  }
}

/**
 * Remember the OneDrive version and user data most recently known to
 * be synchronized by this browser.
 */
export function saveOneDriveSyncMetadata(
  userId,
  eTag,
  data
) {
  if (!eTag || !data) {
    return false;
  }

  const metadata = {
    provider: "onedrive",
    lastKnownETag: eTag,
    lastSyncedDataFingerprint:
      createDataFingerprint(data),
  };

  try {
    window.localStorage.setItem(
      getSyncMetadataKey(userId),
      JSON.stringify(metadata)
    );

    return true;
  } catch (error) {
    console.warn(
      `Could not save sync metadata for user "${userId}".`,
      error
    );

    return false;
  }
}

/**
 * Remove this browser's remembered synchronization state.
 */
export function removeSyncMetadata(userId) {
  try {
    window.localStorage.removeItem(
      getSyncMetadataKey(userId)
    );

    return true;
  } catch (error) {
    console.warn(
      `Could not remove sync metadata for user "${userId}".`,
      error
    );

    return false;
  }
}