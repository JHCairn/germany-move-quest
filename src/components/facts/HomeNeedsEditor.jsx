import "./HomeNeedsEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Home Needs Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Edits a collection of Home Needs values.
 *
 *  */

function HomeNeedsEditor({
  options = [],
  selectedValues = [],
  onChange,
  disabled = false,
  ariaLabel = "Choose one or more options",
}) {
  function handleToggle(optionId) {
    const isSelected = selectedValues.includes(optionId);

    const nextValues = isSelected
      ? selectedValues.filter((value) => value !== optionId)
      : [...selectedValues, optionId];

    onChange(nextValues);
  }

  return (
    <div
      className="choice-fact-editor"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            className={`choice-fact-option ${
              isSelected ? "is-selected" : ""
            }`}
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => handleToggle(option.id)}
          >
            <span
              className="choice-fact-check"
              aria-hidden="true"
            >
              {isSelected ? "✓" : ""}
            </span>

            <span className="choice-fact-label">
              <span className="choice-fact-label-english">
                {option.english}
              </span>

              {option.german && (
                <span className="choice-fact-label-german">
                  {option.german}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default HomeNeedsEditor;