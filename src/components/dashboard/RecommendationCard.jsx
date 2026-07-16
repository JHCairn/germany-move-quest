import "./RecommendationCard.css";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

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

        <div className="recommendation-empty">
          <h2>You're all caught up.</h2>

          <p>
            You've completed everything we currently recommend.
            You can still explore your Aufgaben or update your
            information at any time.
          </p>
        </div>

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

      <div className="recommendation-layout">
        <aside className="recommendation-context">
          <p className="recommendation-panel-label">
            Your current stage
          </p>

          {currentStage && (
            <>
              <p className="recommendation-stage-name">
                <strong>{currentStage.germanLabel}</strong>
                <span>{currentStage.englishLabel}</span>
              </p>

              <p className="recommendation-context-copy">
                This task is a good next step for your current
                stage.
              </p>
            </>
          )}
        </aside>

        <div className="recommendation-content">
          <h2>{quest.actionLabel}</h2>

          <p className="recommendation-quest-name">
            <strong>{quest.title}</strong>
            {quest.subtitle && <span>· {quest.subtitle}</span>}
          </p>

          <p className="recommendation-description">
            {quest.description}
          </p>

          <div className="recommendation-meta">
            <div className="recommendation-meta-item">
              <Clock3 size={17} aria-hidden="true" />

              <span>
                <strong>Usually takes</strong>
                {quest.estimatedTime}
              </span>
            </div>

            {quest.dueLabel && (
              <div className="recommendation-meta-item">
                <CalendarDays size={17} aria-hidden="true" />

                <span>
                  <strong>Timing</strong>
                  {quest.dueLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

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
