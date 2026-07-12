import "./ChoiceFactEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Choice Fact Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Edits a collection of selected values.
 *
 * This component has no knowledge of:
 *
 * - the user object
 * - Home Needs
 * - fact IDs
 * - About You
 * - quest applicability
 * - React state ownership
 *
 * It simply receives selected values and reports the next
 * collection through onChange().
 */

function ChoiceFactEditor({
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

export default ChoiceFactEditor;