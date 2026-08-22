import {
  getMicrosoftGraphAccessToken,
} from "../services/microsoftAuth";

import {
  createEnvelope,
  validateEnvelope,
} from "./userDataEnvelope";

/**
 * ============================================================
 * Germany Move Quest
 * OneDrive User Repository
 * ============================================================
 *
 * Responsibility
 * --------------
 * Stores and retrieves canonical GMQ user-data envelopes from
 * the application's dedicated OneDrive App Folder.
 *
 * This repository knows about Microsoft Graph and OneDrive,
 * but it does not own Microsoft authentication or the GMQ
 * persistence format.
 */

const GRAPH_ROOT =
  "https://graph.microsoft.com/v1.0";

function getUserFilename(userId) {
  const safeUserId = userId.replace(
    /[^a-zA-Z0-9-_]/g,
    "-"
  );

  return `${safeUserId}.json`;
}

async function graphRequest(path, options = {}) {
  const accessToken =
    await getMicrosoftGraphAccessToken();

  return fetch(`${GRAPH_ROOT}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
}

/**
 * Get metadata for GMQ's OneDrive App Folder.
 *
 * Accessing approot also gives us a controlled way to prove that
 * the authenticated account can reach the application folder.
 */
export async function getOneDriveAppFolder() {
  const response = await graphRequest(
    "/me/drive/special/approot"
  );

  if (!response.ok) {
    throw new Error(
      `Could not access the OneDrive App Folder ` +
        `(${response.status}).`
    );
  }

  return response.json();
}


/**
 * Save one GMQ user to OneDrive only when the cloud record has not
 * changed since this device last observed it.
 *
 * A 412 response is treated as a normal stale-data conflict rather
 * than an exceptional failure.
 */
export async function saveOneDriveUserIfCurrent(
  user,
  expectedETag
) {
  if (!expectedETag) {
    return {
      ok: false,
      code: "missing-etag",
      message:
        "A known OneDrive version is required for a safe cloud save.",
    };
  }

  const envelope = createEnvelope(user);
  const filename = getUserFilename(user.id);

  const response = await graphRequest(
    `/me/drive/special/approot:/${encodeURIComponent(
      filename
    )}:/content`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json;charset=utf-8",
        "If-Match": expectedETag,
      },
      body: JSON.stringify(envelope, null, 2),
    }
  );

  if (response.status === 412) {
    return {
      ok: false,
      code: "stale-cloud-data",
      message:
        "The OneDrive record changed on another device. " +
        "The cloud copy was not overwritten.",
    };
  }

  if (!response.ok) {
    throw new Error(
      `Could not safely save OneDrive data for user ` +
        `"${user.id}" (${response.status}).`
    );
  }

  const driveItem = await response.json();

  return {
    ok: true,
    envelope,
    driveItem,
    eTag: driveItem.eTag ?? null,
  };
}




/**
 * Load one GMQ user-data envelope from the OneDrive App Folder.
 *
 * A missing file is returned as a normal "not found" result because
 * the first cloud save for a user legitimately starts without one.
 */
export async function loadOneDriveUser(userId) {
  const filename = getUserFilename(userId);

  const response = await graphRequest(
    `/me/drive/special/approot:/${encodeURIComponent(
      filename
    )}:/content`
  );

  if (response.status === 404) {
    return {
      ok: true,
      found: false,
      envelope: null,
      eTag: null,
    };
  }

  if (!response.ok) {
    throw new Error(
      `Could not load OneDrive data for user ` +
        `"${userId}" (${response.status}).`
    );
  }

  const envelope = await response.json();

  const validation = validateEnvelope(
    envelope,
    userId
  );

  if (!validation.ok) {
    return validation;
  }

  return {
    ok: true,
    found: true,
    envelope: validation.envelope,
    eTag: response.headers.get("ETag"),
  };
}