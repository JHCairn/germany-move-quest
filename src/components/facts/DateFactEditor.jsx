import "./DateFactEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Date Fact Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Generic editor for a single date value.
 *
 * Responsibilities:
 * - Opens the native platform date picker
 * - Displays a friendly formatted date
 * - Supports optional min/max constraints
 * - Allows the date to be cleared
 *
 * It has no knowledge of:
 *
 * - milestones
 * - About You
 * - quests
 * - the user model
 */

function formatDisplayDate(value) {
  if (!value) {
    return "";
  }

  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts.map(Number);

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

  function handleClear(event) {
    event.preventDefault();
    event.stopPropagation();

    onChange("");
  }

  return (
    <div
      className={`date-fact-editor-container ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <span
        className="date-fact-editor-display"
        aria-hidden="true"
      >
        {currentValue
          ? formatDisplayDate(currentValue)
          : emptyLabel}
      </span>

      <input
        className="date-fact-editor-input"
        type="date"
        value={currentValue}
        disabled={disabled}
        min={min}
        max={max}
        aria-label={ariaLabel}
        onChange={handleChange}
      />

      {currentValue && !disabled && (
        <button
          type="button"
          className="date-fact-editor-clear"
          aria-label={`Clear ${ariaLabel}`}
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