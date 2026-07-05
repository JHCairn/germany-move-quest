/**
 * ============================================================
 * Germany Move Quest
 * Quest Engine
 * ============================================================
 *
 * The Quest Engine is the application's single source of truth
 * for deriving a user's journey.
 *
 * Inputs:
 *   - User Profile: facts about this user
 *   - Quest Catalog: product-maintained knowledge
 *   - Stages: journey structure
 *
 * Output:
 *   - Journey Model consumed by presentation components
 *
 * Product Decision
 * ----------------
 * The Quest Catalog stores facts about quests.
 * The User stores facts about the user.
 * The Quest Engine derives conclusions.
 *
 * This means the catalog does not store:
 *   - status
 *   - completed
 *   - active
 *   - upcoming
 *   - applicable
 *
 * Those values are all user-specific and are calculated here.
 */

// ============================================================
// Stage Helpers
// ============================================================

const stageOrder = [
  "preparing",
  "just-arrived",
  "settling-in",
  "living",
  "optional",
];

function getStageIndex(stageId) {
  return stageOrder.indexOf(stageId);
}

function isKnownStage(stageId) {
  return getStageIndex(stageId) !== -1;
}

function isQuestInCurrentOrPastStage(quest, currentStageId) {
  const currentIndex = getStageIndex(currentStageId);
  const questIndex = getStageIndex(quest.stage);

  if (currentIndex === -1 || questIndex === -1) {
    return false;
  }

  return questIndex <= currentIndex;
}

function isQuestInFutureStage(quest, currentStageId) {
  const currentIndex = getStageIndex(currentStageId);
  const questIndex = getStageIndex(quest.stage);

  if (currentIndex === -1 || questIndex === -1) {
    return false;
  }

  return questIndex > currentIndex;
}

// ============================================================
// Applicability Helpers
// ============================================================

function isQuestApplicableToUser(quest, user) {
  const lifeSituation = user.lifeSituation ?? {};
  const interests = user.interests ?? [];

  switch (quest.id) {
    case "pet-travel":
      return lifeSituation.hasPets === true;

    case "childcare":
    case "school-registration":
      return lifeSituation.hasChildren === true;

    case "car":
      return lifeSituation.hasCar === true;

    case "golf-club":
      return interests.includes("golf");

    case "dog-registration":
      return false;

    default:
      return true;
  }
}

// ============================================================
// Quest Derivation
// ============================================================

function getDerivedQuestState({ quest, user, currentStageId }) {
  const isApplicable = isQuestApplicableToUser(quest, user);
  const isCompleted = user.completedQuestIds?.includes(quest.id) ?? false;

  const isActive =
    isApplicable &&
    !isCompleted &&
    isQuestInCurrentOrPastStage(quest, currentStageId);

  const isUpcoming =
    isApplicable &&
    !isCompleted &&
    isQuestInFutureStage(quest, currentStageId);

  if (isCompleted) {
    return "completed";
  }

  if (isActive) {
    return "active";
  }

  if (isUpcoming) {
    return "upcoming";
  }

  return "not-applicable";
}

function deriveQuest(quest, user, currentStageId) {
  const state = getDerivedQuestState({
    quest,
    user,
    currentStageId,
  });

  return {
    ...quest,
    state,
    status: state === "upcoming" ? "next" : state,
    isApplicable: state !== "not-applicable",
    isCompleted: state === "completed",
    isActive: state === "active",
    isUpcoming: state === "upcoming",
  };
}

function deriveQuests(questCatalog, user, currentStageId) {
  return questCatalog.map((quest) =>
    deriveQuest(quest, user, currentStageId)
  );
}

// ============================================================
// Recommendation Helpers
// ============================================================

function getPriorityScore(priority) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  if (priority === "low") return 1;

  return 0;
}

function sortByRecommendationOrder(currentStageId) {
  return function compareRecommendedQuests(a, b) {
    /**
     * Recommendation Decision
     * -----------------------
     * Active quests can include unfinished quests from previous
     * stages. Those should remain visible, but recommendations
     * should feel anchored to where the user is now.
     */

    const aIsCurrentStage = a.stage === currentStageId;
    const bIsCurrentStage = b.stage === currentStageId;

    if (aIsCurrentStage && !bIsCurrentStage) {
      return -1;
    }

    if (!aIsCurrentStage && bIsCurrentStage) {
      return 1;
    }

    const priorityDifference =
      getPriorityScore(b.priority) - getPriorityScore(a.priority);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (a.order ?? 999) - (b.order ?? 999);
  };
}

function getRecommendedQuests(activeQuests, currentStageId, limit = 3) {
  return [...activeQuests]
    .sort(sortByRecommendationOrder(currentStageId))
    .slice(0, limit);
}

// ============================================================
// Progress Helpers
// ============================================================

function getStageDisplayState({
  stageId,
  currentStageId,
  completedCount,
  applicableCount,
}) {
  const stageIndex = getStageIndex(stageId);
  const currentStageIndex = getStageIndex(currentStageId);

  if (applicableCount > 0 && completedCount === applicableCount) {
    return "completed";
  }

  if (stageIndex < currentStageIndex) {
    return "remaining";
  }

  if (stageIndex === currentStageIndex) {
    return "active";
  }

  return "upcoming";
}

function getStageDisplayLabel(stageDisplayState) {
  switch (stageDisplayState) {
    case "completed":
      return "Completed";

    case "remaining":
      return "Remaining";

    case "active":
      return "Active";

    case "upcoming":
      return "Upcoming";

    default:
      return "";
  }
}

function buildProgress({
  stages,
  currentStageId,
  derivedQuests,
  activeQuests,
  completedQuests,
}) {
  const applicableQuests = derivedQuests.filter((quest) => quest.isApplicable);

  const totalQuests = applicableQuests.length;
  const completedCount = completedQuests.length;

  const progressByStage = stages.map((stage) => {
    const applicableStageQuests = applicableQuests.filter(
      (quest) => quest.stage === stage.id
    );

    const completedStageQuests = completedQuests.filter(
      (quest) => quest.stage === stage.id
    );

    const applicableCount = applicableStageQuests.length;
    const completedStageCount = completedStageQuests.length;

    const stageDisplayState = getStageDisplayState({
      stageId: stage.id,
      currentStageId,
      completedCount: completedStageCount,
      applicableCount,
    });

    return {
      stageId: stage.id,
      german: stage.german,
      english: stage.english,
      isCurrent: stage.id === currentStageId,
      applicableCount,
      totalStageQuestCount: applicableCount,
      completedCount: completedStageCount,
      stageDisplayState,
      stageDisplayLabel: getStageDisplayLabel(stageDisplayState),
      percentComplete:
        applicableCount === 0
          ? 0
          : Math.round((completedStageCount / applicableCount) * 100),
    };
  });

  return {
    totalQuests,
    completedQuests: completedCount,
    activeQuests: activeQuests.length,
    percentComplete:
      totalQuests === 0
        ? 0
        : Math.round((completedCount / totalQuests) * 100),
    progressByStage,
  };
}

// ============================================================
// Public API
// ============================================================

export function buildJourneyModel({ user, questCatalog, stages }) {
  const currentStageId = user.currentStageId;

  if (!isKnownStage(currentStageId)) {
    console.warn(
      `Unknown currentStageId "${currentStageId}" supplied to buildJourneyModel.`
    );
  }

  const derivedQuests = deriveQuests(questCatalog, user, currentStageId);

  const applicableQuests = derivedQuests.filter((quest) => quest.isApplicable);
  const activeQuests = derivedQuests.filter((quest) => quest.isActive);
  const upcomingQuests = derivedQuests.filter((quest) => quest.isUpcoming);
  const completedQuests = derivedQuests.filter((quest) => quest.isCompleted);

  const recommendedQuests = getRecommendedQuests(activeQuests, currentStageId);
  const recommendedQuest = recommendedQuests[0] ?? null;

  const progress = buildProgress({
    stages,
    currentStageId,
    derivedQuests,
    activeQuests,
    completedQuests,
  });

  const currentStage = stages.find((stage) => stage.id === currentStageId);

  const journeyProgress = {
    currentStageId,
    totalStages: stages.length,
    stages,
  };

  return {
    user,
    currentStage,
    journeyProgress,
    derivedQuests,
    questCatalog: derivedQuests,
    applicableQuests,
    activeQuests,
    upcomingQuests,
    completedQuests,
    recommendedQuest,
    recommendedQuests,
    progress,

    /**
     * Temporary compatibility alias.
     */
    upcomingMilestones: getRecommendedQuests(upcomingQuests, currentStageId, 3),
  };
}