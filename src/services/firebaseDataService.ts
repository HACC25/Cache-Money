import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase-config";
import type {
  ProjectData,
  ProjectReport,
  // ProjectIssue,
  // ProjectDeliverable,
  // ProjectAssessment,
} from "../components/SampleData";
// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Firestore Timestamp or date string to date string (YYYY-MM-DD)
 */
const timestampToDateString = (timestamp: Timestamp | string | undefined): string => {
  if (!timestamp) return "";
  
  // If it's already a string, try to parse it
  if (typeof timestamp === 'string') {
    try {
      return new Date(timestamp).toISOString().split("T")[0];
    } catch {
      return timestamp; // Return as-is if it can't be parsed
    }
  }
  
  // If it's a Timestamp object
  return timestamp.toDate().toISOString().split("T")[0];
};

/**
 * Convert Firestore Timestamp or date string to month string (e.g., "October 2025")
 */
const timestampToMonthString = (timestamp: Timestamp | string | undefined): string => {
  if (!timestamp) return "";
  
  let date: Date;
  
  // If it's a string, parse it
  if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    // If it's a Timestamp object
    date = timestamp.toDate();
  }
  
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/**
 * Convert Firestore Timestamp or date string to user-friendly format (e.g., "Nov 13, 2025")
 */
const timestampToFriendlyDate = (timestamp: Timestamp | string | undefined): string => {
  if (!timestamp) return "";
  
  let date: Date;
  
  // If it's a string, parse it
  if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    // If it's a Timestamp object
    date = timestamp.toDate();
  }
  
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
};

/**
 * Calculate project status based on various factors
 */
const calculateProjectStatus = (
  project: any
): "On Track" | "At Risk" | "Critical" => {
  // You can customize this logic based on your business rules
  const budgetUsage = (project.spent || 0) / (project.budget || 1);
  const hasOpenCriticalIssues = project.reports?.some((report: any) =>
    report.issues?.some(
      (issue: any) => issue.status === "Open" && issue.riskRating >= 5
    )
  );

  if (hasOpenCriticalIssues || budgetUsage > 0.9) {
    return "Critical";
  } else if (budgetUsage > 0.7) {
    return "At Risk";
  }
  return "On Track";
};

/**
 * Get status color based on project status
 */
const getStatusColor = (status: string): string => {
  switch (status) {
    case "On Track":
      return "#2E7D32"; // Green
    case "At Risk":
      return "#FBC02D"; // Yellow
    case "Critical":
      return "#D32F2F"; // Red
    default:
      return "#757575"; // Gray
  }
};

// ============================================
// FETCH REPORTS FOR A PROJECT
// ============================================

/**
 * Fetch all reports for a specific project from the subcollection
 */
export const fetchReportsForProject = async (
  projectId: string
): Promise<ProjectReport[]> => {
  try {
    const reportsRef = collection(db, "projects", projectId, "reports");
    const reportsSnapshot = await getDocs(
      query(reportsRef, orderBy("date", "desc"))
    );

    const reports: ProjectReport[] = [];

    reportsSnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();

      const report: ProjectReport = {
        id: docSnapshot.id,
        projectId: projectId,
        month: data.month || timestampToMonthString(data.date),
        date: timestampToDateString(data.date),
        background: data.background || "",
        assessment: {
          sprintPlanning: {
            rating: data.assessment?.sprintPlanning?.rating || "Low",
            description: data.assessment?.sprintPlanning?.description || "",
          },
          userStoryValidation: {
            rating: data.assessment?.userStoryValidation?.rating || "Low",
            description:
              data.assessment?.userStoryValidation?.description || "",
          },
          testPracticeValidation: {
            rating: data.assessment?.testPracticeValidation?.rating || "Low",
            description:
              data.assessment?.testPracticeValidation?.description || "",
          },
        },
        issues:
          data.issues?.map((issue: any) => ({
            id: issue.id || "",
            description: issue.description || "",
            impact: issue.impact || "Low",
            likelihood: issue.likelihood || "Low",
            riskRating: issue.riskRating || 0,
            dateRaised: timestampToDateString(issue.dateRaised),
            recommendation: issue.recommendation || "",
            status: issue.status || "Open",
          })) || [],
        scheduleStatus: {
          baselineEndDate: timestampToDateString(
            data.scheduleStatus?.baselineEndDate
          ),
          currentEndDate: timestampToDateString(
            data.scheduleStatus?.currentEndDate
          ),
        },
        financials: {
          originalAmount: data.financials?.originalAmount || 0,
          paidToDate: data.financials?.paidToDate || 0,
        },
        scopeStatus: {
          completedDeliverables: data.scopeStatus?.completedDeliverables || 0,
          totalDeliverables: data.scopeStatus?.totalDeliverables || 0,
          deliverables:
            data.scopeStatus?.deliverables?.map((del: any) => ({
              id: del.id || "",
              name: del.name || "",
              status: del.status || "Not Started",
              description: del.description || "",
            })) || [],
        },
      };

      reports.push(report);
    });

    return reports;
  } catch (error) {
    console.error(`Error fetching reports for project ${projectId}:`, error);
    return [];
  }
};

// ============================================
// FETCH ALL PROJECTS
// ============================================

/**
 * Fetch all projects from Firestore with their reports
 */
export const fetchAllProjects = async (): Promise<ProjectData[]> => {
  try {
    const projectsRef = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsRef);

    const projects: ProjectData[] = [];

    // Fetch each project and its reports
    for (const docSnapshot of projectsSnapshot.docs) {
      const data = docSnapshot.data();

      // Fetch reports for this project
      const reports = await fetchReportsForProject(docSnapshot.id);

      // Calculate completion percentage (you can customize this logic)
      const completionPercentage =
        reports.length > 0
          ? Math.round(
              (reports[0].scopeStatus.completedDeliverables /
                reports[0].scopeStatus.totalDeliverables) *
                100
            )
          : 0;

      const project: ProjectData = {
        id: docSnapshot.id,
        name: data.name || "Untitled Project",
        status: data.status || calculateProjectStatus({ ...data, reports }),
        statusColor: data.statusColor || getStatusColor(data.status),
        metric1: `Completion: ${completionPercentage}%`,
        metric2: `Reports: ${reports.length}`,
        description: data.description || "",
        department: data.department || "",
        startDate: timestampToDateString(data.createdAt),
        endDate: timestampToDateString(data.endDate),
        budget: data.budget || 0,
        spent: data.spent || 0,
        vendor: data.vendor || data.vendorName || "No Vendor Assigned",
        vendorId: data.vendorId || undefined,
        reports: reports,
      };

      projects.push(project);
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// ============================================
// FETCH SINGLE PROJECT
// ============================================

/**
 * Fetch a single project by ID with its reports
 */
export const fetchProjectById = async (
  projectId: string
): Promise<ProjectData | null> => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
      console.error(`Project with ID ${projectId} not found`);
      return null;
    }

    const data = projectSnapshot.data();
    const reports = await fetchReportsForProject(projectId);

    const completionPercentage =
      reports.length > 0
        ? Math.round(
            (reports[0].scopeStatus.completedDeliverables /
              reports[0].scopeStatus.totalDeliverables) *
              100
          )
        : 0;

    const project: ProjectData = {
      id: projectSnapshot.id,
      name: data.name || "Untitled Project",
      status: data.status || calculateProjectStatus({ ...data, reports }),
      statusColor: data.statusColor || getStatusColor(data.status),
      metric1: `Completion: ${completionPercentage}%`,
      metric2: `Reports: ${reports.length}`,
      description: data.description || "",
      department: data.department || "",
      startDate: timestampToDateString(data.createdAt),
      endDate: timestampToDateString(data.endDate) || "TBD",
      budget: data.budget || 0,
      spent: data.spent || 0,
      vendor: data.vendor || data.vendorName || "No Vendor Assigned",
      vendorId: data.vendorId || undefined,
      reports: reports,
    };

    return project;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return null;
  }
};

// ============================================
// FETCH ALL VENDORS
// ============================================

/**
 * Fetch all vendors from Firestore
 */
export const fetchAllVendors = async () => {
  try {
    const vendorsRef = collection(db, "vendors");
    const vendorsSnapshot = await getDocs(vendorsRef);

    const vendors: any[] = [];

    vendorsSnapshot.forEach((docSnapshot) => {
      vendors.push({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      });
    });

    return vendors;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
};

// ============================================
// FETCH PROJECTS BY VENDOR
// ============================================

/**
 * Fetch all projects assigned to a specific vendor
 */
export const fetchProjectsByVendor = async (
  vendorId: string
): Promise<ProjectData[]> => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("vendorId", "==", vendorId));
    const projectsSnapshot = await getDocs(q);

    const projects: ProjectData[] = [];

    for (const docSnapshot of projectsSnapshot.docs) {
      const data = docSnapshot.data();
      const reports = await fetchReportsForProject(docSnapshot.id);

      const completionPercentage =
        reports.length > 0
          ? Math.round(
              (reports[0].scopeStatus.completedDeliverables /
                reports[0].scopeStatus.totalDeliverables) *
                100
            )
          : 0;

      const project: ProjectData = {
        id: docSnapshot.id,
        name: data.name || "Untitled Project",
        status: data.status || calculateProjectStatus({ ...data, reports }),
        statusColor: data.statusColor || getStatusColor(data.status),
        metric1: `Completion: ${completionPercentage}%`,
        metric2: `Reports: ${reports.length}`,
        description: data.description || "",
        department: data.department || "",
        startDate: timestampToFriendlyDate(data.createdAt),
        endDate: timestampToFriendlyDate(data.endDate) || "TBD",
        budget: data.budget || 0,
        spent: data.spent || 0,
        vendor: data.vendor || data.vendorName || "No Vendor Assigned",
        vendorId: data.vendorId || undefined,
        reports: reports,
      };

      projects.push(project);
    }

    return projects;
  } catch (error) {
    console.error(`Error fetching projects for vendor ${vendorId}:`, error);
    return [];
  }
};
