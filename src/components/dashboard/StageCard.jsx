function StageCard({ stage }) {
  return (
    <article className="dashboard-card">
      <p className="card-eyebrow">Current Stage</p>

      <h2>{stage.german}</h2>
      <h2>{stage.english}</h2>

      <p>{stage.description}</p>
    </article>
  );
}

export default StageCard;