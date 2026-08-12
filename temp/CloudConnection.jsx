import { useEffect, useState } from "react";

import {
  getMicrosoftAccount,
  signInWithMicrosoft,
  signOutFromMicrosoft,
} from "../services/microsoftAuth";


import {
  inspectUserPersistenceState,
  parseUserBackup,
  hydrateUserFromSharedPersistence,
  saveUserToSharedPersistence,
} from "../services/userDataService";

import {
  loadOneDriveUser,
  saveOneDriveEnvelope,
  saveOneDriveUser,
} from "../persistence/oneDriveUserRepository";



/**
 * ============================================================
 * Germany Move Quest
 * Cloud Connection
 * ============================================================
 *
 * Responsibility
 * --------------
 * Displays and controls the user's connection to the shared
 * cloud persistence provider.
 *
 * For now this component also includes temporary test controls
 * for proving OneDrive save/load behavior.
 */

function CloudConnection({
  user,
  syncStatus,
  onUseCloudVersion,
  onKeepLocalVersion,
}) {
  const [account, setAccount] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getMicrosoftAccount()
      .then((currentAccount) => {
        if (isMounted) {
          setAccount(currentAccount);
        }
      })
      .catch((error) => {
        console.warn(
          "Could not restore Microsoft sign-in.",
          error
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleConnect() {
    setIsBusy(true);

    try {
      const connectedAccount =
        await signInWithMicrosoft();

      setAccount(connectedAccount);
    } catch (error) {
      console.warn(
        "Microsoft sign-in was not completed.",
        error
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function handleDisconnect() {
    setIsBusy(true);

    try {
      await signOutFromMicrosoft(account);
      setAccount(null);
    } catch (error) {
      console.warn(
        "Microsoft sign-out was not completed.",
        error
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function handleTestSave() {
    try {
      const result = await saveOneDriveUser(user);

      console.log(
        "OneDrive save succeeded:",
        result
      );

      window.alert(
        `Saved ${user.id} to OneDrive.`
      );
    } catch (error) {
      console.error(
        "OneDrive save failed.",
        error
      );

      window.alert(
        "The OneDrive test save failed. Check the browser console."
      );
    }
  }

  async function handleTestLoad() {
    try {
      const result = await loadOneDriveUser(
        user.id
      );

      console.log(
        "OneDrive load result:",
        result
      );

      if (!result.found) {
        window.alert(
          `No OneDrive record exists yet for ${user.id}.`
        );
        return;
      }

      window.alert(
        `Loaded ${user.id} from OneDrive successfully.`
      );
    } catch (error) {
      console.error(
        "OneDrive load failed.",
        error
      );

      window.alert(
        "The OneDrive test load failed. Check the browser console."
      );
    }
  }

  async function handleInspectPersistence() {
    try {
      const result =
        await inspectUserPersistenceState(user.id);

      console.log(
        "Persistence inspection result:",
        result
      );

      if (!result.ok) {
        window.alert(
          `Persistence inspection failed: ${result.message}`
        );
        return;
      }

      window.alert(
        `Persistence state for ${user.id}: ${result.state}`
      );
    } catch (error) {
      console.error(
        "Persistence inspection failed.",
        error
      );

      window.alert(
        "Persistence inspection failed. Check the browser console."
      );
    }
  }



  async function handleUploadBackup(event) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const jsonText = await file.text();

      const parsed = parseUserBackup(
        jsonText,
        user.id
      );

      if (!parsed.ok) {
        window.alert(parsed.message);
        return;
      }

      const confirmed = window.confirm(
        `Replace the OneDrive record for ${user.id} ` +
        `with this backup?\n\n` +
        `Backup saved at: ${parsed.envelope.savedAt}`
      );

      if (!confirmed) {
        return;
      }

      const result = await saveOneDriveEnvelope(
        parsed.envelope
      );

      if (!result.ok) {
        window.alert(result.message);
        return;
      }

      console.log(
        "Known-good backup saved to OneDrive:",
        result
      );

      window.alert(
        `OneDrive now contains the selected backup for ${user.id}.`
      );
    } catch (error) {
      console.error(
        "Could not upload backup to OneDrive.",
        error
      );

      window.alert(
        "The backup could not be saved to OneDrive. Check the browser console."
      );
    }
  }


  async function handleHydrateFromCloud() {
    try {
      const result =
        await hydrateUserFromSharedPersistence(user);

      console.log(
        "Cloud hydration result:",
        result
      );

      if (!result.ok) {
        window.alert(
          `Cloud hydration failed: ${result.message}`
        );
        return;
      }

      if (!result.hydrated) {
        window.alert(
          `No hydration performed. State: ${result.state}`
        );
        return;
      }

      window.alert(
        `Hydrated ${user.id} from OneDrive. Refresh the page to load the cached cloud state.`
      );
    } catch (error) {
      console.error(
        "Cloud hydration failed.",
        error
      );

      window.alert(
        "Cloud hydration failed. Check the browser console."
      );
    }
  }

  async function handleTestSafeSave() {
    try {
      const result =
        await saveUserToSharedPersistence(user);

      console.log(
        "Safe OneDrive save result:",
        result
      );

      if (!result.ok) {
        window.alert(
          `Safe save blocked: ${result.message}`
        );
        return;
      }

      window.alert(
        `Safely saved ${user.id} to OneDrive.`
      );
    } catch (error) {
      console.error(
        "Safe OneDrive save failed.",
        error
      );

      window.alert(
        "Safe OneDrive save failed. Check the browser console."
      );
    }
  }

  if (account) {
    return (
      <div>
        <span>
          OneDrive connected: {account.username}
        </span>

        <span>
          {" "}
          Sync: {syncStatus}
        </span>

        {syncStatus === "conflict" && (
          <div>
            <span>
              OneDrive changed elsewhere. Choose which version to keep.
            </span>

            <button
              type="button"
              onClick={onUseCloudVersion}
              disabled={isBusy}
            >
              Use OneDrive Version
            </button>

            <button
              type="button"
              onClick={onKeepLocalVersion}
              disabled={isBusy}
            >
              Keep This Device's Version
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleTestSave}
          disabled={isBusy}
        >
          Test Save
        </button>

        <button
          type="button"
          onClick={handleTestLoad}
          disabled={isBusy}
        >
          Test Load
        </button>

        <button
          type="button"
          onClick={handleInspectPersistence}
          disabled={isBusy}
        >
          Inspect Persistence
        </button>

        <label>
          Upload Good Backup
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleUploadBackup}
          />
        </label>



        <button
          type="button"
          onClick={handleHydrateFromCloud}
          disabled={isBusy}
        >
          Hydrate from Cloud
        </button>


        <button
          type="button"
          onClick={handleTestSafeSave}
          disabled={isBusy}
        >
          Test Safe Save
        </button>



        <button
          type="button"
          onClick={handleDisconnect}
          disabled={isBusy}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={isBusy}
    >
      {isBusy
        ? "Connecting..."
        : "Connect OneDrive"}
    </button>
  );
}

export default CloudConnection;