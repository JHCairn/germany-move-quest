import "./QuestSectionNav.css";

/**
 * ============================================================
 * Germany Move Quest
 * Quest Section Navigation
 * ============================================================
 *
 * Responsibility
 * --------------
 * Provides lightweight in-page navigation between the major
 * quest sections:
 * - Current
 * - Upcoming
 * - Completed
 *
 * Only sections that currently exist are shown.
 * The active section is rendered as non-clickable text.
 */

function QuestSectionNav({
  currentSection,
  showCurrent,
  showUpcoming,
  showCompleted,
}) {
  const items = [
    {
      id: "current",
      label: "Current",
      href: "#current-quests",
      show: showCurrent,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      href: "#upcoming-quests",
      show: showUpcoming,
    },
    {
      id: "completed",
      label: "Completed",
      href: "#completed-quests",
      show: showCompleted,
    },
  ].filter((item) => item.show);

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav
      className="quest-section-nav"
      aria-label="Quest section navigation"
    >
      {items.map((item, index) => {
        const isCurrent = item.id === currentSection;

        return (
          <span
            className="quest-section-nav-item"
            key={item.id}
          >
            {index > 0 && (
              <span
                className="quest-section-nav-separator"
                aria-hidden="true"
              >
                ·
              </span>
            )}

            {isCurrent ? (
              <span
                className="quest-section-nav-current"
                aria-current="location"
              >
                {item.label}
              </span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default QuestSectionNav;
