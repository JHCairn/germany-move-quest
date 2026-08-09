/**
 * ============================================================
 * Germany Move Quest
 * Quest Engine
 * ============================================================
 *
 * The Quest Engine is the application's single source of truth
 * for deriving a user's journey.
 *
 * Product philosophy:
 * Store facts. Derive everything else.
 *
 * Stages guide the user. They do not block the user.
 */

// ============================================================
// Stage Helpers
// ============================================================

const stageOrder = [
  "preparing",
  "just-arrived",
  "settling-in",
  "living",
];

function getStageIndex(stageId) {
  return stageOrder.indexOf(stageId);
}

function isKnownStage(stageId) {
  return getStageIndex(stageId) !== -1;
}

function getStageOffset(questStageId, currentStageId) {
  const questStageIndex = getStageIndex(questStageId);
  const currentStageIndex = getStageIndex(currentStageId);

  if (questStageIndex === -1 || currentStageIndex === -1) {
    return null;
  }

  return questStageIndex - currentStageIndex;
}

function getStageRelation(questStageId, currentStageId) {
  const stageOffset = getStageOffset(questStageId, currentStageId);

  if (stageOffset === null) return "unknown";
  if (stageOffset < 0) return "previous";
  if (stageOffset === 0) return "current";
  if (stageOffset === 1) return "next";
  return "future";
}

// ============================================================
// User Fact Helpers
// ============================================================

function getAboutFacts(user) {
  return user.facts?.about ?? {};
}

function getMilestoneFacts(user) {
  return user.facts?.milestones ?? {};
}

// ============================================================
// Applicability Helpers
// ============================================================

function isQuestApplicableToUser(quest, user) {
  const about = getAboutFacts(user);
  const rules = quest.applicableWhen;

  if (!rules) {
    return true;
  }

  return rules.every((rule) => {
    switch (rule.factId) {
      case "havePets":
        return about.havePets === rule.value;

      case "haveDog":
        return about.haveDog === rule.value;

      case "haveChildren":
        return about.haveChildren === rule.value;

      case "haveCar":
        return about.haveCar === rule.value;

      case "willDrive":
        return about.willDrive === rule.value;

      case "needKitchen":
        return about.needKitchen === rule.value;

      case "needInstalledLightFixtures":
        return about.needInstalledLightFixtures === rule.value;

      case "shippingBelongingsSeparately":
        return about.shippingBelongingsSeparately === rule.value;

      case "hasEuFreeMovementRights":
        return about.hasEuFreeMovementRights === rule.value;

      case "takeRegularMedication":
        return about.takeRegularMedication === rule.value;

      case "housingType":
        return about.housingType === rule.value;

      default:
        console.warn(
          `Unknown applicableWhen factId "${rule.factId}" for quest "${quest.id}".`
        );
        return true;
    }
  });
}

function getApplicableQuests(questCatalog, user) {
  return questCatalog.filter((quest) => isQuestApplicableToUser(quest, user));
}

// ============================================================
// Actionability Helpers
// ============================================================

function isQuestActionable(quest, user) {
  const milestones = getMilestoneFacts(user);
  const hasApartmentKeys = Boolean(milestones.keyHandover?.actualDate);

  switch (quest.id) {
    case "lighting-installation":
    case "kitchen-installation":
      return hasApartmentKeys;

    default:
      return true;
  }
}

// ============================================================
// Completion Helpers
// ============================================================

function isQuestCompletedByMilestone(quest, user) {
  const milestones = getMilestoneFacts(user);

  switch (quest.id) {
    case "anmeldung":
      return Boolean(milestones.anmeldung?.actualDate);

    default:
      return false;
  }
}

// ============================================================
// Quest Derivation
// ============================================================

function getQuestPresentationState({ isCompleted, stageRelation }) {
  if (isCompleted) return "completed";

  if (stageRelation === "previous" || stageRelation === "current") {
    return "active";
  }

  return "upcoming";
}

function deriveQuest(quest, user, currentStageId) {
  const completedQuestIds = user.completedQuestIds ?? [];

  const isCompleted =
    completedQuestIds.includes(quest.id) ||
    isQuestCompletedByMilestone(quest, user);

  const isActionable = isQuestActionable(quest, user);

  const stageRelation = getStageRelation(
    quest.stage,
    currentStageId
  );

  const stageOffset = getStageOffset(
    quest.stage,
    currentStageId
  );

  const state = getQuestPresentationState({
    isCompleted,
    stageRelation,
  });

  return {
    ...quest,
    isCompleted,
    isActionable,
    stageRelation,
    stageOffset,
    state,

    // Temporary compatibility flags for existing presentation code.
    isApplicable: true,
    isActive: !isCompleted && state === "active",
    isUpcoming: !isCompleted && state === "upcoming",
  };
}

function deriveQuests(questCatalog, user, currentStageId) {
  const applicableQuests = getApplicableQuests(
    questCatalog,
    user
  );

  return applicableQuests.map((quest) =>
    deriveQuest(quest, user, currentStageId)
  );
}

// ============================================================
// Quest Grouping Helpers
// ============================================================

function getCurrentStageQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) =>
      !quest.isCompleted &&
      quest.stageRelation === "current"
  );
}

function getPreviousStageQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) =>
      !quest.isCompleted &&
      quest.stageRelation === "previous"
  );
}

function getUpcomingQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) =>
      !quest.isCompleted &&
      (
        quest.stageRelation === "next" ||
        quest.stageRelation === "future"
      )
  );
}

function getCompletedQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) => quest.isCompleted
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

function getRecommendationStageScore(stageRelation) {
  switch (stageRelation) {
    case "current":
      return 4;
    case "previous":
      return 3;
    case "next":
      return 2;
    case "future":
      return 1;
    default:
      return 0;
  }
}

function sortByRecommendationOrder(a, b) {
  const stageScoreDifference =
    getRecommendationStageScore(b.stageRelation) -
    getRecommendationStageScore(a.stageRelation);

  if (stageScoreDifference !== 0) {
    return stageScoreDifference;
  }

  const priorityDifference =
    getPriorityScore(b.priority) -
    getPriorityScore(a.priority);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return (a.order ?? 999) - (b.order ?? 999);
}

function getRecommendedQuests(quests, limit = 3) {
  return [...quests]
    .filter(
      (quest) =>
        !quest.isCompleted &&
        quest.isActionable
    )
    .sort(sortByRecommendationOrder)
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

  if (
    applicableCount > 0 &&
    completedCount === applicableCount
  ) {
    return "completed";
  }

  if (stageIndex < currentStageIndex) return "remaining";
  if (stageIndex === currentStageIndex) return "active";
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
  applicableQuests,
  completedQuests,
  currentStageQuests,
  previousStageQuests,
}) {
  const totalQuests = applicableQuests.length;
  const completedCount = completedQuests.length;

  const progressByStage = stages.map((stage) => {
    const applicableStageQuests =
      applicableQuests.filter(
        (quest) => quest.stage === stage.id
      );

    const completedStageQuests =
      completedQuests.filter(
        (quest) => quest.stage === stage.id
      );

    const applicableCount = applicableStageQuests.length;
    const completedStageCount = completedStageQuests.length;
    const remainingStageCount =
      applicableCount - completedStageCount;

    const stageDisplayState = getStageDisplayState({
      stageId: stage.id,
      currentStageId,
      completedCount: completedStageCount,
      applicableCount,
    });

    return {
      stageId: stage.id,
      germanLabel: stage.germanLabel,
      englishLabel: stage.englishLabel,
      isCurrent: stage.id === currentStageId,
      applicableCount,
      totalStageQuestCount: applicableCount,
      completedCount: completedStageCount,
      remainingCount: remainingStageCount,
      stageDisplayState,
      stageDisplayLabel:
        getStageDisplayLabel(stageDisplayState),
      percentComplete:
        applicableCount === 0
          ? 0
          : Math.round(
              (completedStageCount / applicableCount) * 100
            ),
    };
  });

  return {
    totalQuests,
    completedQuests: completedCount,
    activeQuests:
      currentStageQuests.length +
      previousStageQuests.length,
    percentComplete:
      totalQuests === 0
        ? 0
        : Math.round(
            (completedCount / totalQuests) * 100
          ),
    progressByStage,
  };
}

// ============================================================
// Public API
// ============================================================

export function buildJourneyModel({
  user,
  questCatalog,
  stages,
}) {
  const currentStageId = user.currentStageId;

  if (!isKnownStage(currentStageId)) {
    console.warn(
      `Unknown currentStageId "${currentStageId}" supplied to buildJourneyModel.`
    );
  }

  const derivedQuests = deriveQuests(
    questCatalog,
    user,
    currentStageId
  );

  const applicableQuests = derivedQuests;

  const currentStageQuests =
    getCurrentStageQuests(derivedQuests);

  const previousStageQuests =
    getPreviousStageQuests(derivedQuests);

  const upcomingQuests =
    getUpcomingQuests(derivedQuests);

  const completedQuests =
    getCompletedQuests(derivedQuests);

  const activeQuests = [
    ...currentStageQuests,
    ...previousStageQuests,
  ];

  const recommendationCandidates = [
    ...currentStageQuests,
    ...previousStageQuests,
    ...upcomingQuests,
  ];

  const recommendedQuests =
    getRecommendedQuests(
      recommendationCandidates
    );

  const recommendedQuest =
    recommendedQuests[0] ?? null;

  const progress = buildProgress({
    stages,
    currentStageId,
    applicableQuests,
    completedQuests,
    currentStageQuests,
    previousStageQuests,
  });

  const currentStage = stages.find(
    (stage) => stage.id === currentStageId
  );

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
    applicableQuests,
    currentStageQuests,
    previousStageQuests,
    upcomingQuests,
    completedQuests,
    recommendedQuest,
    recommendedQuests,
    progress,
    questCatalog: derivedQuests,
    activeQuests,
  };
}
