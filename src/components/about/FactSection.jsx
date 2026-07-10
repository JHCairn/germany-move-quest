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
 * Section membership comes from the Fact Catalog. This component
 * does not decide which facts belong together.
 */

function FactSection({
  title,
  facts,
  userFacts,
  onUpdateFact,
}) {
  return (
    <section className="fact-section">
      <h2>{title}</h2>

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