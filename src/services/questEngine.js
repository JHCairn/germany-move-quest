const stageOrder = [
  "preparing",
  "just-arrived",
  "settling-in",
  "living",
  "optional",
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

function sortByRecommendationOrder(a, b) {
  const priorityDifference =
    getPriorityScore(b.priority) - getPriorityScore(a.priority);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return (a.order ?? 999) - (b.order ?? 999);
}

function getRecommendedQuests(activeQuests, limit = 3) {
  return [...activeQuests].sort(sortByRecommendationOrder).slice(0, limit);
}

export function buildJourneyModel({ user, questCatalog, stages }) {
  const currentStageId = user.currentStageId;

  const applicableQuests = questCatalog.filter(
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

  const recommendedQuests = getRecommendedQuests(activeQuests);
  const recommendedQuest = recommendedQuests[0] ?? null;

  const totalQuests = applicableQuests.length;
  const completedCount = completedQuests.length;

  const progressByStage = stages.map((stage) => {
    const stageQuests = questCatalog.filter(
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
              (completedStageQuests.length / availableStageQuests.length) *
                100
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
    user,
    currentStage,
    journeyProgress,
    applicableQuests,
    activeQuests,
    upcomingMilestones,
    completedQuests,
    recommendedQuest,
    recommendedQuests,
    progress,
  };
}