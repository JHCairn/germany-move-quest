import "./AboutYouPage.css";

import FactSection from "../components/about/FactSection";

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
 * The page does not define which facts exist and does not contain
 * quest applicability logic. It receives fact definitions and the
 * selected user's stored answers, then delegates presentation to
 * generic fact components.
 *
 * Architecture
 * ------------
 *
 * Catalogs
 *     ↓
 * User Facts
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

function groupFactsBySection(facts) {
  return facts.reduce((sections, fact) => {
    const sectionName = fact.section ?? "Other";

    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }

    sections[sectionName].push(fact);

    return sections;
  }, {});
}

function AboutYouPage({
  facts,
  userFacts,
  onUpdateFact,
}) {
  const sections = groupFactsBySection(facts);

  return (
    <section className="about-you-page">
      <header className="about-you-header">
        <p className="about-you-eyebrow">
          Über mich · About You
        </p>

        <h1>Tell us about your situation</h1>

        <p>
          We use these answers to determine which quests are relevant to you.
        </p>
      </header>

      <div className="about-you-sections">
        {Object.entries(sections).map(
          ([sectionName, sectionFacts]) => (
            <FactSection
              key={sectionName}
              title={sectionName}
              facts={sectionFacts}
              userFacts={userFacts}
              onUpdateFact={onUpdateFact}
            />
          )
        )}
      </div>
    </section>
  );
}

export default AboutYouPage;