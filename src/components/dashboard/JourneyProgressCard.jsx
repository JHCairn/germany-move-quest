import "./JourneyProgressCard.css";

import { Check } from "lucide-react";

/**
 * ============================================================
 * Germany Move Quest
 * Journey Progress Card
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the user's progress through the high-level relocation
 * journey stages.
 *
 * Stage metadata (labels and icons) comes from the Stage Catalog
 * through the Journey Model.
 */

function JourneyProgressCard({ journey }) {
  const currentIndex = journey.stages.findIndex(
    (stage) => stage.id === journey.currentStageId
  );

  return (
    <article className="dashboard-card wide-card journey-progress-card">
      <p className="card-eyebrow">
        <span>Reise</span>
        <span className="card-eyebrow-translation">
          Journey Progress
        </span>
      </p>

      <div className="journey-timeline">
        {journey.stages.map((stage, index) => {
          const Icon = stage.icon;

          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          const iconSize = stage.id === "living" ? 32 : 28;

          return (
            <div className="timeline-stage" key={stage.id}>
              <div className="timeline-icon">
                <Icon
                  size={iconSize}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <div
                className={[
                  "timeline-marker",
                  isCompleted ? "completed" : "",
                  isCurrent ? "current" : "",
                ].join(" ")}
              >
                {isCompleted && (
                  <Check
                    size={12}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="timeline-label">
                <strong>{stage.germanLabel}</strong>
                <small>{stage.englishLabel}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="german-accent-line">
        <span className="black"></span>
        <span className="red"></span>
        <span className="gold"></span>
      </div>
    </article>
  );
}

export default JourneyProgressCard;
