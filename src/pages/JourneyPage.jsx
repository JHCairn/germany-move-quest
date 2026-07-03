import "./JourneyPage.css";
import { getGreeting } from "../utils/greeting";

import { quests } from "../data/sampleQuests";
import { stages } from "../data/stages";
import { buildJourneyModel } from "../services/questEngine";

import StageCard from "../components/dashboard/StageCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";
import MilestonesCard from "../components/dashboard/MilestonesCard";

function JourneyPage() {
  const journey = buildJourneyModel({
    quests,
    stages,
    currentStageId: "preparing",
  });

  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>
        <h1>{getGreeting()}, Julie.</h1>
      </div>

      <div className="journey-grid">
        <StageCard stage={journey.currentStage} />
        <ProgressCard />
        <RecommendationCard quest={journey.recommendedQuest} />
        <QuestProgressCard progress={journey.progress} />
        <MilestonesCard quests={journey.upcomingMilestones} />
      </div>
    </section>
  );
}

export default JourneyPage;