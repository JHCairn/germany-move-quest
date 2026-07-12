import "./JourneyPage.css";

import PageIntro from "../components/common/PageIntro";

import { icons } from "../data/icons";

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
  onGoToQuests,
}) {
  return (
    <section className="journey-page">
      <PageIntro
        icon={icons.journey}
        title="Reise"
        subtitle="See where you are in your relocation journey and what comes next."
      />

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