function QuestProgressCard({ progress }) {
  return (
    <article className="dashboard-card wide-card">
      <p className="card-eyebrow">Quest Progress</p>

      <h2>{progress.percentComplete}% Complete</h2>

      <p>
        {progress.completedQuests} of {progress.totalQuests} applicable quests
        completed.
      </p>

      <p>{progress.activeQuests} currently active.</p>
    </article>
  );
}

export default QuestProgressCard;