import { useMemo, useState } from "react";

import "./JourneyPage.css";

import { getGreeting } from "../utils/greeting";

import { questCatalog } from "../data/questCatalog";
import { stages } from "../data/stages";
import { users, defaultUser } from "../data/users";

import { buildJourneyModel } from "../services/questEngine";

import JourneyProgressCard from "../components/dashboard/JourneyProgressCard";
import RecommendationCard from "../components/dashboard/RecommendationCard";
import QuestProgressCard from "../components/dashboard/QuestProgressCard";
import MilestonesCard from "../components/dashboard/MilestonesCard";

import PersonaSwitcher from "../components/developer/PersonaSwitcher";

/**
 * ============================================================
 * Germany Move Quest
 * Journey Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Select the active test persona and build the user's Journey
 * Model from that persona's facts.
 *
 * This page deliberately contains almost no business logic.
 *
 * Consumes:
 *   - User facts
 *   - Quest Catalog
 *   - Stages
 *
 * Produces:
 *   - Dashboard UI from the derived Journey Model
 */

function JourneyPage() {
  const [selectedUserId, setSelectedUserId] = useState(defaultUser.id);

  const selectedUser =
    users.find((user) => user.id === selectedUserId) ?? defaultUser;

  const journey = useMemo(
    () =>
      buildJourneyModel({
        user: selectedUser,
        questCatalog,
        stages,
      }),
    [selectedUser]
  );

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
          onChange={setSelectedUserId}
        />
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