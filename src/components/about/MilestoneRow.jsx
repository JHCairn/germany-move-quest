import "./MilestoneRow.css";

import DateFactEditor from "../facts/DateFactEditor";

/**
 * ============================================================
 * Germany Move Quest
 * Milestone Row
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders one milestone together with its planned and actual
 * dates.
 *
 * A milestone differs from a standard fact because it contains
 * two related date values rather than a single value.
 *
 * Date editing is delegated to DateFactEditor so date behaviour
 * remains consistent across the application.
 *
 * This component owns layout only.
 * It does not own user state or know how milestone values are
 * stored in the user object.
 */

function MilestoneRow({
  milestone,
  value,
  onUpdateMilestone,
}) {
  const plannedDate = value?.plannedDate ?? "";
  const actualDate = value?.actualDate ?? "";

  return (
    <div className="milestone-row">
      <div className="milestone-row-heading">
        <span className="milestone-row-title">
          {milestone.title}
        </span>

        {milestone.subtitle && (
          <span className="milestone-row-subtitle">
            {milestone.subtitle}
          </span>
        )}
      </div>

      <div className="milestone-row-dates">
        <label className="milestone-date-field">
          <span className="milestone-date-label">
            Planned
          </span>

          <DateFactEditor
            value={plannedDate}
            onChange={(newValue) =>
              onUpdateMilestone(
                milestone.id,
                "plannedDate",
                newValue
              )
            }
          />
        </label>

        <label className="milestone-date-field">
          <span className="milestone-date-label">
            Actual
          </span>

          <DateFactEditor
            value={actualDate}
            onChange={(newValue) =>
              onUpdateMilestone(
                milestone.id,
                "actualDate",
                newValue
              )
            }
          />
        </label>
      </div>
    </div>
  );
}

export default MilestoneRow;