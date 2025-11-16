import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectData, ProjectReport } from "./SampleData";
import { useAuth } from "../contexts/AuthContext";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";

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
  const navigate = useNavigate();
  const { isVendor } = useAuth();

  // Get criticality rating from assessment
  const getCriticalityRating = () => {
    return report.assessment?.sprintPlanning?.rating || "N/A";
  };

  // Get schedule status based on variance days
  const getScheduleStatus = () => {
    if (report.varianceDays === undefined || report.varianceDays === null) {
      return "N/A";
    }
    if (report.varianceDays === 0) return "On Time";
    if (report.varianceDays > 0) return "Behind Schedule";
    return "Ahead of Schedule";
  };
  // Handle delete report
  const handleDeleteReport = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    ) {
      try {
        const reportRef = doc(db, "projects", project.id, "reports", report.id);
        await deleteDoc(reportRef);
        console.log("Report deleted successfully");
        // Optionally refresh the page or navigate back
        navigate(`/project/${project.id}`);
      } catch (err) {
        console.error("Error deleting report:", err);
        alert("Failed to delete report. Please try again.");
      }
    }
  };

  const criticalityRating = getCriticalityRating();
  const scheduleStatus = getScheduleStatus();

  return (
    <div className="text-decoration-none">
      <div className="card hover-shadow">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-3">
              <h4 className="mb-3">REPORT: {report.month || "N/A"}</h4>
              <div className="mb-2"></div>
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
                  {isVendor ? (
                    <div>
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
                          className="dropdown-item text-danger"
                          onClick={handleDeleteReport}
                        >
                          Delete
                        </button>
                      </li>
                    </div>
                  ) : (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/project/${project.id}/report/${report.id}`}
                      >
                        View
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <strong>Report Date:</strong>{" "}
                {report.date
                  ? new Date(report.date).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="mb-3">
                <strong>Criticality Rating:</strong>{" "}
                <span
                  className={`badge ${
                    criticalityRating === "High"
                      ? "bg-danger"
                      : criticalityRating === "Medium"
                      ? "bg-warning"
                      : criticalityRating === "Low"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {criticalityRating}
                </span>
              </div>
              <div className="mb-3">
                <strong>Schedule Status:</strong>{" "}
                <span
                  className={`badge ${
                    scheduleStatus === "Behind Schedule"
                      ? "bg-danger"
                      : scheduleStatus === "On Time"
                      ? "bg-success"
                      : "bg-info"
                  }`}
                >
                  {scheduleStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
