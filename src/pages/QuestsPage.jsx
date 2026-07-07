import "./QuestsPage.css";

import QuestCard from "../components/quests/QuestCard";

/**
 * ============================================================
 * Germany Move Quest
 * Quests Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the full quest workspace from the derived Journey Model.
 *
 * This page does not decide whether a quest is completed,
 * applicable, current, previous, or upcoming.
 *
 * It receives a derived journey model from the Quest Engine and
 * passes user intent back upward through callbacks.
 */

function QuestSection({
  title,
  description,
  quests,
  onCompleteQuest,
  onReopenQuest,
}) {
  if (quests.length === 0) {
    return null;
  }

  return (
    <section className="quest-section">
      <div className="quest-section-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <span>{quests.length} quests</span>
      </div>

      <div className="quest-list">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onComplete={onCompleteQuest}
            onReopen={onReopenQuest}
          />
        ))}
      </div>
    </section>
  );
}

function QuestsPage({ journey, onCompleteQuest, onReopenQuest }) {
  return (
    <section className="quests-page">
      <div className="quests-header">
        <p className="journey-eyebrow">Quests</p>
        <h1>Aufgaben für deinen Umzug</h1>
        <p>
          Review active, remaining, upcoming, and completed quests for this test
          persona.
        </p>
      </div>

      <QuestSection
        title="Current Stage"
        description="Quests that match the current journey stage."
        quests={journey.currentStageQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
      />

      <QuestSection
        title="Previous Stages"
        description="Earlier-stage quests that are still incomplete."
        quests={journey.previousStageQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
      />

      <QuestSection
        title="Upcoming"
        description="Future quests to keep on the radar."
        quests={journey.upcomingQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
      />

      <QuestSection
        title="Completed"
        description="Quests already marked as finished."
        quests={journey.completedQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
      />
    </section>
  );
}

export default QuestsPage;