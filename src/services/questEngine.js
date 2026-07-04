const stageOrder = [
  "preparing",
  "just-arrived",
  "settling-in",
  "living",
];

function isQuestAvailable(quest, currentStageId) {
  const currentIndex = stageOrder.indexOf(currentStageId);
  const questIndex = stageOrder.indexOf(quest.stage);

  return questIndex !== -1 && questIndex <= currentIndex;
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

  return [...activeQuests].sort(
    (a, b) => getPriorityScore(b.priority) - getPriorityScore(a.priority)
  )[0];
}

export function buildJourneyModel({ quests, stages, currentStageId }) {
  const applicableQuests = quests.filter(
    (quest) => quest.applicable && isQuestAvailable(quest, currentStageId)
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

  const progressByStage = stages.map((stage) => {
  const stageQuests = quests.filter(
    (quest) => quest.applicable && quest.stage === stage.id
  );

  const availableStageQuests = applicableQuests.filter(
    (quest) => quest.stage === stage.id
  );

  const completedStageQuests = availableStageQuests.filter(
    (quest) => quest.status === "completed"
  );

  return {
    stageId: stage.id,
    german: stage.german,
    english: stage.english,
    isCurrent: stage.id === currentStageId,
    applicableCount: availableStageQuests.length,
    totalStageQuestCount: stageQuests.length,
    completedCount: completedStageQuests.length,
    percentComplete:
      availableStageQuests.length === 0
        ? 0
        : Math.round(
            (completedStageQuests.length / availableStageQuests.length) * 100
          ),
  };
});

  const progress = {
    totalQuests,
    completedQuests: completedCount,
    activeQuests: activeQuests.length,
    percentComplete:
      totalQuests === 0
        ? 0
        : Math.round((completedCount / totalQuests) * 100),
    progressByStage,
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