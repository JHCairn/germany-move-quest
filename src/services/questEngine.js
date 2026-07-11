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
 *   - actionable
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
// User Fact Helpers
// ============================================================

function getAboutFacts(user) {
  /**
   * User Fact Boundary
   * ------------------
   * The Quest Engine consumes stored user facts from one clear
   * location: user.facts.about.
   *
   * This keeps legacy structures such as lifeSituation out of the
   * engine and prevents old user shapes from quietly surviving.
   *
   * If a fact is missing, the engine treats it as false/unknown
   * rather than storing derived defaults on the user.
   */
  return user.facts?.about ?? {};
}

function getMilestoneFacts(user) {
  /**
   * Milestone Fact Boundary
   * -----------------------
   * Milestones remain stored as dates under user.facts.milestones.
   *
   * The Quest Engine derives whether those dates make a quest
   * actionable. No separate milestone status is stored.
   */
  return user.facts?.milestones ?? {};
}

// ============================================================
// Applicability Helpers
// ============================================================

function isQuestApplicableToUser(quest, user) {
  const about = getAboutFacts(user);
  const rules = quest.applicableWhen;

  /**
   * No applicableWhen rules means this quest is relevant to
   * every relocation journey.
   */
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

      case "needFurniture":
        return about.needFurniture === rule.value;

      case "needKitchen":
        return about.needKitchen === rule.value;

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
  /**
   * Applicability Decision
   * ----------------------
   * Non-applicable quests are filtered out of the derived journey.
   *
   * The UI does not need a "not applicable" section because those
   * quests are not part of this user's relocation experience.
   *
   * If the user later changes About You facts, the engine will run
   * again and the applicable quest set will be recalculated.
   */
  return questCatalog.filter((quest) => isQuestApplicableToUser(quest, user));
}

// ============================================================
// Actionability Helpers
// ============================================================

function isQuestActionable(quest, user) {
  const milestones = getMilestoneFacts(user);

  const hasApartmentKeys = Boolean(
    milestones.keyHandover?.actualDate
  );

  

  /**
   * Actionability Decision
   * ----------------------
   * Applicability answers whether a quest belongs in this user's
   * relocation journey.
   *
   * Actionability answers whether the user can realistically act
   * on it now.
   *
   * A quest may be applicable without yet being actionable.
   *
   * These home setup quests remain visible before key handover,
   * but they are not recommendation candidates until apartment
   * access has actually been received.
   */
  switch (quest.id) {
    case "lighting-installation":
    case "kitchen-installation":
    case "furniture-delivery":
    case "wardrobe-installation":
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

  /**
   * Milestone Completion
   * --------------------
   * Some real-world outcomes are already recorded as milestone
   * facts.
   *
   * Those milestones are the authoritative source of truth and
   * should derive quest completion rather than duplicating state
   * inside completedQuestIds.
   *
   * Start with explicit mappings. Generalisation can wait until
   * we have multiple proven examples.
   */
  switch (quest.id) {
    case "anmeldung":
      return Boolean(
        milestones.anmeldung?.actualDate
      );

    default:
      return false;
  }
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
   * quests. Future quests remain visible and can become completed.
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

    /**
     * Derived Facts
     * -------------
     * These are calculated from the quest catalog and user facts.
     * They should never be persisted to the user record.
     */
    isCompleted,
    isActionable,
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
    getPriorityScore(b.priority) -
    getPriorityScore(a.priority);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return (a.order ?? 999) - (b.order ?? 999);
}

function getRecommendedQuests(quests, limit = 3) {
  /**
   * Recommendation Eligibility
   * --------------------------
   * A recommended quest must be:
   *   - incomplete
   *   - actionable
   *
   * Non-actionable quests remain in the user's journey and remain
   * visible in quest lists. They are excluded only from current
   * recommendations.
   */
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
  const currentStageIndex = getStageIndex(
    currentStageId
  );

  if (
    applicableCount > 0 &&
    completedCount === applicableCount
  ) {
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
    const applicableStageQuests =
      applicableQuests.filter(
        (quest) => quest.stage === stage.id
      );

    const completedStageQuests =
      completedQuests.filter(
        (quest) => quest.stage === stage.id
      );

    const applicableCount =
      applicableStageQuests.length;

    const completedStageCount =
      completedStageQuests.length;

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
              (
                completedStageCount /
                applicableCount
              ) * 100
            ),
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

  /**
   * Derived Quest Collections
   * -------------------------
   * These are presentation-ready groups derived from:
   *   - quest catalog knowledge
   *   - user facts
   *   - milestone facts
   *   - current journey stage
   *
   * They should not be stored on the user.
   */
  const applicableQuests = derivedQuests;

  const currentStageQuests =
    getCurrentStageQuests(derivedQuests);

  const previousStageQuests =
    getPreviousStageQuests(derivedQuests);

  const upcomingQuests =
    getUpcomingQuests(derivedQuests);

  const completedQuests =
    getCompletedQuests(derivedQuests);

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

    /**
     * Temporary Compatibility Aliases
     * -------------------------------
     * These keep the current UI working while we migrate pages and
     * components one step at a time.
     */
    questCatalog: derivedQuests,
    activeQuests,
  };
}