import "./SelectFactEditor.css";

/**
 * ============================================================
 * Germany Move Quest
 * Select Fact Editor
 * ============================================================
 *
 * Responsibility
 * --------------
 * Edits a single value chosen from a fixed list of options.
 *
 * This component knows nothing about:
 * - user objects
 * - fact IDs
 * - About You
 * - quest applicability
 *
 * It simply renders the supplied options and reports the newly
 * selected value through onChange().
 */

function SelectFactEditor({
  value,
  options,
  onChange,
  disabled = false,
}) {
  return (
    <div
      className="select-fact-editor"
      role="group"
      aria-label="Choose an option"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`select-fact-option ${
            value === option.value ? "is-selected" : ""
          }`}
          aria-pressed={value === option.value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SelectFactEditor;