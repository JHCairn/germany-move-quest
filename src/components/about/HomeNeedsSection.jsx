import "./HomeNeedsSection.css";

import ChoiceFactEditor from "../facts/ChoiceFactEditor";

import { homeNeeds } from "../../data/homeNeeds";

/**
 * ============================================================
 * Germany Move Quest
 * Home Needs Section
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the household items a user may choose to keep on their
 * Home Needs list.
 *
 * Available choices come from the Home Needs catalog.
 * Selected item IDs come from the user facts.
 *
 * This component does not:
 *
 * - own user state
 * - infer what the user owns
 * - track quantities
 * - track purchasing or ordering
 * - treat home items as quests
 */

function HomeNeedsSection({
  selectedItemIds = [],
  onUpdateFact,
}) {
  function handleChange(nextItemIds) {
    onUpdateFact("neededHomeItemIds", nextItemIds);
  }

  return (
    <section className="home-needs-section">
      <header className="home-needs-header">
        <h2>Wohnbedarf · Home Needs</h2>

        <p>
          Select any household items you need for your new home. 
          This list is optional, and you can update it whenever you like. 
          In Zuhause, you&apos;ll use it to keep track of the items you&apos;ve 
          acquired and the ones you still need.
        </p>
      </header>

      <div className="home-needs-categories">
        {homeNeeds.map((category) => (
          <section
            key={category.id}
            className="home-needs-category"
          >
            <h3>
              {category.german} · {category.english}
            </h3>

            <ChoiceFactEditor
              options={category.items}
              selectedValues={selectedItemIds}
              onChange={handleChange}
              ariaLabel={`Choose items needed for ${category.english}`}
            />
          </section>
        ))}
      </div>
    </section>
  );
}

export default HomeNeedsSection;