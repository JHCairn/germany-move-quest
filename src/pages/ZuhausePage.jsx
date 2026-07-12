import "./ZuhausePage.css";

import PageIntro from "../components/common/PageIntro";

import { icons } from "../data/icons";
import { homeNeeds } from "../data/homeNeeds";

/**
 * ============================================================
 * Germany Move Quest
 * Zuhause Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Helps users keep track of the household items they still need
 * and those they have already acquired.
 *
 * Available items and categories come from the Home Needs
 * catalog. The user's current Home Needs are stored separately
 * as item IDs.
 *
 * This page derives its presentation from those stored facts.
 *
 * This page does not:
 *
 * - own user state
 * - define available household items
 * - treat household items as quests
 * - track prices, quantities, shops, or orders
 */

function ZuhausePage({
  neededHomeItemIds = [],
  acquiredHomeItemIds = [],
}) {
  const neededCategories = homeNeeds
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        neededHomeItemIds.includes(item.id)
      ),
    }))
    .filter((category) => category.items.length > 0);

  const acquiredCategories = homeNeeds
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        acquiredHomeItemIds.includes(item.id)
      ),
    }))
    .filter((category) => category.items.length > 0);

  const hasNeededItems = neededCategories.length > 0;
  const hasAcquiredItems = acquiredCategories.length > 0;

  return (
    <div className="zuhause-page">
      <PageIntro
        icon={icons.home}
        title="Zuhause"
        subtitle="Keep track of the home items you need and those you've already acquired."
      />

      <section className="zuhause-section zuhause-needed-section">
        <header className="zuhause-section-header">
          <h2>Still needed</h2>
        </header>

        {hasNeededItems ? (
          <div className="zuhause-needed-categories">
            {neededCategories.map((category) => (
              <section
                key={category.id}
                className="zuhause-needed-category"
              >
                <h3>
                  {category.german} · {category.english}
                </h3>

                <div className="zuhause-needed-items">
                  {category.items.map((item) => (
                    <span
                      key={item.id}
                      className="zuhause-needed-item"
                    >
                      {item.german} · {item.english}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="zuhause-empty-state">
            <h3>No home needs to track</h3>

            <p>
              You're not currently tracking any home needs.
              Add some in <strong>Über mich</strong> and
              they'll appear here.
            </p>
          </div>
        )}
      </section>

      {hasAcquiredItems && (
        <section className="zuhause-acquired-section">
          <h2>Acquired</h2>

          <div className="zuhause-acquired-list">
            {acquiredCategories.map((category) => (
              <p
                key={category.id}
                className="zuhause-acquired-category"
              >
                <strong>
                  {category.german} · {category.english}
                </strong>

                <span>
                  {category.items
                    .map(
                      (item) =>
                        `${item.german} · ${item.english}`
                    )
                    .join(", ")}
                </span>
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ZuhausePage;