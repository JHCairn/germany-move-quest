import { useEffect, useState } from "react";

import {
  getMicrosoftAccount,
  signInWithMicrosoft,
  signOutFromMicrosoft,
} from "../services/microsoftAuth";

/**
 * ============================================================
 * Germany Move Quest
 * Cloud Connection
 * ============================================================
 *
 * Responsibility
 * --------------
 * Displays and controls the user's connection to shared
 * cloud persistence.
 */

function CloudConnection({
  syncStatus,
  onConnected,
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
        console.warn("Could not restore Microsoft sign-in.", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleConnect() {
    setIsBusy(true);

    try {
      const connectedAccount = await signInWithMicrosoft();

      setAccount(connectedAccount);

      if (connectedAccount && onConnected) {
        await onConnected();
      }
    } catch (error) {
      console.warn("Microsoft sign-in was not completed.", error);
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
      console.warn("Microsoft sign-out was not completed.", error);
    } finally {
      setIsBusy(false);
    }
  }

  function getStatusText() {
    switch (syncStatus) {
      case "syncing":
        return "Syncing…";

      case "synced":
        return "Synced";

      case "conflict":
        return "Needs attention";

      case "error":
        return "Offline";

      case "idle":
      default:
        return "Connected";
    }
  }

  if (!account) {
    return (
      <div>
        <button
          type="button"
          onClick={handleConnect}
          disabled={isBusy}
        >
          {isBusy ? "Connecting…" : "Connect OneDrive"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <strong>OneDrive</strong>
        {" · "}
        <span>{getStatusText()}</span>
        {" · "}
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={isBusy}
        >
          Disconnect
        </button>
      </div>

      {syncStatus === "conflict" && (
        <div>
          <p>
            <strong>Choose which version to keep</strong>
          </p>

          <p>
            Changes were made both on this device and in OneDrive.
            Neither version has been overwritten.
          </p>

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
            Keep This Device&apos;s Version
          </button>
        </div>
      )}

      {syncStatus === "error" && (
        <p>
          OneDrive isn&apos;t available right now. Your changes are
          saved on this device, so you can continue using Germany
          Move Quest.
        </p>
      )}
    </div>
  );
}

export default CloudConnection;