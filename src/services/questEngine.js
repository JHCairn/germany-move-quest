const stageOrder = [
    "planning",
    "preparing",
    "just-arrived",
    "settling-in",
    "established",
];

function isQuestAvailable(quest, currentStageId) {
    const currentIndex = stageOrder.indexOf(currentStageId);
    const questIndex = stageOrder.indexOf(quest.stage);

    return questIndex <= currentIndex;
}

function getPriorityScore(priority) {
    if (priority === "high") return 3;
    if (priority === "medium") return 2;
    if (priority === "low") return 1;

    return 0;
}

function getRecommendedQuest(activeQuests) {
    if (activeQuests.length === 0) {
        return null;
    }

    return [...activeQuests].sort((a, b) => {
        return getPriorityScore(b.priority) - getPriorityScore(a.priority);
    })[0];
}

export function buildJourneyModel({ quests, stages, currentStageId }) {
    const applicableQuests = quests.filter(
        (quest) =>
            quest.applicable &&
            isQuestAvailable(quest, currentStageId)
    );

    const activeQuests = applicableQuests.filter(
        (quest) => quest.status === "active"
    );

    const upcomingMilestones = applicableQuests.filter(
        (quest) => quest.status === "next"
    );

    const completedQuests = applicableQuests.filter(
        (quest) => quest.status === "completed"
    );

    const currentStage = stages.find((stage) => stage.id === currentStageId);

    const recommendedQuest = getRecommendedQuest(activeQuests);

    const totalQuests = applicableQuests.length;
    const completedCount = completedQuests.length;

 

const progress = {
  totalQuests,
  completedQuests: completedCount,
  activeQuests: activeQuests.length,
  percentComplete:
    totalQuests === 0
      ? 0
      : Math.round((completedCount / totalQuests) * 100),
};

const journeyProgress = {
  currentStageId,
  totalStages: stages.length,
  stages,
};




    return {
  currentStage,
  journeyProgress,
  applicableQuests,
  activeQuests,
  upcomingMilestones,
  completedQuests,
  recommendedQuest,
  progress,
};
}