import "./Sidebar.css";

import { navigationItems } from "../data/navigation";

/**
 * ============================================================
 * Germany Move Quest
 * Sidebar Navigation
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders desktop navigation and reports page selections to the
 * app shell.
 */

function Sidebar({ currentPageId, onPageChange }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === currentPageId ? "active" : ""}
            onClick={() => onPageChange(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;