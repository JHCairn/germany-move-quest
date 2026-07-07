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
 *   - completed
 *   - applicable
 *   - recommended
 *   - stage relation
 *   - presentation groups
 *
 * Those values are all user-specific and are calculated here.
 *
 * Product Philosophy
 * ------------------
 * Stages guide the user. They do not block the user.
 *
 * A future-stage quest can still be completed early if real life
 * presents the opportunity. The engine recommends a sensible order,
 * but it does not enforce a strict workflow.
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

  if (stageOffset === null) {
    return "unknown";
  }

  if (stageOffset < 0) {
    return "previous";
  }

  if (stageOffset === 0) {
    return "current";
  }

  if (stageOffset === 1) {
    return "next";
  }

  return "future";
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

function getApplicableQuests(questCatalog, user) {
  /**
   * Applicability Decision
   * ----------------------
   * Non-applicable quests are filtered out of the derived journey.
   *
   * The UI does not need a "not applicable" section because those
   * quests are not part of this user's relocation experience.
   *
   * If the user later changes Profile facts, the engine will run
   * again and the applicable quest set will be recalculated.
   */
  return questCatalog.filter((quest) => isQuestApplicableToUser(quest, user));
}

// ============================================================
// Quest Derivation
// ============================================================

function getQuestPresentationState({ isCompleted, stageRelation }) {
  /**
   * Presentation Compatibility
   * --------------------------
   * The UI currently uses quest.state for card styling and labels.
   *
   * "active" is retained here as a presentation label meaning:
   * "not completed and in the current or a previous stage."
   *
   * It does not mean the user is blocked from completing future
   * quests. Future quests remain visible and can become completed
   * once the interaction layer is added.
   */
  if (isCompleted) {
    return "completed";
  }

  if (stageRelation === "previous" || stageRelation === "current") {
    return "active";
  }

  return "upcoming";
}

function deriveQuest(quest, user, currentStageId) {
  const completedQuestIds = user.completedQuestIds ?? [];
  const isCompleted = completedQuestIds.includes(quest.id);
  const stageRelation = getStageRelation(quest.stage, currentStageId);
  const stageOffset = getStageOffset(quest.stage, currentStageId);
  const state = getQuestPresentationState({
    isCompleted,
    stageRelation,
  });

  return {
    ...quest,

    /**
     * Derived Facts
     * -------------
     * These are calculated from the quest catalog and user facts.
     * They should never be persisted to the user record.
     */
    isCompleted,
    stageRelation,
    stageOffset,

    /**
     * Presentation State
     * ------------------
     * Kept intentionally simple for card styling and current UI
     * compatibility.
     */
    state,

    /**
     * Temporary Compatibility Flags
     * -----------------------------
     * Existing pages/components still consume these names.
     * They are derived here so older presentation code continues
     * to work while the architecture moves toward stageRelation.
     */
    isApplicable: true,
    isActive: !isCompleted && state === "active",
    isUpcoming: !isCompleted && state === "upcoming",
  };
}

function deriveQuests(questCatalog, user, currentStageId) {
  const applicableQuests = getApplicableQuests(questCatalog, user);

  return applicableQuests.map((quest) =>
    deriveQuest(quest, user, currentStageId)
  );
}

// ============================================================
// Quest Grouping Helpers
// ============================================================

function getCurrentStageQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) => !quest.isCompleted && quest.stageRelation === "current"
  );
}

function getPreviousStageQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) => !quest.isCompleted && quest.stageRelation === "previous"
  );
}

function getUpcomingQuests(derivedQuests) {
  return derivedQuests.filter(
    (quest) =>
      !quest.isCompleted &&
      (quest.stageRelation === "next" || quest.stageRelation === "future")
  );
}

function getCompletedQuests(derivedQuests) {
  /**
   * Completed Quests
   * ----------------
   * The user stores only completedQuestIds.
   *
   * The Quest Engine joins those IDs with the Quest Catalog to
   * produce rich quest objects that are ready for presentation.
   *
   * This collection is derived and should never be persisted.
   */
  return derivedQuests.filter((quest) => quest.isCompleted);
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
  /**
   * Recommendation Decision
   * -----------------------
   * Recommendations should feel anchored to the user's current
   * journey stage, while still keeping earlier unfinished work
   * visible and available.
   *
   * Priority order:
   *   1. Current stage
   *   2. Previous stages
   *   3. Next stage
   *   4. Future stages
   *
   * This is guidance, not enforcement.
   */
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
    getPriorityScore(b.priority) - getPriorityScore(a.priority);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return (a.order ?? 999) - (b.order ?? 999);
}

function getRecommendedQuests(quests, limit = 3) {
  return [...quests]
    .filter((quest) => !quest.isCompleted)
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
  applicableQuests,
  completedQuests,
  currentStageQuests,
  previousStageQuests,
}) {
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
      germanLabel: stage.germanLabel,
      englishLabel: stage.englishLabel,
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

    /**
     * Compatibility Count
     * -------------------
     * Existing UI labels still refer to active quests. For now,
     * this means incomplete quests from the current or previous
     * stages.
     */
    activeQuests: currentStageQuests.length + previousStageQuests.length,

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

  /**
   * Derived Quest Collections
   * -------------------------
   * These are presentation-ready groups derived from:
   *   - quest catalog knowledge
   *   - user facts
   *   - current journey stage
   *
   * They should not be stored on the user.
   */
  const applicableQuests = derivedQuests;
  const currentStageQuests = getCurrentStageQuests(derivedQuests);
  const previousStageQuests = getPreviousStageQuests(derivedQuests);
  const upcomingQuests = getUpcomingQuests(derivedQuests);
  const completedQuests = getCompletedQuests(derivedQuests);

  /**
   * Compatibility Group
   * -------------------
   * Existing presentation code still expects activeQuests.
   *
   * This remains derived, but the preferred groups are now:
   *   - currentStageQuests
   *   - previousStageQuests
   *   - upcomingQuests
   *   - completedQuests
   */
  const activeQuests = [
    ...currentStageQuests,
    ...previousStageQuests,
  ];

  const recommendationCandidates = [
    ...currentStageQuests,
    ...previousStageQuests,
    ...upcomingQuests,
  ];

  const recommendedQuests = getRecommendedQuests(recommendationCandidates);
  const recommendedQuest = recommendedQuests[0] ?? null;

  const progress = buildProgress({
    stages,
    currentStageId,
    applicableQuests,
    completedQuests,
    currentStageQuests,
    previousStageQuests,
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
    applicableQuests,

    currentStageQuests,
    previousStageQuests,
    upcomingQuests,
    completedQuests,

    recommendedQuest,
    recommendedQuests,
    progress,

    /**
     * Temporary Compatibility Aliases
     * -------------------------------
     * These keep the current UI working while we migrate pages and
     * components one step at a time.
     */
    questCatalog: derivedQuests,
    activeQuests,
    upcomingMilestones: getRecommendedQuests(upcomingQuests),
  };
}