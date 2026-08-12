import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Toast from "./Toast";

import JourneyPage from "../pages/JourneyPage";
import QuestsPage from "../pages/QuestsPage";
import AboutYouPage from "../pages/AboutYouPage";
import ZuhausePage from "../pages/ZuhausePage";

import { questCatalog } from "../data/questCatalog";
import { factCatalog } from "../data/factCatalog";
import { milestoneCatalog } from "../data/milestoneCatalog";
import { stages } from "../data/stages";
import {
  users as sourceUsers,
  defaultUser,
} from "../data/users";
import { pageIds } from "../data/navigation";

import {
  completeQuest,
  reopenQuest,
  updateAboutFact,
  updateMilestoneDate,
  updateHomeNeeds,
} from "../actions";

import {
  acquireHomeItem,
  markHomeItemNeeded,
} from "../actions/userActions";

import { buildJourneyModel } from "../services/questEngine";

import {
  downloadUserBackup,
  hydrateUserFromSharedPersistence,
  loadSelectedUserId,
  loadUsers,
  parseUserBackup,
  resetUser,
  restoreUserFromBackup,
  saveSelectedUserId,
  saveUser,
  saveUserToSharedPersistence,
  resolveConflictUsingCloud,
  resolveConflictUsingLocal,
} from "../services/userDataService";

/**
 * ============================================================
 * Germany Move Quest
 * App Shell
 * ============================================================
 *
 * Responsibility
 * --------------
 * Owns app-level navigation, active user state, and the currently
 * selected user/persona.
 *
 * Source users are immutable seed data. Active users are restored from
 * browser persistence when valid saved data exists.
 *
 * Important architecture rule:
 *
 *   Actions update facts.
 *   Persistence saves facts.
 *   Engines derive meaning.
 *   Pages render stored facts or the derived Journey Model.
 *
 * Toast feedback is intentionally kept here because it is temporary
 * presentation state, not user data.
 */

function AppShell() {
  const [currentPageId, setCurrentPageId] = useState(
    pageIds.JOURNEY
  );

  const [selectedUserId, setSelectedUserId] =
    useState(() =>
      loadSelectedUserId(
        sourceUsers,
        defaultUser.id
      )
    );

  const [toastMessage, setToastMessage] =
    useState("");

  const [syncStatus, setSyncStatus] =
    useState("idle");

  /**
   * React Strict Mode intentionally invokes effects more than once
   * during development. Startup reconciliation can include a
   * conditional cloud write, so it must only run once per AppShell
   * mount.
   */
  const hasStartedCloudReconciliation =
    useRef(false);

  /**
   * Active users are editable working copies. Each one is independently
   * restored from browser storage or cloned from its source persona.
   */
  const [activeUsers, setActiveUsers] =
    useState(() => loadUsers(sourceUsers));

  /**
   * Check shared persistence for the primary user and update
   * local React state and sync status accordingly.
   *
   * Cloud hydration remains deliberately one-way:
   * cloud-only/cloud-newer may refresh the local cache and React state.
   *
   * If the local copy is newer, GMQ attempts the normal conditional
   * shared save. The remembered OneDrive eTag ensures that this only
   * succeeds when the cloud copy has not changed since this device
   * last observed it.
   */
  async function reconcilePrimaryUserWithSharedPersistence() {
    try {
      const result =
        await hydrateUserFromSharedPersistence(
          defaultUser
        );

      if (!result.ok) {
        if (result.code === "not-connected") {
          setSyncStatus("idle");
        } else {
          setSyncStatus("error");
        }

        return;
      }

      if (result.hydrated) {
        setActiveUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === defaultUser.id
              ? result.user
              : user
          )
        );

        setSyncStatus("synced");
        return;
      }

      switch (result.state) {
        case "same":
          setSyncStatus("synced");
          break;

        case "local-newer": {
          setSyncStatus("syncing");

          const localUser =
            activeUsers.find(
              (user) =>
                user.id === defaultUser.id
            ) ?? defaultUser;

          const saveResult =
            await saveUserToSharedPersistence(
              localUser
            );

          if (saveResult.ok) {
            setSyncStatus("synced");
            break;
          }

          if (
            saveResult.code ===
              "stale-cloud-data" ||
            saveResult.code ===
              "unknown-cloud-version"
          ) {
            setSyncStatus("conflict");
            break;
          }

          if (
            saveResult.code === "not-connected"
          ) {
            setSyncStatus("idle");
            break;
          }

          setSyncStatus("error");

          console.warn(
            "Shared persistence resync was not completed.",
            saveResult
          );

          break;
        }

        case "conflict":
          setSyncStatus("conflict");
          break;

        case "local-only":
        case "none":
        default:
          setSyncStatus("idle");
          break;
      }
    } catch (error) {
      setSyncStatus("error");

      console.warn(
        "Could not reconcile the primary user with shared persistence.",
        error
      );
    }
  }

  /**
   * After the app has rendered from the local cache, check shared
   * persistence for the primary user.
   *
   * The ref prevents React Strict Mode's development-only second
   * effect invocation from starting a second persistence operation.
   */
  useEffect(() => {
    if (
      hasStartedCloudReconciliation.current
    ) {
      return;
    }

    hasStartedCloudReconciliation.current =
      true;

    reconcilePrimaryUserWithSharedPersistence();
  }, []);

  const selectedUser =
    activeUsers.find(
      (user) =>
        user.id === selectedUserId
    ) ??
    activeUsers.find(
      (user) => user.id === defaultUser.id
    ) ??
    defaultUser;

  const journey = useMemo(
    () =>
      buildJourneyModel({
        user: selectedUser,
        questCatalog,
        stages,
      }),
    [selectedUser]
  );

  function showToast(message) {
    setToastMessage(message);

    window.setTimeout(() => {
      setToastMessage("");
    }, 2500);
  }

  /**
   * Central update and persistence boundary.
   *
   * Presentation components report intent. Actions return a new user.
   * AppShell then updates React state and saves that active user.
   */
  function updateSelectedUser(updateUser) {
    const currentUser =
      activeUsers.find(
        (user) =>
          user.id === selectedUserId
      );

    if (!currentUser) {
      return;
    }

    const updatedUser =
      updateUser(currentUser);

    if (updatedUser === currentUser) {
      return;
    }

    saveUser(updatedUser);

    setActiveUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? updatedUser
          : user
      )
    );

    if (
      updatedUser.id === defaultUser.id
    ) {
      setSyncStatus("syncing");

      saveUserToSharedPersistence(updatedUser)
        .then((result) => {
          if (result.ok) {
            setSyncStatus("synced");
            return;
          }

          if (
            result.code === "not-connected"
          ) {
            setSyncStatus("idle");
            return;
          }

          if (
            result.code === "stale-cloud-data"
          ) {
            setSyncStatus("conflict");
          } else {
            setSyncStatus("error");

            console.warn(
              "Shared persistence save was not completed.",
              result
            );
          }
        })
        .catch((error) => {
          setSyncStatus("error");

          console.warn(
            "Shared persistence save failed.",
            error
          );
        });
    }
  }

  function handleSelectedUserChange(userId) {
    setSelectedUserId(userId);
    saveSelectedUserId(userId);
  }

  function handleResetSelectedUser() {
    const sourceUser =
      sourceUsers.find(
        (user) =>
          user.id === selectedUserId
      );

    if (!sourceUser) {
      return;
    }

    const isPrimaryUser =
      sourceUser.id === defaultUser.id;

    const confirmed = window.confirm(
      `Reset ${sourceUser.name} to the original source data?\n\n` +
        (isPrimaryUser
          ? "All saved changes for your real user will be discarded."
          : "All saved changes for this test persona will be discarded.")
    );

    if (!confirmed) {
      return;
    }

    const restoredUser =
      resetUser(sourceUser);

    setActiveUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? restoredUser
          : user
      )
    );

    showToast(`Reset ${sourceUser.name}`);
  }

  function handleBackupSelectedUser() {
    const result =
      downloadUserBackup(selectedUser);

    if (result.ok) {
      showToast(
        `Backup downloaded for ${selectedUser.name}`
      );
      return;
    }

    window.alert(result.message);
  }

  function handleRestoreSelectedUser(
    jsonText
  ) {
    const sourceUser =
      sourceUsers.find(
        (user) =>
          user.id === selectedUserId
      );

    if (!sourceUser) {
      window.alert(
        "The selected user could not be found."
      );
      return;
    }

    const parsed = parseUserBackup(
      jsonText,
      sourceUser.id
    );

    if (!parsed.ok) {
      window.alert(parsed.message);
      return;
    }

    const confirmed = window.confirm(
      `Restore ${sourceUser.name} from this backup?\n\n` +
        "This will replace the currently saved facts and progress " +
        "for this user."
    );

    if (!confirmed) {
      return;
    }

    const restored = restoreUserFromBackup(
      sourceUser,
      parsed.envelope
    );

    if (!restored.ok) {
      window.alert(restored.message);
      return;
    }

    setActiveUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? restored.user
          : user
      )
    );

    showToast(
      `Restored ${sourceUser.name} from backup`
    );
  }

  async function handleUseCloudVersion() {
    const sourceUser =
      sourceUsers.find(
        (user) =>
          user.id === selectedUserId
      );

    if (!sourceUser) {
      return;
    }

    const confirmed = window.confirm(
      "Use the OneDrive version?\n\n" +
        "This will replace the conflicting changes currently stored " +
        "in this browser for this user."
    );

    if (!confirmed) {
      return;
    }

    const result =
      await resolveConflictUsingCloud(
        sourceUser
      );

    if (!result.ok) {
      window.alert(result.message);
      return;
    }

    setActiveUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? result.user
          : user
      )
    );

    setSyncStatus("synced");

    showToast("Loaded OneDrive version");
  }

  async function handleKeepLocalVersion() {
    const confirmed = window.confirm(
      "Keep this device's version?\n\n" +
        "This will replace the current OneDrive version with the " +
        "conflicting changes stored in this browser."
    );

    if (!confirmed) {
      return;
    }

    const result =
      await resolveConflictUsingLocal(
        selectedUser
      );

    if (!result.ok) {
      window.alert(result.message);
      return;
    }

    setSyncStatus("synced");

    showToast(
      "Saved this device's version to OneDrive"
    );
  }

  async function handleCloudReconnect() {
    await reconcilePrimaryUserWithSharedPersistence();
  }

  function handleCompleteQuest(questId) {
    updateSelectedUser((user) =>
      completeQuest(user, questId)
    );

    showToast("✓ Done");
  }

  function handleReopenQuest(questId) {
    updateSelectedUser((user) =>
      reopenQuest(user, questId)
    );
  }

  function handleUpdateFact(
    factId,
    value
  ) {
    updateSelectedUser((user) =>
      updateAboutFact(
        user,
        factId,
        value
      )
    );
  }

  function handleUpdateMilestone(
    milestoneId,
    field,
    value
  ) {
    updateSelectedUser((user) =>
      updateMilestoneDate(
        user,
        milestoneId,
        field,
        value
      )
    );
  }

  function handleUpdateHomeNeeds(
    field,
    value
  ) {
    updateSelectedUser((user) =>
      updateHomeNeeds(
        user,
        field,
        value
      )
    );
  }

  function handleAcquireHomeItem(
    itemId
  ) {
    updateSelectedUser((user) =>
      acquireHomeItem(user, itemId)
    );
  }

  function handleMarkHomeItemNeeded(
    itemId
  ) {
    updateSelectedUser((user) =>
      markHomeItemNeeded(user, itemId)
    );
  }

  function handleGoToQuests() {
    setCurrentPageId(pageIds.QUESTS);
  }

  function renderCurrentPage() {
    switch (currentPageId) {
      case pageIds.QUESTS:
        return (
          <QuestsPage
            journey={journey}
            onCompleteQuest={
              handleCompleteQuest
            }
            onReopenQuest={
              handleReopenQuest
            }
          />
        );

      case pageIds.HOME_SETUP:
        return (
          <ZuhausePage
            neededHomeItemIds={
              selectedUser.facts.homeNeeds
                ?.neededHomeItemIds ?? []
            }
            acquiredHomeItemIds={
              selectedUser.facts.homeNeeds
                ?.acquiredHomeItemIds ?? []
            }
            onAcquireHomeItem={
              handleAcquireHomeItem
            }
            onMarkHomeItemNeeded={
              handleMarkHomeItemNeeded
            }
          />
        );

      case pageIds.ABOUT_YOU:
        return (
          <AboutYouPage
            facts={factCatalog.about}
            userFacts={
              selectedUser.facts.about
            }
            onUpdateFact={
              handleUpdateFact
            }
            milestoneSection={
              milestoneCatalog.section
            }
            milestones={
              milestoneCatalog.milestones
            }
            milestoneValues={
              selectedUser.facts.milestones
            }
            onUpdateMilestone={
              handleUpdateMilestone
            }
            homeNeeds={
              selectedUser.facts.homeNeeds
            }
            onUpdateHomeNeeds={
              handleUpdateHomeNeeds
            }
          />
        );

      case pageIds.JOURNEY:
      default:
        return (
          <JourneyPage
            journey={journey}
            selectedUser={selectedUser}
            onGoToQuests={
              handleGoToQuests
            }
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <Header
        users={activeUsers}
        selectedUser={selectedUser}
        selectedUserId={selectedUserId}
        primaryUserId={defaultUser.id}
        syncStatus={syncStatus}
        onSelectedUserChange={
          handleSelectedUserChange
        }
        onResetSelectedUser={
          handleResetSelectedUser
        }
        onBackupSelectedUser={
          handleBackupSelectedUser
        }
        onRestoreSelectedUser={
          handleRestoreSelectedUser
        }
        onCloudConnected={
          handleCloudReconnect
        }
      />

      {syncStatus === "conflict" && (
        <div
          className="sync-notice sync-notice-conflict"
          role="alert"
        >
          <div className="sync-notice-content">
            <strong>
              Choose which version to keep
            </strong>

            <p>
              Changes were made both on this
              device and in OneDrive. Neither
              version has been overwritten.
            </p>
          </div>

          <div className="sync-notice-actions">
            <button
              type="button"
              onClick={handleUseCloudVersion}
            >
              Use OneDrive Version
            </button>

            <button
              type="button"
              onClick={handleKeepLocalVersion}
            >
              Keep This Device&apos;s Version
            </button>
          </div>
        </div>
      )}

      {syncStatus === "error" && (
        <div
          className="sync-notice sync-notice-error"
          role="status"
        >
          <strong>
            OneDrive isn&apos;t available right
            now.
          </strong>

          <span>
            Your changes are saved on this
            device, so you can continue using
            Germany Move Quest.
          </span>
        </div>
      )}

      <div className="app-layout">
        <Sidebar
          currentPageId={currentPageId}
          onPageChange={setCurrentPageId}
        />

        <main className="app-main">
          {renderCurrentPage()}
        </main>
      </div>

      <BottomNav
        currentPageId={currentPageId}
        onPageChange={setCurrentPageId}
      />

      <Toast message={toastMessage} />
    </div>
  );
}

export default AppShell;