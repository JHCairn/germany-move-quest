import { RotateCcw, User } from "lucide-react";

import heroImg from "../assets/symbol.svg";
import PersonaSwitcher from "../components/developer/PersonaSwitcher";

import "./Header.css";

/**
 * ============================================================
 * Germany Move Quest
 * Header
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the application brand, current selected user, developer
 * persona switcher, and a modest reset control for the selected persona.
 *
 * The selected user is app-level state, so these controls belong in the
 * shared header rather than on a single page.
 */

function Header({
  users,
  selectedUser,
  selectedUserId,
  onSelectedUserChange,
  onResetSelectedUser,
}) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <img src={heroImg} alt="Germany Move Quest logo" />
        </div>

        <div className="header-text">
          <div className="header-app-title">Germany Move Quest</div>

          <div className="header-tagline">
            Your companion for moving to and living in Germany.
          </div>
        </div>
      </div>

      <div className="header-user">
        <div className="header-user-name">
          <User size={20} strokeWidth={2} aria-hidden="true" />
          <span>{selectedUser.name}</span>
        </div>

        <div className="header-user-tools">
          <div className="header-user-switcher">
            <PersonaSwitcher
              users={users}
              selectedUserId={selectedUserId}
              selectedUser={selectedUser}
              onChange={onSelectedUserChange}
            />
          </div>

          <button
            type="button"
            className="header-reset-button"
            onClick={onResetSelectedUser}
            title={`Reset ${selectedUser.name} to source data`}
          >
            <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
