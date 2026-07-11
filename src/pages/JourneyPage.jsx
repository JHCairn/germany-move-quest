import "./JourneyPage.css";

import { getGreeting } from "../utils/greeting";

import JourneyProgressCard from "../components/dashboard/JourneyProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";

/**
 * ============================================================
 * Germany Move Quest
 * Journey Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the user's journey dashboard from the derived Journey
 * Model.
 *
 * Persona selection lives in the shared Header because the
 * selected user is app-level state, not Journey-page state.
 *
 * Navigation remains owned by AppShell. JourneyPage receives
 * navigation callbacks and passes them to presentation components.
 */

function JourneyPage({
  journey,
  selectedUser,
  onGoToQuests,
}) {
  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>

        <h1>
          {getGreeting()}, {selectedUser.name}.
        </h1>
      </div>

      <div className="journey-grid">
        <JourneyProgressCard journey={journey.journeyProgress} />

        <RecommendationCard
          quest={journey.recommendedQuest}
          onGoToQuests={onGoToQuests}
        />

        <QuestProgressCard progress={journey.progress} />
      </div>
    </section>
  );
}

export default JourneyPage;