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
 *
 * The icon itself is selected by the navigation catalog. This
 * component only renders whatever icon component the catalog provides.
 */

function Sidebar({ currentPageId, onPageChange }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={item.id === currentPageId ? "active" : ""}
              onClick={() => onPageChange(item.id)}
            >
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;