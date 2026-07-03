function RecommendationCard({ quests = [] }) {
  const recommendation = quests[0];

  if (!recommendation) {
    return (
      <article className="dashboard-card wide-card">
        <p className="card-eyebrow">Recommended Next</p>
        <h2>You're all caught up.</h2>
        <p>No active quests need attention right now.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card wide-card">
      <p className="card-eyebrow">Recommended Next</p>

      <h2>{recommendation.actionLabel}</h2>

      <p>
        <strong>{recommendation.title}</strong> · {recommendation.subtitle}
      </p>

      <p>{recommendation.description}</p>

      <p>
        <strong>Estimated time:</strong> {recommendation.estimatedTime}
      </p>

      <small>{recommendation.dueLabel}</small>
    </article>
  );
}

export default RecommendationCard;