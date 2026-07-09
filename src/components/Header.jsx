import heroImg from "../assets/symbol.svg";
import PersonaSwitcher from "../components/developer/PersonaSwitcher";

import "./Header.css";
import { User } from "lucide-react";

/**
 * ============================================================
 * Germany Move Quest
 * Header
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the application brand, current selected user, and the
 * developer persona switcher.
 *
 * The selected user is app-level state, so the switcher belongs in
 * the shared header rather than on a single page.
 */

function Header({
  users,
  selectedUser,
  selectedUserId,
  onSelectedUserChange,
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

<div className="header-user-name">
  <User size={20} strokeWidth={2} />
  <span>{selectedUser.name}</span>
</div>
  </div>

  <div className="header-user-switcher">
    <PersonaSwitcher
      users={users}
      selectedUserId={selectedUserId}
      selectedUser={selectedUser}
      onChange={onSelectedUserChange}
    />
  </div>
</div>
      
    </header>
  );
}

export default Header;