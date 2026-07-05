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

/**
 * Product Decision
 * ----------------
 * Applicability is derived from the user's profile.
 *
 * This is intentionally simple for now. Later, this can evolve
 * into a more generic eligibility system without changing the UI.
 */
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
      /**
       * We currently only know whether a user has pets.
       * We do not yet know pet type.
       *
       * Until the user profile can distinguish dog/cat/other,
       * do not automatically include dog-specific quests.
       */
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

  const isApplicable = state !== "not-applicable";
  const isCompleted = state === "completed";
  const isActive = state === "active";
  const isUpcoming = state === "upcoming";

  return {
    ...quest,

    /**
     * New preferred derived state.
     *
     * Use this going forward when building new components.
     */
    state,

    /**
     * Compatibility status.
     *
     * Existing dashboard components may still expect status-like
     * labels. New code should prefer state/isActive/isUpcoming/etc.
     */
    status: state === "upcoming" ? "next" : state,

    isApplicable,
    isCompleted,
    isActive,
    isUpcoming,
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

// ============================================================
// Progress Helpers
// ============================================================

function buildProgress({ stages, derivedQuests, activeQuests, completedQuests }) {
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

    return {
      stageId: stage.id,
      german: stage.german,
      english: stage.english,
      isCurrent: false,
      applicableCount: applicableStageQuests.length,
      totalStageQuestCount: applicableStageQuests.length,
      completedCount: completedStageQuests.length,
      percentComplete:
        applicableStageQuests.length === 0
          ? 0
          : Math.round(
              (completedStageQuests.length / applicableStageQuests.length) *
                100
            ),
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

function markCurrentStage(progress, currentStageId) {
  return {
    ...progress,
    progressByStage: progress.progressByStage.map((stageProgress) => ({
      ...stageProgress,
      isCurrent: stageProgress.stageId === currentStageId,
    })),
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

  /**
   * Step 1:
   * Create one enriched quest collection.
   *
   * Every downstream view is derived from this collection.
   */
  const derivedQuests = deriveQuests(questCatalog, user, currentStageId);

  /**
   * Step 2:
   * Build the user's journey collections.
   */
  const applicableQuests = derivedQuests.filter((quest) => quest.isApplicable);
  const activeQuests = derivedQuests.filter((quest) => quest.isActive);
  const upcomingQuests = derivedQuests.filter((quest) => quest.isUpcoming);
  const completedQuests = derivedQuests.filter((quest) => quest.isCompleted);

  /**
   * Step 3:
   * Build recommendations.
   */
  const recommendedQuests = getRecommendedQuests(activeQuests);
  const recommendedQuest = recommendedQuests[0] ?? null;

  /**
   * Step 4:
   * Build progress.
   */
  const progress = markCurrentStage(
    buildProgress({
      stages,
      derivedQuests,
      activeQuests,
      completedQuests,
    }),
    currentStageId
  );

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

    /**
     * New preferred collection.
     */
    derivedQuests,

    /**
     * Existing and near-term UI collections.
     */
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
     *
     * JourneyPage currently passes journey.upcomingMilestones to
     * MilestonesCard. We should rename that in the next small cleanup.
     */
    upcomingMilestones: getRecommendedQuests(upcomingQuests, 3),
  };
}