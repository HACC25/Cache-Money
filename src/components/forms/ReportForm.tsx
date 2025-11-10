import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../../services/firebase-config";
import "./ReportForm.css";

// Define interfaces for form data
interface ProjectIssue {
  id: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  likelihood: "High" | "Medium" | "Low";
  riskRating: number;
  dateRaised: string;
  recommendation: string;
  status: "Open" | "Closed";
}

interface ProjectDeliverable {
  id: string;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

const ReportForm: React.FC = () => {
  // Get projectId from URL parameters
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

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
  const [userStoryRating, setUserStoryRating] = useState<
    "Low" | "Medium" | "High"
  >("Low");
  const [userStoryDescription, setUserStoryDescription] = useState<string>("");
  const [testPracticeRating, setTestPracticeRating] = useState<
    "Low" | "Medium" | "High"
  >("Low");
  const [testPracticeDescription, setTestPracticeDescription] =
    useState<string>("");

  // Schedule state
  const [baselineEndDate, setBaselineEndDate] = useState<string>("");
  const [currentEndDate, setCurrentEndDate] = useState<string>("");

  // Financials state
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [paidToDate, setPaidToDate] = useState<number>(0);

  // Issues state
  const [issues, setIssues] = useState<ProjectIssue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<ProjectIssue>({
    id: "",
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

  // Calculate risk rating when impact or likelihood changes
  const calculateRiskRating = (
    impact: "High" | "Medium" | "Low",
    likelihood: "High" | "Medium" | "Low"
  ): number => {
    const impactScore = impact === "Low" ? 1 : impact === "Medium" ? 2 : 3;
    const likelihoodScore =
      likelihood === "Low" ? 1 : likelihood === "Medium" ? 2 : 3;
    return impactScore + likelihoodScore;
  };

  // Handle issue form changes
  const handleIssueChange = (
    field: keyof ProjectIssue,
    value: string
  ): void => {
    const updatedIssue = { ...currentIssue, [field]: value } as ProjectIssue;

    // Auto-calculate risk rating
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
    const issueWithId = {
      ...currentIssue,
      id: currentIssue.id || `issue-${uuidv4()}`,
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
  };

  // Delete a deliverable
  const handleDeleteDeliverable = (deliverableId: string): void => {
    setDeliverables(
      deliverables.filter((deliverable) => deliverable.id !== deliverableId)
    );
  };

  // Generate month options
  const monthOptions = () => {
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

    // Generate options for the last 12 months
    for (let i = 0; i < 12; i++) {
      let monthIndex = currentMonth - i;
      let year = currentYear;

      if (monthIndex < 0) {
        monthIndex += 12;
        year--;
      }

      const monthName = monthNames[monthIndex];
      const value = `${monthName} ${year}`;

      months.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }

    return months;
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
      // Calculate completed deliverables
      const completedDeliverables = deliverables.filter(
        (d) => d.status === "Completed"
      ).length;

      // Create the report object
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
          userStoryValidation: {
            rating: userStoryRating,
            description: userStoryDescription,
          },
          testPracticeValidation: {
            rating: testPracticeRating,
            description: testPracticeDescription,
          },
        },
        issues,
        scheduleStatus: {
          baselineEndDate,
          currentEndDate,
        },
        financials: {
          originalAmount: Number(originalAmount),
          paidToDate: Number(paidToDate),
        },
        scopeStatus: {
          completedDeliverables,
          totalDeliverables: deliverables.length,
          deliverables,
        },
        createdAt: serverTimestamp(),
        reportId: uuidv4(), // Unique ID for the report
      };

      // Add the report to Firestore
      const docRef = await addDoc(
        collection(db, "projects", projectId, "reports"),
        reportData
      );

      console.log("Report added with ID: ", docRef.id);

      // Navigate back to the project page or show success message
      navigate(`/vendor/dashboard`);
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
    navigate(`/vendor/dashboard`);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Add New IV&V Report</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <h3>Report Information</h3>

          <div className="form-group">
            <label htmlFor="month">Reporting Month:</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option value="">Select Month</option>
              {monthOptions()}
            </select>
          </div>

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

          <div className="form-group">
            <label>Sprint Planning:</label>
            <select
              value={sprintPlanningRating}
              onChange={(e) =>
                setSprintPlanningRating(
                  e.target.value as "Low" | "Medium" | "High"
                )
              }
              required
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
            <textarea
              value={sprintPlanningDescription}
              onChange={(e) => setSprintPlanningDescription(e.target.value)}
              rows={3}
              required
              placeholder="Describe the sprint planning assessment..."
            />
          </div>

          <div className="form-group">
            <label>User Story Validation:</label>
            <select
              value={userStoryRating}
              onChange={(e) =>
                setUserStoryRating(e.target.value as "Low" | "Medium" | "High")
              }
              required
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
            <textarea
              value={userStoryDescription}
              onChange={(e) => setUserStoryDescription(e.target.value)}
              rows={3}
              required
              placeholder="Describe the user story validation assessment..."
            />
          </div>

          <div className="form-group">
            <label>Test Practice Validation:</label>
            <select
              value={testPracticeRating}
              onChange={(e) =>
                setTestPracticeRating(
                  e.target.value as "Low" | "Medium" | "High"
                )
              }
              required
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
            <textarea
              value={testPracticeDescription}
              onChange={(e) => setTestPracticeDescription(e.target.value)}
              rows={3}
              required
              placeholder="Describe the test practice validation assessment..."
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
                    <th>Description</th>
                    <th>Impact</th>
                    <th>Likelihood</th>
                    <th>Risk Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td>{issue.description.substring(0, 50)}...</td>
                      <td>{issue.impact}</td>
                      <td>{issue.likelihood}</td>
                      <td>{issue.riskRating}</td>
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

          <div className="issue-form">
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
              <div className="form-group">
                <label htmlFor="issue-impact">Impact:</label>
                <select
                  id="issue-impact"
                  value={currentIssue.impact}
                  onChange={(e) => handleIssueChange("impact", e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="issue-likelihood">Likelihood:</label>
                <select
                  id="issue-likelihood"
                  value={currentIssue.likelihood}
                  onChange={(e) =>
                    handleIssueChange("likelihood", e.target.value)
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="issue-risk-rating">Risk Rating:</label>
                <input
                  type="number"
                  id="issue-risk-rating"
                  value={currentIssue.riskRating}
                  readOnly
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
                  onChange={(e) => handleIssueChange("status", e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="issue-recommendation">Recommendation:</label>
              <textarea
                id="issue-recommendation"
                value={currentIssue.recommendation}
                onChange={(e) =>
                  handleIssueChange("recommendation", e.target.value)
                }
                rows={3}
                placeholder="Provide recommendations to address the issue..."
              />
            </div>

            <button
              type="button"
              onClick={handleAddIssue}
              className="add-button"
              disabled={
                !currentIssue.description || !currentIssue.recommendation
              }
            >
              {currentIssue.id ? "Update Issue" : "Add Issue"}
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Schedule Status</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="baseline-end-date">Baseline End Date:</label>
              <input
                type="date"
                id="baseline-end-date"
                value={baselineEndDate}
                onChange={(e) => setBaselineEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="current-end-date">Current End Date:</label>
              <input
                type="date"
                id="current-end-date"
                value={currentEndDate}
                onChange={(e) => setCurrentEndDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Financials</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="original-amount">
                Original Contract Amount ($):
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
              <label htmlFor="paid-to-date">Paid to Date ($):</label>
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
        </div>

        <div className="form-section">
          <h3>Scope Status</h3>

          {deliverables.length > 0 && (
            <div className="deliverables-list">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliverables.map((deliverable) => (
                    <tr key={deliverable.id}>
                      <td>{deliverable.name}</td>
                      <td>{deliverable.status}</td>
                      <td>{deliverable.description.substring(0, 50)}...</td>
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

          <div className="deliverable-form">
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
              {currentDeliverable.id ? "Update Deliverable" : "Add Deliverable"}
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
              deliverables.length === 0
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
