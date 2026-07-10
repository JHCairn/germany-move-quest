import "./FactRow.css";

import BooleanFactEditor from "../facts/BooleanFactEditor";

/**
 * ============================================================
 * Germany Move Quest
 * Fact Row
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders one fact definition together with the appropriate editor
 * for that fact type.
 *
 * FactRow decides which editor to render based on the Fact Catalog.
 * It does not own user state and does not understand the structure
 * of the user object.
 */

function getDisplayValue(fact, value) {
  if (fact.type === "select") {
    const selectedOption = fact.options?.find(
      (option) => option.value === value
    );

    return selectedOption?.label ?? "Not answered";
  }

  return value || "Not answered";
}

function FactRow({ fact, value, onUpdateFact }) {
  function renderEditor() {
    switch (fact.type) {
      case "boolean":
        return (
          <BooleanFactEditor
            value={value}
            onChange={(newValue) => onUpdateFact(fact.id, newValue)}
          />
        );

      default:
        return (
          <span className="fact-row-value">
            {getDisplayValue(fact, value)}
          </span>
        );
    }
  }

  return (
    <div className="fact-row">
      <span className="fact-row-question">
        {fact.question}
      </span>

      {renderEditor()}
    </div>
  );
}

export default FactRow;