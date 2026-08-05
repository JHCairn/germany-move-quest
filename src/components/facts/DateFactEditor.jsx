import { useRef } from "react";

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
 * The visible control explicitly opens the native platform date
 * picker. The native input remains responsible for date entry,
 * validation, and change events.
 *
 * This component has no knowledge of:
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
  const inputRef = useRef(null);
  const currentValue = value ?? "";

  function openDatePicker() {
    if (disabled || !inputRef.current) {
      return;
    }

    const input = inputRef.current;

    input.focus();

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch (error) {
        console.warn(
          "The native date picker could not be opened directly.",
          error
        );
      }
    }

    input.click();
  }

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

  function handleClear() {
    onChange("");
  }

  return (
    <div
      className={`date-fact-editor-container ${
        disabled ? "is-disabled" : ""
      }`}
    >
      <button
        type="button"
        className="date-fact-editor-trigger"
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={openDatePicker}
      >
        <span className="date-fact-editor-display">
          {currentValue
            ? formatDisplayDate(currentValue)
            : emptyLabel}
        </span>
      </button>

      <input
        ref={inputRef}
        className="date-fact-editor-input"
        type="date"
        value={currentValue}
        disabled={disabled}
        min={min}
        max={max}
        tabIndex={-1}
        aria-hidden="true"
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