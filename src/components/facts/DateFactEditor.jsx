import "./DateFactEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Date Fact Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Edits a single date value.
 *
 * This component has no knowledge of:
 *
 * - the user object
 * - fact IDs
 * - About You
 * - milestones
 * - planned versus actual dates
 * - quest applicability
 * - React state ownership
 *
 * It simply receives a value and reports the next valid value
 * through onChange().
 *
 * Date values use the browser-standard YYYY-MM-DD format, so
 * minimum and maximum values can be compared directly without
 * parsing them into JavaScript Date objects.
 */

function DateFactEditor({
  value,
  onChange,
  disabled = false,
  min,
  max,
  ariaLabel = "Date",
  emptyLabel = "Select date",
}) {
  const currentValue = value ?? "";

  function handleChange(event) {
    const newValue = event.target.value;

    // An empty value is valid because users must always be able
    // to clear a previously entered date.
    if (!newValue) {
      onChange("");
      return;
    }

    if (min && newValue < min) {
      return;
    }

    if (max && newValue > max) {
      return;
    }

    onChange(newValue);
  }

  function handleClear() {
    onChange("");
  }

  return (
    <div
      className={`date-fact-editor-container ${
        currentValue ? "has-value" : "is-empty"
      }`}
    >
      <input
        className="date-fact-editor"
        type="date"
        value={currentValue}
        disabled={disabled}
        min={min}
        max={max}
        aria-label={ariaLabel}
        onChange={handleChange}
      />

      {!currentValue && (
        <span
          className="date-fact-editor-placeholder"
          aria-hidden="true"
        >
          {emptyLabel}
        </span>
      )}

      {currentValue && !disabled && (
        <button
          className="date-fact-editor-clear"
          type="button"
          aria-label={`Clear ${ariaLabel.toLowerCase()}`}
          title="Clear date"
          onClick={handleClear}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default DateFactEditor;