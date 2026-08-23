import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

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
  const canReopen = isCompleted && !quest.isCompletedByMilestone;
  const hasMoreInfo =
  Boolean(quest.guidance) ||
  (Array.isArray(quest.resources) && quest.resources.length > 0);
  const requiresMilestoneCompletion =
  quest.isCompletionControlledByMilestone && !isCompleted;

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

      {hasMoreInfo && (
  <details className="quest-card-more-info">
    <summary className="quest-card-more-info-summary">
      <span>More info</span>
      <ChevronDown
        className="quest-card-more-info-chevron"
        size={16}
        aria-hidden="true"
      />
    </summary>

    <div className="quest-card-more-info-content">
      {quest.guidance && (
  <div className="quest-card-guidance">
    {(Array.isArray(quest.guidance)
      ? quest.guidance
      : [quest.guidance]
    ).map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </div>
)}

      {Array.isArray(quest.resources) &&
        quest.resources.length > 0 && (
          <div className="quest-card-resources">
            {quest.resources.map((resource) => (
              <a
                key={resource.url}
                className="quest-card-resource"
                href={resource.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="quest-card-resource-heading">
                  <ExternalLink size={15} aria-hidden="true" />
                  <span>{resource.label}</span>
                </span>

                {resource.description && (
                  <span className="quest-card-resource-description">
                    {resource.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
    </div>
  </details>
)}

      <div className="quest-card-meta">
        <span>{quest.priority} priority</span>
        <span>{quest.estimatedTime}</span>
        {quest.dueLabel && <span>{quest.dueLabel}</span>}
      </div>

      <div className="quest-card-actions">
  {isCompleted ? (
    canReopen ? (
      <button
        type="button"
        className="quest-action-button quest-action-button-secondary"
        onClick={() => onReopen(quest.id)}
      >
        <span className="quest-action-primary">
          <RotateCcw size={16} aria-hidden="true" />
          <span>Wieder öffnen</span>
        </span>

        <span className="quest-action-translation">
          Reopen
        </span>
      </button>
    ) : (
      <p className="quest-derived-completion-note">
        {quest.derivedCompletionNote ??
          "Completed from a recorded milestone. If this did not happen, update the milestone under Reise."}
      </p>
    )
  ) : requiresMilestoneCompletion ? (
    <p className="quest-derived-completion-note">
      {quest.milestoneCompletionPrompt ??
        "Record the relevant actual milestone under Reise to complete this quest."}
    </p>
  ) : (
    <button
      type="button"
      className="quest-action-button quest-action-button-primary"
      onClick={() => onComplete(quest.id)}
    >
      <span className="quest-action-primary">
        <CheckCircle2 size={16} aria-hidden="true" />
        <span>Erledigen</span>
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
