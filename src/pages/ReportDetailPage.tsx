import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase-config";
import type { ProjectReport } from "../components/SampleData";
import { useAuth } from "../contexts/AuthContext";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import "./ReportDetailPage.css";

// Visual Component Imports
import BudgetDonut from "../components/forms/BudgetDonut";
import ScheduleCompletion from "../components/forms/ScheduleCompletion";
import IssuesTimeline from "../components/forms/IssueTimeline";

const ReportDetailPage: React.FC = () => {
  const { projectId, reportId } = useParams<{
    projectId: string;
    reportId: string;
  }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ProjectReport | null>(null);
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isETSEmployee, isVendor } = useAuth();

  const ExportToWord = async () => {
    if (!report || !project) return;

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "customHeading1",
            name: "Custom Heading 1",
            basedOn: "Heading1",
            run: {
              size: 32,
              bold: true,
              color: "5B9BD5",
            },
            paragraph: {
              spacing: {
                before: 400,
                after: 300,
              },
              border: {
                bottom: {
                  color: "5B9BD5",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 18,
                },
              },
            },
          },
          {
            id: "customHeading2",
            name: "Custom Heading 2",
            basedOn: "Heading2",
            run: {
              size: 28,
              bold: true,
              color: "5B9BD5",
            },
            paragraph: {
              spacing: {
                before: 400,
                after: 200,
              },
              border: {
                bottom: {
                  color: "5B9BD5",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 12,
                },
              },
            },
          },
          {
            id: "customHeading3",
            name: "Custom Heading 3",
            basedOn: "Heading3",
            run: {
              size: 24,
              bold: true,
              color: "404040",
            },
            paragraph: {
              spacing: {
                before: 200,
                after: 100,
              },
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            // Header Section
            new Paragraph({
              text: "STATE OF HAWAII",
              alignment: AlignmentType.CENTER,
              style: "customHeading1",
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: "Office of Enterprise Technology Services",
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              run: {
                size: 24,
                color: "404040",
              },
            }),
            new Paragraph({
              text: `${project.name} Project Report - ${report.month}`,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              run: {
                size: 28,
                bold: true,
                color: "5B9BD5",
              },
            }),

            // Table of Contents
            new Paragraph({
              text: "Table of Contents",
              style: "customHeading2",
            }),
            new Paragraph({
              text: "1. Background",
              spacing: { after: 100 },
              indent: { left: 200 },
            }),
            new Paragraph({
              text: "2. Project Assessment",
              spacing: { after: 100 },
              indent: { left: 200 },
            }),
            new Paragraph({
              text: "3. Issues Raised",
              spacing: { after: 100 },
              indent: { left: 200 },
            }),
            new Paragraph({
              text: "4. Schedule Status",
              spacing: { after: 100 },
              indent: { left: 200 },
            }),
            new Paragraph({
              text: "5. Finance",
              spacing: { after: 100 },
              indent: { left: 200 },
            }),
            new Paragraph({
              text: "6. Scope Status",
              spacing: { after: 400 },
              indent: { left: 200 },
            }),

            // Background Section
            new Paragraph({
              text: "1. Background",
              style: "customHeading2",
            }),
            new Paragraph({
              text: report.background || "No background information provided.",
              spacing: { after: 400 },
            }),

            // Project Assessment Section
            new Paragraph({
              text: "2. Project Criticality Assessment",
              style: "customHeading2",
            }),
            ...createAssessmentSection(report),

            // Issues Raised Section
            new Paragraph({
              text: "3. Issues Raised",
              style: "customHeading2",
            }),
            ...createIssuesSection(report),

            // Schedule Status Section
            new Paragraph({
              text: "4. Schedule Status",
              style: "customHeading2",
            }),
            ...createScheduleSection(report),

            // Finance Section
            new Paragraph({
              text: "5. Finance",
              style: "customHeading2",
            }),
            ...createFinanceSection(report),

            // Scope Status Section
            new Paragraph({
              text: "6. Scope Status",
              style: "customHeading2",
            }),
            ...createScopeSection(report),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `${project.name}_Project Report_${report.month}.docx`;
    saveAs(blob, fileName);
  };

  // Helper function: Assessment Section
  function createAssessmentSection(report: ProjectReport) {
    const rating = report.assessment?.sprintPlanning?.rating || "N/A";
    const description =
      report.assessment?.sprintPlanning?.description ||
      "No description provided.";

    return [
      new Paragraph({
        children: [
          new TextRun({ text: "Rating: ", bold: true, size: 24 }),
          new TextRun({
            text: rating,
            bold: true,
            size: 24,
          }),
        ],
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: description,
        spacing: { after: 400 },
        shading: {
          fill: "F8F9FA",
        },
        indent: {
          left: 360,
          right: 360,
        },
        border: {
          left: {
            color: "CCCCCC",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 24,
          },
        },
      }),
    ];
  }

  // Helper function: Issues Section
  function createIssuesSection(report: ProjectReport) {
    if (!report.issues || report.issues.length === 0) {
      return [
        new Paragraph({
          text: "No issues raised.",
          spacing: { after: 400 },
          run: {
            italics: true,
            color: "6C757D",
          },
        }),
      ];
    }

    return report.issues.flatMap((issue, index) => {
      return [
        new Paragraph({
          text: `Issue ${index + 1}: ${issue.name}`,
          style: "customHeading3",
        }),

        // Issue metadata table
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Status: ", bold: true }),
                        new TextRun({
                          text: issue.status,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  shading: { fill: "F8F9FA" },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Risk Rating: ", bold: true }),
                        new TextRun({
                          text: issue.riskRating.toString(),
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  shading: { fill: "F8F9FA" },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Impact: ", bold: true }),
                        new TextRun(issue.impact),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Likelihood: ", bold: true }),
                        new TextRun(issue.likelihood),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Date Raised: ", bold: true }),
                        new TextRun(
                          new Date(issue.dateRaised).toLocaleDateString()
                        ),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Age: ", bold: true }),
                        new TextRun(`${issue.age || 0} days`),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        new Paragraph({
          text: "Description:",
          spacing: { before: 200, after: 100 },
          run: {
            size: 22,
            bold: true,
            allCaps: true,
            color: "495057",
          },
        }),
        new Paragraph({
          text: issue.description || "No description provided.",
          spacing: { after: 200 },
          shading: { fill: "FFFFFF" },
          indent: { left: 360, right: 360 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            left: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            right: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
          },
        }),

        new Paragraph({
          text: "Recommendation:",
          spacing: { before: 100, after: 100 },
          run: {
            size: 22,
            bold: true,
            allCaps: true,
            color: "495057",
          },
        }),
        new Paragraph({
          text: issue.recommendation || "No recommendation provided.",
          spacing: { after: 400 },
          shading: { fill: "FFFFFF" },
          indent: { left: 360, right: 360 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            left: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
            right: { style: BorderStyle.SINGLE, size: 6, color: "E9ECEF" },
          },
        }),
      ];
    });
  }

  // Helper function: Schedule Section
  function createScheduleSection(report: ProjectReport) {
    const baseline = report.scheduleData?.baseline?.expectedDate
      ? new Date(report.scheduleData.baseline.expectedDate)
      : null;
    const projected = report.scheduleData?.current?.projectedDate
      ? new Date(report.scheduleData.current.projectedDate)
      : null;

    let varianceParagraph;
    if (baseline && projected) {
      const diffTime = projected.getTime() - baseline.getTime();
      const varianceDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let statusText: string;
      if (varianceDays === 0) {
        statusText = "✓ On Schedule";
      } else if (varianceDays > 0) {
        statusText = "⚠ Behind Schedule";
      } else {
        statusText = "✓ Ahead of Schedule";
      }

      varianceParagraph = new Paragraph({
        children: [
          new TextRun({
            text: statusText + ": ",
            bold: true,
          }),
          new TextRun({
            text:
              varianceDays === 0
                ? "Project is tracking to baseline completion date."
                : varianceDays > 0
                ? `Project is ${varianceDays} days behind the baseline completion date.`
                : `Project is ${Math.abs(
                    varianceDays
                  )} days ahead of the baseline completion date.`,
          }),
        ],
        spacing: { after: 200 },
        shading: { fill: "F8F9FA" },
        indent: { left: 360, right: 360 },
        border: {
          left: {
            color: "CCCCCC",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 24,
          },
        },
      });
    } else {
      varianceParagraph = new Paragraph({
        text: "Variance information not available.",
        spacing: { after: 200 },
        run: {
          italics: true,
        },
      });
    }

    return [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: "Expected Baseline Completion",
                    alignment: AlignmentType.CENTER,
                    run: {
                      bold: true,
                    },
                  }),
                  new Paragraph({
                    text: baseline ? baseline.toLocaleDateString() : "N/A",
                    alignment: AlignmentType.CENTER,
                    run: { size: 28, bold: true },
                  }),
                ],
                shading: { fill: "F8F9FA" },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: "Actual Projected Completion",
                    alignment: AlignmentType.CENTER,
                    run: {
                      bold: true,
                    },
                  }),
                  new Paragraph({
                    text: projected ? projected.toLocaleDateString() : "N/A",
                    alignment: AlignmentType.CENTER,
                    run: { size: 28, bold: true },
                  }),
                ],
                shading: { fill: "F8F9FA" },
              }),
            ],
          }),
        ],
      }),

      new Paragraph({
        text: "Schedule Status Variance",
        style: "customHeading3",
      }),
      varianceParagraph,

      new Paragraph({
        text: report.scheduleStatus?.description || "No additional notes.",
        spacing: { after: 400 },
        run: {
          italics: true,
        },
      }),
    ];
  }

  // Helper function: Finance Section
  function createFinanceSection(report: ProjectReport) {
    const contracted = report.financials.originalAmount;
    const paid = report.financials.paidToDate;
    const remaining = contracted - paid;

    return [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: "Total Contracted",
                    alignment: AlignmentType.CENTER,
                    run: {
                      size: 20,
                      bold: true,
                      allCaps: true,
                      color: "6C757D",
                    },
                  }),
                  new Paragraph({
                    text: `$${contracted.toLocaleString()}`,
                    alignment: AlignmentType.CENTER,
                    run: { size: 32, bold: true },
                  }),
                ],
                shading: { fill: "F8F9FA" },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: "Total Paid to Date",
                    alignment: AlignmentType.CENTER,
                    run: {
                      size: 20,
                      bold: true,
                      allCaps: true,
                      color: "6C757D",
                    },
                  }),
                  new Paragraph({
                    text: `$${paid.toLocaleString()}`,
                    alignment: AlignmentType.CENTER,
                    run: { size: 32, bold: true },
                  }),
                ],
                shading: { fill: "F8F9FA" },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: "Remaining Budget",
                    alignment: AlignmentType.CENTER,
                    run: {
                      size: 20,
                      bold: true,
                      allCaps: true,
                      color: "6C757D",
                    },
                  }),
                  new Paragraph({
                    text: `$${remaining.toLocaleString()}`,
                    alignment: AlignmentType.CENTER,
                    run: {
                      size: 32,
                      bold: true,
                    },
                  }),
                ],
                shading: { fill: "F8F9FA" },
              }),
            ],
          }),
        ],
      }),

      new Paragraph({
        text:
          report.financials?.description || "No additional financial notes.",
        spacing: { before: 200, after: 400 },
        shading: { fill: "F8F9FA" },
        indent: { left: 360, right: 360 },
        run: {
          italics: true,
        },
      }),
    ];
  }

  // Helper function: Scope Section
  function createScopeSection(report: ProjectReport) {
    const completed = report.scopeStatus.completedDeliverables;
    const total = report.scopeStatus.totalDeliverables;
    const percentage = total > 0 ? ((completed / total) * 100).toFixed(0) : "0";

    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Deliverable Completion: ",
            bold: true,
            size: 24,
          }),
          new TextRun({
            text: `${completed} of ${total} (${percentage}%)`,
            bold: true,
            size: 24,
          }),
        ],
        spacing: { after: 300 },
        shading: { fill: "F8F9FA" },
        indent: { left: 360, right: 360 },
      }),

      ...report.scopeStatus.deliverables.flatMap((deliverable) => {
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: `${deliverable.name}: `,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: deliverable.status,
                bold: true,
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: deliverable.description || "No description provided.",
            spacing: { after: 200 },
            indent: { left: 720 },
            run: {
              italics: true,
            },
          }),
        ];
      }),
    ];
  }
  useEffect(() => {
    if (!projectId) return;

    const projectRef = doc(db, "projects", projectId);

    const unsubscribe = onSnapshot(
      projectRef,
      (projectSnap) => {
        if (projectSnap.exists()) {
          setProject(projectSnap.data());
        }
      },
      (err) => {
        console.error("Error fetching project:", err);
      }
    );

    return () => unsubscribe();
  }, [projectId]);
  useEffect(() => {
    if (!projectId || !reportId) {
      setError("Missing project or report ID");
      setIsLoading(false);
      return;
    }

    const reportRef = doc(db, "projects", projectId, "reports", reportId);

    const unsubscribe = onSnapshot(
      reportRef,
      (reportSnap) => {
        if (!reportSnap.exists()) {
          setError("Report not found");
          setIsLoading(false);
          return;
        }

        const data = reportSnap.data();

        if (!data) {
          setError("Empty report data");
          setIsLoading(false);
          return;
        }

        const defaultAssessment = {
          sprintPlanning: { rating: "N/A", description: "No data" },
          userStoryValidation: { rating: "N/A", description: "No data" },
          testPracticeValidation: { rating: "N/A", description: "No data" },
        };

        const assessment = data.assessment
          ? {
              sprintPlanning:
                data.assessment.sprintPlanning ||
                defaultAssessment.sprintPlanning,
              userStoryValidation:
                data.assessment.userStoryValidation ||
                defaultAssessment.userStoryValidation,
              testPracticeValidation:
                data.assessment.testPracticeValidation ||
                defaultAssessment.testPracticeValidation,
            }
          : defaultAssessment;

        const safeReport: ProjectReport = {
          id: reportSnap.id,
          projectId,
          month: data.month || "Unknown Month",
          date: data.date || "",
          background: data.background || "No background available.",
          assessment,
          issues: data.issues || [],
          scheduleStatus: data.scheduleStatus || {
            status: "OnTime",
            description: "No description provided",
          },
          scheduleData: data.scheduleData || {
            baseline: { expectedDate: "" },
            current: { projectedDate: "" },
          },
          varianceDays: data.varianceDays || 0,
          financials: data.financials || {
            originalAmount: 0,
            paidToDate: 0,
            description: "",
          },
          scopeStatus: data.scopeStatus || {
            completedDeliverables: 0,
            totalDeliverables: 0,
            deliverables: [],
          },
        };

        setReport(safeReport);
        setIsLoading(false);
        setError(null);
        console.log("Report date:", safeReport.date); // DEBUGGING
      },
      (err) => {
        console.error("Error listening to report:", err);
        setError("Failed to load report data");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
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
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Report Not Found</h4>
          <p>{error || "The report you're looking for was not found."}</p>
          <Link
            to={
              isVendor
                ? "/vendor/dashboard"
                : isETSEmployee
                ? "/ets/dashboard"
                : "/projects"
            }
            className="btn btn-primary mt-2"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link
        to={`/project/${projectId}`}
        className="btn btn-outline-primary mb-4"
      >
        ← Back to Project
      </Link>

      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
          <h1 className="mb-2">Project Report</h1>
          <h3 className="text-muted">{report.month} Report</h3>
        </div>
        <div className="d-flex">
          {isVendor ? (
            <button
              onClick={() =>
                navigate(`/vendor/project/${projectId}/report/${reportId}/edit`)
              }
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Edit Report
            </button>
          ) : (
            <></>
          )}
          <button className="btn btn-success me-2 ms-2" onClick={ExportToWord}>
            <i className="bi bi-file-earmark-word me-1"></i> Export Report
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
          {report.assessment?.sprintPlanning && (
            <>
              <h5>Project Criticality Assessment</h5>
              <div className="d-flex align-items-center mb-3">
                <span
                  className={`badge bg-${getCriticalityColor(
                    report.assessment.sprintPlanning.rating
                  )} me-2`}
                >
                  Rating: {report.assessment.sprintPlanning.rating}
                </span>
              </div>
              <p>{report.assessment.sprintPlanning.description}</p>
            </>
          )}
        </div>
      </div>

      {/* Issues Raised Section - NOW USING TIMELINE COMPONENT */}
      <div id="issues-raised" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Issues Raised</h4>
        </div>
        <div className="card-body">
          <IssuesTimeline issues={report.issues} />
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
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">
                    Expected Baseline Completion (Original Expected Date)
                  </h5>
                  <h4>
                    {report.scheduleData?.baseline?.expectedDate
                      ? new Date(
                          report.scheduleData.baseline.expectedDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Actual Projected Completion</h5>
                  <h4>
                    {report.scheduleData?.current?.projectedDate
                      ? new Date(
                          report.scheduleData.current.projectedDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Variance Display */}
          {report.varianceDays !== undefined && (
            <div className="mb-4">
              <h5>Schedule Status Variance</h5>
              {report.varianceDays === 0 ? (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>On Schedule:</strong> Project is tracking to baseline
                  completion date.
                </div>
              ) : report.varianceDays > 0 ? (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Behind Schedule:</strong> Project is{" "}
                  <strong>+{report.varianceDays} days</strong> behind the
                  baseline completion date.
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Ahead of Schedule:</strong> Project is{" "}
                  <strong>{report.varianceDays} days</strong> ahead of the
                  baseline completion date.
                </div>
              )}
            </div>
          )}
          {/* Schedule Completion Progress */}
          {report.scheduleData?.baseline?.expectedDate &&
            report.date &&
            project?.createdAt && (
              <ScheduleCompletion
                projectCreatedAt={
                  typeof project.createdAt === "string"
                    ? project.createdAt
                    : new Date(
                        project.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US") // 11/14/2025 (MM/DD/YYYY)
                }
                expectedBaselineDate={report.scheduleData.baseline.expectedDate}
                actualProjectedDate={report.scheduleData.current.projectedDate}
                reportDate={report.date}
              />
            )}
          {/* Schedule Status Description */}
          <div>
            <h5>Schedule Description</h5>
            <p className="mt-3">{report.scheduleStatus?.description}</p>
          </div>
        </div>
      </div>

      {/* Finance Section */}
      <div id="finance" className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Finance</h4>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: "30px" }}>
            <BudgetDonut
              totalContracted={report.financials.originalAmount}
              totalPaidOut={report.financials.paidToDate}
            />
          </div>
          {/* Financial Status Description */}
          {report.financials?.description && (
            <div>
              <h5>Financial Status Description</h5>
              <p>{report.financials.description}</p>
            </div>
          )}
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
                  backgroundColor: "#28a745",
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
        <Link to={`/project/${projectId}`} className="btn btn-outline-primary">
          Back to Project
        </Link>
      </div>
    </div>
  );
};

export default ReportDetailPage;
