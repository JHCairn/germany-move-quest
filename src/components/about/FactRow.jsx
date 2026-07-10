import "./FactRow.css";

/**
 * ============================================================
 * Germany Move Quest
 * Fact Row
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders one fact definition and its currently stored value.
 *
 * This first implementation is intentionally read-only. Editing
 * controls will be added here later so the page and section
 * components remain generic.
 */

function getDisplayValue(fact, value) {
  if (fact.type === "boolean") {
    if (value === true) {
      return "Yes";
    }

    if (value === false) {
      return "No";
    }

    return "Not answered";
  }

  if (fact.type === "select") {
    const selectedOption = fact.options?.find(
      (option) => option.value === value
    );

    return selectedOption?.label ?? "Not answered";
  }

  return value || "Not answered";
}

function FactRow({ fact, value }) {
  return (
    <div className="fact-row">
      <span className="fact-row-question">{fact.question}</span>

      <span className="fact-row-value">
        {getDisplayValue(fact, value)}
      </span>
    </div>
  );
}

export default FactRow;