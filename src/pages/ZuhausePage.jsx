import { RotateCcw } from "lucide-react";

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
 * This page derives its presentation from those stored facts and
 * exposes acquisition intent through callbacks.
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
  onAcquireHomeItem,
  onMarkHomeItemNeeded,
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

      <section className="zuhause-needed-section">
        <div className="zuhause-section-heading">
          <h2 className="zuhause-section-title">
            Still needed
          </h2>

          <p className="zuhause-section-instruction">
            <strong>Erledigt?</strong> Tap an item once
            you&apos;ve acquired it.
          </p>
        </div>

        <div className="zuhause-section">
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
                      <button
                        key={item.id}
                        type="button"
                        className="zuhause-needed-item"
                        onClick={() =>
                          onAcquireHomeItem(item.id)
                        }
                      >
                        {item.german} · {item.english}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="zuhause-empty-state">
              <h3>Great! You&apos;ve acquired everything you&apos;re currently tracking.</h3>

              <p>
                You&apos;re not currently tracking any home
                needs. Add some in{" "}
                <strong>Über mich</strong> and they&apos;ll
                appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {hasAcquiredItems && (
        <section className="zuhause-acquired-section">
          <div className="zuhause-section-heading">
            <h2 className="zuhause-section-title">
              Acquired
            </h2>

            <p className="zuhause-section-instruction">
              <strong>Noch benötigt?</strong> Tap if you still need it.
            </p>
          </div>

          <div className="zuhause-acquired-categories">
            {acquiredCategories.map((category) => (
              <section
                key={category.id}
                className="zuhause-acquired-category"
              >
                <h3>
                  {category.german} · {category.english}
                </h3>

                <div className="zuhause-acquired-items">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="zuhause-acquired-item"
                      onClick={() =>
                        onMarkHomeItemNeeded(item.id)
                      }
                      aria-label={`Mark ${item.english} as needed again`}
                    >
                      <span>
                        {item.german} · {item.english}
                      </span>

                      <RotateCcw
                        size={15}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ZuhausePage;
