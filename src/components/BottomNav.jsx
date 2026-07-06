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
 * Renders the primary mobile navigation and reports page
 * selections back to the app shell.
 *
 * Icons are supplied by the Navigation Catalog. This component
 * simply renders the icon component associated with each page.
 */

function BottomNav({ currentPageId, onPageChange }) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            className={item.id === currentPageId ? "active" : ""}
            onClick={() => onPageChange(item.id)}
            aria-label={item.label}
          >
            <Icon size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;