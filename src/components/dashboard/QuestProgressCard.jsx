import "./QuestProgressCard.css";

function QuestProgressCard({ progress }) {
  return (
    <article className="dashboard-card wide-card quest-progress-card">
      <p className="card-eyebrow">
        <span>Aufgaben</span>
        <span className="card-eyebrow-translation">
          Quest Progress
        </span>
      </p>

      <div className="quest-stage-progress-list">
        {progress.progressByStage.map((stage) => (
          <div
            className={`quest-stage-progress-row ${
              stage.isCurrent ? "current" : "upcoming"
            }`}
            key={stage.stageId}
          >
            <div className="quest-stage-progress-header">
              <div className="quest-stage-title">
                <strong>{stage.germanLabel}</strong>
                <span>· {stage.englishLabel}</span>
              </div>

              <span className="quest-stage-count">
                {stage.completedCount} / {stage.applicableCount}
              </span>
            </div>

            {stage.isCurrent && (
              <div className="quest-progress-bar">
                <div
                  className="quest-progress-fill"
                  style={{ width: `${stage.percentComplete}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default QuestProgressCard;
