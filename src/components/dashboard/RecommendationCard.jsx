function RecommendationCard({ quest }) {
  if (!quest) {
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

      <h2>{quest.actionLabel}</h2>

      <p>
        <strong>{quest.title}</strong> · {quest.subtitle}
      </p>

      <p>{quest.description}</p>

      <p>
        <strong>Estimated time:</strong> {quest.estimatedTime}
      </p>

      <small>{quest.dueLabel}</small>
    </article>
  );
}

export default RecommendationCard;