import React from "react";
import { Link } from "react-router-dom";
import { ProjectData, ProjectReport } from "./SampleData";

interface ProjectDetailProps {
  report: ProjectReport;
  project: ProjectData;
  index: number;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  report,
  project,
  index,
}) => {
  // Calculate overall risk level based on issues
  const calculateRiskLevel = () => {
    if (!report.issues || report.issues.length === 0) return "Low";

    // Count high-risk issues (rating >= 5)
    const highRiskCount = report.issues.filter(
      (issue) => issue.riskRating >= 5
    ).length;
    if (highRiskCount > 0) return "High";

    // Count medium-risk issues (rating 3-4)
    const mediumRiskCount = report.issues.filter(
      (issue) => issue.riskRating >= 3 && issue.riskRating < 5
    ).length;
    if (mediumRiskCount > 0) return "Medium";

    return "Low";
  };

  const riskLevel = calculateRiskLevel();

  // Calculate timeline progress
  const calculateTimelineProgress = () => {
    if (!report.scheduleStatus) return "0";

    const startDate = new Date(project.startDate).getTime();
    const endDate = new Date(report.scheduleStatus.currentEndDate).getTime();
    const reportDate = new Date(report.date).getTime();
    return (((reportDate - startDate) / (endDate - startDate)) * 100).toFixed(
      0
    );
  };

  const isDelayed = () => {
    if (!report.scheduleStatus) return false;
    return (
      new Date(report.scheduleStatus.currentEndDate) >
      new Date(report.scheduleStatus.baselineEndDate)
    );
  };

  return (
    <Link
      to={`/project/${project.id}/report/${report.id}`}
      className="text-decoration-none"
    >
      <div className="card hover-shadow">
        <div className="card-body bg-light">
          <h3 className="mb-3">MONTHLY REPORT {index}</h3>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <strong>Month:</strong> {report.month || "N/A"}
              </div>
              <div className="mb-2">
                <strong>Report Date:</strong>{" "}
                {report.date
                  ? new Date(report.date).toLocaleDateString()
                  : "N/A"}
              </div>
              <div>
                <strong>Overall Risk:</strong>{" "}
                <span
                  className={`badge ${
                    riskLevel === "High"
                      ? "bg-danger"
                      : riskLevel === "Medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                >
                  {riskLevel}
                </span>
              </div>
            </div>

            <div className="col-md-6">
              {report.scheduleStatus && (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>Schedule Status:</strong>
                    <span>{calculateTimelineProgress()}%</span>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${calculateTimelineProgress()}%` }}
                      aria-valuenow={parseFloat(calculateTimelineProgress())}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>

                  {isDelayed() && (
                    <div className="mt-1">
                      <small className="text-danger">
                        <i className="bi bi-exclamation-circle-fill me-1"></i>
                        Delayed by{" "}
                        {Math.ceil(
                          (new Date(
                            report.scheduleStatus.currentEndDate
                          ).getTime() -
                            new Date(
                              report.scheduleStatus.baselineEndDate
                            ).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </small>
                    </div>
                  )}
                </div>
              )}

              {/* Financial status and scope status removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectDetail;
