import "./FactRow.css";

import BooleanFactEditor from "../facts/BooleanFactEditor";
import SelectFactEditor from "../facts/SelectFactEditor";
import DateFactEditor from "../facts/DateFactEditor";

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
 * FactRow selects the correct editor based on the Fact Catalog.
 * It does not own user state.
 *
 * Layout responsibility
 * ---------------------
 * FactRow owns the space allocated to editors so all fact types
 * align consistently.
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

      case "select":
        return (
          <SelectFactEditor
            value={value}
            options={fact.options}
            onChange={(newValue) => onUpdateFact(fact.id, newValue)}
          />
        );

      case "date":
        return (
          <DateFactEditor
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

      <div className="fact-row-editor">
        {renderEditor()}
      </div>
    </div>
  );
}

export default FactRow;