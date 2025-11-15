import React from "react";
import type { ProjectReport } from "../SampleData";

interface IssuesTimelineProps {
  issues: ProjectReport["issues"];
}

const IssuesTimeline: React.FC<IssuesTimelineProps> = ({ issues }) => {
  const getRiskDotClass = (riskRating: number): string => {
    if (riskRating >= 5) return "bg-danger";
    if (riskRating >= 3) return "bg-warning";
    return "bg-success";
  };

  const getStatusBadgeClass = (status: string): string => {
    return status === "Open" ? "bg-danger" : "bg-success";
  };

  const getRiskBadgeClass = (riskRating: number): string => {
    if (riskRating >= 5) return "bg-danger";
    if (riskRating >= 3) return "bg-warning text-dark";
    return "bg-success";
  };

  // Sort issues by date raised (most recent first)
  const sortedIssues = [...issues].sort((a, b) => {
    const dateA = new Date(a.dateRaised).getTime();
    const dateB = new Date(b.dateRaised).getTime();
    return dateB - dateA;
  });

  if (!issues || issues.length === 0) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        No issues have been raised for this reporting period.
      </div>
    );
  }

  return (
    <div style={styles.timelineContainer}>
      {sortedIssues.map((issue, index) => (
        <div key={issue.id} style={styles.timelineItem}>
          {/* Timeline Marker */}
          <div style={styles.timelineMarker}>
            <div
              style={{
                ...styles.timelineDot,
                backgroundColor: getRiskDotClass(issue.riskRating).includes(
                  "danger"
                )
                  ? "#dc3545"
                  : getRiskDotClass(issue.riskRating).includes("warning")
                  ? "#ffc107"
                  : "#28a745",
              }}
            />
            {index < sortedIssues.length - 1 && (
              <div style={styles.timelineLine} />
            )}
          </div>

          {/* Timeline Content */}
          <div style={styles.timelineContent}>
            <div style={styles.timelineIssueCard}>
              {/* Header */}
              <div style={styles.timelineIssueHeader}>
                <div>
                  <div style={styles.timelineIssueTitle}>
                    {issue.description}
                  </div>
                  <small style={styles.timelineIssueMeta}>
                    Raised on {new Date(issue.dateRaised).toLocaleDateString()}{" "}
                    • {issue.age || 0} days old
                  </small>
                </div>
                <div style={styles.timelineIssueStatus}>
                  <span
                    className={`badge ${getStatusBadgeClass(issue.status)}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    {issue.status}
                  </span>
                  <span
                    className={`badge ${getRiskBadgeClass(issue.riskRating)}`}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    Risk {issue.riskRating}/5
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div style={styles.detailsGrid}>
                <div style={styles.detailsGridItem}>
                  <span style={styles.detailLabel}>Impact</span>
                  <span
                    className={`badge ${
                      issue.impact === "High"
                        ? "bg-danger"
                        : issue.impact === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                    style={{ fontSize: "12px", padding: "4px 10px" }}
                  >
                    {issue.impact}
                  </span>
                </div>
                <div style={styles.detailsGridItem}>
                  <span style={styles.detailLabel}>Likelihood</span>
                  <span
                    className={`badge ${
                      issue.likelihood === "High"
                        ? "bg-danger"
                        : issue.likelihood === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                    style={{ fontSize: "12px", padding: "4px 10px" }}
                  >
                    {issue.likelihood}
                  </span>
                </div>
              </div>

              {/* Description Section */}
              <div style={styles.contentSection}>
                <div style={styles.sectionLabel}>Description</div>
                <div style={styles.sectionContent}>{issue.description}</div>
              </div>

              {/* Remedy Section */}
              <div style={styles.contentSection}>
                <div style={styles.sectionLabel}>Recommended Remedy</div>
                <div style={styles.sectionContent}>{issue.recommendation}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  timelineContainer: {
    position: "relative",
    padding: "20px 0",
  },
  timelineItem: {
    display: "flex",
    marginBottom: "24px",
    gap: "20px",
  },
  timelineMarker: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "60px",
  },
  timelineDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    marginTop: "5px",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 0 0 4px rgba(255, 255, 255, 1)",
  },
  timelineLine: {
    width: "2px",
    background: "#dee2e6",
    flex: 1,
    marginTop: "8px",
    minHeight: "60px",
  },
  timelineContent: {
    flex: 1,
    paddingTop: "2px",
  },
  timelineIssueCard: {
    background: "white",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
  },
  timelineIssueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    gap: "12px",
  },
  timelineIssueTitle: {
    fontWeight: "600",
    color: "#333",
    fontSize: "16px",
    lineHeight: "1.4",
  },
  timelineIssueMeta: {
    color: "#999",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
  },
  timelineIssueStatus: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    minWidth: "150px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f0f0f0",
  },
  detailsGridItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#666",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  detailValue: {
    color: "#333",
    fontSize: "14px",
  },
  contentSection: {
    marginBottom: "12px",
  },
  sectionLabel: {
    fontWeight: "600",
    color: "#333",
    fontSize: "13px",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  sectionContent: {
    color: "#666",
    fontSize: "14px",
    lineHeight: "1.5",
  },
};

export default IssuesTimeline;
