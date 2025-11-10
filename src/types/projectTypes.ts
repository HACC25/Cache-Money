// ---------------------------------------------
// Project Status Type
// ---------------------------------------------
export type ProjectStatus = "On Track" | "At Risk" | "Critical";

// ---------------------------------------------
// Project Issue
// ---------------------------------------------
export interface ProjectIssue {
  id: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  likelihood: "High" | "Medium" | "Low";
  riskRating: number;
  dateRaised: string;
  recommendation: string;
  status: "Open" | "Closed";
}

// ---------------------------------------------
// Project Assessment Section
// ---------------------------------------------
export interface AssessmentItem {
  rating: "Low" | "Medium" | "High";
  description: string;
}

export interface ProjectAssessment {
  sprintPlanning: AssessmentItem;
  userStoryValidation: AssessmentItem;
  testPracticeValidation: AssessmentItem;
}

// ---------------------------------------------
// Schedule & Financials
// ---------------------------------------------
export interface ScheduleStatus {
  baselineEndDate: string;
  currentEndDate: string;
}

export interface Financials {
  originalAmount: number;
  paidToDate: number;
}

// ---------------------------------------------
// Project Deliverables
// ---------------------------------------------
export interface Deliverable {
  id: string;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

export interface ScopeStatus {
  completedDeliverables: number;
  totalDeliverables: number;
  deliverables: Deliverable[];
}

// ---------------------------------------------
// Project Report
// ---------------------------------------------
export interface ProjectReport {
  id: string;
  projectId: string;
  month: string;
  date: string;
  background: string;
  assessment: ProjectAssessment;
  issues: ProjectIssue[];
  scheduleStatus: ScheduleStatus;
  financials: Financials;
  scopeStatus: ScopeStatus;
}

// ---------------------------------------------
// Project Summary (main list + detail view)
// ---------------------------------------------
export interface ProjectData {
  id: string;
  name: string;
  status: ProjectStatus;
  statusColor: string;
  metric1: string;
  metric2: string;
  description: string;
  department: string;
  startDate: string;
  budget: number;
  spent: number;
  vendor: string;
  vendorId?: string;
  reports: ProjectReport[];
}
