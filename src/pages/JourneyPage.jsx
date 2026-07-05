import "./JourneyPage.css";

import { getGreeting } from "../utils/greeting";

import JourneyProgressCard from "../components/dashboard/JourneyProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";

import PersonaSwitcher from "../components/developer/PersonaSwitcher";

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
 * The page no longer builds the Journey Model itself. That allows
 * other pages to share the same selected test persona.
 */

function JourneyPage({
  journey,
  users,
  selectedUser,
  selectedUserId,
  onSelectedUserChange,
}) {
  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>

        <h1>
          {getGreeting()}, {selectedUser.name}.
        </h1>

        <PersonaSwitcher
          users={users}
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          onChange={onSelectedUserChange}
        />
      </div>

      <div className="journey-grid">
        <JourneyProgressCard journey={journey.journeyProgress} />
        <RecommendationCard quest={journey.recommendedQuest} />
        <QuestProgressCard progress={journey.progress} />
        
      </div>
    </section>
  );
}

export default JourneyPage;