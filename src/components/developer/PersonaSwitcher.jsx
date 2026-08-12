/**
 * ============================================================
 * Germany Move Quest
 * User / Test Persona Switcher
 * ============================================================
 *
 * Responsibility
 * --------------
 * Allows switching between the primary real user and representative
 * test personas.
 *
 * This component intentionally contains no business logic.
 */

function PersonaSwitcher({
  users,
  selectedUserId,
  primaryUserId,
  onChange,
}) {
  return (
    <section className="developer-tools">
      <div className="developer-tools-row">
        <select
          id="persona-select"
          value={selectedUserId}
          aria-label="Select user"
          onChange={(event) =>
            onChange(event.target.value)
          }
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
              {user.id === primaryUserId
                ? ""
                : " — Test"}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default PersonaSwitcher;