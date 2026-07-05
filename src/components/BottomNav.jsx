import "./BottomNav.css";

import { navigationItems } from "../data/navigation";

/**
 * ============================================================
 * Germany Move Quest
 * Bottom Navigation
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders mobile navigation and reports page selections to the
 * app shell.
 */

function BottomNav({ currentPageId, onPageChange }) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === currentPageId ? "active" : ""}
          onClick={() => onPageChange(item.id)}
          aria-label={item.label}
        >
          <span aria-hidden="true">{item.icon}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;