import "./JourneyProgressCard.css";

const stageIcons = {
  preparing: "🧳",
  "just-arrived": "🏠",
  "settling-in": "🛋️",
  living: "❤️",
};

function JourneyProgressCard({ journey }) {
  const currentIndex = journey.stages.findIndex(
    (stage) => stage.id === journey.currentStageId
  );

  return (
    <article className="dashboard-card wide-card journey-progress-card">
      <p className="card-eyebrow">Journey Progress</p>

      <div className="journey-timeline">
        {journey.stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div className="timeline-stage" key={stage.id}>
              <div className="timeline-icon">{stageIcons[stage.id]}</div>

              <div
                className={[
                  "timeline-marker",
                  isCompleted ? "completed" : "",
                  isCurrent ? "current" : "",
                ].join(" ")}
              >
                {isCompleted ? "✓" : ""}
              </div>

              <div className="timeline-label">
                <strong>{stage.german}</strong>
                <small>{stage.english}</small>
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