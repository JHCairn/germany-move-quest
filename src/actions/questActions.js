/**
 * Quest Actions
 * -------------
 * Actions are the only layer allowed to express user intent as a change
 * to user facts.
 *
 * Important architectural rule:
 *
 *   Store facts. Derive everything else.
 *
 * Completing a quest is a user fact.
 * Whether that quest appears as completed, current, previous, upcoming,
 * or recommended is NOT stored here. The Quest Engine derives that later.
 */

function getCompletedQuestIds(user) {
  return user.completedQuestIds ?? [];
}

/**
 * Mark a quest as completed.
 *
 * This does not mutate the original user object.
 * Returning a new user object keeps React state updates predictable.
 */
export function completeQuest(user, questId) {
  const completedQuestIds = getCompletedQuestIds(user);

  if (completedQuestIds.includes(questId)) {
    return user;
  }

  return {
    ...user,
    completedQuestIds: [...completedQuestIds, questId],
  };
}

/**
 * Reopen a completed quest.
 *
 * Reopening only removes the completion fact.
 * The Quest Engine will decide where the quest belongs afterward.
 */
export function reopenQuest(user, questId) {
  const completedQuestIds = getCompletedQuestIds(user);

  if (!completedQuestIds.includes(questId)) {
    return user;
  }

  return {
    ...user,
    completedQuestIds: completedQuestIds.filter((id) => id !== questId),
  };
}