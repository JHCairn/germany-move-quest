import { useMemo, useState } from "react";

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
  loadSelectedUserId,
  loadUsers,
  parseUserBackup,
  resetUser,
  restoreUserFromBackup,
  saveSelectedUserId,
  saveUser,
} from "../services/userPersistence";

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
  const [currentPageId, setCurrentPageId] = useState(pageIds.JOURNEY);
  const [selectedUserId, setSelectedUserId] = useState(() =>
    loadSelectedUserId(sourceUsers, defaultUser.id)
  );
  const [toastMessage, setToastMessage] = useState("");

  /**
   * Active users are editable working copies. Each one is independently
   * restored from browser storage or cloned from its source persona.
   */
  const [activeUsers, setActiveUsers] = useState(() =>
    loadUsers(sourceUsers)
  );

  const selectedUser =
    activeUsers.find((user) => user.id === selectedUserId) ??
    activeUsers.find((user) => user.id === defaultUser.id) ??
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
    setActiveUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== selectedUserId) {
          return user;
        }

        const updatedUser = updateUser(user);

        if (updatedUser !== user) {
          saveUser(updatedUser);
        }

        return updatedUser;
      })
    );
  }

  function handleSelectedUserChange(userId) {
    setSelectedUserId(userId);
    saveSelectedUserId(userId);
  }

  function handleResetSelectedUser() {
    const sourceUser = sourceUsers.find(
      (user) => user.id === selectedUserId
    );

    if (!sourceUser) {
      return;
    }

    const isPrimaryUser = sourceUser.id === defaultUser.id;
    const confirmed = window.confirm(
      `Reset ${sourceUser.name} to the original source data?\n\n` +
        (isPrimaryUser
          ? "All saved changes for your real user will be discarded."
          : "All saved changes for this test persona will be discarded.")
    );

    if (!confirmed) {
      return;
    }

    const restoredUser = resetUser(sourceUser);

    setActiveUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId ? restoredUser : user
      )
    );

    showToast(`Reset ${sourceUser.name}`);
  }

  function handleBackupSelectedUser() {
    const result = downloadUserBackup(selectedUser);

    if (result.ok) {
      showToast(`Backup downloaded for ${selectedUser.name}`);
      return;
    }

    window.alert(result.message);
  }

  function handleRestoreSelectedUser(jsonText) {
    const sourceUser = sourceUsers.find(
      (user) => user.id === selectedUserId
    );

    if (!sourceUser) {
      window.alert("The selected user could not be found.");
      return;
    }

    const parsed = parseUserBackup(jsonText, sourceUser.id);

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
        user.id === selectedUserId ? restored.user : user
      )
    );

    showToast(`Restored ${sourceUser.name} from backup`);
  }

  function handleCompleteQuest(questId) {
    updateSelectedUser((user) => completeQuest(user, questId));
    showToast("✓ Done");
  }

  function handleReopenQuest(questId) {
    updateSelectedUser((user) => reopenQuest(user, questId));
  }

  function handleUpdateFact(factId, value) {
    updateSelectedUser((user) =>
      updateAboutFact(user, factId, value)
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

  function handleUpdateHomeNeeds(field, value) {
    updateSelectedUser((user) =>
      updateHomeNeeds(user, field, value)
    );
  }

  function handleAcquireHomeItem(itemId) {
    updateSelectedUser((user) =>
      acquireHomeItem(user, itemId)
    );
  }

  function handleMarkHomeItemNeeded(itemId) {
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
            onCompleteQuest={handleCompleteQuest}
            onReopenQuest={handleReopenQuest}
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
            onAcquireHomeItem={handleAcquireHomeItem}
            onMarkHomeItemNeeded={
              handleMarkHomeItemNeeded
            }
          />
        );

      case pageIds.ABOUT_YOU:
        return (
          <AboutYouPage
            facts={factCatalog.about}
            userFacts={selectedUser.facts.about}
            onUpdateFact={handleUpdateFact}
            milestoneSection={milestoneCatalog.section}
            milestones={milestoneCatalog.milestones}
            milestoneValues={selectedUser.facts.milestones}
            onUpdateMilestone={handleUpdateMilestone}
            homeNeeds={selectedUser.facts.homeNeeds}
            onUpdateHomeNeeds={handleUpdateHomeNeeds}
          />
        );

      case pageIds.JOURNEY:
      default:
        return (
          <JourneyPage
            journey={journey}
            selectedUser={selectedUser}
            onGoToQuests={handleGoToQuests}
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
        onSelectedUserChange={handleSelectedUserChange}
        onResetSelectedUser={handleResetSelectedUser}
        onBackupSelectedUser={handleBackupSelectedUser}
        onRestoreSelectedUser={handleRestoreSelectedUser}
      />

      <div className="app-layout">
        <Sidebar
          currentPageId={currentPageId}
          onPageChange={setCurrentPageId}
        />

        <main className="app-main">{renderCurrentPage()}</main>
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
