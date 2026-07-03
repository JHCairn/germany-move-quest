function MilestonesCard({ quests = [] }) {
  return (
    <article className="dashboard-card wide-card">
      <p className="card-eyebrow">Upcoming Milestones</p>

      <h2>Things to keep on the radar</h2>

      {quests.length === 0 ? (
        <p>No upcoming milestones.</p>
      ) : (
        <div className="quest-list">
          {quests.map((quest) => (
            <div className="quest-item" key={quest.id}>
              <h3>{quest.title}</h3>
              <p>{quest.subtitle}</p>
              <small>{quest.dueLabel}</small>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default MilestonesCard;