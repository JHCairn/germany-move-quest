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
 * The dashboard answers "what should I do next?"
 * This page answers "show me all of my quests."
 */

function QuestSection({ title, description, quests }) {
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
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </section>
  );
}

function QuestsPage({ journey }) {
  const remainingQuests = journey.activeQuests.filter(
    (quest) => quest.stage !== journey.currentStage?.id
  );

  const currentStageQuests = journey.activeQuests.filter(
    (quest) => quest.stage === journey.currentStage?.id
  );

  return (
    <section className="quests-page">
      <div className="quests-header">
        <p className="journey-eyebrow">Quests</p>
        <h1>Aufgaben für deinen Umzug</h1>
        <p>
          Review active, remaining, upcoming, and completed quests for this
          test persona.
        </p>
      </div>

      <QuestSection
        title="Active"
        description="Quests that match the current journey stage."
        quests={currentStageQuests}
      />

      <QuestSection
        title="Remaining"
        description="Earlier-stage quests that are still incomplete."
        quests={remainingQuests}
      />

      <QuestSection
        title="Upcoming"
        description="Future quests to keep on the radar."
        quests={journey.upcomingQuests}
      />

      <QuestSection
        title="Completed"
        description="Quests already marked as finished."
        quests={journey.completedQuests}
      />
    </section>
  );
}

export default QuestsPage;