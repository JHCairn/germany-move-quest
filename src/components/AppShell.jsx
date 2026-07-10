import { useMemo, useState } from "react";

import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Toast from "./Toast";

import JourneyPage from "../pages/JourneyPage";
import QuestsPage from "../pages/QuestsPage";
import AboutYouPage from "../pages/AboutYouPage";

import { questCatalog } from "../data/questCatalog";
import { factCatalog } from "../data/factCatalog";
import { stages } from "../data/stages";
import { users, defaultUser } from "../data/users";
import { pageIds } from "../data/navigation";

import { completeQuest, reopenQuest } from "../actions";
import { buildJourneyModel } from "../services/questEngine";

/**
 * ============================================================
 * Germany Move Quest
 * App Shell
 * ============================================================
 *
 * Responsibility
 * --------------
 * Owns app-level navigation, editable user facts, and the
 * currently selected test persona.
 *
 * Architecture
 * ------------
 *
 * Catalogs
 *     ↓
 * User Facts
 *     ↓
 * Quest Engine
 *     ↓
 * Journey Model
 *     ↓
 * Presentation
 *
 * Important architecture rule:
 *
 *   Actions update facts.
 *   Engines derive meaning.
 *   Pages render stored facts or the derived Journey Model.
 *
 * Completing or reopening a quest does not directly update the
 * Dashboard, Quests page, progress counts, recommendations, or
 * quest groups.
 *
 * It only changes the selected user's completedQuestIds fact.
 *
 * Once that fact changes, React re-renders, the Quest Engine runs
 * again, and every page receives a fresh Journey Model.
 *
 * Toast feedback is intentionally kept here because it is
 * temporary presentation state, not user data.
 */

function AppShell() {
  const [currentPageId, setCurrentPageId] = useState(pageIds.JOURNEY);
  const [selectedUserId, setSelectedUserId] = useState(defaultUser.id);
  const [toastMessage, setToastMessage] = useState("");

  /**
   * User facts are copied into React state so actions can update them
   * without mutating the original sample persona catalog.
   */
  const [appUsers, setAppUsers] = useState(users);

  const selectedUser =
    appUsers.find((user) => user.id === selectedUserId) ?? defaultUser;

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
    }, 2000);
  }

  function updateSelectedUser(updateUser) {
    setAppUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId ? updateUser(user) : user
      )
    );
  }

  function handleCompleteQuest(questId) {
    updateSelectedUser((user) => completeQuest(user, questId));
    showToast("✓ Done");
  }

  function handleReopenQuest(questId) {
    updateSelectedUser((user) => reopenQuest(user, questId));
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

      case pageIds.ABOUT_YOU:
        return (
          <AboutYouPage
            facts={factCatalog.about}
            userFacts={selectedUser.facts.about}
          />
        );

      case pageIds.JOURNEY:
      default:
        return (
          <JourneyPage
            journey={journey}
            users={appUsers}
            selectedUser={selectedUser}
            selectedUserId={selectedUserId}
            onSelectedUserChange={setSelectedUserId}
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <Header
        users={appUsers}
        selectedUser={selectedUser}
        selectedUserId={selectedUserId}
        onSelectedUserChange={setSelectedUserId}
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