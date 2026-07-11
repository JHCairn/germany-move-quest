import "./MilestoneSection.css";

import MilestoneRow from "./MilestoneRow";

/**
 * ============================================================
 * Germany Move Quest
 * Milestone Section
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the milestone definitions together with the user's
 * planned and actual milestone dates.
 *
 * Milestone definitions come from the Fact Catalog.
 * Milestone values come from the selected user's facts.
 *
 * This component remains presentation only. It does not:
 * - own user state
 * - update the user directly
 * - derive milestone status
 * - determine quest applicability
 */

function MilestoneSection({
  section,
  milestones,
  milestoneValues,
  onUpdateMilestone,
}) {
  return (
    <section className="milestone-section">
      <h2>
        {section.german} · {section.english}
      </h2>

      <div className="milestone-section-rows">
        {milestones.map((milestone) => (
          <MilestoneRow
            key={milestone.id}
            milestone={milestone}
            value={milestoneValues?.[milestone.id]}
            onUpdateMilestone={onUpdateMilestone}
          />
        ))}
      </div>
    </section>
  );
}

export default MilestoneSection;