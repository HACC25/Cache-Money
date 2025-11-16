// src/components/forms/ScheduleCompletionBar.tsx
import React from "react";

interface ScheduleCompletionBarProps {
  projectCreatedAt: string;
  expectedBaselineDate: string;
  actualProjectedDate: string;
  reportDate: string;
}

const ScheduleCompletionBar: React.FC<ScheduleCompletionBarProps> = ({
  projectCreatedAt,
  expectedBaselineDate,
  reportDate,
}) => {
  // Parse dates
  const createdDate = new Date(projectCreatedAt);
  const baselineDate = new Date(expectedBaselineDate);
  const currentDate = new Date(reportDate);

  // Calculate total project duration (from creation to baseline completion)
  const totalDuration = baselineDate.getTime() - createdDate.getTime();

  // Calculate elapsed time (from creation to report date)
  const elapsedTime = currentDate.getTime() - createdDate.getTime();

  // Calculate percentage complete
  const percentageComplete = Math.min(
    Math.max((elapsedTime / totalDuration) * 100, 0),
    100
  );

  return (
    <div>
      <h6 className="text-muted mb-3">Project Completion</h6>
      <div className="progress" style={{ height: "25px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentageComplete}%`,
            backgroundColor: "#007bff",
          }}
          aria-valuenow={percentageComplete}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Math.round(percentageComplete)}%
        </div>
      </div>
    </div>
  );
};

export default ScheduleCompletionBar;
