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
 * - quest applicability
 * - React state ownership
 *
 * It simply receives a value and reports the next value through
 * onChange().
 */

function DateFactEditor({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <input
      className="date-fact-editor"
      type="date"
      value={value ?? ""}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default DateFactEditor;