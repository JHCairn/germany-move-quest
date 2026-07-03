import "./JourneyPage.css";
import { getGreeting } from "../utils/greeting";

import { quests } from "../data/sampleQuests";
import StageCard from "../components/dashboard/StageCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";
import MilestonesCard from "../components/dashboard/MilestonesCard";
import { stages } from "../data/stages";

const currentStage = stages.find(
  (stage) => stage.id === "preparing"
);

function JourneyPage() {
  const applicableQuests = quests.filter((quest) => quest.applicable);

  const activeQuests = applicableQuests.filter(
    (quest) => quest.status === "active"
  );

  const nextQuests = applicableQuests.filter(
    (quest) => quest.status === "next"
  );

  const completedQuests = applicableQuests.filter(
    (quest) => quest.status === "completed"
  );
   

  return (
    <section className="journey-page">
      <div className="journey-header">
        <p className="journey-eyebrow">Your Journey</p>
        <h1>{getGreeting()}, Julie.</h1>
       </div>

      <div className="journey-grid">
        <StageCard stage={currentStage} />
        <ProgressCard />
        <RecommendationCard quests={activeQuests} />
        <QuestProgressCard quests={applicableQuests} />
        <MilestonesCard quests={nextQuests} />
      </div>
    </section>
  );
}

export default JourneyPage;