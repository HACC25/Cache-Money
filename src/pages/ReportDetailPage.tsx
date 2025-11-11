import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { fetchProjectById } from "../services/firebaseDataService";
import type { ProjectData, ProjectReport } from "../components/SampleData";

const ReportDetailPage: React.FC = () => {
  const { projectId, reportId } = useParams<{
    projectId: string;
    reportId: string;
  }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [report, setReport] = useState<ProjectReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId || !reportId) {
        setError("Missing project or report ID");
        setIsLoading(false);
        return;
      }

      try {
        const projectData = await fetchProjectById(projectId);

        if (!projectData) {
          setError("Project not found");
          setIsLoading(false);
          return;
        }

        setProject(projectData);

        const reportData = projectData.reports.find((r) => r.id === reportId);

        if (!reportData) {
          const reportRef = doc(db, "projects", projectId, "reports", reportId);
          const reportSnap = await getDoc(reportRef);

          if (!reportSnap.exists()) {
            setError("Report not found");
            setIsLoading(false);
            return;
          }

          const data = reportSnap.data();
          const fetchedReport: ProjectReport = {
            id: reportSnap.id,
            projectId: projectId,
            month: data.month,
            date: data.date,
            background: data.background,
            assessment: data.assessment,
            issues: data.issues || [],
            scheduleStatus: data.scheduleStatus,
            financials: data.financials,
            scopeStatus: data.scopeStatus,
          };

          setReport(fetchedReport);
        } else {
          setReport(reportData);
        }

        console.log("Fetched project:", projectData);
        console.log("Fetched report:", reportData || "Fetched directly");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load report data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId, reportId]);

  const getCriticalityColor = (rating: string) => {
    switch (rating) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getIssueRatingColor = (rating: number) => {
    if (rating >= 5) return "danger";
    if (rating >= 3) return "warning";
    return "success";
  };

  const getDeliverableStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <span className="badge bg-success">Completed</span>;
      case "In Progress":
        return <span className="badge bg-primary">In Progress</span>;
      case "Not Started":
        return <span className="badge bg-secondary">Not Started</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project || !report) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Report Not Found</h4>
          <p>{error || "The report you're looking for was not found."}</p>
          <Link to="/vendor/dashboard" className="btn btn-primary mt-2">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link to="/vendor/dashboard" className="btn btn-outline-primary mb-4">
        ← Back to Dashboard
      </Link>

      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
          <h1 className="mb-2">{project.name}</h1>
          <h3 className="text-muted">{report.month} Report</h3>
        </div>
        <div className="d-flex">
          <button className="btn btn-primary me-2">
            <i className="bi bi-file-earmark-pdf me-1"></i> Export as PDF
          </button>
          <button className="btn btn-success me-2">
            <i className="bi bi-file-earmark-word me-1"></i> Export as Word
          </button>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Table of Contents</h4>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <a href="#background" className="text-decoration-none">
                Background
              </a>
            </li>
            <li className="list-group-item">
              <a href="#project-assessment" className="text-decoration-none">
                Project Assessment
              </a>
            </li>
            <li className="list-group-item">
              <a href="#issues-raised" className="text-decoration-none">
                Issues Raised
              </a>
            </li>
            <li className="list-group-item">
              <a href="#schedule-status" className="text-decoration-none">
                Schedule Status
              </a>
            </li>
            <li className="list-group-item">
              <a href="#finance" className="text-decoration-none">
                Finance
              </a>
            </li>
            <li className="list-group-item">
              <a href="#scope-status" className="text-decoration-none">
                Scope Status
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Background Section */}
      <div id="background" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Background</h4>
        </div>
        <div className="card-body">
          <p className="mb-0">{report.background}</p>
        </div>
      </div>

      {/* Project Assessment Section */}
      <div id="project-assessment" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Project Assessment</h4>
        </div>
        <div className="card-body">
          <h5>Sprint Planning</h5>
          <div className="d-flex align-items-center mb-3">
            <span
              className={`badge bg-${getCriticalityColor(
                report.assessment.sprintPlanning.rating
              )} me-2`}
            >
              Criticality Rating: {report.assessment.sprintPlanning.rating}
            </span>
          </div>
          <p>{report.assessment.sprintPlanning.description}</p>

          <h5 className="mt-4">User Story (US) Validation</h5>
          <div className="d-flex align-items-center mb-3">
            <span
              className={`badge bg-${getCriticalityColor(
                report.assessment.userStoryValidation.rating
              )} me-2`}
            >
              Criticality Rating: {report.assessment.userStoryValidation.rating}
            </span>
          </div>
          <p>{report.assessment.userStoryValidation.description}</p>

          <h5 className="mt-4">Test Practice Validation</h5>
          <div className="d-flex align-items-center mb-3">
            <span
              className={`badge bg-${getCriticalityColor(
                report.assessment.testPracticeValidation.rating
              )} me-2`}
            >
              Criticality Rating:{" "}
              {report.assessment.testPracticeValidation.rating}
            </span>
          </div>
          <p>{report.assessment.testPracticeValidation.description}</p>
        </div>
      </div>

      {/* Issues Raised Section */}
      <div id="issues-raised" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Issues Raised</h4>
        </div>
        <div className="card-body">
          {report.issues && report.issues.length > 0 ? (
            report.issues.map((issue) => (
              <div key={issue.id} className="card mb-3">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-secondary me-2">
                        Raised:{" "}
                        {new Date(issue.dateRaised).toLocaleDateString()}
                      </span>
                      <span
                        className={`badge bg-${getIssueRatingColor(
                          issue.riskRating
                        )} me-2`}
                      >
                        Risk Rating: {issue.riskRating}
                      </span>
                      <span
                        className={`badge ${
                          issue.status === "Open" ? "bg-danger" : "bg-success"
                        }`}
                      >
                        Status: {issue.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Impact:</strong>
                      <span
                        className={`badge bg-${
                          issue.impact === "High"
                            ? "danger"
                            : issue.impact === "Medium"
                            ? "warning"
                            : "success"
                        } ms-2`}
                      >
                        {issue.impact}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <strong>Likelihood:</strong>
                      <span
                        className={`badge bg-${
                          issue.likelihood === "High"
                            ? "danger"
                            : issue.likelihood === "Medium"
                            ? "warning"
                            : "success"
                        } ms-2`}
                      >
                        {issue.likelihood}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h5>Description:</h5>
                    <p>{issue.description}</p>
                  </div>

                  <div>
                    <h5>Remedy:</h5>
                    <p>{issue.recommendation}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">
              No issues have been raised for this reporting period.
            </div>
          )}
        </div>
      </div>

      {/* Schedule Status Section */}
      <div id="schedule-status" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Schedule Status</h4>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Baseline Schedule:</h5>
              <p>
                {new Date(
                  report.scheduleStatus.baselineEndDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="col-md-6">
              <h5>Current Schedule:</h5>
              <p>
                {new Date(
                  report.scheduleStatus.currentEndDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {new Date(report.scheduleStatus.currentEndDate) >
            new Date(report.scheduleStatus.baselineEndDate) && (
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Schedule Delay: The current end date is{" "}
              {Math.ceil(
                (new Date(report.scheduleStatus.currentEndDate).getTime() -
                  new Date(report.scheduleStatus.baselineEndDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days later than the baseline end date.
            </div>
          )}
        </div>
      </div>

      {/* Finance Section */}
      <div id="finance" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Finance</h4>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Contract Awarded</h5>
                  <h2 className="text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(report.financials.originalAmount)}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Paid Out</h5>
                  <h2 className="text-success">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(report.financials.paidToDate)}
                  </h2>
                  <p className="text-muted mb-0">
                    {(
                      (report.financials.paidToDate /
                        report.financials.originalAmount) *
                      100
                    ).toFixed(1)}
                    % of total
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h5>Budget Utilization</h5>
          <div className="progress" style={{ height: "25px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{
                width: `${
                  (report.financials.paidToDate /
                    report.financials.originalAmount) *
                  100
                }%`,
              }}
            >
              {(
                (report.financials.paidToDate /
                  report.financials.originalAmount) *
                100
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>
      </div>

      {/* Scope Status Section */}
      <div id="scope-status" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Scope Status</h4>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5>Deliverable Completion</h5>
            <div className="progress mb-2" style={{ height: "25px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: `${
                    (report.scopeStatus.completedDeliverables /
                      report.scopeStatus.totalDeliverables) *
                    100
                  }%`,
                }}
              >
                {report.scopeStatus.completedDeliverables} of{" "}
                {report.scopeStatus.totalDeliverables} Deliverables (
                {(
                  (report.scopeStatus.completedDeliverables /
                    report.scopeStatus.totalDeliverables) *
                  100
                ).toFixed(0)}
                %)
              </div>
            </div>
          </div>

          {report.scopeStatus.deliverables.map((deliverable) => (
            <div key={deliverable.id} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{deliverable.name}</h5>
                {getDeliverableStatusBadge(deliverable.status)}
              </div>
              <div className="card-body">
                <p className="mb-0">{deliverable.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="d-flex justify-content-center mb-5">
        <Link to="/vendor/dashboard" className="btn btn-outline-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ReportDetailPage;
