/**
 * ============================================================
 * Germany Move Quest
 * Test Persona Switcher
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the currently selected test persona and allows
 * developers to switch between representative users.
 *
 * This component intentionally contains no business logic.
 *
 * Consumes:
 *   - Test personas
 *
 * Produces:
 *   - Selected persona ID
 */

function PersonaSwitcher({ users, selectedUserId, selectedUser, onChange }) {
  return (
    <section className="developer-tools">
      <div className="developer-tools-row">
        <label htmlFor="persona-select">Test Persona</label>

        <select
          id="persona-select"
          value={selectedUserId}
          onChange={(event) => onChange(event.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {selectedUser.testPersona && (
        <p className="developer-persona-description">
          {selectedUser.testPersona}
        </p>
      )}
    </section>
  );
}

export default PersonaSwitcher;