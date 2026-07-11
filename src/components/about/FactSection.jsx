import FactRow from "./FactRow";

import "./FactSection.css";

/**
 * ============================================================
 * Germany Move Quest
 * Fact Section
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders one conceptual group of user facts.
 *
 * Section membership comes from the Fact Catalog.
 * Section labels come from the Fact Section Catalog.
 *
 * This component remains presentation only. It does not decide:
 * - which facts belong in the section
 * - where the section appears
 * - how facts are stored
 */

function FactSection({
  section,
  facts,
  userFacts,
  onUpdateFact,
}) {
  return (
    <section className="fact-section">
      <h2>
        {section.german} · {section.english}
      </h2>

      <div className="fact-section-rows">
        {facts.map((fact) => (
          <FactRow
            key={fact.id}
            fact={fact}
            value={userFacts?.[fact.id]}
            onUpdateFact={onUpdateFact}
          />
        ))}
      </div>
    </section>
  );
}

export default FactSection;