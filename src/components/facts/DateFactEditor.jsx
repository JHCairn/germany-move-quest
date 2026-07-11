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
 * The browser's native date input remains responsible for
 * opening the platform date picker.
 *
 * The surrounding component owns the visible presentation so
 * the field has a consistent size and appearance across desktop
 * and mobile browsers.
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
    // Prevent the clear interaction from also opening the date
    // picker beneath the button.
    event.preventDefault();
    event.stopPropagation();

    onChange("");
  }

  return (
    <div
      className={`date-fact-editor-container ${
        currentValue ? "has-value" : "is-empty"
      } ${disabled ? "is-disabled" : ""}`}
    >
      <span
        className="date-fact-editor-display"
        aria-hidden="true"
      >
        {currentValue || emptyLabel}
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