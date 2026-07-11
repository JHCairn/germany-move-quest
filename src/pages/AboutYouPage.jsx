import "./AboutYouPage.css";

import FactSection from "../components/about/FactSection";
import { factSectionCatalog } from "../data/factSectionCatalog";

/**
 * ============================================================
 * Germany Move Quest
 * About You Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the user facts defined by the Fact Catalog.
 *
 * The Fact Section Catalog controls:
 * - section display order
 * - German section labels
 * - English section labels
 *
 * The Fact Catalog controls:
 * - which facts exist
 * - which section each fact belongs to
 *
 * This page assembles those catalogs for presentation. It does
 * not define facts, section labels, or quest applicability.
 *
 * Architecture
 * ------------
 *
 * Catalogs
 *     ↓
 * User Facts
 *     ↓
 * Actions
 *     ↓
 * Quest Engine
 *     ↓
 * Journey Model
 *     ↓
 * Presentation
 *
 * Architectural principle:
 * Store facts. Derive everything else.
 */

function AboutYouPage({
  facts,
  userFacts,
  onUpdateFact,
}) {
  return (
    <section className="about-you-page">
      <header className="about-you-header">
        <p className="about-you-eyebrow">
          Über mich · About You
        </p>

        <h1>Help us personalize your journey</h1>

        <p>
          Your answers help us show only the quests and guidance that
          apply to your situation. You can update them at any time as
          your circumstances change.
        </p>
      </header>

      <div className="about-you-sections">
        {factSectionCatalog.map((section) => {
          const sectionFacts = facts.filter(
            (fact) => fact.sectionId === section.id
          );

          if (sectionFacts.length === 0) {
            return null;
          }

          return (
            <FactSection
              key={section.id}
              section={section}
              facts={sectionFacts}
              userFacts={userFacts}
              onUpdateFact={onUpdateFact}
            />
          );
        })}
      </div>
    </section>
  );
}

export default AboutYouPage;