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

  // Build today's date from local calendar values rather than
  // converting to UTC, which could produce the wrong day near
  // midnight in some time zones.
  const today = new Date();

  const maxActualDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

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
        <div className="milestone-date-field">
          <span className="milestone-date-label">
            Planned
          </span>

          <DateFactEditor
            value={plannedDate}
            ariaLabel={`${milestone.title} planned date`}
            onChange={(newValue) =>
              onUpdateMilestone(
                milestone.id,
                "plannedDate",
                newValue
              )
            }
          />
        </div>

        <div className="milestone-date-field">
          <span className="milestone-date-label">
            Actual · Today or earlier
          </span>

          <DateFactEditor
            value={actualDate}
            max={maxActualDate}
            ariaLabel={`${milestone.title} actual date`}
            onChange={(newValue) =>
              onUpdateMilestone(
                milestone.id,
                "actualDate",
                newValue
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default MilestoneRow;