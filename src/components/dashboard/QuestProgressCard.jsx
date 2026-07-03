function QuestProgressCard({ quests = [] }) {
  const totalQuests = quests.length;

  const completedQuests = quests.filter(
    (quest) => quest.status === "completed"
  ).length;

  const activeQuests = quests.filter(
    (quest) => quest.status === "active"
  ).length;

  const percentComplete =
    totalQuests === 0
      ? 0
      : Math.round((completedQuests / totalQuests) * 100);

  return (
    <article className="dashboard-card wide-card">
      <p className="card-eyebrow">Quest Progress</p>

      <h2>{percentComplete}% Complete</h2>

      <p>
        {completedQuests} of {totalQuests} applicable quests completed.
      </p>

      <p>{activeQuests} currently active.</p>
    </article>
  );
}

export default QuestProgressCard;