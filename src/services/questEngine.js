export function buildJourneyModel({ quests, stages, currentStageId }) {
  const applicableQuests = quests.filter((quest) => quest.applicable);

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

  const recommendedQuest = activeQuests[0] ?? null;

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

  return {
    currentStage,
    applicableQuests,
    activeQuests,
    upcomingMilestones,
    completedQuests,
    recommendedQuest,
    progress,
  };
}