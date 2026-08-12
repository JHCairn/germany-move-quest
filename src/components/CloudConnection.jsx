import { useEffect, useState } from "react";
import { Cloud, LogOut } from "lucide-react";

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
 * Displays and controls the user's normal OneDrive connection
 * state.
 *
 * Conflict and error explanations are rendered by AppShell,
 * where they can receive appropriate page-level emphasis.
 */

function CloudConnection({
  syncStatus,
  onConnected,
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

      if (connectedAccount && onConnected) {
        await onConnected();
      }
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
      <button
        type="button"
        className="cloud-connect-button"
        onClick={handleConnect}
        disabled={isBusy}
      >
        <Cloud
          size={15}
          strokeWidth={2}
          aria-hidden="true"
        />

        <span>
          {isBusy
            ? "Connecting…"
            : "Connect OneDrive"}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`cloud-connection cloud-status-${syncStatus}`}
    >
      <Cloud
        size={15}
        strokeWidth={2}
        aria-hidden="true"
      />

      <span>OneDrive</span>

      <span
        className="cloud-status-separator"
        aria-hidden="true"
      >
        ·
      </span>

      <span className="cloud-status-text">
        {getStatusText()}
      </span>

      <button
        type="button"
        className="cloud-disconnect-button"
        onClick={handleDisconnect}
        disabled={isBusy}
        title="Disconnect OneDrive"
      >
        <LogOut
          size={14}
          strokeWidth={2}
          aria-hidden="true"
        />

        <span>Disconnect</span>
      </button>
    </div>
  );
}

export default CloudConnection;