import { useMemo, useState } from "react";

import "./AppShell.css";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

import JourneyPage from "../pages/JourneyPage";
import QuestsPage from "../pages/QuestsPage";

import { questCatalog } from "../data/questCatalog";
import { stages } from "../data/stages";
import { users, defaultUser } from "../data/users";
import { pageIds } from "../data/navigation";

import { buildJourneyModel } from "../services/questEngine";

/**
 * ============================================================
 * Germany Move Quest
 * App Shell
 * ============================================================
 *
 * Responsibility
 * --------------
 * Owns app-level navigation and the currently selected test
 * persona.
 *
 * The shell builds the Journey Model once and passes it to pages.
 */

function AppShell() {
  const [currentPageId, setCurrentPageId] = useState(pageIds.JOURNEY);
  const [selectedUserId, setSelectedUserId] = useState(defaultUser.id);

  const selectedUser =
    users.find((user) => user.id === selectedUserId) ?? defaultUser;

  const journey = useMemo(
    () =>
      buildJourneyModel({
        user: selectedUser,
        questCatalog,
        stages,
      }),
    [selectedUser]
  );

  function renderCurrentPage() {
    switch (currentPageId) {
      case pageIds.QUESTS:
        return <QuestsPage journey={journey} />;

      case pageIds.JOURNEY:
      default:
        return (
          <JourneyPage
            journey={journey}
            users={users}
            selectedUser={selectedUser}
            selectedUserId={selectedUserId}
            onSelectedUserChange={setSelectedUserId}
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <Header selectedUser={selectedUser} />

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
    </div>
  );
}

export default AppShell;