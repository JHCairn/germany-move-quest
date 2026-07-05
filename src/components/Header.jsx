import heroImg from "../assets/symbol.svg";
import "./Header.css";

/**
 * ============================================================
 * Germany Move Quest
 * Header
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the application brand and current selected user.
 */

function Header({ selectedUser }) {
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
        <span>👤</span>
        <span>{selectedUser.name}</span>
      </div>
    </header>
  );
}

export default Header;