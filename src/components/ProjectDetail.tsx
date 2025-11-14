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

  return (
    <div className="text-decoration-none">
      <div className="card hover-shadow">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-3">
              <h3 className="mb-3">MONTHLY REPORT {index}</h3>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>

            <div className="col-md-3 text-end">
              <div className="dropdown">
                <i
                  className="bi bi-three-dots"
                  id={`dropdownMenuButton-${index}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: "#807b7a",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                ></i>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby={`dropdownMenuButton-${index}`}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/project/${project.id}/report/${report.id}`}
                    >
                      View
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/vendor/project/${project.id}/report/${report.id}/edit`}
                    >
                      Edit
                    </Link>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => console.log("Delete clicked")}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
                <strong>Criticality Rating:</strong>{" "}
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
                  {/*Change to Schedule Status */}
                  <div>
                    <strong>Schedule Status:</strong>{" "}
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
              )}

              {/* Financial status and scope status removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
