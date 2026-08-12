import {
  PublicClientApplication,
} from "@azure/msal-browser";

/**
 * ============================================================
 * Germany Move Quest
 * Microsoft Authentication
 * ============================================================
 *
 * Responsibility
 * --------------
 * Configures and coordinates Microsoft authentication for GMQ.
 *
 * This service owns Microsoft identity concerns only.
 * It does not read or write OneDrive user data.
 */

const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "Missing VITE_MICROSOFT_CLIENT_ID configuration."
  );
}

const msalConfig = {
  auth: {
    clientId,
    authority:
      "https://login.microsoftonline.com/consumers",
    redirectUri: `${window.location.origin}/redirect.html`,
  },
  cache: {
    cacheLocation: "localStorage",
  },
  system: {
    asyncPopups: false,
  },
};

export const microsoftAuth =
  new PublicClientApplication(msalConfig);

export const microsoftLoginRequest = {
  scopes: [
    "User.Read",
    "Files.ReadWrite.AppFolder",
  ],
};

let initializationPromise;

/**
 * Initialize MSAL once before using authentication APIs.
 */
export function initializeMicrosoftAuth() {
  if (!initializationPromise) {
    initializationPromise = microsoftAuth.initialize();
  }

  return initializationPromise;
}

/**
 * Return the currently signed-in Microsoft account, if one exists.
 */
export async function getMicrosoftAccount() {
  await initializeMicrosoftAuth();

  const accounts = microsoftAuth.getAllAccounts();

  return accounts[0] ?? null;
}

/**
 * Sign in interactively.
 */
export async function signInWithMicrosoft() {
  await initializeMicrosoftAuth();

  const result = await microsoftAuth.loginPopup(
    microsoftLoginRequest
  );

  return result.account ?? null;
}

/**
 * Sign out the supplied account.
 */
export async function signOutFromMicrosoft(account) {
  await initializeMicrosoftAuth();

  await microsoftAuth.logoutPopup({
    account,
  });
}

/**
 * Acquire an access token for Microsoft Graph.
 *
 * Try the cached account/token first. If Microsoft requires user
 * interaction, fall back to an interactive popup.
 */
export async function getMicrosoftGraphAccessToken() {
  await initializeMicrosoftAuth();

  const account = await getMicrosoftAccount();

  if (!account) {
    throw new Error(
      "A Microsoft account must be connected before accessing OneDrive."
    );
  }

  const request = {
    ...microsoftLoginRequest,
    account,
  };

  try {
    const result =
      await microsoftAuth.acquireTokenSilent(request);

    return result.accessToken;
  } catch (error) {
    console.warn(
      "Silent Microsoft token acquisition failed; interactive authentication is required.",
      error
    );

    const result =
      await microsoftAuth.acquireTokenPopup(request);

    return result.accessToken;
  }
}