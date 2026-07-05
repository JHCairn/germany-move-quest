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
 * This component consumes the presentation-ready quest produced
 * by the Quest Engine. It does not decide applicability, status,
 * priority, or recommendation order.
 */

function QuestCard({ quest }) {
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
    </article>
  );
}

export default QuestCard;