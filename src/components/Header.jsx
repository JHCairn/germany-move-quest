import { useRef } from "react";
import {
  Download,
  RotateCcw,
  Upload,
  User,
} from "lucide-react";

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
 * Renders the application brand, current selected user, persona
 * switcher, and modest data-management controls.
 *
 * The selected user is app-level state, so these controls belong in the
 * shared header rather than on a single page.
 */

function Header({
  users,
  selectedUser,
  selectedUserId,
  primaryUserId,
  onSelectedUserChange,
  onResetSelectedUser,
  onBackupSelectedUser,
  onRestoreSelectedUser,
}) {
  const restoreInputRef = useRef(null);
  const isPrimaryUser = selectedUserId === primaryUserId;

  function handleRestoreClick() {
    restoreInputRef.current?.click();
  }

  async function handleRestoreFileChange(event) {
    const file = event.target.files?.[0];

    // Selecting the picker and then cancelling produces no file.
    if (!file) {
      return;
    }

    try {
      const jsonText = await file.text();
      onRestoreSelectedUser(jsonText);
    } catch {
      window.alert("The selected backup file could not be read.");
    } finally {
      // Allows the same file to be selected again later.
      event.target.value = "";
    }
  }

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
          <span
            className={`header-user-kind ${
              isPrimaryUser ? "is-primary" : "is-test"
            }`}
          >
            {isPrimaryUser ? "Real user" : "Test persona"}
          </span>
        </div>

        <div className="header-user-tools">
          <div className="header-user-switcher">
            <PersonaSwitcher
              users={users}
              selectedUserId={selectedUserId}
              selectedUser={selectedUser}
              primaryUserId={primaryUserId}
              onChange={onSelectedUserChange}
            />
          </div>

          <div
            className="header-data-tools"
            aria-label={`Data tools for ${selectedUser.name}`}
          >
            <button
              type="button"
              className="header-tool-button"
              onClick={onBackupSelectedUser}
              title={`Back up ${selectedUser.name}'s saved data`}
            >
              <Download size={15} strokeWidth={2} aria-hidden="true" />
              <span>Backup</span>
            </button>

            <button
              type="button"
              className="header-tool-button"
              onClick={handleRestoreClick}
              title={`Restore ${selectedUser.name} from a backup`}
            >
              <Upload size={15} strokeWidth={2} aria-hidden="true" />
              <span>Restore</span>
            </button>

            <button
              type="button"
              className="header-tool-button"
              onClick={onResetSelectedUser}
              title={`Reset ${selectedUser.name} to source data`}
            >
              <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>

          <input
            ref={restoreInputRef}
            className="header-file-input"
            type="file"
            accept=".json,application/json"
            onChange={handleRestoreFileChange}
            aria-label={`Choose a backup file for ${selectedUser.name}`}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
