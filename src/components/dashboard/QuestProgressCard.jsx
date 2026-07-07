import "./QuestProgressCard.css";

function QuestProgressCard({ progress }) {
  return (
    <article className="dashboard-card wide-card quest-progress-card">
      <p className="card-eyebrow">Quest Progress</p>

      <div className="quest-stage-progress-list">
        {progress.progressByStage.map((stage) => {
          const questLabel =
            stage.totalStageQuestCount === 1 ? "quest" : "quests";

          return (
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
                  {stage.isCurrent
                    ? `${stage.completedCount} / ${stage.applicableCount}`
                    : `${stage.stageDisplayLabel} · ${stage.totalStageQuestCount} quests`}
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
          );
        })}
      </div>
    </article>
  );
}

export default QuestProgressCard;