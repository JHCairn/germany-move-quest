import "./RecommendationCard.css";

function RecommendationCard({
  quest,
  onGoToQuests,
}) {
  if (!quest) {
    return (
      <article className="dashboard-card wide-card">
        <p className="card-eyebrow">Recommended Next</p>

        <h2>You're all caught up.</h2>

        <p>No active quests need attention right now.</p>

        <button
          type="button"
          className="recommendation-button"
          onClick={onGoToQuests}
        >
          Go to Quests
        </button>
      </article>
    );
  }

  return (
    <article className="dashboard-card wide-card">
      <p className="card-eyebrow">Recommended Next</p>

      <h2>{quest.actionLabel}</h2>

      <p>
        <strong>{quest.title}</strong> · {quest.subtitle}
      </p>

      <p className="recommendation-description">
        {quest.description}
      </p>

      <p className="recommendation-estimate">
        <strong>Estimated time:</strong> {quest.estimatedTime}
      </p>

      <small className="recommendation-due-label">
        {quest.dueLabel}
      </small>

      <button
        type="button"
        className="recommendation-button"
        onClick={onGoToQuests}
      >
        Go to Quests
      </button>
    </article>
  );
}

export default RecommendationCard;