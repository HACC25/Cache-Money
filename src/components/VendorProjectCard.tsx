// src/components/VendorProjectCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ProjectData } from "./SampleData";
import ScheduleCompletionBar from "./forms/ScheduleCompletionBar";

interface VendorProjectCardProps {
  project: ProjectData;
}

const VendorProjectCard: React.FC<VendorProjectCardProps> = ({ project }) => {
  const {
    id,
    name,
    status,
    statusColor,
    metric2,
    description,
    reports,
    createdAt,
  } = project;

  // Sort reports by date (most recent first)
  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get the two most recent reports
  const recentReports = sortedReports.slice(0, 2);

  // Get the most recent report for schedule data
  const latestReport = sortedReports[0];

  return (
    <div className="card mb-4 w-100 border-darker">
      <div className="card-body p-4">
        <div className="text-center mb-4">
          <h2
            className="card-title mb-3"
            style={{ textTransform: "uppercase" }}
          >
            {name}
          </h2>
          <div
            className="badge mb-3 px-4 py-2"
            style={{
              backgroundColor: statusColor,
              color: "white",
              borderRadius: "50px",
              fontSize: "1rem",
            }}
          >
            STATUS: {status}
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card border">
                <div className="card-body text-center">
                  {/* Use ScheduleCompletion component */}
                  {latestReport?.scheduleData?.baseline?.expectedDate &&
                  latestReport?.date &&
                  createdAt ? (
                    <ScheduleCompletionBar
                      projectCreatedAt={
                        typeof createdAt === "string"
                          ? createdAt
                          : new Date(
                              createdAt.seconds * 1000
                            ).toLocaleDateString("en-US")
                      }
                      expectedBaselineDate={
                        latestReport.scheduleData.baseline.expectedDate
                      }
                      actualProjectedDate={
                        latestReport.scheduleData.current.projectedDate
                      }
                      reportDate={latestReport.date}
                    />
                  ) : (
                    <span className="text-muted">
                      No schedule data available
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-primary">
                <div className="card-body text-center">
                  <h6 className="text-muted mb-3">Total Reports</h6>
                  <div style={{ padding: "1px 0" }}>
                    <span
                      className="text-primary"
                      style={{ fontSize: "1rem", fontWeight: "500" }}
                    >
                      {reports.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4 border">
            <div className="card-body">
              <p className="text-center mb-0">{description}</p>
            </div>
          </div>

          {reports.length > 0 && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">RECENT REPORTS</h5>
                <Link
                  to={`/project/${id}/report/new`}
                  className="btn btn-dark btn-sm"
                >
                  ADD REPORT +
                </Link>
              </div>

              {recentReports.map((report) => (
                <div key={report.id} className="card mb-2 border">
                  <div className="card-body py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{report.month}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <Link to={`/project/${id}`} className="btn btn-outline-primary">
              VIEW FULL PROJECT & REPORT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProjectCard;
