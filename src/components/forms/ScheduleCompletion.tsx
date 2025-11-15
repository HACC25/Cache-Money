import React from "react";

interface ScheduleCompletionProps {
  projectCreatedAt: string;
  expectedBaselineDate: string;
  actualProjectedDate: string;
  reportDate: string;
}

const ScheduleCompletion: React.FC<ScheduleCompletionProps> = ({
  projectCreatedAt,
  expectedBaselineDate,
  actualProjectedDate,
  reportDate,
}) => {
  // Parse dates
  const start = new Date(projectCreatedAt);
  const baselineEnd = new Date(expectedBaselineDate);
  const projectedEnd = new Date(actualProjectedDate);
  const today = new Date(reportDate);

  console.log("ScheduleCompletion Debug:", {
    projectCreatedAt,
    expectedBaselineDate,
    actualProjectedDate,
    reportDate,
    start: start.toString(),
    baselineEnd: baselineEnd.toString(),
    projectedEnd: projectedEnd.toString(),
    today: today.toString(),
  });

  // Handle invalid dates
  if (
    isNaN(start.getTime()) ||
    isNaN(baselineEnd.getTime()) ||
    isNaN(projectedEnd.getTime()) ||
    isNaN(today.getTime())
  ) {
    return null;
  }

  // Use projected date as timeline end (shows full duration including delays)
  const timelineEnd = projectedEnd > baselineEnd ? projectedEnd : baselineEnd;
  const totalDuration = timelineEnd.getTime() - start.getTime();
  const elapsed = today.getTime() - start.getTime();
  const progressPercent = Math.min(
    Math.max((elapsed / totalDuration) * 100, 0),
    100
  );

  console.log("Progress Calculation:", {
    totalDuration,
    elapsed,
    progressPercent,
    startTime: start.getTime(),
    baselineEndTime: baselineEnd.getTime(),
    todayTime: today.getTime(),
  });

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div style={{ marginBottom: "25px" }}>
      <h5 style={{ marginBottom: "15px", color: "#333" }}>
        Schedule Completion Progress
      </h5>

      {/* Progress header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        <span>Overall Progress</span>
        <span style={{ color: "#28a745" }}>{progressPercent.toFixed(0)}%</span>
      </div>

      {/* Progress bar with marker */}
      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        {/* Main progress bar */}
        <div
          style={{
            height: "30px",
            background: "#e9ecef",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#28a745",
              width: `${progressPercent}%`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "width 0.3s ease",
            }}
          >
            {progressPercent > 10 && `${progressPercent.toFixed(0)}%`}
          </div>
        </div>

        {/* Today marker */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: `${progressPercent}%`,
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "54px",
              background: "#007bff",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      {/* Timeline labels - Show all three dates */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#666",
          marginBottom: "15px",
        }}
      >
        <span>
          <strong>Start:</strong> {formatDate(start)}
        </span>
        <span>
          <strong>Projected Completion:</strong> {formatDate(projectedEnd)}
        </span>
      </div>
    </div>
  );
};

export default ScheduleCompletion;
