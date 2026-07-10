import "./BooleanFactEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Boolean Fact Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Edits a single boolean value.
 *
 * This component has no knowledge of:
 *
 * - the user object
 * - fact IDs
 * - About You
 * - quest applicability
 * - React state ownership
 *
 * It simply receives a value and reports the next value through
 * onChange().
 */

function BooleanFactEditor({
  value,
  onChange,
  trueLabel = "Yes",
  falseLabel = "No",
  disabled = false,
}) {
  return (
    <div
      className="boolean-fact-editor"
      role="group"
      aria-label="Choose yes or no"
    >
      <button
        type="button"
        className={`boolean-fact-option ${
          value === true ? "is-selected" : ""
        }`}
        aria-pressed={value === true}
        disabled={disabled}
        onClick={() => onChange(true)}
      >
        {trueLabel}
      </button>

      <button
        type="button"
        className={`boolean-fact-option ${
          value === false ? "is-selected" : ""
        }`}
        aria-pressed={value === false}
        disabled={disabled}
        onClick={() => onChange(false)}
      >
        {falseLabel}
      </button>
    </div>
  );
}

export default BooleanFactEditor;