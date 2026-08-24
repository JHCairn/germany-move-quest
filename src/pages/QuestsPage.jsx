import { useState } from "react";

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
 *
 * Quest search is presentation-only. It filters the already
 * derived quest lists and does not change or persist user data.
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
  const [questSearch, setQuestSearch] = useState("");

  const normalizedQuestSearch = questSearch.trim().toLowerCase();

  const matchesQuestSearch = (quest) => {
    if (!normalizedQuestSearch) {
      return true;
    }

    const guidanceText = Array.isArray(quest.guidance)
      ? quest.guidance.join(" ")
      : quest.guidance ?? "";

    const searchableText = [
      quest.title,
      quest.subtitle,
      quest.description,
      guidanceText,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuestSearch);
  };

  const filteredCurrentStageQuests =
    journey.currentStageQuests.filter(matchesQuestSearch);

  const filteredPreviousStageQuests =
    journey.previousStageQuests.filter(matchesQuestSearch);

  const filteredUpcomingQuests =
    journey.upcomingQuests.filter(matchesQuestSearch);

  const filteredCompletedQuests =
    journey.completedQuests.filter(matchesQuestSearch);

  const showCurrent =
    filteredCurrentStageQuests.length > 0 ||
    filteredPreviousStageQuests.length > 0;

  const showUpcoming = filteredUpcomingQuests.length > 0;
  const showCompleted = filteredCompletedQuests.length > 0;

  const hasSearchResults =
    showCurrent || showUpcoming || showCompleted;

  return (
    <section className="quests-page">
      <PageIntro
        icon={icons.quests}
        title="Aufgaben"
        subtitle="Complete the tasks that move your journey forward."
      />

      <details className="quest-resource-note">
        <summary>About these resources</summary>

        <div className="quest-resource-note-content">
          Resources are provided as helpful starting points and are not exhaustive.
          We aim to use reliable, current sources, but local requirements and services
          can vary. Verify important details with the responsible authority or provider.
        </div>
      </details>

      <div className="quest-search">
        <label htmlFor="quest-search-input">
          Find a quest
        </label>

        <div className="quest-search-control">
          <input
            id="quest-search-input"
            type="search"
            value={questSearch}
            onChange={(event) => setQuestSearch(event.target.value)}
            placeholder="Search quests..."
          />

          {questSearch && (
            <button
              type="button"
              onClick={() => setQuestSearch("")}
              aria-label="Clear quest search"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {normalizedQuestSearch && !hasSearchResults && (
        <div className="quest-search-empty">
          <strong>No matching quests</strong>
          <span>Try another search term.</span>
        </div>
      )}

      <QuestSection
        id="current-quests"
        navSection="current"
        title="Current Stage"
        description="Erledigt? (Completed?) Tap Erledigen once you've completed this task."
        quests={filteredCurrentStageQuests}
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
        quests={filteredPreviousStageQuests}
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
        quests={filteredUpcomingQuests}
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
        quests={filteredCompletedQuests}
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