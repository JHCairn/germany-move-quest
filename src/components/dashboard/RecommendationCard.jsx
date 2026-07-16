import "./RecommendationCard.css";

import { ArrowRight } from "lucide-react";

function RecommendationCard({
  quest,
  currentStage,
  onGoToQuests,
}) {
  if (!quest) {
    return (
      <article className="dashboard-card wide-card recommendation-card">
        <p className="card-eyebrow">
          <span>Nächster Schritt</span>
          <span className="card-eyebrow-translation">
            Recommended Next
          </span>
        </p>

        <h2>You're all caught up.</h2>

        <p>
          You've completed everything we currently recommend.
        </p>

        <p className="recommendation-description">
          You can still explore your Aufgaben or update your
          information at any time.
        </p>

        <button
          type="button"
          className="recommendation-button"
          onClick={onGoToQuests}
        >
          <span className="recommendation-button-primary">
            <ArrowRight size={16} aria-hidden="true" />
            <span>Zu den Aufgaben</span>
          </span>

          <span className="recommendation-button-translation">
            Go to Tasks
          </span>
        </button>
      </article>
    );
  }

  return (
    <article className="dashboard-card wide-card recommendation-card">
      <p className="card-eyebrow">
        <span>Nächster Schritt</span>
        <span className="card-eyebrow-translation">
          Recommended Next
        </span>
      </p>

      {currentStage && (
        <div className="recommendation-stage">
          <p className="recommendation-stage-label">
            Your current stage
          </p>

          <p className="recommendation-stage-name">
            <strong>{currentStage.germanLabel}</strong>
            <span>· {currentStage.englishLabel}</span>
          </p>

          <p className="recommendation-stage-context">
            This task is a good next step for your current stage.
          </p>
        </div>
      )}

      <h2>{quest.actionLabel}</h2>

      <p className="recommendation-quest-summary">
        <strong>{quest.title}</strong>
        {quest.subtitle && <span> · {quest.subtitle}</span>}
      </p>

      <p className="recommendation-description">
        {quest.description}
      </p>

      <p className="recommendation-estimate">
        <strong>Usually takes:</strong> {quest.estimatedTime}
      </p>

      {quest.dueLabel && (
        <small className="recommendation-due-label">
          {quest.dueLabel}
        </small>
      )}

      <button
        type="button"
        className="recommendation-button"
        onClick={onGoToQuests}
      >
        <span className="recommendation-button-primary">
          <ArrowRight size={16} aria-hidden="true" />
          <span>Zu den Aufgaben</span>
        </span>

        <span className="recommendation-button-translation">
          Go to Tasks
        </span>
      </button>
    </article>
  );
}

export default RecommendationCard;
