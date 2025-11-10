// ---------------------------------------------
// Project Status Type (allow known values + any string)
// ---------------------------------------------
export type ProjectStatus = "On Track" | "At Risk" | "Critical" | string;

// ---------------------------------------------
// Project Issue
// ---------------------------------------------
export interface ProjectIssue {
  id: string;
  description: string;
  impact: string;
  likelihood: string;
  riskRating: number;
  dateRaised: string;
  recommendation: string;
  status: string;
}

// ---------------------------------------------
// Project Assessment Section
// ---------------------------------------------
export interface AssessmentItem {
  rating: string;
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
  status: string;
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
  metric1: string; // Example: "Completion: 74%"
  metric2: string; // Example: "Reports: 5"
  description: string;
  department: string;
  startDate: string;
  budget: number;
  spent: number;
  vendor: string;
  vendorId?: string;
  reports: ProjectReport[];
}
