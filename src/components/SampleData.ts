export interface ProjectDeliverable {
  id: string;
  name: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

export interface ProjectAssessment {
  sprintPlanning: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
  userStoryValidation: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
  testPracticeValidation: {
    rating: "Low" | "Medium" | "High";
    description: string;
  };
}

export interface ProjectIssue {
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

export interface ProjectReport {
  id: string;
  projectId: string;
  month: string;
  date: string;
  background: string;
  assessment: {
    sprintPlanning: {
      rating: string;
      description: string;
    };
    userStoryValidation?: {
      rating: string;
      description: string;
    };
    testPracticeValidation?: {
      rating: string;
      description: string;
    };
  };

  issues: ProjectIssue[];
  scheduleStatus: {
    status: "Ahead" | "OnTime" | "Late";
    description: string;
  };
  scheduleData?: {
    baseline?: {
      expectedDate: string;
    };
    current: {
      projectedDate: string;
    };
  };

  varianceDays?: number;
  financials: {
    originalAmount: number;
    paidToDate: number;
    description?: string;
  };
  scopeStatus: {
    completedDeliverables: number;
    totalDeliverables: number;
    deliverables: ProjectDeliverable[];
  };
}

export interface ProjectData {
  id: string;
  name: string;
  status: "On Track" | "At Risk" | "Critical" | "Active" | "Completed";
  statusColor: string;
  metric1: string;
  metric2: string;
  description: string;
  department: string;
  startDate: string;
  baselineEnd: string;
  currentEnd: string;
  budget: number;
  spent: number;
  vendor: string;
  vendorId?: string;
  createdAt?: string | { seconds: number };
  reports: ProjectReport[];
}

export interface Vendor {
  vendor_id: string;
  vendor_name: string;
  vendor_projects: ProjectData[];
}