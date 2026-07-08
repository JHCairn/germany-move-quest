/**
 * ============================================================
 * Germany Move Quest
 * Toast
 * ============================================================
 *
 * Responsibility
 * --------------
 * Shows brief, non-modal feedback after a user action.
 *
 * Toasts are intentionally presentation-only. They do not store
 * facts, change quest state, or influence the Quest Engine.
 */

function Toast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;