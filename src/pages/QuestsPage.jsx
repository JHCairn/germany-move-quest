import "./QuestsPage.css";

import PageIntro from "../components/common/PageIntro";
import { icons } from "../data/icons";

import QuestCard from "../components/quests/QuestCard";
import QuestSectionNav from "../components/quests/QuestSectionNav";

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
  id,
  navSection,
  title,
  description,
  quests,
  onCompleteQuest,
  onReopenQuest,
  showCurrent,
  showUpcoming,
  showCompleted,
  showNavigation = false,
}) {
  if (quests.length === 0) {
    return null;
  }

  return (
    <section className="quest-section" id={id}>
      <div className="quest-section-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>

          {showNavigation && (
            <QuestSectionNav
              currentSection={navSection}
              showCurrent={showCurrent}
              showUpcoming={showUpcoming}
              showCompleted={showCompleted}
            />
          )}
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

function QuestsPage({
  journey,
  onCompleteQuest,
  onReopenQuest,
}) {
  const showCurrent =
    journey.currentStageQuests.length > 0 ||
    journey.previousStageQuests.length > 0;

  const showUpcoming = journey.upcomingQuests.length > 0;
  const showCompleted = journey.completedQuests.length > 0;

  return (
    <section className="quests-page">
      <PageIntro
        icon={icons.quests}
        title="Aufgaben"
        subtitle="Complete the tasks that move your journey forward."
      />

      <QuestSection
        id="current-quests"
        navSection="current"
        title="Current Stage"
        description="Erledigt? (Completed?) Tap Erledigen once you've completed this task."
        quests={journey.currentStageQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
        showCurrent={showCurrent}
        showUpcoming={showUpcoming}
        showCompleted={showCompleted}
        showNavigation
      />

      <QuestSection
        title="Previous Stages"
        description="Erledigt? (Completed?) Tap Erledigen once you've completed this task."
        quests={journey.previousStageQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
        showCurrent={showCurrent}
        showUpcoming={showUpcoming}
        showCompleted={showCompleted}
      />

      <QuestSection
        id="upcoming-quests"
        navSection="upcoming"
        title="Upcoming"
        description="Erledigt? (Completed?) Tap Erledigen once you've completed this task."
        quests={journey.upcomingQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
        showCurrent={showCurrent}
        showUpcoming={showUpcoming}
        showCompleted={showCompleted}
        showNavigation
      />

      <QuestSection
        id="completed-quests"
        navSection="completed"
        title="Completed"
        description="Nicht mehr erledigt? (No longer completed?) Tap Wieder öffnen if it still needs your attention."
        quests={journey.completedQuests}
        onCompleteQuest={onCompleteQuest}
        onReopenQuest={onReopenQuest}
        showCurrent={showCurrent}
        showUpcoming={showUpcoming}
        showCompleted={showCompleted}
        showNavigation
      />
    </section>
  );
}

export default QuestsPage;
