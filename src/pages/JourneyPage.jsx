import "./JourneyPage.css";
import { getGreeting } from "../utils/greeting";

import { questCatalog } from "../data/questCatalog";
import { stages } from "../data/stages";
import { buildJourneyModel } from "../services/questEngine";
import { defaultUser } from "../data/users";

import JourneyProgressCard from "../components/dashboard/JourneyProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";
import MilestonesCard from "../components/dashboard/MilestonesCard";

function JourneyPage() {
const journey = buildJourneyModel({
  user: defaultUser,
  questCatalog,
  stages,
});

  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>
        <h1>{getGreeting()}, Julie.</h1>
      </div>

      <div className="journey-grid">
        <JourneyProgressCard journey={journey.journeyProgress} />
        <RecommendationCard quest={journey.recommendedQuest} />
        <QuestProgressCard progress={journey.progress} />
        <MilestonesCard quests={journey.upcomingMilestones} />
      </div>
    </section>
  );
}

export default JourneyPage;