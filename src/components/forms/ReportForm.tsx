import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../../services/firebase-config";
import "./ReportForm.css";
import { LabeledDropMenu } from "./DropMenu";

interface ProjectIssue {
  id: string;
  name: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  likelihood: "High" | "Medium" | "Low";
  riskRating: number;
  dateRaised: string;
  recommendation: string;
  status: "Open" | "Closed";
  age?: number;
}

interface ProjectDeliverable {
  id: string;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

interface ScheduleData {
  baseline?: {
    expectedDate: string;
  };
  current: {
    projectedDate: string;
  };
}

const ReportForm: React.FC = () => {
  const { projectId, reportId } = useParams<{
    projectId: string;
    reportId?: string;
  }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Determine if editing
  const isEditMode = !!reportId;

  // Check if first report and fetch baseline if not
  const [isFirstReport, setIsFirstReport] = useState<boolean>(true);
  const [baselineSchedule, setBaselineSchedule] = useState<
    ScheduleData["baseline"] | null
  >(null);

  // Fetch first report to check if baseline exists
  useEffect(() => {
    const checkFirstReport = async () => {
      if (!projectId || isEditMode) return;

      try {
        const reportsQuery = query(
          collection(db, "projects", projectId, "reports"),
          orderBy("createdAt", "asc")
        );
        const reportsSnap = await getDocs(reportsQuery);

        if (!reportsSnap.empty) {
          setIsFirstReport(false);
          const firstReport = reportsSnap.docs[0].data();
          if (firstReport.scheduleData?.baseline) {
            setBaselineSchedule(firstReport.scheduleData.baseline);
          }
        } else {
          setIsFirstReport(true);
        }
      } catch (err) {
        console.error("Error checking first report:", err);
      }
    };

    checkFirstReport();
  }, [projectId, isEditMode]);

  // Fetch existing report data if editing
  useEffect(() => {
    const fetchReport = async () => {
      if (!isEditMode || !projectId || !reportId) return;

      setIsLoading(true);
      try {
        const reportRef = doc(db, "projects", projectId, "reports", reportId);
        const reportSnap = await getDoc(reportRef);

        if (reportSnap.exists()) {
          const data = reportSnap.data();

          // Populate form fields with existing data
          setMonth(data.month || "");
          setDate(data.date || "");
          setBackground(data.background || "");

          // Assessment
          setSprintPlanningRating(
            data.assessment?.sprintPlanning?.rating || "Low"
          );
          setSprintPlanningDescription(
            data.assessment?.sprintPlanning?.description || ""
          );

          // Schedule
          setScheduleDescription(data.scheduleStatus?.description || "");

          // Schedule dates
          if (data.scheduleData) {
            if (data.scheduleData.baseline) {
              setExpectedBaselineDate(
                data.scheduleData.baseline.expectedDate || ""
              );
            }
            if (data.scheduleData.current) {
              setProjectedCompletionDate(
                data.scheduleData.current.projectedDate || ""
              );
            }
          }

          // Financial
          setOriginalAmount(data.financials?.originalAmount || 0);
          setPaidToDate(data.financials?.paidToDate || 0);
          setFinanceDescription(data.financials?.description || "");

          // Issues and Deliverables
          setIssues(data.issues || []);
          setDeliverables(data.scopeStatus?.deliverables || []);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load report data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [isEditMode, projectId, reportId]);

  // Fetch previous report to pre-fill background, baseline, and deliverables
  useEffect(() => {
    const prefillFromPreviousReport = async () => {
      if (!projectId || isEditMode) return;

      try {
        const reportsRef = collection(db, "projects", projectId, "reports");

        // Get ALL reports ordered by date
        const q = query(reportsRef, orderBy("date", "asc"));
        const reportsSnap = await getDocs(q);

        if (reportsSnap.empty) return;

        const allReports = reportsSnap.docs.map((doc) => doc.data());

        // 1. Get BASELINE from FIRST report
        if (allReports[0]?.scheduleData?.baseline?.expectedDate) {
          setExpectedBaselineDate(
            allReports[0].scheduleData.baseline.expectedDate
          );
        }

        // 2. If there's a previous report
        if (allReports.length > 0) {
          const previousReport = allReports[allReports.length - 1];

          // Pre-fill from most recent previous report
          if (previousReport.background) {
            setBackground(previousReport.background);
          }

          // Pre-fill from most recent previous report
          if (previousReport.scopeStatus?.deliverables) {
            setDeliverables(previousReport.scopeStatus.deliverables);
          }

          // Pre-fill from most recent previous report
          if (previousReport.issues) {
            setIssues(previousReport.issues);
          }
        }
      } catch (err) {
        console.error("Error prefilling from previous report:", err);
      }
    };

    prefillFromPreviousReport();
  }, [projectId, isEditMode]);

  // Form state
  const [month, setMonth] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [background, setBackground] = useState<string>("");

  // Assessment state
  const [sprintPlanningRating, setSprintPlanningRating] = useState<
    "Low" | "Medium" | "High"
  >("Low");
  const [sprintPlanningDescription, setSprintPlanningDescription] =
    useState<string>("");

  // Schedule state
  const [scheduleDescription, setScheduleDescription] = useState("");
  const [expectedBaselineDate, setExpectedBaselineDate] = useState<string>("");
  const [projectedCompletionDate, setProjectedCompletionDate] =
    useState<string>("");

  // Financial state
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [paidToDate, setPaidToDate] = useState<number>(0);
  const [financeDescription, setFinanceDescription] = useState("");

  // Issues state
  const [issues, setIssues] = useState<ProjectIssue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<ProjectIssue>({
    id: "",
    name: "",
    description: "",
    impact: "Medium",
    likelihood: "Medium",
    riskRating: 4,
    dateRaised: new Date().toISOString().split("T")[0],
    recommendation: "",
    status: "Open",
  });

  // Deliverables state
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([]);
  const [currentDeliverable, setCurrentDeliverable] =
    useState<ProjectDeliverable>({
      id: "",
      name: "",
      status: "Not Started",
      description: "",
    });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate risk rating: impact or likelihood changes
  const calculateRiskRating = (
    impact: "High" | "Medium" | "Low",
    likelihood: "High" | "Medium" | "Low"
  ): number => {
    const impactScore = impact === "Low" ? 1 : impact === "Medium" ? 2 : 3;
    const likelihoodScore =
      likelihood === "Low" ? 1 : likelihood === "Medium" ? 2 : 3;
    return impactScore + likelihoodScore;
  };

  const calculateIssueAge = (
    dateRaised: string,
    reportDate: string
  ): number => {
    const raised = new Date(dateRaised);
    const report = new Date(reportDate);
    const diffTime = Math.abs(report.getTime() - raised.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate variance in days between baseline and projected completion dates
  const calculateVarianceDays = (): number => {
    if (!expectedBaselineDate || !projectedCompletionDate) return 0;
    const baseline = new Date(expectedBaselineDate);
    const projected = new Date(projectedCompletionDate);
    const diffTime = projected.getTime() - baseline.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate schedule status based on variance
  const calculateVarianceStatus = (): "Ahead" | "OnTime" | "Late" => {
    const variance = calculateVarianceDays();
    if (variance < 0) return "Ahead";
    if (variance > 0) return "Late";
    return "OnTime";
  };

  // Handle issue form changes
  const handleIssueChange = (
    field: keyof ProjectIssue,
    value: string
  ): void => {
    const updatedIssue = { ...currentIssue, [field]: value } as ProjectIssue;

    if (field === "impact" || field === "likelihood") {
      const impact =
        field === "impact"
          ? (value as "High" | "Medium" | "Low")
          : currentIssue.impact;
      const likelihood =
        field === "likelihood"
          ? (value as "High" | "Medium" | "Low")
          : currentIssue.likelihood;
      updatedIssue.riskRating = calculateRiskRating(impact, likelihood);
    }

    setCurrentIssue(updatedIssue);
  };

  // Add or update an issue
  const handleAddIssue = (): void => {
    const age = calculateIssueAge(currentIssue.dateRaised, date);
    const issueWithId = {
      ...currentIssue,
      id: currentIssue.id || `issue-${uuidv4()}`,
      age: age,
    };

    if (currentIssue.id) {
      // Update existing issue
      const updatedIssues = issues.map((issue) =>
        issue.id === currentIssue.id ? issueWithId : issue
      );
      setIssues(updatedIssues);
    } else {
      // Add new issue
      setIssues([...issues, issueWithId]);
    }

    // Reset current issue
    setCurrentIssue({
      id: "",
      name: "",
      description: "",
      impact: "Medium",
      likelihood: "Medium",
      riskRating: 4,
      dateRaised: new Date().toISOString().split("T")[0],
      recommendation: "",
      status: "Open",
    });
  };

  // Edit an issue
  const handleEditIssue = (issue: ProjectIssue): void => {
    setCurrentIssue(issue);
    setTimeout(() => {
      const issueForm = document.getElementById("issue-form");
      if (issueForm) {
        issueForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };
  // Delete an issue
  const handleDeleteIssue = (issueId: string): void => {
    setIssues(issues.filter((issue) => issue.id !== issueId));
  };

  // Handle deliverable form changes
  const handleDeliverableChange = (
    field: keyof ProjectDeliverable,
    value: string
  ): void => {
    const updatedDeliverable = {
      ...currentDeliverable,
      [field]: value,
    } as ProjectDeliverable;
    setCurrentDeliverable(updatedDeliverable);
  };

  // Add or update a deliverable
  const handleAddDeliverable = (): void => {
    const deliverableWithId = {
      ...currentDeliverable,
      id: currentDeliverable.id || `deliverable-${uuidv4()}`,
    };

    if (currentDeliverable.id) {
      // Update existing deliverable
      const updatedDeliverables = deliverables.map((deliverable) =>
        deliverable.id === currentDeliverable.id
          ? deliverableWithId
          : deliverable
      );
      setDeliverables(updatedDeliverables);
    } else {
      // Add new deliverable
      setDeliverables([...deliverables, deliverableWithId]);
    }

    // Reset current deliverable
    setCurrentDeliverable({
      id: "",
      name: "",
      status: "Not Started",
      description: "",
    });
  };

  // Edit a deliverable
  const handleEditDeliverable = (deliverable: ProjectDeliverable): void => {
    setCurrentDeliverable(deliverable);
    setTimeout(() => {
      const deliverableForm = document.getElementById("deliverable-form");
      if (deliverableForm) {
        deliverableForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Delete a deliverable
  const handleDeleteDeliverable = (deliverableId: string): void => {
    setDeliverables(
      deliverables.filter((deliverable) => deliverable.id !== deliverableId)
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!projectId) {
      setError("Project ID is missing. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const completedDeliverables = deliverables.filter(
        (d) => d.status === "Completed"
      ).length;

      const issuesWithAge = issues.map((issue) => ({
        ...issue,
        age: calculateIssueAge(issue.dateRaised, date),
      }));

      // Prepare schedule data
      let scheduleData: ScheduleData = {
        current: {
          projectedDate: projectedCompletionDate,
        },
      };

      // If first report, set baseline
      if (isFirstReport) {
        scheduleData.baseline = {
          expectedDate: expectedBaselineDate,
        };
      } else if (baselineSchedule) {
        // preserve existing baseline
        scheduleData.baseline = baselineSchedule;
      }

      const reportData = {
        projectId,
        month,
        date,
        background,
        summary:
          background.substring(0, 200) + (background.length > 200 ? "..." : ""),
        createdBy: auth.currentUser?.uid,
        assessment: {
          sprintPlanning: {
            rating: sprintPlanningRating,
            description: sprintPlanningDescription,
          },
        },
        issues: issuesWithAge,
        scheduleStatus: {
          status: calculateVarianceStatus(),
          description: scheduleDescription,
        },
        scheduleData: scheduleData,
        varianceDays: calculateVarianceDays(),
        financials: {
          originalAmount: Number(originalAmount),
          paidToDate: Number(paidToDate),
          description: financeDescription,
        },
        scopeStatus: {
          completedDeliverables,
          totalDeliverables: deliverables.length,
          deliverables,
        },
        updatedAt: serverTimestamp(),
      };

      let newReportId = reportId;

      if (isEditMode && reportId) {
        // UPDATE existing report
        const reportRef = doc(db, "projects", projectId, "reports", reportId);
        await updateDoc(reportRef, reportData);
        console.log("Report updated with ID: ", reportId);
      } else {
        // CREATE new report
        const newReportData = {
          ...reportData,
          createdAt: serverTimestamp(),
          reportId: uuidv4(),
        };

        const docRef = await addDoc(
          collection(db, "projects", projectId, "reports"),
          newReportData
        );
        newReportId = docRef.id;
        console.log("Report added with ID: ", docRef.id);
      }

      navigate(`/project/${projectId}/report/${newReportId}`);
    } catch (err) {
      console.error("Error submitting report:", err);
      setError(
        `An error occurred while submitting the report: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancellation
  const handleCancel = (): void => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="form">
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="btn fs-1 fw-bold"
              onClick={handleCancel}
            >
              ✕
            </button>
          </div>
          <h2>{isEditMode ? "Edit IV&V Report" : "Add New IV&V Report"}</h2>
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h3>Report Information</h3>
            {/* DropMenu component : Report Month  */}
            <div className="form-group">
              <LabeledDropMenu
                title="Report Month:"
                items={(() => {
                  const months = [];
                  const monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  const now = new Date();
                  const currentYear = now.getFullYear();
                  const currentMonth = now.getMonth();

                  for (let i = 0; i < 12; i++) {
                    let monthIndex = currentMonth - i;
                    let year = currentYear;
                    if (monthIndex < 0) {
                      monthIndex += 12;
                      year--;
                    }
                    months.push(`${monthNames[monthIndex]} ${year}`);
                  }
                  return months;
                })()}
                label="Select Month"
                onSelect={(item) =>
                  setMonth(typeof item === "string" ? item : item.label)
                }
                type="secondary"
              />
            </div>
            {/* NOT A DROPDOWN */}
            <div className="form-group">
              <label htmlFor="date">Report Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            {/* NOT A DROPDOWN */}
            <div className="form-group">
              <label htmlFor="background">Project Background:</label>
              <textarea
                id="background"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                rows={5}
                required
                placeholder="Provide a summary of the project's current status and recent activities..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Project Assessment</h3>
            {/* DropMenu component : Report Month  */}
            <div className="form-group">
              <LabeledDropMenu
                title="Criticality Rating:"
                items={[
                  { label: "Low Risk", value: "Low" },
                  { label: "Medium Risk", value: "Medium" },
                  { label: "High Risk", value: "High" },
                ]}
                selectedIndex={
                  sprintPlanningRating === "Low"
                    ? 0
                    : sprintPlanningRating === "Medium"
                    ? 1
                    : sprintPlanningRating === "High"
                    ? 2
                    : undefined
                }
                onSelect={(item) => {
                  if (typeof item === "object" && item.value) {
                    setSprintPlanningRating(
                      item.value as "Low" | "Medium" | "High"
                    );
                  }
                }}
                label="Select Risk Level"
                type="secondary"
              />
              <label>Describe Criticality: </label>
              <textarea
                value={sprintPlanningDescription}
                onChange={(e) => setSprintPlanningDescription(e.target.value)}
                rows={3}
                required
                placeholder="Assessment of Project Health"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Project Issues</h3>

            {issues.length > 0 && (
              <div className="issues-list">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date Raised</th>
                      <th>Age (Days)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <tr key={issue.id}>
                        <td>{issue.name}</td>
                        <td>
                          {new Date(issue.dateRaised).toLocaleDateString()}
                        </td>
                        <td>
                          {issue.age ||
                            calculateIssueAge(issue.dateRaised, date)}
                        </td>
                        <td>{issue.status}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEditIssue(issue)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteIssue(issue.id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="issue-form" id="issue-form">
              <div className="form-group">
                <label htmlFor="issue-name">Issue Name:</label>
                <input
                  type="text"
                  id="issue-name"
                  value={currentIssue.name}
                  onChange={(e) => handleIssueChange("name", e.target.value)}
                  placeholder="Enter a short name for the issue..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="issue-description">Issue Description:</label>
                <textarea
                  id="issue-description"
                  value={currentIssue.description}
                  onChange={(e) =>
                    handleIssueChange("description", e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the issue..."
                />
              </div>

              <div className="form-row">
                {/* DropMenu component : Impact  */}
                <div className="form-group">
                  <LabeledDropMenu
                    title="Impact:"
                    id="issue-impact"
                    items={[
                      { label: "Low", value: "Low" },
                      { label: "Medium", value: "Medium" },
                      { label: "High", value: "High" },
                    ]}
                    selectedIndex={
                      currentIssue.impact === "Low"
                        ? 0
                        : currentIssue.impact === "Medium"
                        ? 1
                        : currentIssue.impact === "High"
                        ? 2
                        : undefined
                    }
                    onSelect={(item) => {
                      if (typeof item === "object" && item.value) {
                        handleIssueChange("impact", item.value as string);
                      }
                    }}
                    label="Select Impact"
                    type="secondary"
                  />
                </div>

                {/* DropMenu component : Likelihood  */}
                <div className="form-group">
                  <LabeledDropMenu
                    title="Likelihood:"
                    id="issue-likelihood"
                    items={[
                      { label: "Low", value: "Low" },
                      { label: "Medium", value: "Medium" },
                      { label: "High", value: "High" },
                    ]}
                    selectedIndex={
                      currentIssue.likelihood === "Low"
                        ? 0
                        : currentIssue.likelihood === "Medium"
                        ? 1
                        : currentIssue.likelihood === "High"
                        ? 2
                        : undefined
                    }
                    onSelect={(item) => {
                      if (typeof item === "object" && item.value) {
                        handleIssueChange("likelihood", item.value as string);
                      }
                    }}
                    label="Select Likelihood"
                    type="secondary"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="issue-date-raised">Date Raised:</label>
                  <input
                    type="date"
                    id="issue-date-raised"
                    value={currentIssue.dateRaised}
                    onChange={(e) =>
                      handleIssueChange("dateRaised", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="issue-status">Status:</label>
                  <select
                    id="issue-status"
                    value={currentIssue.status}
                    onChange={(e) =>
                      handleIssueChange("status", e.target.value)
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="issue-recommendation">Possible Remedy:</label>
                <textarea
                  id="issue-recommendation"
                  value={currentIssue.recommendation}
                  onChange={(e) =>
                    handleIssueChange("recommendation", e.target.value)
                  }
                  rows={3}
                  placeholder="Provide description on how issue is being addressed..."
                />
              </div>

              <button
                type="button"
                onClick={handleAddIssue}
                className="add-button"
                disabled={
                  !currentIssue.name ||
                  !currentIssue.description ||
                  !currentIssue.recommendation
                }
              >
                {currentIssue.id ? "Update Issue" : "Add Issue"}
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Schedule Status</h3>

            {/* Expected Baseline Date (read-only for subsequent reports) */}
            <div className="form-group">
              <label htmlFor="expected-baseline-date">
                Expected Baseline Completion Date:
              </label>
              <input
                type="date"
                id="expected-baseline-date"
                value={expectedBaselineDate}
                onChange={(e) => setExpectedBaselineDate(e.target.value)}
                disabled={!isFirstReport}
                style={!isFirstReport ? { backgroundColor: "#f5f5f5" } : {}}
                required
              />
            </div>

            {/* Projected Completion Date (always editable) */}
            <div className="form-group">
              <label htmlFor="projected-completion-date">
                Actual Projected Completion Date:
              </label>
              <input
                type="date"
                id="projected-completion-date"
                value={projectedCompletionDate}
                onChange={(e) => setProjectedCompletionDate(e.target.value)}
                required
              />
            </div>

            {/* Variance Display */}
            {expectedBaselineDate && projectedCompletionDate && (
              <div className="variance-info">
                <strong>Variance from Baseline:</strong>{" "}
                {calculateVarianceDays() === 0
                  ? "On schedule"
                  : calculateVarianceDays() > 0
                  ? `+${calculateVarianceDays()} days (Behind schedule)`
                  : `${calculateVarianceDays()} days (Ahead of schedule)`}
              </div>
            )}

            {/* Schedule Status Description */}
            <div className="form-group">
              <label htmlFor="schedule-description">
                Schedule Status Description:
              </label>
              <textarea
                id="schedule-description"
                value={scheduleDescription}
                onChange={(e) => setScheduleDescription(e.target.value)}
                rows={4}
                required
                placeholder="Describe the schedule status, any delays, milestones achieved, or upcoming deadlines..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Financials</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="original-amount">
                  Total Contract Amount ($):
                </label>
                <input
                  type="number"
                  id="original-amount"
                  value={originalAmount}
                  onChange={(e) => setOriginalAmount(Number(e.target.value))}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="paid-to-date">Total Paid Out ($):</label>
                <input
                  type="number"
                  id="paid-to-date"
                  value={paidToDate}
                  onChange={(e) => setPaidToDate(Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>
            {/* Financial Status Description */}
            <div className="form-group">
              <label htmlFor="finance-description">
                Financial Status Description:
              </label>
              <textarea
                id="finance-description"
                value={financeDescription}
                onChange={(e) => setFinanceDescription(e.target.value)}
                rows={4}
                required
                placeholder="Description..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Scope Status</h3>

            {deliverables.length > 0 && (
              <div className="deliverables-list">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverables.map((deliverable) => (
                      <tr key={deliverable.id}>
                        <td>{deliverable.name}</td>
                        <td>{deliverable.description.substring(0, 50)}...</td>
                        <td>{deliverable.status}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleEditDeliverable(deliverable)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteDeliverable(deliverable.id)
                            }
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="deliverable-form" id="deliverable-form">
              <div className="form-group">
                <label htmlFor="deliverable-name">Deliverable Name:</label>
                <input
                  type="text"
                  id="deliverable-name"
                  value={currentDeliverable.name}
                  onChange={(e) =>
                    handleDeliverableChange("name", e.target.value)
                  }
                  placeholder="Enter deliverable name..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliverable-status">Status:</label>
                <select
                  id="deliverable-status"
                  value={currentDeliverable.status}
                  onChange={(e) =>
                    handleDeliverableChange(
                      "status",
                      e.target.value as
                        | "Not Started"
                        | "In Progress"
                        | "Completed"
                    )
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="deliverable-description">Description:</label>
                <textarea
                  id="deliverable-description"
                  value={currentDeliverable.description}
                  onChange={(e) =>
                    handleDeliverableChange("description", e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the deliverable..."
                />
              </div>

              <button
                type="button"
                onClick={handleAddDeliverable}
                className="add-button"
                disabled={
                  !currentDeliverable.name || !currentDeliverable.description
                }
              >
                {currentDeliverable.id
                  ? "Update Deliverable"
                  : "Add Deliverable"}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={
                isSubmitting ||
                !month ||
                !date ||
                !background ||
                deliverables.length === 0 ||
                !expectedBaselineDate ||
                !projectedCompletionDate
              }
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Submitting..."
                : isEditMode
                ? "Update Report"
                : "Submit Report"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportForm;
