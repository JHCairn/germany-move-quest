/**
 * ============================================================
 * Germany Move Quest
 * Quest Card
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders a single derived quest.
 *
 * This component does not know how completion is stored.
 * It does not update user facts directly.
 * It simply exposes the user's intent through callbacks.
 */

function QuestCard({ quest, onComplete, onReopen }) {
  const isCompleted = quest.state === "completed";

  return (
    <article className={`quest-card quest-card-${quest.state}`}>
      <div className="quest-card-header">
        <div>
          <p className="quest-card-eyebrow">{quest.stage}</p>
          <h3>{quest.title}</h3>
          <p>{quest.subtitle}</p>
        </div>

        <span className="quest-state-pill">{quest.state}</span>
      </div>

      <p className="quest-card-description">{quest.description}</p>

      <div className="quest-card-meta">
        <span>{quest.priority} priority</span>
        <span>{quest.estimatedTime}</span>
        {quest.dueLabel && <span>{quest.dueLabel}</span>}
      </div>

      <div className="quest-card-actions">
        {isCompleted ? (
          <button
            type="button"
            className="quest-action-button quest-action-button-secondary"
            onClick={() => onReopen(quest.id)}
          >
            <span className="quest-action-primary">
              ↺ Wieder öffnen
            </span>

            <span className="quest-action-translation">
              Reopen
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="quest-action-button quest-action-button-primary"
            onClick={() => onComplete(quest.id)}
          >
            <span className="quest-action-primary">
              ✓ Erledigen
            </span>

            <span className="quest-action-translation">
              Complete
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

export default QuestCard;